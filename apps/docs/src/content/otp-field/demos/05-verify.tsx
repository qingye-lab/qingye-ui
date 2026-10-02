import { OTPField, OTPFieldInput } from "@qingye/ui/components/otp-field";
import { Spinner } from "@qingye/ui/components/spinner";
import { CircleCheckIcon } from "lucide-react";
import { useId, useState } from "react";

export const meta = { title: "组合：登录验证", description: "填满后自动校验；示例验证码为 246810。" };

export default function Demo() {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "ok" | "error">("idle");
  const statusId = useId();
  const verify = (code: string) => {
    setStatus("checking");
    setTimeout(() => setStatus(code === "246810" ? "ok" : "error"), 600);
  };
  return (
    <div className="flex w-full min-w-0 max-w-sm flex-col items-center gap-4 text-center">
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-base">输入验证码</h3>
        <p className="text-muted-foreground text-sm">演示邮箱：zhang.wei@example.com</p>
      </div>
      <OTPField
        length={6}
        value={value}
        onValueChange={(next) => {
          setValue(next);
          setStatus("idle");
        }}
        onValueComplete={verify}
        disabled={status === "checking" || status === "ok"}
        aria-label="邮箱验证码"
        aria-describedby={status === "error" ? statusId : undefined}
      >
        {Array.from({ length: 6 }, (_, index) => (
          <OTPFieldInput key={index} aria-invalid={status === "error" || undefined} />
        ))}
      </OTPField>
      <p id={statusId} aria-live="polite" className="flex h-5 items-center gap-1.5 text-sm">
        {status === "checking" ? <><Spinner className="size-4" />正在校验…</> : null}
        {status === "ok" ? <><CircleCheckIcon aria-hidden="true" className="size-4 text-success-foreground" />验证通过</> : null}
        {status === "error" ? <span className="text-destructive-foreground">验证码不正确，请重新输入</span> : null}
      </p>
    </div>
  );
}
