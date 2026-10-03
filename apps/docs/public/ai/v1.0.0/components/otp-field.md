# 分段文本 OtpField

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/otp-field
Source: packages/ui/src/components/otp-field.tsx
Source SHA-256: ecf81069c9e53fe4a6290c8200223e56c2b8624d6bbe7493b414b4e367a88edb

分段呈现一个固定长度文本值。

## Decision
只有一个真实文本输入，分段跟随它的光标与选择。前导零保留，长度填满只说明文本长度；核对、请求和结果归应用。

## Notes
- 点击一段选中该字符，后续输入替换它；空段将光标放在当前文本末尾。
- 与 FieldLabel、FieldDescription、FieldError 共处；分段本身对辅助技术隐藏。
- 本批采用单输入分段结构，不恢复旧分段 API。
- 真实移动端自动填充、IME、辅助技术与焦点对比仍需浏览器/设备验证。

## Use and ownership
- 任务明确给出长度的短文本
- Avoid: 数值步进用 NumberField；不确定长度用 Input
- Library: 文本草稿、光标、选择与容量拒绝提示
- Application: 长度、字符规则、受控值、核对与提交结果

## Composition
- Field 持有持续名称、说明和错误；不内建登录业务

## Responsive behavior
- 分段使用同档 control/text；超出外部值完整显示，容器可由项目调整

## Customization
- 输入 props 属于真实 input；controlClassName 属于外容器

## Current exports
- OtpField: function; owner otp-field; PASS; props: OtpFieldProps
- OtpFieldProps: type; owner otp-field; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### OtpField
Input 的分段呈现，Field 注册一次。
- length: number. 必填正整数，以 Unicode code point 计。超长用户插入整次拒绝并说明；外部值完整呈现，不截断。
- value / defaultValue: string; default defaultValue: ''. 受控或非受控文本，保留前导零。
- onValueChange: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void. 请求文本变化；受控调用方拒绝更新时原值不变。
- size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; default 'md'. 分段读同档控件宽高与文字；粗指针读取触摸目标。
- inputMode / autoComplete: native input props; default autoComplete: 'one-time-code'. inputMode 由真实字符范围决定；type 始终 text，不自动转换为数值。
- render / ref / className / style / ARIA / events: Input props. 全部属于真实 input；render 必须保持 input 语义、受控值和事件。
- controlClassName: string. 调整分段容器的位置与布局。
- disabled / readOnly / name / form / required: native input props. 禁用不提交；只读可聚焦、复制与提交。

## Keyboard
- 字符输入 / 粘贴: 替换原生选择并推进光标；粘贴超出容量时保留原文。
- ArrowLeft / ArrowRight / Home / End: 移动原生文本光标；Shift 保留原生文本选择。
- Backspace / Delete: 按原生光标或选择删除文本。
- Tab / Shift+Tab: 整个字段只有一个焦点入口。

## Source examples
### 文本
Source: apps/docs/src/content/otp-field/demos/01-input.tsx
```tsx
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@qingye/ui/components/field";
import { OtpField } from "@qingye/ui/components/otp-field";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "文本", titleEn: "Text" } satisfies DemoMeta;

export default function Demo() {
  return <FieldGroup className="grid w-full grid-cols-1 sm:grid-cols-2">
    <Field><FieldLabel>编码</FieldLabel><OtpField length={6} inputMode="numeric" defaultValue="0012" name="code" /><FieldDescription>6 个字符</FieldDescription></Field>
    <Field><FieldLabel>字符编号</FieldLabel><OtpField length={4} defaultValue="A01" /><FieldDescription>4 个字符</FieldDescription></Field>
    <Field invalid><FieldLabel>待核对</FieldLabel><OtpField length={4} defaultValue="0012" /><FieldError>编码尚未核对。</FieldError></Field>
    <Field><FieldLabel>只读</FieldLabel><OtpField length={4} defaultValue="0012" readOnly /></Field>
    <Field disabled><FieldLabel>禁用</FieldLabel><OtpField length={4} defaultValue="0012" /></Field>
  </FieldGroup>;
}
```

### 尺寸
Source: apps/docs/src/content/otp-field/demos/02-sizes.tsx
```tsx
import { Field, FieldGroup, FieldLabel } from "@qingye/ui/components/field";
import { OtpField } from "@qingye/ui/components/otp-field";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "尺寸", titleEn: "Sizes" } satisfies DemoMeta;
const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export default function Demo() {
  return <FieldGroup className="grid w-full grid-cols-1 sm:grid-cols-2">
    {sizes.map(size => <Field key={size}><FieldLabel>{size}</FieldLabel><OtpField size={size} length={4} defaultValue="01" /></Field>)}
  </FieldGroup>;
}
```
