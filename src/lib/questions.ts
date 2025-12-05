export type Dimension = 'intimacy' | 'finance' | 'lifestyle' | 'communication';

export interface Question {
    id: number;
    text: string;
    dimension: Dimension;
    options: {
        value: number;
        label: string;
    }[];
}

export interface SoulProfile {
    version: number;
    name?: string;
    answers: number[]; // 1-5 scale
    timestamp: number;
}

export const questions: Question[] = [
    {
        id: 1,
        text: "I prefer a quiet evening at home over a night out.",
        dimension: 'lifestyle',
        options: [
            { value: 1, label: "Strongly Disagree" },
            { value: 2, label: "Disagree" },
            { value: 3, label: "Neutral" },
            { value: 4, label: "Agree" },
            { value: 5, label: "Strongly Agree" },
        ],
    },
    {
        id: 2,
        text: "It is important to save money for the future even if it means sacrificing current enjoyment.",
        dimension: 'finance',
        options: [
            { value: 1, label: "Strongly Disagree" },
            { value: 2, label: "Disagree" },
            { value: 3, label: "Neutral" },
            { value: 4, label: "Agree" },
            { value: 5, label: "Strongly Agree" },
        ],
    },
    {
        id: 3,
        text: "I am comfortable sharing my deepest feelings with my partner.",
        dimension: 'intimacy',
        options: [
            { value: 1, label: "Strongly Disagree" },
            { value: 2, label: "Disagree" },
            { value: 3, label: "Neutral" },
            { value: 4, label: "Agree" },
            { value: 5, label: "Strongly Agree" },
        ],
    },
    {
        id: 4,
        text: "I believe in resolving conflicts immediately rather than letting them cool down.",
        dimension: 'communication',
        options: [
            { value: 1, label: "Strongly Disagree" },
            { value: 2, label: "Disagree" },
            { value: 3, label: "Neutral" },
            { value: 4, label: "Agree" },
            { value: 5, label: "Strongly Agree" },
        ],
    },
    {
        id: 5,
        text: "I enjoy trying new things and taking risks.",
        dimension: 'lifestyle',
        options: [
            { value: 1, label: "Strongly Disagree" },
            { value: 2, label: "Disagree" },
            { value: 3, label: "Neutral" },
            { value: 4, label: "Agree" },
            { value: 5, label: "Strongly Agree" },
        ],
    },
];
