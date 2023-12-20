import React from "react";

import { ChildrenProps } from "@/types";

export const Box: React.FC<ChildrenProps> = (props) => {
    return <div className={`box ${props.className}`}>{props.children}</div>;
};
