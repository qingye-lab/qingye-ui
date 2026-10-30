import guide from "../../../../design.md?raw";
import type { DocsLocale } from "./paths";
import { extractPublicTranslation } from "./public-translations.mjs";

/*
 * 首页的十五法：逐字取自 design.md 两张方法表（器用六法、表达九法），按路由语言取中文正文或英文译文。
 * 不另写摘要：方法名、出处与设计决定都是表里的原文，表变了首页随之变。
 */
export type GuideMethod = { n: number; name: string; aside?: string; source: string; decision: string };

const plain = (cell: string) => cell.replace(/\*/g, "").trim();

function tables(source: string, locale: DocsLocale): GuideMethod[][] {
  const header = locale === "en" ? /^\| Method \| Source \| Design decision \| Avoid \|$/ : /^\| 方法 \| 出处 \| 设计决定 \| 应避免的结果 \|$/;
  const lines = source.split(/\r?\n/);
  const found: GuideMethod[][] = [];
  let n = 0;
  lines.forEach((line, index) => {
    if (!header.test(line.trim())) return;
    const rows: GuideMethod[] = [];
    for (let row = index + 2; row < lines.length && lines[row]!.startsWith("|"); row++) {
      const [name = "", origin = "", decision = ""] = lines[row]!.split("|").slice(1, -1).map(plain);
      // 英文表的方法名写作「名实相符 Semantic fidelity」：英文是名，中文原名留作旁注。
      const split = locale === "en" ? name.match(/^(\p{Script=Han}+)\s+(.+)$/u) : null;
      n += 1;
      rows.push(split ? { n, name: split[2]!, aside: split[1]!, source: origin, decision } : { n, name, source: origin, decision });
    }
    found.push(rows);
  });
  return found;
}

const translation = extractPublicTranslation(guide);
const byLocale: Record<DocsLocale, GuideMethod[][]> = {
  zh: tables(translation.canonical, "zh"),
  en: tables(translation.english ?? translation.canonical, "en"),
};

/** [器用六法, 表达九法]; throws at load if design.md no longer has both tables. */
export function guideMethods(locale: DocsLocale): [GuideMethod[], GuideMethod[]] {
  const [use, expression] = byLocale[locale];
  if (!use || !expression || use.length !== 6 || expression.length !== 9) throw new Error("design.md must keep the six and nine method tables.");
  return [use, expression];
}
