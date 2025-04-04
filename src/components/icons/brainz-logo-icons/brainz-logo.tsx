import { IIconProps } from "@/types";
import React, { FC } from "react";

export const BrainzLogoIcon: FC<IIconProps> = (props) => (
    <svg
        width={props.size ?? "64"}
        height={props.size ?? "63"}
        viewBox="0 0 64 63"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M31.71 47.5564V63H0V47.5564C0 38.8061 7.09617 31.71 15.855 31.71C24.6138 31.71 31.71 38.8061 31.71 47.5649V47.5564Z"
            fill="currentColor"
        />
        <path
            d="M15.855 31.71C24.6114 31.71 31.71 24.6114 31.71 15.855C31.71 7.09851 24.6114 0 15.855 0C7.09852 0 0 7.09851 0 15.855C0 24.6114 7.09852 31.71 15.855 31.71Z"
            fill="currentColor"
        />
        <path
            d="M47.5737 31.71C56.3302 31.71 63.4287 24.6114 63.4287 15.855C63.4287 7.09851 56.3302 0 47.5737 0C38.8173 0 31.7188 7.09851 31.7188 15.855C31.7188 24.6114 38.8173 31.71 47.5737 31.71Z"
            fill="#BCF16D"
        />
        <path
            d="M63.4287 47.5564V63H31.7188V47.5564C31.7188 38.7976 38.8149 31.7014 47.5737 31.7014C56.3325 31.7014 63.4287 38.7976 63.4287 47.5564Z"
            fill="currentColor"
        />
    </svg>
);
