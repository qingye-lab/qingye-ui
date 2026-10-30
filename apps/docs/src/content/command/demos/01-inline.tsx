import { useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@qingye_lab/ui/components/command";
import { useUILocale } from "@qingye_lab/ui/locale";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "嵌在页面里", titleEn: "Inline" } satisfies DemoMeta;
export default function Demo() {
  const { code } = useUILocale();
  const en = code.startsWith("en");
  const [last, setLast] = useState("");
  return <div className="grid w-full max-w-md gap-(--qy-field-gap)">
    <Command className="rounded-overlay border border-border bg-surface-raised p-(--qy-overlay-inset)">
      <CommandInput aria-label={en ? "Search pages and actions" : "搜索页面与操作"} placeholder={en ? "Search pages and actions" : "搜索页面与操作"} />
      <CommandList aria-label={en ? "Pages and actions" : "页面与操作"}>
        <CommandGroup heading={en ? "Pages" : "页面"}>
          <CommandItem value={en ? "Overview" : "概览"} keywords={["overview", "home", "首页"]} onSelect={setLast}>{en ? "Overview" : "概览"}</CommandItem>
          <CommandItem value={en ? "Devices" : "设备"} keywords={["devices", "硬件"]} onSelect={setLast}>{en ? "Devices" : "设备"}</CommandItem>
          <CommandItem value={en ? "Alerts" : "告警"} disabled>{en ? "Alerts" : "告警"}</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading={en ? "Actions" : "操作"}>
          <CommandItem value={en ? "Export" : "导出"} shortcut={["⌘", "E"]} onSelect={setLast}>{en ? "Export" : "导出"}</CommandItem>
          <CommandItem value={en ? "Switch theme" : "切换主题"} keywords={["theme", "dark", "深色"]} onSelect={setLast}>{en ? "Switch theme" : "切换主题"}</CommandItem>
        </CommandGroup>
        <CommandEmpty />
      </CommandList>
    </Command>
    <output className="text-support text-muted-foreground">{last || "—"}</output>
  </div>;
}
