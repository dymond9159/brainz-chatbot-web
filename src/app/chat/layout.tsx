import type { Metadata } from "next";
// import useSWR from "swr";
import { Inter } from "next/font/google";
import "@/styles/globals.scss";

import { Navbar, Footer } from "@/components/widgets";
import { ChildrenProps } from "@/types";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Chat - Brainz Health",
    description: "",
};

const AuthLayout = (props: ChildrenProps) => {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Navbar />
                {props.children}
                <Footer />
            </body>
        </html>
    );
};

export default AuthLayout;
