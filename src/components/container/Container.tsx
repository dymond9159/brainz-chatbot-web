import React from "react";

import { IDivProps } from "@/types";

export const Container: React.FC<IDivProps> = (props) => {
    return (
        <div className={`container ${props.className}`}>{props.children}</div>
    );
};
