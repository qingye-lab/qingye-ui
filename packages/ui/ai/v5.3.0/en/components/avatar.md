# Avatar

Package: @qingye_lab/ui@5.3.0
Import: @qingye_lab/ui/components/avatar
Source: packages/ui/src/components/avatar.tsx
Source SHA-256: d6ca137a87d7eeb1a3ec766553246ed453cbcd78fdce9980f091bd27a21f417a

An image with one named identity and a fallback.

## Decision
Do not invent a name or let initials replace an accessible name. An avatar is not interactive itself; to make it clickable, wrap it in a Button (or link): the accessible name still comes from the avatar's label, while focus, keyboard and disabled state belong to the outer element, and the avatar gets no tabindex or onClick. Give the outer element an aria-label to change the name. Use AvatarGroup for a set of related people.

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
