import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';
import { type SoulProfile } from './questions';

// 编码：将用户的 SoulProfile 对象转化为紧凑的 URL-safe 字符串
export const encodeSoul = (profile: Omit<SoulProfile, 'timestamp'>): string => {
    // 1. 确保在编码前加上时间戳 (Unix Epoch)
    const profileWithTimestamp: SoulProfile = {
        ...profile,
        timestamp: Date.now(),
    };
    const jsonString = JSON.stringify(profileWithTimestamp);
    // 2. 压缩并转码
    return compressToEncodedURIComponent(jsonString);
};

// 解码：将 Soul Hash 字符串还原为 SoulProfile 对象
export const decodeSoul = (hash: string): SoulProfile | null => {
    // 1. 解码并解压
    const jsonString = decompressFromEncodedURIComponent(hash);
    if (!jsonString) return null;

    try {
        // 2. 尝试解析 JSON
        const profile = JSON.parse(jsonString);
        // 3. 增加基础验证 (如版本号和答案数组)
        if (typeof profile.version === 'number' && Array.isArray(profile.answers)) {
            return profile as SoulProfile;
        }
        return null; // 验证失败
    } catch (e) {
        console.error("Decoding error:", e);
        return null;
    }
};

// 新增：用于在匹配页面计算基础欧几里得距离的函数
export const calculateDistance = (profileA: SoulProfile, profileB: SoulProfile): number => {
    // 仅比较 answers 数组
    const answersA = profileA.answers;
    const answersB = profileB.answers;

    // 假设答案数组长度一致
    let squaredDifferenceSum = 0;
    for (let i = 0; i < answersA.length; i++) {
        // 计算 (A[i] - B[i])^2，并求和
        squaredDifferenceSum += Math.pow(answersA[i] - answersB[i], 2);
    }

    // 欧几里得距离的倒数作为初步匹配度 (距离越近，匹配度越高)
    // 这是一个初步的 Vibe Score，AI会基于此做更复杂的分析
    const distance = Math.sqrt(squaredDifferenceSum);
    // 归一化到一个 0-100 的分数 (需要根据最大可能距离调整，这里先用简化版)
    // 最大距离：12道题，每题最大差值4 (5-1)。sqrt(12 * 4^2) = sqrt(12 * 16) = sqrt(192) ≈ 13.85
    const maxPossibleDistance = Math.sqrt(answersA.length * Math.pow(5 - 1, 2));
    const matchScore = 100 - (distance / maxPossibleDistance) * 100;

    return Math.max(0, parseFloat(matchScore.toFixed(1))); // 确保分数在 0-100
};
