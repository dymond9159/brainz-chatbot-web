import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWizard } from "react-use-wizard";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Box, Flex } from "@/components/container";
import { Button, ButtonGroup } from "@/components/ui";
import { IDivProps, MetricCharactersType, MetricReportType } from "@/types";
import { useAppDispatch, useTypedSelector } from "@/store";
import {
    clearActiveScore,
    setActiveMetric,
    setActiveStep,
    setPsychometricScore,
} from "@/store/reducers";
import routes from "@/utils/routes";
import { Psychometric } from "../Dashboard";
import _utils from "@/utils";
import moment from "moment";
import { motion } from "framer-motion";
import { AnimateBox, AnimateMarkdown } from "..";

interface IProps extends IDivProps {
    report?: MetricReportType;
    qCount?: number;
    maxScore?: number;
    metricName?: string;
    callBackUrl?: string;
}
export const ReportWizard: React.FC<IProps> = (props) => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const {
        isLoading,
        activeStep,
        goToStep,
        handleStep,
        previousStep,
        nextStep,
    } = useWizard();

    const scores = useTypedSelector((state) => state.metric.scores);
    const activeScore = useTypedSelector((state) => state.metric.activeScore);

    useEffect(() => {
        const _arrScore = activeScore?.filter((value) => value !== -1) ?? [];
        // when filled all questions.
        if (_arrScore?.length === props.qCount) {
            let _score = -1;
            if (props.metricName !== "suicide") {
                // not suicidal
                _score = _arrScore?.reduce((sum, v) => sum + v, 0) ?? -1;
            } else {
                // when suicidal
                _score = Math.max(..._arrScore);
            }

            const severity = props.report?.severities?.filter(
                (item) =>
                    _score >= item.scoreRange[0] &&
                    _score <= item.scoreRange[1],
            );

            if (severity?.length) {
                const _metric: MetricCharactersType = {
                    score: _score,
                    maxScore: props.maxScore,
                    severity: severity[0].severity,
                    color: severity[0].color,
                    description: severity[0].description,
                };

                if (scores && props.metricName) {
                    const dateOld =
                        scores[props.metricName].updatedDate ?? "00:00:00";

                    const oldDay = moment(new Date()).format("YYYY-MM-DD");
                    const toDay = moment(new Date()).format("YYYY-MM-DD");

                    // console.log(dateOld, oldDay, toDay, oldDay == toDay);

                    if (oldDay <= toDay) {
                        dispatch(setPsychometricScore(_metric));
                        // if (oldDay === toDay && !confirm("Updated?")) {
                        // } else {
                        //     console.log("updated.");
                        // }
                    }
                }
            }
        } else {
            alert("Oop! Looks like you didn't complete all the questions.");
        }
    }, [activeScore]);

    useEffect(() => {
        if (activeStep) {
            dispatch(setActiveStep(activeStep));
        }
    }, [activeStep]);

    // when start, clear the score, set metricName
    const handleStart = () => {
        dispatch(setActiveMetric(props.metricName));
        dispatch(clearActiveScore());
        nextStep();
    };

    const handleStop = () => {
        if (confirm("Are you sure?")) {
            dispatch(setActiveMetric(undefined));
            dispatch(clearActiveScore());

            // go to callBack url
            if (!props.callBackUrl) {
                router.push(routes.CHATHOME);
            }
        }
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
                        scores={
                            props.metricName && scores
                                ? scores[props.metricName]
                                : undefined
                        }
                        size={"100px"}
                        h_align="items-center"
                        collapse={true}
                    />
                    <hr />
                    <ButtonGroup className="wrap gap-15">
                        <Button
                            icon="caret-open-left"
                            onClick={() => previousStep()}
                        >
                            Back
                        </Button>
                        <Button
                            icon="arrow-clockwise"
                            onClick={() => goToStep(0)}
                        >
                            Restart
                        </Button>
                        <Button
                            icon="speedometer"
                            onClick={() => router.push(routes.DASHBOARD)}
                        >
                            Dashboard
                        </Button>
                        {/* <Button>Return</Button> */}
                    </ButtonGroup>
                </AnimateBox>
            </Box>
        </Flex>
    );
};
