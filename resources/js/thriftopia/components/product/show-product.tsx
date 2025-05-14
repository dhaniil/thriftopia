import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { router } from '@inertiajs/react';
import {Card, CardContent, CardTitle} from "@/components/ui/card";
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import KategoriProducts from './category-product/category-product';
import { Link } from '@inertiajs/react';
import { Badge } from "@/components/ui/badge"
import { Ellipsis, ShoppingCart } from 'lucide-react';
import type { Product } from "@/types/product";

interface CategoryProps {
    categories: Array<{
        name: string;
        slug: string;
        image: string;
    }>;
}

interface ListProductsProps {
    title?: string;
    subTitle?: string;
    showFilter?: boolean;
    products: Product[];
}

function Kategori({categories}: CategoryProps) {
    return (
        <>
            <div>
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

function ListProducts({ 
    title = "Jelajahi", 
    showFilter = true, 
    subTitle="Temukan Gaya Terbaikmu!",
    products
}: ListProductsProps) {
    const [loading, setLoading] = useState(false);

    const addToCart = (productId: number) => {
        setLoading(true);
        router.post('/cart', {
            product_id: productId,
            quantity: 1
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setLoading(false);
            },
            onError: () => {
                setLoading(false);
            }
        });
    };

    return (
        <>
        <div className='md:px-12'>
            <div className='px-8 mb-4'>
                <h1 className='text-black text-2xl font-extrabold'>{title}</h1>

                {showFilter && (
                <div className='flex gap-4 mt-4'>
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
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <div className='bg-white grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 w-full my-4 rounded-2xl p-2 md:gap-y-6 gap-2'>
                        {products.map((product: Product) => (
                            <CardContent key={product.id} className="flex flex-col items-center justify-center space-y-4 px-0">
                                <div className="flex flex-wrap gap-4 justify-center">
                                    <div className="bg-white shadow-lg rounded-lg overflow-hidden md:w-50 h-73 p-4 relative hover:scale-101 transition-all duration-300 will-change-transform">
                                        <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md" />
                                        <div className="px-2 py-2 flex flex-col justify-between item">
                                            <div className='w-full'>
                                                <h3 className="text-sm w-full h-full line-clamp-2">{product.name}</h3>
                                                <p className="text-gray-600 text-md font-bold">Rp {product.price.toLocaleString("id-ID")}</p>
                                                <Badge variant="size">{product.size}</Badge>
                                            </div>
                                            <div className='flex justify-between items-center w-full mt-2'>
                                                <button 
                                                    onClick={() => addToCart(product.id)}
                                                    className='hover:text-blue-600 transition-colors'
                                                >
                                                    <ShoppingCart size={20} />
                                                </button>
                                                <DropdownMenu modal={false}>
                                                    <DropdownMenuTrigger className='cursor-pointer'>
                                                        <Ellipsis size={16} className='text-gray-500' />
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
                )}
            </Card>
        </div>
        </>
    )
}

export { SloganProducts, Kategori, ListProducts };
