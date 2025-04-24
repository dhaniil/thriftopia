import { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { toast } from "sonner";

export default function FlashMessage() {
  const { flash } = usePage().props as any;

  useEffect(() => {
    if (flash?.success) {
      toast.success(flash.success, {
        position: "top-right",
        duration: 3000
      });
    }
    if (flash?.error) {
      toast.error(flash.error, {
        position: "top-right",
        duration: 3000
      });
    }
  }, [flash]);

  return null;
}
