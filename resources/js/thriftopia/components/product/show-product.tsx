import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {Card, CardDivider, CardDescription, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import KategoriProducts from './category-product/category-product';
  
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Link } from '@inertiajs/react';
import kaos from "@/assets/example-product/kaos.jpg"
import sepatu from "@/assets/example-product/sepatu.jpg"
import kemeja from "@/assets/example-product/kemeja.webp"
import jean from "@/assets/example-product/jeans.webp"
import jacket from "@/assets/example-product/jacket-hijau.webp"
import produk from "@/assets/example-product/ex-produk.png"
import krop from "@/assets/example-product/crop-top.jpeg"
import hoodie from "@/assets/example-product/hoodie.jpg"

import {Baju, Celana, Sepatu, Aksesoris} from "@/components/product/category-product/category";
import { IoShirtOutline } from "react-icons/io5";
import { Badge } from "@/components/ui/badge"
import { PiPantsLight } from "react-icons/pi";
import { TbShoe } from "react-icons/tb";
import { GiPearlNecklace } from "react-icons/gi";
import { Ellipsis } from 'lucide-react';
import { ListBaseProps } from 'node_modules/@ark-ui/react/dist/components/tabs/tabs';
import Categories from '@/pages/Categories';

interface ListProductsProps {
    title?: string;
    subTitle?: string;
    showFilter?: boolean;
    products: { title: string; price: number; size: string; image: string }[];
    }

    interface Props {
    categories: Array<{
        name: string;
        slug: string;
        image: string;
        }>;
    }

function Kategori({categories}: Props) {
    return (
        <>
        <div>
            {/* <h1 className='text-black font-bold md:text-xl mb-4 px-12'>Kategori Terpopuler</h1> */}
            <KategoriProducts categories={categories}/>
        </div>
        </>
    );
}

function SloganProducts () {

    return (
        <>
            <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="container w-full flex justify-center md:px-40 md:my-20"
            >
            <div className='container bg-gray-200 flex flex-col items-center rounded-2xl justify-center w-full h-20 md:h-40 px-8 '>
                <h1 className='text-black text-lg md:text-3xl font-bold'>Pilih Yang Kamu Suka!</h1>
                <p className='text-black text-sm md:text-md text-center'>Siap tampil stylish dengan harga hemat.</p>
            </div>
            </motion.div>

        </>
    )
}

function ListProducts({ title = "Jelajahi", showFilter = true, subTitle="Temukan Gaya Terbaikmu!" , products }: ListProductsProps) {

    const IsiProduct = [
        { title: 'Kaos Polos Oblong Pendek Soft Combed 30s', price: 20000, size: "XL", image: kaos },
        { title: 'Kemeja Polos Lengan Panjang Trendy Murah', price: 20000, size: "XLL", image: kemeja },
        { title: 'Sepatu Formal Fulture Corduroy Black', price: 20000, size: "M", image: sepatu },
        { title: 'Celana Jeans Panjang Wanita Cutbray Highwaist Korean Style', price: 20000, size: "M", image: jean },
        { title: 'Kaos Polos Oblong Pendek Soft Combed 30s', price: 20000, size: "XL", image: kaos },
        { title: 'Kemeja Polos Lengan Panjang Trendy Murah', price: 20000, size: "XLL", image: kemeja },
        { title: 'Sepatu Formal Fulture Corduroy Black', price: 20000, size: "M", image: sepatu },
        { title: 'Celana Cik', price: 20000, size: "M", image: jean },
        { title: 'Celana Cik', price: 20000, size: "M", image: jean },
        { title: 'Kaos Polos Oblong Pendek Soft Combed 30s', price: 20000, size: "XL", image: kaos },
        { title: 'Kemeja Polos Lengan Panjang Trendy Murah', price: 20000, size: "XLL", image: kemeja },
        { title: 'Sepatu Formal Fulture Corduroy Black', price: 20000, size: "M", image: sepatu },
        { title: 'Jacket Hijau NIKE masih ori loh ya cik', price: 200000, size: "M", image: krop },
        { title: 'Jacket Hijau NIKE masih ori loh ya', price: 3500000, size: "M", image: produk },
        { title: 'Krop top idaman ibu-ibu Jaksel Loh ya', price: 200000, size: "M", image: hoodie },
        { title: 'Krop top idaman ibu-ibu Jaksel Loh ya', price: 200000, size: "M", image: jacket },
    ];

    return (
        <>
        <div className='md:px-12'>
        <div className='px-8 mb-4'>
            <h1 className='text-black text-2xl font-extrabold'>{title}</h1>

            {showFilter && (
            <div className='flex  gap-4 mt-4'>
            <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Kategori"/>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
            </SelectContent>
            </Select>

            <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Ukuran" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
            </SelectContent>
            </Select>
            </div>
            )}
        </div>
        <Card className="pt-4 md:rounded-xl">
            <CardTitle className='text-xl md:text-2xl font-extrabold px-8'>
            {subTitle}
            </CardTitle>
            <div className='bg-white grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 w-full my-4 rounded-2xl p-2 md:gap-y-6 gap-2'>
            {IsiProduct.map((product, index) => (
                <CardContent key={index} className="flex flex-col items-center justify-center space-y-4 px-0 ">
                    <div className="flex flex-wrap gap-4 justify-center">
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden md:w-50 h-73 p-4 relative hover:scale-101 transition-all duration-300 will-change-transform">
                            <img src={product.image} alt="Product" className="w-full h-40 object-cover rounded-md"  />
                            <div className="px-2 py-2 flex flex-col justify-between item">
                                <div className='w-full'>
                                    <h3 className="text-sm w-full h-full line-clamp-2">{product.title}</h3>
                                    <p className="text-gray-600 text-md font-bold">Rp {product.price.toLocaleString("id-ID")}</p>
                                    <Badge variant="size">{product.size}</Badge>
                                </div>
                                <div className='absolute bottom-1 right-5'>
                                    <DropdownMenu modal={false}>
                                        <DropdownMenuTrigger className='cursor-pointer '>
                                            <Ellipsis size={16} className=' text-gray-500' />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align='start' className='bg-white p-2'>
                                            <Link href='#'>
                                            <p className='text-xs font-medium text-gray-500'>Tambahkan Ke Wishlist</p>
                                            </Link>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            ))}
            </div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                    <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                    <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                    <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                    <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
                </Pagination>
        </Card>
        
        </div>
        </>
    )
}
export { SloganProducts, Kategori, ListProducts };

