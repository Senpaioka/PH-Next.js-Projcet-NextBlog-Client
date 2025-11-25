"use client"

import { useState } from "react";
import { LoaderContext } from "./LoaderContext";

function LoaderProvider({children}){

    const [loading, setLoading] = useState(false);

    const showLoader = () => setLoading(true);
    const hideLoader = () => setLoading(false);

    const loaderInfo = {
        loading,
        showLoader,
        hideLoader,
    }

    return (

        <LoaderContext value={loaderInfo}>
            {children}
        </LoaderContext>
    )
}

export default LoaderProvider;