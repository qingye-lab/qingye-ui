import guide from "../../../../design.md?raw";

/** Keep the site copy actions tied to the authored root guide. */
export function extractDesignEntry(source: string) {
  const startMarker = "<!-- qingye:project-adoption:start -->";
  const endMarker = "<!-- qingye:project-adoption:end -->";
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
  return { agents, design, task };
}

const entry = extractDesignEntry(guide);
export const DESIGN_GUIDE = guide;
export const PROJECT_AGENTS = entry.agents;
export const PROJECT_DESIGN = entry.design;
export const TASK_PROMPT = entry.task;
