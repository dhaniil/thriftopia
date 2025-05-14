import { Link } from "@inertiajs/react";
import type { CartItem } from "@/types/cart";
import { formatPrice } from "@/lib/utils";

interface CartProps {
  items: CartItem[];
}

export default function Cart({ items = [] }: CartProps) {
  const total = (items || []).reduce((acc, item) => {
    return acc + (item.product.price * item.quantity);
  }, 0);

  if (items.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-500">Keranjang belanja Anda kosong</p>
      </div>
    );
  }

  return (
    <div className="w-full max-h-96 overflow-auto">
      {items.map((item) => (
        <div key={item.id} className="flex items-start gap-4 p-4 border-b last:border-b-0">
          <img
            src={item.product.image}
            alt={item.product.name}
            className="w-16 h-16 object-cover rounded"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-medium truncate">{item.product.name}</h3>
            <p className="text-sm text-gray-500">{formatPrice(item.product.price)}</p>
            <p className="text-sm text-gray-500">Jumlah: {item.quantity}</p>
          </div>
        </div>
      ))}
      
      <div className="sticky bottom-0 bg-white p-4 border-t">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500">Total</span>
          <span className="font-bold">{formatPrice(total)}</span>
        </div>
        
        <Link href="/cart" className="text-gray-500 font-semibold text-sm">
          Lihat Keranjang
        </Link>
      </div>
    </div>
  );
}
