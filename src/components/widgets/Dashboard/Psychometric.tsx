import React from "react";

import { cn, formatDate } from "@/utils/functions";
import { IDivProps, MetricCharactersType } from "@/types";
import { Box, Flex } from "@/components/container";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

interface IProps extends IDivProps {
    title?: string;
    scores?: MetricCharactersType;
}

export const Psychometric: React.FC<IProps> = (props) => {
    return (
        <Box className={cn(props.className, "psychometric-box")}>
            <Flex className="col items-start justify-start gap-15">
                <h4>{props?.title ?? ""}</h4>
                <Flex className="row">
                    <Box className="progress-box">
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
                                textSize: "24px",

                                // How long animation takes to go from one percentage to another, in seconds
                                pathTransitionDuration: 0.5,

                                // Can specify path transition in more detail, or remove it entirely
                                // pathTransition: 'none',

                                // Colors
                                // pathColor: `${pathColor}`,
                                textColor: "currentColor",
                                trailColor: "rgba(32, 32, 25, 0.1)",
                                backgroundColor: `rgba(62, 52, 199, 0.1)`,
                            })}
                        />
                        <label>/{props?.scores?.maxScore ?? 10}</label>
                    </Box>
                    <Flex className="col ml-10">
                        <h4>This can feel like:</h4>
                        <p>{props?.scores?.strValue ?? "Not measured yet"}</p>
                        <em>
                            <label>
                                {formatDate(props?.scores?.updatedDate ?? "")}
                            </label>
                        </em>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    );
};
