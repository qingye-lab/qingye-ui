import { useId } from "react";
import { Label } from "@qingye/ui/components/label";
import { Stack } from "@qingye/ui/components/layout";
import { NativeSelect } from "@qingye/ui/components/native-select";

export const meta = { title: "多选与禁用", titleEn: "Multiple and disabled" };
export default function Demo() {
  const id = useId();
  return <Stack gap="fields" className="w-full max-w-sm"><Stack gap="field"><Label htmlFor={`${id}-multiple`}>多选</Label><NativeSelect id={`${id}-multiple`} multiple size={4} defaultValue={["one"]}><optgroup label="选项"><option value="one">一</option><option value="two">二</option><option value="three">三</option></optgroup></NativeSelect></Stack><Stack gap="field"><Label htmlFor={`${id}-disabled`}>禁用</Label><NativeSelect id={`${id}-disabled`} disabled><option value="one">选项一</option></NativeSelect></Stack></Stack>;
}
