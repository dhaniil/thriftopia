import { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingSpinner from "@/components/ui/loading";

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

      {/* <AnimatePresence mode="wait">
        <motion.div
          key={url}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0}}
          transition={{ duration: 0.2 }}
        > */}
          {children}
        {/* </motion.div>
    </AnimatePresence> */}
    </>
  );
}
