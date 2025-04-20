import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";
import jacket from "@/assets/example-product/jacket-hijau.webp"
import kemeja from "@/assets/example-product/kemeja.webp"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

const bajus = [
    {title: "Jacket", image: jacket},
    {title: "Kemeja", image: kemeja},
    {title: "Jacket", image: jacket},
    {title: "Kemeja", image: kemeja},
    {title: "Jacket", image: jacket},
    {title: "Kemeja", image: kemeja},
    {title: "Jacket", image: jacket},
    {title: "Kemeja", image: kemeja},
    {title: "Jacket", image: jacket},
    {title: "Kemeja", image: kemeja},
]



const Baju = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    
      useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);
    return(
        <>
            <Swiper
                modules={[Navigation, Pagination, EffectCoverflow]}
                slidesPerView={isMobile ? 1 :6}
                grabCursor={true}
                initialSlide={3}
                centeredSlides={true}
                effect="coverflow"
                coverflowEffect={{
                    rotate: 2,
                    stretch: 0,
                    depth: 50,
                    modifier: 3,
                    slideShadows: false,
                }}
                loop={true}
                navigation
                className='w-full rounded-lg items-center flex h-60 py-8'
            >
            {bajus.map((baju, index) => (
                    <SwiperSlide key={index} className="flex w-full justify-center items-center rounded-xl">
                        <div className='flex justify-center items-center transform transition-all duration-300 hover:scale-105'>
                            <Card className="bg-white w-64 py-2 text-black justify-center shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                <CardContent className="p-2">
                                    <div className="relative overflow-hidden group ">
                                        <img 
                                            src={baju.image} 
                                            className="w-full h-35 object-cover" 
                                            alt="Jacket" 
                                            loading='lazy'
                                        />
                                        {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" /> */}
                                    </div>
                                    <div className="mt-4 text-center">
                                        <h3 className="font-semibold text-lg">{baju.title}</h3>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

const Celana = () => {
    return(
        <>
        </>
    )
}

const Sepatu = () => {
    return(
        <>
        </>
    )
}

const Aksesoris = () => {
    return(
        <>
        </>
    )
}

export { Baju, Celana, Sepatu, Aksesoris };