import {Card, CardDivider, CardDescription, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

export default function WhyChoose() {
    return (
    <>
    <div>
        <div className="flex flex-col items-center justify-center w-full bg-white py-10 px-4 md:px-6 lg:px-8">
            <h2 className="text-2xl text-black font-bold mb-4">Kenapa Memilih Kami?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-4xl">
                <Card>
                    <CardHeader className="flex flex-col  p-4">
                        <CardTitle className="text-lg font-bold">Produk Berkualitas</CardTitle>
                        <CardDescription className="text-sm text-gray-600">Kami menjamin kualitas produk yang terbaik untuk Anda.</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="flex flex-col  p-4">
                        <CardTitle className="text-lg font-bold">Harga Ramah Dompet</CardTitle>
                        <CardDescription className="text-sm text-gray-600">Tampil kece nggak harus mahal, semua harga kami super bersahabat.</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="flex flex-col  p-4">
                        <CardTitle className="text-lg font-bold">Pengiriman Tepat Waktu</CardTitle>
                        <CardDescription className="text-sm text-gray-600">Kami pastikan pesananmu dikirim cepat dan aman sampai tujuan.</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="flex flex-col  p-4">
                        <CardTitle className="text-lg font-bold">Eco-Friendly Fashion</CardTitle>
                        <CardDescription className="text-sm text-gray-600">Dengan belanja thrift, kamu ikut mengurangi limbah fashion.</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </div>
    </div>
    </>
    )
}