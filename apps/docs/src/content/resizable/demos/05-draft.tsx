import { Button } from "@qingye/ui/components/button";
import { Label } from "@qingye/ui/components/label";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup, type ResizablePanelHandle } from "@qingye/ui/components/resizable";
import { Textarea } from "@qingye/ui/components/textarea";
import { useRef, useState } from "react";

export const meta = { title: "收起与继续编辑" };

export default function Demo() {
  const editor = useRef<ResizablePanelHandle>(null);
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <Button onClick={() => collapsed ? editor.current?.expand() : editor.current?.collapse()} size="sm" variant="outline">
        {collapsed ? "继续编辑" : "收起编辑区"}
      </Button>
      <ResizablePanelGroup className="h-64 overflow-hidden rounded-xl border">
        <ResizablePanel collapsible defaultSize={55} minSize={30} onCollapse={() => setCollapsed(true)} onExpand={() => setCollapsed(false)} panelRef={editor}>
          <div className="flex h-full flex-col gap-2 p-3">
            <Label htmlFor="panel-draft">发布草稿</Label>
            <Textarea className="min-h-0 flex-1" defaultValue="本次发布改善了窄屏阅读。" id="panel-draft" />
          </div>
        </ResizablePanel>
        <ResizableHandle aria-label="调整编辑区宽度" />
        <ResizablePanel minSize={30}>
          <div className="p-3 text-sm">版本 0.3.0<br />发布前需要完成复核。</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
