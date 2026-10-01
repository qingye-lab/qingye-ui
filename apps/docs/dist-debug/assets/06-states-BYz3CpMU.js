const n=`import { Field, FieldError, FieldLabel } from "@qingye/ui/components/field";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from "@qingye/ui/components/input-group";
import { ArrowRightIcon } from "lucide-react";

export const meta = { title: "状态", description: "无效与禁用作用于整个组合。" };

export default function Demo() {
  return (
    <div className="grid w-full max-w-xs gap-5">
      <Field invalid>
        <FieldLabel>回调地址</FieldLabel>
        <InputGroup>
          <InputGroupInput className="*:[input]:ps-0!" defaultValue="hooks.example" />
          <InputGroupAddon>
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <FieldError>请填写完整域名，例如 hooks.example.com</FieldError>
      </Field>
      <Field disabled>
        <FieldLabel>订阅邮箱</FieldLabel>
        <InputGroup>
          <InputGroupInput placeholder="name@company.com" type="email" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton aria-label="订阅" disabled>
              <ArrowRightIcon aria-hidden="true" />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </Field>
    </div>
  );
}
`;export{n as default};
