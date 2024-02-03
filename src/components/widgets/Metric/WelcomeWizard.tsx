import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWizard } from "react-use-wizard";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Box } from "@/components/container";
import { Button, ButtonGroup } from "@/components/ui";
import { IDivProps } from "@/types";
import { useAppDispatch } from "@/store";
import {
    clearActiveScore,
    clearMetricInfo,
    setActiveMetric,
    setActiveStep,
} from "@/store/reducers";
import routes from "@/utils/routes";

interface IProps extends IDivProps {
    buttons?: string[];
    intro?: string;
    metricName?: string;
    callBackUrl?: string;
}
export const WelcomeWizard: React.FC<IProps> = (props) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { activeStep, handleStep, previousStep, nextStep } = useWizard();

    useEffect(() => {
        dispatch(setActiveStep(activeStep));
    }, [activeStep]);

    // when start, clear the score, set metricName
    const handleStart = () => {
        dispatch(setActiveMetric(props.metricName));
        dispatch(clearMetricInfo());
        nextStep();
    };

    const handleStop = () => {
        if (confirm("Are you sure?")) {
            dispatch(setActiveMetric(undefined));
            dispatch(clearMetricInfo());
            // go to callBack url
            if (!props.callBackUrl) {
                router.push(routes.CHATHOME);
            }
        }
    };

    return (
        <React.Fragment>
            <Box className={`border markdonw-box`}>
                <Markdown
                    remarkPlugins={[remarkGfm]}
                    components={{}}
                >
                    {props.intro}
                </Markdown>
                <ButtonGroup className="wrap gap-15">
                    <Button onClick={handleStart}>Yes, I am ready</Button>
                    <Button onClick={handleStop}>No, not right now</Button>
                </ButtonGroup>
            </Box>
        </React.Fragment>
    );
};
