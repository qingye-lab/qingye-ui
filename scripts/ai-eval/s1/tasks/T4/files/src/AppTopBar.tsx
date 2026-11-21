export type NavItem = { label: string; to: string };
export type AppTopBarProps = {
  navItems: NavItem[];
  syncing: boolean;
  onOpenSearch: () => void;
};

export function AppTopBar(_props: AppTopBarProps) {
  return null;
}
