import { useState, useEffect } from "react";
import Cart from "@/components/ui/cart";
import thriftopia from '@/assets/icon/thriftopia.webp';
import profile from '@/assets/icon/dummy-profile.webp';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import Login from "@/components/auth/login"
import Register from "@/components/auth/register"
import SubNav from "@/components/navigation/sub-nav"
import { FaRegUser } from "react-icons/fa";
import { HiMiniBars3 } from "react-icons/hi2";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetFooter } from "@/components/ui/sheet";
import Avatar from "@/components/profile-menu/avatar";
import { 
    IoSearch, 
    IoCartOutline, 
    IoSettingsOutline, 
    IoLogOutOutline 
} from "react-icons/io5";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { usePage } from '@inertiajs/react';
import { logout } from '@/lib/auth';
import type { User } from '@/types';

export default function Navbar() {
    const [openDialog, setOpenDialog] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(false);
    const [canHoverCart, setCanHoverCart] = useState(true);
    const [loginOpen, setLoginOpen] = useState(false);
    const auth = usePage().props.auth as { user: User | null };

    useEffect(() => {
        setCanHoverCart(!openDropdown);
    }, [openDropdown]);
    
    const handleLogoutClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setOpenDialog(true);
        setOpenDropdown(false);
    };

    const handleLogoutConfirm = () => {
        logout();
        setOpenDialog(false);
    };

    const placeholders = [
        "Kaos Pria",
        "Celana Wanita",
        "Sepatu Anak",
        "Tas Skena",
    ];
    

    const [placeholder, setPlaceholder] = useState(placeholders[0]);
    const [index, setIndex] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
        }, 5000);
    
        return () => clearInterval(interval);
    }, []);
    
    useEffect(() => {
        let currentText = "";
        let charIndex = 0;
    
        const typeEffect = setInterval(() => {
            currentText = placeholders[index].slice(0, charIndex);
            setPlaceholder(currentText);
            charIndex++;
    
            if (charIndex > placeholders[index].length) {
                clearInterval(typeEffect);
            }
        }, 90); 
        return () => clearInterval(typeEffect);
    }, [index]);

    useEffect(() => {
        if (openDialog || openDropdown) {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [openDialog, openDropdown]);

    return (
        <div className="relative overflow-visible">
            <header className="bg-white w-full flex shadow-md justify-center items-center overflow-visible">
            {/*backup lg:top-4 top-0 lg:w-[93rem] w-full */}
                <nav className="bg-[#f8f8f8] lg:top-4 top-0 lg:w-[93rem] w-full fixed lg:shadow-md  z-40 border-gray-300 rounded-sm overflow-visible"> 
                    <div className="container mx-auto flex justify-between py-4 px-4 lg:px-25 border-b-1 border-gray-300 items-center">
                        <a href={route('home')} className="text-2xl font-bold text-gray-900 dark:text-white">
                            <img src={thriftopia} alt="Brand Logo" className="h-12 w-auto hidden md:flex" draggable='false' />
                        </a>
                        <div className="flex"></div>
                        
                        <div className="items-center space-x-4 justify-center">
                            <div className="relative w-full max-w-lg flex">
                                <span className="flex items-center relative w-full">
                                    <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl z-10" />
                                    <Input
                                        type="text"
                                        placeholder={placeholder}
                                        className="pl-10 py-4 p bg-[#d9d9d9] rounded-l-lg rounded-r-none text-black md:w-70 lg:w-90"
                                    />
                                    <Button variant="default" className="bg-[#1a1a1a] rounded-r-md text-white cursor-pointer">
                                        Cari
                                    </Button>
                                </span>
                               
                            </div>
                        </div>
                        
                        <div className="space-x-2">
                            <div className="flex md:w-70 justify-end items-center space-x-2 cursor-pointer">
                                <HoverCard open={canHoverCart ? undefined : false}>
                                    <HoverCardTrigger href={route('cart')} asChild>
                                        <div className={`flex items-center space-x-2 md:border-r-2 mr-0 sm:mr-0 md:mr-1 px-4 border-gray-300 ${canHoverCart ? 'cursor-pointer' : 'pointer-events-none'}`}>
                                            <IoCartOutline className="text-gray-500 text-3xl mr-1" />
                                            <span className="absolute top-5 bg-[#1a1a1a] text-white text-[0.60rem] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                                4
                                            </span>
                                            <p className="text-black text-sm">Cart</p>
                                        </div>
                                    </HoverCardTrigger>
                                    <HoverCardContent align="end" className="bg-white p-4 rounded-md shadow-md hidden md:flex text-black">
                                        <Cart />
                                    </HoverCardContent>
                                </HoverCard>

                                <div className="md:hidden items-center">
                                    <Sheet>
                                        <SheetTrigger className="top-4 left-4 p-2 text-black rounded cursor-pointer">
                                            <HiMiniBars3 className="w-6 h-6" />
                                        </SheetTrigger>
                                        
                                        {auth.user ? (
                                            <SheetContent side="right" className="w-64 bg-white text-black shadow-lg">
                                                <SheetHeader>
                                                    <div className="flex gap-2 cursor-pointer">
                                                        <div className="w-12 h-12">
                                                        <Avatar 
                                                            name={auth.user?.name ?? ''} 
                                                            imageUrl={auth.user?.avatar_url}
                                                        /> 
                                                        </div>
                                                        <div className="flex flex-col justify-center">
                                                            <div className="w-40">
                                                                <span className="text-black text-sm font-bold block whitespace-nowrap overflow-hidden text-ellipsis">
                                                                    {auth.user.name}
                                                                </span>
                                                            </div>
                                                            <span className="text-black font-normal text-xs">{auth.user.email}</span>
                                                        </div>
                                                    </div>
                                                </SheetHeader>
                                                <div className="bg-border border-1 border-gray-100 rounded mx-4"></div>

                                                <nav className="flex flex-col space-y-2 px-4">
                                                    <a href="#" className="gap-2 items-center hover:bg-gray-200 justify-between rounded p-2 transition-all flex text-black cursor-pointer">
                                                        <div className="flex items-center gap-2">
                                                            <IoCartOutline />
                                                            Keranjang Saya
                                                        </div>
                                                        <Badge variant="amount">4</Badge>
                                                    </a>
                                                    <a href={route('profile')} className="gap-2 items-center hover:bg-gray-200 rounded p-2 transition-all2 flex text-black cursor-pointer">
                                                        <FaRegUser />
                                                        Profile Saya
                                                    </a>
                                                    <a href="#" className="gap-2 items-center hover:bg-gray-200 rounded p-2 transition-all flex text-black cursor-pointer">
                                                        <IoSettingsOutline />
                                                        Pengaturan
                                                    </a>
                                                </nav>
                                                <SheetFooter>
                                                    <Button 
                                                        onClick={handleLogoutClick}
                                                        variant="default" 
                                                        className="w-full p-2 bg-[#1a1a1a] text-white hover:bg-black cursor-pointer rounded-md">
                                                        <IoLogOutOutline/>
                                                        Logout
                                                    </Button>
                                                </SheetFooter>
                                            </SheetContent>
                                        ) : (
                                            <SheetContent side="right" className="w-64 bg-white text-black shadow-lg">
                                                <SheetHeader>
                                                    <div className="flex gap-2 cursor-pointer">
                                                        <div className="w-12 h-12 flex-shrink-0">
                                                            <img src={profile} className="ring-1 p-0.5 ring-gray-400 w-full h-full rounded-full object-cover" alt="User Avatar" draggable="false" />
                                                        </div>
                                                        <div className="flex flex-col justify-center flex-grow">
                                                            <div className="w-full">
                                                                <span className="text-black text-sm font-bold block whitespace-nowrap overflow-hidden text-ellipsis">
                                                                    Anda Belum Masuk
                                                                </span>
                                                            </div>
                                                            <span className="text-black font-normal text-xs">Harap Masuk terlebih dahulu untuk lanjut</span>
                                                        </div>
                                                    </div>
                                                </SheetHeader>
                                                <div className="bg-border border-1 border-gray-100 rounded mx-4"></div>

                                                <div className="w-full justify-center flex items-center space-x-2 px-2">
                                                    <Login open={loginOpen} onOpenChange={setLoginOpen} buttonClassName="w-full border-1" />
                                                    <Register buttonClassName="w-full border-1" />
                                                </div>
                                            </SheetContent>
                                        )}
                                    </Sheet>
                                </div>

                                {auth.user ? (
                                    <DropdownMenu 
                                        open={openDropdown} 
                                        onOpenChange={setOpenDropdown}
                                        modal={false}
                                        >
                                        <DropdownMenuTrigger asChild className="cursor-pointer hidden md:flex items-center space-x-2 mx-2 z-50">
                                            <div className="bg-gray-200 p-0.5 rounded-md hover:scale-101 hover:bg-gray-300 transition-all duration-200 will-change-transform flex items-center">
                                                <div className="p-1 rounded-full w-10 h-10 m-0">
                                                <Avatar 
                                                    name={auth.user?.name ?? ''} 
                                                    imageUrl={auth.user?.avatar_url}
                                                />                                                    
                                                </div>    
                                                <div className=" hidden md:flex px-2 w-auto max-w-32 ">
                                                    <p className="text-black font-medium text-xs whitespace-nowrap overflow-hidden text-ellipsis">
                                                        {auth.user.name}
                                                    </p>
                                                </div>
                                            </div>               
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent className="w-64 bg-white z-50" sideOffset={5} collisionPadding={20}>
                                            <DropdownMenuLabel className="flex items-center space-x-2 cursor-pointer">
                                                <div className="w-10 h-10">
                                                <Avatar 
                                                name={auth.user?.name ?? ''} 
                                                imageUrl={auth.user?.avatar_url}
                                            />                                               
                                             </div>
                                                <div className="flex flex-col">
                                                    <div className="w-40">
                                                        <span className="text-black font-bold block whitespace-nowrap overflow-hidden text-ellipsis">
                                                            {auth.user.name}
                                                        </span>
                                                        <span className="text-black font-normal text-xs block whitespace-nowrap overflow-hidden text-ellipsis">{auth.user.email}</span>
                                                    </div>
                                                </div>
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <div className="flex justify-center w-full">
                                                <div className="border-r-1 border-gray-200 p-1">
                                                    <DropdownMenuRadioItem href={route("cart")} className="text-center px-4 bg-gray-200 flex rounded cursor-pointer text-black text-xs" value="">
                                                        Keranjang: 4
                                                    </DropdownMenuRadioItem>
                                                </div>
                                                <div className="border-l-1 border-gray-200 p-1">
                                                    <DropdownMenuRadioItem href={route('profile')}  className="text-center px-4 flex text-black rounded cursor-pointer" value="">
                                                         <FaRegUser/>
                                                         Profil Saya
                                                    </DropdownMenuRadioItem>
                                                    <DropdownMenuRadioItem href={route('profile')} className="text-center px-4 flex text-black rounded cursor-pointer" value="">
                                                        <IoSettingsOutline/>
                                                        Pengaturan
                                                    </DropdownMenuRadioItem>
                                                    <DropdownMenuRadioItem 
                                                        onClick={handleLogoutClick}
                                                        className="text-center px-4 flex text-black cursor-pointer rounded" 
                                                        value="">
                                                        <IoLogOutOutline/>
                                                        Logout
                                                    </DropdownMenuRadioItem>
                                                </div>
                                            </div>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                ) : (
                                    <div className="hidden md:flex items-center mx-2 space-x-2">
                                        <Login open={loginOpen} onOpenChange={setLoginOpen} />
                                        <Register />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <SubNav />
                </nav>
            </header>

            <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                <AlertDialogContent className="z-50 fixed bg-white">
                    <AlertDialogHeader className="text-black">
                        <AlertDialogTitle>Konfirmasi Logout</AlertDialogTitle>
                        <AlertDialogDescription className="text-black">
                            Apakah anda yakin ingin keluar dari akun ini?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer bg-transparent text-black" onClick={() => setOpenDialog(false)}>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleLogoutConfirm}
                            className="bg-[#1a1a1a] text-white hover:bg-black cursor-pointer rounded-sm">
                            Logout
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
