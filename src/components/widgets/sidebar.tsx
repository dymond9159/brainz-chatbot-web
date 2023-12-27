import React from "react";

import { cn } from "@/utils/functions";
import { useSidebar } from "@/hooks/use-sidebar";

export interface SidebarProps extends React.ComponentProps<"div"> {}

export function Sidebar({ className, children }: SidebarProps) {
    const { isSidebarOpen, isLoading } = useSidebar();

    return (
        <div
            data-state={isSidebarOpen && !isLoading ? "open" : "closed"}
            className={cn(className, "sidebar")}
        >
            {children}
        </div>
    );
}
