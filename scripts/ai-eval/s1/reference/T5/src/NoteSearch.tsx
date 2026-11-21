import * as React from "react";
import { SearchInput } from "@qingye_lab/ui/components/search-input";

export type NoteSearchProps = { onQueryChange: (query: string) => void };

export function NoteSearch({ onQueryChange }: NoteSearchProps) {
  const [query, setQuery] = React.useState("");
  const update = (next: string) => { setQuery(next); onQueryChange(next); };
  return <SearchInput aria-label="搜索笔记" clearLabel="清除" value={query} onValueChange={value => update(String(value ?? ""))} onClear={() => { if (query) update(""); }} />;
}
