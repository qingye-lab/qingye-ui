export type Person = { id: string; name: string };
export type OutgoingMessage = { text: string; mentionIds: string[] };
export type MentionComposerProps = { people: Person[]; onSend: (message: OutgoingMessage) => void };

export function MentionComposer(_props: MentionComposerProps) {
  return null;
}
