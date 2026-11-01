// `virtual:design-principles`: the three principles (总纲) the home page shows, read verbatim from the
// principles table of the root design.md at build time, in Chinese and in the authored English block.
// The page needs three rows; importing design.md?raw would ship the whole guide (both languages) in the
// home chunk, so the rows are extracted here and only they are bundled.
import { readFileSync } from "node:fs";
import { extractPublicTranslation } from "../src/lib/public-translations.mjs";

const ID = "virtual:design-principles";
const RESOLVED = `\0${ID}`;
const plain = (cell) => cell.replace(/\*/g, "").trim();

/** Rows of the principles table; the English name is written "Purpose first (器用为本)". */
function principles(source, english) {
  const header = english ? "| Principle | Source | Meaning |" : "| 总纲 | 出处 | 含义 |";
  const lines = source.split(/\r?\n/);
  const start = lines.findIndex((line) => line.trim() === header);
  const rows = [];
  for (let row = start + 2; start >= 0 && row < lines.length && lines[row].startsWith("|"); row++) {
    const [name = "", origin = "", meaning = ""] = lines[row].split("|").slice(1, -1).map(plain);
    const split = english ? name.match(/^(.+?)\s*\((\p{Script=Han}+)\)$/u) : null;
    rows.push(split ? { name: split[1], aside: split[2], source: origin, meaning } : { name, source: origin, meaning });
  }
  return rows;
}

export default function designPrinciples(guidePath) {
  return {
    name: "design-principles",
    resolveId: (id) => (id === ID ? RESOLVED : null),
    load(id) {
      if (id !== RESOLVED) return null;
      this.addWatchFile(guidePath);
      const { canonical, english } = extractPublicTranslation(readFileSync(guidePath, "utf8"));
      const data = { zh: principles(canonical, false), en: principles(english ?? canonical, true) };
      for (const [locale, rows] of Object.entries(data)) if (rows.length !== 3) throw new Error(`design.md must keep the three principles table (${locale}: ${rows.length} rows).`);
      return `export default ${JSON.stringify(data)};`;
    },
  };
}
