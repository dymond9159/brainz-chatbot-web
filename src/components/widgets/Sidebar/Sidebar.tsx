import React from "react";

import { cn } from "@/utils/functions";
import { useSidebar } from "@/hooks/use-sidebar";
import { Flex, Section, Wrapper } from "../../container";
import { Logo, RecentBoard, ShortcutBoard, SocialBoard, UserProfile } from "..";

export interface ISidebarProps extends React.ComponentProps<"div"> {
    chatId?: string;
}

export const Sidebar: React.FC<ISidebarProps> = (props) => {
    const { isSidebarOpen, isLoading } = useSidebar();

    return (
        <div
            data-state={isSidebarOpen && !isLoading ? "open" : "closed"}
            className={cn(props.className, "sidebar")}
        >
            <Wrapper>
                <Logo />
                <Flex className="flex-board col items-start justify-start">
                    <Section className="recent-board">
                        <RecentBoard chatId={props.chatId} />
                    </Section>
                    <Section className="shortcut-board">
                        <ShortcutBoard />
                    </Section>
                    <Section className="follow-us">
                        <SocialBoard />
                    </Section>
                    <UserProfile className="user-profile" />
                </Flex>
            </Wrapper>
        </div>
    );
};
