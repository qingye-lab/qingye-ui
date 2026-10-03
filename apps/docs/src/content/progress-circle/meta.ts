import type { ComponentMeta } from "@/lib/types";

export default {
  "title": "圆形进度 ProgressCircle",
  "titleEn": "ProgressCircle",
  "description": "以圆形呈现同一可靠进度契约。",
  "descriptionEn": "The same confirmed progress contract in a circle.",
  "category": "反馈",
  "layer": "primitive",
  "source": "local",
  "exports": [
    "ProgressCircle",
    "ProgressCirclePrimitive"
  ],
  "keywords": [
    "progress-circle"
  ],
  "decisions": "不作为独立旋转动画；无可靠比例时 value=null。", decisionsEn: "Do not use it as a standalone spinning animation; value=null when no reliable ratio exists.",
  "design": {
    "methods": [
      "名实相符",
      "进退相承"
    ],
    "whenToUse": [
      "位置适合圆形进度表达。"
    ],
    "avoid": [
      "不作为独立旋转动画；无可靠比例时 value=null。"
    ],
    "composition": [
      "复用 Progress 的范围、ARIA 与真实 null 的本地化进行中；可见名称在外部通过 aria-labelledby 关联。"
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
      "五档圆环采用独立尺寸角色及同名文字档；可见名称与读数在固定圆外通过 aria-labelledby 组合。"
    ],
    "customization": [
      "使用公开 render/ref、ARIA、事件与样式；不混用主题三轴。"
    ]
  }, designEn: {"whenToUse":["The position suits circular progress presentation."],"avoid":["Do not use it as a standalone spinning animation; value=null when no reliable ratio exists."],"composition":["Uses Progress ranges, ARIA, and localized in-progress for actual null. Associate an external visible name through aria-labelledby."],"stateOwner":{"library":["Native semantics, public composition, and centralized roles."],"application":["Objects, content, values, states, and request outcomes."]},"responsive":["Five independent circular dimension roles with matching text profiles; visible names/readings stay outside the fixed circle through aria-labelledby."],"customization":["Public render/refs, ARIA, events, and styles; keep theme axes independent."]},
  "api": [
    {
      "name": "ProgressCircle",
      "description": "复用 Progress 的范围、ARIA 与真实 null 的本地化进行中；可见名称在外部通过 aria-labelledby 关联。", descriptionEn: "Uses Progress ranges, ARIA, and localized in-progress for actual null. Associate an external visible name through aria-labelledby.",
      "props": [
        {
          "name": "value / min / max",
          "type": "Progress props",
          "description": "与 Progress 相同的可靠值、0、null 与有效范围协议。", descriptionEn: "The same reliable value, zero, null, and valid-range protocol as Progress."
        },
        {
          "name": "size",
          "type": "\"xs\" | \"sm\" | \"md\" | \"lg\" | \"xl\"",
          "default": "\"md\"",
          "description": "独立圆形尺寸角色，不影响进度事实。", descriptionEn: "Independent circular dimension roles without changing progress facts."
        },
        {
          "name": "aria-label / aria-labelledby",
          "type": "string",
          "description": "任务名称；可见名称保持在圆外。", descriptionEn: "The task name; keep its visible name outside the circle."
        },
        {
          "name": "render / ref / 原生属性", nameEn: "render / ref / native props",
          "type": "current public component props",
          "description": "属性、事件与ref透传实际元素；样式由className/style调整。", descriptionEn: "Forward attributes, events, and refs to the actual element; adjust presentation through className/style."
        }
      ]
    },
    {
      "name": "ProgressCirclePrimitive",
      "description": "相同 Base UI Progress 公共原语；圆环不引入第二套任务事实。", descriptionEn: "The same public Base UI Progress primitive; the circle introduces no second task-state system."
    }
  ]
} satisfies ComponentMeta;
