import React from "react";

import { cn } from "@/utils/functions";
import { IDivProps } from "@/types";
import { Box } from "@/components/container";

interface IProps extends IDivProps {
    title?: string;
}

export const MonitorBox: React.FC<IProps> = (props) => {
    return (
        <Box className={cn(props.className, "monitor-box")}>
            {props.title && <h3 className="monitor-title">{props.title}</h3>}
            <div className="monitor-content">{props.children}</div>
        </Box>
    );
};
