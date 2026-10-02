# 控件组 Group

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/group
Source: packages/ui/src/components/group.tsx
Source SHA-256: 2826b46f1153f2796c64e47062d3a74ad10b41f5a6d531c0c269f901c0c2e7d4

把相邻的按钮、输入框、选择器拼成一个整体：共享边框、只在两端保留圆角。用于分段操作、带前后缀的输入、拆分按钮等。

## Use and ownership
- 把相邻的按钮、输入框、选择器拼成一个整体：共享边框、只在两端保留圆角。用于分段操作、带前后缀的输入、拆分按钮等。
- Avoid: 不要让样式替代语义；空值、未知与零分别表达。
- Library: 当前导出和属性定义的基础交互、可访问语义与样式。
- Application: 数据、权限、动作范围、异步结果与持久化。

## Current exports
- ButtonGroup: function; owner group; alias of Group; PASS; props: {
  className?: string;
  orientation?: VariantProps<typeof groupVariants>["orientation"];
  children: React.ReactNode;
} & React.ComponentProps<"div">
- ButtonGroupSeparator: function; owner group; alias of GroupSeparator; PASS; props: {
  className?: string;
} & React.ComponentProps<typeof Separator>
- ButtonGroupText: function; owner group; alias of GroupText; PASS; props: useRender.ComponentProps<"div">
- Group: function; owner group; PASS; props: {
  className?: string;
  orientation?: VariantProps<typeof groupVariants>["orientation"];
  children: React.ReactNode;
} & React.ComponentProps<"div">
- GroupSeparator: function; owner group; PASS; props: {
  className?: string;
} & React.ComponentProps<typeof Separator>
- GroupText: function; owner group; PASS; props: useRender.ComponentProps<"div">
- groupVariants: const; owner group; UNVERIFIED

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Group
容器，带 role="group"；子控件相接处的圆角与边框自动去掉。别名 ButtonGroup。
- orientation: "horizontal" | "vertical"; default "horizontal". 排列方向。
- aria-label: string. 说明这组控件的用途。

### GroupSeparator
相邻控件之间的分隔线；相邻输入框聚焦时随之变为焦点色。别名 ButtonGroupSeparator。
- orientation: "vertical" | "horizontal"; default "vertical". 纵向组里用 horizontal。

### GroupText
不可交互的文字块，作前缀或后缀（如 https://、元）。用 render 渲染为 Label 以关联输入框。别名 ButtonGroupText。

## Keyboard
- Tab: 依次聚焦组内每个控件；组本身不改变键盘行为。

## Source examples
### 默认
Source: apps/docs/src/content/group/demos/01-default.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Group, GroupSeparator } from "@qingye/ui/components/group";
import { ArchiveIcon, ClockIcon, ReplyIcon } from "lucide-react";

export const meta = { title: "默认", description: "outline 按钮相接，用 GroupSeparator 分隔。" };

export default function Demo() {
  return (
    <Group aria-label="邮件操作">
      <Button variant="outline">
        <ReplyIcon />
        回复
      </Button>
      <GroupSeparator />
      <Button variant="outline">
        <ClockIcon />
        稍后提醒
      </Button>
      <GroupSeparator />
      <Button variant="outline">
        <ArchiveIcon />
        归档
      </Button>
    </Group>
  );
}
```

### 尺寸与禁用
Source: apps/docs/src/content/group/demos/02-sizes.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Group, GroupSeparator } from "@qingye/ui/components/group";

export const meta = { title: "尺寸与禁用", description: "组内控件统一尺寸；单个按钮可禁用。" };

const sizes = ["sm", "default", "lg"] as const;

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-4">
      {sizes.map((size) => (
        <Group aria-label="缩放" key={size}>
          <Button size={size} variant="outline">
            缩小
          </Button>
          <GroupSeparator />
          <Button className="numeric" disabled size={size} variant="outline">
            100%
          </Button>
          <GroupSeparator />
          <Button size={size} variant="outline">
            放大
          </Button>
        </Group>
      ))}
    </div>
  );
}
```

