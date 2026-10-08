import { parse, render, type ParseOptions } from "sugar-high/core";
import * as css from "sugar-high/lang/css";
import * as shell from "sugar-high/lang/shell";
import * as typescript from "sugar-high/lang/typescript";

export type CodeLang = "tsx" | "css" | "shell" | "html" | "text";

const notJs = { jsx: false, regex: false, templateStrings: false };

const configs: Record<Exclude<CodeLang, "text">, ParseOptions> = {
  tsx: typescript,
  // JSX mode tokenises tags and attributes, which is what the HTML snippets need.
  html: typescript,
  css: { ...css, ...notJs },
  shell: { ...shell, ...notJs },
};

const escape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * Returns HTML whose token colours are `var(--sh-*)` references, so the theme
 * (defined in index.css) follows light and dark without re-highlighting.
 */
export function highlight(code: string, lang: CodeLang = "tsx"): string {
  if (lang === "text") {
    return code
      .split("\n")
      .map((line) => `<span class="sh__line">${escape(line)}</span>`)
      .join("\n");
  }
  return render(parse(code, configs[lang]));
}

/** Drops the demo's `meta` export (documentation-only) from displayed source. */
export function cleanDemoSource(source: string): string {
  let code = source.replace(/^import type \{[^}]*\}\s+from\s+["']@\/lib\/types["'];?\n/m, "");
  const start = code.search(/^export const meta\b/m);
  if (start >= 0) {
    const open = code.indexOf("{", start);
    let depth = 0;
    let end = -1;
    let quote: string | null = null;
    for (let i = open; i >= 0 && i < code.length; i++) {
      const ch = code[i]!;
      if (quote) {
        if (ch === "\\") i++;
        else if (ch === quote) quote = null;
        continue;
      }
      if (ch === '"' || ch === "'" || ch === "`") quote = ch;
      else if (ch === "{") depth++;
      else if (ch === "}" && --depth === 0) {
        end = i + 1;
        break;
      }
    }
    if (end > 0) {
      const tail = code.slice(end).match(/^[^\n]*\n?/)?.[0] ?? "";
      code = code.slice(0, start) + code.slice(end + tail.length);
    }
  }
  return code.replace(/\n{3,}/g, "\n\n").trim() + "\n";
}

/** `import { A, B } from "@qingye_lab/ui";`, wrapped when it gets long. */
export function importSnippet(names: readonly string[], from = "@qingye_lab/ui"): string {
  const one = `import { ${names.join(", ")} } from "${from}";`;
  if (one.length <= 72 || names.length < 2) return one;
  return `import {\n${names.map((name) => `  ${name},`).join("\n")}\n} from "${from}";`;
}
