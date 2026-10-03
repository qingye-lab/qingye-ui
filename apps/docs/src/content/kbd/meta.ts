import type { ComponentMeta } from "@/lib/types";

export default {
  "title": "键位 Kbd",
  "titleEn": "Kbd",
  "description": "用原生键位元素显示真实快捷键。",
  "descriptionEn": "A native keyboard key display.",
  "category": "数据展示",
  "layer": "primitive",
  "source": "local",
  "exports": [
    "Kbd"
  ],
  "keywords": [
    "kbd"
  ],
  "decisions": "Kbd 不注册键盘监听，不是可点击入口。", decisionsEn: "Kbd neither registers keyboard listeners nor provides a clickable entry.",
  "design": {
    "methods": [
      "名实相符"
    ],
    "whenToUse": [
      "说明实际可用的键位。"
    ],
    "avoid": [
      "Kbd 不注册键盘监听，不是可点击入口。"
    ],
    "composition": [
      "组合原生 kbd 内容；平台键位由应用确定。"
    ],
    "stateOwner": {
      "library": [
        "原生语义、公共组合与集中角色。"
      ],
      "application": [
        "对象、内容、值、状态与请求结果。"
      ]
    },
    "responsive": [
      "实际键位保持原生展示，长键位名称允许换行；不建立点击或触摸入口。"
    ],
    "customization": [
      "使用公开 render/ref、ARIA、事件与样式；不混用主题三轴。"
    ]
  }, designEn: {"whenToUse":["Describe actually available keys."],"avoid":["Kbd neither registers keyboard listeners nor provides a clickable entry."],"composition":["Compose native kbd content; the application determines platform keys."],"stateOwner":{"library":["Native semantics, public composition, and centralized roles."],"application":["Objects, content, values, states, and request outcomes."]},"responsive":["Display actual keys natively; long key names may wrap without establishing click or touch entries."],"customization":["Public render/refs, ARIA, events, and styles; keep theme axes independent."]},
  "api": [
    {
      "name": "Kbd",
      "description": "组合原生 kbd 内容；平台键位由应用确定。", descriptionEn: "Compose native kbd content; the application determines platform key mappings.",
      "props": [
        {
          "name": "render / ref / 原生属性", nameEn: "render / ref / native props",
          "type": "current public component props",
          "description": "属性、事件与ref透传实际元素；样式由className/style调整。", descriptionEn: "Forward attributes, events, and refs to the actual element; adjust presentation through className/style."
        }
      ]
    }
  ]
} satisfies ComponentMeta;
