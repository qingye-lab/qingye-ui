import * as React from "react";
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@qingye_lab/ui/components/collapsible";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { FilterBar, FilterBarActions, FilterBarApplied, FilterBarApply, FilterBarCancel, FilterBarClear, FilterBarFields, FilterBarStatus } from "@qingye_lab/ui/components/filter-bar";
import { Input } from "@qingye_lab/ui/components/input";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "收起次要条件", titleEn: "Secondary conditions collapsed" } satisfies DemoMeta;

type Conditions = { name: string; owner: string; tag: string };
const empty: Conditions = { name: "", owner: "", tag: "" };
const labels: Record<keyof Conditions, string> = { name: "名称", owner: "负责人", tag: "标签" };

export default function Demo() {
  const [draft, setDraft] = React.useState(empty); const [applied, setApplied] = React.useState(empty);
  const set = (key: keyof Conditions) => (event: React.ChangeEvent<HTMLInputElement>) => setDraft({ ...draft, [key]: event.target.value });
  const active = (Object.keys(labels) as (keyof Conditions)[]).filter(key => applied[key]);
  const secondary = active.filter(key => key !== "name").length;
  const dirty = (Object.keys(labels) as (keyof Conditions)[]).some(key => draft[key] !== applied[key]);
  return <FilterBar className="w-full max-w-lg" dirty={dirty} appliedSummary={active.length ? `已应用：${active.map(key => `${labels[key]}「${applied[key]}」`).join("、")}` : "已应用：全部条目"} canClear={active.length > 0 || dirty} onApply={() => setApplied(draft)} onCancel={() => setDraft(applied)} onClear={() => { setDraft(empty); setApplied(empty); }}>
    <FilterBarFields><Field><FieldLabel>名称包含</FieldLabel><Input value={draft.name} onChange={set("name")} /></Field></FilterBarFields>
    <Collapsible>
      <CollapsibleTrigger>{secondary ? `更多条件（${secondary}）` : "更多条件"}</CollapsibleTrigger>
      <CollapsiblePanel><FilterBarFields>
        <Field><FieldLabel>负责人</FieldLabel><Input value={draft.owner} onChange={set("owner")} /></Field>
        <Field><FieldLabel>标签</FieldLabel><Input value={draft.tag} onChange={set("tag")} /></Field>
      </FilterBarFields></CollapsiblePanel>
    </Collapsible>
    <FilterBarApplied /><FilterBarStatus />
    <FilterBarActions><FilterBarApply /><FilterBarCancel /><FilterBarClear /></FilterBarActions>
  </FilterBar>;
}
