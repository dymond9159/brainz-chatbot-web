import { FC } from "react";

export const ArrowNextIcon: FC<{ opacity?: number }> = ({ opacity = 1 }) => {
    return (
        <svg
            xmlns="https://www.w3.org/2000/svg"
            width="1em"
            // height="40.026"
            viewBox="0 0 12.393 40.026"
        >
            <g
                id="Group_2579"
                data-name="Group 2579"
                transform="translate(-205.818 -189.818)"
                opacity={opacity}
            >
                <line
                    id="Line_2"
                    data-name="Line 2"
                    x2="11.029"
                    y2="19.331"
                    transform="translate(206.5 190.5)"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="1"
                />
                <line
                    id="Line_3"
                    data-name="Line 3"
                    y1="19.331"
                    x2="11.029"
                    transform="translate(206.5 209.831)"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="1"
                />
            </g>
        </svg>
    );
};
