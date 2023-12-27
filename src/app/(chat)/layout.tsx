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
        <div className="chat">
            <Navbar />
            {props.children}
            <Footer />
        </div>
    );
};

export default AuthLayout;
