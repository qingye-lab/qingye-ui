import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";
import { TagInput } from "@qingye_lab/ui/components/tag-input";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "集合与草稿", titleEn: "Collection and draft" } satisfies DemoMeta;

export default function Demo() {
  return <FieldGroup className="grid w-full grid-cols-1 sm:grid-cols-2">
    <Field><FieldLabel>分类</FieldLabel><TagInput name="tags" defaultValue={["React", "TypeScript"]} /><FieldDescription>Enter 确认，区分大小写去重</FieldDescription></Field>
    <Field invalid><FieldLabel>待核对</FieldLabel><TagInput defaultValue={["界面"]} defaultDraft="交互" /><FieldError>分类尚未核对。</FieldError></Field>
    <Field><FieldLabel>只读</FieldLabel><TagInput defaultValue={["React", "TypeScript"]} readOnly /></Field>
    <Field disabled><FieldLabel>禁用</FieldLabel><TagInput defaultValue={["React", "TypeScript"]} defaultDraft="草稿" /></Field>
  </FieldGroup>;
}
