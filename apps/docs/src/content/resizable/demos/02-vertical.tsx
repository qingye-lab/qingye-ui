import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@yanqing/ui/components/resizable";

export const meta = { title: "纵向", description: "direction=\"vertical\" 上下排列，外层需要确定的高度。" };

export default function Demo() {
  return (
    <div className="h-72 w-full max-w-2xl overflow-hidden rounded-xl border">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={64} minSize={30}>
          <pre className="h-full overflow-auto p-4 font-mono text-xs leading-relaxed">
            <code>{`export async function loadReport(id: string) {
  const response = await fetch(\`/api/reports/\${id}\`);
  if (!response.ok) throw new Error("报表加载失败");
  return response.json();
}`}</code>
          </pre>
        </ResizablePanel>
        <ResizableHandle aria-label="调整终端高度" />
        <ResizablePanel minSize={18}>
          <div className="flex h-full flex-col gap-1 overflow-auto bg-muted/48 p-4 font-mono text-muted-foreground text-xs">
            <span>$ pnpm test</span>
            <span className="text-success-foreground">✓ 42 项测试通过（1.8 秒）</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
