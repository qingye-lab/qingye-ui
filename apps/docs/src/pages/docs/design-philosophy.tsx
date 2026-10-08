import { buttonVariants } from "@qingye_lab/ui/components/button";
import { PageHeader } from "@/components/prose";
import { cn } from "@qingye_lab/ui/utils";
import { parsePublicMarkdown, PublicMarkdown, type MethodGroup } from "@/components/public-markdown";
import { useDocsLocale } from "@/lib/docs-locale";
import philosophy from "@/public-content/philosophy.md?raw";
import philosophyEn from "@/public-content/philosophy.en.md?raw";

/*
 * 设计理念页：正文就是 public-content/philosophy(.en).md，页面只排版，不改写。
 * 页首的标题与总纲取自正文的第一个标题与其下的粗体句；引用的出处在文末按序列出。
 * 方法 01–06 与 07–15 分属器用六法与表达九法（design.md），两组的名称在这里成为分组标题。
 */
const SOURCE = { zh: parsePublicMarkdown(philosophy), en: parsePublicMarkdown(philosophyEn) };
const GROUPS: Record<"zh" | "en", MethodGroup[]> = {
  zh: [{ start: 1, id: "methods-of-use", title: "器用六法" }, { start: 7, id: "methods-of-expression", title: "表达九法" }],
  en: [{ start: 1, id: "methods-of-use", title: "Six methods of use" }, { start: 7, id: "methods-of-expression", title: "Nine methods of expression" }],
};

export default function DesignPhilosophyPage() {
  const locale = useDocsLocale();
  const en = locale === "en";
  const doc = SOURCE[locale];
  return <>
    <PageHeader description={doc.lead} title={doc.title ?? ""}>
      {/* The English guide is saved under the same file name projects refer to. */}
      <a className={cn(buttonVariants({ variant: "bordered" }), "mt-(--qy-field-gap) w-fit")} download={en ? "design.md" : true} href={en ? "/design.en.md" : "/design.md"}>{en ? "Download design.md" : "下载 design.md"}</a>
    </PageHeader>
    <PublicMarkdown document={doc} groups={GROUPS[locale]} notesTitle={en ? "Sources" : "来源简注"} />
  </>;
}
