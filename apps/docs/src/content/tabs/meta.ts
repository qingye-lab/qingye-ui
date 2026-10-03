import type { ComponentMeta } from "@/lib/types";
export default {
  "title": "视角标签 Tabs",
  "titleEn": "Tabs",
  "description": "同一对象的不同视角，保留面板草稿。",
  "descriptionEn": "Different views of one object with panel drafts retained.",
  "category": "导航",
  "layer": "pattern",
  "source": "local",
  "exports": [
    "Tabs",
    "TabsList",
    "TabsTab",
    "TabsPanel",
    "TabsPrimitive"
  ],
  "decisions": "默认手动激活、面板保留挂载；切换视角不等于批准或保存草稿。",
  "decisionsEn": "Manual activation and mounted panels are defaults; switching views does not approve or save a draft.",
  "api": [
    {
      "name": "Tabs / TabsList",
      "description": "当前视角与手动激活列表。",
      "descriptionEn": "The current view and a manually activated list.",
      "props": [
        {
          "name": "value / defaultValue / onValueChange / orientation",
          "type": "Base UI Root props",
          "description": "值由应用或原语持有；取消不切换。",
          "descriptionEn": "The application or primitive owns the value; cancellation prevents a switch."
        },
        {
          "name": "activateOnFocus",
          "type": "boolean",
          "description": "默认焦点移动不自动切换；消费者可明确选择自动激活。",
          "descriptionEn": "Focus movement does not activate by default; consumers may explicitly opt in.",
          "default": "false"
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
      "name": "TabsTab",
      "description": "具有关联面板的 tab。",
      "descriptionEn": "A tab associated with a panel.",
      "props": [
        {
          "name": "value / disabled",
          "type": "Base UI Tab props",
          "description": "value 稳定；禁用标签可聚焦但不能激活。",
          "descriptionEn": "Value is stable; disabled tabs may receive focus but cannot activate."
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
      "name": "TabsPanel / TabsPrimitive",
      "description": "原生 tabpanel 与公开原语。",
      "descriptionEn": "A tabpanel and public primitives.",
      "props": [
        {
          "name": "value / keepMounted",
          "type": "Base UI Panel props",
          "description": "默认保留挂载与输入；false 由应用承担卸载后果。",
          "descriptionEn": "Mounted panels retain input by default; applications own the effects of false.",
          "default": "keepMounted=true"
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
    "隐藏面板仍挂载但退出可访问树；不要把切换当成保存成功。"
  ],
  "notesEn": [
    "Hidden panels remain mounted but leave the accessibility tree; switching is never reported as saving."
  ],
  "design": {
    "methods": [
      "名实相符",
      "相成相制",
      "布白有用"
    ],
    "whenToUse": [
      "同一对象多种视角需要保留编辑连续性。"
    ],
    "avoid": [
      "步骤进度用 Steps，真实目的地用链接。"
    ],
    "stateOwner": {
      "library": [
        "标签关联、键盘和面板可见性。"
      ],
      "application": [
        "value、草稿、保存与批准。"
      ]
    },
    "responsive": [
      "桌面保持真实结构；菜单受可用空间限制，表格保留完整比较列。"
    ],
    "customization": [
      "控件档案、间距和浮层表面消费现有角色；具体外观是预设。"
    ]
  }, designEn: {"whenToUse":["Multiple views of one object need editing continuity."],"avoid":["Use Steps for progression and links for actual destinations."],"stateOwner":{"library":["Tab associations, keyboard, and panel visibility."],"application":["value, drafts, saving, and approval."]},"responsive":["Keep actual desktop structure; menus fit available space and tables retain complete comparison columns."],"customization":["Control profiles, spacing, and popup surfaces consume existing roles; their appearance is a preset."]},
  "keyboard": [
    {
      "keys": "← / → / Home / End",
      "description": "移动标签焦点。",
      "descriptionEn": "Move tab focus."
    },
    {
      "keys": "Enter / Space",
      "description": "手动激活可用标签。",
      "descriptionEn": "Manually activate an enabled tab."
    }
  ]
} satisfies ComponentMeta;
