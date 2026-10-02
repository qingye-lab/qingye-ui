# 搜索框 SearchInput

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/search-input
Source: packages/ui/src/components/search-input.tsx
Source SHA-256: 5c829851e8998665f40c3163afee92eb62f8558570731ac36fe9b052d3409c8a

带搜索图标、清除按钮与快捷键提示的搜索输入框，用于列表筛选、全局搜索。

## Use and ownership
- 编辑查询条件并筛选列表，清除后继续在同一输入框工作。
- Avoid: loading 只表示正在等待；输入法组字时的 Esc 不应清掉查询草稿。
- Library: 查询输入、清除动作、Esc 与焦点返回。
- Application: 请求、防抖、过期结果保护及查询历史。

## Composition
- 前部图标表达搜索，尾部清除与空值快捷键提示轮换；结果和空态由相邻列表承接。

## Responsive behavior
- 清除按钮预留空间；小屏保留输入字号与可达的清除命中区。

## Customization
- loading、shortcut 和 clearLabel 使用当前属性，不另造搜索控件。

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
- Esc: 有内容时清空；再按一次交给外层（如关闭弹窗）；输入法组字期间保留输入。
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

