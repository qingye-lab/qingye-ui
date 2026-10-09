import type { ComponentMeta } from "@/lib/types";

export default {
  "title": "结果未知 PendingValue",
  "titleEn": "PendingValue",
  "description": "保留对象与原值，表达写入结果未知。",
  "descriptionEn": "An unresolved write result with its original value.",
  "category": "反馈",
  "layer": "primitive",
  "source": "local",
  "exports": [
    "PendingValue"
  ],
  "keywords": ["pending-value", "loading value", "unknown", "placeholder", "待定", "未知", "加载中的值", "占位"],
  "decisions": "不把未知当失败，不默认重试危险写入。", decisionsEn: "Unknown is not failure; never retry a dangerous write by default.",
  "design": {
    "methods": [
      "名实相符",
      "进退相承",
      "相成相制"
    ],
    "whenToUse": [
      "写入已发生但缺少可靠结果。"
    ],
    "avoid": [
      "不把未知当失败，不默认重试危险写入。"
    ],
    "composition": [
      "原值放 children，核实或恢复入口放 actions；都由应用提供。"
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
      "对象、原值与未知结果文字允许换行；动作复用已有 Group 和调用方真实入口。"
    ],
    "customization": [
      "使用公开 render/ref、ARIA、事件与样式；不混用主题三轴。"
    ]
  }, designEn: {"whenToUse":["A write occurred without a reliable outcome."],"avoid":["Unknown is not failure; never retry a dangerous write by default."],"composition":["Original value in children and verification/recovery entries in actions; applications supply both."],"stateOwner":{"library":["Native semantics, public composition, and centralized roles."],"application":["Objects, content, values, states, and request outcomes."]},"responsive":["Objects, original values, and unknown-result text wrap; actions use existing Group and actual caller entries."],"customization":["Public render/refs, ARIA, events, and styles; keep theme axes independent."]},
  "api": [
    {
      "name": "PendingValue",
      "description": "原值放 children，核实或恢复入口放 actions；都由应用提供。", descriptionEn: "Put the original value in children and verification/recovery entries in actions; applications supply both.",
      "props": [
        {
          "name": "label",
          "type": "string",
          "description": "必填非空对象名称。", descriptionEn: "A required nonblank object name."
        },
        {
          "name": "children",
          "type": "ReactNode",
          "description": "原值；0 保持0，缺席不代填0。", descriptionEn: "The original value; zero remains zero and missing never becomes zero."
        },
        {
          "name": "actions",
          "type": "ReactNode",
          "description": "应用已有的核实/恢复入口，组件不发请求。", descriptionEn: "Actual application verification/recovery entries; the component sends no request."
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
