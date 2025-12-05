import React, { useState, useEffect } from 'react';
import MatchInput from './MatchInput';
import Questionnaire from './Questionnaire';
import AnalysisReport from './AnalysisReport';
import { decodeSoul, encodeSoul } from '../lib/codec';
import { fetchAIAnalysis, type AnalysisResult } from '../lib/ai';
import type { SoulProfile } from '../lib/questions';

export default function MatchFlow() {
    const [hostHash, setHostHash] = useState<string | null>(null);
    const [myHash, setMyHash] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const host = params.get('host');
        if (host) {
            setHostHash(host);
        }
    }, []);

    const handleMatchStart = (hash: string) => {
        setHostHash(hash);
        window.history.pushState({}, '', `/match?host=${hash}`);
    };

    const handleQuestionnaireComplete = async (hash: string) => {
        setMyHash(hash);
        setLoading(true);

        if (hostHash) {
            const hostProfile = decodeSoul(hostHash);
            const myProfile = decodeSoul(hash);

            if (hostProfile && myProfile) {
                const result = await fetchAIAnalysis(hostProfile, myProfile);
                setAnalysis(result);
            } else {
                alert("Invalid hash found. Please try again.");
            }
        }
        setLoading(false);
    };

    if (analysis) {
        return <AnalysisReport result={analysis} />;
    }

    if (loading) {
        return <div className="text-center">Analyzing compatibility...</div>;
    }

    if (hostHash) {
        return (
            <div>
                <div className="mb-6 text-center">
                    <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-mono text-gray-500 mb-2">
                        Matching with: {hostHash.substring(0, 8)}...
                    </span>
                    <h2 className="text-xl font-bold">Complete your profile to see results</h2>
                </div>
                <Questionnaire onComplete={handleQuestionnaireComplete} />
            </div>
        );
    }

    return <MatchInput onMatch={handleMatchStart} />;
}
