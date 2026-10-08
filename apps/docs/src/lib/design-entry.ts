import guide from "../../../../design.md?raw";
import type { DocsLocale } from "./paths";
import { extractPublicTranslation } from "./public-translations.mjs";

/** Keep the site copy actions tied to the authored root guide. */
export function extractDesignEntry(source: string, locale: DocsLocale = "zh") {
  const translation = extractPublicTranslation(source);
  const selected = locale === "en" ? translation.english : translation.canonical;
  if (!selected) throw new Error("design.md has no authored English translation.");
  const startMarker = locale === "en" ? "<!-- qingye:project-adoption:en:start -->" : "<!-- qingye:project-adoption:start -->";
  const endMarker = locale === "en" ? "<!-- qingye:project-adoption:en:end -->" : "<!-- qingye:project-adoption:end -->";
  source = selected;
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker);
  if (start < 0 || end < start || start !== source.lastIndexOf(startMarker) || end !== source.lastIndexOf(endMarker)) {
    throw new Error("design.md must contain one complete project-adoption section.");
  }

  const section = source.slice(start + startMarker.length, end);
  const blocks = [...section.matchAll(/^```md\r?\n([\s\S]*?)\r?\n```[ \t]*$/gm)].map((match) => match[1]?.trim());
  const [agents, design] = blocks;
  if (blocks.length !== 2 || !agents || !design) {
    throw new Error("The project-adoption section must contain AGENTS.md and design.md snippets.");
  }

  const task = [...source.matchAll(/^```text\r?\n([\s\S]*?)\r?\n```[ \t]*$/gm)].at(-1)?.[1]?.trim();
  if (!task) throw new Error("design.md must contain the task-entry text block.");
  return { guide: selected, agents, design, task };
}

const entry = extractDesignEntry(guide);
export function designEntryFor(locale: DocsLocale = "zh") { return locale === "zh" ? entry : extractDesignEntry(guide, locale); }
export const DESIGN_GUIDE = entry.guide;
export const PROJECT_AGENTS = entry.agents;
