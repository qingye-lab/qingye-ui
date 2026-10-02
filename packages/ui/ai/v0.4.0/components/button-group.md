# 按钮组 ButtonGroup

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/button-group
Source: packages/ui/src/components/button-group.tsx
Source SHA-256: 2eb315ba00d80c2bda3cdeed899b6194b1d9fc97095cecccaf8cf54d4ae6294c

把相关的按钮、输入框或选择框拼接成一个整体，共享边框与圆角，例如分页切换、拆分按钮和“输入 + 操作”。它是 Group 的 shadcn 命名别名，两者是同一个组件。

## Use and ownership
- 拼接围绕同一对象的动作，如执行与展开更多执行方式。
- Avoid: 相邻边框不能把无关动作暗示成同一任务；视觉拼接不自动提供互斥选择或方向键。
- Library: 合并相接边框、端部圆角和焦点层次；不接管子控件的值与 Tab 顺序。
- Application: 命名这组操作并确定子项之间的真实关系、可用条件和结果。

## Composition
- ButtonGroup 是 Group 的同一实现；子项保留 Button、Input、Select 或真实链接的各自语义。

## Responsive behavior
- 竖向与横向按可用空间选择；密集拼接仍需检查相邻触屏命中区。

## Customization
- 通过 orientation 和子控件 size 建立一致几何；别为别名另建一套样式或状态。

## Current exports
- ButtonGroup: function; owner group; alias of Group; PASS; props: {
  className?: string;
  orientation?: VariantProps<typeof groupVariants>["orientation"];
  children: React.ReactNode;
} & React.ComponentProps<"div">
- ButtonGroupProps: type; owner button-group; PASS
- ButtonGroupSeparator: function; owner group; alias of GroupSeparator; PASS; props: {
  className?: string;
} & React.ComponentProps<typeof Separator>
- ButtonGroupText: function; owner group; alias of GroupText; PASS; props: useRender.ComponentProps<"div">
- buttonGroupVariants: const; owner group; alias of groupVariants; UNVERIFIED

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### ButtonGroup
容器（即 Group），role="group"；相邻子元素合并边框与圆角，聚焦的子元素浮到上层以完整显示焦点环。嵌套的 ButtonGroup 之间留出间距。
- orientation: "horizontal" | "vertical"; default "horizontal". 排列方向。
- aria-label: string. 为一组操作命名，屏幕阅读器会读出。

### ButtonGroupSeparator
子元素之间的分隔线（即 GroupSeparator），用于实心按钮之间；相邻输入框聚焦时随之高亮。
- orientation: "vertical" | "horizontal"; default "vertical". 竖直组中改为 horizontal。

### ButtonGroupText
不可交互的文字块（即 GroupText），用于前缀、单位或说明；通过 render 可渲染为 <label>。

## Keyboard
- Tab: 依次聚焦组内的每个控件；按钮组本身不拦截方向键。

## Source examples
### 基础用法
Source: apps/docs/src/content/button-group/demos/01-basic.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { ButtonGroup } from "@qingye/ui";
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export const meta = { title: "基础用法", description: "相邻按钮合并边框与圆角。" };

export default function Demo() {
  return (
    <>
      <ButtonGroup aria-label="翻页">
        <Button variant="outline">
          <ChevronLeftIcon />
          上一篇
        </Button>
        <Button variant="outline">
          下一篇
          <ChevronRightIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup aria-label="对齐方式">
        <Button aria-label="左对齐" size="icon" variant="outline">
          <AlignLeftIcon />
        </Button>
        <Button aria-label="居中" size="icon" variant="outline">
          <AlignCenterIcon />
        </Button>
        <Button aria-label="右对齐" size="icon" variant="outline">
          <AlignRightIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup aria-label="时间范围">
        <Button size="sm" variant="outline">
          今天
        </Button>
        <Button size="sm" variant="outline">
          本周
        </Button>
        <Button size="sm" variant="outline">
          本月
        </Button>
      </ButtonGroup>
    </>
  );
}
```

### 拆分按钮
Source: apps/docs/src/content/button-group/demos/02-split.tsx
```tsx
import { MenuItem, MenuPopup } from "@qingye/ui/components/menu";
import { MenuSeparator } from "@qingye/ui/components/menu";
import { Button } from "@qingye/ui/components/button";
import { Menu, MenuTrigger } from "@qingye/ui/components/menu";
import { ButtonGroup, ButtonGroupSeparator } from "@qingye/ui";
import { ChevronDownIcon, CopyIcon, FileDownIcon, SendIcon } from "lucide-react";

