import React from "react";

import { DivProps } from "@/types";

export const Box: React.FC<DivProps> = (props) => {
    return <div className={`box ${props.className}`}>{props.children}</div>;
};
