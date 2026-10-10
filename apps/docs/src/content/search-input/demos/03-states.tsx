import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Stack } from "@qingye_lab/ui/components/layout";
import { SearchInput } from "@qingye_lab/ui/components/search-input";

export const meta = { title: "状态", titleEn: "States" };

export default function Demo() {
  return (
    <Stack gap="fields" className="w-full max-w-sm">
      <Field disabled><FieldLabel>禁用</FieldLabel><SearchInput defaultValue="青野" /></Field>
      <Field><FieldLabel>只读</FieldLabel><SearchInput readOnly defaultValue="青野" /></Field>
    </Stack>
  );
}
