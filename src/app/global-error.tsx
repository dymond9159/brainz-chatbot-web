"use client";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <body>
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
                        className="ghost black p-10"
                        onClick={() => reset()}
                    >
                        Try again
                    </button>
                </div>
            </body>
        </html>
    );
}
