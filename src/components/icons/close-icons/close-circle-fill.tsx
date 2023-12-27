import { IIconProps } from "@/types";
import { FC } from "react";

export const CloseCircleFillIcon: FC<IIconProps> = (props) => {
    return (
        <svg
            xmlns="https://www.w3.org/2000/svg"
            width={props.size ?? "16"}
            height={props.size ?? "16"}
            viewBox="0 0 8.711 8.711"
        >
            <path
                id="Icon_material-cancel"
                data-name="Icon material-cancel"
                d="M7.355,3a4.355,4.355,0,1,0,4.355,4.355A4.351,4.351,0,0,0,7.355,3ZM9.533,8.919l-.614.614L7.355,7.97,5.792,9.533l-.614-.614L6.741,7.355,5.178,5.792l.614-.614L7.355,6.741,8.919,5.178l.614.614L7.97,7.355Z"
                transform="translate(-3 -3)"
                fill="currentColor"
            />
        </svg>
    );
};
