import { useId } from "react";
import { Input } from "@qingye_lab/ui/components/input";
import { Label } from "@qingye_lab/ui/components/label";
import { Stack } from "@qingye_lab/ui/components/layout";

export const meta = { title: "禁用控件", titleEn: "Disabled control" };
export default function Demo() {
  const id = useId();
  return <Stack gap="field" className="w-full max-w-sm"><Label htmlFor={id}>名称</Label><Input id={id} disabled /></Stack>;
}
