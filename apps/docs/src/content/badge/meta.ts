import type { ComponentMeta } from "@/lib/types";

export default {
  "title": "标记 Badge",
  "titleEn": "Badge",
  "description": "短标记，保留内容名称而不推断状态。",
  "descriptionEn": "A short marker.",
  "category": "数据展示",
  "layer": "primitive",
  "source": "local",
  "exports": [
    "Badge"
  ],
  "keywords": [
    "badge"
  ],
  "decisions": "状态事实使用 StatusDot，不让标记宣布成功。", decisionsEn: "Use StatusDot for actual states; a badge cannot establish success.",
  "design": {
    "methods": [
      "名实相符",
      "布白有用"
    ],
    "whenToUse": [
      "短分类、注记或强调标记。"
    ],
    "avoid": [
      "状态事实使用 StatusDot，不让标记宣布成功。"
    ],
    "composition": [
      "className、style 与 render 属于标记；五档使用同名文字。"
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
      "五档文字沿用同名文字角色；短标记可换行，不吞掉内容。"
    ],
    "customization": [
      "使用公开 render/ref、ARIA、事件与样式；不混用主题三轴。"
    ]
  }, designEn: {"whenToUse":["Short categories, annotations, or emphasis markers."],"avoid":["Use StatusDot for actual states; a badge cannot establish success."],"composition":["className, style, and render belong to the marker; five sizes use matching text profiles."],"stateOwner":{"library":["Native semantics, public composition, and centralized roles."],"application":["Objects, content, values, states, and request outcomes."]},"responsive":["Five matching text roles; short markers may wrap without losing content."],"customization":["Public render/refs, ARIA, events, and styles; keep theme axes independent."]},
  "api": [
    {
      "name": "Badge",
      "description": "className、style 与 render 属于标记；五档使用同名文字。", descriptionEn: "className, style, and render belong to the marker; five sizes use matching text profiles.",
      "props": [
        {
          "name": "size",
          "type": "\"xs\" | \"sm\" | \"md\" | \"lg\" | \"xl\"",
          "default": "\"sm\"",
          "description": "同名文字档，字形围合使用 badge padding。", descriptionEn: "Matching text profiles enclosed with badge padding."
        },
        {
          "name": "variant",
          "type": "\"neutral\" | \"emphasis\"",
          "default": "\"neutral\"",
          "description": "视觉强调，不编码请求状态或权限。", descriptionEn: "Visual emphasis without encoding request state or permissions."
        },
        {
          "name": "render / ref / 原生属性", nameEn: "render / ref / native props",
          "type": "current public component props",
          "description": "属性、事件与ref透传实际元素；样式由className/style调整。", descriptionEn: "Forward attributes, events, and refs to the actual element; adjust presentation through className/style."
        }
      ]
    }
  ]
} satisfies ComponentMeta;
