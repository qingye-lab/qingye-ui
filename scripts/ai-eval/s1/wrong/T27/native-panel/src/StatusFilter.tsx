import { useEffect, useRef, useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Checkbox } from "@qingye_lab/ui/components/checkbox";

export type StatusFilterProps = {
  value: string[];
  onApply: (next: string[]) => void;
};

const STATUSES = ["待处理", "进行中", "已完成"];

// 错解：自建浮层（role=dialog），不用库的 Popover；关闭语义本身正确
export function StatusFilter({ value, onApply }: StatusFilterProps) {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const [draft, setDraft] = useState<string[]>(value);
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", h);
    const d = (e: Event) => { if (panel.current && !panel.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("pointerdown", d);
    return () => { document.removeEventListener("keydown", h); document.removeEventListener("pointerdown", d); };
  }, []);
  return (
    <div>
      <Button variant="bordered" onClick={() => { setDraft(value); setOpen(true); }}>筛选</Button>
      {open && (
        <>
          <div ref={panel} role="dialog" aria-label="筛选">
            {STATUSES.map((s) => (
              <label key={s}>
                <Checkbox checked={draft.includes(s)}
                  onCheckedChange={(c) => setDraft((d) => c ? [...d, s] : d.filter((x) => x !== s))} />
                {s}
              </label>
            ))}
            <Button onClick={() => { onApply(STATUSES.filter((s) => draft.includes(s))); setOpen(false); }}>应用</Button>
          </div>
        </>
      )}
    </div>
  );
}
