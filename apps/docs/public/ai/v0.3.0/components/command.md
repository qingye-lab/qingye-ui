# 命令面板 Command

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/command
Source: packages/ui/src/components/command.tsx
Source SHA-256: e2c2aff82dcfb45987ad5a5cb920d9195feb03875361eed626276aecdef94de2

可搜索的命令与导航列表，通常用快捷键唤起，让熟练用户不离开键盘就能跳转页面或执行操作。也可以内嵌在页面中作为可筛选的选择列表。

## Use and ownership
- 用可搜索的命令或页面目标缩短熟练用户的操作路径，同时保留可见普通入口。
- Avoid: 没有匹配与正在加载、失败不能混为同一空态；选择高亮项不等于业务执行成功。
- Library: 管理筛选列表、键盘高亮和执行入口、空结果文本、Dialog 名称与焦点返回。
- Application: 维护命令对象、搜索数据、权限、全局快捷键冲突与执行结果；跳转后把焦点交给目标页面。

## Composition
- Input + Panel / List 管理查找，Dialog 外壳管理唤起与返回；内嵌输入设置 autoFocus=false 保持当前工作。

## Responsive behavior
- 结果列表可滚动并保留搜索框；粗指针命令行保持可点高度，长目标名称优先保留辨认信息。

## Customization
- 自定义筛选通过 filteredItems 接入，快捷键提示保持可读；不把快捷键展示当成已注册能力。

## Current exports
- Command: function; owner command; PASS; props: React.ComponentProps<typeof Autocomplete>
- CommandCollection: const; owner command; UNVERIFIED
- CommandCreateHandle: const; owner command; PASS
- CommandDialog: const; owner command; PASS
- CommandDialogBackdrop: function; owner command; PASS; props: CommandDialogPrimitive.Backdrop.Props
- CommandDialogPopup: function; owner command; PASS; props: CommandDialogPrimitive.Popup.Props & {
  portalProps?: CommandDialogPrimitive.Portal.Props;
}
- CommandDialogPortal: const; owner command; PASS
- CommandDialogPrimitive: reexport; owner command; UNVERIFIED
- CommandDialogTrigger: function; owner command; PASS; props: CommandDialogPrimitive.Trigger.Props
- CommandDialogViewport: function; owner command; PASS; props: CommandDialogPrimitive.Viewport.Props
- CommandEmpty: function; owner command; PASS; props: React.ComponentProps<typeof AutocompleteEmpty>
- CommandFooter: function; owner command; PASS; props: React.ComponentProps<"div">
- CommandGroup: function; owner command; PASS; props: React.ComponentProps<typeof AutocompleteGroup>
- CommandGroupLabel: function; owner command; PASS; props: React.ComponentProps<typeof AutocompleteGroupLabel>
- CommandInput: function; owner command; PASS; props: React.ComponentProps<typeof AutocompleteInput>
- CommandItem: function; owner command; PASS; props: React.ComponentProps<typeof AutocompleteItem>
- CommandList: function; owner command; PASS; props: React.ComponentProps<typeof AutocompleteList>
- CommandPanel: function; owner command; PASS; props: React.ComponentProps<"div">
- CommandSeparator: function; owner command; PASS; props: React.ComponentProps<typeof AutocompleteSeparator>
- CommandShortcut: function; owner command; PASS; props: React.ComponentProps<"kbd">

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### CommandDialog
面板的对话框外壳（基于 Dialog）。
- open / defaultOpen: boolean; default false. 受控 / 非受控的打开状态，配合全局快捷键使用受控模式。
- onOpenChange: (open, details) => void. 打开状态变化时调用。

### CommandDialogTrigger
打开面板的按钮。

### CommandDialogPopup
面板容器，顶部对齐，宽 36rem；需要 aria-label 或可见标题提供名称。

