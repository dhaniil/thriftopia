import { useEffect, useState } from "react";
import type { CartItem } from "@/types/cart";
import type { MidtransResult, MidtransCallback } from "@/types/midtrans";
import { router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { formatPrice } from "@/lib/utils";

interface Props {
    items?: CartItem[];
}

export default function ShowCart({ items = [] }: Props) {
    const [total, setTotal] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (items && items.length > 0) {
            const newTotal = items.reduce((acc, item) => {
                return acc + (item.product.price * item.quantity);
            }, 0);
            setTotal(newTotal);
        } else {
            setTotal(0);
        }
    }, [items]);

    const handleQuantityChange = (id: number, quantity: number) => {
        router.patch(`/cart/${id}`, { quantity }, {
            preserveScroll: true,
        });
    };

    const handleRemoveItem = (id: number) => {
        router.delete(`/cart/${id}`, {
            preserveScroll: true,
        });
    };

    interface PaymentProps {
        snap_token: string;
    }

    const handlePayment = () => {
        setIsProcessing(true);
        
        router.post('/payment/create', {}, {
            preserveScroll: true,
            onSuccess: (response: any) => {
                const snap_token = response.props.snap_token;

                if (!window.snap) {
                    toast.error('Snap.js is not loaded');
                    setIsProcessing(false);
                    return;
                }

                if (!snap_token) {
                    toast.error('Failed to get payment token');
                    setIsProcessing(false);
                    return;
                }

                const snapCallback: MidtransCallback = {
                    onSuccess: (result: MidtransResult) => {
                        console.log('Payment success:', result);
                        router.visit('/payment/success');
                    },
                    onPending: (result: MidtransResult) => {
                        console.log('Payment pending:', result);
                        router.visit('/payment/pending');
                    },
                    onError: (result: MidtransResult) => {
                        console.error('Payment error:', result);
                        router.visit('/payment/error');
                    },
                    onClose: () => {
                        console.log('Payment dialog closed');
                        setIsProcessing(false);
                    }
                };

                window.snap.pay(snap_token, snapCallback as any);
            },
            onError: () => {
                toast.error('Terjadi kesalahan saat memproses pembayaran');
                setIsProcessing(false);
            }
        });
    };

    if (!items || items.length === 0) {
        return (
            <div className="text-center p-4">
                <p className="text-gray-500">Keranjang belanja Anda kosong</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-4">
                        <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                            <h3 className="font-medium">{item.product.name}</h3>
                            <p className="text-sm text-gray-500">{formatPrice(item.product.price)}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                            >
                                -
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                                +
                            </Button>
                        </div>
                        <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleRemoveItem(item.id)}
                        >
                            ×
                        </Button>
                    </div>
                </div>
            ))}
            <div className="flex justify-between items-center mt-4">
                <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-lg font-bold">{formatPrice(total)}</p>
                </div>
                <Button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="bg-[#1a1a1a] text-white hover:bg-black"
                >
                    {isProcessing ? "Memproses..." : "BELI SEKARANG"}
                </Button>
            </div>
        </div>
    );
}
