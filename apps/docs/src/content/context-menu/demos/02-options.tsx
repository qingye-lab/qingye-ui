import { ContextMenu, ContextMenuCheckboxItem, ContextMenuGroup, ContextMenuGroupLabel, ContextMenuPopup, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuTrigger } from "@qingye/ui/components/context-menu";

export const meta = { title: "勾选与单选", description: "在看板空白处右键，调整视图选项；切换时菜单保持打开。" };

export default function Demo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-36 w-full max-w-sm select-none items-center justify-center rounded-xl border border-dashed text-muted-foreground text-sm">
        在看板空白处右键
      </ContextMenuTrigger>
      <ContextMenuPopup className="w-48">
        <ContextMenuGroup>
          <ContextMenuGroupLabel>分组方式</ContextMenuGroupLabel>
          <ContextMenuRadioGroup defaultValue="status">
            <ContextMenuRadioItem value="status">按状态</ContextMenuRadioItem>
            <ContextMenuRadioItem value="assignee">按负责人</ContextMenuRadioItem>
            <ContextMenuRadioItem value="warehouse">按仓库</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuGroupLabel>显示</ContextMenuGroupLabel>
          <ContextMenuCheckboxItem defaultChecked>负责人头像</ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem defaultChecked>截止日期</ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem>已完成的工单</ContextMenuCheckboxItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem variant="switch">紧凑卡片</ContextMenuCheckboxItem>
      </ContextMenuPopup>
    </ContextMenu>
  );
}
