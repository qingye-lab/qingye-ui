import { useId } from "react";
import { Input } from "@qingye/ui/components/input";
import { Label } from "@qingye/ui/components/label";
import { Stack } from "@qingye/ui/components/layout";

export const meta = { title: "名称关联", titleEn: "Label association" };
export default function Demo() {
  const id = useId();
  return <Stack gap="field" className="w-full max-w-sm"><Label htmlFor={id}>名称</Label><Input id={id} /></Stack>;
}
