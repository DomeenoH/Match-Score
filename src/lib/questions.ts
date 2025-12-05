export type Dimension = 'lifestyle' | 'finance' | 'communication' | 'values';

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

export const QUESTIONS: Question[] = [
    // --- Layer 1: Lifestyle & Hard Filters (生活习惯与硬指标)
    {
        id: 1,
        text: "你对室内整洁度的要求是什么？",
        dimension: 'lifestyle',
        options: [
            { value: 1, label: "随性" },
            { value: 2, label: "较随性" },
            { value: 3, label: "普通" },
            { value: 4, label: "较整洁" },
            { value: 5, label: "洁癖" }
        ]
    },
    {
        id: 2,
        text: "你对伴侣的作息时间（熬夜/早起）的接受程度？",
        dimension: 'lifestyle',
        options: [
            { value: 1, label: "必须同步" },
            { value: 2, label: "尽量同步" },
            { value: 3, label: "看情况" },
            { value: 4, label: "不太介意" },
            { value: 5, label: "完全不干涉" }
        ]
    },
    {
        id: 3,
        text: "你认为养宠物或吸烟对亲密关系的影响？",
        dimension: 'lifestyle',
        options: [
            { value: 1, label: "完全不能接受" },
            { value: 2, label: "很难接受" },
            { value: 3, label: "中立" },
            { value: 4, label: "可以接受" },
            { value: 5, label: "无所谓" }
        ]
    },

    // --- Layer 2: Finance & Communication (金钱观与沟通模式)
    {
        id: 4,
        text: "在共同消费中，你倾向于AA制还是混合记账？",
        dimension: 'finance',
        options: [
            { value: 1, label: "严格AA" },
            { value: 2, label: "大额AA" },
            { value: 3, label: "轮流付" },
            { value: 4, label: "大部分共享" },
            { value: 5, label: "完全不分你我" }
        ]
    },
    {
        id: 5,
        text: "遇到分歧时，你倾向于立即解决还是需要冷静期？",
        dimension: 'communication',
        options: [
            { value: 1, label: "必须马上沟通" },
            { value: 2, label: "倾向当天解决" },
            { value: 3, label: "看情况" },
            { value: 4, label: "倾向冷静后再谈" },
            { value: 5, label: "回避并冷静处理" }
        ]
    },
    {
        id: 6,
        text: "你对伴侣的朋友圈子和社交活动参与的意愿？",
        dimension: 'communication',
        options: [
            { value: 1, label: "希望完全融入" },
            { value: 2, label: "希望能经常参与" },
            { value: 3, label: "偶尔参与" },
            { value: 4, label: "很少参与" },
            { value: 5, label: "互不打扰" }
        ]
    },
    {
        id: 7,
        text: "你对伴侣的消费习惯的容忍度？",
        dimension: 'finance',
        options: [
            { value: 1, label: "必须节俭" },
            { value: 2, label: "倾向节俭" },
            { value: 3, label: "适度消费" },
            { value: 4, label: "倾向享受" },
            { value: 5, label: "享受当下" }
        ]
    },

    // --- Layer 3: Core Values (深层价值观)
    {
        id: 8,
        text: "在个人发展和家庭责任之间，你的首要权重？",
        dimension: 'values',
        options: [
            { value: 1, label: "优先家庭" },
            { value: 2, label: "倾向家庭" },
            { value: 3, label: "平衡" },
            { value: 4, label: "倾向事业" },
            { value: 5, label: "优先个人事业" }
        ]
    },
    {
        id: 9,
        text: "你对人生的重大风险（如投资/换城市）的看法？",
        dimension: 'values',
        options: [
            { value: 1, label: "保守稳定" },
            { value: 2, label: "倾向保守" },
            { value: 3, label: "中庸" },
            { value: 4, label: "倾向冒险" },
            { value: 5, label: "冒险激进" }
        ]
    },
    {
        id: 10,
        text: "你对承诺的看法，例如：迟到或失约的严重程度？",
        dimension: 'values',
        options: [
            { value: 1, label: "非常看重" },
            { value: 2, label: "比较看重" },
            { value: 3, label: "一般" },
            { value: 4, label: "比较包容" },
            { value: 5, label: "理解弹性" }
        ]
    },
    {
        id: 11,
        text: "在你的生活中，情感需求和理性分析哪个更重要？",
        dimension: 'values',
        options: [
            { value: 1, label: "情感驱动" },
            { value: 2, label: "倾向情感" },
            { value: 3, label: "平衡" },
            { value: 4, label: "倾向理性" },
            { value: 5, label: "理性主导" }
        ]
    },
    {
        id: 12,
        text: "你认为对错判断是否应该有绝对的标准？",
        dimension: 'values',
        options: [
            { value: 1, label: "有绝对标准" },
            { value: 2, label: "倾向有标准" },
            { value: 3, label: "看情境" },
            { value: 4, label: "倾向相对" },
            { value: 5, label: "相对主义" }
        ]
    },
];
