import React, { useState } from 'react';
import { QUESTIONS, type SoulProfile } from '../lib/questions';
import { encodeSoul } from '../lib/codec';

interface QuestionnaireProps {
    onComplete: (hash: string) => void;
}

export default function Questionnaire({ onComplete }: QuestionnaireProps) {
    // Initialize answers with 0 (unanswered)
    const [answers, setAnswers] = useState<number[]>(new Array(QUESTIONS.length).fill(0));
    const [error, setError] = useState<string | null>(null);

    const handleOptionSelect = (questionIndex: number, value: number) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = value;
        setAnswers(newAnswers);
        if (error) setError(null); // Clear error on interaction
    };

    const handleSubmit = () => {
        // Check if all questions are answered
        if (answers.some(a => a === 0)) {
            setError("请回答所有问题后再提交。");
            return;
        }

        const profile: Omit<SoulProfile, 'timestamp'> = {
            version: 1,
            answers: answers,
        };

        const hash = encodeSoul(profile);
        onComplete(hash);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">灵魂契合度测试</h2>

            <div className="space-y-8">
                {QUESTIONS.map((question, index) => (
                    <div key={question.id} className="border-b border-gray-100 pb-6 last:border-0">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                            {index + 1}. {question.text}
                        </h3>
                        <div className="space-y-2">
                            {question.options.map((option) => (
                                <label
                                    key={option.value}
                                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${answers[index] === option.value
                                            ? 'bg-black text-white border-black'
                                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name={`question-${question.id}`}
                                        value={option.value}
                                        checked={answers[index] === option.value}
                                        onChange={() => handleOptionSelect(index, option.value)}
                                        className="hidden"
                                    />
                                    <span className="flex-1">{option.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {error && (
                <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-md text-center">
                    {error}
                </div>
            )}

            <div className="mt-8">
                <button
                    onClick={handleSubmit}
                    className="w-full py-4 px-6 bg-black text-white font-bold text-lg rounded-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                    生成我的灵魂哈希 (Soul Hash)
                </button>
            </div>
        </div>
    );
}