### Command
搜索与列表的根（基于 Autocomplete），始终展开并自动高亮第一项。
- items: Item[] | Group[]. 全部数据；分组时每组含 items。
- filteredItems: Item[] | Group[]. 自行筛选（例如拼音或远程搜索）时传入结果。
- value / defaultValue / onValueChange: string. 搜索框内容。
- autoHighlight: "always" | boolean; default "always". 始终高亮第一个匹配项，回车即可执行。

### CommandInput
搜索框，打开时自动聚焦。
- placeholder: string; default “输入命令或搜索…”. 占位文字，默认来自 useUILocale()。
- autoFocus: boolean; default true. 内嵌在页面中时设为 false，避免抢走焦点。

### CommandPanel
列表外的浮起面板。

### CommandList
结果列表；传入渲染函数逐组 / 逐项渲染，超出时滚动。

### CommandEmpty
没有匹配结果时显示，默认文案“没有匹配的结果”。

### CommandGroup / CommandGroupLabel / CommandCollection
分组、组标题，以及渲染组内条目的集合。

### CommandItem
一条命令；图标自动对齐尺寸。
- value: Item. 对应的数据项。
- onClick: (event) => void. 点击或回车时执行。
- disabled: boolean; default false. 禁用。

### CommandShortcut
右侧的快捷键提示，仅作展示。

### CommandSeparator
组之间的分隔线，最后一组后自动隐藏。

### CommandFooter
底部的键盘操作提示。

## Keyboard
- ⌘K / Ctrl + K: 在应用中通常用来唤起面板（需自行注册）。
- ↑ / ↓: 在结果之间移动。
- Enter: 执行高亮的命令。
- Esc: 关闭面板，焦点回到之前的位置。

## Source examples
### 命令面板
Source: apps/docs/src/content/command/demos/01-dialog.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Command, CommandCollection, CommandDialog, CommandDialogPopup, CommandDialogTrigger, CommandEmpty, CommandFooter, CommandGroup, CommandGroupLabel, CommandInput, CommandItem, CommandList, CommandPanel, CommandSeparator, CommandShortcut } from "@qingye/ui/components/command";
import { Kbd, KbdGroup } from "@qingye/ui/components/kbd";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BellIcon,
  CornerDownLeftIcon,
  FilePlusIcon,
  LayoutDashboardIcon,
  type LucideIcon,
  MonitorSmartphoneIcon,
  SettingsIcon,
  TicketIcon,
  UserPlusIcon,
} from "lucide-react";
import { Fragment, useEffect, useState } from "react";

export const meta = {
  title: "命令面板",
  description: "按 ⌘J（Windows 为 Ctrl + J）或点击按钮唤起。文档站的搜索已占用 ⌘K，在你的应用里通常绑定 ⌘K。",
};

interface Item {
  value: string;
  label: string;
  icon: LucideIcon;
  shortcut?: string;
}

const groups: { value: string; items: Item[] }[] = [
  {
    value: "跳转",
    items: [
      { value: "dashboard", label: "数据看板", icon: LayoutDashboardIcon, shortcut: "G D" },
      { value: "devices", label: "设备列表", icon: MonitorSmartphoneIcon, shortcut: "G E" },
      { value: "tickets", label: "工单中心", icon: TicketIcon, shortcut: "G T" },
    ],
  },
  {
    value: "操作",
    items: [
      { value: "new-ticket", label: "新建工单", icon: FilePlusIcon, shortcut: "⌘N" },
      { value: "invite", label: "邀请成员", icon: UserPlusIcon },
      { value: "notifications", label: "通知设置", icon: BellIcon },
      { value: "settings", label: "偏好设置", icon: SettingsIcon, shortcut: "⌘," },
    ],
  },
];

