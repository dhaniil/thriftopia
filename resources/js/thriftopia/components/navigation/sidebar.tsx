import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
// import { Button } from "@/components/ui/button";
// import sigma from '@/assets/icon/sigma.webp';
import { usePage, Link } from '@inertiajs/react';
import type { User } from '@/types';
import { IoIosArrowForward } from "react-icons/io";
import Avatar from "@/components/profile-menu/avatar";



export default function Sidebar() {
        const auth = usePage().props.auth as { user: User | null };

    return(
    <Card className="w-full h-full max-h-85 bg-white gap-4">
        <CardHeader className="flex-col">
            <div className='w-18 h-18 mx-auto object-cover'>
                <Avatar name={auth.user?.name ?? ''} ></Avatar>
            </div>
            <div>
            <CardTitle className="text-sm">{auth.user?.name}</CardTitle>
            <CardDescription>
                {auth.user?.email}
            </CardDescription>
            </div>
        <div className="border-1 border-gray-200"></div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 text-sm items-start">
            <CardTitle>
                INFO
            </CardTitle>
            <Link
                href={route('profile')}
                className="flex items-center w-full justify-between hover:bg-gray-100 hover:translate-x-1 rounded-sm p-2 transition-all duration-300">
                    <p>Profil Saya</p>
                    <IoIosArrowForward />
            </Link>
            <Link
                href={route('profile')}
                className="flex items-center w-full justify-between hover:bg-gray-100 hover:translate-x-1 rounded-sm p-2 transition-all duration-300">
                    <p>Wishlist</p>
                    <IoIosArrowForward />
            </Link>
            <Link
                href={route('cart')}
                className="flex items-center w-full justify-between hover:bg-gray-100 hover:translate-x-1 rounded-sm p-2 transition-all duration-300">
                    <p>Keranjang Saya</p>
                    <span className="flex">
                    <Badge variant="amount">4</Badge>
                    {/* <IoIosArrowForward /> */}
                    </span>
            </Link>
            
        </CardContent>
        <CardFooter>
            {/* <p>Card Footer</p> */}
        </CardFooter>
    </Card>
)
}