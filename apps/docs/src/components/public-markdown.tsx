import { Fragment, type ReactNode } from "react";
import { linkClassName } from "@qingye_lab/ui/components/link";
import { cn } from "@qingye_lab/ui";
import { Link } from "./locale-link";
import { H2, H3, P } from "./prose";

/*
 * Approved public Markdown only; no raw HTML or runtime file access.
 *
 * The renderer knows four things about the source beyond paragraphs:
 * - `## NN  名称` is a numbered method; it keeps the stable anchor `method-N`.
 * - `〔n〕` in a paragraph cites source note n; a paragraph that starts with
 *   `〔n〕` defines that note. Citations become superscript links, and the
 *   definitions are listed once, in order, after the text.
 * - `---` only separates parts in the source; sections already carry their own space.
 * - A paragraph wrapped in single `*` is the colophon, set after the text.
 * Headings, paragraphs and lists are the documentation's own primitives, so the
 * page reads like every other page.
 */

const PROVENANCE = /^<!-- qingye:translation-source:sha256=[a-f0-9]+ -->$/;
const NOTE = /^〔(\d+)〕\s*/;
const CITATIONS = /((?:\s*〔\d+〕)+)/;
/** Full-width closing punctuation keeps its blank half on the right; a marker after it tucks into that space. */
const CLOSING_CJK = /[。，、；：！？」』）〕】》]$/;

export type PublicHeading = { type: "heading"; level: 2 | 3; id: string; text: string; method?: number; part: boolean };
export type PublicBlock = PublicHeading | { type: "paragraph"; text: string };
export interface PublicDocument {
  /** The first heading when it is followed by a bold lead line. */
  title?: string;
  lead?: string;
  blocks: PublicBlock[];
  notes: ReadonlyMap<number, string>;
  colophon?: string;
}
export interface MethodGroup { start: number; id: string; title: string }

