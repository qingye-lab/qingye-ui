import * as React from "react";

export type NoteSearchProps = { onQueryChange: (query: string) => void };

export function NoteSearch({ onQueryChange }: NoteSearchProps) {
  const [query, setQuery] = React.useState("");
  const update = (next: string) => { setQuery(next); onQueryChange(next); };
  return <div>
    <input type="search" aria-label="搜索笔记" value={query} onChange={event => update(event.target.value)} />
    {query && <button type="button" onClick={() => update("")}>清除</button>}
  </div>;
}
