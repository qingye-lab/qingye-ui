import { useState } from "react";
import { Item } from "@qingye_lab/ui/components/item";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@qingye_lab/ui/components/resizable";
import { useUILocale } from "@qingye_lab/ui/locale";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "左右两栏", titleEn: "Two panes" } satisfies DemoMeta;

export default function Demo() {
  const { code } = useUILocale();
  const en = code.startsWith("en");
  const names = en ? ["Alpha", "Bravo", "Charlie", "Delta"] : ["甲", "乙", "丙", "丁"];
  const [current, setCurrent] = useState(0);
  const [layout, setLayout] = useState<number[]>([]);
  return <div className="flex w-full flex-col gap-(--qy-field-group-gap)">
    <ResizablePanelGroup className="h-[calc(10*var(--qy-cai))] rounded-panel border border-border" onLayout={setLayout}>
      <ResizablePanel id="resizable-demo-list" defaultSize={30} minSize="160px" maxSize={60}>
        {/* 横向内边距 = Item 行入口向两侧外扩的量，命中区正好贴到面板内缘。 */}
        <ul className="m-0 flex list-none flex-col px-(--qy-control-sm-padding) py-(--qy-panel-padding-sm)">
          {names.map((name, index) => <li key={name}><Item render={<button type="button" />} aria-current={index === current ? "true" : undefined} onClick={() => setCurrent(index)} className="aria-[current=true]:bg-surface-selected aria-[current=true]:font-medium">{name}</Item></li>)}
        </ul>
      </ResizablePanel>
      <ResizableHandle aria-label={en ? "List" : "列表"} />
      <ResizablePanel id="resizable-demo-detail" defaultSize={70} minSize={30}>
        <p className="m-0 p-(--qy-panel-padding) text-body">{names[current]}</p>
      </ResizablePanel>
    </ResizablePanelGroup>
    <p className="m-0 text-support text-muted-foreground numeric">{layout.length ? layout.map(value => `${Math.round(value)}%`).join(" / ") : "30% / 70%"}</p>
  </div>;
}
