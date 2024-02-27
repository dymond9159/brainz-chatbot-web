"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100vw",
                height: "100vh",
            }}
        >
            <h1 style={{ fontSize: "102px", opacity: 0.1 }}>500!</h1>
            <h2>Something went wrong!</h2>
            <br />
            <button
                className="ghost black"
                onClick={() => reset()}
            >
                Try again
            </button>
        </div>
    );
}
