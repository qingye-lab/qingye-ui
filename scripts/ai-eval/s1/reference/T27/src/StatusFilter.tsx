import { useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Checkbox } from "@qingye_lab/ui/components/checkbox";
import { Popover, PopoverClose, PopoverPopup, PopoverTrigger } from "@qingye_lab/ui/components/popover";

export type StatusFilterProps = {
  value: string[];
  onApply: (next: string[]) => void;
};

const STATUSES = ["待处理", "进行中", "已完成"];

// 关闭只收起浮层，不代表提交或撤销（指南 popover.md）：草稿只在“应用”时交给应用
export function StatusFilter({ value, onApply }: StatusFilterProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<string[]>(value);
  return (
    <Popover open={open} onOpenChange={(next) => { if (next) setDraft(value); setOpen(next); }}>
      <PopoverTrigger render={<Button variant="bordered" />}>筛选</PopoverTrigger>
      <PopoverPopup>
        <div className="flex flex-col gap-2">
          {STATUSES.map((s) => (
            <label key={s} className="flex items-center gap-2">
              <Checkbox checked={draft.includes(s)}
                onCheckedChange={(c) => setDraft((d) => c ? [...d, s] : d.filter((x) => x !== s))} />
              {s}
            </label>
          ))}
          <PopoverClose render={<Button onClick={() => onApply(STATUSES.filter((s) => draft.includes(s)))} />}>应用</PopoverClose>
        </div>
      </PopoverPopup>
    </Popover>
  );
}
