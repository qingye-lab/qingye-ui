export function extractPublicTranslation(source: string): { canonical: string; english: string | undefined; sourceHash: string | undefined };
export function extractStandaloneTranslation(source: string): { english: string; sourceHash: string };
