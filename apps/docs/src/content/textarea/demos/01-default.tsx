import { Textarea } from "@qingye/ui/components/textarea";

export const meta = { title: "默认", description: "高度随内容自动增长。" };

export default function Demo() {
  return <Textarea aria-label="备注" className="max-w-sm" placeholder="补充说明，例如送货前请电话联系" />;
}
