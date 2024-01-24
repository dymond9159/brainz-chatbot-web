import React from "react";
import { Content, Flex } from "../container";
import { Button } from "../ui";
import routes from "@/utils/routes";
import { useRouter } from "next/navigation";

const NAVIGATOR_MENU = [
    {
        label: "Home",
        icon: "house",
        url: routes.CHATHOME,
    },
    {
        label: "Explore",
        icon: "radio-grid",
        url: routes.PROGRAMS,
    },
    {
        label: "Chat",
        icon: "chat-dot",
        url: routes.CHAT,
    },
    {
        label: "Dashboard",
        icon: "speedometer",
        url: routes.DASHBOARD,
    },
];

export const MobileNavigator = () => {
    const router = useRouter();
    return (
        <Content className="mobile-navigator">
            <Flex className="row items-center justify-around full">
                {NAVIGATOR_MENU &&
                    NAVIGATOR_MENU.map((_, index) => (
                        <Button
                            key={index}
                            icon={_.icon}
                            vertical={"true"}
                            onClick={() => {
                                router.push(_.url);
                                router.refresh();
                            }}
                        >
                            {_.label}
                        </Button>
                    ))}
            </Flex>
        </Content>
    );
};
