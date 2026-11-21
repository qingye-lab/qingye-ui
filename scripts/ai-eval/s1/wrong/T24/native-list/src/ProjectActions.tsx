import { useState } from "react";

export type ProjectActionsProps = {
  archived: boolean;
  onRename: () => void;
  onTransfer: () => void;
  onCopyLink: () => void;
};

// 错解：自己用 button 加列表做下拉，不用库的 Menu；禁用本身正确
export function ProjectActions({ archived, onRename, onTransfer, onCopyLink }: ProjectActionsProps) {
  const [open, setOpen] = useState(false);
  const item = (label: string, disabled: boolean, run: () => void) => (
    <li role="none">
      <button type="button" role="menuitem" aria-disabled={disabled || undefined} onClick={() => { if (!disabled) { run(); setOpen(false); } }}>{label}</button>
    </li>
  );
  return (
    <div>
      <button type="button" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen(o => !o)}>项目操作</button>
      {open && (
        <ul role="menu">
          {item("重命名", archived, onRename)}
          {item("转交负责人", archived, onTransfer)}
          {item("复制链接", false, onCopyLink)}
        </ul>
      )}
    </div>
  );
}
