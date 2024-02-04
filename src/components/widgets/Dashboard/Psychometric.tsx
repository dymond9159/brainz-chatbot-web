import React, { useEffect, useState } from "react";

import { cn, formatDate } from "@/utils/functions";
import { IDivProps, MetricCharactersType } from "@/types";
import { Box, Flex } from "@/components/container";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { M_COLOR } from "@/utils/constants";

interface IProps extends IDivProps {
    title?: string;
    scores?: MetricCharactersType;
    size?: string;
    h_align?: string;
    collapse?: boolean;
}

export const Psychometric: React.FC<IProps> = (props) => {
    const pathColor = M_COLOR[props.scores?.color ?? "default"];
    const [isExpand, setExpand] = useState<boolean>(false);

    useEffect(() => {
        setExpand(props.collapse ?? false);
    }, [props.collapse]);
    return (
        <Box className={cn(props.className, "psychometric-box")}>
            <Flex
                className={cn(
                    "col justify-start gap-15",
                    props.h_align ?? "items-start",
                )}
            >
                <h3>{props?.title ?? ""}</h3>
                <Flex className="row">
                    <Box
                        className="progress-box"
                        style={{ width: props.size }}
                    >
                        <CircularProgressbar
                            className="psycho-progress"
                            value={props?.scores?.score ?? 0}
                            maxValue={props?.scores?.maxScore ?? 10}
                            text={`${props?.scores?.score ?? 0}`}
                            strokeWidth={3}
                            circleRatio={1}
                            styles={buildStyles({
                                // Rotation of path and trail, in number of turns (0-1)
                                rotation: 0.5,
                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                strokeLinecap: "butt",

                                // Text size
                                textSize: "22px",

                                // How long animation takes to go from one percentage to another, in seconds
                                pathTransitionDuration: 0.5,

                                // Can specify path transition in more detail, or remove it entirely
                                // pathTransition: 'none',

                                // Colors
                                pathColor: `${pathColor}`,
                                textColor: "currentColor",
                                trailColor: "rgba(32, 32, 25, 0.1)",
                                backgroundColor: `rgba(62, 52, 199, 0.1)`,
                            })}
                        />
                        {props.scores?.maxScore && (
                            <label>/ {props?.scores?.maxScore ?? 10}</label>
                        )}
                    </Box>
                    <Flex className="col ml-10">
                        <h4>This can feel like:</h4>
                        <span style={{ color: pathColor }}>
                            {props?.scores?.severity ?? "Not measured yet"}
                        </span>
                        <em>
                            <label>
                                Last updated:{" "}
                                {formatDate(props?.scores?.updatedDate ?? "")}
                            </label>
                        </em>
                    </Flex>
                </Flex>
                <br />
                {isExpand && (
                    <Markdown
                        remarkPlugins={[remarkGfm]}
                        components={{}}
                    >
                        {props.scores?.description}
                    </Markdown>
                )}
            </Flex>
        </Box>
    );
};
