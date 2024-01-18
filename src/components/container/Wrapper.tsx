import React from "react";

import { IDivProps } from "@/types";

export const Wrapper: React.FC<IDivProps> = (props) => {
    return <div className={`wrapper ${props.className}`}>{props.children}</div>;
};
