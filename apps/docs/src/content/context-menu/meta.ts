import type { ComponentMeta } from "@/lib/types";
export default {
  "title": "上下文菜单 ContextMenu",
  "titleEn": "ContextMenu",
  "description": "当前对象的右键增强命令入口。",
  "descriptionEn": "A context-menu enhancement for commands on the current object.",
  "category": "浮层",
  "layer": "pattern",
  "source": "local",
  "exports": [
    "ContextMenu",
    "ContextMenuPortal",
    "ContextMenuSubmenu",
    "ContextMenuRadioGroup",
    "ContextMenuTrigger",
    "ContextMenuPositioner",
    "ContextMenuPopup",
    "ContextMenuItem",
    "ContextMenuLinkItem",
    "ContextMenuGroup",
    "ContextMenuGroupLabel",
    "ContextMenuSeparator",
    "ContextMenuCheckboxItem",
    "ContextMenuRadioItem",
    "ContextMenuSubmenuTrigger",
    "ContextMenuPrimitive"
  ],
  "decisions": "右键不是唯一入口；应用同时提供可见 Menu，并复用同一组真实命令。",
  "decisionsEn": "Right click is an enhancement; applications also provide a visible Menu using the same real commands.",
  "keywords": ["right click", "contextmenu", "右键", "右键菜单", "上下文菜单"],
  "api": [
    {
      "name": "ContextMenu / ContextMenuTrigger",
      "description": "同一对象的 Root 与可聚焦触发区域。",
      "descriptionEn": "Root and focusable trigger region for the same object.",
      "props": [
        {
          "name": "disabled / onOpenChange",
          "type": "Base UI Root props",
          "description": "禁用根不打开；details.cancel() 可拒绝变化。",
          "descriptionEn": "A disabled root never opens; details.cancel() may reject a change."
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
      "name": "ContextMenuPortal / ContextMenuPositioner / ContextMenuPopup",
      "description": "上下文 Root 自己的浮层。",
      "descriptionEn": "Floating parts belonging to the context root.",
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
      "name": "ContextMenuItem / ContextMenuLinkItem / ContextMenuCheckboxItem / ContextMenuRadioItem / ContextMenuSubmenuTrigger",
      "description": "复用本库 Menu 的公开部位与尺寸。",
      "descriptionEn": "Reuses this library's public Menu parts and sizes.",
      "props": [
        {
          "name": "size / disabled / choice props",
          "type": "Menu part props",
          "description": "不跨 Root 套用 Popover；选择状态与事件保持真实。",
          "descriptionEn": "Never place another root's Popover parts here; preserve real choices and events."
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
      "name": "ContextMenuGroup / ContextMenuGroupLabel / ContextMenuSeparator / ContextMenuSubmenu / ContextMenuRadioGroup / ContextMenuPrimitive",
      "description": "组、分隔与公开原语。",
      "descriptionEn": "Groups, separators and public primitives.",
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
    "演示中的可见 Menu 与右键区域共用动作；不模拟业务服务。"
  ],
  "notesEn": [
    "The visible Menu and context region share commands; no business service is simulated."
  ],
  "design": {
    "methods": [
      "名实相符",
      "相成相制",
      "布白有用"
    ],
    "whenToUse": [
      "对象已有可见操作入口，可附加右键便捷方式。"
    ],
    "avoid": [
      "不要只给右键入口或用长按隐藏必须完成的操作。"
    ],
    "stateOwner": {
      "library": [
        "上下文打开、关闭与键盘命令。"
      ],
      "application": [
        "目标对象与同组可见入口。"
      ]
    },
    "responsive": [
      "桌面保持真实结构；菜单受可用空间限制，表格保留完整比较列。"
    ],
    "customization": [
      "控件档案、间距和浮层表面消费现有角色；具体外观是预设。"
    ]
  }, designEn: {"whenToUse":["An object already has visible actions and may add right-click shortcuts."],"avoid":["Right-click or long press must not be the sole entry for required actions."],"stateOwner":{"library":["Context opening, closing, and keyboard commands."],"application":["Target objects and corresponding visible actions."]},"responsive":["Keep actual desktop structure; menus fit available space and tables retain complete comparison columns."],"customization":["Control profiles, spacing, and popup surfaces consume existing roles; their appearance is a preset."]}
} satisfies ComponentMeta;
