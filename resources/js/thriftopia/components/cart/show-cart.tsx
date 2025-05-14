import React, { useState, useEffect } from 'react';
import { MapPinCheck, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { router } from "@inertiajs/react";
import type { CartItem } from "@/types/cart";
import type { ShippingAddress } from "@/types/shipping";

interface CartProduct extends CartItem {
    variant?: {
        size: string;
    };
    product: {
        id: number;
        name: string;
        price: number;
        description: string;
        image: string;
        brand?: string;
        variant?: {
            id: number;
            size: string;
        };
    };
}

interface Props {
    items?: CartProduct[];
    addresses?: ShippingAddress[];
    defaultAddress?: ShippingAddress;
    error?: string;
    script?: string;
}

export default function ShowCart({ items = [], addresses = [], defaultAddress, error, script }: Props) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const isMobile = useIsMobile();

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        if (script) {
            // Execute the redirect script
            const executeScript = new Function(script);
            executeScript();
        }
    }, [error, script]);

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedItems(items.map(item => item.id));
        } else {
            setSelectedItems([]);
        }
    };

    const handleSelectItem = (id: number, checked: boolean) => {
        if (checked) {
            setSelectedItems(prev => [...prev, id]);
        } else {
            setSelectedItems(prev => prev.filter(itemId => itemId !== id));
        }
    };

    const calculateSubtotal = () => {
        return items
            .filter(item => selectedItems.includes(item.id))
            .reduce((total, item) => total + (item.product.price * item.quantity), 0);
    };

    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        const shipping = selectedItems.length > 0 ? 10000 : 0;
        const promo = selectedItems.length > 0 ? 5000 : 0;
        return subtotal + shipping - promo;
    };

    const handleRemoveItem = (id: number) => {
        router.delete(`/cart/${id}`, {
            preserveScroll: true,
        });
    };

    const handlePayment = () => {
        if (selectedItems.length === 0) {
            toast.error('Pilih minimal 1 produk untuk melanjutkan pembelian');
            return;
        }

        setIsProcessing(true);

        // Gunakan router dari Inertia untuk mengirim request POST
        router.post('/payment/create', { 
            item_ids: selectedItems 
        }, { 
            preserveScroll: true,
            onError: (errors) => {
                console.error('Payment error:', errors);
                toast.error('Gagal memproses pembayaran. Silakan coba lagi.');
                setIsProcessing(false);
            },
            // onFinish akan dipanggil bahkan jika terjadi redirect
            onFinish: () => {
                // Reset processing state jika tidak berhasil redirect
                setTimeout(() => {
                    setIsProcessing(false);
                }, 5000);
            }
        });
    };

    if (isLoading) {
        return (
            <div className="text-center p-4">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    if (!Array.isArray(items)) {
        console.error('Invalid items prop:', items);
        return (
            <div className="text-center p-4">
                <p className="text-red-500">Terjadi kesalahan saat memuat data keranjang</p>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="text-center p-4">
                <p className="text-gray-500">Keranjang belanja Anda kosong</p>
            </div>
        );
    }

    const hasInvalidItems = items.some(item => !item.product || !item.product.name || !item.product.price);
    if (hasInvalidItems) {
        console.error('Invalid item data found:', items.filter(item => !item.product || !item.product.name || !item.product.price));
        return (
            <div className="text-center p-4">
                <p className="text-red-500">Beberapa produk tidak dapat ditampilkan</p>
            </div>
        );
    }

    return (
        <div className='px-2 md:px-12'>
            <div className='w-full bg-white px-4 py-2 mb-3 rounded-md'>
                <span className='flex items-center space-x-2'> 
                    <Checkbox 
                        id="select-all" 
                        className="peer"
                        checked={selectedItems.length === items.length}
                        onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                    />
                    <label htmlFor="select-all" className="text-sm text-black select-none font-medium cursor-pointer">
                        Semua Produk
                    </label>
                </span>
            </div>
            <div className='text-black grid grid-cols-1 md:grid-cols-[1fr_0.5fr] gap-y-4 md:gap-x-8'>
                <div className='space-y-2 md:overflow-y-auto md:h-[61vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-white 
                [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-[#d9d9d9] 
                [&::-webkit-scrollbar-track]:rounded-full'>
                    {items.map((item) => (
                        <Card key={item.id} className='py-4 mr-1'>
                            <CardContent className='px-4 flex justify-between md:grid md:grid-cols-[1fr_0.4fr] w-full'>
                                <div className='flex items-center space-x-2'>
                                    <Checkbox 
                                        id={`cart-${item.id}`} 
                                        className="peer"
                                        checked={selectedItems.includes(item.id)}
                                        onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                                    />
                                    <img 
                                        src={item.product.image} 
                                        alt={item.product.name} 
                                        className='w-15 h-15 md:w-20 md:h-20 object-cover rounded-md shadow-md' 
                                    />
                                    <div className='flex flex-col items-start'>
                                        <h1 className='text-black text-sm md:text-md w-36 sm:w-80 md:w-full font-bold text-start line-clamp-2'>
                                            {item.product.name}
                                        </h1>
                                        <div className='text-start flex flex-col justify-start text-xs'>
                                            <p className='text-black'>Size: {item.variant?.size || '-'}</p>
                                            <p className='text-black'>Jumlah: {item.quantity}</p>
                                            <p className='text-black'>Brand: {item.product.brand || '-'}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col md:flex-row items-center justify-center md:space-x-5 lg:space-x-20'>
                                    <p className='text-sm md:text-md mb-2 md:mb-0'>
                                        Rp {item.product.price.toLocaleString('id-ID')}
                                    </p>
                                    <Button 
                                        variant="ghost"
                                        onClick={() => handleRemoveItem(item.id)}
                                    >
                                        <Trash2 size={20} />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Card className='md:h-75'>
                    <CardContent>
                        <h1 className='text-black text-start'>Lokasi</h1>
                        <div className='flex items-center space-x-2'>
                            <MapPinCheck size={16} />
                            <span className='text-xs text-start'>Jl. STM Pembangunan, Mrican, Caturtunggal</span>
                        </div>
                        <Separator/>
                        <div>
                            <h1 className='text-start font-bold text-lg'>Ringkasan Pesanan</h1>
                            <div className='space-y-1 text-sm'>
                                <div className='flex items-center justify-between'>
                                    <p>Subtotal</p>
                                    <p>Rp {calculateSubtotal().toLocaleString('id-ID')},00</p>
                                </div>
                                {selectedItems.length > 0 && (
                                    <>
                                        <div className='flex items-center justify-between'>
                                            <p>Ongkir</p>
                                            <p>Rp 10.000,00</p>
                                        </div>
                                        <div className='flex items-center justify-between'>
                                            <p>Promo</p>
                                            <p>Rp 5.000,00</p>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className='flex items-center text-sm justify-between mt-4'>
                                <p>Total</p>
                                <p>Rp {calculateTotal().toLocaleString('id-ID')},00</p>
                            </div>
                        </div>
                        <Separator className='hidden md:flex'/>

                        {isMobile ? (
                            <div className='fixed bg-white bottom-0 w-full px-4 pt-2 pb-3 left-0 z-50 shadow-md flex items-center justify-between'>
                                <div className='flex items-center space-x-2 w-full'>
                                    <p className='font-bold'>Total:</p>
                                    <p>Rp {calculateTotal().toLocaleString('id-ID')}</p>
                                </div>
                                <Button 
                                    variant='secondary' 
                                    onClick={handlePayment}
                                    disabled={isProcessing || selectedItems.length === 0}
                                >
                                    {isProcessing ? "Memproses..." : "BELI SEKARANG"}
                                </Button>
                            </div>
                        ) : (
                            <Button 
                                variant='secondary' 
                                className='w-full mt-4'
                                onClick={handlePayment}
                                disabled={isProcessing || selectedItems.length === 0}
                            >
                                {isProcessing ? "Memproses..." : "BELI SEKARANG"}
                            </Button>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
