# 分段文本 OtpField

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/otp-field
Source: packages/ui/src/components/otp-field.tsx
Source SHA-256: d6ac787b80dd6a4b61a5012e7336bbd9e3ad112e170bb3e505fc59913e6c400b

分段呈现一个固定长度文本值。

## Decision
只有一个真实文本输入，分段跟随它的光标与选择。前导零保留，长度填满只说明文本长度；核对、请求和结果归应用。

## Notes
- 点击一段选中该字符，后续输入替换它；空段将光标放在当前文本末尾。真实输入透明地覆盖在分段上接收指针，触屏长按可弹出系统的粘贴菜单。
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

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### OtpField
- `controlClassName?`: `string`. 编辑边界的样式入口；className / style / render 始终属于真实输入。
- `defaultValue?`: `string`.
- `groups?`: `readonly number[]`. 分组，如 `[3, 3]`：组间画一道短横作分隔，读屏仍是一个输入。总和必须等于 `length`，否则抛错。 分隔只是呈现，不进入值；超出 `length` 的外部值多出的格归入最后一组，不再增加分隔。
- `length`: `number`. 文本容量，以 Unicode code point 计；由任务给出，不预设验证码长度。
- `mask?`: `boolean`. 已输入的格画成圆点。只改格子怎么画：值、粘贴与复制都不变，输入仍是 `type="text"`。 不用 `type="password"`：它会让浏览器与密码管理器把这格当凭据（提示保存、不再给出一次性验证码建议）， 并让 `autocomplete="one-time-code"` 失效；而这里真实输入本就透明地盖在格子上，遮蔽只需要换掉格子里画的东西。 代价要说明白：辅助技术读到的仍是真实文本，遮蔽是视觉上的防窥，不是保密。
- `nativeInput?`: `boolean`. 已由 FieldControl 等原语注册时，直接渲染原生输入，避免重复注册。
- `normalizeValue?`: `(text: string) => string`. 键入与粘贴的文本先经过它，再按 `length` 校验；返回值就是写入的文本。 默认去掉空白与连字符：验证码常以分组形式送达（`123 456`、`123-456`）， WCAG 3.3.8（可访问认证）要求不得靠拒绝粘贴来为难人。 需要限定字符集时由调用方给出，例如 `text => text.replace(/\D/g, "")`； 码本身含连字符时传 `text => text` 保留。
- `onValueChange?`: `(value: string, event: React.ChangeEvent<HTMLInputElement>) => void`.
- `unstyled?`: `boolean`. 由 InputGroup 提供共同边界时使用，不移除输入几何和原生语义。
- `value?`: `string`.
- plus 304 inherited (@types/react 301, @base-ui/react 3); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @daypicker/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

### OtpField
Input 的分段呈现，Field 注册一次。
- length: number. 必填正整数，以 Unicode code point 计。超长用户插入整次拒绝并说明；外部值完整呈现，不截断。
- value / defaultValue: string; default defaultValue: ''. 受控或非受控文本，保留前导零。
- onValueChange: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void. 请求文本变化；受控调用方拒绝更新时原值不变。输入法合成期间按输入原样回显，合成结束后才按长度校验。
- normalizeValue: (text: string) => string; default 去掉空白与连字符. 键入与粘贴的文本先经它归一化，再按 length 校验；返回值就是写入的文本。验证码常以分组形式送达（123 456、123-456），WCAG 3.3.8 不允许靠拒绝粘贴来为难人，所以默认去掉分隔。限定字符集用 text => text.replace(/\D/g, "")；码本身含连字符时传 text => text。
- groups: readonly number[]. 把 length 分成几组，组间画一条分隔线，如 [3, 3]。各组之和必须等于 length，且都是正整数，否则抛错。分隔线是装饰，读屏仍只遇到一个输入框；值里不含分隔符。
- placeholder: string. 恰好一个字符（以 code point 计）时显示在每个空格里，填入字符后让位；其他长度不在格内显示，只作为真实输入框的 placeholder 属性。
- mask: boolean; default false. 已填的格显示圆点而不是字符。只改呈现：值、粘贴、表单提交与读屏所读的文本不变。没有用 type=password——那会让浏览器把它当密码保存、触发密码管理器，并让 one-time-code 自动填充失效；验证码需要的是遮住旁人的视线，不是密码的存储语义。
- inputMode / autoComplete: native input props; default autoComplete: 'one-time-code'. inputMode 由真实字符范围决定；type 始终 text，不自动转换为数值。
- render / ref / className / style / ARIA / events: Input props. 全部属于真实 input；render 必须保持 input 语义、受控值和事件。分段本身固定 dir=ltr（验证码是数字或字母串），不随页面方向反转。
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
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";
import { OtpField } from "@qingye_lab/ui/components/otp-field";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "文本", titleEn: "Text" } satisfies DemoMeta;

