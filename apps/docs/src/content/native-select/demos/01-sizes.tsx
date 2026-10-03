import { useId } from "react";
import { Label } from "@qingye/ui/components/label";
import { Stack } from "@qingye/ui/components/layout";
import { NativeSelect } from "@qingye/ui/components/native-select";

export const meta = { title: "尺寸", titleEn: "Sizes" };
export default function Demo() {
  const id = useId();
  return <Stack gap="fields" className="w-full max-w-sm">{(["xs", "sm", "md", "lg", "xl"] as const).map(size => <Stack key={size} gap="field"><Label htmlFor={`${id}-${size}`}>{size}</Label><NativeSelect id={`${id}-${size}`} controlSize={size}><option value="one">选项一</option><option value="two">选项二</option></NativeSelect></Stack>)}</Stack>;
}
