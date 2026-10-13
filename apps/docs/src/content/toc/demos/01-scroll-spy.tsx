import { Toc, useTocHeadings, useTocScrollSpy } from "@qingye_lab/ui/components/toc";
import { Inline } from "@qingye_lab/ui/components/layout";
import { ScrollArea } from "@qingye_lab/ui/components/scroll-area";
import * as React from "react";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "随滚动更新当前项", titleEn: "Updates the current item as the reader scrolls" } satisfies DemoMeta;

const sections = [
  { id: "demo-install", level: 2 as const, title: "安装", body: "用包管理器加入 @qingye_lab/ui，组件与样式在同一个包里。" },
  { id: "demo-styles", level: 3 as const, title: "引入样式", body: "在应用入口引入一次 styles.css；之后每个组件都按同一套令牌取值。" },
  { id: "demo-theme", level: 3 as const, title: "明暗与品牌", body: "ThemeProvider 写入明暗；品牌只写在 html 的 data-brand 上，两者互不覆盖。" },
  { id: "demo-density", level: 2 as const, title: "密度", body: "在容器上写 data-density=\"compact\"，其中的控件与间距一起收紧，字号不变。" },
];

export default function Demo() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const headings = useTocHeadings(containerRef);
  const current = useTocScrollSpy(headings, { container: containerRef });
  return <Inline gap="panel" align="start">
    <Toc items={headings} current={current} className="w-40 shrink-0" />
    <ScrollArea ref={containerRef} role="region" aria-label="接入说明" className="h-56 w-80 rounded-item border border-border p-(--qy-panel-padding-sm)">
      {sections.map((section) => {
        const Heading = section.level === 2 ? "h2" : "h3";
        return <section key={section.id} className="mb-(--qy-field-group-gap)">
          <Heading id={section.id} className="m-0 mb-(--qy-field-gap) text-heading text-foreground">{section.title}</Heading>
          <p className="m-0 text-body text-foreground">{section.body}</p>
        </section>;
      })}
    </ScrollArea>
  </Inline>;
}
