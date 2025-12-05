import React, { useState } from 'react';
import { QUESTIONS, type SoulProfile } from '../lib/questions';
import { encodeSoul } from '../lib/codec';
import { fetchAIAnalysis, type AnalysisResult, testAIConnection, calculateDistance } from '../lib/ai';
import AnalysisReport from './AnalysisReport';

interface DebugFlowProps {
    apiKeyConfigured?: boolean;
}

export default function DebugFlow({ apiKeyConfigured }: DebugFlowProps) {
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
    const [retryCount, setRetryCount] = useState(0);
    const [error, setError] = useState<string | null>(null);

    // Test Interface State
    const [testEndpoint, setTestEndpoint] = useState(import.meta.env.VITE_CUSTOM_AI_ENDPOINT || '/api/analyze');
    const [testKey, setTestKey] = useState('');
    const [testModel, setTestModel] = useState('gemini-2.5-flash-lite');
    const [testLoading, setTestLoading] = useState(false);
    const [testResult, setTestResult] = useState<string | null>(null);

    const generateRandomProfile = (): SoulProfile => {
        const answers = QUESTIONS.map(() => Math.floor(Math.random() * 5) + 1);
        return {
            version: 1,
            answers,
            timestamp: Date.now(),
        };
    };

    const handleTestConnection = async () => {
        setTestLoading(true);
        setTestResult(null);
        try {
            const result = await testAIConnection(testEndpoint, testKey, testModel);
            setTestResult(JSON.stringify(result, null, 2));
        } catch (e) {
            setTestResult(`Error: ${e instanceof Error ? e.message : String(e)} `);
        } finally {
            setTestLoading(false);
        }
    };

    const handleDebugAnalysis = async () => {
        setLoading(true);
        setError(null);
        setAnalysis(null);
        setRetryCount(0);

        try {
            const profileA = generateRandomProfile();
            const profileB = generateRandomProfile();

            // Log for debug
            console.log('Profile A:', profileA);
            console.log('Profile B:', profileB);
            console.log('Hash A:', encodeSoul(profileA));
            console.log('Hash B:', encodeSoul(profileB));

            const result = await fetchAIAnalysis(
                profileA,
                profileB,
                (count) => setRetryCount(count),
                (partialText) => {
                    // Update analysis state with partial text for streaming effect
                    setAnalysis({
                        compatibilityScore: calculateDistance(profileA, profileB), // Recalculate or pass from context if possible, but simple recalc is fine
                        summary: "正在生成分析报告...",
                        details: partialText
                    });
                }
            );
            setAnalysis(result);
        } catch (e) {
            console.error("Debug Analysis Failed:", e);
            if (e instanceof Error) {
                console.error("Error Details:", e.message);
                console.error("Stack Trace:", e.stack);
            }
            setError(e instanceof Error ? e.message : "Unknown error");
        } finally {
            setLoading(false);
            setRetryCount(0);
        }
    };

    const formatError = (errString: string) => {
        if (!errString) return null;

        const previewMarker = "Response Preview:";
        const previewIndex = errString.indexOf(previewMarker);

        if (previewIndex !== -1) {
            const metaInfo = errString.substring(0, previewIndex);
            const jsonPart = errString.substring(previewIndex + previewMarker.length).trim();

            let formattedJson = jsonPart;
            let isJson = false;
            try {
                formattedJson = JSON.stringify(JSON.parse(jsonPart), null, 2);
                isJson = true;
            } catch (e) {
                // Not JSON, keep as is
            }

            return (
                <div className="text-left w-full">
                    <div className="font-mono text-xs mb-2 whitespace-pre-wrap border-b border-red-200 pb-2">{metaInfo}</div>
                    <div className="font-bold text-xs mb-1 text-red-800">Response Body:</div>
                    <pre className={`p - 2 rounded text - xs overflow - auto font - mono ${isJson ? 'bg-white border border-red-200' : 'bg-red-100'} `}>
                        {formattedJson}
                    </pre>
                </div>
            );
        }

        return <div className="text-left whitespace-pre-wrap text-sm">{errString}</div>;
    };

    if (analysis) {
        return (
            <div className="p-4">
                <button
                    onClick={() => setAnalysis(null)}
                    className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                >
                    ← 返回 Debug
                </button>
                <AnalysisReport
                    result={analysis}
                    hostInfo="Debug-A"
                    guestInfo="Debug-B"
                />
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black mb-4"></div>
                <h3 className="text-xl font-bold text-gray-900">正在进行灵魂共鸣分析...</h3>
                <p className="text-gray-500 mt-2">AI 正在对比你们的 50 个维度数据</p>
                {retryCount > 0 && (
                    <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 rounded-lg text-sm animate-pulse border border-yellow-200">
                        AI 服务连接不稳定，正在进行第 {retryCount} 次重试...
                    </div>
                )}
            </div>
        );
    }

    const currentEnvEndpoint = import.meta.env.VITE_CUSTOM_AI_ENDPOINT;

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-center">Debug AI Analysis</h2>

            {/* AI Interface Test Section */}
            <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-100">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    AI 接口连通性测试
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Endpoint URL</label>
                        <input
                            type="text"
                            value={testEndpoint}
                            onChange={(e) => setTestEndpoint(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent font-mono text-sm"
                            placeholder="https://..."
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">API Key (Optional)</label>
                            <input
                                type="password"
                                value={testKey}
                                onChange={(e) => setTestKey(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent font-mono text-sm"
                                placeholder="sk-..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                            <input
                                type="text"
                                value={testModel}
                                onChange={(e) => setTestModel(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent font-mono text-sm"
                                placeholder="gemini-2.5-flash-lite"
                            />
                        </div>
                    </div>
                    <button
                        onClick={handleTestConnection}
                        disabled={testLoading}
                        className="w-full px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors disabled:opacity-50 font-medium"
                    >
                        {testLoading ? 'Testing Connection...' : '测试连接 (Test Connection)'}
                    </button>
                    {testResult && (
                        <div className="mt-4">
                            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Response</label>
                            <div className="p-3 bg-gray-900 text-green-400 rounded text-xs font-mono overflow-auto max-h-60 border border-gray-800">
                                <pre>{testResult}</pre>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="mb-6 bg-gray-50 p-4 rounded border border-gray-100">
                <h3 className="text-sm font-bold mb-2 flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    全流程模拟 (Full Analysis Simulation)
                </h3>
                <div className="text-xs text-gray-500 font-mono space-y-1 mb-4 pl-4 border-l-2 border-gray-200">
                    <div>Current Endpoint: {currentEnvEndpoint || '(Default Internal API)'}</div>
                    <div>API Key Configured: {apiKeyConfigured ? 'Yes (Server-side)' : 'No'}</div>
                </div>

                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-600">
                    <li>生成两个随机 SoulProfile (50题)</li>
                    <li>计算本地匹配度</li>
                    <li>调用 AI 分析接口 (使用 .env 配置)</li>
                    <li>展示最终报告</li>
                </ul>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 shadow-sm">
                    <h4 className="font-bold mb-2 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        Analysis Failed
                    </h4>
                    {formatError(error)}
                </div>
            )}

            <button
                onClick={handleDebugAnalysis}
                className="w-full px-6 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-all shadow-md hover:shadow-lg"
            >
                开始 Debug (Start Full Analysis)
            </button>
        </div>
    );
}
