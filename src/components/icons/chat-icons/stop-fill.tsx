import { IIconProps } from "@/types";
import React, { FC } from "react";

export const StopFillIcon: FC<IIconProps> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.size ?? "16"}
        height={props.size ?? "16"}
        fill="currentColor"
        viewBox="0 0 16 16"
    >
        <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z" />
    </svg>
);
