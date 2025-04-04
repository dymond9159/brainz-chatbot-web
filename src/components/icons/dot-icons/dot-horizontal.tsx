import { IIconProps } from "@/types";
import React, { FC } from "react";

const DotHorizontalIcon: FC<IIconProps> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.size ?? "16"}
        height={props.size ?? "16"}
        fill="currentColor"
        viewBox="0 0 16 16"
    >
        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
    </svg>
);

export default DotHorizontalIcon;