export default function Demo() {
  return <FieldGroup className="grid w-full grid-cols-1 sm:grid-cols-2">
    <Field className="sm:col-span-2"><FieldLabel>编码</FieldLabel><OtpField length={6} inputMode="numeric" defaultValue="0012" name="code" /><FieldDescription>6 个字符；可直接粘贴 123 456</FieldDescription></Field>
    <Field><FieldLabel>字符编号</FieldLabel><OtpField length={4} defaultValue="A01" /><FieldDescription>4 个字符</FieldDescription></Field>
    <Field invalid><FieldLabel>待核对</FieldLabel><OtpField length={4} defaultValue="0012" /><FieldError>编码尚未核对。</FieldError></Field>
    <Field><FieldLabel>只读</FieldLabel><OtpField length={4} defaultValue="0012" readOnly /></Field>
    <Field disabled><FieldLabel>禁用</FieldLabel><OtpField length={4} defaultValue="0012" /></Field>
  </FieldGroup>;
}
```

### 密度
Source: apps/docs/src/content/otp-field/demos/02-density.tsx
```tsx
import { Field, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";
import { OtpField } from "@qingye_lab/ui/components/otp-field";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "密度", titleEn: "Density" } satisfies DemoMeta;

export default function Demo() {
  return (
    <FieldGroup className="grid w-full sm:grid-cols-2 items-start gap-(--qy-field-group-gap)">
      {(["default", "compact"] as const).map((density) => (
        <div data-density={density} key={density}>
          <Field>
            <FieldLabel>{density === "compact" ? "紧凑" : "默认"}</FieldLabel>
            <OtpField length={4} defaultValue="01" />
          </Field>
        </div>
      ))}
    </FieldGroup>
  );
}
```

### 分组、占位与遮蔽
Source: apps/docs/src/content/otp-field/demos/03-groups-mask.tsx
```tsx
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";
import { OtpField } from "@qingye_lab/ui/components/otp-field";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "分组、占位与遮蔽", titleEn: "Groups, placeholder and mask" } satisfies DemoMeta;

export default function Demo() {
  return <FieldGroup className="grid w-full grid-cols-1 sm:grid-cols-2">
    <Field><FieldLabel>验证码</FieldLabel><OtpField length={6} groups={[3, 3]} inputMode="numeric" placeholder="·" defaultValue="123" /><FieldDescription>3 + 3 分组；读屏仍是一个输入框</FieldDescription></Field>
    <Field><FieldLabel>序列号</FieldLabel><OtpField length={8} groups={[2, 3, 3]} placeholder="_" /><FieldDescription>2 + 3 + 3 分组</FieldDescription></Field>
    <Field><FieldLabel>恢复码</FieldLabel><OtpField length={6} mask inputMode="numeric" defaultValue="4821" /><FieldDescription>已输入的字符以圆点显示；值与粘贴不变</FieldDescription></Field>
  </FieldGroup>;
}
```
