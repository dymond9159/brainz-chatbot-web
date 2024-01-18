"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { ThemeProviderProps } from "next-themes/dist/types";
import { SidebarProvider } from "@/hooks/use-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

import { persistor, store } from "@/store";

export function Providers({ children, ...props }: ThemeProviderProps) {
    return (
        <Provider store={store}>
            <PersistGate
                persistor={persistor}
                loading={null}
            >
                <NextThemesProvider {...props}>
                    <SidebarProvider>
                        <TooltipProvider>{children}</TooltipProvider>
                    </SidebarProvider>
                </NextThemesProvider>
            </PersistGate>
        </Provider>
    );
}
