import React, { useState, useEffect } from 'react';
import Questionnaire from './Questionnaire';
import SoulHashDisplay from './SoulHashDisplay';

export default function CreateFlow() {
    const [hash, setHash] = useState<string | null>(null);

    useEffect(() => {
        // Check URL for hash
        const params = new URLSearchParams(window.location.search);
        const urlHash = params.get('hash');
        if (urlHash) {
            setHash(urlHash);
        }
    }, []);

    const handleComplete = (newHash: string) => {
        setHash(newHash);
        window.history.pushState({}, '', `/create?hash=${newHash}`);
    };

    if (hash) {
        return <SoulHashDisplay hash={hash} />;
    }

    return <Questionnaire onComplete={handleComplete} />;
}
