"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SidebarProvider } from "@/hooks/use-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProviderProps } from "next-themes/dist/types";

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    return (
        <NextThemesProvider
            storageKey="brainz-theme"
            defaultTheme="light"
            enableSystem={true}
            attribute="data-theme"
        >
            <SidebarProvider>
                <TooltipProvider>{children}</TooltipProvider>
            </SidebarProvider>
        </NextThemesProvider>
    );
};
