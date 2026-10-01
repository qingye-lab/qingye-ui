import { Fieldset, FieldsetLegend } from "@qingye/ui/components/fieldset";
import { Label } from "@qingye/ui/components/label";
import { Radio, RadioGroup } from "@qingye/ui/components/radio-group";

export const meta = { title: "横向、禁用与错误" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-6">
      <Fieldset>
        <FieldsetLegend>巡检频率</FieldsetLegend>
        <RadioGroup defaultValue="week" className="flex-row flex-wrap gap-x-5 gap-y-3">
          <Label><Radio value="day" />每天</Label>
          <Label><Radio value="week" />每周</Label>
          <Label><Radio value="month" />每月</Label>
        </RadioGroup>
      </Fieldset>
      <Fieldset>
        <FieldsetLegend>机房（已锁定）</FieldsetLegend>
        <RadioGroup defaultValue="hz" disabled className="flex-row flex-wrap gap-x-5 gap-y-3">
          <Label><Radio value="hz" />杭州 IDC</Label>
          <Label><Radio value="sh" />上海 IDC</Label>
        </RadioGroup>
      </Fieldset>
      <Fieldset>
        <FieldsetLegend>故障等级</FieldsetLegend>
        <RadioGroup aria-describedby="level-error" className="flex-row flex-wrap gap-x-5 gap-y-3">
          <Label><Radio value="p1" aria-invalid />P1 紧急</Label>
          <Label><Radio value="p2" aria-invalid />P2 严重</Label>
          <Label><Radio value="p3" aria-invalid />P3 一般</Label>
        </RadioGroup>
        <p id="level-error" className="text-destructive-foreground text-xs">请选择故障等级</p>
      </Fieldset>
    </div>
  );
}
