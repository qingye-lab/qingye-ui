const n=`import { ContextMenu, ContextMenuItem, ContextMenuPopup, ContextMenuSeparator, ContextMenuShortcut, ContextMenuTrigger } from "@qingye/ui/components/context-menu";
import { CopyIcon, DownloadIcon, FileTextIcon, PencilIcon, Trash2Icon } from "lucide-react";

export const meta = { title: "基础用法", description: "在卡片上点击右键，触屏设备上长按。" };

export default function Demo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex w-full max-w-xs select-none items-center gap-3 rounded-xl border p-4 text-sm">
        <FileTextIcon aria-hidden="true" className="size-8 shrink-0 text-muted-foreground" strokeWidth={1.5} />
        <div className="grid min-w-0 gap-0.5">
          <span className="truncate font-medium">2026 年第三季度巡检报告.pdf</span>
          <span className="text-muted-foreground text-xs">右键点击或长按查看操作</span>
        </div>
      </ContextMenuTrigger>
      <ContextMenuPopup className="w-48">
        <ContextMenuItem>
          <PencilIcon />
          重命名
          <ContextMenuShortcut>F2</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <CopyIcon />
          创建副本
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <DownloadIcon />
          下载
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <Trash2Icon />
          移到回收站
          <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuPopup>
    </ContextMenu>
  );
}
`;export{n as default};
