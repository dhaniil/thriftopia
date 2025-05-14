import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";
import { Head } from '@inertiajs/react';
import Carousel from "@/components/carousel";
import {SloganProducts, ListProducts} from "@/components/product/show-product";
import KategoriProducts from "@/components/product/category-product/category-product";
import WhyChoose from "@/components/other/why-choose";
import type { Banner } from "@/types/banner";

interface Props {
  banners: Banner[];
  categories: Array<{
    name: string;
    slug: string;
    image: string;
  }>;
  products: Array<{
    id: number;
    name: string;
    price: number;
    size: string;
    image: string;
  }>;
}

export default function HomePage({ banners, categories, products }: Props) {
  return (
    <>
      <Head title="Gaya Irit, Tetap Keren!" />
      <div className="flex flex-col min-h-screen bg-[#f2f2f2]">
        <div className="flex justify-center shadow-sm">
          <Navbar />
        </div>
        
        <main className="flex-grow container space-y-5 md:space-y-10 mx-auto mt-20 mb-25 md:mt-40">
          <Carousel banners={banners} />
          <KategoriProducts categories={categories} />
          <SloganProducts/>
          <ListProducts products={products} />
          <WhyChoose/>
        </main>

        <Footer />
      </div>
    </>
  );
}
