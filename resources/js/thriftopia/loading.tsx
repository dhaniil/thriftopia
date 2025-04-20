import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/loader.css";
import LoadingSpinner from "./components/ui/loading";

const PageLoader = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 500); 
        return () => clearTimeout(timer);
    }, [location]);

    return (
        <>
          {loading && <LoadingSpinner />}
          {/* Tempatkan router atau konten halaman di bawah */}
          <div className={loading ? "opacity-50 pointer-events-none" : ""}>
            {/* contoh: <Routes>... */}
          </div>
        </>
      );
};

export default PageLoader;
