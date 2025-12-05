import type { SoulProfile } from './questions';

export interface AnalysisResult {
    compatibilityScore: number;
    summary: string;
    details: string;
}

export const fetchAIAnalysis = async (profileA: SoulProfile, profileB: SoulProfile): Promise<AnalysisResult> => {
    // Mock implementation for now
    // In a real app, this would call an LLM API

    // Simple distance calculation for score
    let totalDiff = 0;
    const maxDiff = profileA.answers.length * 4; // Max difference per question is 4 (5-1)

    for (let i = 0; i < profileA.answers.length; i++) {
        const valA = profileA.answers[i] || 3;
        const valB = profileB.answers[i] || 3;
        totalDiff += Math.abs(valA - valB);
    }

    const similarity = 1 - (totalDiff / maxDiff);
    const score = Math.round(similarity * 100);

    return {
        compatibilityScore: score,
        summary: `You have a compatibility score of ${score}%.`,
        details: "This is a mock analysis based on simple mathematical distance. Connect an LLM to get real insights!",
    };
};
