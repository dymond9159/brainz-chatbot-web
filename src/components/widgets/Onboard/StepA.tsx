"use client";

import React, { useEffect } from "react";

import { useSession } from "next-auth/react";
import { Section } from "@/components/container";
import { AnimateBox } from "@/components/widgets";
import { useWizard } from "react-use-wizard";

export const StepA: React.FC = () => {
    const { data: session } = useSession();
    const { nextStep } = useWizard();

    useEffect(() => {
        const timeoutID = window.setTimeout(() => {
            nextStep();
        }, 4000);

        return () => window.clearTimeout(timeoutID);
    }, []);

    return (
        <AnimateBox
            duration={3}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <Section>
                <h2>{`Hey ${session?.user?.name?.split(' ')[0]}`}</h2>
                <h1> {`How are you?`}</h1>
            </Section>
        </AnimateBox>
    );
};
