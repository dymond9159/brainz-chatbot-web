"use client";

import React from "react";
import { useWizard } from "react-use-wizard";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import swal from "sweetalert";

import { Box } from "@/components/container";
import { Button, ButtonGroup } from "@/components/ui";
import { AnimateBox } from "@/components/widgets";
import { IDivProps } from "@/types";
import { useAppDispatch, useTypedSelector } from "@/store";
import { clearMetricInfo, setActiveMetric } from "@/store/reducers";

interface IProps extends IDivProps {
    intro?: string;
    metricName?: string;
    onStop?: () => void;
}
export const WelcomeWizard: React.FC<IProps> = (props) => {
    const dispatch = useAppDispatch();
    const { goToStep, nextStep } = useWizard();

    //
    const score = useTypedSelector(
        (state) => state.metric.scores[props.metricName ?? ""],
    );

    // when start, clear the score, set metricName
    const handleStart = () => {
        dispatch(clearMetricInfo());
        nextStep();
    };

    const handleGoStep = () => {
        goToStep(score?.activeStep);
    };

    const handleStop = () => {
        swal({
            title: "Are you sure?",
            // text: "Once deleted, you will not be able to recover this imaginary file!",
            buttons: ["Not Sure", true],
            dangerMode: true,
        }).then((ok) => {
            if (ok && props.onStop) {
                props.onStop();
            }
        });
    };

    return (
        <Box className={`markdonw-box`}>
            <AnimateBox
                duration={0.6}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <Markdown
                    remarkPlugins={[remarkGfm]}
                    components={{}}
                >
                    {props.intro}
                </Markdown>
                <ButtonGroup className="wrap gap-15">
                    <Button onClick={handleStart}>Yes, I am ready</Button>
                    <Button onClick={handleStop}>No, not right now</Button>
                    {score?.activeStep ? (
                        <Button onClick={handleGoStep}>Continue</Button>
                    ) : null}
                </ButtonGroup>
            </AnimateBox>
        </Box>
    );
};
