import { Button } from "@qingye/ui/components/button";
import { OTPField, OTPFieldInput } from "@qingye/ui/components/otp-field";
import { Spinner } from "@qingye/ui/components/spinner";
import { CircleCheckIcon } from "lucide-react";
import { useState } from "react";

export const meta = { title: "组合：登录验证", description: "填满后自动校验；示例验证码为 246810。" };

export default function Demo() {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "ok" | "error">("idle");
  const verify = (code: string) => {
    setStatus("checking");
    setTimeout(() => setStatus(code === "246810" ? "ok" : "error"), 600);
  };
  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-2xl border bg-card p-4 text-center shadow-xs/5 sm:p-6">
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-base">输入验证码</h3>
        <p className="text-muted-foreground text-sm">我们向 zhang.wei@example.com 发送了 6 位验证码</p>
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
      >
        {Array.from({ length: 6 }, (_, index) => (
          <OTPFieldInput key={index} aria-invalid={status === "error" || undefined} />
        ))}
      </OTPField>
      <p aria-live="polite" className="flex h-5 items-center gap-1.5 text-sm">
        {status === "checking" ? <><Spinner className="size-4" />正在校验…</> : null}
        {status === "ok" ? <><CircleCheckIcon aria-hidden="true" className="size-4 text-success-foreground" />验证通过</> : null}
        {status === "error" ? <span className="text-destructive-foreground">验证码不正确，请重新输入</span> : null}
      </p>
      <Button variant="ghost" size="sm" disabled className="numeric">重新发送（60 秒）</Button>
    </div>
  );
}
