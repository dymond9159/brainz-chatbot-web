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
    const backColor = `radial-gradient(circle, #ffffff10 45%, ${
        M_COLOR[props.scores?.color ?? "default"]
    })`;
    const [isExpand, setExpand] = useState<boolean>(false);

    useEffect(() => {
        setExpand(props.collapse ?? false);
    }, [props.collapse]);
    return (
        <Box className={cn(props.className, "psychometric-box border")}>
            <Flex
                className={cn(
                    "col justify-center gap-15",
                    props.h_align ?? "items-center",
                )}
            >
                <Flex className={cn("row")}>
                    <Box
                        className="progress-box"
                        style={{ width: props.size }}
                    >
                        <CircularProgressbar
                            className="psycho-progress"
                            value={props?.scores?.score ?? 0}
                            maxValue={props?.scores?.maxScore ?? 10}
                            text={`${props?.scores?.score ?? "?"}`}
                            strokeWidth={12}
                            circleRatio={0.75}
                            styles={buildStyles({
                                // Rotation of path and trail, in number of turns (0-1)
                                rotation: 1 / 2 + 1 / 7.8,
                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                strokeLinecap: "round",

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
                            })}
                        />
                        <div
                            className="circle"
                            style={{ background: backColor }}
                        ></div>
                        {props.scores?.maxScore && (
                            <label>/ {props?.scores?.maxScore ?? "0"}</label>
                        )}
                    </Box>

                    {isExpand && (
                        <Flex className="col ml-10 gap-5 items-start">
                            {isExpand && <h3>{props?.title ?? ""}</h3>}
                            <h4>This can feel like:</h4>
                            <span style={{ color: pathColor }}>
                                {props?.scores?.severity ?? "Not measured yet"}
                            </span>
                            <label>
                                Last updated:{" "}
                                {formatDate(props?.scores?.updatedDate ?? "")}
                            </label>
                        </Flex>
                    )}
                </Flex>
                {isExpand && (
                    <React.Fragment>
                        <br />
                        <Markdown
                            remarkPlugins={[remarkGfm]}
                            components={{}}
                        >
                            {props.scores?.description}
                        </Markdown>
                    </React.Fragment>
                )}
                {!isExpand && <h4>{props?.title ?? ""}</h4>}
            </Flex>
        </Box>
    );
};
