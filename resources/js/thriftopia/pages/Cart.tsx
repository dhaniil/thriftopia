import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";
import CartContent from "@/components/cart";

export default function Cart() {
    return (
        <div className="bg-[#e6e6e6] min-h-screen">
            <div className="flex justify-center">
                <Navbar />
            </div>
            <main className="container mx-auto my-25 md:mt-40 text-center">
            <CartContent/>
            </main>
            <Footer />
        </div>
    );
};