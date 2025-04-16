import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";
import ViewProduct from "@/components/product/detail-product/view-product";
import {ListProducts} from "@/components/product/show-product";

import { Head } from '@inertiajs/react';
// import { useEffect } from "react";
export default function DetailProduct() {
  return (
    <>
    <Head title="Product" />
    <div className="flex flex-col min-h-screen bg-[#f2f2f2]">
      <div className="flex justify-center shadow-sm">
        <Navbar />
      </div>
      
      <main className="flex-grow container space-y-5 md:space-y-10 mx-auto mt-20 mb-25 md:mt-40">
        <ViewProduct/>

        <ListProducts 
          title="" 
          showFilter={false} 
          subTitle="Produk Serupa"
        // products={IsiProducts}
        />
    
    </main>


      <Footer />
    </div>
    </>
  );
}
