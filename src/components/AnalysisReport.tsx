import React from 'react';
import type { AnalysisResult } from '../lib/ai';

interface AnalysisReportProps {
    result: AnalysisResult;
    hostInfo?: string;
    guestInfo?: string;
}

export default function AnalysisReport({ result, hostInfo, guestInfo }: AnalysisReportProps) {
    // Parse the AI response which is expected to follow a specific structure
    const parseSection = (text: string, title: string, nextTitle?: string) => {
        const startIndex = text.indexOf(title);
        if (startIndex === -1) return null;

        let content = "";
        if (nextTitle) {
            const endIndex = text.indexOf(nextTitle);
            if (endIndex !== -1) {
                content = text.substring(startIndex + title.length, endIndex).trim();
            } else {
                // Try to find the next section by number if specific title fails
                // But for now, let's assume the AI follows the prompt structure
                content = text.substring(startIndex + title.length).trim();
            }
        } else {
            content = text.substring(startIndex + title.length).trim();
        }

        // Clean up leading colons, newlines, or parentheses
        return content.replace(/^[:：\n\(\)（）]+/, '').trim();
    };

    const rawText = result.details;

    // Parsing logic based on the prompt structure
    const conclusion = parseSection(rawText, "1. 核心结论", "2. 关键优势分析") || "暂无结论";
    const strengths = parseSection(rawText, "2. 关键优势分析", "3. 潜在雷区预警");
    const conflicts = parseSection(rawText, "3. 潜在雷区预警", "4. 长期相处建议");
    const advice = parseSection(rawText, "4. 长期相处建议");

    // Helper to render bullet points
    const renderList = (text: string | null) => {
        if (!text) return <p className="text-gray-500 italic">暂无显著数据</p>;
        return (
            <ul className="space-y-3">
                {text.split('\n').map((line, i) => {
                    const cleanLine = line.trim();
                    if (!cleanLine || cleanLine.startsWith('---')) return null;
                    return (
                        <li key={i} className="flex items-start">
                            <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-current opacity-60"></span>
                            <span className="text-sm leading-relaxed">{cleanLine.replace(/^- /, '').replace(/^\d+\. /, '')}</span>
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <div className="max-w-4xl mx-auto p-6 sm:p-10 bg-white border border-gray-200 rounded-2xl shadow-xl">
            {/* Header Info */}
            <div className="flex justify-between items-center mb-8 text-xs font-mono text-gray-400 border-b border-gray-100 pb-4">
                <div>发起者(A): {hostInfo || 'Unknown'}</div>
                <div>匹配者(B): {guestInfo || 'Unknown'}</div>
            </div>

            <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">灵魂契合度分析报告</h2>
                <p className="text-gray-500 text-sm">基于 50 维度深度比对算法</p>

                <div className="flex items-center justify-center gap-4 mt-8 relative">
                    <div className="relative w-40 h-40 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="80"
                                cy="80"
                                r="70"
                                stroke="#f3f4f6"
                                strokeWidth="12"
                                fill="transparent"
                            />
                            <circle
                                cx="80"
                                cy="80"
                                r="70"
                                stroke="currentColor"
                                strokeWidth="12"
                                fill="transparent"
                                strokeDasharray={440}
                                strokeDashoffset={440 - (440 * result.compatibilityScore) / 100}
                                className="text-black transition-all duration-1000 ease-out"
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                            <span className="text-4xl font-black tracking-tighter">{result.compatibilityScore}%</span>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Match</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                {/* Core Conclusion */}
                <div className="bg-gray-900 text-white p-8 rounded-xl shadow-lg transform hover:scale-[1.01] transition-transform">
                    <h3 className="text-lg font-bold mb-3 flex items-center">
                        <span className="mr-2">💡</span> 核心结论
                    </h3>
                    <p className="text-lg leading-relaxed font-medium opacity-90">
                        {conclusion}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Strengths */}
                    <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                        <h3 className="text-green-800 font-bold mb-4 flex items-center">
                            <span className="bg-green-200 text-green-800 p-1 rounded mr-2 text-xs">MATCH</span>
                            关键优势
                        </h3>
                        <div className="text-green-900">
                            {renderList(strengths)}
                        </div>
                    </div>

                    {/* Conflicts */}
                    <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                        <h3 className="text-red-800 font-bold mb-4 flex items-center">
                            <span className="bg-red-200 text-red-800 p-1 rounded mr-2 text-xs">CONFLICT</span>
                            潜在雷区
                        </h3>
                        <div className="text-red-900">
                            {renderList(conflicts)}
                        </div>
                    </div>
                </div>

                {/* Advice */}
                <div className="bg-blue-50 p-8 rounded-xl border border-blue-100">
                    <h3 className="text-blue-900 font-bold mb-4">🔮 长期相处建议</h3>
                    <div className="text-blue-800 leading-relaxed">
                        {renderList(advice)}
                    </div>
                </div>
            </div>

            <div className="mt-12 text-center">
                <button
                    onClick={() => window.location.href = '/'}
                    className="px-8 py-3 bg-white border-2 border-black text-black font-bold rounded-lg hover:bg-gray-50 transition-colors"
                >
                    返回首页
                </button>
            </div>
        </div>
    );
}
