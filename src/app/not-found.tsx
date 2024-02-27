import Link from "next/link";

export default function NotFound() {
    return (
        <div>
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
                <h1 style={{ fontSize: "102px", opacity: 0.1 }}>404!</h1>
                <h2>Page Not Found</h2>
                <br />
                <p>Could not find requested resource</p>
                <Link href="/">Return Home</Link>
            </div>
        </div>
    );
}
