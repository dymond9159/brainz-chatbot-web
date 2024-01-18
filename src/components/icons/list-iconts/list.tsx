import { IIconProps } from "@/types";
import React, { FC } from "react";

export const ListIcon: FC<IIconProps> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.size ?? "16"}
        height={props.size ?? "16"}
        fill="currentColor"
        viewBox="0 0 16 16"
    >
        <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
        />
    </svg>
);
