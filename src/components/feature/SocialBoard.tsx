import React from "react";
import { Flex } from "../basic";
import { Button, ButtonGroup, Icon } from "../ui";
import Link from "next/link";
import _utils from "@/utils";

export const SocialBoard: React.FC = (props) => {
    return (
        <ButtonGroup
            groupname="Follow us"
            className="full row gap-10 justify-start"
        >
            <Link
                href={_utils.routes.FACEBOOK}
                target="_blank"
            >
                <Button icon="facebook"></Button>
            </Link>
            <Link
                href={_utils.routes.INSTAGRAM}
                target="_blank"
            >
                <Button icon="instagram"></Button>
            </Link>
            <Link
                href={_utils.routes.TIKTOK}
                target="_blank"
            >
                <Button icon="tiktok"></Button>
            </Link>
            <Link
                href={_utils.routes.SNAPCHAT}
                target="_blank"
            >
                <Button icon="snapchat"></Button>
            </Link>
        </ButtonGroup>
    );
};
