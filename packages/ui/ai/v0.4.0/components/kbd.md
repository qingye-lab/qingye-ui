# 按键 Kbd

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/kbd
Source: packages/ui/src/components/kbd.tsx
Source SHA-256: 673023c15792f78413ae68384f841ba3b527df8d3fa7bcf9b7e9826ad37242b7

标示键盘按键或快捷键组合，用在说明文字、按钮、输入框提示与菜单中。

## Use and ownership
- 提示实际存在的快捷键或记录一次键盘输入。
- Avoid: 显示并未实现的快捷键；用 Kbd 当可点击按钮；图形按键符号没有可理解名称。
- Library: kbd 语义与文字在按钮中的颜色继承。
- Application: 平台快捷键、冲突处理、作用域与按键名称。

## Composition
- Kbd/KbdGroup 跟随对应动作的文字；实际监听在应用或原语中实现，提示不产生行为。

## Responsive behavior
- 复杂组合允许所在内容换行，不能缩小到不可辨的键帽。

## Customization
- className 控制呈现；平台符号与可访问文本按实际系统匹配。

## Current exports
- Kbd: function; owner kbd; PASS; props: React.ComponentProps<"kbd">
- KbdGroup: function; owner kbd; PASS; props: React.ComponentProps<"kbd">

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Kbd
渲染 <kbd>，一个按键。放在按钮内时自动跟随按钮的文字颜色。

### KbdGroup
渲染 <kbd>，把多个 Kbd 组合成一个快捷键，例如 ⌘ + K。

## Keyboard

## Source examples
### 单键与组合
Source: apps/docs/src/content/kbd/demos/01-default.tsx
```tsx
import { Kbd, KbdGroup } from "@qingye/ui/components/kbd";

export const meta = { title: "单键与组合" };

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>⌥</Kbd>
        <Kbd>⌃</Kbd>
        <Kbd>Esc</Kbd>
        <Kbd>Enter</Kbd>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>⇧</Kbd>
          <Kbd>P</Kbd>
        </KbdGroup>
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd>Alt</Kbd>
          <Kbd>Delete</Kbd>
        </KbdGroup>
      </div>
    </div>
  );
}
```

### 在说明文字中
Source: apps/docs/src/content/kbd/demos/02-in-text.tsx
```tsx
import { Kbd, KbdGroup } from "@qingye/ui/components/kbd";

export const meta = { title: "在说明文字中" };

export default function Demo() {
  return (
    <p className="max-w-sm text-pretty text-center text-muted-foreground text-sm">
      按
      <KbdGroup className="mx-1">
        <Kbd>⌘</Kbd>
        <Kbd>Enter</Kbd>
      </KbdGroup>
      发送消息，按 <Kbd>Esc</Kbd> 放弃编辑。
    </p>
  );
}
```

### 在按钮中
Source: apps/docs/src/content/kbd/demos/03-in-button.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Kbd, KbdGroup } from "@qingye/ui/components/kbd";

export const meta = {
  title: "在按钮中",
  description: "Kbd 自动跟随按钮的文字颜色，在实心、描边与幽灵按钮上都清晰可读。",
};

export default function Demo() {
  return (
    <>
      <Button>
        保存
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>S</Kbd>
        </KbdGroup>
      </Button>
      <Button variant="outline">
        取消
        <Kbd>Esc</Kbd>
      </Button>
      <Button size="sm" variant="ghost">
        新建工单
        <Kbd>C</Kbd>
      </Button>
    </>
  );
}
```

### 在输入框中
Source: apps/docs/src/content/kbd/demos/04-in-input.tsx
```tsx
import { InputGroup, InputGroupAddon, InputGroupInput } from "@qingye/ui/components/input-group";
import { Kbd } from "@qingye/ui/components/kbd";
import { SearchIcon } from "lucide-react";

export const meta = { title: "在输入框中", description: "放进 InputGroupAddon，提示唤起搜索的快捷键。" };

export default function Demo() {
  return (
    <InputGroup className="max-w-xs">
      <InputGroupInput aria-keyshortcuts="Meta+K" aria-label="搜索文档" placeholder="搜索文档…" type="search" />
      <InputGroupAddon>
        <SearchIcon aria-hidden="true" />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <Kbd aria-hidden="true">⌘K</Kbd>
      </InputGroupAddon>
    </InputGroup>
  );
}
```

### 在菜单中
Source: apps/docs/src/content/kbd/demos/05-in-menu.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Kbd, KbdGroup } from "@qingye/ui/components/kbd";
import { Menu, MenuItem, MenuPopup, MenuSeparator, MenuTrigger } from "@qingye/ui/components/menu";
import { ChevronDownIcon } from "lucide-react";

export const meta = { title: "在菜单中", description: "菜单项末端标出对应快捷键。" };

export default function Demo() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>
        编辑
        <ChevronDownIcon aria-hidden="true" />
      </MenuTrigger>
      <MenuPopup align="start" className="min-w-48">
        <MenuItem>
          撤销
          <KbdGroup className="ms-auto">
            <Kbd>⌘</Kbd>
            <Kbd>Z</Kbd>
          </KbdGroup>
        </MenuItem>
        <MenuItem>
          重做
          <KbdGroup className="ms-auto">
            <Kbd>⌘</Kbd>
            <Kbd>⇧</Kbd>
            <Kbd>Z</Kbd>
          </KbdGroup>
        </MenuItem>
        <MenuSeparator />
        <MenuItem>
          查找
          <KbdGroup className="ms-auto">
            <Kbd>⌘</Kbd>
            <Kbd>F</Kbd>
          </KbdGroup>
        </MenuItem>
      </MenuPopup>
    </Menu>
  );
}
```

