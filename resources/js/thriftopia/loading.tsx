import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/loader.css"; // Import CSS jika ingin dipisah

const PageLoader = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 500); // Simulasi loading 0.5 detik
        return () => clearTimeout(timer);
    }, [location]);

    return loading ? (
        <div className="loading-overlay">
            <div className="spinner"></div>
        </div>
    ) : null;
};

export default PageLoader;
