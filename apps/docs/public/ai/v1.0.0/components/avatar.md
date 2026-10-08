# 身份图像 Avatar

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/avatar
Source: packages/ui/src/components/avatar.tsx
Source SHA-256: 62091f6ab8f49a63451d9d99467147b81e5ca7d169c0492174c5c2aceb24ded7

同一身份视觉样本的图片与回退。

## Decision
不要虚构姓名或让 initials 代替可访问名称。

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

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
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
