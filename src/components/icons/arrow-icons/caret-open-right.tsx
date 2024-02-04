import { IIconProps } from "@/types";
import { FC } from "react";

export const CaretOpenRightIcon: FC<IIconProps> = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={props.size ?? "16"}
            height={props.size ?? "16"}
            fill="currentColor"
            viewBox="0 0 20 20"
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M9.399 4.328a.75.75 0 0 1 1.06 0l6.364 6.363a1.75 1.75 0 0 1 0 2.475L10.46 19.53a.75.75 0 0 1-1.06-1.06l6.364-6.364a.25.25 0 0 0 0-.354L9.399 5.388a.75.75 0 0 1 0-1.06"
                clipRule="evenodd"
            />
        </svg>
    );
};
