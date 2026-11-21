export class UnknownOutcomeError extends Error {}

export type NicknameFieldProps = {
  value: string;
  save: (next: string) => Promise<void>;
};

export function NicknameField(_props: NicknameFieldProps) {
  return null;
}
