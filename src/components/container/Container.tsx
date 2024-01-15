import React from "react";

import { ChildrenProps } from "@/types";

export const Container: React.FC<ChildrenProps> = (props) => {
    return (
        <div className={`container ${props.className}`}>{props.children}</div>
    );
};
