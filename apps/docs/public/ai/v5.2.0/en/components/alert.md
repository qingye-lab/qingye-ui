# Alert

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/alert
Source: packages/ui/src/components/alert.tsx
Source SHA-256: ed768584432728343fe968543826b25582cd834129d44b3091663fa7ef014040

Static local information, with announcements only when requested.

## Decision
Static explanations should not automatically make assertive announcements.

## Use and ownership
- Explain conditions, consequences, or known results for the current object.
- Avoid: Automatically making assertive announcements for static explanations.
- Library: Native semantics, public composition, and centralized roles.
- Application: Objects, content, values, states, and request outcomes.

## Composition
- Compose Title/Description with existing Button controls; there is no default live role.

## Responsive behavior
- Titles and explanations use open layout; long text in either language wraps.

## Customization
- Public render/refs, ARIA, events, and styles; keep theme axes independent.

## Current exports
- Alert: function; owner alert; PASS; props: AlertProps
- AlertDescription: function; owner alert; PASS; props: useRender.ComponentProps<"div">
- AlertProps: type; owner alert; PASS
- AlertTitle: function; owner alert; PASS; props: AlertTitleProps
- AlertTitleProps: type; owner alert; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Alert
- `icon?`: `React.ReactNode | false`. 类别图标。省略时按 tone 给默认图标（neutral 没有）；传节点则用它；`false` 不放图标。 换图标只走本属性：组件不去 children 里猜哪个元素是图标。
- `tone?`: `"neutral" | "info" | "warning" | "danger" | "success"`.
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### AlertDescription
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### AlertTitle
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Alert
Compose Title/Description with existing Button controls; there is no default live role.
- tone: "neutral" | "info" | "warning" | "danger" | "success"; default "neutral". The declared kind of fact. Besides hue there is a default icon of a distinct shape and a screen-reader-only category prefix ("Warning: " and so on, per locale); neutral has no category and neither. Removing the icon does not remove the prefix.
- icon: ReactNode | false. Category icon. Omitted: info, warning, danger and success each get a default icon of a different shape (circle, triangle, octagon, circle with check); neutral has none. A node replaces it; false places no icon.
- role: "alert" | "status" | native role. The caller supplies these only when an announcement is needed.
- render / ref / native props: current public component props. Forward attributes, events, and refs to the actual element; adjust presentation through className/style.

### AlertTitle
An in-place explanatory title; forwards render and native props.

### AlertDescription
In-place explanatory text that permits long content to wrap.

## Keyboard

## Source examples
### 就地说明
Source: apps/docs/src/content/alert/demos/01-states.tsx
```tsx
import { Alert, AlertDescription, AlertTitle } from "@qingye_lab/ui/components/alert";
import { Stack } from "@qingye_lab/ui/components/layout";

export const meta = { title: "就地说明", titleEn: "In-place notices" };

export default function Demo() {
  return <Stack gap="section" className="max-w-md">
    <Alert>
      <div className="grid gap-1"><AlertTitle>草稿已保留</AlertTitle><AlertDescription>离开这一页不会丢失本次填写的内容。</AlertDescription></div>
    </Alert>
    <Alert tone="info">
      <div className="grid gap-1"><AlertTitle>名称可以重复</AlertTitle><AlertDescription>同名记录以创建时间区分。</AlertDescription></div>
    </Alert>
    <Alert tone="success">
      <div className="grid gap-1"><AlertTitle>规则已启用</AlertTitle><AlertDescription>新的匹配条件对之后导入的记录生效。</AlertDescription></div>
    </Alert>
    <Alert tone="warning">
      <div className="grid gap-1"><AlertTitle>同步时间较旧</AlertTitle><AlertDescription>最近一次同步在 3 天前，数字可能不是最新的。</AlertDescription></div>
    </Alert>
    <Alert tone="danger">
      <div className="grid gap-1"><AlertTitle>导出未完成</AlertTitle><AlertDescription>连接中断，原数据仍在，可以重新导出。</AlertDescription></div>
    </Alert>
  </Stack>;
}
```
