# 排版 Typography

Package: @qingye_lab/ui@5.3.0
Import: @qingye_lab/ui/components/typography
Source: packages/ui/src/components/typography.tsx
Source SHA-256: bc92ccf04f040c45deae89471af71ba9f76f582784b6e4f1e639bdc725df13ca

标题层级、正文、辅助文字与数值共用已有文字档；语义标签与视觉档独立选择。

## Decision
level 决定 h1–h6，step 决定视觉档。render 改变实际语义；中文依 lang 使用正常字距，numeric 不格式化值。

## Notes
- 字号、行高、字重和字距是当前主题预设，不是由理念唯一推导。
- 标题档（display-xl、display-lg、display、title、chapter、heading）带 text-wrap: balance，折行时各行长度相近、不留孤字；正文与说明不加（pretty 尚未被各浏览器普遍支持，留作观察），不支持的浏览器回落为普通换行。PageHeaderTitle、EmptyTitle 同样均衡。
- 中文容器标记 lang=zh-CN；混排与长词保留内容并换行。
- 辅助文字仍按普通文字验证对比；numeric 不把待核实变成 0。

## Use and ownership
- 复用文字档同时保留真实标题大纲、正文或数值语义。
- Avoid: 通过字号推断标题层级；把未知写成零；裁切关键后果。
- Library: 文字档接线、正常换行与数字表现。
- Application: 标题大纲、内容、语言与数值事实。

## Composition
- Heading + Text + Layout 形成内容关系；内联文字 render 成 span。

## Responsive behavior
- support/dense/control 继续接已有 mobile 档；页面按裁决仅验桌面。

## Customization
- 集中主题修改文字档；特殊职责才单项覆写。

## Current exports
- Code: function; owner typography; PASS; props: CodeProps
- CodeProps: type; owner typography; PASS
- Heading: function; owner typography; PASS; props: HeadingProps
- HeadingProps: type; owner typography; PASS
- Text: function; owner typography; PASS; props: TextProps
- TextProps: type; owner typography; PASS
- TextStep: type; owner external; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Code
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### Heading
- `level?`: `1 | 2 | 3 | 4 | 5 | 6`. Document outline, independent of the visual text step.
- `numeric?`: `boolean`.
- `step?`: `"body" | "caption" | "label" | "title" | "display-xl" | "display-lg" | "display" | "chapter" | "heading" | "body-strong" | "reading" | "prose" | "prose-strong" | "prose-h1" | "prose-h2" | "prose-h3" | "support" | "support-mobile" | "support-strong" | "support-strong-mobile" | "dense" | "dense-mobile" | "dense-strong" | "dense-strong-mobile" | "caption-strong" | "label-mobile" | "metric" | "metric-lg" | "micro" | "control-xs" | "control-xs-mobile" | "control-sm" | "control-sm…`.
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### Text
- `numeric?`: `boolean`.
- `step?`: `"body" | "caption" | "label" | "title" | "display-xl" | "display-lg" | "display" | "chapter" | "heading" | "body-strong" | "reading" | "prose" | "prose-strong" | "prose-h1" | "prose-h2" | "prose-h3" | "support" | "support-mobile" | "support-strong" | "support-strong-mobile" | "dense" | "dense-mobile" | "dense-strong" | "dense-strong-mobile" | "caption-strong" | "label-mobile" | "metric" | "metric-lg" | "micro" | "control-xs" | "control-xs-mobile" | "control-sm" | "control-sm…`.
- `tone?`: `"default" | "muted"`. 墨色：default 沿用所在处的前景色；muted 用弱化前景（`text-muted-foreground`），做辅助说明。 没有 danger：错误文字属于 FieldError（功能纯粹，STANDARDS §1），Text 不单设红色。
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: does not read UILocale

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Code
正文里的一段代码：等宽字，字号为所在文字的 0.875 倍并取整像素，墨的柔底，跟随所在那一行。
- render / ref / 原生属性: useRender.ComponentProps<"code">. 属性与 ref 透传原生 code 元素。

### Heading
真实标题，层级与字号分离。
- level: 1 | 2 | 3 | 4 | 5 | 6; default 2. 文档大纲中的标题级别。
- step: TextStep; default "heading". src/text-steps.ts 中已有档；不由 level 推断。
- numeric: boolean; default false. 应用既有等宽数字规则。
- render / ref / 原生属性: useRender.ComponentProps<"h2">. 最终标签决定可访问语义；透传 lang、事件和样式。

### Text
正文、辅助说明或数值；默认 p。
- step: TextStep; default "body". 如 reading、support、caption、metric；不新增文字档。
- numeric: boolean; default false. 等宽数字；未知与空值由应用如实呈现。
- tone: "default" | "muted"; default "default". default 沿用所在处的前景色；muted 用弱化前景，做辅助说明。没有 danger：错误文字由 FieldError 承担。
- render / ref / 原生属性: useRender.ComponentProps<"p">. 内联文字 render 成 span。颜色默认继承。

## Keyboard

## Source examples
### 标题与正文
Source: apps/docs/src/content/typography/demos/01-heading.tsx
```tsx
import { Stack } from "@qingye_lab/ui/components/layout";
import { Heading, Text } from "@qingye_lab/ui/components/typography";

export const meta = { title: "标题与正文", titleEn: "Headings and body text" };
export default function Demo() {
  return <Stack gap="section" className="w-full max-w-xl" lang="zh-CN">
    <Heading level={3} step="display">青野 Qingye UI</Heading>
    <Heading level={4} step="title">标题 Title</Heading>
    <Heading level={5} step="chapter">章节 Chapter</Heading>
    <Stack gap="field"><Heading level={6} step="heading">小标题 Heading</Heading><Text step="reading">青野 Qingye UI，文字与标点。</Text><Text>第一行文字。第二行文字。</Text></Stack>
  </Stack>;
}
```

### 文字档与数字
Source: apps/docs/src/content/typography/demos/02-values.tsx
```tsx
import { Stack } from "@qingye_lab/ui/components/layout";
import { Heading, Text } from "@qingye_lab/ui/components/typography";

export const meta = { title: "文字档与数字", titleEn: "Text steps and numbers" };
export default function Demo() {
  return <Stack gap="panel" className="w-full max-w-xl" lang="zh-CN">
    <Heading level={3}>文字 Text</Heading>
    <Stack gap="field">
      <Text>正文 Body</Text>
      <Text step="support" tone="muted">辅助 Support</Text>
      <Text step="caption">附注 Caption</Text>
      <Text>中文标点：，。；！？ / Qingye UI</Text>
    </Stack>
    <Stack gap="field">
      <Text step="metric" numeric>0123456789</Text>
      <Text numeric>1,234.56</Text>
      <Text render={<span />}>内联文字</Text>
    </Stack>
  </Stack>;
}
```
