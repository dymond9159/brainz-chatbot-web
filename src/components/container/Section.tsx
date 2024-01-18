import React from "react";

import { IDivProps } from "@/types";

export const Section: React.FC<IDivProps> = (props) => {
    return <div className={`section ${props.className}`}>{props.children}</div>;
};
