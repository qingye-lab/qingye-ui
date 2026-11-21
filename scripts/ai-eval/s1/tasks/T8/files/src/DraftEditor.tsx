export class ConflictError extends Error {}

export type DraftEditorProps = {
  initial: string;
  save: (text: string, options?: { force?: boolean }) => Promise<void>;
  reload: () => Promise<string>;
};

export function DraftEditor(_props: DraftEditorProps) {
  return null;
}