### 前后缀与输入
Source: apps/docs/src/content/group/demos/03-input.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Group, GroupSeparator, GroupText } from "@qingye/ui/components/group";
import { Input } from "@qingye/ui/components/input";
import { Label } from "@qingye/ui/components/label";
import { CopyIcon } from "lucide-react";

export const meta = { title: "前后缀与输入", description: "GroupText 作前缀，并渲染为 Label 关联输入框。" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Group aria-label="站点地址" className="w-full">
        <GroupText render={<Label htmlFor="site-domain" />}>https://</GroupText>
        <GroupSeparator />
        <Input defaultValue="qingyan.tech" id="site-domain" />
      </Group>
      <Group aria-label="邀请链接" className="w-full">
        <Input aria-label="邀请链接" defaultValue="qingyan.tech/join/8KQ2" readOnly />
        <GroupSeparator />
        <Button aria-label="复制链接" size="icon" variant="outline">
          <CopyIcon />
        </Button>
      </Group>
      <Group aria-label="预算" className="w-full">
        <Input aria-label="月度预算" defaultValue="2000" inputMode="decimal" />
        <GroupSeparator />
        <GroupText>元 / 月</GroupText>
      </Group>
    </div>
  );
}
```

### 拆分按钮
Source: apps/docs/src/content/group/demos/04-split-button.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Group, GroupSeparator } from "@qingye/ui/components/group";
import { Menu, MenuItem, MenuPopup, MenuTrigger } from "@qingye/ui/components/menu";
import { ChevronDownIcon } from "lucide-react";

export const meta = { title: "拆分按钮", description: "主操作加一个展开更多选项的菜单。" };

export default function Demo() {
  return (
    <Group aria-label="合并方式">
      <Button>合并请求</Button>
      <GroupSeparator className="bg-primary-foreground/24" />
      <Menu>
        <MenuTrigger render={<Button aria-label="选择合并方式" size="icon" />}>
          <ChevronDownIcon />
        </MenuTrigger>
        <MenuPopup align="end">
          <MenuItem>创建合并提交</MenuItem>
          <MenuItem>压缩后合并</MenuItem>
          <MenuItem>变基后合并</MenuItem>
        </MenuPopup>
      </Menu>
    </Group>
  );
}
```

### 纵向与嵌套
Source: apps/docs/src/content/group/demos/05-vertical-nested.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Group, GroupSeparator } from "@qingye/ui/components/group";
import { ChevronLeftIcon, ChevronRightIcon, MinusIcon, PlusIcon } from "lucide-react";

export const meta = { title: "纵向与嵌套", description: "纵向组里分隔线用 horizontal；嵌套的子组之间保留间距。" };

export default function Demo() {
  return (
    <div className="flex items-center gap-8">
      <Group aria-label="地图缩放" orientation="vertical">
        <Button aria-label="放大" size="icon" variant="outline">
          <PlusIcon />
        </Button>
        <GroupSeparator orientation="horizontal" />
        <Button aria-label="缩小" size="icon" variant="outline">
          <MinusIcon />
        </Button>
      </Group>
      <Group aria-label="翻页">
        <Group aria-label="页码">
          <Button className="numeric" variant="outline">1</Button>
          <GroupSeparator />
          <Button className="numeric" variant="outline">2</Button>
          <GroupSeparator />
          <Button className="numeric" variant="outline">3</Button>
        </Group>
        <Group aria-label="前后翻页">
          <Button aria-label="上一页" size="icon" variant="outline">
            <ChevronLeftIcon className="rtl:-scale-x-100" />
          </Button>
          <GroupSeparator />
          <Button aria-label="下一页" size="icon" variant="outline">
            <ChevronRightIcon className="rtl:-scale-x-100" />
          </Button>
        </Group>
      </Group>
    </div>
  );
}
```

