import { Checkbox } from "@qingye/ui/components/checkbox";
import { Fieldset, FieldsetLegend } from "@qingye/ui/components/fieldset";
import { Label } from "@qingye/ui/components/label";

export const meta = { title: "作为问题", description: "variant=\"label\" 的标题与字段标签同级，适合一组复选框。" };

export default function Demo() {
  return (
    <Fieldset className="max-w-sm gap-3">
      <FieldsetLegend variant="label">通过哪些方式通知你？</FieldsetLegend>
      <Label>
        <Checkbox defaultChecked name="channel" value="sms" />
        短信
      </Label>
      <Label>
        <Checkbox defaultChecked name="channel" value="email" />
        邮件
      </Label>
      <Label>
        <Checkbox name="channel" value="wecom" />
        企业微信
      </Label>
    </Fieldset>
  );
}
