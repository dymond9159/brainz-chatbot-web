import React from "react";

import { cn } from "@/utils/functions";
import { useSidebar } from "@/hooks/use-sidebar";
import { Flex, Section, Wrapper } from "../container";
import {
    Logo,
    ProgramBoard,
    RecentBoard,
    ShortcutBoard,
    SocialBoard,
    UserProfile,
} from ".";

export interface ISidebarProps extends React.ComponentProps<"div"> {}

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
                    <Section className="feature-board">
                        <ProgramBoard />
                    </Section>
                    <Section className="recent-board">
                        <RecentBoard />
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
