# 命令面板 Command

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/command
Source: packages/ui/src/components/command.tsx
Source SHA-256: c7f5394e6236c173cce0773b9ee80ea7afaa65db6dca383596326bd0d9b5ff71

输入框加一张常开的命令列表，用来跳到某处或执行某事。

## Decision
条目是命令（动作），不是填进输入框的值：选中只触发 onSelect，查询文字原样保留。全局快捷键（⌘K）由应用注册，库不监听按键。禁用项显示为不可用，但不参与高亮与方向键移动。

## Notes
- 组件不注册 ⌘K。应用自己监听 metaKey / ctrlKey + k 并控制 CommandDialog 的 open。
- 条目 value 是匹配用的文字；显示内容与 value 不同时，用 keywords 补上能被搜到的词。
- 命令的后果（删除、发布等）不在命令面板里说明：选中后应打开 AlertDialog 或 ConfirmAction。
- 按「候选值」选择文字用 Autocomplete 或 Combobox；命令面板选的是动作。

## Use and ownership
- 输入框加一张常开的命令列表，用来跳到某处或执行某事。
- Avoid: 不要把唯一的关键后果藏在临时浮层；直达与返回都需要成立。
- Library: 查询文字、过滤、高亮、空态与组的收起
- Application: 命令清单、onSelect 的效果、全局快捷键与对话框的打开

## Composition
- CommandDialog + CommandInput + CommandList + CommandGroup / CommandItem + CommandEmpty

## Responsive behavior
- 列表最高占视口高度的 60%，超出在列表内滚动；对话框宽度不超过容器

## Customization
- filter、keywords、shortcut、CommandDialog 的 popupClassName

## Current exports
- Command: function; owner command; PASS; props: CommandProps
- CommandDialog: function; owner command; PASS; props: CommandDialogProps
- CommandDialogProps: type; owner command; PASS
- CommandEmpty: function; owner command; PASS; props: CommandEmptyProps
- CommandEmptyProps: type; owner command; PASS
- CommandFilter: type; owner command; PASS
- CommandFilterEntry: type; owner command; PASS
- CommandGroup: function; owner command; PASS; props: CommandGroupProps
- CommandGroupProps: type; owner command; PASS
- CommandInput: function; owner command; PASS; props: CommandInputProps
- CommandInputProps: type; owner command; PASS
- CommandItem: function; owner command; PASS; props: CommandItemProps
- CommandItemProps: type; owner command; PASS
- CommandList: function; owner command; PASS; props: CommandListProps
- CommandListProps: type; owner command; PASS
- CommandPrimitive: reexport; owner command; alias of AutocompletePrimitive; UNVERIFIED
- CommandProps: type; owner command; PASS
- CommandSeparator: function; owner command; PASS; props: CommandSeparatorProps
- CommandSeparatorProps: type; owner command; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Command
- `defaultQuery?`: `string`.
- `filter?`: `CommandFilter`. 覆盖默认过滤。
- `onItemSelect?`: `(value: string) => void`. 任一条目被选中后调用（在条目自己的 onSelect 之后）；CommandDialog 靠它关闭。
- `onQueryChange?`: `(query: string) => void`.
- `query?`: `string`. 查询文字；受控。
- plus 278 inherited (@types/react 278); not expanded, see the installed declarations

### CommandDialog
- `aria-label?`: `string`. 对话框的名字，二选一必填，缺失抛错。
- `aria-labelledby?`: `string`.
- `closeOnSelect?`: `boolean`. 选中条目后关闭，默认 true。
- `defaultOpen?`: `boolean`.
- `defaultQuery?`: `string`.
- `filter?`: `CommandFilter`. 覆盖默认过滤。
- `onItemSelect?`: `(value: string) => void`. 任一条目被选中后调用（在条目自己的 onSelect 之后）；CommandDialog 靠它关闭。
- `onOpenChange?`: `(open: boolean) => void`.
- `onQueryChange?`: `(query: string) => void`.
- `open?`: `boolean`.
- `popupClassName?`: `string`. 对话框面板的宽度等。
- `query?`: `string`. 查询文字；受控。
- plus 276 inherited (@types/react 276); not expanded, see the installed declarations

