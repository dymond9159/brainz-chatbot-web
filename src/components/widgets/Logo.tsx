import React from "react";
import { Content, Flex } from "../container";
import { Icon } from "../ui";
import Link from "next/link";
import { cn } from "@/utils/functions";

const LOGO_TEXT = "Brainz Health";
interface IProps {
    dir?: string;
}
export const Logo = (props: IProps) => {
    return (
        <Content className="logo-nav">
            <Flex
                className={cn(
                    "items-center justify-between full gap-5",
                    props.dir ?? "row",
                )}
            >
                <Icon
                    name="brainz-logo"
                    size={30}
                />
                <h2 className="logo-text">{LOGO_TEXT}</h2>
            </Flex>
        </Content>
    );
};
