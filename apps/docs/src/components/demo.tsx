import { cn, Tabs, TabsList, TabsPanel, TabsTab } from "@yanqing/ui";
import { Component, useMemo, type ReactNode } from "react";
import { cleanDemoSource } from "@/lib/highlight";
import type { LoadedDemo } from "@/lib/registry";
import { CodeView } from "./code-block";
import { CopyCodeButton } from "./copy-code-button";
import { H3 } from "./prose";

/** Keeps one broken demo from taking the whole page down. */
class DemoBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <p className="text-muted-foreground text-sm" role="status">
          这个示例暂时无法渲染：<span className="font-mono text-xs">{this.state.error.message}</span>
        </p>
      );
    }
    return this.props.children;
  }
}

export function DemoFrame({ slug, demo }: { slug: string; demo: LoadedDemo }) {
  const source = useMemo(() => cleanDemoSource(demo.source), [demo.source]);
  const Demo = demo.default;
  const id = `demo-${demo.id}`;
  return (
    <section aria-labelledby={id} className="mt-10 first:mt-6" data-demo={demo.id}>
      <H3 className="mt-0 mb-1.5" id={id}>
        {demo.meta.title}
      </H3>
      {demo.meta.description ? (
        <p className="mb-3 max-w-[42rem] text-pretty text-[0.875rem] text-muted-foreground leading-relaxed">{demo.meta.description}</p>
      ) : null}
      <Tabs className={cn("gap-0 overflow-hidden rounded-xl border bg-background", !demo.meta.description && "mt-3")} defaultValue="preview">
        <div className="flex items-center justify-between gap-2 border-b bg-surface-subtle/60 py-1 ps-1.5 pe-1.5 dark:bg-surface/40">
          <TabsList aria-label={`${demo.meta.title}：预览或代码`} size="sm">
            <TabsTab value="preview">预览</TabsTab>
            <TabsTab value="code">代码</TabsTab>
          </TabsList>
          <CopyCodeButton value={source} />
        </div>
        <TabsPanel
          className={cn(
            "outline-none",
            demo.meta.flush ? "min-w-0" : "flex min-h-36 min-w-0 flex-wrap items-center justify-center gap-4 p-6 sm:p-10",
          )}
          data-demo-preview={`${slug}/${demo.id}`}
          keepMounted
          value="preview"
        >
          <DemoBoundary>
            <Demo />
          </DemoBoundary>
        </TabsPanel>
        <TabsPanel className="outline-none" value="code">
          <CodeView className="max-h-[32rem] bg-surface-subtle dark:bg-surface" code={source} />
        </TabsPanel>
      </Tabs>
    </section>
  );
}
