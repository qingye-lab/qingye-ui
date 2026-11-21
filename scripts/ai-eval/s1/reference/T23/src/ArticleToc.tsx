import { Toc } from "@qingye_lab/ui/components/toc";

export type ArticleTocProps = {
  headings: { id: string; title: string }[];
};

// 少于两个目的地时目录没有意义，由调用方决定是否渲染（指南 toc.md）
export function ArticleToc({ headings }: ArticleTocProps) {
  if (headings.length < 2) return null;
  return <Toc items={headings.map(h => ({ id: h.id, label: h.title, level: 2 as const }))} />;
}
