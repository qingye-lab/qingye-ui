const _02LabelLegend = 'import { Checkbox, Fieldset, FieldsetLegend, Label } from "@yanqing/ui";\n\nexport const meta = { title: "作为问题", description: "variant=\\"label\\" 的标题与字段标签同级，适合一组复选框。" };\n\nexport default function Demo() {\n  return (\n    <Fieldset className="max-w-sm gap-3">\n      <FieldsetLegend variant="label">通过哪些方式通知你？</FieldsetLegend>\n      <Label>\n        <Checkbox defaultChecked name="channel" value="sms" />\n        短信\n      </Label>\n      <Label>\n        <Checkbox defaultChecked name="channel" value="email" />\n        邮件\n      </Label>\n      <Label>\n        <Checkbox name="channel" value="wecom" />\n        企业微信\n      </Label>\n    </Fieldset>\n  );\n}\n';
export {
  _02LabelLegend as default
};
