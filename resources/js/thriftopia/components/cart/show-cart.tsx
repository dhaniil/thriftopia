import React from 'react';
import { MapPinCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react';
import {Card, CardContent } from "@/components/ui/card"
import { useIsMobile } from '@/hooks/use-mobile';
import hoodie from "@/assets/example-product/hoodie.jpg"
  

function ShowCart() {
const isMobile = useIsMobile();
const ListCarts = [
    { id: 1, name: "Kaos Curian Andhika sadasdasda dasdasdasda sdaddadsadasd asdsadas asdadad adsadad asdasd adasdasdas", size: "L", brand: "NIk", quantity: 2, price: 200000, image: hoodie },
    { id: 1, name: "Kaos Curian Andhika", size: "L", brand: "NgawiSports", quantity: 2, price: 200000, image: hoodie },
    { id: 1, name: "Kaos Curian Andhika", size: "L", brand: "NgawiSports", quantity: 2, price: 150000, image: hoodie },
    { id: 1, name: "Kaos Curian Andhika", size: "L", brand: "NgawiSports", quantity: 2, price: 200000, image: hoodie },
    { id: 1, name: "Kaos Curian Andhika", size: "L", brand: "NgawiSports", quantity: 2, price: 200000, image: hoodie },
    { id: 1, name: "Kaos Curian Andhika", size: "L", brand: "NgawiSports", quantity: 2, price: 200000, image: hoodie },
    { id: 1, name: "Kaos Curian Andhika", size: "L", brand: "NgawiSports", quantity: 2, price: 200000, image: hoodie },

];

  return (
    <>
    <div className='px-2 md:px-12 '>
        <div className='w-full bg-white px-4 py-2 mb-3 rounded-md'>
            <span className='flex items-center space-x-2 '> 
                <Checkbox id="checkbox-1" className="peer" />
                <label htmlFor="checkbox-1" className="text-sm text-black select-none font-medium cursor-pointer">
                    Semua Produk
                </label>
            </span>
            {/* <p className='text-black m-0 text-start'>Harga</p> */}
        </div>
        <div className='text-black grid grid-cols-1 md:grid-cols-[1fr_0.5fr] gap-y-4 md:gap-x-8'>
            <div className='space-y-2 md:overflow-y-auto md:h-[61vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-white 
            [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-[#d9d9d9] 
            [&::-webkit-scrollbar-track]:rounded-full'>
                
                {ListCarts.map((cart, index) => (
            <Card key={index} className='py-4 mr-1'>
                <CardContent className='px-4 flex justify-between md:grid md:grid-cols-[1fr_0.4fr] w-full'>
                    <div className='flex items-center space-x-2'>
                        <Checkbox id="checkbox-1" className="peer" />
                        <img src={cart.image} alt="" className='w-15 h-15 md:w-20 md:h-20 object-cover rounded-md shadow-md' />
                        <div className='flex flex-col items-start'>
                            <h1 className='text-black text-sm md:text-md w-36 sm:w-80 md:w-full font-bold text-start line-clamp-2'>{cart.name}</h1>
                            <div className='text-start flex flex-col justify-start text-xs '>
                                <p className='text-black'>Size: {cart.size}</p>
                                <p className='text-black'>Jumlah: {cart.quantity}</p>
                                <p className='text-black'>Brand: {cart.brand}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row items-center justify-center md:space-x-5 lg:space-x-20'>
                        <p className='text-sm md:text-md mb-2 md:mb-0'>Rp {cart.price.toLocaleString('id-ID')}</p>
                        <Button variant="ghost">
                            <Trash2 size={20} />
                        </Button>
                    </div>
                </CardContent>
            </Card>
                ))}
            </div>

                <Card className='md:h-75'>
                    <CardContent>
                        <h1 className='text-black text-start'>Lokasi</h1>
                        <div className='flex items-center space-x-2'>
                            <MapPinCheck size={16} />
                            <span className='text-xs text-start'>Jl. STM Pembangunan, Mrican, Caturtunggal</span>
                        </div>
                        <Separator/>
                        <div>
                            <h1 className='text-start font-bold text-lg'>Ringkasan Pesanan</h1>
                            <div className='space-y-1 text-sm'>
                                <div className='flex items-center justify-between'>
                                    <p>Subtotal</p>
                                    <p>Rp {ListCarts.reduce((total, cart) => total + (cart.price * cart.quantity), 0).toLocaleString('id-ID')},00</p>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p>Ongkir</p>
                                    <p>Rp 10.000,00</p>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p>Promo</p>
                                    <p>Rp 5.000,00</p>
                                </div>
                            </div>
                            <div className='flex items-center text-sm justify-between mt-4'>
                                <p>Total</p>
                                <p>Rp 3.000.000,00</p>
                            </div>
                        </div>
                        <Separator className='hidden md:flex'/>

                        {isMobile ? (
                        <div className='fixed bg-white bottom-0 w-full px-4 pt-2 pb-3 left-0 z-50 shadow-md flex items-center justify-between'>
                            
                            <div className='flex items-center space-x-2 w-full'>
                                <p className='font-bold'>Total:</p>
                                <p className=''>Rp 3.000.000</p>
                            </div>
                            <Button variant='secondary' className='  bottom-0'>
                                BELI SEKARANG
                            </Button>
                        </div>
                        ) : (
                        <Button variant='secondary' className='w-full mt-4'>
                            BELI SEKARANG
                        </Button>
                        )}

                    </CardContent>
                </Card>

        </div>
    </div>
    </>
  );
}  

export default ShowCart;