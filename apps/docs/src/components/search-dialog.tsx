import { Command, CommandCollection, CommandDialog, CommandDialogPopup, CommandEmpty, CommandFooter, CommandGroup, CommandGroupLabel, CommandInput, CommandItem, CommandList, CommandPanel } from "@qingye/ui/components/command";
import { Kbd, KbdGroup } from "@qingye/ui/components/kbd";
import { ArrowDownIcon, ArrowUpIcon, BoxIcon, CornerDownLeftIcon, FileTextIcon } from "lucide-react";
import { Fragment, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "@/lib/types";
import { score, searchEntries, type SearchEntry } from "@/lib/search";
import { focusPageHeading } from "@/lib/use-route-effects";
import { useDocsLocale } from "@/lib/docs-locale";
import { navLabel } from "@/lib/nav";

interface Group {
  value: string;
  items: SearchEntry[];
}

function browseGroups(entries: SearchEntry[]): Group[] {
  const docs = entries.filter((entry) => entry.group === "文档");
  const byCategory = CATEGORIES.map((category) => ({
    value: category,
    items: entries.filter((entry) => entry.group === "组件" && entry.meta === category),
  }));
  const known = new Set<string>(CATEGORIES);
  const other = entries.filter((entry) => entry.group === "组件" && !known.has(entry.meta));
  return [{ value: "文档", items: docs }, ...byCategory, { value: "其他", items: other }].filter((group) => group.items.length);
}

function resultGroups(entries: SearchEntry[], query: string): Group[] {
  const ranked = entries
    .map((entry) => ({ entry, rank: score(entry, query) }))
    .filter((item) => item.rank > 0)
    .sort((a, b) => b.rank - a.rank);
  const pick = (group: SearchEntry["group"]) => ranked.filter((item) => item.entry.group === group).map((item) => item.entry);
  return [
    { value: "组件", items: pick("组件") },
    { value: "文档", items: pick("文档") },
  ].filter((group) => group.items.length);
}

export default function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const navigate = useNavigate();
  const locale = useDocsLocale();
  const entries = useMemo(() => searchEntries(locale), [locale]);
  const all = useMemo(() => browseGroups(entries), [entries]);
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => (query.trim() ? resultGroups(entries, query) : all), [entries, all, query]);
  const navigated = useRef(false);
  const searching = query.trim().length > 0;

  const choose = (entry: SearchEntry) => {
    navigated.current = true;
    onOpenChange(false);
    navigate(entry.value);
  };

  return (
    <CommandDialog
      onOpenChange={(next) => {
        if (next) navigated.current = false;
        onOpenChange(next);
      }}
      onOpenChangeComplete={(next) => {
        if (!next) setQuery("");
      }}
      open={open}
    >
      <CommandDialogPopup
        aria-label="搜索文档"
        finalFocus={() => {
          if (!navigated.current) return true;
          focusPageHeading();
          return false;
        }}
      >
        <Command filteredItems={filtered} items={all} onValueChange={setQuery} value={query}>
          <CommandInput aria-label="搜索组件与文档" placeholder="搜索组件、指南或关键词…" />
          <CommandPanel>
            <CommandEmpty>没有找到与“{query.trim()}”相关的内容。</CommandEmpty>
            <CommandList className="max-h-[min(24rem,60dvh)]">
              {(group: Group, index: number) => (
                <Fragment key={group.value}>
                  <CommandGroup className={index > 0 ? "mt-2" : undefined} items={group.items}>
                    <CommandGroupLabel>{navLabel(group.value, locale)}</CommandGroupLabel>
                    <CommandCollection>
                      {(entry: SearchEntry) => (
                        <CommandItem className="gap-2.5" key={entry.id} onClick={() => choose(entry)} value={entry}>
                          {entry.group === "文档" ? (
                            <FileTextIcon aria-hidden="true" className="size-4 shrink-0 opacity-60" />
                          ) : (
                            <BoxIcon aria-hidden="true" className="size-4 shrink-0 opacity-60" />
                          )}
                          <span className="truncate">{entry.title}</span>
                          {entry.hint ? <span className="truncate text-muted-foreground text-caption">{entry.hint}</span> : null}
                          {searching && entry.group === "组件" ? (
                            <span className="ms-auto shrink-0 ps-3 text-muted-foreground text-caption">{navLabel(entry.meta, locale)}</span>
                          ) : null}
                        </CommandItem>
                      )}
                    </CommandCollection>
                  </CommandGroup>
                </Fragment>
              )}
            </CommandList>
          </CommandPanel>
          <CommandFooter className="pointer-coarse:hidden">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <KbdGroup>
                  <Kbd>
                    <ArrowUpIcon aria-hidden="true" />
                  </Kbd>
                  <Kbd>
                    <ArrowDownIcon aria-hidden="true" />
                  </Kbd>
                </KbdGroup>
                选择
              </span>
              <span className="flex items-center gap-1.5">
                <Kbd>
                  <CornerDownLeftIcon aria-hidden="true" />
                </Kbd>
                打开
              </span>
            </div>
            <span className="flex items-center gap-1.5">
              <Kbd>Esc</Kbd>
              关闭
            </span>
          </CommandFooter>
        </Command>
      </CommandDialogPopup>
    </CommandDialog>
  );
}
