import { toast } from "sonner";
import { Toaster } from "sonner";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { flash } = usePage().props as any;

  useEffect(() => {
    if (flash?.success) {
      toast.success(flash.success);
    }
    if (flash?.error) {
      toast.error(flash.error);
    }
  }, [flash]);

  return (
    <>
      {children}
      <Toaster position="top-right" richColors closeButton />
    </>
  );
}
