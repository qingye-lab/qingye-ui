# 就地说明 Alert

Package: @qingye_lab/ui@5.1.0
Import: @qingye_lab/ui/components/alert
Source: packages/ui/src/components/alert.tsx
Source SHA-256: ed768584432728343fe968543826b25582cd834129d44b3091663fa7ef014040

静态就地说明，按实际需要显式宣告。

## Decision
不要为每段静态说明自动添加 assertive 宣告。

## Use and ownership
- 说明当前对象的条件、后果或已知结果。
- Avoid: 不要为每段静态说明自动添加 assertive 宣告。
- Library: 原生语义、公共组合与集中角色。
- Application: 对象、内容、值、状态与请求结果。

## Composition
- Title / Description 可与现有 Button 组合；默认无 live 角色。

## Responsive behavior
- 标题与说明开放排布；长中英文允许换行。

## Customization
- 使用公开 render/ref、ARIA、事件与样式；不混用主题三轴。

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
Title / Description 可与现有 Button 组合；默认无 live 角色。
- tone: "neutral" | "info" | "warning" | "danger" | "success"; default "neutral". 已声明事实的类别。色相之外还有形状不同的默认图标，与只给读屏的类别前缀（「警告：」等，随语言）；neutral 无类别，两者都没有。去掉图标不去掉前缀。
- icon: ReactNode | false. 类别图标。省略时 info、warning、danger、success 各有形状不同的默认图标（圆、三角、八角、圆加勾），neutral 没有；传节点则替换；false 不放图标。
- role: "alert" | "status" | native role. 仅确有宣告需求时由调用方显式传入。
- render / ref / 原生属性: current public component props. 属性、事件与ref透传实际元素；样式由className/style调整。

### AlertTitle
就地说明标题；可透传 render 与原生属性。

### AlertDescription
就地说明正文；长文本允许换行。

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
