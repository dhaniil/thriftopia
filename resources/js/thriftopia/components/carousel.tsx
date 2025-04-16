import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import { useState, useEffect } from "react";

import "swiper/css";
import "swiper/css/effect-coverflow";
// import "swiper/css/navigation";
// import "swiper/css/pagination";


const movies = [
  { title: "Justice League", image: "https://i.pinimg.com/736x/4c/6a/93/4c6a93819a285733c206039a1fd1f0ce.jpg" },
  { title: "Justice League", image: "https://i.pinimg.com/736x/4c/6a/93/4c6a93819a285733c206039a1fd1f0ce.jpg" },
  { title: "Justice League", image: "https://i.pinimg.com/736x/4c/6a/93/4c6a93819a285733c206039a1fd1f0ce.jpg" },
  { title: "Justice League", image: "https://i.pinimg.com/736x/4c/6a/93/4c6a93819a285733c206039a1fd1f0ce.jpg" },
  { title: "Justice League", image: "https://i.pinimg.com/736x/4c/6a/93/4c6a93819a285733c206039a1fd1f0ce.jpg" },
  // { title: "Guardians of the Galaxy", image: "https://i.pinimg.com/736x/78/93/4f/78934fc7f30fc1e3a3ea54cd14f46041.jpg" },
  // { title: "Spider-Man", image: "https://i.pinimg.com/736x/4c/6a/93/4c6a93819a285733c206039a1fd1f0ce.jpg" },
  // { title: "Avengers", image: "https://i.pinimg.com/736x/ce/69/7b/ce697be0112d8be66c81dc79d37d5607.jpg" },
];

const Carousel = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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
        grabCursor={true}
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
        {movies.map((movie, index) => (
          <SwiperSlide key={index} className="w-full h-full relative overflow-hidden">
            <img
              src={movie.image}
              alt={movie.title}
              loading="lazy"
              className="w-full h-full object-cover rounded-lg "
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
