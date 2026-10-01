const _03Description = 'import { Checkbox, Field, FieldContent, FieldDescription, FieldLabel } from "@yanqing/ui";\n\nexport const meta = { title: "带说明", description: "放进 Field，说明会作为复选框的描述读出。" };\n\nexport default function Demo() {\n  return (\n    <Field orientation="horizontal" className="max-w-sm items-start">\n      <Checkbox defaultChecked className="mt-px" />\n      <FieldContent>\n        <FieldLabel>同步到企业通讯录</FieldLabel>\n        <FieldDescription>新成员入职后自动加入「研发中心」部门，并开通邮箱与 VPN。</FieldDescription>\n      </FieldContent>\n    </Field>\n  );\n}\n';
export {
  _03Description as default
};
