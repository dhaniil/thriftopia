import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";
import { Head, Link } from '@inertiajs/react';
import { ListProducts } from "@/components/product/show-product";

export default function Categories() {
    return (
        <>
        <Head title="Categories" />

            <div className="bg-[#f2f2f2] min-h-screen">
                <div className="flex justify-center">
                    <Navbar />
                </div>
                <main className="container mx-auto my-25 md:mt-40 ">

                    <ListProducts>
                        
                    </ListProducts>
                </main>
                <Footer />
            </div>
        </>
    );
}