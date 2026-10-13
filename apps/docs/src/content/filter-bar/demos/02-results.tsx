import * as React from "react";
import { FilterBar, FilterBarFields, FilterBarApplied, FilterBarStatus, FilterBarActions, FilterBarApply, FilterBarCancel, FilterBarClear } from "@qingye_lab/ui/components/filter-bar";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";
import { Stack } from "@qingye_lab/ui/components/layout";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "草稿与结果分开", titleEn: "Drafts separate from results" } satisfies DemoMeta;
const items = ["接入设备", "权限与角色", "同步与导出"];
export default function Demo() {
  const [draft, setDraft] = React.useState(""); const [applied, setApplied] = React.useState(""); const results = items.filter(item => item.includes(applied));
  return <Stack><FilterBar dirty={draft !== applied} appliedSummary={applied ? `已应用名称：${applied}` : "已应用：全部本地条目"} canClear={Boolean(applied || draft)} onApply={() => setApplied(draft)} onCancel={() => setDraft(applied)} onClear={() => { setDraft(""); setApplied(""); }}><FilterBarFields><Field><FieldLabel>名称包含</FieldLabel><Input value={draft} onChange={event => setDraft(event.target.value)} /></Field></FilterBarFields><FilterBarApplied /><FilterBarStatus /><FilterBarActions><FilterBarApply /><FilterBarCancel /><FilterBarClear /></FilterBarActions></FilterBar><p className="m-0 text-support">{results.length} 项</p>{results.length ? <ul className="m-0 text-body">{results.map(item => <li key={item}>{item}</li>)}</ul> : <p className="m-0 text-body">没有符合已应用条件的条目</p>}</Stack>;
}