export default function Demo() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "j" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <CommandDialog onOpenChange={setOpen} open={open}>
      <CommandDialogTrigger render={<Button variant="outline" />}>
        快速跳转
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>J</Kbd>
        </KbdGroup>
      </CommandDialogTrigger>
      <CommandDialogPopup aria-label="命令面板">
        <Command items={groups}>
          <CommandInput placeholder="搜索页面或操作…" />
          <CommandPanel>
            <CommandEmpty />
            <CommandList>
              {(group: (typeof groups)[number]) => (
                <Fragment key={group.value}>
                  <CommandGroup items={group.items}>
                    <CommandGroupLabel>{group.value}</CommandGroupLabel>
                    <CommandCollection>
                      {(item: Item) => (
                        <CommandItem key={item.value} onClick={() => setOpen(false)} value={item}>
                          <item.icon />
                          <span className="flex-1 truncate">{item.label}</span>
                          {item.shortcut ? <CommandShortcut>{item.shortcut}</CommandShortcut> : null}
                        </CommandItem>
                      )}
                    </CommandCollection>
                  </CommandGroup>
                  <CommandSeparator />
                </Fragment>
              )}
            </CommandList>
          </CommandPanel>
          <CommandFooter>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <KbdGroup>
                  <Kbd>
                    <ArrowUpIcon />
                  </Kbd>
                  <Kbd>
                    <ArrowDownIcon />
                  </Kbd>
                </KbdGroup>
                选择
              </span>
              <span className="flex items-center gap-1.5">
                <Kbd>
                  <CornerDownLeftIcon />
                </Kbd>
                执行
              </span>
            </div>
            <span className="flex items-center gap-1.5">
              <Kbd>Esc</Kbd>
              关闭
            </span>
          </CommandFooter>
        </Command>
      </CommandDialogPopup>
    </CommandDialog>
  );
}
```

### 内嵌列表
Source: apps/docs/src/content/command/demos/02-inline.tsx
```tsx
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList, CommandPanel } from "@qingye/ui/components/command";
import { CheckIcon } from "lucide-react";
import { useState } from "react";

export const meta = {
  title: "内嵌列表",
  description: "不放在对话框里，作为可搜索的选择列表；关闭 autoFocus 以免抢走页面焦点。",
};

const projects = [
  { value: "east", label: "华东仓储" },
  { value: "south", label: "华南门店" },
  { value: "southwest", label: "西南物流" },
  { value: "north", label: "华北工厂" },
  { value: "hq", label: "总部行政" },
];

export default function Demo() {
  const [selected, setSelected] = useState("east");

  return (
    <div className="w-full max-w-xs rounded-2xl border bg-muted/72">
      <Command items={projects}>
        <CommandInput aria-label="搜索项目" autoFocus={false} placeholder="切换项目…" />
        <CommandPanel>
          <CommandEmpty>没有找到这个项目</CommandEmpty>
          <CommandList>
            {(project: (typeof projects)[number]) => (
              <CommandItem key={project.value} onClick={() => setSelected(project.value)} value={project}>
                <span className="flex-1">{project.label}</span>
                {selected === project.value ? <CheckIcon /> : null}
              </CommandItem>
            )}
          </CommandList>
        </CommandPanel>
      </Command>
    </div>
  );
}
```

### 空状态
Source: apps/docs/src/content/command/demos/03-empty.tsx
```tsx
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList, CommandPanel } from "@qingye/ui/components/command";

export const meta = {
  title: "空状态",
  description: "没有匹配项时显示 CommandEmpty；不传内容时使用内置文案。",
};

const devices = ["仓库 3 号扫码枪", "前台标签打印机", "冷库温控器"];

export default function Demo() {
  return (
    <div className="w-full max-w-xs rounded-2xl border bg-muted/72">
      <Command defaultValue="投影仪" items={devices}>
        <CommandInput aria-label="搜索设备" autoFocus={false} />
        <CommandPanel>
          <CommandEmpty />
          <CommandList>
            {(device: string) => (
              <CommandItem key={device} value={device}>
                {device}
              </CommandItem>
            )}
          </CommandList>
        </CommandPanel>
      </Command>
    </div>
  );
}
```

