# 布局 Layout

Package: @qingye_lab/ui@5.3.0
Import: @qingye_lab/ui/components/layout
Source: packages/ui/src/components/layout.tsx
Source SHA-256: a3eee1f77336d01017929f940f49949e11d348343948eff757e0cde9db884233

用纵向堆叠、横向排列与等宽多列组织内容，间隔按成对、字段、动作、面板或分节关系选择。

## Decision
Stack 纵向排列，Inline 横向排列并默认换行，Grid 等宽多列。gap 选择成对、字段、动作或分节关系；语义由 render 与内容提供。

## Notes
- 布局没有边框、表面、内边距或业务状态；独立对象边界用 Card。
- Grid 只管等宽列；需要跨列、对齐表头的比较仍用原生 table/grid。
- 角色数值是主题预设。确有特殊关系时在项目组合说明 className/style 覆写理由。
- 方向、语言与密度沿真实 DOM 继承；换行不改变内容顺序。

## Use and ownership
- 内容组或动作组需要一致、可独立调整的关系间隔。
- Avoid: 把布局当围合或页面骨架；用数字 gap 代替关系判断。
- Library: 方向排列、对齐、换行与角色接线。
- Application: 对象、顺序、区域语义、数据与持久状态。

## Composition
- Stack render 成 section；Inline 组合现有动作；比较保留原生 table/grid；等宽并排的同类对象用 Grid。

## Responsive behavior
- 默认换行保留内容；本批页面按裁决只验桌面。

## Customization
- 优先修改已有角色 token；className/style 是项目特殊关系的例外出口。

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
按内容顺序纵向排列。
- gap: "pair" | "field" | "fields" | "actions" | "panel" | "section"; default "panel". pair 为一分（4px），用于成对读的名称与其说明、数值与单位；其余分别读取 field-gap、field-group-gap、action-gap、panel-gap、section-gap。
- align: "start" | "center" | "end" | "stretch" | "baseline"; default "stretch". 横轴对齐。
- justify: "start" | "center" | "end" | "between" | "around" | "evenly". 主轴（纵向）分布。不设则保持默认；容器高于内容时才看得出。
- render / ref / 原生属性: useRender.ComponentProps<"div">. 替换元素，透传事件、语言、方向、密度与原生属性。

### Inline
相邻动作或内容，可换行。
- gap: LayoutGap; default "actions". 与 Stack 相同的关系角色。
- align: StackProps["align"]; default "center". 横排的垂直对齐。
- justify: StackProps["justify"]. 横排的水平分布，如 between 把末项推到另一端。不设则保持默认。
- wrap: boolean; default true. 保留全部内容并允许折行。false 需由消费方验证容量。
- render / ref / 原生属性: useRender.ComponentProps<"div">. 默认 div；没有自动 group/toolbar 语义。

### Grid
等宽多列，纵横间隔取同一角色。
- gap: LayoutGap; default "panel". 与 Stack 相同的关系角色，行距与列距相等。
- columns: number; default 2. 固定列数，每列等宽。与 minItemWidth 同时给出时以 minItemWidth 为准。
- minItemWidth: string. 每列最小宽度（CSS 长度，如 "12rem"）：按容器宽度自动决定列数，窄到放不下一列时收为单列。
- align: StackProps["align"]; default "stretch". 每个格子内的纵向对齐。
- render / ref / 原生属性: useRender.ComponentProps<"div">. 默认 div；没有自动 list/grid 语义，需要列表语义时 render 成 ul。

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
