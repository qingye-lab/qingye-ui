import { OTPField, OTPFieldInput } from "@qingye/ui/components/otp-field";

export const meta = { title: "状态", description: "错误、遮挡输入与禁用。" };

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <OTPField length={6} defaultValue="381904" aria-label="短信验证码" aria-describedby="otp-error">
          {Array.from({ length: 6 }, (_, index) => (
            <OTPFieldInput key={index} aria-invalid />
          ))}
        </OTPField>
        <p id="otp-error" className="text-destructive-foreground text-xs">验证码错误，还可尝试 2 次</p>
      </div>
      <OTPField length={6} mask defaultValue="2580" aria-label="支付密码">
        {Array.from({ length: 6 }, (_, index) => (
          <OTPFieldInput key={index} />
        ))}
      </OTPField>
      <OTPField length={6} disabled defaultValue="1024" aria-label="验证码">
        {Array.from({ length: 6 }, (_, index) => (
          <OTPFieldInput key={index} />
        ))}
      </OTPField>
    </div>
  );
}
