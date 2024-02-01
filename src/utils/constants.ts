import { ProgramDataType } from "@/components/widgets";

export const NONE = "NONE_";

export const PROGRAMS: ProgramDataType[] = [
    {
        numid: 0,
        strid: "trauma",
        name: "Trauma Therapist",
        type: "program",
        src: "/avatars/31c21e13-7b45-41b2-b413-9923e4641d83.webp",
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
        instruction: `
        As a Trauma Therapist based on AI, your primary role is focused exactly to empathize, screen, diagnose, assess, and support individuals dealing just only with trauma and related mental health issues such as Mood, PTSD, Anxiety, Depression, and suicidal thoughts. Your goal is to screen, diagnose, and assess trauma-related issues, and then guide the care process based on these results to improve mental well-being. 
        
        - Your approach is identifying and feeling mental health issues, deep interactions with users for self-reflection and understanding, and alternating between a warm, empathetic demeanor and a pragmatic, solution-focused style. 
        - You may ask about the user's gender, age, personality, ethnicity, or culture when needed. 
        - In order to idendity and clarity the issues user is facing now, ask often a question one at a time. Provide the recommended answer options to the question in JSON data format, and each option should be string value.
            '''language-json {
            "options": [answer options]
            }
            '''
        - You'll diagnose potential trauma-related issues based on interactions, and if appropriate, suggest to use a psychometric tools of our services for further assessment. The suggest answer option is: "Yes", "No"

        - Your guidance will involve exploring coping mechanisms, reflecting on past experiences, setting goals for mental health improvement, identifying obstacles to well-being, and connecting users with therapists. 
        
        The response format:
        Your repsonse should be summarized within 250 characters or less and without markdown.

        Must be provide the answer options in JSON data format
`,
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
    // Mood Tracker
    {
        numid: 0,
        strid: "mood",
        name: "Mood Tracker",
        type: "psychometric",
        src: "/avatars/a3072a94-8524-4ea2-b41e-0ed58ebe6aba.png",
        description_short: "Expert in mood tracking with MFQ questionnaire",
        description_long: `
        Welcome to Mood Tracker! How are you feeling today?
        `,
        suggests: [],
        questionnaires: "MFQ-Self",
    },
    // PTSD
    {
        numid: 1,
        strid: "PTSD",
        name: "PTSD Symptoms assessment",
        type: "psychometric",
        src: "/avatars/0c1831d3-8b05-49af-a065-2ce390173f36.png",
        description_short:
            "Expert guidance through PTSD Symptoms assessment using DSM-5 criteria.",
        description_long: `
        Hello! Let's start your PTSD Symptoms assessment journey together.`,
        suggests: [],
        questionnaires: "DSM-5(PCL-5)",
    },
    // Anxiety
    {
        numid: 2,
        strid: "anxiety",
        name: "Anxiety Symptoms",
        type: "psychometric",
        src: "/avatars/0a33a50b-87de-412f-a84c-4c17d992a41c.png",
        description_short:
            "Guides users through anxiety questionnaires, providing scores and insights.",
        description_long: `
        Assess and track anxiety symptoms easily. Get personalized insights, track progress, and access resources for better mental well-being. Customize reminders and take control of your anxiety management journey. Empower yourself with this comprehensive tool.
        `,
        suggests: [],
        questionnaires: "GAD-7",
    },
    // Depression
    {
        numid: 3,
        strid: "depression",
        name: "Depression Symptoms",
        type: "psychometric",
        src: "/avatars/19d3f8df-7e4f-484d-a524-818d4eb2e705.png",
        description_short:
            "Assess, track, and manage depression symptoms with the Depression Measurement. Personalized insights, progress tracking, and valuable resources for improved mental well-being.",
        description_long: `
        Assess and track depression symptoms effortlessly. Get personalized insights, monitor progress, and access resources for improved mental well-being. Customize reminders and take charge of your journey towards better mental health. Empower yourself with this comprehensive tool.
        `,
        suggests: [],
        questionnaires: "PHQ-9",
    },
    // Suicid
    {
        numid: 4,
        strid: "suicide",
        name: "Suicidal Risk Assessment",
        type: "psychometric",
        src: "/avatars/dffd1f24-a00f-46d8-9403-c5baa7e2a528.png",
        description_short:
            "Assess, monitor, and manage suicidal risk factors with the Suicidal Risk Assessment. Personalized insights, progress tracking, and valuable resources for improved mental well-being.",
        description_long: `
        Assess and monitor suicidal risk factors easily. Get personalized insights, track progress, and access resources for better mental well-being. Customize reminders and take control of your safety journey. Empower yourself with this comprehensive tool.
        `,
        suggests: [],
        questionnaires: "C-SSRS", //  C-SSRS or SBQ-R
    },
];
