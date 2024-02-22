import React from "react";

import { cn } from "@/utils/functions";
import { useSidebar } from "@/hooks/use-sidebar";
import { Flex, Section, Wrapper } from "../../container";
import { Logo, RecentBoard, ShortcutBoard, SocialBoard, UserProfile } from "..";
import { Button } from "@/components/ui";
import Link from "next/link";
import routes from "@/utils/routes";

export interface ISidebarProps extends React.ComponentProps<"div"> {
    chatId?: string;
}

export const Sidebar: React.FC<ISidebarProps> = (props) => {
    const { isSidebarOpen, isLoading, toggleSidebar } = useSidebar();
    return (
        <div
            data-state={isSidebarOpen && !isLoading ? "open" : "closed"}
            className={cn(props.className, "sidebar")}
        >
            <Wrapper>
                <Flex className="row logo-board justify-between">
                    <Link href={routes.CHATHOME}>
                        <Logo />
                    </Link>
                    <Button
                        className="sidebar-close"
                        icon="close"
                        onClick={() => {
                            toggleSidebar();
                        }}
                    />
                </Flex>
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
