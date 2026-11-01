import { Field, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";
import { OtpField } from "@qingye_lab/ui/components/otp-field";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "分组、占位与遮蔽", titleEn: "Groups, placeholder and mask" } satisfies DemoMeta;

export default function Demo() {
  return <FieldGroup className="grid w-full grid-cols-1 sm:grid-cols-2">
    <Field><FieldLabel>验证码</FieldLabel><OtpField length={6} groups={[3, 3]} inputMode="numeric" placeholder="·" defaultValue="123" /></Field>
    <Field><FieldLabel>序列号</FieldLabel><OtpField length={8} groups={[2, 3, 3]} placeholder="_" /></Field>
    <Field><FieldLabel>恢复码</FieldLabel><OtpField length={6} mask inputMode="numeric" defaultValue="4821" /></Field>
  </FieldGroup>;
}
