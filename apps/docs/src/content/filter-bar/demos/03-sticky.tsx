import * as React from "react";
import { FilterBar, FilterBarFields, FilterBarActions, FilterBarApply } from "@qingye_lab/ui/components/filter-bar";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "吸顶", titleEn: "Sticky" } satisfies DemoMeta;
export default function Demo() {
  const [draft, setDraft] = React.useState(""); const [applied, setApplied] = React.useState("");
  return <div className="h-64 overflow-y-auto bg-surface"><FilterBar sticky dirty={draft !== applied} appliedSummary={applied ? `已应用名称：${applied}` : "已应用：全部"} onApply={() => setApplied(draft)}><FilterBarFields><Field><FieldLabel>名称包含</FieldLabel><Input value={draft} onChange={event => setDraft(event.target.value)} /></Field></FilterBarFields><FilterBarActions><FilterBarApply /></FilterBarActions></FilterBar><ul className="m-0 text-body">{Array.from({ length: 30 }, (_, index) => <li key={index}>条目 {index + 1}</li>)}</ul></div>;
}
