import { useEffect, useRef, useState } from "react";

export type Recipient = { id: string; name: string };
export type RecipientListProps = { initialRecipients: Recipient[]; onChange?: (ids: string[]) => void };

export function RecipientList({ initialRecipients, onChange }: RecipientListProps) {
  const [list, setList] = useState(initialRecipients);
  const container = useRef<HTMLUListElement>(null);
  const pending = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    if (pending.current === undefined) return;
    const id = pending.current;
    pending.current = undefined;
    const button = id ? container.current?.querySelector<HTMLElement>(`[data-recipient-id="${id}"] button`) : null;
    (button ?? container.current)?.focus();
  }, [list]);

  const remove = (index: number) => {
    const next = list.filter((_, i) => i !== index);
    pending.current = (next[index] ?? next[index - 1])?.id ?? null;
    setList(next);
    onChange?.(next.map(r => r.id));
  };

  return (
    <ul ref={container} tabIndex={-1} style={{ display: "flex", gap: 8, listStyle: "none", margin: 0, padding: 0 }}>
      {list.map((r, i) => (
        <li key={r.id} data-recipient-id={r.id}>
          <span style={{ display: "inline-flex", gap: 4 }}>
            <span>{r.name}</span>
            <button type="button" aria-label={`移除 ${r.name}`} onClick={() => remove(i)}>×</button>
          </span>
        </li>
      ))}
    </ul>
  );
}
