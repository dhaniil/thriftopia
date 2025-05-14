import { Link } from "@inertiajs/react";
import { IoCartOutline } from "react-icons/io5";

interface CartIconProps {
  count: number;
  className?: string;
}

export default function CartIcon({ count, className = "" }: CartIconProps) {
  return (
    <Link href="/cart" className={`relative ${className}`}>
      <IoCartOutline className="text-gray-500 text-3xl" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#1a1a1a] text-white text-[0.60rem] font-bold w-4 h-4 flex items-center justify-center rounded-full">
          {count}
        </span>
      )}
    </Link>
  );
}
