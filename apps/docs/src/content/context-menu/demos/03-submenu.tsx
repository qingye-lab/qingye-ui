import { ContextMenu, ContextMenuItem, ContextMenuPopup, ContextMenuSeparator, ContextMenuSub, ContextMenuSubPopup, ContextMenuSubTrigger, ContextMenuTrigger } from "@yanqing/ui/components/context-menu";

export const meta = { title: "子菜单", description: "层级不超过两级；更深的选择改用对话框。" };

const rows = [
  { id: "#2318", title: "3 号仓库温控器离线" },
  { id: "#2317", title: "扫码枪固件升级失败" },
];

export default function Demo() {
  return (
    <div className="grid w-full max-w-sm divide-y rounded-xl border text-sm">
      {rows.map((row) => (
        <ContextMenu key={row.id}>
          <ContextMenuTrigger className="flex select-none gap-3 px-4 py-3 data-popup-open:bg-accent">
            <span className="numeric text-muted-foreground">{row.id}</span>
            <span className="truncate">{row.title}</span>
          </ContextMenuTrigger>
          <ContextMenuPopup className="w-44">
            <ContextMenuItem>打开</ContextMenuItem>
            <ContextMenuItem>在新标签页打开</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuSub>
              <ContextMenuSubTrigger>设置状态</ContextMenuSubTrigger>
              <ContextMenuSubPopup className="w-36">
                <ContextMenuItem>待处理</ContextMenuItem>
                <ContextMenuItem>处理中</ContextMenuItem>
                <ContextMenuItem>已解决</ContextMenuItem>
              </ContextMenuSubPopup>
            </ContextMenuSub>
            <ContextMenuSub>
              <ContextMenuSubTrigger>分配给</ContextMenuSubTrigger>
              <ContextMenuSubPopup className="w-36">
                <ContextMenuItem>周以宁</ContextMenuItem>
                <ContextMenuItem>许清和</ContextMenuItem>
                <ContextMenuItem>林嘉禾</ContextMenuItem>
              </ContextMenuSubPopup>
            </ContextMenuSub>
          </ContextMenuPopup>
        </ContextMenu>
      ))}
    </div>
  );
}
