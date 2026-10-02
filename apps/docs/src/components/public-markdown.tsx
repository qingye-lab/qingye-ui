import { Fragment, type ReactNode } from "react";
import { A, H2, H3, P } from "./prose";

function inline(value: string): ReactNode[] {
  return value.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong className="font-semibold" key={index}>{part.slice(2, -2)}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    return link ? <A href={link[2]!} key={index}>{link[1]}</A> : part;
  });
}
/** Approved public Markdown only; no raw HTML or runtime file access. */
export function PublicMarkdown({ source }: { source: string }) {
  let heading = 0;
  return <>{source.trim().split(/\n\s*\n/).map((block, index) => {
    if (block.startsWith("# ")) return null;
    if (block === "---") return <hr className="my-10 border-border" key={index} />;
    if (block.startsWith("### ")) return <H3 id={`public-section-${++heading}`} key={index}>{inline(block.replace(/^###\s+/, ""))}</H3>;
    if (block.startsWith("## ")) return <H2 id={`public-section-${++heading}`} key={index}>{inline(block.replace(/^##\s+/, ""))}</H2>;
    return <P key={index}>{block.split("\n").map((line, i) => <Fragment key={i}>{i > 0 && <br />}{inline(line)}</Fragment>)}</P>;
  })}</>;
}
