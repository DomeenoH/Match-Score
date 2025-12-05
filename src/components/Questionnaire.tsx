import React, { useState, useMemo } from 'react';
import { QUESTIONS, type SoulProfile, type Dimension, DIMENSION_DETAILS } from '../lib/questions';
import { encodeSoul } from '../lib/codec';

interface QuestionnaireProps {
    onComplete: (hash: string) => void;
}

const DIMENSION_ORDER: Dimension[] = ['lifestyle', 'finance', 'communication', 'values'];

export default function Questionnaire({ onComplete }: QuestionnaireProps) {
    const [answers, setAnswers] = useState<number[]>(new Array(QUESTIONS.length).fill(0));
    const [currentDimIndex, setCurrentDimIndex] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const currentDimension = DIMENSION_ORDER[currentDimIndex];
    const currentQuestions = useMemo(() =>
        QUESTIONS.filter(q => q.dimension === currentDimension),
        [currentDimension]
    );

    const handleOptionSelect = (questionId: number, value: number) => {
        const index = QUESTIONS.findIndex(q => q.id === questionId);
        if (index === -1) return;

        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
        if (error) setError(null);
    };

    const validateCurrentStep = () => {
        const unansweredInStep = currentQuestions.filter(q => {
            const index = QUESTIONS.findIndex(globalQ => globalQ.id === q.id);
            return answers[index] === 0;
        });

        if (unansweredInStep.length > 0) {
            setError(`本页还有 ${unansweredInStep.length} 道题未完成，请回答所有问题后再继续。`);
            return false;
        }
        return true;
    };

    const handleNext = () => {
        if (validateCurrentStep()) {
            setCurrentDimIndex(prev => prev + 1);
            window.scrollTo(0, 0);
        }
    };

    const handlePrev = () => {
        setCurrentDimIndex(prev => prev - 1);
        window.scrollTo(0, 0);
    };

    const handleSubmit = () => {
        if (validateCurrentStep()) {
            const profile: Omit<SoulProfile, 'timestamp'> = {
                version: 1,
                answers: answers,
            };
            const hash = encodeSoul(profile);
            onComplete(hash);
        }
    };

    const progress = Math.round((answers.filter(a => a !== 0).length / QUESTIONS.length) * 100);

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            {/* Progress Header */}
            <div className="sticky top-0 bg-white z-10 pb-4 border-b border-gray-100 mb-6">
                <div className="flex justify-between items-end mb-2">
                    <h2 className="text-xl font-bold text-gray-900">灵魂契合度测试</h2>
                    <span className="text-sm font-mono text-gray-500">{progress}% 完成</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                        className="bg-black h-2 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            {/* Section Header */}
            <div className="mb-8 bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {DIMENSION_DETAILS[currentDimension].title}
                </h3>
                <p className="text-gray-600">
                    {DIMENSION_DETAILS[currentDimension].description}
                </p>
            </div>

            {/* Questions List */}
            <div className="space-y-10">
                {currentQuestions.map((question) => {
                    const globalIndex = QUESTIONS.findIndex(q => q.id === question.id);
                    return (
                        <div key={question.id} className="border-b border-gray-50 pb-8 last:border-0 last:pb-0">
                            <h4 className="text-lg font-medium text-gray-900 mb-4 leading-relaxed">
                                <span className="text-gray-300 font-mono mr-3 text-sm">#{question.id}</span>
                                {question.text}
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                                {question.options.map((option) => (
                                    <label
                                        key={option.value}
                                        className={`
                                            relative flex flex-col items-center justify-center p-4 rounded-xl border cursor-pointer transition-all duration-200 text-center h-full
                                            ${answers[globalIndex] === option.value
                                                ? 'bg-black text-white border-black shadow-lg transform scale-[1.02]'
                                                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                                            }
                                        `}
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

            {/* Error Message */}
            {error && (
                <div className="mt-8 p-4 bg-red-50 text-red-700 rounded-lg text-center font-medium border border-red-100 animate-pulse">
                    ⚠️ {error}
                </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-12 flex justify-between gap-4 pt-6 border-t border-gray-100">
                <button
                    onClick={handlePrev}
                    disabled={currentDimIndex === 0}
                    className={`
                        px-8 py-3 rounded-lg font-medium transition-colors
                        ${currentDimIndex === 0
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }
                    `}
                >
                    上一步
                </button>

                {currentDimIndex < DIMENSION_ORDER.length - 1 ? (
                    <button
                        onClick={handleNext}
                        className="px-8 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-all shadow-md hover:shadow-lg flex-1 sm:flex-none"
                    >
                        下一步
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        className="px-8 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-all shadow-md hover:shadow-lg flex-1 sm:flex-none"
                    >
                        生成我的灵魂哈希
                    </button>
                )}
            </div>
        </div>
    );
}
