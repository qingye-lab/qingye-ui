import type { ComponentMeta } from "@/lib/types";
export default {
  "title": "侧栏导航 Sidebar",
  "titleEn": "Sidebar",
  "description": "长期导航、收起为图标 rail 与二级子级。",
  "descriptionEn": "Persistent navigation, an icon rail when collapsed, and an expandable sub-level.",
  "category": "导航",
  "layer": "pattern",
  "source": "local",
  "exports": [
    "Sidebar",
    "SidebarToggle",
    "SidebarDrawerTrigger",
    "SidebarHeader",
    "SidebarTitle",
    "SidebarContent",
    "SidebarGroup",
    "SidebarGroupLabel",
    "SidebarFooter",
    "SidebarLink",
    "SidebarSub",
    "SidebarSubTrigger",
    "SidebarSubContent",
    "createSidebarDrawerHandle"
  ],
  "decisions": "收起是图标 rail，不是隐藏：导航与链接保持挂载，名称切到视觉隐藏（可访问名称不变），用 Tooltip 补足可见名称；二级子级展开态用内嵌面板，rail 态换成同一组内容的 Popover，开合记忆不因侧栏收起而改变。active 与路由由应用明确提供。",
  "decisionsEn": "Collapsing produces an icon rail, not a hidden panel: navigation and links stay mounted, names switch to visually hidden (accessible name unchanged) with a Tooltip restoring a visible name; a sub-level's inline panel becomes a Popover over the same content in the rail, and its open/closed memory survives collapsing. Active and routes are explicit application facts.",
  "keywords": ["side nav", "drawer", "侧栏", "侧边栏", "边栏"],
  "api": [
    {
      "name": "Sidebar / SidebarToggle",
      "description": "侧栏容器（不产生地标，导航地标由内部的 nav 给出）与可逆开关。",
      "descriptionEn": "The sidebar container (no landmark of its own; the inner nav is the landmark) and a reversible toggle.",
      "props": [
        {
          "name": "collapsed / defaultCollapsed / onCollapsedChange",
          "type": "boolean / callback",
          "description": "默认展开；details.cancel() 拒绝变化。",
          "descriptionEn": "Expanded by default; details.cancel() rejects a change."
        },
        {
          "name": "drawer / drawerHandle",
          "type": "boolean / SidebarDrawerHandle",
          "default": "false",
          "description": "窄屏（< 40rem）把侧栏收进从起始侧滑出的抽屉，由 SidebarDrawerTrigger 打开；更宽时仍在原位，不按宽度自动收起，中等宽度要收成 rail 由应用控制 collapsed。抽屉里是同一份 children：当前项照常标出，点去往新页面的条目后关闭，SidebarToggle 换成关闭按钮。在 Workspace 里 handle 由外壳持有，省略 drawerHandle；不在 Workspace 里时用 createSidebarDrawerHandle() 创建并同时交给 Sidebar 与 SidebarDrawerTrigger。两者都没有会抛错。抽屉代码在第一次变窄时才加载，宽屏首屏不带它。",
          "descriptionEn": "Below 40rem the sidebar moves into a drawer that slides in from the inline start, opened by SidebarDrawerTrigger; at wider widths it stays in place and never collapses on its own: to show the rail at medium widths, the app controls collapsed. The drawer holds the same children: the current item is marked as usual, navigating closes it, and SidebarToggle becomes a close button. Inside a Workspace the shell holds the handle, so omit drawerHandle; outside one, create it with createSidebarDrawerHandle() and give it to both Sidebar and SidebarDrawerTrigger. Missing both throws. The drawer code loads the first time the layout narrows, so wide first screens do not carry it."
        },
        {
          "name": "render / ref / native props",
          "type": "Base UI part props",
          "description": "属性和 ref 归属实际元素；调用方事件与样式保留。",
          "descriptionEn": "Props and refs target actual elements; caller events and styles are preserved."
        }
      ]
    },
    {
      "name": "SidebarDrawerTrigger",
      "description": "窄屏打开侧栏抽屉的图标按钮，名称「打开工作区导航」。放在 Workspace 里任何位置（通常是 WorkspaceHeader 的第一项）；宽屏隐去，不占位也不进 Tab 顺序。",
      "descriptionEn": "The icon button that opens the sidebar drawer on narrow screens, named \"Open workspace navigation\". Place it anywhere inside a Workspace (usually first in WorkspaceHeader); it is hidden at wide widths and leaves neither space nor a Tab stop.",
      "props": [
        {
          "name": "handle",
          "type": "SidebarDrawerHandle",
          "description": "不在 Workspace 里时，与 Sidebar 的 drawerHandle 相同。",
          "descriptionEn": "Outside a Workspace, the same handle as Sidebar's drawerHandle."
        },
        {
          "name": "render / native props",
          "type": "Drawer trigger props",
          "description": "默认渲染为 quiet 图标按钮；aria-expanded 由抽屉给出。",
          "descriptionEn": "Renders as a quiet icon button by default; aria-expanded comes from the drawer."
        }
      ]
    },
    {
      "name": "SidebarHeader / SidebarTitle",
      "description": "第一行：身份在前，SidebarToggle 在后。收起为 rail 时上下叠放并居中，名称留给辅助技术。",
      "descriptionEn": "The first row: identity first, SidebarToggle last. In the rail they stack and centre, and the title stays for assistive technology.",
      "props": [
        {
          "name": "render / ref / native props",
          "type": "Base UI part props",
          "description": "属性和 ref 归属实际元素；调用方事件与样式保留。",
          "descriptionEn": "Props and refs target actual elements; caller events and styles are preserved."
        }
      ]
    },
    {
      "name": "SidebarFooter",
      "description": "末位槽，贴列底；放本人或账户入口。",
      "descriptionEn": "The end slot, pinned to the bottom of the column; holds the account entry.",
      "props": [
        {
          "name": "render / ref / native props",
          "type": "Base UI part props",
          "description": "属性和 ref 归属实际元素；调用方事件与样式保留。",
          "descriptionEn": "Props and refs target actual elements; caller events and styles are preserved."
        }
      ]
    },
    {
      "name": "SidebarContent / SidebarGroup / SidebarGroupLabel",
      "description": "原生 nav 与导航组。",
      "descriptionEn": "A native nav and navigation groups.",
      "props": [
        {
          "name": "render / ref / native props",
          "type": "Base UI part props",
          "description": "属性和 ref 归属实际元素；调用方事件与样式保留。",
          "descriptionEn": "Props and refs target actual elements; caller events and styles are preserved."
        }
      ]
    },
    {
      "name": "SidebarLink",
      "description": "真实页面链接。",
      "descriptionEn": "A real page link.",
      "props": [
        {
          "name": "href / active",
          "type": "native anchor / boolean",
          "description": "active 显式写 aria-current；焦点所在之处收起后真的不可达时，才会回退到 Toggle（例如焦点原本在一个二级子级里，侧栏收起换成 rail）。",
          "descriptionEn": "Active explicitly writes aria-current; focus only falls back to Toggle when its location truly becomes unreachable after collapsing (for example, focus was inside a sub-level that the rail replaces)."
        },
        {
          "name": "icon",
          "type": "ReactNode",
          "description": "收起为 rail 时唯一可见的识别物；没有图标的条目收起后没有可展示的内容。名称（children）在 rail 下只是视觉隐藏（sr-only），可访问名称不变，并由 Tooltip 把名称重新摆给看得见的人。",
          "descriptionEn": "The only visible identifier in the rail; a link without an icon has nothing to show once collapsed. The name (children) is only visually hidden (sr-only) in the rail — the accessible name is unchanged, and a Tooltip restores a sighted label."
        },
        {
          "name": "render / ref / native props",
          "type": "Base UI part props",
          "description": "属性和 ref 归属实际元素；调用方事件与样式保留。",
          "descriptionEn": "Props and refs target actual elements; caller events and styles are preserved."
        }
      ]
    },
    {
      "name": "SidebarSub / SidebarSubTrigger / SidebarSubContent",
      "description": "可展开的二级目的地：展开态是内嵌面板，rail 态换成同一组链接的 Popover，悬停或聚焦都能打开。",
      "descriptionEn": "An expandable sub-level of destinations: an inline panel when expanded, and a Popover over the same links in the rail, reachable by hover or focus.",
      "props": [
        {
          "name": "SidebarSub：open / defaultOpen / onOpenChange",
          "type": "boolean / callback",
          "description": "展开态与 rail 态共用同一个开合状态；rail 下即使换成 Popover，用户的开合记忆也不因收起/展开侧栏而改变。",
          "descriptionEn": "The same open state serves both the expanded panel and the rail's Popover; the remembered open/closed state survives collapsing even though the rail swaps in a Popover."
        },
        {
          "name": "SidebarSubTrigger：icon",
          "type": "ReactNode",
          "description": "与 SidebarLink 的 icon 同一分工；rail 下按钮不再承担内嵌展开，只作为 Popover 入口，避免收起侧栏悄悄改变用户没点开过的展开记忆。",
          "descriptionEn": "Same split as SidebarLink's icon; in the rail the button no longer toggles the inline panel, only opening the Popover, so collapsing never silently changes an open state the user never chose."
        }
      ]
    }
  ],
  "notes": [
    "展开宽度默认读 --qy-sidebar-width（两侧内缘 + 条目内缩 + 一枚图标 + 间隔 + 12 个汉字的标签容量；12 字是预设），调用方的 w-* 仍可覆盖；收起宽度由库按一个填值控件高加两侧内缩给出，始终保留可见 Toggle。",
    "当前项用圆角的面标出，比悬停面深一级，并加中等字重：悬停是一级清染，当前是一级清墨，指针经过的行不会和当前项长得一样；字重是不靠颜色的第二信号。当前项不画线（用户裁决：直线与圆角面不在同一项上并用）；二级条目左侧的引导线只表达归属，当前项不加深它。",
    "二级入口的展开记号收起时朝内、展开时朝下，与 Tree 的分支同一画法；父项没有图标时，引导线从父项文字的起笔垂下。",
    "当前项是选中面（--qy-sidebar-current = --qy-surface-selected）：墨的透明叠合，叠在侧栏自己的底上总深一级，项目改 --qy-sidebar 时不必另设。",
    "末位的账户入口不另设部件：MenuTrigger 的 render 交给 SidebarLink，SidebarLink 再 render 为 button（icon 放 Avatar，名称写在 MenuTrigger 的 children）。名称是按钮的可访问名称，所以 Avatar 加 aria-hidden；收起时只剩头像，名称由 Tooltip 摆出。",
    "收起的窄轨里，二级子级与条目名称的浮层朝内联结束侧（inline-end）打开：ltr 在右，rtl 在左；窄轨二级入口与展开态一样把传入的 aria-*、data-*、事件交给触发元素。侧栏本身贴哪一边由应用的布局决定，切换按钮的图标在 rtl 下水平镜像。",
    "侧栏最多两级（SidebarSub 下一层），第三级不进侧栏：在 SidebarSub 里再放 SidebarSub 会在开发期直接抛错（与本库其他结构契约一致，而不是悄悄多缩进一层）。第三级放在内容区，用 Tabs 或页内次级导航承载，必要时用 Breadcrumb 交代位置。见「二级导航与内容区 Tabs」。",
    "带 SidebarGroupLabel 的 SidebarGroup 成为 role=group，名称取自标签；没有标签的分组只是排布。调用方自己给 aria-label 或 aria-labelledby 时以调用方为准。",
    "窄屏用 drawer：同一份 children 在窄屏进入抽屉，由 SidebarDrawerTrigger 打开；抽屉里当前项照常标出，点去往新页面的条目（含客户端路由里 preventDefault 的链接）后关闭，不关的是带 aria-haspopup 的条目（如账户菜单）。服务端渲染按「够宽」输出，窄屏客户端挂载后换成抽屉。见「窄屏：抽屉承载侧栏」。"
  ],
  "notesEn": [
    "The expanded width defaults to --qy-sidebar-width (side insets + item padding + one icon + the gap + room for a 12-character label; 12 is a preset), and a caller's w-* still overrides it; the collapsed rail's width is one fill control height plus insets on both sides, and a visible Toggle is always available.",
    "The current item is marked by a rounded surface one step deeper than the hover surface, plus medium weight: hover is one wash step, current is one ink step, so a row under the pointer never looks like the current one, and the weight is a second cue that does not rely on colour. The current item carries no line (user ruling: a straight line and a rounded surface are never combined on one item); the guide line beside a sub-level only expresses membership and the current item does not deepen it.",
    "The sub-level chevron points inward when closed and down when open, the same mark as a Tree branch; when the parent has no icon, the guide line drops from the start of its text.",
    "The current item uses the selected surface (--qy-sidebar-current = --qy-surface-selected): a translucent ink wash that always sits one step darker than the sidebar's own ground, so a project that changes --qy-sidebar need not set it.",
    "The account entry at the end needs no part of its own: MenuTrigger renders a SidebarLink, and the SidebarLink renders a button (an Avatar as icon, the name as the MenuTrigger's children). The name is the button's accessible name, so the Avatar is aria-hidden; in the rail only the avatar remains and a Tooltip restores the name.",
    "In the collapsed rail, the sub-level and item-name overlays open toward the inline end: right in ltr, left in rtl. The rail's sub-level entry forwards passed aria-*, data-*, and events to its trigger just as the expanded one does. The application's layout decides which edge the sidebar sits on; the toggle icon mirrors horizontally in rtl.",
    "A sidebar has at most two levels (one under SidebarSub); the third level does not go in the sidebar. A SidebarSub inside another SidebarSub throws during development (matching the library's other structural contracts, rather than quietly indenting one more level). Put the third level in the content area, carried by Tabs or an in-page secondary nav, with a Breadcrumb to say where you are. See \"Sub-level navigation with Tabs in the content\".",
    "A SidebarGroup with a SidebarGroupLabel is a role=group named by that label; a group without one is only layout. A caller's aria-label or aria-labelledby takes precedence.",
    "Narrow screens use drawer: the same children move into a drawer opened by SidebarDrawerTrigger; the current item is marked there as usual, and activating an item that goes to a new page (including client-router links that preventDefault) closes it, except items with aria-haspopup (such as an account menu). Server rendering outputs the wide form and a narrow client swaps in the drawer after mounting. See \"Narrow screens: a drawer carries the sidebar\"."
  ],
  "design": {
    "methods": [
      "名实相符",
      "相成相制",
      "布白有用"
    ],
    "whenToUse": [
      "工作面旁的长期导航。"
    ],
    "avoid": [
      "不内置业务目录；第三级导航不进侧栏，放在内容区的 Tabs。"
    ],
    "stateOwner": {
      "library": [
        "收起、nav 语义与焦点返回。"
      ],
      "application": [
        "真实目的地、active 和布局宽度。"
      ]
    },
    "responsive": [
      "宽屏侧栏在原位，可收起为图标 rail；窄屏（< 40rem）用 drawer 收进抽屉，由 WorkspaceHeader 里的 SidebarDrawerTrigger 打开。"
    ],
    "customization": [
      "控件档案、间距和浮层表面消费现有角色；具体外观是预设。"
    ]
  }, designEn: {"whenToUse":["Persistent navigation beside a workspace."],"avoid":["No built-in business directory; third-level navigation goes in content-area Tabs, not the sidebar."],"stateOwner":{"library":["Collapsing, nav semantics, and focus return."],"application":["Actual destinations, active state, and layout width."]},"responsive":["Keep actual desktop structure; menus fit available space and tables retain complete comparison columns."],"customization":["Control profiles, spacing, and popup surfaces consume existing roles; their appearance is a preset."]}
} satisfies ComponentMeta;
