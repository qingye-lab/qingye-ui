# Command

Package: @qingye_lab/ui@5.6.0
Import: @qingye_lab/ui/components/command
Source: packages/ui/src/components/command.tsx
Source SHA-256: 0faa06a6dacca30a77dbe5226b181c1d6960d85fdbea4610e3761e0197e04879

A search box over an always-open list of commands, for jumping somewhere or doing something.

## Decision
Items are commands (actions), not values filled into the input: selecting only fires onSelect and the query text stays. The global shortcut (⌘K) is registered by the application; the library listens to no keys. Disabled items show as unavailable but take no part in highlighting or arrow-key movement.

## Notes
- The component does not register ⌘K. The application listens for metaKey / ctrlKey + k and controls the CommandDialog's open.
- An item's value is the text it matches on. When the displayed content differs from the value, add keywords for terms that should find it.
- Consequences of a command (delete, publish, …) are not explained in the palette: selecting one should open an AlertDialog or ConfirmAction.
- Use Autocomplete or Combobox to choose a text value; a command palette chooses an action.

## Use and ownership
- A command palette for jumping somewhere or running something; items are actions, not values to fill in.
- Avoid: Use Select or Combobox to choose a value for a form.
- Avoid: Use Menu for a few fixed actions; Autocomplete for input suggestions.
- Library: Query text, filtering, highlight, the empty state, and group collapse.
- Application: The list of commands, what onSelect does, the global shortcut, and opening the dialog.

## Composition
- CommandDialog + CommandInput + CommandList + CommandGroup / CommandItem + CommandEmpty

## Responsive behavior
- The list is at most 60% of the viewport height and scrolls inside; the dialog is never wider than its container.

## Customization
- filter, keywords, shortcut, CommandDialog's popupClassName.

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
- `aria-label?`: `string`. 对话框的名字，未提供 title 时二选一必填，缺失抛错。
- `aria-labelledby?`: `string`.
- `closeOnSelect?`: `boolean`. 选中条目后关闭，默认 true。
- `defaultOpen?`: `boolean`.
- `defaultQuery?`: `string`.
- `description?`: `React.ReactNode`. 可见说明，随 title 渲染在 DialogHeader 内。
- `filter?`: `CommandFilter`. 覆盖默认过滤。
- `onItemSelect?`: `(value: string) => void`. 任一条目被选中后调用（在条目自己的 onSelect 之后）；CommandDialog 靠它关闭。
- `onOpenChange?`: `(open: boolean) => void`.
- `onOpenChangeComplete?`: `DialogProps["onOpenChangeComplete"]`.
- `onQueryChange?`: `(query: string) => void`.
- `open?`: `boolean`.
- `popupClassName?`: `string`. 对话框面板的宽度等。
- `popupProps?`: `Omit<DialogPopupProps, "children" | "className" | "aria-label" | "aria-labelledby">`. 透传给内部 DialogPopup 的属性（如 initialFocus / finalFocus / portalProps 等）；名字走上面的 title / aria-label，data-slot 不可覆盖。
- `query?`: `string`. 查询文字；受控。
- `title?`: `React.ReactNode`. 可见标题；提供时渲染 DialogHeader + DialogTitle（及可选 description），并以它为对话框的名字——此时 aria-label / aria-labelledby 被忽略，读屏名称与屏幕上的标题一致。
- plus 275 inherited (@types/react 275); not expanded, see the installed declarations

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
The list itself: an always-open combobox and listbox. Focus stays in the input and the highlight uses aria-activedescendant. Can sit directly in a page.
- filter: (entry: { value, label, keywords }, query: string) => boolean. Replace the default filter. By default a case-insensitive match against value, text children, or any keyword; CJK text matches by containment. Not called for an empty query, which shows everything.
- query / defaultQuery / onQueryChange: string / string / (query: string) => void. The query text, controlled or uncontrolled.
- onItemSelect: (value: string) => void. Called after any item is selected, after the item's own onSelect.

### CommandInput
The search box, sharing Input's geometry. Throws without aria-label or aria-labelledby.

### CommandList
The listbox. Long content scrolls inside it while the input stays visible. Pass aria-label to name it.

### CommandGroup
A group of commands. It collapses when none of its items match.
- heading: ReactNode. Required. The group's title and the name a screen reader announces for the group.

### CommandItem
One command, with the same geometry as MenuItem.
- value: string. Required. The command's identity, used for matching and handed to onSelect.
- keywords: readonly string[]. Hidden match terms: aliases, English names, pinyin.
- onSelect: (value: string) => void. Called on Enter or click.
- disabled: boolean; default false. Shown as unavailable; takes no part in highlighting or arrow-key movement and cannot be selected.
- shortcut: string | readonly string[]. Displays a shortcut without registering it. An array shows one block per key.

### CommandEmpty
Shown when nothing matches. Omit children for the built-in text. The element stays mounted so that screen readers announce the change.

### CommandSeparator
A divider between groups. Not rendered while the query is non-empty, since groups collapse with the results.

### CommandDialog
A Command inside a Dialog. Each opening is a fresh instance, so the query starts empty.
- open / defaultOpen / onOpenChange / onOpenChangeComplete: boolean / boolean / (open: boolean) => void / DialogProps["onOpenChangeComplete"]. Open state, controlled or uncontrolled; onOpenChangeComplete runs after open/close transitions finish.
- title / description: ReactNode / ReactNode. Visible title and optional description; providing title renders DialogHeader + DialogTitle and waives aria-label / aria-labelledby.
- aria-label / aria-labelledby: string. One is required when title is omitted; omitting both throws. Ignored when title is given: the visible title names the dialog.
- closeOnSelect: boolean; default true. Close after an item is selected.
- popupClassName / popupProps: string / Omit<DialogPopupProps, "children" | "className" | "aria-label" | "aria-labelledby">. Dialog popup className and remaining props forwarded to the inner DialogPopup (such as initialFocus, finalFocus, portalProps).
- filter / query / defaultQuery / onQueryChange / onItemSelect: CommandProps. Forwarded to the inner Command, with the same meaning.

## Keyboard
- ArrowDown / ArrowUp: Move the highlight, skipping disabled items. The first item is highlighted when the list mounts.
- Enter: Run the highlighted item's onSelect.
- Escape: Close the dialog in a CommandDialog.

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
