# 搜索框 SearchInput

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/search-input
Source: packages/ui/src/components/search-input.tsx
Source SHA-256: 69e6260e0273603e7a1898d71251e8b4ef5f96a522676bc7c116f7c0e7d3bf65

带搜索图标、清除按钮与快捷键提示的搜索输入框，用于列表筛选、全局搜索。

## Use and ownership
- 带搜索图标、清除按钮与快捷键提示的搜索输入框，用于列表筛选、全局搜索。
- Avoid: 不能仅用 placeholder 代替名称；失败后不要无故清空输入。
- Library: 当前导出和属性定义的基础交互、可访问语义与样式。
- Application: 对象、草稿、校验业务规则、版本与保存结果。

## Current exports
- SearchInput: function; owner search-input; PASS; props: SearchInputProps
- SearchInputProps: type; owner search-input; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### SearchInput
基于 InputGroup，渲染 <input type="search">。className 作用于外框，其余属性透传给 <input>。
- value / defaultValue: string. 受控 / 非受控的搜索词。
- onValueChange: (value: string) => void. 输入或清除时调用。
- onClear: () => void. 通过清除按钮或 Esc 清空后调用。
- size: "sm" | "default" | "lg"; default "default". 输入框尺寸，清除按钮随之调整。
- shortcut: ReactNode. 为空时显示在末端的提示，例如 <Kbd>⌘K</Kbd>；有内容时让位给清除按钮。
- loading: boolean; default false. 用 Spinner 替换搜索图标。
- clearLabel: string; default locale: clearSearch. 清除按钮的可访问名称。
- placeholder: string; default locale: searchPlaceholder. 占位文字。

## Keyboard
- Esc: 有内容时清空；再按一次交给外层（如关闭弹窗）。
- Tab: 从输入框移到清除按钮。
- Enter / Space: 在清除按钮上清空，并把焦点还给输入框。

## Source examples
### 默认
Source: apps/docs/src/content/search-input/demos/01-default.tsx
```tsx
import { SearchInput } from "@qingye/ui/components/search-input";

export const meta = { title: "默认", description: "输入后出现清除按钮，按 Esc 也可清空。" };

export default function Demo() {
  return <SearchInput aria-label="搜索订单" className="max-w-xs" defaultValue="退款" placeholder="搜索订单号、客户、商品" />;
}
```

### 快捷键提示
Source: apps/docs/src/content/search-input/demos/02-shortcut.tsx
```tsx
import { Kbd } from "@qingye/ui/components/kbd";
import { SearchInput } from "@qingye/ui/components/search-input";

export const meta = { title: "快捷键提示", description: "为空时在末端提示唤起快捷键。" };

export default function Demo() {
  return (
    <SearchInput
      aria-keyshortcuts="Meta+K"
      aria-label="搜索文档"
      className="max-w-xs"
      placeholder="搜索文档…"
      shortcut={<Kbd>⌘K</Kbd>}
    />
  );
}
```

### 尺寸
Source: apps/docs/src/content/search-input/demos/03-sizes.tsx
```tsx
import { SearchInput } from "@qingye/ui/components/search-input";

export const meta = { title: "尺寸" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <SearchInput aria-label="搜索" defaultValue="摄像头" size="sm" />
      <SearchInput aria-label="搜索" defaultValue="摄像头" />
      <SearchInput aria-label="搜索" defaultValue="摄像头" size="lg" />
    </div>
  );
}
```

### 加载与禁用
Source: apps/docs/src/content/search-input/demos/04-states.tsx
```tsx
import { SearchInput } from "@qingye/ui/components/search-input";

export const meta = { title: "加载与禁用", description: "loading 用 Spinner 替换搜索图标；禁用时不显示清除按钮。" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <SearchInput aria-label="搜索客户" defaultValue="王" loading />
      <SearchInput aria-label="搜索客户" disabled placeholder="同步完成前不可搜索" />
    </div>
  );
}
```

### 组合：筛选列表
Source: apps/docs/src/content/search-input/demos/05-filter-list.tsx
```tsx
import { SearchInput } from "@qingye/ui/components/search-input";
import { useState } from "react";

export const meta = { title: "组合：筛选列表", description: "受控使用，实时过滤下方列表。" };

const devices = [
  { name: "SH-204 门禁控制器", place: "上海 · 张江园区" },
  { name: "HZ-031 温湿度传感器", place: "杭州 · 滨江仓" },
  { name: "HZ-112 网络摄像机", place: "杭州 · 滨江仓" },
  { name: "SZ-008 智能电表", place: "深圳 · 南山办公室" },
];

export default function Demo() {
  const [query, setQuery] = useState("");
  const results = devices.filter((device) => `${device.name}${device.place}`.includes(query.trim()));
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <SearchInput aria-label="搜索设备" onValueChange={setQuery} placeholder="搜索设备名称或位置" value={query} />
      <ul className="divide-y rounded-lg border">
        {results.map((device) => (
          <li className="flex flex-col gap-0.5 px-3 py-2" key={device.name}>
            <span className="font-medium text-sm">{device.name}</span>
            <span className="text-muted-foreground text-xs">{device.place}</span>
          </li>
        ))}
        {results.length === 0 ? (
          <li className="px-3 py-6 text-center text-muted-foreground text-sm">没有找到“{query}”相关的设备</li>
        ) : null}
      </ul>
    </div>
  );
}
```

