import * as React from "react";
import { Textarea } from "@qingye_lab/ui/components/textarea";

export type Person = { id: string; name: string };
export type OutgoingMessage = { text: string; mentionIds: string[] };
export type MentionComposerProps = { people: Person[]; onSend: (message: OutgoingMessage) => void };

export function MentionComposer({ people, onSend }: MentionComposerProps) {
  const [text, setText] = React.useState("");
  return <Textarea aria-label="消息" value={text} onChange={event => setText(event.target.value)} onKeyDown={event => {
    if (event.key !== "Enter" || event.shiftKey) return;
    event.preventDefault();
    const mentionIds = people.filter(person => text.includes("@" + person.name)).map(person => person.id);
    onSend({ text: text.trim(), mentionIds });
    setText("");
  }} />;
}
