import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";



import "swiper/css";
import "swiper/css/effect-coverflow";

import type { Banner } from "@/types/banner";

interface CarouselProps {
  banners: Banner[];
}

const Carousel = ({ banners }: CarouselProps) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // const [isLoading, setIsLoading] = useState(true);

  // const handleImageLoad = () => {
  //   setIsLoading(false);
  // };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  return (
    <div className="flex justify-center items-center w-full px-4 md:px-6 lg:px-8 ">
      <Swiper
        effect={isMobile ? "slide" : "coverflow"}
        grabCursor={false}
        centeredSlides={true}
        loop={true}
        initialSlide={1}
        slidesPerView={1.5}
        spaceBetween={isMobile ? 10 : 0}
        speed={1000}
        watchSlidesProgress={true}
        allowTouchMove={true}
        updateOnWindowResize={true}
        coverflowEffect={{
          rotate: 3,
          stretch: 10,
          depth: 100,
          modifier: 2,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Autoplay]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        touchRatio={2}
        resistance={true}
        resistanceRatio={0.65}
        className="w-screen max-w-none h-full min-h-[100px] max-h-[600px] transition-all rounded-lg"
      >
        {banners.map((banner, index) => (
          
          <SwiperSlide key={index} className="w-full h-full relative overflow-hidden">
            {/* {isLoading && (
              <Skeleton className="absolute inset-0 w-full h-full" />
            )} */}
            <img
              src={`/storage/${banner.image_path}`}
              alt={banner.title}
              loading="lazy"
              className="w-full h-full object-cover rounded-lg brightness-100 contrast-100 "
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
