import { OTPField, OTPFieldInput } from "@yanqing/ui/components/otp-field";

export const meta = { title: "字母数字与占位", description: "validationType=\"alphanumeric\" 接受字母和数字，并统一转为大写。" };

export default function Demo() {
  return (
    <OTPField
      length={5}
      validationType="alphanumeric"
      normalizeValue={(value) => value.toUpperCase()}
      aria-label="兑换码"
    >
      {Array.from({ length: 5 }, (_, index) => (
        <OTPFieldInput key={index} placeholder="·" />
      ))}
    </OTPField>
  );
}
