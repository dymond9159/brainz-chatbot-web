import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "@/styles/globals.scss";

import { Providers } from "@/components/theme/providers";

import { LayoutProps } from "@/types";
import { cn } from "@/utils/functions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Chat - Brainz Health",
    description: "",
};

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "white" },
        { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
};

export default function RootLayout(props: LayoutProps) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <main className={cn("brainz-chat")}>{props.children}</main>
                </Providers>
            </body>
        </html>
    );
}
