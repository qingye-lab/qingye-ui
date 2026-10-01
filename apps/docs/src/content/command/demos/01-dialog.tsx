import { Button } from "@yanqing/ui/components/button";
import { Command, CommandCollection, CommandDialog, CommandDialogPopup, CommandDialogTrigger, CommandEmpty, CommandFooter, CommandGroup, CommandGroupLabel, CommandInput, CommandItem, CommandList, CommandPanel, CommandSeparator, CommandShortcut } from "@yanqing/ui/components/command";
import { Kbd, KbdGroup } from "@yanqing/ui/components/kbd";
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
