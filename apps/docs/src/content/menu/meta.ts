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
    "MenuSwitchItem",
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
      "name": "MenuItem",
      "description": "一条命令；与 ContextMenuItem 共用。",
      "descriptionEn": "One command; shared with ContextMenuItem.",
      "props": [
        {
          "name": "tone",
          "type": "\"neutral\" | \"danger\"",
          "default": "\"neutral\"",
          "description": "与 Button 的 tone 同义：danger 只标出这是一条危险类动作（字与图标用危险前景，悬停与高亮用危险柔底）。后果说明与确认不在菜单项里，激活后应打开 AlertDialog 或 ConfirmAction。",
          "descriptionEn": "Same meaning as Button's tone: danger only marks a dangerous class of action (danger foreground for text and icon, danger soft fill on hover and highlight). Consequences and confirmation do not live in the item; activating it should open AlertDialog or ConfirmAction."
        },
        {
          "name": "size / inset / disabled / onClick",
          "type": "Base UI Item props",
          "description": "尺寸档、与带前导标记的项对齐的缩进、禁用与命令。",
          "descriptionEn": "Size step, indent aligning with items that have leading markers, disabled state, and the command."
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
          "name": "inset",
          "type": "boolean",
          "description": "在逻辑起点为同档图标与字段间隔留位，使无图标命令与前导标记的文字列对齐；默认 false。MenuGroupLabel 也支持 size/inset。",
          "descriptionEn": "Reserves a same-size icon and field gap at the logical start, aligning unmarked commands with leading markers. Defaults to false; MenuGroupLabel also supports size/inset."
        },
        {
          "name": "markerPosition",
          "type": "start | end",
          "description": "仅勾选与单选项，控制实际标记的逻辑位置；默认 end 保持现有外观。状态与键盘语义不变。",
          "descriptionEn": "Checkbox and radio items only: controls the logical marker position. Defaults to end, preserving existing appearance, state and keyboard semantics."
        },
        {
          "name": "checked / value / onCheckedChange",
          "type": "Base UI choice props",
          "description": "勾选项读 checked，单选项读 value；选择由调用方事实与原语取消协议确认。",
          "descriptionEn": "Checkbox items read checked, radio items read value; choices follow caller facts and primitive cancellation."
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
      "name": "MenuSwitchItem",
      "description": "开关式的勾选项：语义仍是 menuitemcheckbox，尾部的标记换成一条开关槽。",
      "descriptionEn": "A switch-style checked item: still a menuitemcheckbox, with the trailing mark replaced by a switch track.",
      "props": [
        {
          "name": "checked / defaultChecked / onCheckedChange / disabled / closeOnClick",
          "type": "Base UI CheckboxItem props",
          "description": "与 MenuCheckboxItem 相同，含 details.cancel()；读屏听到的是「菜单项复选框，已勾选/未勾选」，槽是装饰（aria-hidden）。槽的几何与 Switch 一致（高一材、长两材、抓手等距内缩），固定在行尾，所以没有 markerPosition。适合立即生效的开关类设置；是一次性的选择用 MenuCheckboxItem。",
          "descriptionEn": "Same as MenuCheckboxItem, including details.cancel(). Assistive technology hears a menu item checkbox, checked or unchecked; the track is decorative (aria-hidden). The track geometry matches Switch (one cai high, two wide, thumb inset evenly) and sits at the end of the row, so there is no markerPosition. Use it for settings that take effect immediately; use MenuCheckboxItem for plain choices."
        },
        {
          "name": "size / inset",
          "type": "xs | sm | md | lg | xl / boolean",
          "description": "与 MenuCheckboxItem 相同的尺寸档与缩进。",
          "descriptionEn": "Same size steps and indent as MenuCheckboxItem."
        }
      ]
    },
    {
      "name": "MenuGroup / MenuGroupLabel / MenuSeparator / MenuRadioGroup / MenuPrimitive",
      "description": "组语义与底层公开原语。",
      "descriptionEn": "Group semantics and the public primitive namespace.",
      "props": [
        {
          "name": "value / defaultValue / onValueChange",
          "type": "Base UI MenuRadioGroup props",
          "description": "单选组的当前值在 MenuRadioGroup 上。",
          "descriptionEn": "The radio group's current value lives on MenuRadioGroup."
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
    "危险操作需显式后果与独立保护；Root/Portal/Positioner/Popup 属于同一上下文。",
    "tone=\"danger\" 的项被激活后应打开确认对话框，由对话框写明后果；颜色只表示动作类别，不替代文字名称。"
  ],
  "notesEn": [
    "Dangerous actions require explicit consequences and separate protection; Root, Portal, Positioner and Popup share one context.",
    "Activating a tone=\"danger\" item should open a confirmation dialog that states the consequence; color marks the action class and never replaces the text name."
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
