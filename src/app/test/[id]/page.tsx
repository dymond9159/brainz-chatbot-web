"use client";

import React, { useEffect, useState } from "react";
import { Wizard } from "react-use-wizard";
import { motion, AnimatePresence } from "framer-motion";

import { Flex, Container, Content, Wrapper, Box } from "@/components/container";
import {
    Navbar,
    ProgramDataType,
    QuestionnaireWizard,
    ReportWizard,
    Sidebar,
    WelcomeWizard,
} from "@/components/widgets";
import _utils from "@/utils";
import { ANSWER_COLLECT } from "@/libs/questionnaires/answers/answer";
import { useAppDispatch, useTypedSelector } from "@/store";
import { clearMetricInfo, setActiveMetric } from "@/store/reducers";
import { useRouter } from "next/navigation";

export interface MetricPageProps {
    params: {
        id: string;
    };
}

const MetricPage: React.FC<MetricPageProps> = (props) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [tool, setTool] = useState<ProgramDataType>();

    const startIndex = useTypedSelector((state) => state.metric.activeStep);

    useEffect(() => {}, []);

    useEffect(() => {
        const _tool = _utils.functions.getMetric(props.params.id);
        setTool(_tool);
        dispatch(clearMetricInfo());
    }, [props.params.id]);

    // Example: Wrap steps in an `<AnimatePresence` from framer-motion
    const AnimateWrapper = () => (
        <AnimatePresence initial={false}>
            <motion.div
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />
        </AnimatePresence>
    );

    return (
        <Container className="main-container">
            <Flex>
                <Sidebar className="left-side" />
                <Flex className="main-section col">
                    <Navbar className="main-nav">{tool?.name}</Navbar>
                    <Content className="test-content">
                        <Wrapper>
                            <Content className="test-area">
                                <Wizard
                                    startIndex={0}
                                    // wrapper={<AnimateWrapper />}
                                >
                                    <WelcomeWizard
                                        intro={tool?.questionnaires?.introduce}
                                        metricName={tool?.strid}
                                        buttons={
                                            tool?.questionnaires?.buttonOptions
                                        }
                                    />
                                    {tool?.questionnaires?.questions.length &&
                                        tool.questionnaires.questions.map(
                                            (q, i) => (
                                                <QuestionnaireWizard
                                                    key={i}
                                                    q={q}
                                                    questionCounts={
                                                        tool.questionnaires
                                                            ?.questionCounts
                                                    }
                                                    answerOptions={
                                                        ANSWER_COLLECT[
                                                            q.answerType
                                                        ]
                                                    }
                                                />
                                            ),
                                        )}
                                    <ReportWizard
                                        report={tool?.questionnaires?.report}
                                        qCount={
                                            tool?.questionnaires?.questionCounts
                                        }
                                        maxScore={
                                            tool?.questionnaires?.maxScore
                                        }
                                        metricName={props.params.id}
                                    />
                                </Wizard>
                            </Content>
                        </Wrapper>
                    </Content>
                </Flex>
            </Flex>
        </Container>
    );
};

export default MetricPage;
