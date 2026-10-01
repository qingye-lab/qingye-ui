import { Checkbox, CheckboxGroup, Fieldset, FieldsetLegend, Label } from "@yanqing/ui";

export const meta = { title: "横向排列与禁用", description: "Fieldset 命名整组；禁用的选项保持可见。" };

export default function Demo() {
  return (
    <Fieldset className="max-w-md">
      <FieldsetLegend>工作日</FieldsetLegend>
      <CheckboxGroup defaultValue={["mon", "tue", "wed", "thu", "fri"]} className="flex-row flex-wrap gap-x-5 gap-y-3">
        <Label><Checkbox value="mon" />周一</Label>
        <Label><Checkbox value="tue" />周二</Label>
        <Label><Checkbox value="wed" />周三</Label>
        <Label><Checkbox value="thu" />周四</Label>
        <Label><Checkbox value="fri" />周五</Label>
        <Label><Checkbox value="sat" disabled />周六</Label>
        <Label><Checkbox value="sun" disabled />周日</Label>
      </CheckboxGroup>
    </Fieldset>
  );
}
