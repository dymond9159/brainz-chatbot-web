import React from "react";
import { Flex } from "../../container";
import { ButtonGroup, Icon } from "../../ui";
import Link from "next/link";
import _utils from "@/utils";
import { useSidebar } from "@/hooks";
import routes from "@/utils/routes";

const SHORTCUTS = [
    {
        label: "Mind Chat",
        link: routes.CHAT,
        icon: "chat",
    },
    {
        label: "Mind Insights",
        link: routes.DASHBOARD,
        icon: "speedometer",
    },
    {
        label: "Mind Tests",
        link: routes.EXPLORE,
        icon: "radio-grid",
    },
];

export const ShortcutBoard: React.FC = (props) => {
    const { toggleSidebar } = useSidebar();

    const handleClick = () => {
        toggleSidebar();
    };

    return (
        <ButtonGroup
            groupname=""
            className="shortcut-button w-full col gap-10 justify-start"
        >
            {SHORTCUTS &&
                SHORTCUTS.map((item, i) => (
                    <Flex
                        key={i}
                        className="shortcut row gap-15 w-full"
                    >
                        <Icon name={item.icon} />
                        <Link
                            href={item.link}
                            onClick={handleClick}
                        >
                            {item.label}
                        </Link>
                    </Flex>
                ))}
        </ButtonGroup>
    );
};
