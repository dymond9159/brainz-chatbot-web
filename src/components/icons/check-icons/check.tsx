import { IIconProps } from "@/types";
import { FC } from "react";

export const CheckIcon: FC<IIconProps> = (props) => (
    <svg
        width={props.size ?? "16"}
        height={props.size ?? "16"}
        viewBox="0 0 16 16"
        fill={props.color ?? "currentColor"}
        xmlns="https://www.w3.org/2000/svg"
    >
        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
    </svg>
);
