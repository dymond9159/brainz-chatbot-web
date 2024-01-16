import React from "react";

import { DivProps } from "@/types";

export const Wrapper: React.FC<DivProps> = (props) => {
    return <div className={`wrapper ${props.className}`}>{props.children}</div>;
};
