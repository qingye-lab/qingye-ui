import { Toc, useTocHeadings, useTocScrollSpy } from "@qingye/ui/components/toc";
import { Inline } from "@qingye/ui/components/layout";
import * as React from "react";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "随滚动更新当前项", titleEn: "Updates the current item as the reader scrolls" } satisfies DemoMeta;

const sections = [
  { id: "demo-overview", level: 2 as const, title: "概览", body: "每次同步开始时，青野会先记录本次要处理的范围，再逐条写入。" },
  { id: "demo-retry", level: 3 as const, title: "重试与核实", body: "默认重试 3 次，间隔依次为 1、5、15 分钟；超过次数仍失败，转入人工核实队列。" },
  { id: "demo-unknown", level: 3 as const, title: "结果未知时", body: "直接重试可能写入两次；先在 Webhook 回调或审计日志里核实，再决定下一步。" },
  { id: "demo-recovery", level: 2 as const, title: "恢复与返回", body: "放弃一条记录不会影响其余记录；核实后可以随时手动重新触发。" },
];

export default function Demo() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const headings = useTocHeadings(containerRef);
  const current = useTocScrollSpy(headings, { container: containerRef });
  return <Inline gap="panel" align="start">
    <Toc items={headings} current={current} className="w-40 shrink-0" />
    <div ref={containerRef} className="h-56 w-80 overflow-y-auto rounded-item border border-border p-(--qy-panel-padding-sm)">
      {sections.map((section) => {
        const Heading = section.level === 2 ? "h2" : "h3";
        return <section key={section.id} className="mb-(--qy-field-group-gap)">
          <Heading id={section.id} className="m-0 mb-(--qy-field-gap) text-heading text-foreground">{section.title}</Heading>
          <p className="m-0 text-body text-foreground">{section.body}</p>
        </section>;
      })}
    </div>
  </Inline>;
}
