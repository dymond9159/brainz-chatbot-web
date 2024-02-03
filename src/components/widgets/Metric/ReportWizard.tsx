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
        const _arrScore = activeScore?.filter((value) => value !== -1);

        // when filled all questions.
        if (_arrScore?.length === props.qCount) {
            const _score = _arrScore?.reduce((sum, v) => sum + v, 0) ?? -1;
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
                dispatch(setPsychometricScore(_metric));
            }
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
        <React.Fragment>
            <Flex className={`col border markdonw-box`}>
                <h2>{props.report?.title ?? "Score Report"}</h2>
                <br />
                <Box className="scroll-box">
                    <Markdown
                        remarkPlugins={[remarkGfm]}
                        components={{}}
                    >
                        {props.report?.description}
                    </Markdown>
                    <Psychometric
                        title="Your Score"
                        scores={scores?.anxiety}
                        size={"100px"}
                        h_align="items-center"
                    />
                </Box>
                <hr />
                <ButtonGroup className="wrap gap-15">
                    <Button
                        icon="caret-open-left"
                        onClick={() => previousStep()}
                    >
                        Record
                    </Button>
                    <Button
                        icon="arrow-clockwise"
                        onClick={() => goToStep(0)}
                    >
                        Reset
                    </Button>
                    <Button icon="stop-fill">Done</Button>
                </ButtonGroup>
            </Flex>
        </React.Fragment>
    );
};
