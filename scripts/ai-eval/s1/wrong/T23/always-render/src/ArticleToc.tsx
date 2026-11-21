import { Toc } from "@qingye_lab/ui/components/toc";

export type ArticleTocProps = {
  headings: { id: string; title: string }[];
};

export function ArticleToc({ headings }: ArticleTocProps) {
  return <Toc items={headings.map(h => ({ id: h.id, label: h.title, level: 2 as const }))} />;
}
