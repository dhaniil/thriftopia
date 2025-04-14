import kaos from "@/assets/example-product/kaos.jpg"
import sepatu from "@/assets/example-product/sepatu.jpg"
import kemeja from "@/assets/example-product/kemeja.webp"
import jean from "@/assets/example-product/jeans.webp"
import jacket from "@/assets/example-product/jacket-hijau.webp"
import produk from "@/assets/example-product/ex-produk.png"
import krop from "@/assets/example-product/crop-top.jpeg"
import hoodie from "@/assets/example-product/hoodie.jpg"
export default function BentoGrid(){
    return (
    <>
    <div className="px-12 space-y-4">
        <h1 className="text-black text-2xl font-bold">Pilih Kategorimu</h1>
    <div className="container  grid grid-cols-5 grid-rows-5 gap-3 text-black h-80">
        <div className="h-full shadow rounded-md col-span-2 row-span-2 bg-gray-300 object-cover relative">
            <img src={hoodie} className="w-full h-full object-cover rounded-md opacity-50 flex items-start hover:scale-103 hover:opacity-100 transition-all duration-300 will-change-transform cursor-pointer" alt="" draggable="false" />
            <p className="absolute bottom-2 right-4 text-2xl font-semibold">Hoodie</p>
        </div>
        <div className="h-full shadow rounded-md row-span-3 col-start-1 row-start-3 bg-gray-300 relative">
            <img src={jacket} className="w-full h-full object-cover rounded-md opacity-50 flex items-start hover:scale-103 hover:opacity-100 transition-all duration-300 will-change-transform cursor-pointer" alt="" draggable="false" />
            <p className="absolute bottom-2 right-4 text-2xl font-semibold">Jacket</p>
        </div>
        <div className="h-full shadow rounded-md col-span-2 row-span-3 col-start-4 row-start-3 bg-gray-300 relative">
            <img src={kemeja} className="w-full h-full object-cover rounded-md opacity-50 flex items-start hover:scale-103 hover:opacity-100 transition-all duration-300 will-change-transform cursor-pointer" alt="" draggable="false" />
            <p className="absolute bottom-2 left-4 text-2xl font-semibold">Kemeja</p>
        </div>
        <div className="h-full shadow rounded-md row-span-3 col-start-2 row-start-3 bg-gray-300 relative">
            <img src={sepatu} className="w-full h-full object-cover rounded-md opacity-50 flex items-start hover:scale-103 hover:opacity-100 transition-all duration-300 will-change-transform cursor-pointer" alt="" draggable="false" />
            <p className="absolute bottom-2 right-4 text-2xl font-semibold">Sepatu</p>
        </div>
            <div className="h-full shadow rounded-md row-span-2 col-start-5 row-start-1 bg-gray-300 relative">
                <img src={produk} className="w-full h-full object-cover rounded-md opacity-50 flex items-start hover:scale-103 hover:opacity-100 transition-all duration-300 will-change-transform cursor-pointer" alt="" draggable="false" />
                <p className="absolute bottom-2 right-4 text-2xl font-semibold">Lainnya</p>
            </div>
            <div className="h-full shadow rounded-md row-span-3 col-start-3 row-start-1 bg-gray-300 relative">
                <img src={jean} className="w-full h-full object-cover rounded-md opacity-50 flex items-start hover:scale-103 hover:opacity-100 transition-all duration-300 will-change-transform cursor-pointer" alt="" draggable="false" />
                <p className="absolute bottom-2 left-4 text-2xl font-semibold">Jeans</p>
            </div>
            <div className="h-full shadow rounded-md row-span-2 col-start-3 row-start-4 bg-gray-300 relative">
                <img src={krop} className="w-full h-full object-cover rounded-md opacity-50 flex items-start hover:scale-103 hover:opacity-100 transition-all duration-300 will-change-transform cursor-pointer" alt="" draggable="false" />
                <p className="absolute top-2 right-4 text-2xl font-semibold">Krop</p>
            </div>
            <div className="h-full shadow rounded-md row-span-2 col-start-4 row-start-1 bg-gray-300 relative">
                <img src={kaos} className="w-full h-full object-cover rounded-md opacity-50 flex items-start hover:scale-103 hover:opacity-100 transition-all duration-300 will-change-transform cursor-pointer" alt="" draggable="false" />
                <p className="absolute bottom-2 right-4 text-2xl font-semibold">Kaos</p>
            </div>
    </div>
    </div>
    </>
    )
}