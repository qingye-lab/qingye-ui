import type { ComponentMeta } from "@/lib/types";

export default {
  "title": "标记 Badge",
  "titleEn": "Badge",
  "description": "短标记，保留内容名称而不推断状态。",
  "descriptionEn": "A short marker that keeps its content name without inferring state.",
  "category": "数据展示",
  "layer": "primitive",
  "source": "local",
  "exports": [
    "Badge"
  ],
  "keywords": ["badge", "tag", "label", "count", "徽标", "标签", "角标", "计数"],
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
      "className、style 与 render 属于标记；标记没有尺寸档，与它标注的那段文字同大。"
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
      "标记随所处文字缩放；短标记可换行，不吞掉内容。"
    ],
    "customization": [
      "使用公开 render/ref、ARIA、事件与样式；不混用主题三轴。"
    ]
  }, designEn: {"whenToUse":["Short categories, annotations, or emphasis markers."],"avoid":["Use StatusDot for actual states; a badge cannot establish success."],"composition":["className, style, and render belong to the marker; a marker has no size scale and matches the text it annotates."],"stateOwner":{"library":["Native semantics, public composition, and centralized roles."],"application":["Objects, content, values, states, and request outcomes."]},"responsive":["The marker scales with the text it sits in; short markers may wrap without losing content."],"customization":["Public render/refs, ARIA, events, and styles; keep theme axes independent."]},
  "api": [
    {
      "name": "Badge",
      "description": "className、style 与 render 属于标记；标记没有尺寸档，与它标注的那段文字同大。", descriptionEn: "className, style, and render belong to the marker; a marker has no size scale and matches the text it annotates.",
      "props": [
        {
          "name": "variant",
          "type": "\"neutral\" | \"emphasis\"",
          "default": "\"neutral\"",
          "description": "neutral 是浓墨的字；emphasis 是焦墨加中等字重，要读者注意但不归入状态类别，所以不用色相。", descriptionEn: "neutral is medium-ink text; emphasis is full ink with medium weight, drawing attention without a state category, so it uses no hue."
        },
        {
          "name": "tone",
          "type": "\"info\" | \"success\" | \"warning\" | \"danger\"",
          "description": "调用方声明的状态类别：该状态的文字色加中等字重。组件不从文字猜类别。", descriptionEn: "A state category declared by the caller: that state's text color with medium weight. The component never infers the category from text."
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