### CommandEmpty
- no props declared by this library
- plus 280 inherited (@types/react 280); not expanded, see the installed declarations

### CommandGroup
- `children?`: `React.ReactNode`.
- `heading`: `React.ReactNode`. 组名；也是读屏读到的组名称（group 的 aria-labelledby 指向它）。
- plus 279 inherited (@types/react 279); not expanded, see the installed declarations

### CommandInput
- no props declared by this library
- plus 307 inherited (@types/react 303, @base-ui/react 4); not expanded, see the installed declarations

### CommandItem
- `disabled?`: `boolean`. 禁用项显示为不可用，不参与高亮与键盘移动，不能被选中。
- `keywords?`: `readonly string[]`. 额外的匹配词（别名、英文名、拼音），不显示。
- `onSelect?`: `(value: string) => void`. 被选中（Enter 或点击）时调用。
- `shortcut?`: `string | readonly string[]`. 快捷键的显示，不注册快捷键。数组按键逐个显示。
- `value`: `string`. 命令的标识，也是默认参与匹配的文字；onSelect 收到它。
- plus 279 inherited (@types/react 279); not expanded, see the installed declarations

### CommandList
- no props declared by this library
- plus 280 inherited (@types/react 280); not expanded, see the installed declarations

### CommandSeparator
- no props declared by this library
- plus 280 inherited (@types/react 280); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @daypicker/react, @tabler/icons-react, class-variance-authority, clsx, react, react-dom, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)
- Context CountContext: without a provider default-value; provided by Command
- Context GroupReport: without a provider nullable; provided by CommandGroup
- Context StateContext: without a provider throws; provided by Command
- Context StatusSlotContext: without a provider nullable; provided by Command

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Command
命令列表本体：一个常开的 combobox + listbox，焦点始终留在输入框，高亮用 aria-activedescendant。可单独嵌在页面里。
- filter: (entry: { value, label, keywords }, query: string) => boolean. 覆盖默认过滤。默认：不区分大小写，value、文字子级、keywords 任一包含查询即匹配（中文直接包含匹配）。空查询不调用，恒显示。
- query / defaultQuery / onQueryChange: string / string / (query: string) => void. 查询文字，受控或非受控。
- onItemSelect: (value: string) => void. 任一条目被选中后调用，晚于条目自己的 onSelect。

### CommandInput
查询框，共用 Input 的几何。缺 aria-label / aria-labelledby 时抛错。

### CommandList
listbox。内容多时在列表内滚动，输入框始终可见。需要名字时传 aria-label。

### CommandGroup
一组命令。组内没有匹配项时整组收起。
- heading: ReactNode. 必填。组名，也是读屏读到的 group 名称。

### CommandItem
一条命令，外观与 MenuItem 同一几何。
- value: string. 必填。命令的标识，参与匹配；onSelect 收到它。
- keywords: readonly string[]. 不显示的匹配词：别名、英文名、拼音。
- onSelect: (value: string) => void. Enter 或点击时调用。
- disabled: boolean; default false. 显示为不可用，不参与高亮与方向键移动，不能被选中。
- shortcut: string | readonly string[]. 只显示快捷键，不注册。数组则每个键各一块。

### CommandEmpty
没有任何条目匹配时显示。省略 children 用内置缺省文案；元素常驻，内容变化时读屏才会播报。

### CommandSeparator
组与组之间的分界。查询非空时不渲染，因为此时组会随结果收起。

### CommandDialog
Dialog 里放一份 Command。每次打开都是新的一份，查询自然清空。
- open / defaultOpen / onOpenChange: boolean / boolean / (open: boolean) => void. 打开状态，受控或非受控。
- aria-label / aria-labelledby: string. 二选一必填，缺失抛错。
- closeOnSelect: boolean; default true. 选中条目后关闭。

## Keyboard
- ArrowDown / ArrowUp: 移动高亮；禁用项被跳过。列表挂载时第一项已高亮。
- Enter: 触发高亮项的 onSelect。
- Escape: 在 CommandDialog 中关闭对话框。

