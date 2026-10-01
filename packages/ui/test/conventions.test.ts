import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "vitest";

/**
 * Convention checks over every component source file. STANDARDS.md is prose;
 * these are the parts of it a machine can hold us to, so a component cannot
 * quietly drift away from the system.
 */
const dir = join(__dirname, "..", "src", "components");
const files = readdirSync(dir).filter((f) => /\.tsx?$/.test(f));

function read(file: string) {
  return readFileSync(join(dir, file), "utf8");
}

/** Strips comments so prose does not trip the class checks. */
function code(file: string) {
  return read(file)
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "");
}

const table = files.map((file) => [file, code(file)] as const);

describe("component conventions", () => {
  test("every component file is non-trivial and exports something", () => {
    for (const [file, source] of table) {
      expect(source, file).toMatch(/export /);
    }
  });

  test("no hard-coded greys: colours come from semantic tokens or utilities", () => {
    // Palette scales and raw hex/rgb values bypass the token layer and break
    // theming. Chart series are the one sanctioned exception.
    const offenders: string[] = [];
    for (const [file, source] of table) {
      const hits = source.match(/\b(?:bg|text|border|ring|fill|stroke|from|to|via)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/g);
      if (hits) offenders.push(`${file}: ${[...new Set(hits)].join(", ")}`);
      const withoutAttributeSelectors = source.replace(/\[[^\]]*#[0-9a-f]{3,6}[^\]]*\]/gi, "");
      const raw = withoutAttributeSelectors.match(/(?<![\w-])#(?:[0-9a-f]{3}|[0-9a-f]{6})\b/gi);
      if (raw) offenders.push(`${file}: ${[...new Set(raw)].join(", ")}`);
    }
    expect(offenders).toEqual([]);
  });

  test("focus is styled with focus-visible, never bare focus:", () => {
    // A bare `focus:` ring appears on mouse clicks, which reads as a glitch.
    const offenders: string[] = [];
    for (const [file, source] of table) {
      const hits = source.match(/(?<!-)\bfocus:(?:ring|border)/g);
      if (hits) offenders.push(`${file}: ${hits.length}`);
    }
    expect(offenders).toEqual([]);
  });

  test("direction-sensitive spacing uses logical properties", () => {
    // ml-/mr-/pl-/pr- break under RTL; ms-/me-/ps-/pe- do not.
    const offenders: string[] = [];
    for (const [file, source] of table) {
      const hits = source.match(/(?<![\w:-])(?:ml|mr|pl|pr)-[\w[\]().-]+/g);
      if (hits) offenders.push(`${file}: ${[...new Set(hits)].join(", ")}`);
    }
    expect(offenders).toEqual([]);
  });

  test("user-visible strings go through the locale layer", () => {
    // A literal Chinese string in a component is a string that cannot be
    // translated or overridden; demo and docs copy lives outside this folder.
    const offenders: string[] = [];
    for (const [file, source] of table) {
      if (file === "locale.tsx") continue;
      const withoutLocaleImports = source.replace(/^import[\s\S]*?from "\.\.\/locale";$/gm, "");
      const hits = withoutLocaleImports.match(/["'`][^"'`]*[一-鿿][^"'`]*["'`]/g);
      if (hits) offenders.push(`${file}: ${hits.slice(0, 3).join(" ")}`);
    }
    expect(offenders).toEqual([]);
  });

  test("interactive parts carry a data-slot hook", () => {
    const missing: string[] = [];
    for (const [file, source] of table) {
      const isInteractive = /<(?:button|input|select|textarea|a)\b/.test(source) ||
        /Primitive\.(?:Root|Trigger|Popup|Item|Tab|Panel|Handle)/.test(source);
      if (isInteractive && !/data-slot=/.test(source)) missing.push(file);
    }
    expect(missing).toEqual([]);
  });

  test("straight durations are on Tailwind's scale or a deliberate exception", () => {
    /*
     * Components may use a raw duration class, but it should be a step that
     * belongs to a scale. The exceptions below are inherited from coss upstream
     * and are kept as-is so the register stays honest; anything else is a
     * timing nobody chose on purpose. New motion should prefer the `--qy-*`
     * duration tokens instead.
     */
    const scale = new Set(["75", "100", "150", "200", "300", "500", "700", "1000"]);
    const inherited = new Map([
      ["drawer.tsx", new Set(["450"])],
      ["toast.tsx", new Set(["250"])],
    ]);
    const offenders: string[] = [];
    for (const [file, source] of table) {
      for (const hit of source.matchAll(/\bduration-(\d{3,}|75)\b/g)) {
        const value = hit[1]!;
        if (scale.has(value)) continue;
        if (inherited.get(file)?.has(value)) continue;
        offenders.push(`${file}: duration-${value}`);
      }
    }
    expect(offenders).toEqual([]);
  });
});