export const meta = { title: "拆分按钮", description: "主操作旁附一个展开更多选项的菜单。" };

export default function Demo() {
  return (
    <>
      <ButtonGroup aria-label="发布">
        <Button>
          <SendIcon />
          发布
        </Button>
        <ButtonGroupSeparator />
        <Menu>
          <MenuTrigger render={<Button aria-label="更多发布选项" size="icon" />}>
            <ChevronDownIcon />
          </MenuTrigger>
          <MenuPopup align="end">
            <MenuItem>定时发布…</MenuItem>
            <MenuItem>发布到测试环境</MenuItem>
            <MenuSeparator />
            <MenuItem>保存为草稿</MenuItem>
          </MenuPopup>
        </Menu>
      </ButtonGroup>
      <ButtonGroup aria-label="导出">
        <Button variant="outline">
          <FileDownIcon />
          导出 Excel
        </Button>
        <Menu>
          <MenuTrigger render={<Button aria-label="更多导出格式" size="icon" variant="outline" />}>
            <ChevronDownIcon />
          </MenuTrigger>
          <MenuPopup align="end">
            <MenuItem>导出 CSV</MenuItem>
            <MenuItem>导出 PDF</MenuItem>
            <MenuSeparator />
            <MenuItem>
              <CopyIcon />
              复制为表格
            </MenuItem>
          </MenuPopup>
        </Menu>
      </ButtonGroup>
    </>
  );
}
```

### 与输入框组合
Source: apps/docs/src/content/button-group/demos/03-input.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Input } from "@qingye/ui/components/input";
import { NativeSelect, NativeSelectOption } from "@qingye/ui/components/native-select";
import { ButtonGroup, ButtonGroupText } from "@qingye/ui";
import { SearchIcon } from "lucide-react";

export const meta = { title: "与输入框组合", description: "输入框、选择框、文字前缀与按钮拼接为一行。" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <ButtonGroup className="w-full">
        <Input aria-label="搜索订单" placeholder="订单号或手机号" />
        <Button aria-label="搜索" size="icon" variant="outline">
          <SearchIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup className="w-full">
        <ButtonGroupText>https://</ButtonGroupText>
        <Input aria-label="自定义域名" defaultValue="shop.qingyun.design" />
        <Button variant="outline">验证</Button>
      </ButtonGroup>
      <ButtonGroup className="w-full">
        <NativeSelect aria-label="币种" className="w-24 min-w-0 shrink-0" defaultValue="cny">
          <NativeSelectOption value="cny">CNY</NativeSelectOption>
          <NativeSelectOption value="usd">USD</NativeSelectOption>
          <NativeSelectOption value="eur">EUR</NativeSelectOption>
        </NativeSelect>
        <Input aria-label="金额" className="numeric" defaultValue="1,280.00" inputMode="decimal" />
        <ButtonGroupText>元</ButtonGroupText>
      </ButtonGroup>
    </div>
  );
}
```

### 纵向与嵌套
Source: apps/docs/src/content/button-group/demos/04-vertical.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { ButtonGroup, ButtonGroupSeparator } from "@qingye/ui";
import { LayersIcon, LocateFixedIcon, MinusIcon, PlusIcon } from "lucide-react";

export const meta = { title: "纵向与嵌套", description: "orientation=\"vertical\" 纵向排列；嵌套的按钮组之间自动留出间距。" };

export default function Demo() {
  return (
    <>
      <ButtonGroup aria-label="地图缩放" orientation="vertical">
        <Button aria-label="放大" size="icon" variant="outline">
          <PlusIcon />
        </Button>
        <Button aria-label="缩小" size="icon" variant="outline">
          <MinusIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup aria-label="地图工具" orientation="vertical">
        <Button aria-label="回到当前位置" size="icon">
          <LocateFixedIcon />
        </Button>
        <ButtonGroupSeparator orientation="horizontal" />
        <Button aria-label="切换图层" size="icon">
          <LayersIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup aria-label="编辑工具栏">
        <ButtonGroup>
          <Button size="sm" variant="outline">
            撤销
          </Button>
          <Button size="sm" variant="outline">
            重做
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button size="sm" variant="outline">
            预览
          </Button>
          <Button size="sm" variant="outline">
            分享
          </Button>
        </ButtonGroup>
      </ButtonGroup>
    </>
  );
}
```

