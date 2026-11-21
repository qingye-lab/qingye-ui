import { ContextMenu, ContextMenuItem, ContextMenuPopup, ContextMenuPortal, ContextMenuPositioner, ContextMenuTrigger } from "@qingye_lab/ui/components/context-menu";
import { Inline } from "@qingye_lab/ui/components/layout";

export type FileRowProps = {
  name: string;
  onRename: () => void;
  onDelete: () => void;
};

// 指南 context-menu.md：右键不是唯一入口；可见 Menu 与右键菜单复用同一组命令
export function FileRow({ name, onRename, onDelete }: FileRowProps) {
  const commands = [
    { label: "重命名", run: onRename },
    { label: "删除", run: onDelete },
  ];
  return (
    <ContextMenu>
      <ContextMenuTrigger render={<div />}>
        <Inline gap="panel" align="center" justify="between">
          <span>{name}</span>
        </Inline>
      </ContextMenuTrigger>
      <ContextMenuPortal>
        <ContextMenuPositioner>
          <ContextMenuPopup>
            {commands.map((c) => <ContextMenuItem key={c.label} onClick={c.run}>{c.label}</ContextMenuItem>)}
          </ContextMenuPopup>
        </ContextMenuPositioner>
      </ContextMenuPortal>
    </ContextMenu>
  );
}
