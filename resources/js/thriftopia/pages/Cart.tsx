import Navbar from "@/components/navigation/navbar";
import { Head } from "@inertiajs/react";
import ShowCart from "@/components/cart/show-cart";
import Footer from "@/components/navigation/footer";
import CartContent from "@/components/cart";

export default function Cart() {
    return (
        <>
      <Head title="Keranjang Saya" />
        <div className="bg-[#e6e6e6] min-h-screen">
            <div className="flex justify-center">
                <Navbar />
            </div>
            <main className="container mx-auto my-25 md:mt-40 text-center">
            {/* <CartContent/> */}
            <ShowCart/>
            </main>
            <Footer />
        </div>
        </>
    );
};