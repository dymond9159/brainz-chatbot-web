"use client";

import { useListItem } from "@floating-ui/react";
import type {
    ComponentProps,
    ComponentPropsWithoutRef,
    ElementType,
    FC,
    RefCallback,
} from "react";

import { ButtonBase, Icon, type ButtonBaseProps } from "@/components/ui";
import { useDropdownContext } from "./DropdownContext";
import { cn } from "@/utils/functions";

export interface FlowbiteDropdownItemTheme {
    container: string;
    base: string;
    icon: string;
}

export type DropdownItemProps<T extends ElementType = "button"> = {
    // TODO: make it work with `Link` from Next.js
    as?: T;
    href?: string;
    icon?: string;
    onClick?: () => void;
} & ComponentPropsWithoutRef<T>;

export const DropdownItem = <T extends ElementType = "button">({
    children,
    className,
    icon,
    onClick,
    theme: customTheme = {},
    ...props
}: DropdownItemProps<T>) => {
    const { ref, index } = useListItem({
        label: typeof children === "string" ? children : undefined,
    });
    const { activeIndex, dismissOnClick, getItemProps, handleSelect } =
        useDropdownContext();
    const isActive = activeIndex === index;

    const theirProps = props as ButtonBaseProps<T>;

    return (
        <li
            role="menuitem"
            className={"item-container"}
        >
            <ButtonBase
                ref={ref as RefCallback<T>}
                className={cn("base", className)}
                {...theirProps}
                {...getItemProps({
                    onClick: () => {
                        onClick && onClick();
                        dismissOnClick && handleSelect(null);
                    },
                })}
                tabIndex={isActive ? 0 : -1}
            >
                <Icon name={icon} />
                {children}
            </ButtonBase>
        </li>
    );
};
