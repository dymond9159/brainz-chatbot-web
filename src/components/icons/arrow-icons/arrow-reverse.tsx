import { FC } from "react";
import { IconType } from "@/types";

export const Icon: FC<IconType> = ({ color = "currentColor" }) => {
    return (
        <svg
            xmlns="https://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 14.411 18.719"
        >
            <g transform="translate(23199 -5095.877) rotate(-90)">
                <path
                    d="M13.036,14.36a.53.53,0,0,1-.53.53H3.212L5.65,17.329a.531.531,0,0,1-.751.751l-3.34-3.348a.53.53,0,0,1,0-.751l3.34-3.34a.531.531,0,1,1,.751.751L3.212,13.83h9.321A.53.53,0,0,1,13.036,14.36ZM20.1,7.54a.53.53,0,0,0-.115-.177L16.632,3.979a.531.531,0,0,0-.751.751l2.438,2.438H9a.53.53,0,0,0,0,1.06h9.321l-2.438,2.438a.531.531,0,0,0,.751.751l3.34-3.34a.53.53,0,0,0,.115-.565Z"
                    transform="translate(-5116 -23202.824)"
                    fill={color}
                />
            </g>
        </svg>
    );
};
