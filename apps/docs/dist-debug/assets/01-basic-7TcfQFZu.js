const e=`import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@qingye/ui/components/resizable";
import { FileTextIcon, FolderIcon } from "lucide-react";

export const meta = { title: "基础用法", description: "拖动中间的分隔条，或聚焦后用方向键调整。" };

const files = ["季度复盘.md", "品牌规范.pdf", "首页改版.fig", "用户访谈纪要.docx"];

export default function Demo() {
  return (
    <div className="h-64 w-full max-w-2xl overflow-hidden rounded-xl border">
      <ResizablePanelGroup>
        <ResizablePanel defaultSize={34} maxSize={60} minSize={22}>
          <div className="flex h-full flex-col gap-0.5 p-2">
            <p className="flex items-center gap-2 px-2 py-1.5 font-medium text-muted-foreground text-xs">
              <FolderIcon aria-hidden="true" className="size-3.5" />
              设计资料
            </p>
            {files.map((file, index) => (
              <div
                className={\`flex items-center gap-2 truncate rounded-md px-2 py-1.5 text-sm \${index === 0 ? "bg-accent font-medium" : "text-muted-foreground"}\`}
                key={file}
              >
                <FileTextIcon aria-hidden="true" className="size-4 shrink-0 opacity-72" />
                <span className="truncate">{file}</span>
              </div>
            ))}
          </div>
        </ResizablePanel>
        <ResizableHandle aria-label="调整文件列表宽度" withHandle />
        <ResizablePanel>
          <article className="flex h-full flex-col gap-2 overflow-auto p-5">
            <h3 className="font-semibold text-sm">季度复盘</h3>
            <p className="text-muted-foreground text-sm text-pretty">
              本季度新用户留存提升 6.4%，主要来自引导流程的简化。下季度重点关注付费转化与团队协作功能的渗透率。
            </p>
          </article>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
`;export{e as default};
