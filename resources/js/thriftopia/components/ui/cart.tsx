import React from "react";
import sigma from '../../assets/icon/sigma.webp';
import jacket from '../../assets/example-product/jacket-hijau.webp';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const cartItems: CartItem[] = [
  {
    id: 1,
    name: "Keycaps PBT Dye Sub BoW",
    price: 250000,
    quantity: 1,
    image: sigma, 
  },
  {
    id: 1,
    name: "Keycaps PBT Dye Sub BoW",
    price: 250000,
    quantity: 1,
    image: jacket, 
  },
];

const Cart: React.FC = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg">
          Keranjang <span className="text-black font-normal">(2)</span>
        </h2>
        <a href={route('cart')} className="text-gray-500 font-semibold text-sm">
          Detail
        </a>
      </div>

      {cartItems.map((item) => (
        <div key={item.id} className="flex items-center gap-4 mt-3 border-b-1 pb-3 border-gray-200">
          <img
            src={item.image}
            alt={item.name}
            className="w-12 h-12 rounded-md object-cover"
          />
          <div className="flex-1">
            <p className="text-sm text-gray-700 truncate">{item.name}</p>
          </div>
          <p className="font-bold text-black">
            {item.quantity} x Rp{item.price.toLocaleString()}
          </p>
          
        </div>
      ))}
    </div>
  );
};

export default Cart;
