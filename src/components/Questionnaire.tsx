import React, { useState } from 'react';
import { questions, type SoulProfile } from '../lib/questions';
import { encodeSoul } from '../lib/codec';

interface QuestionnaireProps {
    onComplete: (hash: string) => void;
}

export default function Questionnaire({ onComplete }: QuestionnaireProps) {
    const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(0));
    const [currentStep, setCurrentStep] = useState(0);

    const handleOptionSelect = (value: number) => {
        const newAnswers = [...answers];
        newAnswers[currentStep] = value;
        setAnswers(newAnswers);

        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            // Finished
            const profile: SoulProfile = {
                version: 1,
                answers: newAnswers,
                timestamp: Date.now(),
            };
            const hash = encodeSoul(profile);
            onComplete(hash);
        }
    };

    const currentQuestion = questions[currentStep];

    return (
        <div className="max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="mb-6">
                <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                    Question {currentStep + 1} of {questions.length}
                </span>
                <h2 className="mt-2 text-xl font-medium text-gray-900">
                    {currentQuestion.text}
                </h2>
            </div>

            <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                    <button
                        key={option.value}
                        onClick={() => handleOptionSelect(option.value)}
                        className="w-full px-4 py-3 text-left text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors"
                    >
                        {option.label}
                    </button>
                ))}
            </div>

            <div className="mt-6 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                    className="h-full bg-black transition-all duration-300 ease-out"
                    style={{ width: `${((currentStep) / questions.length) * 100}%` }}
                />
            </div>
        </div>
    );
}
