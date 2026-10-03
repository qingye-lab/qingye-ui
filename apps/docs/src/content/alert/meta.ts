import type { ComponentMeta } from "@/lib/types";

export default {
  "title": "就地说明 Alert",
  "titleEn": "Alert",
  "description": "静态就地说明，按实际需要显式宣告。",
  "descriptionEn": "Static local information, with announcements only when requested.",
  "category": "反馈",
  "layer": "primitive",
  "source": "local",
  "exports": [
    "Alert",
    "AlertTitle",
    "AlertDescription"
  ],
  "keywords": [
    "alert"
  ],
  "decisions": "不要为每段静态说明自动添加 assertive 宣告。", decisionsEn: "Static explanations should not automatically make assertive announcements.",
  "design": {
    "methods": [
      "名实相符",
      "相成相制"
    ],
    "whenToUse": [
      "说明当前对象的条件、后果或已知结果。"
    ],
    "avoid": [
      "不要为每段静态说明自动添加 assertive 宣告。"
    ],
    "composition": [
      "Title / Description 可与现有 Button 组合；默认无 live 角色。"
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
      "标题与说明开放排布；长中英文允许换行。"
    ],
    "customization": [
      "使用公开 render/ref、ARIA、事件与样式；不混用主题三轴。"
    ]
  }, designEn: {"whenToUse":["Explain conditions, consequences, or known results for the current object."],"avoid":["Automatically making assertive announcements for static explanations."],"composition":["Compose Title/Description with existing Button controls; there is no default live role."],"stateOwner":{"library":["Native semantics, public composition, and centralized roles."],"application":["Objects, content, values, states, and request outcomes."]},"responsive":["Titles and explanations use open layout; long text in either language wraps."],"customization":["Public render/refs, ARIA, events, and styles; keep theme axes independent."]},
  "api": [
    {
      "name": "Alert",
      "description": "Title / Description 可与现有 Button 组合；默认无 live 角色。", descriptionEn: "Compose Title/Description with existing Button controls; there is no default live role.",
      "props": [
        {
          "name": "tone",
          "type": "\"neutral\" | \"info\" | \"warning\" | \"danger\" | \"success\"",
          "default": "\"neutral\"",
          "description": "已声明事实的语义颜色，不推断结果。", descriptionEn: "Semantic colors for declared facts, without inferring outcomes."
        },
        {
          "name": "role",
          "type": "\"alert\" | \"status\" | native role",
          "description": "仅确有宣告需求时由调用方显式传入。", descriptionEn: "The caller supplies these only when an announcement is needed."
        },
        {
          "name": "render / ref / 原生属性", nameEn: "render / ref / native props",
          "type": "current public component props",
          "description": "属性、事件与ref透传实际元素；样式由className/style调整。", descriptionEn: "Forward attributes, events, and refs to the actual element; adjust presentation through className/style."
        }
      ]
    },
    {
      "name": "AlertTitle",
      "description": "就地说明标题；可透传 render 与原生属性。", descriptionEn: "An in-place explanatory title; forwards render and native props."
    },
    {
      "name": "AlertDescription",
      "description": "就地说明正文；长文本允许换行。", descriptionEn: "In-place explanatory text that permits long content to wrap."
    }
  ]
} satisfies ComponentMeta;
