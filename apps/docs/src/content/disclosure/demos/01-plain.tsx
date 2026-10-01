import { Disclosure, DisclosurePanel, DisclosureTrigger } from "@qingye/ui/components/disclosure";
import { Field, FieldDescription, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = {
  title: "表单中的高级设置",
  description: "plain：行内触发器，收起时字段仍保留取值。",
};

export default function Demo() {
  return (
    <form className="flex w-full max-w-sm flex-col gap-5">
      <Field>
        <FieldLabel>Webhook 地址</FieldLabel>
        <Input defaultValue="https://hooks.qingyan.tech/deploy" />
      </Field>
      <Disclosure>
        <DisclosureTrigger>高级设置</DisclosureTrigger>
        <DisclosurePanel className="flex flex-col gap-4">
          <Field>
            <FieldLabel>超时时间（秒）</FieldLabel>
            <Input defaultValue="30" inputMode="numeric" />
          </Field>
          <Field>
            <FieldLabel>签名密钥</FieldLabel>
            <Input placeholder="留空则不签名" />
            <FieldDescription>用于校验请求确实来自青烟云。</FieldDescription>
          </Field>
        </DisclosurePanel>
      </Disclosure>
    </form>
  );
}
