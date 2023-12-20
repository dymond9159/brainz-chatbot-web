import React from "react";

import { ChildrenProps } from "@/types";

export const Content: React.FC<ChildrenProps> = (props) => {
    return <div className={`content ${props.className}`}>{props.children}</div>;
};
