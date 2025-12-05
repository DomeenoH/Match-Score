import React from 'react';
import type { AnalysisResult } from '../lib/ai';

interface AnalysisReportProps {
    result: AnalysisResult;
}

export default function AnalysisReport({ result }: AnalysisReportProps) {
    return (
        <div className="max-w-2xl mx-auto p-8 bg-white border border-gray-200 rounded-xl shadow-lg">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-2">Compatibility Report</h2>
                <div className="flex items-center justify-center gap-4 mt-6">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="64"
                                cy="64"
                                r="60"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                className="text-gray-100"
                            />
                            <circle
                                cx="64"
                                cy="64"
                                r="60"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                strokeDasharray={377}
                                strokeDashoffset={377 - (377 * result.compatibilityScore) / 100}
                                className="text-black transition-all duration-1000 ease-out"
                            />
                        </svg>
                        <span className="absolute text-3xl font-bold">{result.compatibilityScore}%</span>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Summary</h3>
                    <p className="text-gray-700 leading-relaxed">{result.summary}</p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2">Detailed Analysis</h3>
                    <p className="text-gray-600 leading-relaxed">{result.details}</p>
                </div>
            </div>
        </div>
    );
}
