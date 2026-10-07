import { useId } from "react";
import { Label } from "@qingye/ui/components/label";
import { Stack } from "@qingye/ui/components/layout";
import { NativeSelect } from "@qingye/ui/components/native-select";

export const meta = { title: "多选与禁用", titleEn: "Multiple and disabled" };
export default function Demo() {
  const id = useId();
  // 多选形态是原生列表；选项是真实的同步频率，不是甲乙丙。
  return <Stack gap="fields" className="w-full max-w-sm">
    <Stack gap="field"><Label htmlFor={`${id}-multiple`}>触发时机</Label><NativeSelect id={`${id}-multiple`} multiple size={4} defaultValue={["daily"]}><optgroup label="定期"><option value="hourly">每小时一次</option><option value="daily">每天一次</option><option value="weekly">每周一次</option></optgroup><optgroup label="手动"><option value="manual">只在手动触发时</option></optgroup></NativeSelect></Stack>
    <Stack gap="field"><Label htmlFor={`${id}-disabled`}>保留策略（不可更改）</Label><NativeSelect id={`${id}-disabled`} disabled><option value="daily">每天一次</option></NativeSelect></Stack>
  </Stack>;
}
