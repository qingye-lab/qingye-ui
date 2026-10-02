# 验证码输入 OTPField

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/otp-field
Source: packages/ui/src/components/otp-field.tsx
Source SHA-256: 1f67868206cdbc6052b35d7f63c001c8f55aace6f40eedf51bcaa304dec415c3

逐格输入短信或邮箱验证码，支持粘贴整串、自动跳格与退格回退。

## Use and ownership
- 逐格输入短信或邮箱验证码，支持粘贴整串、自动跳格与退格回退。
- Avoid: 不能仅用 placeholder 代替名称；失败后不要无故清空输入。
- Library: 当前导出和属性定义的基础交互、可访问语义与样式。
- Application: 对象、草稿、校验业务规则、版本与保存结果。

## Current exports
- OTPField: function; owner otp-field; PASS; props: React.ComponentProps<typeof OTPFieldPrimitive.Root> & {
  size?: "default" | "lg";
}
- OTPFieldInput: function; owner otp-field; PASS; props: React.ComponentProps<typeof OTPFieldPrimitive.Input>
- OTPFieldPrimitive: reexport; owner otp-field; UNVERIFIED
- OTPFieldSeparator: function; owner otp-field; PASS; props: React.ComponentProps<typeof Separator>

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### OTPField
Base UI OTPField.Root；把若干 OTPFieldInput 组成一个字段。
- length: number. 位数（必填）。
- value / defaultValue / onValueChange: string. 受控 / 非受控的值。
- onValueComplete: (value: string) => void. 填满全部位数时调用，适合自动提交。
- validationType: "numeric" | "alpha" | "alphanumeric" | "none"; default "numeric". 允许的字符；不符合的输入会被忽略。
- mask: boolean; default false. 以圆点遮挡已输入字符。
- size: "default" | "lg"; default "default". 格子尺寸。
- autoSubmit: boolean; default false. 填满后自动提交所在表单。
- name / disabled / readOnly / required: string / boolean. 表单字段名与状态。

### OTPFieldInput
单个格子；每位一个。可设 placeholder 作为提示，aria-invalid 显示错误。

### OTPFieldSeparator
格子之间的分隔短线，用于 3-3 分组。

## Keyboard
- 0–9 / 字母: 输入当前位并跳到下一格。
- Backspace: 删除当前位，空格时回到上一格。
- ← → / Home / End: 在格子间移动。
- Ctrl / ⌘ + V: 粘贴整串验证码，自动分配到各格。

## Source examples
### 基础用法
Source: apps/docs/src/content/otp-field/demos/01-basic.tsx
```tsx
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
      <FieldDescription>已发送至 138 **** 6021</FieldDescription>
    </Field>
  );
}
```

### 分组与大尺寸
Source: apps/docs/src/content/otp-field/demos/02-separator.tsx
```tsx
import { OTPField, OTPFieldInput, OTPFieldSeparator } from "@qingye/ui/components/otp-field";

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
```

### 字母数字与占位
Source: apps/docs/src/content/otp-field/demos/03-alphanumeric.tsx
```tsx
import { OTPField, OTPFieldInput } from "@qingye/ui/components/otp-field";

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
```

### 状态
Source: apps/docs/src/content/otp-field/demos/04-states.tsx
```tsx
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
```

### 组合：登录验证
Source: apps/docs/src/content/otp-field/demos/05-verify.tsx
```tsx
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
```

