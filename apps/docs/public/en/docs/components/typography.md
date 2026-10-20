# Typography

Package: @qingye_lab/ui@4.1.0
Import: @qingye_lab/ui/components/typography
Source: packages/ui/src/components/typography.tsx
Source SHA-256: b8f81aa5c4d95440a9db890542e3b52128a3aebb2829f0dc16c78616dbdb0656

Headings, body copy, supporting text and numbers use the existing text steps. Semantics and visual size are independent.

## Decision
level determines h1–h6 and step selects appearance. render changes actual semantics; language controls CJK tracking and numeric does not format values.

## Notes
- Font size, leading, weight and tracking are theme presets, not unique deductions.
- Heading steps (display-xl, display-lg, display, title, chapter, heading) use text-wrap: balance so wrapped lines are of similar length without a lone last word; body and supporting copy do not (pretty is not yet broadly supported and stays under observation), and unsupported browsers fall back to ordinary wrapping. PageHeaderTitle and EmptyTitle balance too.
- Mark Chinese containers with lang=zh-CN; mixed content and long words wrap without losing text.
- Supporting copy still needs normal text contrast; numeric never replaces unknown with zero.

## Use and ownership
- Reuse text profiles while retaining actual heading outlines, prose, or numeric semantics.
- Avoid: Heading levels inferred from size, unknown as zero, or clipped critical consequences.
- Library: Text profiles, ordinary wrapping, and number presentation.
- Application: Heading outlines, content, language, and numeric facts.

## Composition
- Heading + Text + Layout establish content relationships; render inline text as span.

## Responsive behavior
- support/dense/control retain existing mobile profiles; page checks were desktop only by decision.

## Customization
- The central theme owns text profiles; override individual roles only for specific responsibilities.

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
- `step?`: `"body" | "caption" | "label" | "title" | "display-xl" | "display-lg" | "display" | "chapter" | "heading" | "body-strong" | "reading" | "prose" | "prose-strong" | "prose-h1" | "prose-h2" | "prose-h3" | "support" | "support-mobile" | "support-strong" | "support-strong-mobile" | "dense" | "dense-mobile" | "dense-strong" | "dense-strong-mobile" | "caption-strong" | "metric" | "metric-lg" | "micro" | "control-xs" | "control-xs-mobile" | "control-sm" | "control-sm-mobile" | "contr…`.
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### Text
- `numeric?`: `boolean`.
- `step?`: `"body" | "caption" | "label" | "title" | "display-xl" | "display-lg" | "display" | "chapter" | "heading" | "body-strong" | "reading" | "prose" | "prose-strong" | "prose-h1" | "prose-h2" | "prose-h3" | "support" | "support-mobile" | "support-strong" | "support-strong-mobile" | "dense" | "dense-mobile" | "dense-strong" | "dense-strong-mobile" | "caption-strong" | "metric" | "metric-lg" | "micro" | "control-xs" | "control-xs-mobile" | "control-sm" | "control-sm-mobile" | "contr…`.
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: does not read UILocale

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Code
Code within running text: monospace at 0.875 of the surrounding size rounded to whole pixels, on the ink soft fill, following its line.
- render / ref / native props: useRender.ComponentProps<"code">. Forward attributes and refs to the native code element.

### Heading
A real heading with independent outline level and visual step.
- level: 1 | 2 | 3 | 4 | 5 | 6; default 2. Heading level in the document outline.
- step: TextStep; default "heading". An existing TextStep, independent of level.
- numeric: boolean; default false. Apply the existing tabular figure utility.
- render / ref / native props: useRender.ComponentProps<"h2">. The final tag determines semantics; language, events and styles are forwarded.

### Text
Body copy, supporting text or numbers; defaults to p.
- step: TextStep; default "body". For example reading, support, caption or metric; no additional ramp.
- numeric: boolean; default false. Tabular figures; the application preserves unknown and empty values.
- render / ref / native props: useRender.ComponentProps<"p">. Render as span for inline text. Color inherits by default.

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
      <Text step="support" className="text-muted-foreground">辅助 Support</Text>
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
