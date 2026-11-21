import { useEffect, useRef, useState } from "react";
import { Chip } from "@qingye_lab/ui/components/chip";

export type Recipient = { id: string; name: string };
export type RecipientListProps = { initialRecipients: Recipient[]; onChange?: (ids: string[]) => void };

// 指南 chip.md：移除之后焦点会随被移除的节点一起消失，由调用方把焦点移到相邻记号或所在容器。
export function RecipientList({ initialRecipients, onChange }: RecipientListProps) {
  const [list, setList] = useState(initialRecipients);
  const container = useRef<HTMLUListElement>(null);
  const pending = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    if (pending.current === undefined) return;
    const id = pending.current;
    pending.current = undefined;
    const button = id ? container.current?.querySelector<HTMLElement>(`[data-recipient-id="${id}"] [data-slot="chip-remove"]`) : null;
    (button ?? container.current)?.focus();
  }, [list]);

  const remove = (index: number) => {
    const next = list.filter((_, i) => i !== index);
    pending.current = (next[index] ?? next[index - 1])?.id ?? null;
    setList(next);
    onChange?.(next.map(r => r.id));
  };

  return (
    <ul ref={container} tabIndex={-1} className="m-0 flex list-none flex-wrap gap-2 p-0 outline-none">
      {list.map((r, i) => (
        <li key={r.id} data-recipient-id={r.id}>
          <Chip onRemove={() => remove(i)}>{r.name}</Chip>
        </li>
      ))}
    </ul>
  );
}
