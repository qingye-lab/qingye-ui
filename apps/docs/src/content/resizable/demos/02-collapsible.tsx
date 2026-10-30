import { useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@qingye_lab/ui/components/resizable";
import { useUILocale } from "@qingye_lab/ui/locale";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "可折叠", titleEn: "Collapsible" } satisfies DemoMeta;

export default function Demo() {
  const { code } = useUILocale();
  const en = code.startsWith("en");
  const [collapsed, setCollapsed] = useState(false);
  return <div className="flex w-full flex-col gap-(--qy-field-group-gap)">
    <ResizablePanelGroup orientation="vertical" className="h-[calc(10*var(--qy-cai))] rounded-panel border border-border">
      <ResizablePanel defaultSize={70} minSize={30}><p className="m-0 p-(--qy-panel-padding) text-body">{en ? "Content" : "正文"}</p></ResizablePanel>
      <ResizableHandle aria-label={en ? "Content" : "正文"} />
      <ResizablePanel id="resizable-demo-console" defaultSize={30} minSize={20} collapsible onCollapse={() => setCollapsed(true)} onExpand={() => setCollapsed(false)}>
        <p className="m-0 p-(--qy-panel-padding) text-body">{en ? "Output" : "输出"}</p>
      </ResizablePanel>
    </ResizablePanelGroup>
    <p className="m-0 text-support text-muted-foreground">{collapsed ? (en ? "Output collapsed" : "输出已折叠") : (en ? "Output expanded" : "输出已展开")}</p>
  </div>;
}
