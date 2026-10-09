import type { ComponentMeta } from "@/lib/types";
export default {
  "title": "导航菜单 NavigationMenu",
  "titleEn": "NavigationMenu",
  "description": "真实链接、可展开的导航分组与面板内的组名、说明。",
  "descriptionEn": "Real links, expandable navigation groups, and in-panel group names with descriptions.",
  "category": "导航",
  "layer": "pattern",
  "source": "local",
  "exports": [
    "NavigationMenu",
    "NavigationMenuPortal",
    "NavigationMenuList",
    "NavigationMenuItem",
    "NavigationMenuTrigger",
    "NavigationMenuLink",
    "NavigationMenuContent",
    "NavigationMenuGroup",
    "NavigationMenuGroupLabel",
    "NavigationMenuPositioner",
    "NavigationMenuPopup",
    "NavigationMenuViewport",
    "NavigationMenuPrimitive"
  ],
  "decisions": "active 是应用提供的页面事实，库不读 URL 或把命令推断成导航。",
  "decisionsEn": "Active is an application-owned page fact; the library never infers it from URLs or turns commands into navigation.",
  "keywords": ["navbar", "nav", "header menu", "导航菜单", "导航栏", "顶栏"],
  "api": [
    {
      "name": "NavigationMenu / NavigationMenuList / NavigationMenuItem",
      "description": "nav、ul 与稳定 value 的导航项。",
      "descriptionEn": "A nav, ul and navigation items with stable values.",
      "props": [
        {
          "name": "value / defaultValue / onValueChange",
          "type": "Base UI Root props",
          "description": "展开分组受控或非受控；取消保留当前值。",
          "descriptionEn": "Expanded groups may be controlled or uncontrolled; cancellation retains the current value."
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
      "name": "NavigationMenuTrigger / NavigationMenuLink",
      "description": "组触发器与真实链接。",
      "descriptionEn": "Group triggers and real links.",
      "props": [
        {
          "name": "href / active",
          "type": "native link / boolean",
          "description": "href 指向真实位置；active 写 aria-current=page。",
          "descriptionEn": "Href identifies a real destination; active writes aria-current=page."
        },
        {
          "name": "description（NavigationMenuLink，面板内使用）",
          "type": "ReactNode",
          "description": "一行浓墨说明，只在能帮读者判断去留时给出；顶栏导航线的单行目的地不接受它。",
          "descriptionEn": "One muted description line, given only when it helps the reader decide; a single-line top-bar destination does not accept it."
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
      "name": "NavigationMenuGroup / NavigationMenuGroupLabel",
      "description": "面板内的分组与不可操作的组名。",
      "descriptionEn": "In-panel grouping and a non-interactive group name.",
      "props": [
        {
          "name": "render / ref / native props",
          "type": "Base UI part props",
          "description": "组名不是链接也不是按钮，只识别不操作；组间距比组内更松，没有分组时面板仍是一份紧凑列表。",
          "descriptionEn": "The group name is neither a link nor a button; it identifies and does not act. Spacing between groups is looser than within one, and a panel with no groups stays a compact list."
        }
      ]
    },
    {
      "name": "NavigationMenuContent / NavigationMenuPortal / NavigationMenuPositioner / NavigationMenuPopup / NavigationMenuViewport / NavigationMenuPrimitive",
      "description": "同一导航 Root 的内容与浮层。",
      "descriptionEn": "Content and floating parts belonging to one navigation root.",
      "props": [
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
    "链接不因导航未展开而失去真实 href；不内置路由。"
  ],
  "notesEn": [
    "Links retain real href values; no router is built in."
  ],
  "design": {
    "methods": [
      "名实相符",
      "相成相制",
      "布白有用"
    ],
    "whenToUse": [
      "有限目的地需要分组展开。"
    ],
    "avoid": [
      "当前对象视角用 Tabs；命令用 Menu。"
    ],
    "stateOwner": {
      "library": [
        "导航与展开原语、浮层位置。"
      ],
      "application": [
        "路由 href、active 与命名。"
      ]
    },
    "responsive": [
      "桌面保持真实结构；菜单受可用空间限制，表格保留完整比较列。"
    ],
    "customization": [
      "控件档案、间距和浮层表面消费现有角色；具体外观是预设。"
    ]
  }, designEn: {"whenToUse":["A finite set of destinations needs grouped disclosure."],"avoid":["Use Tabs for views of the current object and Menu for commands."],"stateOwner":{"library":["Navigation/disclosure primitives and popup positioning."],"application":["Route hrefs, active facts, and names."]},"responsive":["Keep actual desktop structure; menus fit available space and tables retain complete comparison columns."],"customization":["Control profiles, spacing, and popup surfaces consume existing roles; their appearance is a preset."]}
} satisfies ComponentMeta;
