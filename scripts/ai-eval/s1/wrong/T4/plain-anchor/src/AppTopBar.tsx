import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Button, buttonVariants } from "@qingye_lab/ui/components/button";
import { Drawer, DrawerContent, DrawerPopup, DrawerTitle, DrawerTrigger } from "@qingye_lab/ui/components/drawer";
import { Progress, ProgressIndicator, ProgressTrack } from "@qingye_lab/ui/components/progress";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@qingye_lab/ui/components/tooltip";

const IconMenu = () => <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16" /></svg>;
const IconSearch = () => <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>;

export type NavItem = { label: string; to: string };
export type AppTopBarProps = {
  navItems: NavItem[];
  syncing: boolean;
  onOpenSearch: () => void;
};

export function AppTopBar({ navItems, syncing, onOpenSearch }: AppTopBarProps) {
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onOpenSearch();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onOpenSearch]);

  return (
    <header className="flex items-center gap-(--qy-action-gap)">
      <Drawer swipeDirection="left" open={navOpen} onOpenChange={setNavOpen}>
        <DrawerTrigger render={<Button variant="quiet" shape="icon" aria-label="打开导航" />}><IconMenu /></DrawerTrigger>
        <DrawerPopup>
          <DrawerTitle>导航</DrawerTitle>
          <DrawerContent>
            <nav><ul>{navItems.map(item => <li key={item.to}><Link to={item.to} onClick={() => setNavOpen(false)}>{item.label}</Link></li>)}</ul></nav>
          </DrawerContent>
        </DrawerPopup>
      </Drawer>
      <Tooltip>
        <TooltipTrigger render={<Button variant="quiet" shape="icon" aria-label="搜索" onClick={onOpenSearch} />}><IconSearch /></TooltipTrigger>
        <TooltipPopup><kbd>⌘K</kbd></TooltipPopup>
      </Tooltip>
      {syncing && <Progress value={null} aria-label="正在同步" className="w-24"><ProgressTrack><ProgressIndicator /></ProgressTrack></Progress>}
      <a href="/reports/new" className={buttonVariants({ variant: "solid" })}>新建报表</a>
    </header>
  );
}
