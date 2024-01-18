import * as React from "react";
import { useInView } from "react-intersection-observer";

import { useAtBottom } from "@/hooks";

interface ChatScrollAnchorProps {
    trackVisibility?: boolean;
}

export const ChatScrollAnchor: React.FC<ChatScrollAnchorProps> = ({
    trackVisibility,
}) => {
    const isAtBottom = useAtBottom();
    const { ref, entry, inView } = useInView({
        trackVisibility,
        delay: 100,
        rootMargin: "0px 0px -30px 0px",
    });

    React.useEffect(() => {
        if (isAtBottom && trackVisibility && !inView) {
            entry?.target.scrollIntoView({
                block: "end",
            });
        }
    }, [inView, entry, isAtBottom, trackVisibility]);

    return (
        <div
            ref={ref}
            style={{ width: "100%", height: "1px" }}
        />
    );
};