## Source examples
### 嵌在页面里
Source: apps/docs/src/content/command/demos/01-inline.tsx
```tsx
import { useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@qingye_lab/ui/components/command";
import { useUILocale } from "@qingye_lab/ui/locale";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "嵌在页面里", titleEn: "Inline" } satisfies DemoMeta;
export default function Demo() {
  const { code } = useUILocale();
  const en = code.startsWith("en");
  const [last, setLast] = useState("");
  return <div className="grid w-full max-w-md gap-(--qy-field-gap)">
    <Command className="rounded-overlay border border-border bg-surface-raised p-(--qy-overlay-inset)">
      <CommandInput aria-label={en ? "Search pages and actions" : "搜索页面与操作"} placeholder={en ? "Search pages and actions" : "搜索页面与操作"} />
      <CommandList aria-label={en ? "Pages and actions" : "页面与操作"}>
        <CommandGroup heading={en ? "Pages" : "页面"}>
          <CommandItem value={en ? "Overview" : "概览"} keywords={["overview", "home", "首页"]} onSelect={setLast}>{en ? "Overview" : "概览"}</CommandItem>
          <CommandItem value={en ? "Devices" : "设备"} keywords={["devices", "硬件"]} onSelect={setLast}>{en ? "Devices" : "设备"}</CommandItem>
          <CommandItem value={en ? "Alerts" : "告警"} disabled>{en ? "Alerts" : "告警"}</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading={en ? "Actions" : "操作"}>
          <CommandItem value={en ? "Export" : "导出"} shortcut={["⌘", "E"]} onSelect={setLast}>{en ? "Export" : "导出"}</CommandItem>
          <CommandItem value={en ? "Switch theme" : "切换主题"} keywords={["theme", "dark", "深色"]} onSelect={setLast}>{en ? "Switch theme" : "切换主题"}</CommandItem>
        </CommandGroup>
        <CommandEmpty />
      </CommandList>
    </Command>
    <output className="text-support text-muted-foreground">{last || "—"}</output>
  </div>;
}
```

### ⌘K 打开
Source: apps/docs/src/content/command/demos/02-dialog.tsx
```tsx
import { useEffect, useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@qingye_lab/ui/components/command";
import { Kbd } from "@qingye_lab/ui/components/kbd";
import { useUILocale } from "@qingye_lab/ui/locale";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "⌘K 打开", titleEn: "Open with ⌘K" } satisfies DemoMeta;
export default function Demo() {
  const { code } = useUILocale();
  const en = code.startsWith("en");
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState("");
  // 快捷键是应用的事：库不监听全局按键，避免与站点已有的快捷键冲突。
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setOpen(value => !value); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);
  return <div className="flex flex-wrap items-center gap-(--qy-action-gap)">
    <Button variant="bordered" onClick={() => setOpen(true)}>{en ? "Search" : "搜索"} <Kbd>⌘K</Kbd></Button>
    <CommandDialog open={open} onOpenChange={setOpen} aria-label={en ? "Command palette" : "命令面板"} onItemSelect={setLast}>
      <CommandInput aria-label={en ? "Search pages and actions" : "搜索页面与操作"} placeholder={en ? "Search pages and actions" : "搜索页面与操作"} />
      <CommandList aria-label={en ? "Pages and actions" : "页面与操作"}>
        <CommandGroup heading={en ? "Pages" : "页面"}>
          <CommandItem value={en ? "Overview" : "概览"}>{en ? "Overview" : "概览"}</CommandItem>
          <CommandItem value={en ? "Devices" : "设备"}>{en ? "Devices" : "设备"}</CommandItem>
          <CommandItem value={en ? "Settings" : "设置"} shortcut="⌘,">{en ? "Settings" : "设置"}</CommandItem>
        </CommandGroup>
        <CommandGroup heading={en ? "Actions" : "操作"}>
          <CommandItem value={en ? "Export" : "导出"} shortcut={["⌘", "E"]}>{en ? "Export" : "导出"}</CommandItem>
          <CommandItem value={en ? "Switch theme" : "切换主题"}>{en ? "Switch theme" : "切换主题"}</CommandItem>
        </CommandGroup>
        <CommandEmpty />
      </CommandList>
    </CommandDialog>
    <output className="text-support text-muted-foreground">{last || "—"}</output>
  </div>;
}
```
