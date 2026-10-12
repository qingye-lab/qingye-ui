// llms-full.txt: the design guide, the installation notes and every component in one Markdown file,
// for tools that cannot follow links. Rendered from the generated catalog and the published guide, so
// it states nothing that is not already stated in its sources (design.md, meta.ts, the type checker).
import { localizedComponent, renderComponent } from "./component-markdown.mjs";

/** Move every heading down by `levels`, leaving fenced code alone. */
export function demoteHeadings(markdown, levels) {
  let fence = null;
  return markdown.split("\n").map((line) => {
    const mark = line.match(/^\s*(`{3,}|~{3,})/);
    if (mark) { if (!fence) fence = mark[1][0]; else if (mark[1][0] === fence) fence = null; return line; }
    if (fence) return line;
    return /^#{1,6}\s/.test(line) ? `${"#".repeat(levels)}${line}` : line;
  }).join("\n");
}

export function renderLlmsFull({ catalog, locale, guide, installation }) {
  const en = locale === "en";
  const { package: pkgName, version } = catalog;
  const blocks = catalog.components.map((component) => renderComponent(localizedComponent(component, locale), { pkgName, pkgVersion: version, examples: "first", depth: 2 }));
  return [
    `# Qingye UI ${version}: full text`, "",
    `> ${pkgName}@${version}. ${en
      ? "The design guide, installation notes and every component in one file, for tools that cannot follow links. Generated from the sources the site uses: design.md, the component metadata and the TypeScript types. Each component keeps its first source example here; the component's own Markdown file has them all."
      : "设计指南、安装说明与全部组件合为一个文件，供无法跟随链接的工具读取。与官网同源生成：design.md、组件元数据与 TypeScript 类型。这里每个组件只保留第一个源码示例，完整示例见该组件自己的 Markdown 文件。"}`, "",
    `# ${en ? "Part 1. Design guide" : "第一部分 设计指南"}`, "", demoteHeadings(guide.trim(), 1), "",
    `# ${en ? "Part 2. Installation" : "第二部分 安装"}`, "", demoteHeadings(installation.trim(), 1), "",
    `# ${en ? "Part 3. Components" : "第三部分 组件"} (${catalog.components.length})`, "",
    ...blocks.flatMap((block) => [block.trimEnd(), ""]),
  ].join("\n");
}
