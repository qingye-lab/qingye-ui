# 身份图像 Avatar

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/avatar
Source: packages/ui/src/components/avatar.tsx
Source SHA-256: d6ca137a87d7eeb1a3ec766553246ed453cbcd78fdce9980f091bd27a21f417a

同一身份视觉样本的图片与回退。

## Decision
不要虚构姓名或让 initials 代替可访问名称。头像本身不可交互；要点击，就用 Button（或链接）包住它：可访问名称仍来自头像的 label，焦点、键盘和禁用状态归外层，头像不加 tabindex、不加 onClick。要换名称时给外层 aria-label。一组相关的人用 AvatarGroup。

## Use and ownership
- 需要一张有名称的身份图像或明确回退。
- Avoid: 不要虚构姓名或让 initials 代替可访问名称。
- Library: 原生语义、公共组合与集中角色。
- Application: 对象、内容、值、状态与请求结果。

## Composition
- Image / Fallback 使用 Base UI 加载事实；label 命名同一对象。

## Responsive behavior
- 五档图像样本采用独立尺寸角色及同名文字档；Fallback 是短内容，完整身份由根的可访问名称提供。

## Customization
- 使用公开 render/ref、ARIA、事件与样式；不混用主题三轴。

## Current exports
- Avatar: function; owner avatar; PASS; props: AvatarProps
- AvatarFallback: function; owner avatar; PASS; props: React.ComponentProps<typeof AvatarPrimitive.Fallback>
- AvatarImage: function; owner avatar; PASS; props: React.ComponentProps<typeof AvatarPrimitive.Image>
- AvatarPrimitive: reexport; owner avatar; UNVERIFIED
- AvatarProps: type; owner avatar; PASS
- AvatarSize: type; owner avatar; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Avatar
- `label`: `string`.
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### AvatarFallback
- no props declared by this library
- plus 279 inherited (@types/react 275, @base-ui/react 4); not expanded, see the installed declarations

### AvatarImage
- no props declared by this library
- plus 292 inherited (@types/react 287, @base-ui/react 5); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: does not read UILocale

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Avatar
Image / Fallback 使用 Base UI 加载事实；label 命名同一对象。
- label: string. 必填非空身份名称，图片和回退共用。
- size: "xs" | "sm" | "md" | "lg" | "xl"; default "md". 独立 avatar 尺寸与同名文字档。
- Image src / alt / onLoadingStatusChange: Base UI Avatar.Image props. 真实图片源、原生alt与加载事件。
- Fallback children / delay: Base UI Avatar.Fallback props. 调用方确定的短回退内容，delay 不决定服务结果。
- render / ref / 原生属性: current public component props. 属性、事件与ref透传实际元素；样式由className/style调整。

### AvatarImage
实际图片元素；透传 src、alt 与加载状态事件。

### AvatarFallback
真实缺图、加载失败时的调用方短回退内容；delay 仅控制显示时机。

### AvatarPrimitive
Base UI Avatar 公共原语，供需要原语完整组合能力的调用方使用。

## Keyboard

## Source examples
### 图片与回退
Source: apps/docs/src/content/avatar/demos/01-states.tsx
```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@qingye_lab/ui/components/avatar";
import { Inline } from "@qingye_lab/ui/components/layout";

export const meta = { title: "图片与回退", titleEn: "Image and fallback" };

const sample = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' fill='black'/%3E%3Ccircle cx='20' cy='20' r='11' fill='white'/%3E%3C/svg%3E";

// 回退显示的是**这个人的名字的第一个字**，不是「图」——回退态也要让人认得出是谁。
// 首字由调用方给出：组件不知道某个字符串是不是人名，也不从可访问名称里猜。
export default function Demo() {
  return <Inline>
    {(["xs", "sm", "md", "lg", "xl"] as const).map(size => <Avatar key={size} label="陈致远" size={size}><AvatarFallback>陈</AvatarFallback></Avatar>)}
    <Avatar label="李一鸣"><AvatarFallback>李</AvatarFallback></Avatar>
    <Avatar label="Wen Zhang"><AvatarFallback>W</AvatarFallback></Avatar>
    <Avatar label="有头像的成员"><AvatarImage src={sample} /><AvatarFallback>有</AvatarFallback></Avatar>
  </Inline>;
}
```

### 可点击的头像
Source: apps/docs/src/content/avatar/demos/02-interactive.tsx
```tsx
import { Avatar, AvatarFallback } from "@qingye_lab/ui/components/avatar";
import { Button } from "@qingye_lab/ui/components/button";
import { Inline } from "@qingye_lab/ui/components/layout";
import { Link } from "@qingye_lab/ui/components/link";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "可点击的头像", titleEn: "A clickable avatar" } satisfies DemoMeta;

// 头像本身不可交互：点击是外层按钮或链接的事。名称来自头像的 label（读作「陈致远」），
// 外层需要说明动作时再给 aria-label（此时它取代头像的名称）。
export default function Demo() {
  return <Inline gap="panel">
    <Button variant="quiet" shape="icon"><Avatar label="陈致远"><AvatarFallback>陈</AvatarFallback></Avatar></Button>
    <Button variant="quiet" shape="icon" aria-label="打开李一鸣的资料"><Avatar label="李一鸣"><AvatarFallback>李</AvatarFallback></Avatar></Button>
    <Link href="#profile" className="inline-flex rounded-full"><Avatar label="王一"><AvatarFallback>王</AvatarFallback></Avatar></Link>
  </Inline>;
}
```
