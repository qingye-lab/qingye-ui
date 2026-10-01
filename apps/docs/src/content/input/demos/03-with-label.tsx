import { Field, FieldDescription, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "配合标签", description: "放在 Field 中，标签、说明与输入框自动关联。" };

export default function Demo() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel>
        联系电话 <span className="text-destructive-foreground">*</span>
      </FieldLabel>
      <Input autoComplete="tel" inputMode="tel" placeholder="138 0000 0000" required type="tel" />
      <FieldDescription>仅用于工单进度通知。</FieldDescription>
    </Field>
  );
}
