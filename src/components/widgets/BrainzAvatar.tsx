import React from "react";
import Avatar from "react-avatar";

interface IAvatarProps {
    src: string;
    name?: string;
    size?: string;
}

export const BrainzAvatar: React.FC<IAvatarProps> = (props) => {
    return (
        <Avatar
            className="program-avatar"
            src={props.src}
            name={props.name ?? "Program"}
            size={props.size ?? "80"}
            color="gray"
            round={true}
        />
    );
};
