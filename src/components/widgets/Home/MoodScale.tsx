import React from "react";
import { Box, Flex } from "@/components/container";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useTypedSelector } from "@/store";
import { formatDate } from "@/utils/functions";

const MAX_VALUE = 10;
export const MoodScale = () => {
    const pathColor =
        "conic-gradient(from -54deg at 284.27% 39.08%, #E3CED7 219.6000051498413deg, #D4B4D4 251.99999570846558deg, #AC87C9 360deg)";
    const moodScore = useTypedSelector((state) => state.metric.scores?.mood);

    return (
        <Flex className="col mood-box">
            <h2 className="mood-title">{"Hey, there!"}</h2>
            <Box className="mood-progress">
                <CircularProgressbar
                    className="mood-scale"
                    value={moodScore?.score ?? 0}
                    maxValue={moodScore?.maxScore ?? MAX_VALUE}
                    text={`${moodScore?.score ?? 0}`}
                    strokeWidth={12}
                    circleRatio={0.7}
                    styles={buildStyles({
                        // Rotation of path and trail, in number of turns (0-1)
                        rotation: 1 / 2 + 1 / 6.5,

                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: "round",

                        // Text size
                        textSize: "16px",

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
                ></CircularProgressbar>
                {moodScore?.maxScore && (
                    <label className="mood-max">
                        /{moodScore?.maxScore ?? 10}
                    </label>
                )}
            </Box>
            <p>{moodScore?.severity ?? "Not measured yet."}</p>
            <label>{formatDate(moodScore?.updatedDate ?? "")}</label>
            {/* <p>{moodScore?.description ?? ""}</p> */}
        </Flex>
    );
};
