import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@qingye_lab/ui/components/resizable";

export default function Cover() {
  return <ResizablePanelGroup className="h-[calc(5*var(--qy-cai))] w-full">
    <ResizablePanel defaultSize={35} minSize={20} className="p-(--qy-panel-padding-sm) text-body">列表</ResizablePanel>
    <ResizableHandle aria-label="列表" />
    <ResizablePanel defaultSize={65} className="p-(--qy-panel-padding-sm) text-body">详情</ResizablePanel>
  </ResizablePanelGroup>;
}
