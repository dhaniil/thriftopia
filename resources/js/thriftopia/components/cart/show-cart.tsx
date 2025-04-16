import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  

function ShowCart() {
  return (
    <>
    <div className='px-6 '>
        <div className='w-full bg-white flex items-center space-x-2 px-4 py-2 mb-3 rounded-md'>
            <Checkbox id="checkbox-1" className="peer" />
            <p className='text-black'>Semua Produk</p>
        </div>
        <div className='text-black grid grid-cols-1 md:grid-cols-[1fr_0.5fr] gap-y-4 md:gap-x-2'>
            <Card>
                <CardContent className='px-4'>
                    <div className='flex items-center space-x-2'>
                        <Checkbox id="checkbox-1" className="peer" />
                        <img src="https://thriftopia.id/storage/products/thumbnail/1682052030.png" alt="" className='w-20 h-20 object-cover rounded-md' />
                        <div className='flex flex-col items-start'>
                            <h1 className='text-black text-lg font-bold mb-2'>Kaos Curian Andhika</h1>
                            <p className='text-black'>Size: L</p>
                            <p className='text-black'>Jumlah: 2</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className='bg-white rounded-md'>
            <h1 className='text-black'>asdadsadadsada</h1>

            </div>
        </div>
    </div>
    </>
  );
}  

export default ShowCart;