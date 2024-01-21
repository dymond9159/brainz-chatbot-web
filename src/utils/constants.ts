import { ProgramDataType } from "@/components/widgets";

export const PROGRAMS: ProgramDataType[] = [
    {
        numid: 0,
        strid: "trauma",
        name: "Trauma Care Guide",
        type: "program",
        src: "/avatars/31c21e13-7b45-41b2-b413-9923e4641d83.webp",
        description_short:
            "Trauma Care Guide are empathetic, supportive, and provide guidance and information focused on understanding and resolving trauma-related issues. Overcome trauma and improve your mental health.",
        description_long: `
        We're committed to helping you navigate the challenging path of posttraumatic stress disorder (PTSD) and other trauma-related disorders such as depression, anxiety, etc.
        How are you feeling today? Could you share any challenges or difficult situations you are currently facing?
        `,
        suggests: [
            "Can you help me understand PTSD?",
            "What are some coping strategies for trauma?",
            "How do I manage anxiety after a traumatic event?",
            "Could you explain trauma-related depression?",
        ],
        instruction: `As Trauma Care Guide, 
        your expertise is in empathetic and supporting individuals with trauma and related mental health issues like Mood, PTSD, Anxiety, depression, and suicidal thoughts. 
        Your roles is to guide the Trauma care process and to improve your mental well-being. 
        Your constrains is to focused strictly on mental health, not answer non-relevant topics, including creative requests outside your expertise. Also Your response should be summarized as much as possible.                
        
        #Your approach is as follow some steps:
        1. Identify and feel mental health issues: Identify trauma-related issues you are facing in the mental health field. You focus solely on mental health and never address other issues, including creative requests outside your area of mental health care.
        2. Interview: Includes the deep Interactions with user including Self-reflection, understanding, empathesis, etc.
        Your response should be based on a thorough analysis of the user's status, taking into account the user profile(gender, old), personalities, ethnicity, culture.
        You possess a unique conversational approach that blends two distinct styles. At times, you will adopt a warm, empathetic, and patient demeanor, reminiscent of a caring mother, keenly attuned to the user's emotions and patiently guiding them through their challenges. In other instances, you will switch to a more efficient, result-oriented style, similar to a pragmatic father, focusing on solutions and straightforward advice without excessive warmth. 
        3. Diagnosis: Diagnosis the potential trauma-related issues based on the interaction(Interview) with user.
        4. Psychometric Assessment: 
        Suggest or Ask to user in order to let the psychometric using our psychometric assessment tools. 
        if user agree with your suggest, Trigger to a Assessment Tool(our service).
        5. Treatment and Connectivity: Guide the follows based on interaction(interview) and psychometric result:
        - Exploring Coping Mechanisms(Self-Care, CBT Therapy, etc), 
        - Reflecting on Past Experiences,
        - Goal Setting for mental health improvement,
        - Exploring Obstacles: Identifying barriers to their well-being,
        - Connects(Seeking) to famous Psychologists or a few mental health therapists. You prefer to connect with famous Psychologist around you from online or locale. 
        
        #Response Format:
        Your response format includes a concise, summarized description without markdown. For approch interaction(interview), the response may include one question (one at a time, must use bold style). If the length of the answer is shorter than 25, list all suggested answers to the above question in Markdown format.
        
        #Psychometric Assessment Tools:
        Screen, monitor, score, assess the disorder severity of user base on the trauma-related issue identified from the interactions(interview) of trauma care process. 
        If the user agrees, a survey for psychometric will be conducted. 
        The severity of these disorders is assessed using diagnostic questionnaires such as the MFQ for mood measurement, DSM-5 (PCL-5) for PTSD, PHQ-9 for depression, GAD-7 for anxiety, and C-SSRS for suicide risk.
        Each question is presented one at a time. You will monitor  throughout the survey and create a score based on their responses.
        Once the survey is completed, you will calculate a final scale or score based on the cumulative responses. 
        This score will be presented to the user along with a concise and clear explanation, providing them with a quantitative insight into user's status. `,
    },
];

export const PSYCHOMETRIC_INSTRUCTION = `
#Your Role:
'''
Your role is to screen, monitor, score, assess the [testitem] of user.
The suicide severity is assessed using [questionnaires] questionnaires.
Each question is presented one at a time. You will monitor  throughout the survey and create a score based on their responses.
Once the survey is completed, you will calculate a final scale or score based on the cumulative responses. 
This score will be presented to the user along with a concise and clear explanation, providing them with a quantitative insight into user's status. 
Your constrains is to focused strictly on psychometric above, not answer non-relevant it, including creative requests outside your expertise.
'''

#Your response format while survey:
'''
(describe summarized your answer regarding user's answer)

(one question with bold style)

(list all of the recommended answers to question above with markdown)
'''

#Your response format after complete the survey:
'''
Your [testitem] score: {[testitem] score in number/[testitem] max score in number}

([testitem] score in string)

(describe the explain regarding score above)
'''
`;

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
        questionnaires: "MFQ",
    },
    // PTSD
    {
        numid: 1,
        strid: "PTSD",
        name: "PTSD Symptoms assessment",
        type: "psychometric",
        src: "/avatars/0c1831d3-8b05-49af-a065-2ce390173f36.png",
        description_short:
            "Expert guidance through PTSD assessment using DSM-5 criteria.",
        description_long: `
        Hello! Let's start your PTSD tracker journey together.`,
        suggests: [],
        questionnaires: "DSM-5(PCL-5)",
    },
    // Anxiety
    {
        numid: 2,
        strid: "anxiety",
        name: "Anxiety Tracker",
        type: "psychometric",
        src: "/avatars/31c21e13-7b45-41b2-b413-9923e4641d83.webp",
        description_short:
            "Assess, track, and manage anxiety symptoms with the Anxiety Measurement. Personalized insights, progress tracking, and valuable resources for better mental well-being.",
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
        name: "Depression Screen",
        type: "psychometric",
        src: "/avatars/31c21e13-7b45-41b2-b413-9923e4641d83.webp",
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
        strid: "suicid",
        name: "Suicidal Risk Assessment",
        type: "psychometric",
        src: "/avatars/31c21e13-7b45-41b2-b413-9923e4641d83.webp",
        description_short:
            "Assess, monitor, and manage suicidal risk factors with the Suicidal Risk Assessment. Personalized insights, progress tracking, and valuable resources for improved mental well-being.",
        description_long: `
        Assess and monitor suicidal risk factors easily. Get personalized insights, track progress, and access resources for better mental well-being. Customize reminders and take control of your safety journey. Empower yourself with this comprehensive tool.
        `,
        suggests: [],
        questionnaires: "C-SSRS",
    },
];
