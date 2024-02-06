import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWizard } from "react-use-wizard";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import swal from "sweetalert";

import { Box } from "@/components/container";
import { Button, ButtonGroup } from "@/components/ui";
import { AnimateBox } from "@/components/widgets";
import { IDivProps } from "@/types";
import { useAppDispatch } from "@/store";
import {
    clearActiveScore,
    clearMetricInfo,
    setActiveMetric,
    setActiveStep,
} from "@/store/reducers";
import routes from "@/utils/routes";
import _utils from "@/utils";
import moment from "moment";

interface IProps extends IDivProps {
    buttons?: string[];
    intro?: string;
    metricName?: string;
    onStop?: () => void;
    callBackUrl: string | null;
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
        swal({
            title: "Are you sure?",
            // text: "Once deleted, you will not be able to recover this imaginary file!",
            buttons: ["Not Sure", true],
            dangerMode: true,
        }).then((ok) => {
            if (ok) {
                if (props.onStop) props.onStop();
            } else {
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
                </ButtonGroup>
            </AnimateBox>
        </Box>
    );
};
