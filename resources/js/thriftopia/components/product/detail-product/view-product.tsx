import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

import kaos from "@/assets/example-product/kaos.jpg"
// import jacket from "@/assets/example-product/jacket-hijau.webp"
import hoodie from "@/assets/example-product/hoodie.jpg"
import kemeja from "@/assets/example-product/kemeja.webp"
import { Button } from "@/components/ui/button";
import { IoCartOutline } from "react-icons/io5";
import { Badge } from "@/components/ui/badge"



function ViewProduct() {
    const [expanded, setExpanded] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);
    const isMobile = useIsMobile();
    
    const images = [
        { id: 1, img: kaos },
        { id: 2, img: hoodie },
        { id: 3, img: kemeja },
        { id: 4, img: kaos },
        { id: 4, img: kaos },
    ];  
    const [selectedImage, setSelectedImage] = useState(images[0]);

    useEffect(() => {
        const el = textRef.current;
        if (el && el.scrollHeight > el.clientHeight) {
          setIsOverflowing(true);
        } else {
          setIsOverflowing(false);
        }
      }, []);

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-2 md:py-10 p-6 md:px-30 rounded-lg gap-4 lg:gap-20 ">

        {/* Gambar Produk */}
        <div className="grid grid-cols-1 md:grid-cols-[0.4fr_2fr] gap-y-4 md:gap-x-2 ">
            <div className=" space-x-2 md:space-y-2 md:flex-col flex w-full items-center justify-center order-2 md:order-1">
                
            {images.map((img, index) => (
                <div className={'w-14 h-14 md:w-20 md:h-20 lg:w-12 lg:h-12 xl:w-18 xl:h-18 2xl:w-22 2xl:h-22  drop-shadow-md flex items-center rounded-lg opacity-80 cursor-pointer'}>
                    <img 
                    key={index}
                    src={img.img}
                    alt={`thumbnail-${index}`}
                    onClick={() => setSelectedImage(img)}
                    loading="lazy"
                    className={`w-full h-full object-cover rounded-md border border-gray-300 transition-all duration-300 will-change-transform ${selectedImage.img === img.img ? "border-gray-300 opacity-100" : "border-none opacity-80"}`}/>
                </div>
                ))}
            
            </div>
            <div className="w-full justify-self-center self-center  max-w-xs md:max-w-lg aspect-square flex items-center justify-center rounded-2xl order-1 md:order-2 overflow-hidden shadow-md">
                <img 
                src={selectedImage.img}
                alt="selected"
                className="w-full h-full object-cover rounded-md transition-all duration-600 will-change-transform"
                draggable="false"
                loading="lazy"/>
            </div>

        </div>

        {/* Deskripsi */}
        <div className="flex flex-col self-start">
            <div className="flex space-x-2 mb-1 ">
                <Badge variant="category" className="py-1 ">Jacket</Badge>  
                <Badge variant="category" className="py-1 ">Pria</Badge>    
            </div>
            <div className="w-full max-w-3xl justify-between">
                <h1 className="text-black text-lg md:text-2xl font-semibold mb-4">Jacket Kulit Hijau Asli dari Mojokerto Bahan Kulit Aseli Biawak Batam</h1>
                <p className="text-black font-bold text-md md:text-lg">Rp 300.000</p>
            </div>

            <div>
                <p 
                ref={textRef}
                className={`${expanded ? "whitespace-pre-line text-black" : "line-clamp-4 whitespace-pre-line text-black"}`}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti, dolores animi quae consectetur qui reiciendis quod placeat
                    Totam porro officiis, autem consequatur vel voluptatibus a sequi similique, nam perspiciatis cupiditate.
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit, asperiores quis. Facere ullam harum inventore quis fuga sunt. 
                    Quasi sequi cumque quis officia reprehenderit delectus est sit iure non nisi!
                </p>
                {isOverflowing && (
                    <button
                    onClick={() => setExpanded(!expanded)}
                    className="font-semibold text-black hover:underline cursor-pointer"
                >
                    {expanded ? "Tampilkan Lebih Sedikit" : "Tampilkan Lebih Banyak"}
                </button>
                )}
            </div>
            <div>
                <h1 className="text-black text-lg font-semibold mt-4 mb-2 space-x-2">
                   <span>Size</span> 
                    <Badge variant="size2">L</Badge>
                    {/* <Badge variant="size2">Color</Badge> */}
                </h1>
            {/* <div className="w-full h-px bg-black my-2"></div> */}

            </div>
            <div className="w-full h-px bg-black my-2"></div>
            {isMobile ? (
                <div className="fixed bottom-0 flex space-x-4 w-full bg-white left-0 p-4 z-50">
                    <Button variant="secondary" className="w-full text-md font-bold h-10">BELI SEKARANG</Button>
                    <Button variant="profile" className="w-full text-md font-bold h-10">
                        <IoCartOutline className="text-4xl"/>
                            Keranjang
                    </Button>
                    </div>

                ) : (
                    <div className="flex flex-col gap-2">
                    <Button variant="secondary" className="w-full text-lg font-bold h-10">BELI SEKARANG</Button>
                    <Button variant="profile" className="w-full text-lg font-bold h-10">
                        <IoCartOutline className="text-4xl"/>
                            Keranjang
                    </Button>
                    </div>

                )}
        </div>
    </div>
    </>
  );
}

export default ViewProduct;