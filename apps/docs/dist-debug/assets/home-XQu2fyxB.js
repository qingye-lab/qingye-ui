import { c as createLucideIcon, j as jsxRuntimeExports, S as SITE, B as Button, A as ArrowRight, L as Link, a as components, G as GitHubIcon, r as reactExports, t as toastManager, u as useTheme, K as Kbd, M as Moon } from "./index-DM02Iz28.js";
import { A as Avatar, a as AvatarFallback } from "./avatar-95P5m5ew.js";
import { B as Badge } from "./badge-_p6hdBjF.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardPanel, e as CardFooter, f as CardAction } from "./card-BUhACMgh.js";
import { C as Command, a as CommandInput, b as CommandPanel, c as CommandEmpty, d as CommandList, e as CommandGroup, f as CommandGroupLabel, g as CommandCollection, h as CommandItem, i as CommandShortcut, j as CommandFooter } from "./command-BRcGQYa0.js";
import { F as Field, a as FieldLabel, b as FieldDescription } from "./field-BVswHr8Y.js";
import { I as Input } from "./input-D9i-AULz.js";
import { I as InputGroup, a as InputGroupAddon, b as InputGroupText, c as InputGroupInput } from "./input-group-2ApKrTnA.js";
import { L as Label } from "./label-DS1FPyP3.js";
import { R as RadioGroup, a as Radio } from "./radio-group-CdHI6cJj.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectPopup, d as SelectItem } from "./select-D8_OW39t.js";
import { S as Separator } from "./separator-CcYO5Zxi.js";
import { S as Switch } from "./switch-aO11CiwY.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-CptMCabx.js";
import { T as Tabs, a as TabsList, b as TabsTab, c as TabsPanel } from "./tabs-DqRxi0L7.js";
import { C as CopyCodeButton, a as CodeView } from "./code-block-DcaGy5kk.js";
import { u as useDocumentTitle } from "./prose-Boxfwb1Q.js";
import { U as UserPlus } from "./user-plus-DS5sj-HE.js";
import { C as CornerDownLeft } from "./corner-down-left-DCdAQS2c.js";
import { S as Settings } from "./settings-D0--ss7R.js";
import "./autocomplete-DlyiU5Sk.js";
import "./chevrons-up-down-BLzcfRd-.js";
import "./ComboboxEmpty-BQp7q2Mg.js";
import "./ListboxSeparator-DfAtCXVV.js";
import "./serializeValue-BLvnTy3o.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
import "./stringifyLocale-DOx30wH1.js";
import "./areArraysEqual-Bigu0Aq6.js";
import "./resolveAriaLabelledBy-JxsTST5s.js";
import "./FieldsetRootContext-Dg8z8pLL.js";
import "./useFieldValidation-CDOPo50V.js";
import "./useRegisteredLabelId-CQd8UikR.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./FieldControl-CFc5_9rC.js";
import "./textarea-DkoqBXET.js";
import "./RadioGroup-BEp5uKmZ.js";
import "./CompositeRoot-xQsp56hN.js";
import "./isElementDisabled-2KG8-O4B.js";
import "./useAriaLabelledBy-CcCbgu8M.js";
import "./RadioIndicator-BxMi2w3T.js";
import "./chevron-down-DlWyuvnt.js";
import "./segmented-control-BQMJ2MA6.js";
import "./useForcedRerendering-B3yRwVad.js";
import "./PrehydrationScript-DonLZqUI.js";
import "./copy-CMgYpHr5.js";
import "./alert-twlv_qhe.js";
const __iconNode = [
  ["path", { d: "M12 10v6", key: "1bos4e" }],
  ["path", { d: "M9 13h6", key: "1uhe8q" }],
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ]
];
const FolderPlus = createLucideIcon("folder-plus", __iconNode);
function SettingRow({ title, description, defaultChecked }) {
  const id = reactExports.useId();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col gap-0.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: id, children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: description })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { defaultChecked: defaultChecked ?? false, id })
  ] });
}
const quietHours = [
  { label: "不设置", value: "none" },
  { label: "每天 22:00 – 08:00", value: "night" },
  { label: "工作日 19:00 之后", value: "evening" }
];
function NotificationsCard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "通知" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "选择你希望收到的提醒。" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardPanel, { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { defaultChecked: true, description: "有人回复或 @ 你时", title: "评论与提及" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { defaultChecked: true, description: "每周一上午汇总项目进展", title: "每周摘要" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { description: "新功能与改进说明", title: "产品更新" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "免打扰时段" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { defaultValue: "night", items: quietHours, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectPopup, { children: quietHours.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: item.value, children: item.label }, item.value)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription, { children: "这段时间内只推送紧急通知。" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardFooter, { className: "justify-end gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", children: "恢复默认" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => toastManager.add({ title: "通知偏好已保存", type: "success" }), size: "sm", children: "保存更改" })
    ] })
  ] });
}
function ProjectCard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "新建项目" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "项目创建后可以随时修改这些设置。" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardPanel, { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "项目名称" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: "年度品牌升级" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "访问地址" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(InputGroup, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupAddon, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupText, { children: "yanqing.dev/" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupInput, { "aria-label": "访问地址", defaultValue: "brand-2026" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", id: "visibility-label", children: "可见范围" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(RadioGroup, { "aria-labelledby": "visibility-label", className: "gap-2.5", defaultValue: "members", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "font-normal", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { value: "members" }),
            "仅项目成员"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "font-normal", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { value: "org" }),
            "组织内所有人"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardFooter, { className: "justify-end gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", children: "取消" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => toastManager.add({ title: "已创建“年度品牌升级”", description: "可以开始邀请成员了。", type: "success" }), size: "sm", children: "创建项目" })
    ] })
  ] });
}
const members = [
  { name: "林晚", email: "lin.wan@example.com", role: "所有者", status: "online", active: "刚刚" },
  { name: "周屿", email: "zhou.yu@example.com", role: "管理员", status: "online", active: "4 分钟前" },
  { name: "陈默", email: "chen.mo@example.com", role: "成员", status: "away", active: "1 小时前" },
  { name: "许知远", email: "xu.zy@example.com", role: "成员", status: "away", active: "昨天" },
  { name: "宋青", email: "song.qing@example.com", role: "成员", status: "invited", active: "—" }
];
const STATUS = {
  online: { label: "在线", variant: "success" },
  away: { label: "离开", variant: "secondary" },
  invited: { label: "待接受", variant: "warning" }
};
function MembersCard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "成员" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "5 人 · 2 人在线" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardAction, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => toastManager.add({ title: "邀请链接已复制", type: "success" }), size: "sm", variant: "outline", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { "aria-hidden": "true" }),
        "邀请"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { density: "compact", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "ps-6", children: "姓名" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "max-sm:hidden", children: "角色" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "状态" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "pe-6 text-end max-sm:hidden", children: "最近活跃" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: members.map((member) => {
        const status = STATUS[member.status];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "ps-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: member.name.slice(0, 1) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: member.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: member.email })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground max-sm:hidden", children: member.role }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: status.variant, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", className: "size-1.5 rounded-full bg-current" }),
            status.label
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "pe-6 text-end text-muted-foreground numeric max-sm:hidden", children: member.active })
        ] }, member.email);
      }) })
    ] }) })
  ] });
}
function PalettePreview() {
  const { resolvedTheme, setTheme } = useTheme();
  const say = (title) => () => toastManager.add({ title, type: "info" });
  const groups = [
    {
      value: "操作",
      items: [
        { value: "new", label: "新建项目", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FolderPlus, {}), shortcut: "⌘N", run: say("演示：新建项目") },
        { value: "invite", label: "邀请成员", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, {}), shortcut: "⌘I", run: say("演示：邀请成员") },
        {
          value: "theme",
          label: resolvedTheme === "dark" ? "切换到浅色" : "切换到深色",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, {}),
          run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark")
        }
      ]
    },
    {
      value: "前往",
      items: [
        { value: "settings", label: "项目设置", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, {}), run: say("演示：打开项目设置") },
        { value: "github", label: "GitHub 仓库", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(GitHubIcon, { className: "size-4" }), run: () => window.open(SITE.repo, "_blank", "noreferrer") }
      ]
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex flex-col rounded-2xl border bg-popover not-dark:bg-clip-padding shadow-xs/5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] before:bg-muted/72", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Command, { items: groups, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CommandInput, { "aria-label": "命令面板示例", autoFocus: false, placeholder: "输入命令…" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandPanel, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommandEmpty, { children: "没有匹配的命令。" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommandList, { className: "max-h-80", children: (group, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandGroup, { className: index > 0 ? "mt-2" : void 0, items: group.items, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CommandGroupLabel, { children: group.value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CommandCollection, { children: (item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { className: "gap-2.5 [&_svg]:size-4 [&_svg]:opacity-64", onClick: item.run, value: item, children: [
          item.icon,
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate", children: item.label }),
          item.shortcut ? /* @__PURE__ */ jsxRuntimeExports.jsx(CommandShortcut, { children: item.shortcut }) : null
        ] }, item.value) })
      ] }) }, group.value) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandFooter, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "命令面板" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CornerDownLeft, { "aria-hidden": "true" }) }),
        "执行"
      ] })
    ] })
  ] }) });
}
function HomePage() {
  useDocumentTitle();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "outline-none", id: "main", tabIndex: -1, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto grid w-full max-w-[90rem] items-center gap-12 px-4 pt-14 pb-12 sm:px-6 sm:pt-20 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:pt-24 lg:pb-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start gap-6 lg:col-span-6", "data-route-enter": true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "break-keep font-semibold text-[2.125rem] text-foreground-strong leading-[1.2] sm:text-[3rem]", tabIndex: -1, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block", children: "精致、耐看、不浮夸" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-muted-foreground", children: "为中文产品打磨的 React 组件" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "max-w-[36rem] text-pretty text-[1.0625rem] text-muted-foreground leading-relaxed", children: [
            SITE.name,
            " 以 Base UI 负责行为与无障碍，以 Tailwind CSS 4 负责样式，改编自 coss ui，并补充了中文产品常用的组合组件。层次来自半透明边框与准确的间距，主题、密度和动效都由令牌控制。"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { nativeButton: false, render: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/docs/installation" }), size: "lg", children: [
              "快速开始",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { "aria-hidden": "true" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { nativeButton: false, render: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/docs/components" }), size: "lg", variant: "outline", children: "浏览组件" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-wrap items-center gap-x-5 gap-y-1.5 text-muted-foreground text-sm", children: [`${components.length} 个组件`, "浅色与深色", "简体中文 / English", `v${SITE.version} · MIT`].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", className: "size-1 rounded-full bg-foreground/24" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "numeric", children: item })
          ] }, item)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(HeroCode, {})
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "aria-label": "组件示例", className: "border-y bg-surface-subtle dark:bg-surface-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid w-full max-w-[90rem] gap-4 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-12 lg:gap-5 lg:px-8 lg:py-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col gap-4 lg:col-span-5 lg:gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationsCard, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectCard, {})
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col gap-4 lg:col-span-7 lg:gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MembersCard, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PalettePreview, {})
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "mx-auto flex w-full max-w-[90rem] flex-col gap-3 px-4 py-8 text-muted-foreground text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "MIT 许可。行为基于 ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { href: "https://base-ui.com", children: "Base UI" }),
        "，组件改编自 ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { href: "https://coss.com/ui", children: "coss ui" }),
        "。"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { className: "focus-ring inline-flex items-center gap-1.5 rounded-sm transition-colors hover:text-foreground", href: SITE.repo, rel: "noreferrer", target: "_blank", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(GitHubIcon, { className: "size-3.5" }),
        SITE.repo.replace("https://github.com/", "")
      ] })
    ] })
  ] });
}
const heroFiles = [
  {
    id: "css",
    name: "index.css",
    lang: "css",
    code: `@import "tailwindcss";
@import "@yanqing/ui/styles.css";

/* 换成你的品牌色与圆角 */
:root {
  --qy-primary: oklch(0.51 0.18 268);
  --qy-radius: 0.5rem;
}`
  },
  {
    id: "tsx",
    name: "save-button.tsx",
    lang: "tsx",
    code: `import { Button, toastManager } from "@yanqing/ui";

export function SaveButton() {
  return (
    <Button onClick={() => toastManager.add({ title: "已保存" })}>
      保存
    </Button>
  );
}`
  }
];
function HeroCode() {
  const [current, setCurrent] = reactExports.useState("tsx");
  const active = heroFiles.find((file) => file.id === current) ?? heroFiles[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Tabs,
    {
      className: "min-w-0 gap-0 overflow-hidden rounded-2xl border bg-surface-subtle shadow-xs/5 lg:col-span-6 dark:bg-surface",
      onValueChange: (value) => setCurrent(String(value)),
      value: current,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 border-b py-1.5 ps-2 pe-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsList, { "aria-label": "示例文件", size: "sm", variant: "underline", children: heroFiles.map((file) => /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTab, { className: "font-mono text-xs", value: file.id, children: file.name }, file.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CopyCodeButton, { value: active.code })
        ] }),
        heroFiles.map((file) => /* @__PURE__ */ jsxRuntimeExports.jsx(TabsPanel, { value: file.id, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CodeView, { className: "min-h-56 py-4", code: file.code, lang: file.lang }) }, file.id))
      ]
    }
  );
}
function ExternalLink({ href, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "focus-ring rounded-sm text-foreground underline decoration-foreground/24 underline-offset-[0.22em] hover:decoration-foreground/72", href, rel: "noreferrer", target: "_blank", children });
}
export {
  HomePage as default
};
