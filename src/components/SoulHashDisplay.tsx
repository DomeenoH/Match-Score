import React, { useState } from 'react';

interface SoulHashDisplayProps {
    hash: string;
}

export default function SoulHashDisplay({ hash }: SoulHashDisplayProps) {
    const [copied, setCopied] = useState(false);

    // In a real app, we'd construct the full URL. 
    // For now, let's assume the current origin + /match?host=HASH
    const shareUrl = typeof window !== 'undefined'
        ? `${window.location.origin}/match?host=${hash}`
        : `/match?host=${hash}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="max-w-md mx-auto text-center">
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Your Soul Hash is Ready</h2>
                <p className="text-gray-600">Share this link with your partner to check compatibility.</p>
            </div>

            <div className="p-4 bg-gray-100 rounded-lg mb-6 break-all font-mono text-xs text-gray-500">
                {hash}
            </div>

            <button
                onClick={handleCopy}
                className="w-full px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
                {copied ? (
                    <>
                        <span>Copied!</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </>
                ) : (
                    <>
                        <span>Copy Link</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    </>
                )}
            </button>
        </div>
    );
}
