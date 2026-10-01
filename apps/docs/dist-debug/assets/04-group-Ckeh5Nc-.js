const _04Group = 'import { Button, Field, FieldGroup, FieldLabel, FieldSeparator, Input } from "@yanqing/ui";\n\nexport const meta = { title: "分组与分隔", description: "FieldGroup 统一纵向间距；FieldSeparator 可带一段说明文字。" };\n\nexport default function Demo() {\n  return (\n    <FieldGroup className="max-w-xs">\n      <Field>\n        <FieldLabel>手机号</FieldLabel>\n        <Input autoComplete="tel" inputMode="tel" placeholder="138 0000 0000" />\n      </Field>\n      <Button>获取验证码</Button>\n      <FieldSeparator>或</FieldSeparator>\n      <Button variant="outline">使用企业微信登录</Button>\n    </FieldGroup>\n  );\n}\n';
export {
  _04Group as default
};
