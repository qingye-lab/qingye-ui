import type { ComponentMeta } from "@/lib/types";
export default {
  "title": "侧栏导航 Sidebar",
  "titleEn": "Sidebar",
  "description": "长期导航与可逆收起。",
  "descriptionEn": "Persistent navigation with reversible collapse.",
  "category": "导航",
  "layer": "pattern",
  "source": "local",
  "exports": [
    "Sidebar",
    "SidebarToggle",
    "SidebarContent",
    "SidebarGroup",
    "SidebarGroupLabel",
    "SidebarLink"
  ],
  "decisions": "收起只改变导航可见性，保留挂载；active 与路由由应用明确提供。",
  "decisionsEn": "Collapse changes visibility while retaining mounted navigation; active and routes are explicit application facts.",
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
          "description": "active 显式写 aria-current；收起焦点内容会返回 Toggle。",
          "descriptionEn": "Active explicitly writes aria-current; collapsing focused content returns focus to Toggle."
        },
        {
          "name": "render / ref / native props",
          "type": "Base UI part props",
          "description": "属性和 ref 归属实际元素；调用方事件与样式保留。",
          "descriptionEn": "Props and refs target actual elements; caller events and styles are preserved."
        }
      ]
    }
  ],
  "notes": [
    "应用决定宽度与收起策略；始终保留可见 Toggle。"
  ],
  "notesEn": [
    "Applications choose width and collapse policy; keep a visible Toggle available."
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
