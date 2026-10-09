import { Combobox, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@qingye_lab/ui/components/combobox";
import { Dialog, DialogClose, DialogHeader, DialogPopup, DialogTitle } from "@qingye_lab/ui/components/dialog";
import { Inline } from "@qingye_lab/ui/components/layout";
import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { score, searchEntries, type SearchEntry } from "@/lib/search";
import { useDocsLocale } from "@/lib/docs-locale";
import { navLabel } from "@/lib/nav";
export default function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const locale = useDocsLocale(); const navigate = useNavigate(); const input = useRef<HTMLInputElement | null>(null); const navigated = useRef(false); const [query, setQuery] = useState("");
  const entries = useMemo(() => searchEntries(locale), [locale]);
  const filtered = useMemo(() => query.trim() ? entries.map(entry => ({ entry, rank: score(entry, query) })).filter(item => item.rank > 0).sort((a, b) => b.rank - a.rank).map(item => item.entry) : entries, [entries, query]);
  function changeOpen(next: boolean) { if (next) navigated.current = false; onOpenChange(next); }
  return <Combobox<SearchEntry> items={entries} filteredItems={filtered} filter={null} inline open={open} onOpenChange={changeOpen} value={null} inputValue={query} onInputValueChange={setQuery} itemToStringLabel={entry => entry.title} itemToStringValue={entry => entry.id} isItemEqualToValue={(a, b) => a.id === b.id} autoHighlight onValueChange={entry => { if (!entry) return; navigated.current = true; onOpenChange(false); navigate(entry.value); }}>
    <Dialog open={open} onOpenChange={changeOpen} onOpenChangeComplete={next => { if (!next) setQuery(""); }}><DialogPopup className="w-[min(40rem,100%)]" initialFocus={input} finalFocus={() => { if (!navigated.current) return true; const target = document.querySelector<HTMLElement>("main h1") ?? document.querySelector<HTMLElement>("main"); if (target && !target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1"); return target ?? true; }}>
      <DialogHeader><Inline className="justify-between"><DialogTitle>{locale === "en" ? "Search documentation" : "搜索文档"}</DialogTitle><DialogClose /></Inline></DialogHeader>
      <ComboboxInput ref={input} aria-label={locale === "en" ? "Search components and guides" : "搜索组件与指南"} placeholder={locale === "en" ? "Component, guide or keyword" : "组件、指南或关键词"} />
      <ComboboxEmpty>{locale === "en" ? "No matching content" : "没有匹配的内容"}</ComboboxEmpty><ComboboxList className="max-h-[min(28rem,60dvh)]">{(entry: SearchEntry) => <ComboboxItem key={entry.id} value={entry}><span className="flex min-w-0 items-baseline"><span className="grid min-w-0 flex-1"><span className="wrap-anywhere">{entry.title}</span>{entry.description ? <span className="truncate text-support text-muted-foreground">{entry.description}</span> : null}</span><span className="ms-(--qy-field-gap) shrink-0 text-support text-muted-foreground">{navLabel(entry.meta, locale)}</span></span></ComboboxItem>}</ComboboxList>
    </DialogPopup></Dialog>
  </Combobox>;
}
