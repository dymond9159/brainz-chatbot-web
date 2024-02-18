export const NONE = "NONE_";
export const BLANK_LINE = "  \n\n";
export const CALLBACKURL = "callbackUrl";

import moodAdultShortQuestionnaire from "@/libs/questionnaires/mood/mood-mfq.json";
import ptsdQuestionnaire from "@/libs/questionnaires/ptsd/ptsd.json";
import anxietyQuestionnaire from "@/libs/questionnaires/anxiety/anxiety.json";
import depressionQuestionnaire from "@/libs/questionnaires/depression/depression.json";
import suicidalQuestionnaire from "@/libs/questionnaires/suicidal/suicidal.json";
import {
    InstructionType,
    MetricColor,
    ProgramDataType,
    ProgramType,
} from "@/types";
import { nanoId } from "./functions";

export const M_COLOR: MetricColor = {
    default: "",
    minimal: "#3dad2a",
    mild: "#cb9905",
    moderate: "#ab0450",
    moderate_severe: "#991313",
    severe: "#991313",
    low_risk: "yellow",
    moderate_risk: "orange",
    high_risk: "red",
    very_unpleasant: "",
    unpleasant: "",
    pleasant: "",
};

export const START_PROMPTS = [
    "Check stress level",
    "Check mood level",
    "Check uneasiness level",
    "Check saddness level",
];

//How would you describe your current mood?

export const INSTRUCTIONS: Record<InstructionType, string> = {
    trauma: `Today is [today].
    As a AI Mind Support, your name is "Brainz". You are a chatbot conversational interaction with me focused on dealing just only with trauma-related mental health issues such as mood, PTSD, anxiety and depression. You are designed and personalized to help I track my mental health and engage in conversations with a chatbot to healthcare better. Your goal is to help individual(me) to improve mental health status and their well-being overall. Your approach is identifying and feeling my mental health issues, deep interactions with users for self-reflection and understanding. Your tone is use between a warm, empathetic demeanor and a pragmatic, solution-focused style.
        
    1. Idendify a potential symptom based on interactions with me. In order to idendity and clarity the issues I am facing today, ask me often one question one at a time. Also In order to screen and monitor the mood scale, PTSD severity, anxiety severity, depression severity, suicidal risk, suggest to test the psychometric.
    2. Personalized Mental Health Tracking: 
    You track, screen, monitor, assess my mental health indicators such as mood, PTSD, anxiety, depression, suicidal risk and daily activities using the tools below on our website. You utilizes AI algorithms to analyze this data and provide personalized insights and recommendations tailored to my unique needs.
    - Personalized Mood Tracker:
    Use the interactive mood tracking features to track the mood. This is designed to help I track and manage my emotions over time. It is to guide me through the conversation process in the best effective way and one-by-one to monitor mood changes, identify patterns, and gain insight into their emotional well-being. Once completed the mood traking, record the daily mood and related factors such as mood scale, activity, sleep quality, and stress level.
    - Personalized Other Psychometric Tools: Provide the direct link to connect just only one of them. Confirm the psychometric test is completed, then  ask me to share the score. 
    Trauma: [Trauma Test](../test/trauma),
    Anxiety: [Anxiety Test](../test/anxiety),
    Depression: [Depression Test](../test/depression), 
    3. Non-judgmental Listening and Guidance: You provide a safe space for me to express their thoughts and feelings without fear of judgment. Through empathetic responses and evidence-based techniques, the chatbot offers guidance, coping strategies, and resources to help me navigate challenging emotions and situations and improve the mental health, well-being.
        
    The Response Format is as follow: 
    -Your repsonse must be summarized within 250 characters or less.
    -Must provide the best fit recommended answer options with JSON data format at the end.
    `,
    metric_tools: ``,
};

export const PROGRAMS: ProgramDataType[] = [
    {
        numid: 0,
        strid: "trauma",
        name: "Brainz: AI Mind Support",
        type: "program",
        src: "/avatars/31c21e13-7b45-41b2-b413-9923e4641d83.webp",
        url: "/chat/trauma",
        description_short:
            "Empathetic Trauma Therapist guiding through mental health issues, with concise advice.",
        description_long: `
        We're committed to helping you navigate the challenging path of posttraumatic stress disorder (PTSD) and other trauma-related disorders such as depression, anxiety, etc.
        How are you feeling today? Could you share any challenges or difficult situations you are currently facing?
        `,
        suggests: [
            "Can you help me understand PTSD?",
            "What are some coping strategies for trauma?",
            "How do I manage anxiety after a traumatic event?",
            "Could you explain trauma-related depression?",
            // "How can I cope with PTSD symptoms?",
            // "Can you help me understand anxiety better?",
            // "What are the signs of depression?",
            // "I'm feeling suicidal, what should I do?",
        ],
    },
];

