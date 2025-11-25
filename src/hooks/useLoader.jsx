import { useContext } from "react";
import { LoaderContext } from "../spinner/LoaderContext";

function useLoader() {
    const context = useContext(LoaderContext);
    if (!context) throw new Error('useLoader must be used within an LoaderProvider');
    return context;
}

export {useLoader};