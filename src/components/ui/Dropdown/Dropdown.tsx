"use client";

import type { ExtendedRefs } from "@floating-ui/react";
import {
    FloatingFocusManager,
    FloatingList,
    useListNavigation,
    useTypeahead,
} from "@floating-ui/react";
import type {
    ComponentProps,
    Dispatch,
    FC,
    HTMLProps,
    MutableRefObject,
    ReactElement,
    ReactNode,
    RefCallback,
    SetStateAction,
} from "react";
import {
    cloneElement,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
// import {
//     HiOutlineChevronDown,
//     HiOutlineChevronLeft,
//     HiOutlineChevronRight,
//     HiOutlineChevronUp,
// } from "react-icons/hi";
import { useBaseFLoating, useFloatingInteractions } from "@/hooks/use-floating";
import { Button, type ButtonProps } from "@/components/ui";
import type { FloatingProps, FlowbiteFloatingTheme } from "../Floating";
import { DropdownContext } from "./DropdownContext";
import {
    DropdownDivider,
    type FlowbiteDropdownDividerTheme,
} from "./DropdownDivider";
import {
    DropdownHeader,
    type FlowbiteDropdownHeaderTheme,
} from "./DropdownHeader";
import { DropdownItem, type FlowbiteDropdownItemTheme } from "./DropdownItem";
import { cn } from "@/utils/functions";

export interface FlowbiteDropdownFloatingTheme
    extends FlowbiteFloatingTheme,
        FlowbiteDropdownDividerTheme,
        FlowbiteDropdownHeaderTheme {
    item: FlowbiteDropdownItemTheme;
}

export interface FlowbiteDropdownTheme {
    floating: FlowbiteDropdownFloatingTheme;
    content: string;
    inlineWrapper: string;
    arrowIcon: string;
}

export interface DropdownProps
    extends Pick<FloatingProps, "placement" | "trigger">,
        Omit<ButtonProps, "theme"> {
    arrowIcon?: boolean;
    dismissOnClick?: boolean;
    floatingArrow?: boolean;
    inline?: boolean;
    label: ReactNode;
    renderTrigger?: () => ReactElement;
    "data-testid"?: string;
}

// const icons: Record<string, FC<ComponentProps<"svg">>> = {
//     top: HiOutlineChevronUp,
//     right: HiOutlineChevronRight,
//     bottom: HiOutlineChevronDown,
//     left: HiOutlineChevronLeft,
// };

export interface TriggerProps extends Omit<ButtonProps, "theme"> {
    refs: ExtendedRefs<HTMLElement>;
    inline?: boolean;
    setButtonWidth?: Dispatch<SetStateAction<number | undefined>>;
    getReferenceProps: (
        userProps?: HTMLProps<Element> | undefined,
    ) => Record<string, unknown>;
    renderTrigger?: () => ReactElement;
}

const Trigger = ({
    refs,
    children,
    inline,
    disabled,
    setButtonWidth,
    getReferenceProps,
    renderTrigger,
    ...buttonProps
}: TriggerProps) => {
    const ref = refs.reference as MutableRefObject<HTMLElement>;
    const a11yProps = getReferenceProps();

    useEffect(() => {
        if (ref.current) {
            setButtonWidth?.(ref.current.clientWidth);
        }
    }, [ref, setButtonWidth]);

    if (renderTrigger) {
        const triggerElement = renderTrigger();
        return cloneElement(triggerElement, {
            ref: refs.setReference,
            disabled,
            ...a11yProps,
            ...triggerElement.props,
        });
    }

    return (
        <button
            type="button"
            ref={refs.setReference}
            className={cn("inline-wrapper", "dropdown-trigger-button")}
            disabled={disabled}
            {...a11yProps}
        >
            {children}
        </button>
    );
};

const DropdownComponent: FC<DropdownProps> = ({
    children,
    className,
    dismissOnClick = true,
    renderTrigger,
    ...props
}) => {
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [buttonWidth, setButtonWidth] = useState<number | undefined>(
        undefined,
    );
    const elementsRef = useRef<Array<HTMLElement | null>>([]);
    const labelsRef = useRef<Array<string | null>>([]);

    const theirProps = props as Omit<DropdownProps, "theme">;
    const dataTestId = props["data-testid"] || "flowbite-dropdown-target";
    const {
        placement = props.inline ? "bottom-start" : "bottom",
        trigger = "click",
        label,
        inline,
        arrowIcon = true,
        ...buttonProps
    } = theirProps;

    const handleSelect = useCallback((index: number | null) => {
        setSelectedIndex(index);
        setOpen(false);
    }, []);

    const handleTypeaheadMatch = useCallback(
        (index: number | null) => {
            if (open) {
                setActiveIndex(index);
            } else {
                handleSelect(index);
            }
        },
        [open, handleSelect],
    );

    const { context, floatingStyles, refs } =
        useBaseFLoating<HTMLButtonElement>({
            open,
            setOpen,
            placement,
        });

    const listNav = useListNavigation(context, {
        listRef: elementsRef,
        activeIndex,
        selectedIndex,
        onNavigate: setActiveIndex,
    });

    const typeahead = useTypeahead(context, {
        listRef: labelsRef,
        activeIndex,
        selectedIndex,
        onMatch: handleTypeaheadMatch,
    });

    const { getReferenceProps, getFloatingProps, getItemProps } =
        useFloatingInteractions({
            context,
            role: "menu",
            trigger,
            interactions: [listNav, typeahead],
        });

    // const Icon = useMemo(() => {
    //     const [p] = placement.split("-");
    //     return icons[p] ?? HiOutlineChevronDown;
    // }, [placement]);

    return (
        <DropdownContext.Provider
            value={{
                activeIndex,
                dismissOnClick,
                getItemProps,
                handleSelect,
            }}
        >
            <Trigger
                {...buttonProps}
                refs={refs}
                inline={inline}
                data-testid={dataTestId}
                className={cn(buttonProps.className)}
                setButtonWidth={setButtonWidth}
                getReferenceProps={getReferenceProps}
                renderTrigger={renderTrigger}
            >
                {label}
                {/* {arrowIcon && <Icon className={"arrowIcon"} />} */}
            </Trigger>
            {open && (
                <FloatingFocusManager
                    context={context}
                    modal={false}
                >
                    <div
                        ref={refs.setFloating}
                        style={{ ...floatingStyles, minWidth: buttonWidth }}
                        data-testid="flowbite-dropdown"
                        aria-expanded={open}
                        {...getFloatingProps({
                            className: cn(
                                "dropdown",
                                "floating-base",
                                "floating-animation",
                                "duration-100",
                                !open && "floating-hidden",
                                className,
                            ),
                        })}
                    >
                        <FloatingList
                            elementsRef={elementsRef}
                            labelsRef={labelsRef}
                        >
                            <ul
                                className={"dropdown-content"}
                                tabIndex={-1}
                            >
                                {children}
                            </ul>
                        </FloatingList>
                    </div>
                </FloatingFocusManager>
            )}
        </DropdownContext.Provider>
    );
};

DropdownComponent.displayName = "Dropdown";
DropdownHeader.displayName = "Dropdown.Header";
DropdownDivider.displayName = "Dropdown.Divider";

export const Dropdown = Object.assign(DropdownComponent, {
    Item: DropdownItem,
    Header: DropdownHeader,
    Divider: DropdownDivider,
});
