import { IIconProps } from "@/types";
import React, { FC } from "react";

const DotVerticalIcon: FC<IIconProps> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.size ?? "16"}
        height={props.size ?? "16"}
        fill="currentColor"
        viewBox="0 0 16 16"
    >
        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
    </svg>
);

export default DotVerticalIcon;
