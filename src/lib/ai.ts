import { type SoulProfile, QUESTIONS } from './questions';
import { calculateDistance } from './codec';

// 新增接口：用于封装发给 LLM 的数据结构
export interface ComparisonPoint {
    id: number;
    dimension: string;
    question: string;
    A_answer: number;
    B_answer: number;
    A_label: string; // A的答案标签
    B_label: string; // B的答案标签
    difference: number; // 绝对差值 (0-4)
}

export interface AIContext {
    hostProfile: SoulProfile;
    guestProfile: SoulProfile;
    matchScore: number;
    comparisonMatrix: ComparisonPoint[];
}

export interface AnalysisResult {
    compatibilityScore: number;
    summary: string;
    details: string;
}

/**
 * 将两个 SoulProfile 转化为 LLM 需要的结构化对比数据
 */
export const generateAIContext = (hostProfile: SoulProfile, guestProfile: SoulProfile): AIContext => {
    // 1. 计算基础分数
    const matchScore = calculateDistance(hostProfile, guestProfile);

    // 2. 遍历 50 题，生成对比矩阵
    const comparisonMatrix: ComparisonPoint[] = QUESTIONS.map((q, index) => {
        const A_answer = hostProfile.answers[index];
        const B_answer = guestProfile.answers[index];
        const A_option = q.options.find(opt => opt.value === A_answer);
        const B_option = q.options.find(opt => opt.value === B_answer);

        return {
            id: q.id,
            dimension: q.dimension,
            question: q.text,
            A_answer: A_answer,
            B_answer: B_answer,
            A_label: A_option?.label || 'N/A',
            B_label: B_option?.label || 'N/A',
            difference: Math.abs(A_answer - B_answer),
        };
    });

    return {
        hostProfile,
        guestProfile,
        matchScore,
        comparisonMatrix,
    };
};

export const createAIPrompt = (context: AIContext): string => {
    const { matchScore, comparisonMatrix } = context;

    // 找出匹配点和冲突点
    const strengths = comparisonMatrix.filter(c => c.difference <= 1); // 差异度 <= 1 为优势
    const conflicts = comparisonMatrix.filter(c => c.difference >= 3); // 差异度 >= 3 为高冲突

    // 构建核心 Prompt
    let prompt = `你是一位顶尖的、以数据驱动的“关系社会学家”。你的任务是根据两个人的50个维度问卷结果，生成一份客观、犀利、结构化的相性分析报告。两人基础匹配度为 ${matchScore}%。请从三个维度（优势、雷区、长期建议）分析，并使用中文分点作答。`;

    // 优势分析
    prompt += "\n\n--- 优势维度（Difference <= 1）：两人天然契合点 ---";
    // 仅列出前 5 个最匹配的题目和结果
    strengths.slice(0, 5).forEach(c => {
        prompt += `\n- [${c.dimension}]: Q.${c.id} (${c.question}) 两人答案几乎一致，A: ${c.A_label}, B: ${c.B_label}。`;
    });

    // 冲突分析
    prompt += "\n\n--- 核心雷区（Difference >= 3）：未来潜在的冲突爆发点 ---";
    // 仅列出前 5 个差异最大的题目和结果
    conflicts.slice(0, 5).forEach(c => {
        prompt += `\n- [${c.dimension}]: Q.${c.id} (${c.question}) 差异巨大 (A:${c.A_label} vs B:${c.B_label})。这是硬性矛盾，需要深入关注。`;
    });

    // 维度总结
    prompt += "\n\n--- 维度总结 ---";
    // 提示 AI 根据四个维度（lifestyle, finance, communication, values）的差异度，给出概括性评价。

    prompt += "\n\n请根据上述数据和风格要求，生成报告的最终内容，报告应包含以下结构：\n";
    prompt += "1. 核心结论（一句话总结，直指本质）\n";
    prompt += "2. 关键优势分析（列点阐述）\n";
    prompt += "3. 潜在雷区预警（列点阐述，语言要犀利）\n";
    prompt += "4. 长期相处建议（给出可操作的策略）\n";

    return prompt;
};

export const fetchAIAnalysis = async (profileA: SoulProfile, profileB: SoulProfile): Promise<AnalysisResult> => {
    // 1. Generate Context
    const context = generateAIContext(profileA, profileB);

    // 2. Create Prompt
    const prompt = createAIPrompt(context);

    try {
        const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            throw new Error('AI Analysis request failed');
        }

        const data = await response.json();

        return {
            compatibilityScore: context.matchScore,
            summary: `基于数据的灵魂契合度：${context.matchScore}%`,
            details: data.reportText
        };
    } catch (error) {
        console.error("AI Analysis Error:", error);
        // Fallback to mock response if API fails
        return {
            compatibilityScore: context.matchScore,
            summary: `基于数据的灵魂契合度：${context.matchScore}% (离线模式)`,
            details: `[系统提示：AI 服务暂时不可用，以下是基于原始数据的分析预览]\n\n${prompt}`
        };
    }
};
