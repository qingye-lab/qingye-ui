# Layout

Package: @qingye_lab/ui@5.1.0
Import: @qingye_lab/ui/components/layout
Source: packages/ui/src/components/layout.tsx
Source SHA-256: a3eee1f77336d01017929f940f49949e11d348343948eff757e0cde9db884233

Arrange content vertically, side by side or in equal columns using pair, field, action, panel and section spacing roles.

## Decision
Stack flows vertically; Inline flows horizontally and wraps by default; Grid lays out equal-width columns. Choose pair, field, action or section spacing with gap; render and content supply semantics.

## Notes
- Layout adds no border, surface, padding or business state; use Card for independent object boundaries.
- Grid only does equal-width columns; keep native table/grid for spanning or header-aligned comparison.
- Role values are theme presets. Explain special className/style overrides in the project composition.
- Direction, language and density follow the DOM; wrapping does not reorder content.

## Use and ownership
- Content or action groups need consistent, independently adjustable relationship spacing.
- Avoid: Treating layout as enclosure or a page skeleton; numeric gaps without judging relationships.
- Library: Direction, alignment, wrapping, and role wiring.
- Application: Objects, order, region semantics, data, and persistent state.

## Composition
- Render Stack as section; compose existing actions with Inline; retain native table/grid for comparison; use Grid for equal-width peers.

## Responsive behavior
- Default wrapping retains content; this batch's page checks were desktop only by decision.

## Customization
- Adjust existing role tokens first; className/style are exceptions for project-specific relationships.

## Current exports
- Grid: function; owner layout; PASS; props: GridProps
- GridProps: type; owner layout; PASS
- Inline: function; owner layout; PASS; props: InlineProps
- InlineProps: type; owner layout; PASS
- LayoutGap: type; owner layout; PASS
- Stack: function; owner layout; PASS; props: StackProps
- StackProps: type; owner layout; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Grid
- `align?`: `"center" | "start" | "end" | "stretch" | "baseline"`. 交叉轴对齐（Stack 为横向，Inline 为纵向）。
- `columns?`: `number`. 固定列数，每列等宽。默认 2。与 minItemWidth 同时给出时以 minItemWidth 为准。
- `gap?`: `"section" | "pair" | "field" | "fields" | "actions" | "panel"`.
- `minItemWidth?`: `string`. 每列的最小宽度（CSS 长度，如 "12rem"）：按容器宽度自动决定列数，窄到放不下一列时收为单列而不溢出。
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### Inline
- `align?`: `"center" | "start" | "end" | "stretch" | "baseline"`. 交叉轴对齐（Stack 为横向，Inline 为纵向）。
- `gap?`: `"section" | "pair" | "field" | "fields" | "actions" | "panel"`.
- `justify?`: `"center" | "start" | "end" | "between" | "around" | "evenly"`. 主轴分布（Stack 为纵向，Inline 为横向）。纵向分布需要容器高于内容才看得出。
- `wrap?`: `boolean`.
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### Stack
- `align?`: `"center" | "start" | "end" | "stretch" | "baseline"`. 交叉轴对齐（Stack 为横向，Inline 为纵向）。
- `gap?`: `"section" | "pair" | "field" | "fields" | "actions" | "panel"`.
- `justify?`: `"center" | "start" | "end" | "between" | "around" | "evenly"`. 主轴分布（Stack 为纵向，Inline 为横向）。纵向分布需要容器高于内容才看得出。
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: does not read UILocale

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Stack
Vertical content flow.
- gap: "pair" | "field" | "fields" | "actions" | "panel" | "section"; default "panel". pair is one fen (4px) for things read as a pair: a name and its description, or a value and its unit; the others read field-gap, field-group-gap, action-gap, panel-gap and section-gap.
- align: "start" | "center" | "end" | "stretch" | "baseline"; default "stretch". Cross-axis alignment.
- justify: "start" | "center" | "end" | "between" | "around" | "evenly". Main-axis (vertical) distribution. Unset keeps the default; visible only when the container is taller than its content.
- render / ref / native props: useRender.ComponentProps<"div">. Replace the element and forward native props, events and environment attributes.

