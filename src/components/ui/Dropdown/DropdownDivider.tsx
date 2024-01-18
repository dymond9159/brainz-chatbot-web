"use client";

import type { ComponentProps, FC } from "react";
import { cn } from "@/utils/functions";

export interface FlowbiteDropdownDividerTheme {
    divider: string;
}

export type DropdownDividerProps = {} & ComponentProps<"div">;

export const DropdownDivider: FC<DropdownDividerProps> = ({
    className,
    ...props
}) => {
    return (
        <div
            className={cn(className, "divider")}
            {...props}
        />
    );
};
