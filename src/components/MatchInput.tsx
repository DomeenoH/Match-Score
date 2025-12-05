import React, { useState } from 'react';

interface MatchInputProps {
    onMatch: (hash: string) => void;
}

export default function MatchInput({ onMatch }: MatchInputProps) {
    const [inputHash, setInputHash] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputHash.trim()) {
            onMatch(inputHash.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="mb-4">
                <label htmlFor="hash-input" className="block text-sm font-medium text-gray-700 mb-1">
                    Enter Partner's Soul Hash
                </label>
                <input
                    id="hash-input"
                    type="text"
                    value={inputHash}
                    onChange={(e) => setInputHash(e.target.value)}
                    placeholder="Paste hash here..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
            >
                Start Matching
            </button>
        </form>
    );
}
