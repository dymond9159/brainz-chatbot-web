import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "@/styles/globals.scss";

import { LayoutProps } from "@/types";
import { cn } from "@/utils/functions";
import { Providers } from "@/components/provider/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
    title: {
        default: "Brainz Health AI Therapy",
        template: `Mental Health AI Chatbot`,
    },
    description: "Guiding through trauma with health care and empathetic",
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/favicon.ico",
    },
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
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    <main className={cn("brainz-chat")}>{props.children}</main>
                </Providers>
            </body>
        </html>
    );
}
