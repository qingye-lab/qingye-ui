import { NativeSelect } from "@qingye_lab/ui/components/native-select";

export default function Cover() {
  return <NativeSelect aria-label="排序" defaultValue="one" className="w-full">
    <option value="one">按名称排序</option>
    <option value="two">按时间排序</option>
  </NativeSelect>;
}
