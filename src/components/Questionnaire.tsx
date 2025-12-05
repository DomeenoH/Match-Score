import React, { useState, useMemo } from 'react';
import { QUESTIONS, type SoulProfile, type Dimension } from '../lib/questions';
import { encodeSoul } from '../lib/codec';

interface QuestionnaireProps {
    onComplete: (hash: string) => void;
}

export default function Questionnaire({ onComplete }: QuestionnaireProps) {
    // Initialize answers with 0 (unanswered)
    const [answers, setAnswers] = useState<number[]>(new Array(QUESTIONS.length).fill(0));
    const [error, setError] = useState<string | null>(null);

    // Group questions by dimension
    const groupedQuestions = useMemo(() => {
        const groups: Record<Dimension, typeof QUESTIONS> = {
            lifestyle: [],
            finance: [],
            communication: [],
            values: []
        };
        QUESTIONS.forEach(q => {
            if (groups[q.dimension]) {
                groups[q.dimension].push(q);
            }
        });
        return groups;
    }, []);

    const dimensionTitles: Record<Dimension, string> = {
        lifestyle: "生活习惯 (Lifestyle)",
        finance: "金钱观 (Finance)",
        communication: "沟通模式 (Communication)",
        values: "核心价值观 (Values)"
    };

    const handleOptionSelect = (questionId: number, value: number) => {
        // Find index by ID to ensure correct position in array
        const index = QUESTIONS.findIndex(q => q.id === questionId);
        if (index === -1) return;

        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
        if (error) setError(null); // Clear error on interaction
    };

    const handleSubmit = () => {
        // Check if all questions are answered
        if (answers.length !== 50 || answers.some(a => a === 0)) {
            const unansweredCount = answers.filter(a => a === 0).length;
            setError(`还有 ${unansweredCount} 道题未完成，请回答所有 50 道问题后再提交。`);
            return;
        }

        const profile: Omit<SoulProfile, 'timestamp'> = {
            version: 1,
            answers: answers,
        };

        const hash = encodeSoul(profile);
        onComplete(hash);
    };

    const progress = Math.round((answers.filter(a => a !== 0).length / QUESTIONS.length) * 100);

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="sticky top-0 bg-white z-10 pb-4 border-b border-gray-100 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">灵魂契合度测试 (50题完整版)</h2>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-black h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="text-xs text-gray-500 text-center mt-1">完成度: {progress}%</p>
            </div>

            <div className="space-y-12">
                {(Object.keys(groupedQuestions) as Dimension[]).map((dim) => (
                    <div key={dim} className="space-y-6">
                        <div className="flex items-center">
                            <h3 className="text-xl font-bold text-gray-900 bg-gray-50 px-4 py-2 rounded-md w-full border-l-4 border-black">
                                {dimensionTitles[dim]}
                            </h3>
                        </div>

                        <div className="space-y-8 pl-2">
                            {groupedQuestions[dim].map((question, qIndex) => {
                                // Find the global index for this question to access answers array correctly
                                const globalIndex = QUESTIONS.findIndex(q => q.id === question.id);

                                return (
                                    <div key={question.id} className="border-b border-gray-100 pb-6 last:border-0">
                                        <h4 className="text-lg font-medium text-gray-900 mb-4">
                                            <span className="text-gray-400 mr-2">#{question.id}</span>
                                            {question.text}
                                        </h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                                            {question.options.map((option) => (
                                                <label
                                                    key={option.value}
                                                    className={`flex flex-col items-center justify-center p-3 rounded-lg border cursor-pointer transition-all text-center h-full ${answers[globalIndex] === option.value
                                                            ? 'bg-black text-white border-black shadow-md transform scale-105'
                                                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                                                        }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name={`question-${question.id}`}
                                                        value={option.value}
                                                        checked={answers[globalIndex] === option.value}
                                                        onChange={() => handleOptionSelect(question.id, option.value)}
                                                        className="hidden"
                                                    />
                                                    <span className="text-sm font-medium">{option.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {error && (
                <div className="mt-8 p-4 bg-red-50 text-red-700 rounded-md text-center font-medium border border-red-100">
                    {error}
                </div>
            )}

            <div className="mt-10">
                <button
                    onClick={handleSubmit}
                    className="w-full py-4 px-6 bg-black text-white font-bold text-lg rounded-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-4 focus:ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={progress < 100}
                >
                    {progress < 100 ? `还需回答 ${50 - answers.filter(a => a !== 0).length} 道题` : "生成我的灵魂哈希 (Soul Hash)"}
                </button>
            </div>
        </div>
    );
}