export function parsePublicMarkdown(source: string): PublicDocument {
  const raw = source.replace(/^<!-- qingye:translation-source:sha256=[a-f0-9]+ -->\r?\n/, "").trim().split(/\n\s*\n/).map(block => block.trim());
  const notes = new Map<number, string>();
  let blocks: PublicBlock[] = [];
  let colophon: string | undefined;
  let part = false;
  let section = 0;
  for (const block of raw) {
    if (!block || block.startsWith("# ") || PROVENANCE.test(block)) continue;
    if (block === "---") { part = true; continue; }
    const note = block.match(NOTE);
    if (note) { notes.set(Number(note[1]), block.slice(note[0].length)); continue; }
    if (/^\*[^*][\s\S]*\*$/.test(block)) { colophon = block.slice(1, -1); continue; }
    const heading = block.match(/^(#{2,3})\s+([\s\S]+)$/);
    if (heading) {
      const text = heading[2]!;
      const method = heading[1] === "##" ? text.match(/^(\d{2})\s+/) : null;
      blocks.push(method
        ? { type: "heading", level: 2, id: `method-${Number(method[1])}`, text: text.slice(method[0].length), method: Number(method[1]), part }
        : { type: "heading", level: heading[1] === "##" ? 2 : 3, id: `public-section-${++section}`, text, part });
      part = false;
      continue;
    }
    blocks.push({ type: "paragraph", text: block });
  }
  // A heading with nothing before the next heading (the source-note list once its notes moved out) has nothing to introduce.
  blocks = blocks.filter((block, index) => block.type !== "heading" || block.method !== undefined || blocks[index + 1]?.type === "paragraph");
  const [first, second] = blocks;
  if (first?.type === "heading" && !first.method && second?.type === "paragraph" && /^\*\*[^*]+\*\*$/.test(second.text)) {
    return { title: first.text, lead: second.text.slice(2, -2), blocks: blocks.slice(2), notes, ...(colophon === undefined ? {} : { colophon }) };
  }
  return { blocks, notes, ...(colophon === undefined ? {} : { colophon }) };
}

function link(label: string, href: string, key: number): ReactNode {
  if (/^https?:/.test(href)) return <a className={linkClassName} href={href} key={key} rel="noreferrer" target="_blank">{label}</a>;
  // Files such as /design.md are served as they are; only pages go through the router.
  if (/\.[a-z]+(?:[?#].*)?$/i.test(href)) return <a className={linkClassName} href={href} key={key}>{label}</a>;
  return <Link className={linkClassName} key={key} to={href}>{label}</Link>;
}

function emphasis(value: string): ReactNode[] {
  return value.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    const target = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    return target ? link(target[1]!, target[2]!, index) : part;
  });
}

/** Markers become superscript numbers linking to the note list at the end of the page. */
function cited(value: string): ReactNode[] {
  const parts = value.split(CITATIONS);
  const out: ReactNode[] = [];
  for (let index = 0; index < parts.length; index += 2) {
    const run = parts[index + 1];
    let text = parts[index]!;
    let carry = "";
    // The marker and the character before it stay on one line, so a marker never starts a line.
    if (run) {
      text = text.trimEnd();
      if (!/(\*\*|\))$/.test(text)) { const chars = Array.from(text); carry = chars.pop() ?? ""; text = chars.join(""); }
    }
    out.push(...emphasis(text).map((node, i) => <Fragment key={`${index}-${i}`}>{node}</Fragment>));
    if (!run) continue;
    const numbers = [...run.matchAll(/〔(\d+)〕/g)].map(match => Number(match[1]));
    out.push(<span className="whitespace-nowrap" key={`${index}-cite`}>
      {carry}
      <sup className={cn("docs-ref", CLOSING_CJK.test(carry) && "-ms-[0.4em]")}>
        {numbers.map((number, i) => <Fragment key={number}>{i > 0 && ","}<a className="focus-ring rounded-sm text-muted-foreground hover:text-foreground" href={`#note-${number}`} id={`cite-${number}`}>{number}</a></Fragment>)}
      </sup>
    </span>);
  }
  return out;
}

function headingContent(block: PublicHeading): ReactNode {
  if (!block.method) return block.text;
  // English titles read "名实相符 — Names match what is real"; the Chinese name keeps its language for font selection.
  const bilingual = block.text.match(/^(\p{Script=Han}+)(\s+—\s+[\s\S]+)$/u);
  return <><span className="inline-block min-w-[1.5em] text-muted-foreground numeric">{String(block.method).padStart(2, "0")}</span> {bilingual ? <><span lang="zh-CN">{bilingual[1]}</span>{bilingual[2]}</> : block.text}</>;
}

export function PublicMarkdown({ document, groups = [], notesTitle }: { document: PublicDocument; groups?: readonly MethodGroup[]; notesTitle?: string }) {
  const out: ReactNode[] = [];
  for (const [index, block] of document.blocks.entries()) {
    if (block.type === "paragraph") {
      out.push(<P key={index}>{block.text.split("\n").map((line, i) => <Fragment key={i}>{i > 0 && <br />}{cited(line)}</Fragment>)}</P>);
      continue;
    }
    const group = block.method ? groups.find(item => item.start === block.method) : undefined;
    if (group) out.push(<H2 id={group.id} key={group.id}>{group.title}</H2>);
    const nested = block.method !== undefined && groups.length > 0;
    out.push(nested || block.level === 3
      ? <H3 id={block.id} key={block.id}>{headingContent(block)}</H3>
      : <H2 id={block.id} key={block.id}>{headingContent(block)}</H2>);
  }
  if (notesTitle && document.notes.size) {
    out.push(<H2 id="sources" key="sources">{notesTitle}</H2>);
    out.push(<ol className="m-0 mb-(--qy-space-module) flex max-w-(--docs-measure) list-none flex-col gap-(--qy-field-gap) p-0 text-support text-muted-foreground" key="notes">
      {[...document.notes].sort(([a], [b]) => a - b).map(([number, note]) => (
        <li className="grid grid-cols-[calc(2*var(--qy-cai))_minmax(0,1fr)]" id={`note-${number}`} key={number}>
          <a aria-label={`${number}`} className="focus-ring w-fit rounded-sm numeric hover:text-foreground" href={`#cite-${number}`}>{number}</a>
          <span className="min-w-0 [overflow-wrap:anywhere]">{emphasis(note)}</span>
        </li>
      ))}
    </ol>);
  }
  if (document.colophon) out.push(<p className="docs-p m-0 max-w-(--docs-measure) text-support text-muted-foreground" key="colophon">{document.colophon}</p>);
  return <>{out}</>;
}
