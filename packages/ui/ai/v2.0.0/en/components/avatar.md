# Avatar

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/avatar
Source: packages/ui/src/components/avatar.tsx
Source SHA-256: 62091f6ab8f49a63451d9d99467147b81e5ca7d169c0492174c5c2aceb24ded7

An image with one named identity and a fallback.

## Decision
Do not invent a name or let initials replace an accessible name.

## Use and ownership
- A named identity image or explicit fallback is needed.
- Avoid: Inventing names or replacing an accessible name with initials.
- Library: Native semantics, public composition, and centralized roles.
- Application: Objects, content, values, states, and request outcomes.

## Composition
- Image/Fallback use Base UI loading facts; label names the same object.

## Responsive behavior
- Five independent image size roles with matching text profiles. Fallback is short; the root accessible name supplies the complete identity.

## Customization
- Public render/refs, ARIA, events, and styles; keep theme axes independent.

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
Image/Fallback use Base UI loading facts; label names the same object.
- label: string. A required nonblank identity name shared by the image and fallback.
- size: "xs" | "sm" | "md" | "lg" | "xl"; default "md". Independent avatar dimensions with matching text profiles.
- Image src / alt / onLoadingStatusChange: Base UI Avatar.Image props. An actual image source, native alt, and loading events.
- Fallback children / delay: Base UI Avatar.Fallback props. Caller-defined short fallback content; delay does not determine a service outcome.
- render / ref / native props: current public component props. Forward attributes, events, and refs to the actual element; adjust presentation through className/style.

### AvatarImage
The actual image element; forwards src, alt, and loading state events.

### AvatarFallback
Caller-provided short fallback for a missing or failed image. delay changes only presentation timing.

### AvatarPrimitive
The public Base UI Avatar primitive for callers needing its complete composition API.

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