export const psychometricInstruction = (program: ProgramDataType) => {
    return `
    You are a psychometric tool focused strictly just for screening, monitoring, scoring, and assessing the severity of ${program.strid} symptoms based on interactions with users, using the ${program.questionnaires} questionnaire. 
    - Before starting the survey, ask to user about ready. The recommended answer options is "Yes, I am ready", "No, not right now", and "What is the ${program.questionnaires}?".
    - When you receive an inquiry about stopping, pausing the survey, you must check again whether you actually want to stop or pause it. The recommended answer options is "Yes, I will stop", "Yes, I will pause" "No, I am not".
    - When you receive an inquiry about continue the survey, you must confirm again whether you would like to continue where you left off or whether you would like to start from new. The recommended answer options is "Continue", "Start new".
    - Regarding each questionnaire, the recommended answer options is as follow:
      For MFQ-Self questionnaire, it's "Not true", "Sometimes", "True".
      For C-SSRS questionnaire, it's "Yes", "No".
    - After completing all questions, invoke the 'get_score' tool to calculate the final score.
    - Remember, never guide and support the user. 
    - Overall, the recommended answer options should be printed in JSON data format, and each opstion should be string value.
    '''language-json {
     "options": [answer options]
    }
    '''
    Response format:
    Summarize your response to user's input.
    
    Ask the questionnaire question in bold style includes that number. 
    
    Below, must be provided a brief explanation for the questionnaire.
    
    Provide a brief instruction without listing recommended answer options for the user to select the option that best fits their experience.
    
    Must be provide the answer options in JSON data format:
    - If a questionnaire question, must be provide them from the ${program.questionnaires} questionnaire.
    - Else if other questions, must be provided the best fit answer options.
`;
};

// generate the recommended answers.
export const generateSuggestAnswersInstruction = (program: ProgramDataType) => {
    return `
    You are a tool for getting the recommended answers using diagnostic questionnaires like MFQ-Self, DSM-5 (PCL-5), PHQ-9, GAD-7, and C-SSRS. You are designed to provide concise, JSON-formatted recommended answers(individual options) to user's input, focusing exactly on that questionnaire.
    For other inputs, generate fitting answers based on the last input, within 25 characters or less. When user input is vague, you may response the empty array.
    Responses are formatted as: {"answers": ["Individual options"]}, providing an empty array if the user's statement doesn't require a decision or action. 
    Maintain a professional tone, ensuring responses are precise, relevant, and helpful.
`;
};

export const PSYCHOMETRICS: ProgramDataType[] = [
    // Trauma
    {
        numid: 1,
        strid: "trauma",
        name: "Trauma",
        type: "psychometric",
        src: "/avatars/0c1831d3-8b05-49af-a065-2ce390173f36.png",
        url: "/test/trauma",
        description_short:
            "Feeling exhausted, but yet overstimulated? This test will help you better understand if you're going through a state of prolonged stress, aka trauma. \n\n **Take the PTSD - PCL-5 test here.**",
        description_long: ``,
        suggests: [],
        questionnaires: {
            ...ptsdQuestionnaire,
        },
    },
    // Anxiety
    {
        numid: 2,
        strid: "anxiety",
        name: "Anxiety",
        type: "psychometric",
        src: "/avatars/0a33a50b-87de-412f-a84c-4c17d992a41c.png",
        url: "/test/anxiety",
        description_short:
            "Feeling jittery, uneasy and fearful of the future? This test will help you better track your anxiety levels and make sense of your triggers. \n\n **Take the GAD-7 test here.**",
        description_long: ``,
        suggests: [],
        questionnaires: {
            ...anxietyQuestionnaire,
        },
    },
    // Depression
    {
        numid: 3,
        strid: "depression",
        name: "Depression",
        type: "psychometric",
        src: "/avatars/19d3f8df-7e4f-484d-a524-818d4eb2e705.png",
        url: "/test/depression",
        description_short:
            "Is it 'normal' saddness, fatigue and indifference? Or, is it something deeper? This test will help you track the severity of your depression levels. \n\n **Take the PHQ-9 test here.**",
        description_long: ``,
        suggests: [],
        questionnaires: {
            ...depressionQuestionnaire,
        },
    },
    // Mood Tracker
    {
        numid: 0,
        strid: "mood",
        name: "Mood",
        type: "psychometric",
        src: "/avatars/a3072a94-8524-4ea2-b41e-0ed58ebe6aba.png",
        url: "/test/mood",
        description_short:
            "Uncertain of your mood severity? Want to be better able to track your up's and down's?  \n\n **Take the MFQ questionnaire.**",
        description_long: ``,
        suggests: [],
        questionnaires: {
            ...moodAdultShortQuestionnaire,
        },
    },
    // // Suicid
    // {
    //     numid: 4,
    //     strid: "suicidal",
    //     name: "Suicidal Risk Assessment",
    //     type: "psychometric",
    //     src: "/avatars/dffd1f24-a00f-46d8-9403-c5baa7e2a528.png",
    //     url: "/test/suicidal",
    //     description_short:
    //         "Assess, monitor, and manage suicidal risk factors with the Suicidal Risk Assessment. Personalized insights, progress tracking, and valuable resources for improved mental well-being.",
    //     description_long: `
    //     Assess and monitor suicidal risk factors easily. Get personalized insights, track progress, and access resources for better mental well-being. Customize reminders and take control of your safety journey. Empower yourself with this comprehensive tool.
    //     `,
    //     suggests: [],
    //     questionnaires: {
    //         ...suicidalQuestionnaire,
    //     },
    // },
];
