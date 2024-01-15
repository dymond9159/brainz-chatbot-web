import React from "react";

import { ChildrenProps } from "@/types";

export const Wrapper: React.FC<ChildrenProps> = (props) => {
    return <div className={`wrapper ${props.className}`}>{props.children}</div>;
};
