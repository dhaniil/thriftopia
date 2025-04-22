import React from 'react';
import { IoCartOutline } from 'react-icons/io5';
import { Link } from '@inertiajs/react';
import { useTypedPage } from '@/hooks/use-typed-page';

interface CartIconProps {
  className?: string;
}

export function CartIcon({ className = '' }: CartIconProps) {
  const { auth, cartCount = 0 } = useTypedPage().props;

  if (!auth.user) {
    return null;
  }

  return (
    <Link href={route('cart')} className={`relative ${className}`}>
      <IoCartOutline className="text-2xl" />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </Link>
  );
}
