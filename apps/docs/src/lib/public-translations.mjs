/** Pure source parsing shared by the browser and generator. Hashing belongs to Node. */
export function extractPublicTranslation(source) {
  const starts = [...source.matchAll(/^<!-- qingye:translation:en:start source-sha256=([a-f0-9]{64}) -->\r?\n/gm)];
  const endMarker = "<!-- qingye:translation:en:end -->";
  const ends = [...source.matchAll(/^<!-- qingye:translation:en:end -->[ \t]*$/gm)];
  if (!starts.length && !ends.length) return { canonical: `${source.trimEnd()}\n`, english: undefined, sourceHash: undefined };
  if (starts.length !== 1 || ends.length !== 1) throw new Error("A public source requires exactly one complete English translation block.");
  const start = starts[0];
  const end = ends[0];
  const contentStart = start.index + start[0].length;
  if (end.index <= contentStart || source.slice(end.index + endMarker.length).trim()) throw new Error("The English translation must be a complete final source block.");
  const english = source.slice(contentStart, end.index).trim();
  if (!english) throw new Error("The English translation block is empty.");
  return { canonical: `${source.slice(0, start.index).trimEnd()}\n`, english: `${english}\n`, sourceHash: start[1] };
}

/** Standalone translations carry the exact hash of their normalized source. */
export function extractStandaloneTranslation(source) {
  const marker = /^<!-- qingye:translation-source:sha256=([a-f0-9]{64}) -->\r?\n/;
  const match = marker.exec(source);
  if (!match) throw new Error("A standalone public translation requires its source SHA-256 marker.");
  const english = source.slice(match[0].length).trim();
  if (!english) throw new Error("The standalone English translation is empty.");
  return { english: `${english}\n`, sourceHash: match[1] };
}
