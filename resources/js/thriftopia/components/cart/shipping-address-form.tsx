import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ShippingAddress {
    id: number;
    name: string;
    phone: string;
    address: string;
    city: string;
    postal_code: string;
    is_default: boolean;
}

interface Props {
    addresses: ShippingAddress[];
    defaultAddress?: ShippingAddress;
}

export default function ShippingAddressForm({ addresses, defaultAddress }: Props) {
    const [showForm, setShowForm] = useState(false);

    const form = useForm({
        name: '',
        phone: '',
        address: '',
        city: '',
        postal_code: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post('/cart/address', {
            preserveScroll: true,
            onSuccess: () => {
                setShowForm(false);
                form.reset();
            }
        });
    };

    const setAsDefault = (id: number) => {
        form.patch(`/cart/address/${id}/default`, {
            preserveScroll: true
        });
    };

    return (
        <div className="mb-6 p-4 border rounded-lg shadow-sm bg-white">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Alamat Pengiriman</h3>
                <Button onClick={() => setShowForm(true)}>
                    {addresses.length === 0 ? 'Tambah Alamat' : 'Alamat Baru'}
                </Button>
            </div>

            {defaultAddress ? (
                <div className="p-3 border rounded">
                    <p className="font-medium">{defaultAddress.name}</p>
                    <p className="text-sm text-gray-600">{defaultAddress.phone}</p>
                    <p className="text-sm text-gray-600">{defaultAddress.address}</p>
                    <p className="text-sm text-gray-600">{defaultAddress.city}, {defaultAddress.postal_code}</p>
                </div>
            ) : (
                <p className="text-gray-500">Belum ada alamat pengiriman</p>
            )}

            {addresses.length > 0 && (
                <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Alamat Lainnya</h4>
                    <div className="space-y-2">
                        {addresses.filter(a => !a.is_default).map(address => (
                            <div key={address.id} className="p-3 border rounded flex justify-between items-center">
                                <div>
                                    <p className="font-medium">{address.name}</p>
                                    <p className="text-sm text-gray-600">{address.phone}</p>
                                    <p className="text-sm text-gray-600">{address.address}</p>
                                    <p className="text-sm text-gray-600">{address.city}, {address.postal_code}</p>
                                </div>
                                <Button 
                                    variant="outline" 
                                    onClick={() => setAsDefault(address.id)}
                                >
                                    Jadikan Utama
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <Dialog open={showForm} onOpenChange={setShowForm}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Tambah Alamat Pengiriman</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Nama Penerima</Label>
                            <Input
                                id="name"
                                value={form.data.name}
                                onChange={e => form.setData('name', e.target.value)}
                                placeholder="Masukkan nama penerima"
                            />
                        </div>
                        <div>
                            <Label htmlFor="phone">Nomor Telepon</Label>
                            <Input
                                id="phone"
                                value={form.data.phone}
                                onChange={e => form.setData('phone', e.target.value)}
                                placeholder="Masukkan nomor telepon"
                            />
                        </div>
                        <div>
                            <Label htmlFor="address">Alamat</Label>
                            <Input
                                id="address"
                                value={form.data.address}
                                onChange={e => form.setData('address', e.target.value)}
                                placeholder="Masukkan alamat lengkap"
                            />
                        </div>
                        <div>
                            <Label htmlFor="city">Kota</Label>
                            <Input
                                id="city"
                                value={form.data.city}
                                onChange={e => form.setData('city', e.target.value)}
                                placeholder="Masukkan nama kota"
                            />
                        </div>
                        <div>
                            <Label htmlFor="postal_code">Kode Pos</Label>
                            <Input
                                id="postal_code"
                                value={form.data.postal_code}
                                onChange={e => form.setData('postal_code', e.target.value)}
                                placeholder="Masukkan kode pos"
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setShowForm(false)}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                disabled={form.processing}
                            >
                                {form.processing ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
