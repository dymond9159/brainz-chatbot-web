import { FlowbiteColors } from "@/types";
import { cn } from "@/utils/functions";
import type { ComponentProps } from "react";
import { forwardRef } from "react";

export interface FlowbiteCheckboxTheme {
    root: FlowbiteCheckboxRootTheme;
}
export interface FlowbiteCheckboxRootTheme {
    base: string;
    color: FlowbiteColors;
}

export interface CheckboxProps
    extends Omit<ComponentProps<"input">, "type" | "ref" | "color"> {
    color?: keyof FlowbiteColors;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, color = "default", ...props }, ref) => {
        return (
            <input
                ref={ref}
                type="checkbox"
                className={cn(className)}
                {...props}
            />
        );
    },
);

Checkbox.displayName = "Checkbox";
