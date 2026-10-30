import { useState } from "react";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import type { TreeNode } from "@qingye_lab/ui/components/tree";
import { TreeSelect } from "@qingye_lab/ui/components/tree-select";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "勾选多选", titleEn: "Checkable" };

const organizations = (english: boolean): TreeNode[] => [
  { id: "east", label: english ? "East region" : "华东区", children: [
    { id: "east.sh", label: english ? "Shanghai" : "上海分公司" },
    { id: "east.hz", label: english ? "Hangzhou" : "杭州分公司" },
    { id: "east.nj", label: english ? "Nanjing" : "南京分公司" },
  ] },
  { id: "south", label: english ? "South region" : "华南区", children: [
    { id: "south.gz", label: english ? "Guangzhou" : "广州分公司" },
    { id: "south.sz", label: english ? "Shenzhen" : "深圳分公司", disabled: true },
  ] },
  { id: "hq", label: english ? "Headquarters" : "总部" },
];

export default function Demo() {
  const { code } = useUILocale();
  const english = code.startsWith("en");
  const [value, setValue] = useState<string[]>(["east.sh", "east.hz"]);
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel>{english ? "Organizations" : "适用组织"}</FieldLabel>
      <TreeSelect multiple nodes={organizations(english)} value={value} onValueChange={setValue} />
    </Field>
  );
}
