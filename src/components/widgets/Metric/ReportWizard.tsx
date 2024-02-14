import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Markdown from "react-markdown";

import { Box, Flex } from "@/components/container";
import { Button, ButtonGroup } from "@/components/ui";
import { IDivProps, MetricCharactersType, MetricReportType } from "@/types";
import { useAppDispatch, useTypedSelector } from "@/store";
import { setPsychometricScore } from "@/store/reducers";
import routes from "@/utils/routes";
import { Psychometric } from "../Dashboard";
import _utils from "@/utils";
import moment from "moment";
import { AnimateBox } from "..";

interface IProps extends IDivProps {
    report?: MetricReportType;
    qCount?: number;
    maxScore?: number;
    onStop?: () => void;
}
export const ReportWizard: React.FC<IProps> = (props) => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    // get the monitor results
    const activeMetric = useTypedSelector((state) => state.metric.activeMetric);
    const activeScore = useTypedSelector(
        (state) => state.metric.scores[activeMetric ?? ""]?.itemsScore,
    );
    const lastedUpdated = useTypedSelector(
        (state) => state.metric.scores[activeMetric ?? ""]?.updatedDate,
    );

    // final score
    const [score, setFinalScore] = useState<MetricCharactersType>();

    // flag values
    const [isMeasured, setIsMeasured] = useState<boolean>(false);
    const [isNewRecord, setIsNewRecord] = useState<boolean>(false);
    const [isOverwrite, setIsOverwrite] = useState<boolean>(false);

    useEffect(() => {
        // get final score from activeScore array
        if (activeMetric) {
            const finalScore = _utils.functions.calculateFinalScore(
                activeMetric,
                activeScore,
            );

            const severity = props.report?.severities?.filter(
                (item) =>
                    finalScore >= item.scoreRange[0] &&
                    finalScore <= item.scoreRange[1],
            );

            if (severity?.length) {
                setFinalScore({
                    score: finalScore,
                    maxScore: props.maxScore,
                    severity: severity[0].severity,
                    color: severity[0].color,
                    description: severity[0].description,
                    updatedDate: new Date().toISOString(),
                    activeStep: 0,
                    prevStep: [],
                    itemsScore: activeScore,
                });
            }
        }
    }, [activeScore, activeMetric, props.maxScore, props.report]);

    useEffect(() => {
        console.log({ score });
        if (score && dispatch) {
            const dateOld = lastedUpdated ?? "1999-01-01";

            const oldDay = moment(new Date(dateOld)).format("YYYY-MM-DD");
            const toDay = moment(new Date()).format("YYYY-MM-DD");

            console.log(oldDay, toDay, oldDay < toDay);

            if (oldDay < toDay) {
                dispatch(setPsychometricScore(score));
            }

            if (oldDay === toDay) {
                setIsMeasured(true);
            }
        }
    }, [score, dispatch]);

    useEffect(() => {
        if (score) {
            if (isNewRecord) {
            }
            if (isOverwrite) {
            }
            dispatch(setPsychometricScore(score));
        }
    }, [score, isOverwrite, isNewRecord]);

    // already measured today
    const handleNewRecord = () => {
        setIsNewRecord(true);
    };

    const handleOverwrite = () => {
        setIsOverwrite(true);
    };

    return (
        <Flex className={`col border markdonw-box`}>
            <h2>{props.report?.title ?? "Score Report"}</h2>
            <br />
            <Box className="scroll-box">
                <AnimateBox
                    duration={1}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <Markdown>{props.report?.description}</Markdown>
                    <Psychometric
                        title="Your Score"
                        scores={score}
                        collapse={true}
                    />
                    {isMeasured && (
                        <Markdown>
                            {
                                "**You already have a record for today. Would you like update?**"
                            }
                        </Markdown>
                    )}
                    {isMeasured && !isOverwrite && !isNewRecord && (
                        <ButtonGroup className="wrap gap-15">
                            <Button onClick={handleNewRecord}>
                                New Record
                            </Button>
                            <Button onClick={handleOverwrite}>Overwrite</Button>
                        </ButtonGroup>
                    )}
                    {isOverwrite && <Markdown>Overwrited.</Markdown>}
                    {isNewRecord && <Markdown>New recroded.</Markdown>}
                    <hr />
                    <ButtonGroup className="wrap gap-15">
                        <Button onClick={() => props.onStop && props.onStop()}>
                            Return
                        </Button>
                        <Button
                            icon="speedometer"
                            onClick={() => router.push(routes.DASHBOARD)}
                        >
                            Mind insights
                        </Button>
                    </ButtonGroup>
                </AnimateBox>
            </Box>
        </Flex>
    );
};
