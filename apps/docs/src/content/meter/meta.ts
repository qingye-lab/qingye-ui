import type { ComponentMeta } from "@/lib/types";

export default {
  "title": "测量 Meter",
  "titleEn": "Meter",
  "description": "表达真实范围内的测量值。",
  "descriptionEn": "A real measurement over a valid range.",
  "category": "反馈",
  "layer": "primitive",
  "source": "local",
  "exports": [
    "Meter",
    "MeterLabel",
    "MeterValue",
    "MeterTrack",
    "MeterIndicator",
    "MeterPrimitive"
  ],
  "keywords": [
    "meter"
  ],
  "decisions": "任务完成比例使用 Progress；未知测量不要填0。", decisionsEn: "Use Progress for task completion. Unknown measurements must not become zero.",
  "design": {
    "methods": [
      "名实相符",
      "布白有用"
    ],
    "whenToUse": [
      "表达测量值及单位。"
    ],
    "avoid": [
      "任务完成比例使用 Progress；未知测量不要填0。"
    ],
    "composition": [
      "Label 关联名称，Value 展示实际读数，轨与指示不猜测好坏。"
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
      "测量名称与格式化读数允许换行；轨厚由独立测量角色控制。"
    ],
    "customization": [
      "使用公开 render/ref、ARIA、事件与样式；不混用主题三轴。"
    ]
  }, designEn: {"whenToUse":["Present measured values and units."],"avoid":["Use Progress for task completion. Unknown measurements must not become zero."],"composition":["Label associates the name, Value presents the actual reading, and track/indicator infer no judgment."],"stateOwner":{"library":["Native semantics, public composition, and centralized roles."],"application":["Objects, content, values, states, and request outcomes."]},"responsive":["Measurement names and formatted readings wrap; an independent measurement role controls track thickness."],"customization":["Public render/refs, ARIA, events, and styles; keep theme axes independent."]},
  "api": [
    {
      "name": "Meter",
      "description": "Label 关联名称，Value 展示实际读数，轨与指示不猜测好坏。", descriptionEn: "Label associates the name, Value presents the actual reading, and track/indicator infer no judgment.",
      "props": [
        {
          "name": "value / min / max",
          "type": "number",
          "description": "已知有限值及递增范围；越界、非有限或倒置范围抛 RangeError。", descriptionEn: "A known finite value in an increasing range; out-of-range, nonfinite, or reversed inputs throw RangeError."
        },
        {
          "name": "format / locale / getAriaValueText",
          "type": "Base UI Meter props",
          "description": "真实单位和可访问读数；locale 默认跟随 UILocale。", descriptionEn: "Actual units and accessible readings; locale defaults to UILocale."
        },
        {
          "name": "render / ref / 原生属性", nameEn: "render / ref / native props",
          "type": "current public component props",
          "description": "属性、事件与ref透传实际元素；样式由className/style调整。", descriptionEn: "Forward attributes, events, and refs to the actual element; adjust presentation through className/style."
        }
      ]
    },
    {
      "name": "MeterLabel",
      "description": "登记测量对象的可访问名称。", descriptionEn: "Registers the measured object's accessible name."
    },
    {
      "name": "MeterValue",
      "description": "真实测量读数及调用方格式化内容。", descriptionEn: "Actual measurement and caller-formatted content."
    },
    {
      "name": "MeterTrack",
      "description": "测量范围的视觉轨道；消费独立轨厚角色。", descriptionEn: "A visual measurement range using an independent track-thickness role."
    },
    {
      "name": "MeterIndicator",
      "description": "由公共 Meter 上下文计算实际测量比例。", descriptionEn: "Computes the actual measurement ratio from public Meter context."
    },
    {
      "name": "MeterPrimitive",
      "description": "Base UI Meter 公共原语。", descriptionEn: "Public Base UI Meter primitive."
    }
  ]
} satisfies ComponentMeta;
