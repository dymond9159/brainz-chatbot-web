import { Flex } from "@/components/container";
import { cn } from "@/utils/functions";
import { title } from "process";
import type { ComponentProps } from "react";
import React, { forwardRef, useState } from "react";

export interface FlowbiteRadioTheme {
    root: FlowbiteRadioRootTheme;
}

export interface FlowbiteRadioRootTheme {
    base: string;
}

export interface RadioProps
    extends Omit<ComponentProps<"input">, "ref" | "type"> {}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
    ({ title, onChange, className, ...props }, ref) => {
        return (
            <React.Fragment>
                <Flex className={cn("radio row gap-10")}>
                    <input
                        ref={ref}
                        type="radio"
                        className={cn(className)}
                        {...props}
                        onChange={onChange}
                    />
                    <label htmlFor="huey">{title}</label>
                </Flex>
            </React.Fragment>
        );
    },
);

Radio.displayName = "Radio";
