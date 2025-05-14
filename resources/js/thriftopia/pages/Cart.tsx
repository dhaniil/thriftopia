import Navbar from "@/components/navigation/navbar";
import { Head } from "@inertiajs/react";
import { useEffect } from "react";
import ShowCart from "@/components/cart/show-cart";
import Footer from "@/components/navigation/footer";
import { ListProducts } from "@/components/product/show-product";
import type { CartItem } from "@/types/cart";
import type { ShippingAddress } from "@/types/shipping";

interface Props {
    items?: CartItem[];
    addresses?: ShippingAddress[];
    defaultAddress?: ShippingAddress;
    error?: string;
    script?: string;
}

export default function Cart({ items = [], addresses = [], defaultAddress, error, script }: Props) {
    useEffect(() => {
        if (error) {
            console.error('Cart Error:', error);
        }
        if (script) {
            // Execute the redirect script
            const executeScript = new Function(script);
            executeScript();
        }
    }, [items, addresses, defaultAddress, error, script]);

    return (
        <>
            <Head title="Keranjang Saya" />
            {error && (
                <div className="bg-red-50 text-red-600 p-4 mb-4 rounded">
                    {error}
                </div>
            )}
            <div className="bg-[#e6e6e6] min-h-screen">
                <div className="flex justify-center">
                    <Navbar />
                </div>
                <main className="container mx-auto my-25 md:mt-40 text-center">
                    <ShowCart 
                        items={items}
                        addresses={addresses}
                        defaultAddress={defaultAddress}
                        error={error}
                        script={script}
                    />
                    {/* <ListProducts 
                        title="" 
                        showFilter={false} 
                        subTitle="Hanya Untuk Anda"
                        // products={IsiProducts}
                    /> */}
                </main>
                <Footer />
            </div>
        </>
    );
}
