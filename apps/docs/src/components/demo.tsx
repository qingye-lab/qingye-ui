import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@qingye_lab/ui/components/collapsible";
import { useMemo } from "react";
import { cleanDemoSource } from "@/lib/highlight";
import type { LoadedDemo } from "@/lib/registry";
import { CodeView } from "./code-block";
import { CopyCodeButton } from "./copy-code-button";
import { H3 } from "./prose";
import { useDocsLocale } from "@/lib/docs-locale";
import { localizedMeta } from "@/lib/localized-meta";
import { ContentBoundary } from "./content-boundary";
import "../pages/docs/component.css";

/**
 * One example: the live preview stays in view; its source opens beneath it on the same surface,
 * and can be copied without opening.
 */
export function DemoFrame({ slug, demo }: { slug: string; demo: LoadedDemo }) {
  const locale = useDocsLocale();
  const en = locale === "en";
  const meta = localizedMeta(demo.meta, locale);
  const source = useMemo(() => cleanDemoSource(demo.source), [demo.source]);
  const Demo = demo.default;
  const id = `demo-${demo.id}`;
  return (
    <section aria-labelledby={id} className="component-demo" data-demo={demo.id}>
      <H3 className="mt-0 mb-(--qy-field-gap)" id={id}>
        {meta.title}
      </H3>
      {meta.description ? <p className="component-demo-description">{meta.description}</p> : null}
      <div className="component-demo-surface">
        <div className="component-demo-preview" data-demo-preview={`${slug}/${demo.id}`} data-flush={meta.flush ? "" : undefined}>
          <ContentBoundary title={en ? "This example is unavailable" : "这个示例暂时无法显示"}>
            <Demo />
          </ContentBoundary>
        </div>
        <Collapsible className="component-demo-source">
          <div className="component-demo-bar">
            <CollapsibleTrigger aria-describedby={id}>{en ? "Code" : "代码"}</CollapsibleTrigger>
            <CopyCodeButton value={source} />
          </div>
          <CollapsiblePanel>
            <CodeView className="component-demo-code" code={source} />
          </CollapsiblePanel>
        </Collapsible>
      </div>
    </section>
  );
}
