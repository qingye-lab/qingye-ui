# 动作组 ButtonGroup

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/button-group
Source: packages/ui/src/components/button-group.tsx
Source SHA-256: 482f8c3c4b02b0a94fda90ea51948d653098e2af0fdd48ec9f67312a43d0c4fb

为同一范围的动作提供共同名称，可独立排列或连成一体。

## Decision
共同名称说明范围，每个按钮仍说明自己的动作。ButtonGroup 不选择按钮、不传播禁用，也不建立工具栏键盘行为。连体（attached）只改变外形：相邻边合并成一条线，成员的名称、焦点与禁用不变；拆分按钮就是连体组里一个主操作加一个打开 Menu 的图标按钮。

## Use and ownership
- 几个动作属于同一可命名的范围。
- Avoid: 用动作组替代单选、多选或工具栏。
- Library: 原生 group 角色与动作间隔。
- Application: 范围、名称与各动作状态。

## Composition
- 复用 Group 和 action-gap；成员使用 Button，真实状态仍在成员处表达。
- 静态文字段用 ButtonGroupText，成员之间的分隔线用 ButtonGroupSeparator；拆分按钮的图标按钮必须有可访问名称。

## Responsive behavior
- 横向默认换行，也可纵向；连体时不换行，相邻边合并。

## Customization
- className 与 render 属于组；不统一改写子按钮。

## Current exports
- ButtonGroup: function; owner button-group; PASS; props: ButtonGroupProps
- ButtonGroupOrientation: type; owner button-group; PASS
- ButtonGroupProps: type; owner button-group; PASS
- ButtonGroupSeparator: function; owner button-group; PASS; props: ButtonGroupSeparatorProps
- ButtonGroupSeparatorProps: type; owner button-group; PASS
- ButtonGroupText: function; owner button-group; PASS; props: ButtonGroupTextProps
- ButtonGroupTextProps: type; owner button-group; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### ButtonGroup
- `align?`: `"center" | "start" | "end" | "stretch" | "baseline"`. 交叉轴对齐（Stack 为横向，Inline 为纵向）。
- `attached?`: `boolean`. 连体：相邻按钮的边合并成一条线，只保留整组外侧的圆角；横排纵排都成立。默认保持各自独立、带动作间隔。
- `justify?`: `"center" | "start" | "end" | "between" | "around" | "evenly"`. 主轴分布（Stack 为纵向，Inline 为横向）。纵向分布需要容器高于内容才看得出。
- `orientation?`: `"horizontal" | "vertical"`.
- `wrap?`: `boolean`.
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### ButtonGroupSeparator
- `decorative?`: `boolean`. 已有文字/结构表达分界时，线条仅作装饰。
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### ButtonGroupText
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`. 与同组按钮同一档。
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)
- Context OrientationContext: without a provider default-value; provided by ButtonGroup

## Curated API
Written descriptions; the list above is the type-resolved fact.

### ButtonGroup
默认 role=group 的开放动作关系。
- aria-label / aria-labelledby: string. 必填其一：动作范围的共同名称，不替代按钮名称；缺失或为空时抛错。
- orientation: "horizontal" | "vertical"; default "horizontal". 布局方向。
- attached: boolean; default false. 连体：相邻按钮的边合并为一条线，只保留整组外侧的圆角，横排纵排都成立；聚焦或悬停的成员升到上层，边线完整可见。连体时不换行。
- align / wrap / render / ref / 原生属性: ButtonGroupProps. 沿用 Group 的组合入口，间隔默认 action-gap。

### ButtonGroupText
组内静态文字段，与同档 bordered 按钮同高、同边线，不可点击也不进焦点顺序。
- size: "xs" | "sm" | "md" | "lg" | "xl"; default "md". 与同组按钮同一档。
- render / ref / 原生属性: useRender props. 默认 span。

### ButtonGroupSeparator
成员之间的分隔线，方向与组相反；非连体组里同样可用。
- decorative: boolean; default true. 分界已由成员表达，默认只是装饰；设为 false 时是带方向的 separator。

## Keyboard
- Tab / Shift+Tab: 依次访问每个可用按钮，禁用按钮不进入焦点顺序。

## Source examples
### 动作范围
Source: apps/docs/src/content/button-group/demos/01-actions.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";
import { ButtonGroup } from "@qingye_lab/ui/components/button-group";

export const meta = { title: "动作范围", titleEn: "Action scope" };
export default function Demo() {
  return <ButtonGroup aria-label="编辑"><Button>应用</Button><Button variant="bordered">重置</Button><Button variant="quiet" disabled>撤销</Button></ButtonGroup>;
}
```

### 纵向
Source: apps/docs/src/content/button-group/demos/02-vertical.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";
import { ButtonGroup } from "@qingye_lab/ui/components/button-group";

export const meta = { title: "纵向", titleEn: "Vertical" };
export default function Demo() {
  return <ButtonGroup aria-label="编辑" orientation="vertical" align="start"><Button>应用</Button><Button variant="bordered">重置</Button></ButtonGroup>;
}
```

### 连体
Source: apps/docs/src/content/button-group/demos/03-attached.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";
import { ButtonGroup } from "@qingye_lab/ui/components/button-group";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "连体", titleEn: "Attached" } satisfies DemoMeta;
export default function Demo() {
  return <div className="flex flex-wrap items-start gap-(--qy-section-gap)">
    <ButtonGroup aria-label="视图" attached><Button variant="bordered">列表</Button><Button variant="bordered">网格</Button><Button variant="bordered">时间线</Button></ButtonGroup>
    <ButtonGroup aria-label="排序" attached orientation="vertical" align="start"><Button variant="bordered">按名称</Button><Button variant="bordered">按时间</Button><Button variant="bordered">按大小</Button></ButtonGroup>
  </div>;
}
```

### 拆分按钮
Source: apps/docs/src/content/button-group/demos/04-split.tsx
```tsx
import { IconChevronDown } from "@tabler/icons-react";
import { Button } from "@qingye_lab/ui/components/button";
import { ButtonGroup } from "@qingye_lab/ui/components/button-group";
import { Menu, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuTrigger } from "@qingye_lab/ui/components/menu";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "拆分按钮", titleEn: "Split button" } satisfies DemoMeta;
export default function Demo() {
  return <ButtonGroup aria-label="发布" attached>
    <Button variant="bordered">发布</Button>
    <Menu><MenuTrigger render={<Button variant="bordered" shape="icon" aria-label="更多发布方式" />}><IconChevronDown aria-hidden="true" /></MenuTrigger><MenuPortal><MenuPositioner align="end"><MenuPopup>
      <MenuItem>定时发布</MenuItem><MenuItem>存为草稿</MenuItem>
    </MenuPopup></MenuPositioner></MenuPortal></Menu>
  </ButtonGroup>;
}
```

### 文字段与分隔
Source: apps/docs/src/content/button-group/demos/05-text.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "@qingye_lab/ui/components/button-group";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "文字段与分隔", titleEn: "Text segment and separator" } satisfies DemoMeta;
export default function Demo() {
  return <div className="flex flex-wrap items-start gap-(--qy-section-gap)">
    <ButtonGroup aria-label="分页" attached><Button variant="bordered">上一页</Button><ButtonGroupText>3 / 12</ButtonGroupText><Button variant="bordered">下一页</Button></ButtonGroup>
    <ButtonGroup aria-label="文本样式"><Button variant="quiet">加粗</Button><ButtonGroupSeparator /><Button variant="quiet">斜体</Button><ButtonGroupSeparator /><Button variant="quiet">下划线</Button></ButtonGroup>
  </div>;
}
```
