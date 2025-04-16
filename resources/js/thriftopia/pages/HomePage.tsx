import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";
import { Head, Link } from '@inertiajs/react';
import Carousel from "@/components/carousel";
import {SloganProducts, Kategori, ListProducts} from "@/components/product/show-product";
import WhyChoose from "@/components/other/why-choose";
// import { useEffect } from "react";

export default function HomePage() {
  return (
    <>
      <Head title="Gaya Irit, Tetap Keren!" />
    <div className="flex flex-col min-h-screen bg-[#f2f2f2]">
      <div className="flex justify-center shadow-sm">
        <Navbar />
      </div>
      
      <main className="flex-grow container space-y-5 md:space-y-10 mx-auto mt-20 mb-25 md:mt-40">
        {/* Carousel Atas */}
        <Carousel />
        {/* <Link href={route("kategori")}>
        <p className="text-black p-4 bg-gray-300">kategori</p>
        </Link> */}
        {/* Kategori Section */}
        <Kategori/>

        <SloganProducts/>

        {/* List Produk */}
        <ListProducts/>

        <WhyChoose/>
      </main>


      <Footer />
    </div>
    </>
  );
}
