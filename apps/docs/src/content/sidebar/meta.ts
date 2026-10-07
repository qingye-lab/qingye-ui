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
    "SidebarContent",
    "SidebarGroup",
    "SidebarGroupLabel",
    "SidebarLink",
    "SidebarSub",
    "SidebarSubTrigger",
    "SidebarSubContent"
  ],
  "decisions": "收起是图标 rail，不是隐藏：导航与链接保持挂载，名称切到视觉隐藏（可访问名称不变），用 Tooltip 补足可见名称；二级子级展开态用内嵌面板，rail 态换成同一组内容的 Popover，开合记忆不因侧栏收起而改变。active 与路由由应用明确提供。",
  "decisionsEn": "Collapsing produces an icon rail, not a hidden panel: navigation and links stay mounted, names switch to visually hidden (accessible name unchanged) with a Tooltip restoring a visible name; a sub-level's inline panel becomes a Popover over the same content in the rail, and its open/closed memory survives collapsing. Active and routes are explicit application facts.",
  "api": [
    {
      "name": "Sidebar / SidebarToggle",
      "description": "aside 与可逆开关。",
      "descriptionEn": "An aside and reversible toggle.",
      "props": [
        {
          "name": "collapsed / defaultCollapsed / onCollapsedChange",
          "type": "boolean / callback",
          "description": "默认展开；details.cancel() 拒绝变化。",
          "descriptionEn": "Expanded by default; details.cancel() rejects a change."
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
    "应用决定展开宽度；收起宽度由库按一个填值控件高加两侧内缩给出，始终保留可见 Toggle。"
  ],
  "notesEn": [
    "Applications choose the expanded width; the collapsed rail's width is given by the library as one fill control height plus insets on both sides, and a visible Toggle is always available."
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
      "窄屏弹层抽屉用 Drawer；不内置业务目录。"
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
      "桌面保持真实结构；菜单受可用空间限制，表格保留完整比较列。"
    ],
    "customization": [
      "控件档案、间距和浮层表面消费现有角色；具体外观是预设。"
    ]
  }, designEn: {"whenToUse":["Persistent navigation beside a workspace."],"avoid":["Use Drawer for a narrow-screen overlay; no built-in business directory."],"stateOwner":{"library":["Collapsing, nav semantics, and focus return."],"application":["Actual destinations, active state, and layout width."]},"responsive":["Keep actual desktop structure; menus fit available space and tables retain complete comparison columns."],"customization":["Control profiles, spacing, and popup surfaces consume existing roles; their appearance is a preset."]}
} satisfies ComponentMeta;
