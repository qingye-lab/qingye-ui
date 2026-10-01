import { OTPField, OTPFieldInput, OTPFieldSeparator } from "@yanqing/ui";

export const meta = { title: "分组与大尺寸", description: "3-3 分组更易核对；lg 适合独立的验证页面。" };

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <OTPField length={6} aria-label="邮箱验证码">
        <OTPFieldInput />
        <OTPFieldInput />
        <OTPFieldInput />
        <OTPFieldSeparator />
        <OTPFieldInput />
        <OTPFieldInput />
        <OTPFieldInput />
      </OTPField>
      <OTPField length={4} size="lg" aria-label="设备配对码" defaultValue="2048">
        {Array.from({ length: 4 }, (_, index) => (
          <OTPFieldInput key={index} />
        ))}
      </OTPField>
    </div>
  );
}
