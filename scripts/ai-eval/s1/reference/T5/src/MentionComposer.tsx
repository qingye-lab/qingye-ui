import * as React from "react";
import { Composer, ComposerInput, ComposerSubmit, ComposerToolbar, composerValueToText, type ComposerTrigger } from "@qingye_lab/ui/components/composer";

export type Person = { id: string; name: string };
export type OutgoingMessage = { text: string; mentionIds: string[] };
export type MentionComposerProps = { people: Person[]; onSend: (message: OutgoingMessage) => void };

export function MentionComposer({ people, onSend }: MentionComposerProps) {
  const mention = React.useMemo<ComposerTrigger>(() => ({
    char: "@",
    getItems: query => people.filter(person => person.name.includes(query)).map(person => ({ id: person.id, label: person.name })),
  }), [people]);
  return (
    <Composer onSubmit={(segments, details) => {
      onSend({ text: composerValueToText(segments), mentionIds: segments.flatMap(segment => segment.type === "token" ? [segment.id] : []) });
      details.clear();
    }}>
      <ComposerInput aria-label="消息" triggers={[mention]} />
      <ComposerToolbar><ComposerSubmit /></ComposerToolbar>
    </Composer>
  );
}
