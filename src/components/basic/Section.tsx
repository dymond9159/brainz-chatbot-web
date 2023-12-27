import React from "react";

import { ChildrenProps } from "@/types";

export const Section: React.FC<ChildrenProps> = (props) => {
    return <div className={`section ${props.className}`}>{props.children}</div>;
};
