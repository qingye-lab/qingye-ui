import { useState } from "react";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Stack } from "@qingye_lab/ui/components/layout";
import type { TreeNode } from "@qingye_lab/ui/components/tree";
import { TreeSelect } from "@qingye_lab/ui/components/tree-select";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "搜索", titleEn: "Search" };

const organizations = (english: boolean): TreeNode[] => [
  { id: "east", label: english ? "East region" : "华东区", children: [
    { id: "east.sh", label: english ? "Shanghai" : "上海分公司" },
    { id: "east.hz", label: english ? "Hangzhou" : "杭州分公司" },
    { id: "east.nj", label: english ? "Nanjing" : "南京分公司" },
  ] },
  { id: "south", label: english ? "South region" : "华南区", children: [
    { id: "south.gz", label: english ? "Guangzhou" : "广州分公司" },
    { id: "south.sz", label: english ? "Shenzhen" : "深圳分公司" },
  ] },
  { id: "north", label: english ? "North region" : "华北区", children: [
    { id: "north.bj", label: english ? "Beijing" : "北京分公司" },
    { id: "north.tj", label: english ? "Tianjin" : "天津分公司" },
  ] },
  { id: "hq", label: english ? "Headquarters" : "总部" },
];

export default function Demo() {
  const english = useUILocale().code.startsWith("en");
  const [single, setSingle] = useState<string | null>(null);
  const [multiple, setMultiple] = useState<string[]>([]);
  const nodes = organizations(english);
  return (
    <Stack className="w-full max-w-xs">
      <Field>
        <FieldLabel>{english ? "Organization" : "所属组织"}</FieldLabel>
        <TreeSelect searchable nodes={nodes} value={single} onValueChange={setSingle} />
      </Field>
      <Field>
        <FieldLabel>{english ? "Organizations" : "适用组织"}</FieldLabel>
        <TreeSelect searchable multiple nodes={nodes} value={multiple} onValueChange={setMultiple} />
      </Field>
    </Stack>
  );
}
