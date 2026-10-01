import { Button } from "@yanqing/ui/components/button";
import { Field, FieldGroup, FieldLabel, FieldSeparator } from "@yanqing/ui/components/field";
import { Input } from "@yanqing/ui/components/input";

export const meta = { title: "分组与分隔", description: "FieldGroup 统一纵向间距；FieldSeparator 可带一段说明文字。" };

export default function Demo() {
  return (
    <FieldGroup className="max-w-xs">
      <Field>
        <FieldLabel>手机号</FieldLabel>
        <Input autoComplete="tel" inputMode="tel" placeholder="138 0000 0000" />
      </Field>
      <Button>获取验证码</Button>
      <FieldSeparator>或</FieldSeparator>
      <Button variant="outline">使用企业微信登录</Button>
    </FieldGroup>
  );
}
