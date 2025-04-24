import { Link } from "@inertiajs/react";
import { FaCheckCircle } from "react-icons/fa";

export default function CheckoutSuccess() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mx-4">
                <div className="flex flex-col items-center">
                    <FaCheckCircle className="text-green-500 text-6xl mb-4" />
                    <h1 className="text-2xl font-bold text-center mb-2">Pembayaran Berhasil!</h1>
                    <p className="text-gray-600 text-center mb-6">
                        Terima kasih atas pembelian Anda. Pesanan Anda sedang diproses.
                    </p>
                    <Link
                        href="/"
                        className="bg-[#1a1a1a] text-white px-6 py-2 rounded hover:bg-black transition-all duration-200"
                    >
                        Kembali ke Beranda
                    </Link>
                </div>
            </div>
        </div>
    );
}
