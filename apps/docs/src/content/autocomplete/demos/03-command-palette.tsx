import { useEffect, useState } from "react";
import { Autocomplete, AutocompleteCollection, AutocompleteControl, AutocompleteEmpty, AutocompleteGroup, AutocompleteGroupLabel, AutocompleteInput, AutocompleteItem, AutocompleteList } from "@qingye_lab/ui/components/autocomplete";
import { Dialog, DialogPopup, DialogTitle, DialogTrigger } from "@qingye_lab/ui/components/dialog";
import { Inline } from "@qingye_lab/ui/components/layout";
import { Kbd } from "@qingye_lab/ui/components/kbd";
export const meta = { title: "命令面板", titleEn: "Command palette" };
const commands = [
  { value: "页面", items: ["概览", "设备", "告警", "设置"] },
  { value: "操作", items: ["新建设备", "导出告警", "切换主题"] },
];
export default function Demo() {
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
  return <Inline gap="actions">
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>搜索 <Kbd>⌘K</Kbd></DialogTrigger>
      <DialogPopup className="w-[min(32rem,100%)]">
        <DialogTitle className="sr-only">命令面板</DialogTitle>
        <Autocomplete open inline items={commands} autoHighlight="always" keepHighlight>
          <div className="min-w-0">
          <AutocompleteControl><AutocompleteInput aria-label="搜索页面与操作" placeholder="搜索页面与操作" /></AutocompleteControl>
          <AutocompleteEmpty>没有匹配项</AutocompleteEmpty>
          <AutocompleteList className="mt-(--qy-field-gap) max-h-72">{(group: (typeof commands)[number]) => <AutocompleteGroup key={group.value} items={group.items}><AutocompleteGroupLabel>{group.value}</AutocompleteGroupLabel><AutocompleteCollection>{(item: string) => <AutocompleteItem key={item} value={item} onClick={() => { setLast(item); setOpen(false); }}>{item}</AutocompleteItem>}</AutocompleteCollection></AutocompleteGroup>}</AutocompleteList>
          </div>
        </Autocomplete>
      </DialogPopup>
    </Dialog>
    <output className="text-support text-muted-foreground">{last || "—"}</output>
  </Inline>;
}
