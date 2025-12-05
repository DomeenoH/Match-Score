import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';
import type { SoulProfile } from './questions';

export const encodeSoul = (profile: SoulProfile): string => {
    try {
        const jsonString = JSON.stringify(profile);
        return compressToEncodedURIComponent(jsonString);
    } catch (e) {
        console.error("Failed to encode Soul Profile", e);
        return "";
    }
};

export const decodeSoul = (hash: string): SoulProfile | null => {
    if (!hash) return null;
    try {
        const jsonString = decompressFromEncodedURIComponent(hash);
        if (!jsonString) return null;
        return JSON.parse(jsonString);
    } catch (e) {
        console.error("Invalid Soul Hash", e);
        return null;
    }
};
