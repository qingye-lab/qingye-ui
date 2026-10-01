import { Checkbox } from "@yanqing/ui/components/checkbox";
import { Field, FieldContent, FieldDescription, FieldLabel, FieldSeparator } from "@yanqing/ui/components/field";
import { Switch } from "@yanqing/ui/components/switch";

export const meta = {
  title: "横向",
  description: "orientation=\"horizontal\" 用于开关与复选框；FieldContent 包住标签和说明，控件与第一行对齐。",
};

export default function Demo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel>设备离线提醒</FieldLabel>
          <FieldDescription>设备超过 10 分钟未上报时，通过短信通知负责人。</FieldDescription>
        </FieldContent>
        <Switch defaultChecked />
      </Field>
      <FieldSeparator />
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel>每周运维报告</FieldLabel>
          <FieldDescription>每周一 9:00 发送到团队邮箱。</FieldDescription>
        </FieldContent>
        <Switch />
      </Field>
      <FieldSeparator />
      <Field orientation="horizontal">
        <Checkbox defaultChecked />
        <FieldContent>
          <FieldLabel>同步到企业微信</FieldLabel>
          <FieldDescription>工单状态变化时推送到“运维值班”群。</FieldDescription>
        </FieldContent>
      </Field>
      <Field orientation="horizontal">
        <Checkbox />
        <FieldLabel>同时抄送给我</FieldLabel>
      </Field>
    </div>
  );
}
