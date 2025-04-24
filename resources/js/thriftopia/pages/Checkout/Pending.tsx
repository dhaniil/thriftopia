import { Link } from "@inertiajs/react";
import { FaClock } from "react-icons/fa";

export default function CheckoutPending() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mx-4">
                <div className="flex flex-col items-center">
                    <FaClock className="text-yellow-500 text-6xl mb-4" />
                    <h1 className="text-2xl font-bold text-center mb-2">Pembayaran Tertunda</h1>
                    <p className="text-gray-600 text-center mb-6">
                        Pembayaran Anda sedang dalam proses. Silakan selesaikan pembayaran sesuai instruksi yang diberikan.
                    </p>
                    <div className="space-y-2 w-full">
                        <Link
                            href="/"
                            className="block w-full text-center bg-[#1a1a1a] text-white px-6 py-2 rounded hover:bg-black transition-all duration-200"
                        >
                            Kembali ke Beranda
                        </Link>
                        <button
                            onClick={() => window.location.reload()}
                            className="block w-full text-center bg-transparent border border-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-50 transition-all duration-200"
                        >
                            Periksa Status
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
