import React from "react";
import { Button, ButtonGroup, Icon } from "../../ui";
import _utils from "@/utils";
import { useRouter } from "next/navigation";
import { useTypedSelector } from "@/store";

export const RecentBoard: React.FC = (props) => {
    const router = useRouter();

    const { recentPrograms } = useTypedSelector((state) => state.chat);

    const handleChat = (id: string) => {
        router.push(`/chat/${id}`);
    };

    return (
        <ButtonGroup
            groupname="Recent Programs"
            className="full col gap-10 justify-start items-start"
        >
            {recentPrograms &&
                recentPrograms.map((item, index) => (
                    <Button
                        className="full relative"
                        key={index}
                        onClick={() => handleChat(item.progStrId)}
                    >
                        {_utils.functions.getProgram(item.progStrId).name}
                        <br></br>
                        <span className="last-message">{item.lastMessage}</span>
                        <span className="remove">
                            <Icon name="trash"></Icon>
                        </span>
                    </Button>
                ))}
        </ButtonGroup>
    );
};
