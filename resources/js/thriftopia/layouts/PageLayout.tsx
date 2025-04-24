import { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingSpinner from "@/components/ui/loading";
import FlashMessage from "@/components/flash-message";

export default function PageLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const { url } = usePage();

  useEffect(() => {
    router.on("start", () => setLoading(true));
    router.on("finish", () => setLoading(false));
  }, []);

  return (
    <>
      {loading && <LoadingSpinner />}
      <FlashMessage />
      {children}
    </>
  );
}
