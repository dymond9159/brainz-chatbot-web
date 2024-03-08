"use client";

import React, { useEffect } from "react";

import { Section } from "@/components/container";
import { AnimateBox, Logo } from "@/components/widgets";
import { useWizard } from "react-use-wizard";

export const Splash: React.FC = () => {
    const { nextStep } = useWizard();

    useEffect(() => {
        const timeoutID = window.setTimeout(() => {
            nextStep();
        }, 5000);

        return () => window.clearTimeout(timeoutID);
    }, []);

    return (
        <AnimateBox
            duration={5}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <Section>
                <Logo dir="col" />
            </Section>
        </AnimateBox>
    );
};
