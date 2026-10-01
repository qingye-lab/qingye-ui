import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, P as KbdGroup, K as Kbd, B as Button } from "./index-DM02Iz28.js";
import { k as CommandDialog, m as CommandDialogTrigger, l as CommandDialogPopup, C as Command, a as CommandInput, b as CommandPanel, c as CommandEmpty, d as CommandList, e as CommandGroup, f as CommandGroupLabel, g as CommandCollection, h as CommandItem, i as CommandShortcut, n as CommandSeparator, j as CommandFooter } from "./command-BRcGQYa0.js";
import { U as UserPlus } from "./user-plus-DS5sj-HE.js";
import { B as Bell } from "./bell-DFpxbhe9.js";
import { S as Settings } from "./settings-D0--ss7R.js";
import { A as ArrowUp } from "./arrow-up-BkVdZzdH.js";
import { A as ArrowDown } from "./arrow-down-D6zHiGm4.js";
import { C as CornerDownLeft } from "./corner-down-left-DCdAQS2c.js";
import "./autocomplete-DlyiU5Sk.js";
import "./input-D9i-AULz.js";
import "./FieldControl-CFc5_9rC.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
import "./chevrons-up-down-BLzcfRd-.js";
import "./ComboboxEmpty-BQp7q2Mg.js";
import "./ListboxSeparator-DfAtCXVV.js";
import "./serializeValue-BLvnTy3o.js";
import "./stringifyLocale-DOx30wH1.js";
import "./areArraysEqual-Bigu0Aq6.js";
import "./resolveAriaLabelledBy-JxsTST5s.js";
const __iconNode$3 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M9 15h6", key: "cctwl0" }],
  ["path", { d: "M12 18v-6", key: "17g6i2" }]
];
const FilePlus = createLucideIcon("file-plus", __iconNode$3);
const __iconNode$2 = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
];
const LayoutDashboard = createLucideIcon("layout-dashboard", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8", key: "10dyio" }],
  ["path", { d: "M10 19v-3.96 3.15", key: "1irgej" }],
  ["path", { d: "M7 19h5", key: "qswx4l" }],
  ["rect", { width: "6", height: "10", x: "16", y: "12", rx: "2", key: "1egngj" }]
];
const MonitorSmartphone = createLucideIcon("monitor-smartphone", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
      key: "qn84l0"
    }
  ],
  ["path", { d: "M13 5v2", key: "dyzc3o" }],
  ["path", { d: "M13 17v2", key: "1ont0d" }],
  ["path", { d: "M13 11v2", key: "1wjjxi" }]
];
const Ticket = createLucideIcon("ticket", __iconNode);
const meta = {
  title: "命令面板",
  description: "按 ⌘J（Windows 为 Ctrl + J）或点击按钮唤起。文档站的搜索已占用 ⌘K，在你的应用里通常绑定 ⌘K。"
};
const groups = [
  {
    value: "跳转",
    items: [
      { value: "dashboard", label: "数据看板", icon: LayoutDashboard, shortcut: "G D" },
      { value: "devices", label: "设备列表", icon: MonitorSmartphone, shortcut: "G E" },
      { value: "tickets", label: "工单中心", icon: Ticket, shortcut: "G T" }
    ]
  },
  {
    value: "操作",
    items: [
      { value: "new-ticket", label: "新建工单", icon: FilePlus, shortcut: "⌘N" },
      { value: "invite", label: "邀请成员", icon: UserPlus },
      { value: "notifications", label: "通知设置", icon: Bell },
      { value: "settings", label: "偏好设置", icon: Settings, shortcut: "⌘," }
    ]
  }
];
function Demo() {
  const [open, setOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "j" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandDialog, { onOpenChange: setOpen, open, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandDialogTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline" }), children: [
      "快速跳转",
      /* @__PURE__ */ jsxRuntimeExports.jsxs(KbdGroup, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: "⌘" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: "J" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CommandDialogPopup, { "aria-label": "命令面板", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Command, { items: groups, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommandInput, { placeholder: "搜索页面或操作…" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandPanel, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CommandEmpty, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CommandList, { children: (group) => /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandGroup, { items: group.items, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CommandGroupLabel, { children: group.value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CommandCollection, { children: (item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { onClick: () => setOpen(false), value: item, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate", children: item.label }),
              item.shortcut ? /* @__PURE__ */ jsxRuntimeExports.jsx(CommandShortcut, { children: item.shortcut }) : null
            ] }, item.value) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CommandSeparator, {})
        ] }, group.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(KbdGroup, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, {}) })
            ] }),
            "选择"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CornerDownLeft, {}) }),
            "执行"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: "Esc" }),
          "关闭"
        ] })
      ] })
    ] }) })
  ] });
}
export {
  Demo as default,
  meta
};
