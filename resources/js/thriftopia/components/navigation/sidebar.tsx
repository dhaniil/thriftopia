import { Link } from "@inertiajs/react";
import Avatar from "../profile-menu/avatar";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  auth: {
    user: {
      name: string;
      email: string;
      avatar_url?: string;
    } | null;
  };
  cart: {
    count: number;
  };
}

export default function Sidebar({ isOpen, setIsOpen, auth, cart }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 z-50 h-screen w-80 bg-white p-6 shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {auth.user ? (
            <div className="flex items-center gap-4">
              <div className="h-12 w-12">
                <Avatar name={auth.user.name} imageUrl={auth.user.avatar_url} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm">{auth.user.name}</span>
                <span className="text-gray-600 text-xs">{auth.user.email}</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                href="/profile"
                className="flex items-center gap-4 p-2 rounded-md hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                href="/profile"
                className="flex items-center gap-4 p-2 rounded-md hover:bg-gray-100"
              >
                Register
              </Link>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-2">
            <Link
              href="/cart"
              className="flex items-center gap-4 p-2 rounded-md hover:bg-gray-100"
            >
              Cart {cart.count > 0 && `(${cart.count})`}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
