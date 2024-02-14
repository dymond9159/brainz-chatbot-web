import React from "react";
import { Box, Flex } from "@/components/container";
import Link from "next/link";
import { IDivProps } from "@/types";

interface IProps extends IDivProps {
    title: string;
    description?: string;
    url: string;
}

export const HomeShortcutItem: React.FC<IProps> = (props) => {
    return (
        <Box className="home-shortcut">
            <Link href={props.url}>
                <h4>{props.title}</h4>
            </Link>
            <p>{props.description}</p>
        </Box>
    );
};
