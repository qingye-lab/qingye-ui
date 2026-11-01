import { Field, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";
import { Select, SelectItem, SelectPopup, SelectTrigger } from "@qingye_lab/ui/components/select";

export const meta = { title: "多选", titleEn: "Multiple" };

const labels = [
  { value: "design", label: "设计" },
  { value: "frontend", label: "前端" },
  { value: "backend", label: "后端" },
  { value: "ops", label: "运维" },
  { value: "docs", label: "文档" },
];

export default function Demo() {
  return (
    <FieldGroup className="grid w-full items-start sm:grid-cols-2">
      <Field name="area">
        <FieldLabel>负责范围</FieldLabel>
        <Select multiple items={labels} defaultValue={["frontend", "docs"]}>
          <SelectTrigger />
          <SelectPopup>{labels.map(item => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectPopup>
        </Select>
      </Field>
      <Field name="involved">
        <FieldLabel>参与范围</FieldLabel>
        <Select multiple items={labels} defaultValue={["design", "frontend", "backend", "docs"]}>
          <SelectTrigger />
          <SelectPopup>{labels.map(item => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectPopup>
        </Select>
      </Field>
    </FieldGroup>
  );
}
