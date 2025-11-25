"use client"

import {useLoader} from '../hooks/useLoader';


function GlobalLoader() {

    const { loading } = useLoader();

    if (!loading) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-999">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

}

export default GlobalLoader;