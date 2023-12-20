import { FC } from "react";

export const ArrowPrevIcon: FC<{ opacity?: number }> = ({ opacity = 1 }) => {
    return (
        <svg
            xmlns="https://www.w3.org/2000/svg"
            width="1em"
            viewBox="0 0 12.393 40.027"
        >
            <g
                id="arrow_left"
                transform="translate(1805.271 309.513) rotate(180)"
                opacity={opacity}
            >
                <line
                    id="Line_109"
                    data-name="Line 109"
                    x2="11.029"
                    y2="19.331"
                    transform="translate(1793.561 270.168)"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="1"
                />
                <line
                    id="Line_110"
                    data-name="Line 110"
                    y1="19.331"
                    x2="11.029"
                    transform="translate(1793.561 289.5)"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="1"
                />
            </g>
        </svg>
    );
};
