import { useRef } from "react";
import { FaFireAlt } from "react-icons/fa";

import { Navigation, Pagination, EffectCards } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import { useIsMobile } from '@/hooks/use-mobile';
import type { Swiper as SwiperType } from 'swiper';
import {Card, CardContent} from "@/components/ui/card"
import { ArrowLeft, ArrowRight, icons } from 'lucide-react';
// import jacket from "@/assets/example-product/jacket-hijau.webp"
// import Catjacket from "@/assets/example-category/Cat-Jacket.jpg"
// import Catjeans from "@/assets/example-category/Cat-Jeans.jpg"
// import Catsepatu from "@/assets/example-category/Cat-Sepatu.webp"
// import kemeja from "@/assets/example-product/kemeja.webp"


import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Category {
    name: string;
    slug: string;
    image: string;
  }
  
  interface CategoryProps {
    categories: Category[];
  }

const KategoriProducts = ({ categories }: CategoryProps) => {
    const isMobile = useIsMobile();

    // console.log('Mobile:', isMobile)


          const swiperRef = useRef<SwiperType | null>(null);

          const PrevNavigation = () => (
            <button onClick={() => swiperRef.current?.slidePrev()} className="absolute hidden md:flex -left-5 top-1/2 -translate-y-1/2 w-10 h-10 md:w-10 md:h-10 rounded-full 
            bg-white/90 shadow-md z-10 items-center justify-center text-gray-900 cursor-pointer transition-all duration-300 
            hover:bg-white hover:shadow-lg hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed">
              <ArrowLeft size={24} />
            </button>
          );
          
          const NextNavigation = () => (
            <button onClick={() => swiperRef.current?.slideNext()} className="absolute hidden md:flex -right-5 top-1/2 -translate-y-1/2 w-10 h-10 md:w-10 md:h-10 rounded-full 
            bg-white/90 shadow-md z-10 items-center justify-center text-gray-900 cursor-pointer transition-all duration-300
            hover:bg-white hover:shadow-lg hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed">
              <ArrowRight size={24} />
            </button>
          );

    return (
        <>
        <div className='px-6 md:px-12'>
            <div className="mb-2 md:mb-5">
                <h1 className='text-black font-bold md:text-xl '>Kategori Terpopuler</h1>
                {/* <div className="w-10 h-[3px] rounded-lg bg-black mt-"></div> */}
            </div>
        <div className='relative w-full flex flex-col justify-center h-full'>
        <Swiper
            modules={[Navigation, Pagination, EffectCards]}
            slidesPerView={isMobile ? 2.5 : 6}
            spaceBetween={10}
            initialSlide={1}
            centeredSlides={false}
            effect="card"
            loop={true}
            onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
            className='fashion-swiper w-full rounded-lg items-center flex h-full md:h-40 lg:h-70 py-20'
            >
            {categories.map((category, index) => (
                <SwiperSlide key={index} className="flex flex-col w-full justify-center items-center rounded-xl ">
                <div className='flex justify-center items-center transform cursor-pointer'>
                    <Card className="md:bg-black h-full w-full lg:w-56 lg:h-70 p-0 text-black justify-center shadow-lg  rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="px-0">
                    {isMobile ? (
                        <div className="h-10 w-full space-x-1 flex justify-center items-center bg-transparent rounded-lg border-1 ">
                            <FaFireAlt/>
                            <p className="text-black text-sm font-semibold">{category.name}</p>
                        </div>
                    ) : (
                        <div className="relative overflow-hidden group flex justify-center items-center will-change-transform transition-all duration-300 hover:scale-103 ">
                            <img 
                                src={`/storage/${category.image}`}
                                className="w-full md:h-40 lg:h-70 object-cover transition duration-300 ease-in-out group-hover:opacity-70 will-change-transform" 
                                alt={category.name} 
                                // loading="lazy"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-opacity-0 group-hover:bg-opacity-50 transition duration-300">
                                <p className="text-white lg:text-lg font-semibold opacity-0 group-hover:opacity-100 transition duration-300 transform translate-y-4 group-hover:translate-y-0">
                                {category.name}
                                </p>
                            </div>
                        </div>
                    )}
                    </CardContent>
                    </Card>
                </div>
                </SwiperSlide>
            ))}
        </Swiper>
        <PrevNavigation/>
        <NextNavigation/>
        </div>
        </div>

        </>
    );
}

export default KategoriProducts;