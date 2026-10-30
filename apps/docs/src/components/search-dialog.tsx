import { Command, CommandEmpty, CommandInput, CommandItem, CommandList, type CommandFilter } from "@qingye_lab/ui/components/command";
import { Dialog, DialogClose, DialogHeader, DialogPopup, DialogTitle } from "@qingye_lab/ui/components/dialog";
import { Inline } from "@qingye_lab/ui/components/layout";
import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { score, searchEntries } from "@/lib/search";
import { useDocsLocale } from "@/lib/docs-locale";
import { navLabel } from "@/lib/nav";

/** 匹配与排序在这里（score）：Command 只负责呈现，所以它自己的过滤恒为真，条目按 score 的次序渲染。 */
const showAll: CommandFilter = () => true;

export default function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const locale = useDocsLocale(); const navigate = useNavigate(); const input = useRef<HTMLInputElement | null>(null); const navigated = useRef(false); const [query, setQuery] = useState("");
  const entries = useMemo(() => searchEntries(locale), [locale]);
  const filtered = useMemo(() => query.trim() ? entries.map(entry => ({ entry, rank: score(entry, query) })).filter(item => item.rank > 0).sort((a, b) => b.rank - a.rank).map(item => item.entry) : entries, [entries, query]);
  const destinations = useMemo(() => new Map(entries.map(entry => [entry.id, entry.value])), [entries]);
  function changeOpen(next: boolean) { if (next) navigated.current = false; onOpenChange(next); }
  return <Dialog open={open} onOpenChange={changeOpen} onOpenChangeComplete={next => { if (!next) setQuery(""); }}><DialogPopup className="w-[min(40rem,100%)]" initialFocus={input} finalFocus={() => { if (!navigated.current) return true; const target = document.querySelector<HTMLElement>("main h1") ?? document.querySelector<HTMLElement>("main"); if (target && !target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1"); return target ?? true; }}>
    <DialogHeader><Inline className="justify-between"><DialogTitle>{locale === "en" ? "Search documentation" : "搜索文档"}</DialogTitle><DialogClose /></Inline></DialogHeader>
    <Command filter={showAll} query={query} onQueryChange={setQuery} onItemSelect={id => { const destination = destinations.get(id); if (!destination) return; navigated.current = true; onOpenChange(false); navigate(destination); }}>
      <CommandInput ref={input} aria-label={locale === "en" ? "Search components and guides" : "搜索组件与指南"} placeholder={locale === "en" ? "Component, guide or keyword" : "组件、指南或关键词"} />
      <CommandList aria-label={locale === "en" ? "Components and guides" : "组件与指南"} className="max-h-[min(28rem,60dvh)]">
        {filtered.map(entry => <CommandItem key={entry.id} value={entry.id}>
          <span className="flex min-w-0 flex-1 items-baseline gap-(--qy-field-gap)"><span className="shrink-0">{entry.title}</span>{entry.description ? <span className="truncate text-support text-muted-foreground">{entry.description}</span> : null}</span>
          <span className="ms-(--qy-field-gap) shrink-0 text-support text-muted-foreground">{navLabel(entry.meta, locale)}</span>
        </CommandItem>)}
        <CommandEmpty>{locale === "en" ? "No matching content" : "没有匹配的内容"}</CommandEmpty>
      </CommandList>
    </Command>
  </DialogPopup></Dialog>;
}
