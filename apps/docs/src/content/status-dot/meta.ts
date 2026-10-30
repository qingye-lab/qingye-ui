import type { ComponentMeta } from "@/lib/types";

export default {
  "title": "状态 StatusDot",
  "titleEn": "StatusDot",
  "description": "让状态色与可见名称同时表达事实。",
  "descriptionEn": "A state graphic and its visible name.",
  "category": "数据展示",
  "layer": "primitive",
  "source": "local",
  "exports": [
    "StatusDot"
  ],
  "keywords": ["status-dot", "status", "indicator", "online", "状态点", "在线", "指示灯", "圆点"],
  "decisions": "不把等待、进行中或结果未知混成同一事实。", decisionsEn: "Waiting, in-progress, and unknown results remain distinct facts.",
  "design": {
    "methods": [
      "名实相符",
      "进退相承"
    ],
    "whenToUse": [
      "表达对象的真实状态。"
    ],
    "avoid": [
      "不把等待、进行中或结果未知混成同一事实。"
    ],
    "composition": [
      "名称默认走 locale；label 可附上明确对象，图形不单独成为 Spinner。"
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
      "状态名称允许长中英文换行；图形尺寸独立，不代替名称。"
    ],
    "customization": [
      "使用公开 render/ref、ARIA、事件与样式；不混用主题三轴。"
    ]
  }, designEn: {"whenToUse":["Present an object's actual state."],"avoid":["Waiting, in-progress, and unknown results remain distinct facts."],"composition":["Default names use locale; label may identify a specific object. The glyph is not a standalone Spinner."],"stateOwner":{"library":["Native semantics, public composition, and centralized roles."],"application":["Objects, content, values, states, and request outcomes."]},"responsive":["Long status names in either language wrap; independent glyph dimensions do not replace names."],"customization":["Public render/refs, ARIA, events, and styles; keep theme axes independent."]},
  "notes": [
    "状态名对应固定的类别：在线是成功，异常是危险，警告和结果未知是警示，提示、等待中、进行中是信息；离线和 neutral 不施彩。同一类别在 Badge 里是同一色相。",
    "结果未知要读者去核实，归警示：它既不是失败，也不是成功。neutral 是没有归类的状态，用 label 写出它到底是什么。"
  ],
  "notesEn": [
    "Each state belongs to one fixed category: online is success, error is danger, warning and unknown are warning, and info, pending and in-progress are info; offline and neutral carry no hue. The same category has the same hue in Badge.",
    "An unknown outcome needs the reader to verify it, so it is a warning: neither a failure nor a success. neutral is a state with no category; use label to say what it is."
  ],
  "api": [
    {
      "name": "StatusDot",
      "description": "名称默认走 locale；label 可附上明确对象，图形不单独成为 Spinner。", descriptionEn: "Default names use locale; label may identify a specific object. The glyph is not a standalone Spinner.",
      "props": [
        {
          "name": "status",
          "type": "\"online\" | \"offline\" | \"warning\" | \"error\" | \"info\" | \"neutral\" | \"pending\" | \"in-progress\" | \"unknown\"",
          "description": "应用给出的实际状态，必填。", descriptionEn: "Required actual application state."
        },
        {
          "name": "label",
          "type": "string",
          "description": "替代默认 locale 名称，需继续表达对象状态。", descriptionEn: "Replaces the default localized name while still describing the object's state."
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
