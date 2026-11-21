export type MemberListProps = {
  team: string;
  load: (team: string) => Promise<string[]>;
};

export function MemberList(_props: MemberListProps) {
  return null;
}
