import type { ComponentMeta } from "@/lib/types";
export default {
  "title": "命令菜单 Menu",
  "titleEn": "Menu",
  "description": "与当前任务相关的临时命令和选择。",
  "descriptionEn": "Temporary commands and choices related to the current task.",
  "category": "浮层",
  "layer": "pattern",
  "source": "local",
  "exports": [
    "Menu",
    "MenuPortal",
    "MenuSubmenu",
    "MenuTrigger",
    "MenuPositioner",
    "MenuPopup",
    "MenuItem",
    "MenuLinkItem",
    "MenuGroup",
    "MenuGroupLabel",
    "MenuSeparator",
    "MenuCheckboxItem",
    "MenuRadioGroup",
    "MenuRadioItem",
    "MenuSubmenuTrigger",
    "MenuPrimitive"
  ],
  "decisions": "Menu 执行动作，LinkItem 导航。禁用不等于隐藏；原语可让禁用项聚焦，但禁止执行。",
  "decisionsEn": "Menu items execute commands; LinkItem navigates. Disabled items remain discoverable and may receive focus, but cannot execute.",
  "keywords": ["dropdown", "dropdown menu", "actions menu", "菜单", "下拉", "下拉菜单", "更多操作"],
  "api": [
    {
      "name": "Menu / MenuSubmenu",
      "description": "公开 Base UI 命令根与子菜单。",
      "descriptionEn": "Public Base UI command roots and submenus.",
      "props": [
        {
          "name": "open / defaultOpen / onOpenChange",
          "type": "Base UI Root props",
          "description": "应用可控制打开；details.cancel() 保留原状态。",
          "descriptionEn": "Applications may control open state; details.cancel() retains the current state."
        }
      ]
    },
    {
      "name": "MenuTrigger / MenuPositioner / MenuPopup / MenuPortal",
      "description": "触发器与同一 Root 所属的浮层。",
      "descriptionEn": "Trigger and floating parts owned by the same root.",
      "props": [
        {
          "name": "render / ref / native props",
          "type": "Base UI part props",
          "description": "属性和 ref 归属实际元素；调用方事件与样式保留。",
          "descriptionEn": "Props and refs target actual elements; caller events and styles are preserved."
        },
        {
          "name": "side / align / style",
          "type": "Base UI Positioner props",
          "description": "共享 popup 层级写在 Positioner；调用方 style 最后合并。",
          "descriptionEn": "Shared popup layering targets the Positioner; caller style merges last."
        }
      ]
    },
    {
      "name": "MenuItem / MenuLinkItem / MenuCheckboxItem / MenuRadioItem / MenuSubmenuTrigger",
      "description": "动作、真实导航、勾选、单选与下级命令。",
      "descriptionEn": "Commands, true navigation, checked choices, radio choices and submenus.",
      "props": [
        {
          "name": "size",
          "type": "xs | sm | md | lg | xl",
          "description": "复用 Button 五档；禁用项可聚焦但不能执行。",
          "descriptionEn": "Reuses all five Button sizes; disabled items may receive focus but cannot execute.",
          "default": "md"
        },
        {
          "name": "checked / value / onCheckedChange / onValueChange",
          "type": "Base UI choice props",
          "description": "选择由调用方事实与原语取消协议确认。",
          "descriptionEn": "Choices follow caller facts and primitive cancellation."
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
      "name": "MenuGroup / MenuGroupLabel / MenuSeparator / MenuRadioGroup / MenuPrimitive",
      "description": "组语义与底层公开原语。",
      "descriptionEn": "Group semantics and the public primitive namespace.",
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
    "危险操作需显式后果与独立保护；Root/Portal/Positioner/Popup 属于同一上下文。"
  ],
  "notesEn": [
    "Dangerous actions require explicit consequences and separate protection; Root, Portal, Positioner and Popup share one context."
  ],
  "design": {
    "methods": [
      "名实相符",
      "相成相制",
      "布白有用"
    ],
    "whenToUse": [
      "同一对象或工作面有一组临时命令。"
    ],
    "avoid": [
      "长期导航用 NavigationMenu 或 Sidebar；多个值输入用 Select。"
    ],
    "stateOwner": {
      "library": [
        "键盘、打开、焦点返回与取消。"
      ],
      "application": [
        "命令、选择值、禁用原因与危险后果。"
      ]
    },
    "responsive": [
      "桌面保持真实结构；菜单受可用空间限制，表格保留完整比较列。"
    ],
    "customization": [
      "控件档案、间距和浮层表面消费现有角色；具体外观是预设。"
    ]
  }, designEn: {"whenToUse":["One object or workspace has temporary commands."],"avoid":["Use NavigationMenu/Sidebar for persistent navigation and Select for value input."],"stateOwner":{"library":["Keyboard, opening, focus return, and cancellation."],"application":["Commands, selected values, disabled reasons, and danger consequences."]},"responsive":["Keep actual desktop structure; menus fit available space and tables retain complete comparison columns."],"customization":["Control profiles, spacing, and popup surfaces consume existing roles; their appearance is a preset."]},
  "keyboard": [
    {
      "keys": "↑ / ↓ / Home / End",
      "description": "在菜单中移动焦点。",
      "descriptionEn": "Move focus within the menu."
    },
    {
      "keys": "Enter / Space / Escape",
      "description": "执行可用命令或关闭并返回入口。",
      "descriptionEn": "Execute an enabled command or close and return to the trigger."
    }
  ]
} satisfies ComponentMeta;
