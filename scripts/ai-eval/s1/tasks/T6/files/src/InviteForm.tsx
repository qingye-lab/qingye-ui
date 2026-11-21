export type InviteFormProps = {
  checkEmail: (email: string) => Promise<boolean>;
  sendInvite: (email: string) => Promise<void>;
};

export function InviteForm(_props: InviteFormProps) {
  return null;
}
