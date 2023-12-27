import React from "react";

import { cn } from "@/utils/functions";
import { useSidebar } from "@/hooks/use-sidebar";

export interface ISidebarProps extends React.ComponentProps<"div"> {}

export const Sidebar: React.FC<ISidebarProps> = ({ className, children }) => {
    const { isSidebarOpen, isLoading } = useSidebar();

    return (
        <div
            data-state={isSidebarOpen && !isLoading ? "open" : "closed"}
            className={cn(className, "sidebar")}
        >
            {children}
        </div>
    );
};
