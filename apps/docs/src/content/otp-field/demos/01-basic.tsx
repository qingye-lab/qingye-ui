import { Field, FieldDescription, FieldLabel } from "@qingye/ui/components/field";
import { OTPField, OTPFieldInput } from "@qingye/ui/components/otp-field";

export const meta = { title: "基础用法", description: "6 位数字验证码。" };

export default function Demo() {
  return (
    <Field className="items-center">
      <FieldLabel>短信验证码</FieldLabel>
      <OTPField length={6}>
        {Array.from({ length: 6 }, (_, index) => (
          <OTPFieldInput key={index} />
        ))}
      </OTPField>
      <FieldDescription>演示号码：138 **** 6021</FieldDescription>
    </Field>
  );
}
