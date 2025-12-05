import React, { useState } from 'react';

interface SoulHashDisplayProps {
    hash: string;
}

export default function SoulHashDisplay({ hash }: SoulHashDisplayProps) {
    const [copied, setCopied] = useState(false);

    // Construct the full URL
    const shareUrl = typeof window !== 'undefined'
        ? `${window.location.origin}/match?host=${hash}`
        : `/match?host=${hash}`;

    const invitationText = `【灵魂哈希邀请函】
朋友，我已完成我的灵魂契合度测试。点击下方链接，完成你的问卷，看看我们的相性如何：

${shareUrl}

或直接复制我的 Soul Hash 编码（如果链接失效）：
${hash}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(invitationText).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="max-w-md mx-auto text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2 text-gray-900">你的 Soul Hash 已生成</h2>
                <p className="text-gray-600">将此邀请函分享给 TA，开启灵魂契合度分析。</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg mb-6 break-all font-mono text-sm text-gray-600 border border-gray-200">
                {hash}
            </div>

            <button
                onClick={handleCopy}
                className={`w-full px-6 py-4 font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${copied ? 'bg-green-600 text-white' : 'bg-black text-white hover:bg-gray-900'
                    }`}
            >
                {copied ? (
                    <>
                        <span>已复制邀请函</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </>
                ) : (
                    <>
                        <span>复制完整邀请函</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    </>
                )}
            </button>
            <p className="text-xs text-gray-400 mt-4">
                包含：测试链接 + Soul Hash 编码
            </p>
        </div>
    );
}
