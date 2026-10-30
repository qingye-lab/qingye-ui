import { useState } from "react";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import type { TreeNode } from "@qingye_lab/ui/components/tree";
import { TreeSelect } from "@qingye_lab/ui/components/tree-select";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "单选", titleEn: "Single" };

const departments = (english: boolean): TreeNode[] => [
  { id: "rd", label: english ? "Engineering" : "研发中心", children: [
    { id: "rd.web", label: english ? "Web" : "前端组" },
    { id: "rd.server", label: english ? "Server" : "服务端组" },
    { id: "rd.qa", label: english ? "Quality" : "质量组", disabled: true },
  ] },
  { id: "ops", label: english ? "Operations" : "运营中心", children: [
    { id: "ops.growth", label: english ? "Growth" : "增长组" },
    { id: "ops.support", label: english ? "Support" : "客服组" },
  ] },
  { id: "hr", label: english ? "People" : "人力资源部" },
];

export default function Demo() {
  const { code } = useUILocale();
  const english = code.startsWith("en");
  const [value, setValue] = useState<string | null>("rd.web");
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel>{english ? "Department" : "所属部门"}</FieldLabel>
      <TreeSelect nodes={departments(english)} value={value} onValueChange={setValue} />
    </Field>
  );
}
