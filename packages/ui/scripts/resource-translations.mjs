import { createHash } from "node:crypto";
import { extractPublicTranslation, extractStandaloneTranslation } from "../../../apps/docs/src/lib/public-translations.mjs";

export const normalizedSourceHash = source => createHash("sha256").update(`${source.trimEnd()}\n`).digest("hex");
export function embeddedTranslation(source, label) {
  const entry = extractPublicTranslation(source);
  if (!entry.english || entry.sourceHash !== normalizedSourceHash(entry.canonical)) throw new Error(`${label}: English translation missing or stale; update it from the canonical source before generating.`);
  return entry;
}
export function standaloneTranslation(source, translation, label) {
  const entry = extractStandaloneTranslation(translation);
  if (entry.sourceHash !== normalizedSourceHash(source)) throw new Error(`${label}: English translation source hash changed; review the translation before generating.`);
  return entry.english;
}

/** Relocate authored links without turning repository evidence into a public rule. */
export function projectImplementationLinks(source, locale = "zh") {
  return source
    .replace(/\]\((design(?:\.en)?\.md)(#[^)]*)?\)/g, "](../$1$2)")
    .replace(/\[([^\]]+)\]\((docs\/decisions\/2026-10-03-(?:foundation|value-adjudication)\.md(?:#[^)]*)?)\)/g,
      (_match, label, path) => locale === "en"
        ? `${label} (repository evidence: \`${path}\`)`
        : `${label}（仓库内部取证：\`${path}\`）`);
}

/** Website prose stays authored; installed Markdown gets usable package/site targets. */
export function projectPackagePhilosophy(source, locale = "zh") {
  return source
    .replace(/\]\(\/(design(?:\.en)?\.md)\)/g, "](../$1)")
    .replaceAll("](/docs/ai#project-rules)", `](https://ui.xflux.cc/${locale === "en" ? "en/" : ""}docs/ai#project-rules)`)
    .replace(/\]\(\/(docs\/components\/[a-z0-9-]+)\)/g, (_match, path) => `](https://ui.xflux.cc/${locale === "en" ? "en/" : ""}${path})`);
}
