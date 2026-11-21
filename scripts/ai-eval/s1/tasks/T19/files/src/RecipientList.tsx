export type Recipient = { id: string; name: string };

export type RecipientListProps = {
  initialRecipients: Recipient[];
  onChange?: (ids: string[]) => void;
};

export function RecipientList(_props: RecipientListProps) {
  return null;
}
