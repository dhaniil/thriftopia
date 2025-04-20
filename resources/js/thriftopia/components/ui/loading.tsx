import { AnimatePresence, motion } from "framer-motion";
import '../../../../css/loading.css';

const LoadingSpinner = () => (
    <AnimatePresence>
        <motion.div
        key="loading"
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 "
        >
        <div className="loader"></div>
</motion.div>
    </AnimatePresence>
  );
  
export default LoadingSpinner;
  