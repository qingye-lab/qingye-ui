import { useEffect, useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@qingye_lab/ui/components/command";
import { Kbd } from "@qingye_lab/ui/components/kbd";
import { useUILocale } from "@qingye_lab/ui/locale";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "⌘K 打开", titleEn: "Open with ⌘K" } satisfies DemoMeta;
export default function Demo() {
  const { code } = useUILocale();
  const en = code.startsWith("en");
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState("");
  // 快捷键是应用的事：库不监听全局按键，避免与站点已有的快捷键冲突。
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setOpen(value => !value); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);
  return <div className="flex flex-wrap items-center gap-(--qy-action-gap)">
    <Button variant="bordered" onClick={() => setOpen(true)}>{en ? "Search" : "搜索"} <Kbd>⌘K</Kbd></Button>
    <CommandDialog open={open} onOpenChange={setOpen} aria-label={en ? "Command palette" : "命令面板"} onItemSelect={setLast}>
      <CommandInput aria-label={en ? "Search pages and actions" : "搜索页面与操作"} placeholder={en ? "Search pages and actions" : "搜索页面与操作"} />
      <CommandList aria-label={en ? "Pages and actions" : "页面与操作"}>
        <CommandGroup heading={en ? "Pages" : "页面"}>
          <CommandItem value={en ? "Overview" : "概览"}>{en ? "Overview" : "概览"}</CommandItem>
          <CommandItem value={en ? "Devices" : "设备"}>{en ? "Devices" : "设备"}</CommandItem>
          <CommandItem value={en ? "Settings" : "设置"} shortcut="⌘,">{en ? "Settings" : "设置"}</CommandItem>
        </CommandGroup>
        <CommandGroup heading={en ? "Actions" : "操作"}>
          <CommandItem value={en ? "Export" : "导出"} shortcut={["⌘", "E"]}>{en ? "Export" : "导出"}</CommandItem>
          <CommandItem value={en ? "Switch theme" : "切换主题"}>{en ? "Switch theme" : "切换主题"}</CommandItem>
        </CommandGroup>
        <CommandEmpty />
      </CommandList>
    </CommandDialog>
    <output className="text-support text-muted-foreground">{last || "—"}</output>
  </div>;
}
