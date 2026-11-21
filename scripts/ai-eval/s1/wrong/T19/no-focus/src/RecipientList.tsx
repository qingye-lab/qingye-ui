import { useState } from "react";
import { Chip } from "@qingye_lab/ui/components/chip";
import { Inline } from "@qingye_lab/ui/components/layout";

export type Recipient = { id: string; name: string };
export type RecipientListProps = { initialRecipients: Recipient[]; onChange?: (ids: string[]) => void };

export function RecipientList({ initialRecipients, onChange }: RecipientListProps) {
  const [list, setList] = useState(initialRecipients);
  const remove = (id: string) => {
    const next = list.filter(r => r.id !== id);
    setList(next);
    onChange?.(next.map(r => r.id));
  };
  return (
    <Inline gap="panel" align="center">
      {list.map(r => <Chip key={r.id} onRemove={() => remove(r.id)}>{r.name}</Chip>)}
    </Inline>
  );
}
