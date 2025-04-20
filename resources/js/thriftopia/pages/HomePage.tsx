import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";
import { Head } from '@inertiajs/react';
import Carousel from "@/components/carousel";
import {SloganProducts, ListProducts} from "@/components/product/show-product";
import KategoriProducts from "@/components/product/category-product/category-product";
import WhyChoose from "@/components/other/why-choose";
// import { useEffect } from "react";

interface Props {
  banners: Array<{
    title: string;
    description: string;
    image_path: string;
  }>;
  categories: Array<{
    name: string;
    slug: string;
    image: string;
  }>;
}

export default function HomePage({ banners, categories }: Props) {
  return (
    <>
      <Head title="Gaya Irit, Tetap Keren!" />
    <div className="flex flex-col min-h-screen bg-[#f2f2f2]">
      <div className="flex justify-center shadow-sm">
        <Navbar />
      </div>
      
      <main className="flex-grow container space-y-5 md:space-y-10 mx-auto mt-20 mb-25 md:mt-40">
        {/* Carousel Atas */}
        <Carousel banners={banners} />
        {/* Kategori Section */}
        <KategoriProducts categories={categories} />

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
