import * as React from "react";
import { FilterBar, FilterBarFields, FilterBarApplied, FilterBarStatus, FilterBarActions, FilterBarApply, FilterBarCancel, FilterBarClear } from "@qingye_lab/ui/components/filter-bar";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "草稿与已应用条件", titleEn: "Draft and applied conditions" } satisfies DemoMeta;
export default function Demo() {
  const [draft, setDraft] = React.useState(""); const [applied, setApplied] = React.useState("");
  return <FilterBar className="w-full max-w-sm" dirty={draft !== applied} appliedSummary={applied ? `已应用名称：${applied}` : "已应用：全部本地条目"} canClear={Boolean(applied || draft)} onApply={() => setApplied(draft)} onCancel={() => setDraft(applied)} onClear={() => { setDraft(""); setApplied(""); }}>
    <FilterBarFields><Field><FieldLabel>名称包含</FieldLabel><Input value={draft} onChange={event => setDraft(event.target.value)} /></Field></FilterBarFields>
    <FilterBarApplied /><FilterBarStatus />
    <FilterBarActions><FilterBarApply /><FilterBarCancel /><FilterBarClear /></FilterBarActions>
  </FilterBar>;
}
