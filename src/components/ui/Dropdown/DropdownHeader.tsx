"use client";

import type { ComponentProps, FC } from "react";
import { DropdownDivider } from "./DropdownDivider";
import { cn } from "@/utils/functions";

export interface FlowbiteDropdownHeaderTheme {
    header: string;
}

export interface DropdownHeaderProps extends ComponentProps<"div"> {}

export const DropdownHeader: FC<DropdownHeaderProps> = ({
    children,
    className,
    ...props
}) => {
    return (
        <>
            <div
                className={cn(className)}
                {...props}
            >
                {children}
            </div>
            <DropdownDivider />
        </>
    );
};
