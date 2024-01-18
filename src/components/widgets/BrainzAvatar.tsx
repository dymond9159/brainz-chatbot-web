import React from "react";
import Avatar from "react-avatar";

import { cn } from "@/utils/functions";

interface IAvatarProps {
    src: string;
    name?: string;
    size?: string;
    color?: string;
    className?: string;
}

export const BrainzAvatar: React.FC<IAvatarProps> = (props) => {
    return (
        <Avatar
            className={cn(props.className, "avatar")}
            src={props.src}
            name={props.name ?? "Program"}
            size={props.size ?? "80"}
            color={props.color ?? "gray"}
            round={true}
        />
    );
};
