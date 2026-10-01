import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@yanqing/ui/components/resizable";

export const meta = {
  title: "多栏与嵌套",
  description: "三栏布局中嵌套纵向分组。拖到最小值后继续拖动，会依次压缩更远的面板。",
};

function Pane({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="flex h-full flex-col justify-between gap-2 p-3">
      <span className="font-medium text-sm">{title}</span>
      <span className="truncate text-muted-foreground text-xs">{hint}</span>
    </div>
  );
}

export default function Demo() {
  return (
    <div className="h-80 w-full max-w-3xl overflow-hidden rounded-xl border">
      <ResizablePanelGroup>
        <ResizablePanel defaultSize={22} minSize={14}>
          <Pane hint="最小 14%" title="资源管理器" />
        </ResizablePanel>
        <ResizableHandle aria-label="调整资源管理器宽度" />
        <ResizablePanel defaultSize={56} minSize={30}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={70} minSize={25}>
              <Pane hint="最小 30%" title="编辑器" />
            </ResizablePanel>
            <ResizableHandle aria-label="调整终端高度" />
            <ResizablePanel minSize={15}>
              <Pane hint="最小 15%" title="终端" />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle aria-label="调整大纲宽度" />
        <ResizablePanel minSize={12}>
          <Pane hint="最小 12%" title="大纲" />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
