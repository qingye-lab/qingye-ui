import { Tabs, TabsList, TabsPanel } from "@qingye/ui/components/tabs";
import { TabsTab } from "@qingye/ui/components/tabs";
import { cn } from "@qingye/ui";
import { useMemo } from "react";
import { cleanDemoSource } from "@/lib/highlight";
import type { LoadedDemo } from "@/lib/registry";
import { CodeView } from "./code-block";
import { CopyCodeButton } from "./copy-code-button";
import { H3 } from "./prose";
import { useDocsLocale } from "@/lib/docs-locale";
import { localizedMeta } from "@/lib/localized-meta";
import { ContentBoundary } from "./content-boundary";

export function DemoFrame({ slug, demo }: { slug: string; demo: LoadedDemo }) {
  const locale = useDocsLocale();
  const meta = localizedMeta(demo.meta, locale);
  const source = useMemo(() => cleanDemoSource(demo.source), [demo.source]);
  const Demo = demo.default;
  const id = `demo-${demo.id}`;
  return (
    <section aria-labelledby={id} className="mt-10 first:mt-6" data-demo={demo.id}>
      <H3 className="mt-0 mb-1.5" id={id}>
        {meta.title}
      </H3>
      {meta.description ? (
        <p className="mb-3 max-w-[42rem] text-pretty text-body text-muted-foreground leading-relaxed">{meta.description}</p>
      ) : null}
      <Tabs className={cn("docs-demo-frame gap-0 overflow-hidden rounded-xl border bg-background", !meta.description && "mt-3")} defaultValue="preview">
        <div className="docs-demo-chrome flex flex-wrap items-center justify-between gap-(--qy-space-2) border-b bg-surface-subtle/60 dark:bg-surface/40">
          <TabsList aria-label={`${meta.title}：预览或代码`} size="sm">
            <TabsTab value="preview">预览</TabsTab>
            <TabsTab value="code">代码</TabsTab>
          </TabsList>
          <CopyCodeButton value={source} />
        </div>
        <TabsPanel
          className={cn(
            "outline-none",
            meta.flush ? "min-w-0" : "docs-demo-preview flex min-h-36 min-w-0 flex-wrap items-center justify-center gap-(--qy-space-4)",
          )}
          data-demo-preview={`${slug}/${demo.id}`}
          keepMounted
          value="preview"
        >
          <ContentBoundary title="这个示例暂时无法显示">
            <Demo />
          </ContentBoundary>
        </TabsPanel>
        <TabsPanel className="outline-none" value="code">
          <CodeView className="max-h-[32rem] bg-surface-subtle dark:bg-surface" code={source} />
        </TabsPanel>
      </Tabs>
    </section>
  );
}
