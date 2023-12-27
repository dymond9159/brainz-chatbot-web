import { IIconProps } from "@/types";
import { FC } from "react";

export const CloseIcon: FC<IIconProps> = (props) => (
    <svg
        width={props.size ?? "16"}
        height={props.size ?? "16"}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="https://www.w3.org/2000/svg"
    >
        <path
            d="M2 2L13.881 13.881"
            stroke="currentColor"
        />
        <path
            d="M13.881 2L2 13.881"
            stroke="currentColor"
        />
    </svg>
);
