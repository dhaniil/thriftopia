import { useState, useRef } from "react";
import { usePage } from '@inertiajs/react';
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
// import sigma from '@/assets/icon/sigma.webp';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import Sidebar from "../navigation/sidebar";
import type { User } from '@/types';
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FaRegUser } from "react-icons/fa";
import { IoHomeOutline, IoApps } from "react-icons/io5";
import Avatar from "@/components/profile-menu/avatar";


import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
export default function ProfileContent() {
        const auth = usePage().props.auth as { user: User | null };
        const [selectTab, setSelectTab] = useState("Profile");
        const fileInputRef = useRef<HTMLInputElement>(null);
        
        const handleClick = () => {
            fileInputRef.current?.click();
        };

        const [formData, setFormData] = useState({
            name: auth.user?.name || '',
            email: auth.user?.email || ''
        });

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        };

const { toast } = useToast();

const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    
    const formData = new FormData();
    formData.append('avatar', e.target.files[0]);
    
    try {
        await axios.post('/profile/avatar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        toast({
            title: "Sukses",
            description: "Foto profil berhasil diperbarui"
        });
        window.location.reload();
    } catch (_error) {
        toast({
            title: "Error",
            description: "Gagal mengupload foto profil",
            variant: "destructive"
        });
    }
};

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
        await axios.post('/profile/update', formData);
        toast({
            title: "Sukses",
            description: "Profile berhasil diperbarui"
        });
        window.location.reload();
    } catch (_error) {
        toast({
            title: "Error",
            description: "Gagal memperbarui profil",
            variant: "destructive"
        });
    }
};

    return (
        <div className="grid grid-cols-1 md:grid-cols-[0.4fr_1.6fr] mx-auto justify-center w-full px-6  md:px-20 gap-8 h- ">
            <Sidebar/>

            <Tabs value={selectTab} onValueChange={setSelectTab} defaultValue="Profile" className="w-full">
                <TabsList className="">
                    <div className="relative h-full w-full flex justify-between bg-white ">
                        
                    <motion.div
                        className="absolute inset-0 bg-gray-200 rounded-md"
                        layoutId="activeTab"
                        transition={{ type: "tween", duration: 0.3 }}
                        initial={false}
                        style={{
                            width: "33.33%",
                            left: selectTab === "Profile" ? "0%" 
                                : selectTab === "Alamat" ? "33.33%" 
                                : "66.66%"
                        }}
                    />
                    <TabsTrigger 
                        className="relative w-full bg-transparent gap-x-1 rounded-md z-10 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-black" 
                        value="Profile"
                    >
                        <FaRegUser className="md:hidden"/>
                        <p className="hidden md:flex">Profil</p>
                    </TabsTrigger>
                    {/* <TabsTrigger 
                        className="relative w-full bg-transparent gap-x-1 rounded-md z-10 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-black" 
                        value="Keranjang"
                    >
                        <IoCartOutline className="md:hidden"/>
                        <p className="hidden md:flex">Keranjang</p>
                    </TabsTrigger> */}
                    <TabsTrigger 
                        className="relative w-full bg-transparent gap-x-1 rounded-md z-10 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-black" 
                        value="Alamat"
                    >
                        <IoHomeOutline className="md:hidden" />
                        <p className="hidden md:flex">Alamat</p>
                    </TabsTrigger>
                    <TabsTrigger 
                        className="relative w-full bg-transparent gap-x-1 rounded-md z-10 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-black" 
                        value="Lainnya"
                    >
                        <IoApps className="md:hidden" />
                        <p className="hidden md:flex">Lainnya</p>
                    </TabsTrigger>
                </div>
                </TabsList>
                
                <motion.div
                    key={selectTab}
                    initial={{ opacity: 0.5, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.4 }}
                >
                {selectTab === "Profile" && (
                <TabsContent value="Profile">
                    <Card className='bg-white shadow-none rounded-t-none'>
                    <CardHeader className=" flex-col text-2xl font-bold p-0">
                        Profil Saya
                    </CardHeader>
                        <form onSubmit={handleSubmit}>
                        <CardContent className='w-full grid grid-cols-1 md:grid-cols-[0.5fr_1.6fr]  gap-4'>
                                <div className="flex flex-col space-y-2">
                                    <div className='w-40 h-40 mx-auto object-cover'>
                                        <Avatar 
                                            name={auth.user?.name ?? ''} 
                                            imageUrl={auth.user?.avatar_url}
                                        />
                                    </div>
                                    <input 
                                        type="file" 
                                        id="aplot-gambar" 
                                        ref={fileInputRef} 
                                        className="hidden"
                                        onChange={handleAvatarUpload}
                                        accept="image/*"
                                    />
                                        <label htmlFor="aplot-gambar">
                                            <Button type="button" className="text-xs" size="sm" variant="profile" onClick={handleClick}>Ganti Foto</Button>
                                        </label>
                                </div>
                                    <div className="items-start flex flex-col">
                                        <CardHeader className="justify-center items-center text-xl font-bold p-0">
                                            Ubah Identitas
                                        </CardHeader>

                                        <Accordion type="multiple"  className="w-full">
                                        <div className="flex flex-col space-y-3">
                                        <AccordionItem value="username">
                                            <div className="flex flex-col items-start">
                                                <div className="flex gap-x-2">
                                                    <p className="font-semibold">Username</p>
                                                    <AccordionTrigger className="p-0 items-center flex [&[data-state=open]>Badge]:rotate-180">
                                                        <Badge variant="accordion" className="transition-transform duration-200">
                                                            Ubah
                                                        </Badge>
                                                    </AccordionTrigger>
                                                </div>
                                                <p className="text-sm text-gray-500"> {auth.user?.name}</p>

                                                
                                                <AccordionContent>
                                                    <Input
                                                        name="name"
                                                        className="border-1"
                                                        placeholder="Nama Baru"
                                                        type="text"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                    />
                                                </AccordionContent>

                                            </div>
                                        </AccordionItem>
                                        
                                        <AccordionItem value="email">
                                            <div className="flex flex-col items-start">
                                                <div className="flex gap-x-2">
                                                    <p className="font-semibold">Email</p>
                                                    <AccordionTrigger className="p-0 items-center flex [&[data-state=open]>Badge]:rotate-180">
                                                        <Badge variant="accordion" className="transition-transform duration-200">
                                                            Ubah
                                                        </Badge>
                                                    </AccordionTrigger>
                                                </div>
                                                <p className="text-sm text-gray-500 "> {auth.user?.email}</p>
                                                <AccordionContent>
                                                    <Input
                                                        name="email"
                                                        className="border-1"
                                                        placeholder="Email Baru"
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                    />
                                                </AccordionContent>
                                            </div> 
                                        </AccordionItem>

                                            {/* <div className="flex flex-col items-start">
                                                <p className="font-semibold">Tanggal Lahir</p>
                                                <p className="text-sm text-gray-500"> 21-07-2007 #Contoh</p>
                                                <input type="date" />
                                            </div>  */}
                                        </div>
                                        </Accordion>

                                        <div className="flex w-full justify-end">
                                            <Button variant="secondary" className=" mt-4" size="sm" type="submit">
                                                Simpan
                                            </Button>
                                        </div>

                                    </div>
                        </CardContent>
                        </form>
                    </Card>

                </TabsContent>
                )}

                {selectTab === "Alamat" && (
                <TabsContent value="Alamat">
                 <Card className='bg-white rounded-t-none'>
                    <CardHeader>
                        <CardTitle>Tentukan Alamat Anda</CardTitle>
                    </CardHeader>
                    <CardContent>
                    {/* <Map /> */}

                    </CardContent>
                    <CardFooter>

                    </CardFooter>
                    </Card>
                </TabsContent>
                )}
                {selectTab === "Lainnya" && (
                <TabsContent value="Lainnya">
                 <Card className='bg-white rounded-t-none'>
                    <CardHeader>
                        {/* <CardTitle>Card Title</CardTitle> */}
                        <CardDescription>
                                <Button variant="default" className="hover:bg-gray-300 rounded-sm">Panel Admin</Button>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Card Content</p>
                    </CardContent>
                    <CardFooter>
                        <p>Card Footer</p>
                    </CardFooter>
                    </Card>
                </TabsContent>
                )}

                </motion.div>
            </Tabs>

        </div>
    );
};
