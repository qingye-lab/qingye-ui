import principles from "virtual:design-principles";
import type { DocsLocale } from "./paths";

/*
 * 首页的总纲三条：逐字取自 design.md 的总纲表（名、出处、含义），中文取正文、英文取作者写的英文块。
 * 构建时由 vite-plugins/design-principles.mjs 抽出这三行，首页只带这三行，不带整份指南。
 * 英文名写作「Purpose first (器用为本)」：英文是名，中文原名留作旁注。
 */
export type GuidePrinciple = { name: string; aside?: string; source: string; meaning: string };

export function guidePrinciples(locale: DocsLocale): readonly GuidePrinciple[] {
  return principles[locale];
}
