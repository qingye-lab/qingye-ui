import { Button, buttonVariants } from "@qingye_lab/ui/components/button";
import { cn } from "@qingye_lab/ui/utils";
import { Prose } from "@qingye_lab/ui/components/prose";
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@qingye_lab/ui/components/collapsible";
import { IconChevronDown, IconExternalLink } from "@tabler/icons-react";
import { useMemo } from "react";
import { cleanDemoSource } from "@/lib/highlight";
import type { LoadedDemo } from "@/lib/registry";
import { CodeView } from "./code-block";
import { CopyCodeButton } from "./copy-code-button";
import { H3 } from "./prose";
import { useDocsLocale } from "@/lib/docs-locale";
import { localizedMeta } from "@/lib/localized-meta";
import { localePath } from "@/lib/paths";
import { ContentBoundary } from "./content-boundary";
import "../pages/docs/component.css";

/**
 * One example is one framed object: the live stage, a toolbar row, and the source that opens below
 * the toolbar inside the same frame. The frame is the only boundary; the code area has none of its own.
 * The section is its own article scope (Prose without a frame), so its heading is the article's h3.
 */
export function DemoFrame({ slug, demo }: { slug: string; demo: LoadedDemo }) {
  const locale = useDocsLocale();
  const en = locale === "en";
  const meta = localizedMeta(demo.meta, locale);
  const source = useMemo(() => cleanDemoSource(demo.source), [demo.source]);
  const Demo = demo.default;
  const id = `demo-${demo.id}`;
  return (
    <Prose aria-labelledby={id} className="component-demo" data-demo={demo.id} framed={false} render={<section />}>
      <H3 id={id}>{meta.title}</H3>
      {meta.description ? <p className="component-demo-description" data-slot="docs-demo-description">{meta.description}</p> : null}
      <Collapsible className="component-demo-frame">
        <div className="component-demo-preview" data-demo-preview={`${slug}/${demo.id}`} data-flush={meta.flush ? "" : undefined}>
          <ContentBoundary title={en ? "This example is unavailable" : "这个示例暂时无法显示"}>
            <Demo />
          </ContentBoundary>
        </div>
        <div className="component-demo-bar">
          <CollapsibleTrigger aria-describedby={id} className="group/trigger" render={<Button size="sm" variant="quiet" />}>
            {en ? "Code" : "代码"}
            <IconChevronDown
              aria-hidden="true"
              className="-rotate-90 text-muted-foreground transition-[rotate] duration-(--qy-duration-base) ease-(--qy-ease-out) group-data-[panel-open]/trigger:rotate-0 motion-reduce:transition-none"
            />
          </CollapsibleTrigger>
          <div className="flex items-center">
            <a
              aria-label={en ? "Open in playground" : "在演练场打开"}
              className={cn(buttonVariants({ shape: "icon", size: "sm", variant: "quiet" }), "text-muted-foreground not-aria-disabled:hover:text-foreground")}
              href={localePath(`/playground/${slug}#${id}`, locale)}
              rel="noreferrer"
              target="_blank"
            >
              <IconExternalLink aria-hidden="true" />
            </a>
            <CopyCodeButton value={source} />
          </div>
        </div>
        <CollapsiblePanel>
          <CodeView className="component-demo-code" code={source} />
        </CollapsiblePanel>
      </Collapsible>
    </Prose>
  );
}