### Inline
Adjacent actions or content with wrapping.
- gap: LayoutGap; default "actions". The same relationship roles as Stack.
- align: StackProps["align"]; default "center". Vertical alignment in a row.
- justify: StackProps["justify"]. Horizontal distribution in a row, e.g. between pushes the last item to the far end. Unset keeps the default.
- wrap: boolean; default true. Retains all content and permits wrapping. Consumers must verify capacity when false.
- render / ref / native props: useRender.ComponentProps<"div">. Defaults to div with no automatic group or toolbar role.

### Grid
Equal-width columns with one spacing role for rows and columns.
- gap: LayoutGap; default "panel". The same relationship roles as Stack; row and column gaps are equal.
- columns: number; default 2. Fixed number of equal columns. minItemWidth wins when both are given.
- minItemWidth: string. Minimum column width as a CSS length such as "12rem": the column count follows the container, collapsing to one column when even one does not fit.
- align: StackProps["align"]; default "stretch". Block-axis alignment of items within their cells.
- render / ref / native props: useRender.ComponentProps<"div">. Defaults to div with no automatic list or grid role; render as ul when list semantics are needed.

## Keyboard

## Source examples
### 纵向排列
Source: apps/docs/src/content/layout/demos/01-stack.tsx
```tsx
import { Field, FieldDescription, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";
import { Stack } from "@qingye_lab/ui/components/layout";

export const meta = { title: "纵向排列", titleEn: "Vertical layout" };

export default function Demo() {
  return (
    <Stack gap="fields" className="w-full max-w-sm" render={<section aria-label="名称" />}>
      <Field><FieldLabel>全称</FieldLabel><Input defaultValue="青野" /></Field>
      <Field><FieldLabel>简称</FieldLabel><Input defaultValue="Qingye" /><FieldDescription>可选。</FieldDescription></Field>
    </Stack>
  );
}
```

### 横向排列与对齐
Source: apps/docs/src/content/layout/demos/02-inline.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";
import { Inline, Stack } from "@qingye_lab/ui/components/layout";
import { Text } from "@qingye_lab/ui/components/typography";

export const meta = { title: "横向排列与对齐", titleEn: "Inline layout and alignment" };

export default function Demo() {
  return (
    <Stack gap="section" className="w-full">
      <Inline gap="actions" align="center"><Button size="sm">保存</Button><Button size="lg" variant="bordered">取消</Button></Inline>
      <Inline gap="actions" justify="between"><Text render={<span />}>已选 3 项</Text><Button size="sm" variant="bordered">清除</Button></Inline>
      <Inline gap="panel" align="baseline" wrap={false}><Text step="heading" render={<span />}>青野</Text><Text render={<span />}>Qingye</Text></Inline>
    </Stack>
  );
}
```

### 多列与成对间隔
Source: apps/docs/src/content/layout/demos/03-grid.tsx
```tsx
import { Grid, Stack } from "@qingye_lab/ui/components/layout";
import { Text } from "@qingye_lab/ui/components/typography";

export const meta = { title: "多列与成对间隔", titleEn: "Columns and paired spacing" };

const facts = [["组件", "83"], ["主题轴", "3"], ["窄屏断点", "640px"], ["触屏目标", "44px"], ["版本", "5.1.0"], ["许可", "MIT"]];

export default function Demo() {
  return (
    <Grid minItemWidth="9rem" className="w-full">
      {facts.map(([label, value]) => (
        <Stack key={label} gap="pair">
          <Text render={<span />}>{label}</Text>
          <Text step="heading" render={<span />}>{value}</Text>
        </Stack>
      ))}
    </Grid>
  );
}
```
