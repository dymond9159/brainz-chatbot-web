import React from "react";

import { IDivProps } from "@/types";

export const Box: React.FC<IDivProps> = (props) => {
    return <div className={`box ${props.className}`}>{props.children}</div>;
};
