import { Field, FieldDescription, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";
import { TagInput } from "@qingye_lab/ui/components/tag-input";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "拆分、上限与校验", titleEn: "Splitting, limit and validation" } satisfies DemoMeta;

const email = (tag: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tag) ? undefined : "不是邮箱地址";

export default function Demo() {
  return <FieldGroup className="grid w-full grid-cols-1 sm:grid-cols-2">
    <Field><FieldLabel>收件人</FieldLabel><TagInput name="to" required splitOn={/\s*[,，;；]\s*|\s+/} validate={email} addOnBlur /><FieldDescription>可一次粘贴多个地址</FieldDescription></Field>
    <Field><FieldLabel>分类</FieldLabel><TagInput max={3} defaultValue={["界面", "交互"]} /></Field>
  </FieldGroup>;
}
