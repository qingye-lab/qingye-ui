import type { ComponentMeta } from "@/lib/types";

export default {
  "title": "身份图像 Avatar",
  "titleEn": "Avatar",
  "description": "同一身份视觉样本的图片与回退。",
  "descriptionEn": "An image with one named identity and a fallback.",
  "category": "数据展示",
  "layer": "primitive",
  "source": "local",
  "exports": [
    "Avatar",
    "AvatarImage",
    "AvatarFallback",
    "AvatarPrimitive"
  ],
  "keywords": [
    "avatar"
  ],
  "decisions": "不要虚构姓名或让 initials 代替可访问名称。", decisionsEn: "Do not invent a name or let initials replace an accessible name.",
  "design": {
    "methods": [
      "名实相符",
      "相成相制"
    ],
    "whenToUse": [
      "需要一张有名称的身份图像或明确回退。"
    ],
    "avoid": [
      "不要虚构姓名或让 initials 代替可访问名称。"
    ],
    "composition": [
      "Image / Fallback 使用 Base UI 加载事实；label 命名同一对象。"
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
      "五档图像样本采用独立尺寸角色及同名文字档；Fallback 是短内容，完整身份由根的可访问名称提供。"
    ],
    "customization": [
      "使用公开 render/ref、ARIA、事件与样式；不混用主题三轴。"
    ]
  }, designEn: {"whenToUse":["A named identity image or explicit fallback is needed."],"avoid":["Inventing names or replacing an accessible name with initials."],"composition":["Image/Fallback use Base UI loading facts; label names the same object."],"stateOwner":{"library":["Native semantics, public composition, and centralized roles."],"application":["Objects, content, values, states, and request outcomes."]},"responsive":["Five independent image size roles with matching text profiles. Fallback is short; the root accessible name supplies the complete identity."],"customization":["Public render/refs, ARIA, events, and styles; keep theme axes independent."]},
  "api": [
    {
      "name": "Avatar",
      "description": "Image / Fallback 使用 Base UI 加载事实；label 命名同一对象。", descriptionEn: "Image/Fallback use Base UI loading facts; label names the same object.",
      "props": [
        {
          "name": "label",
          "type": "string",
          "description": "必填非空身份名称，图片和回退共用。", descriptionEn: "A required nonblank identity name shared by the image and fallback."
        },
        {
          "name": "size",
          "type": "\"xs\" | \"sm\" | \"md\" | \"lg\" | \"xl\"",
          "default": "\"md\"",
          "description": "独立 avatar 尺寸与同名文字档。", descriptionEn: "Independent avatar dimensions with matching text profiles."
        },
        {
          "name": "Image src / alt / onLoadingStatusChange",
          "type": "Base UI Avatar.Image props",
          "description": "真实图片源、原生alt与加载事件。", descriptionEn: "An actual image source, native alt, and loading events."
        },
        {
          "name": "Fallback children / delay",
          "type": "Base UI Avatar.Fallback props",
          "description": "调用方确定的短回退内容，delay 不决定服务结果。", descriptionEn: "Caller-defined short fallback content; delay does not determine a service outcome."
        },
        {
          "name": "render / ref / 原生属性", nameEn: "render / ref / native props",
          "type": "current public component props",
          "description": "属性、事件与ref透传实际元素；样式由className/style调整。", descriptionEn: "Forward attributes, events, and refs to the actual element; adjust presentation through className/style."
        }
      ]
    },
    {
      "name": "AvatarImage",
      "description": "实际图片元素；透传 src、alt 与加载状态事件。", descriptionEn: "The actual image element; forwards src, alt, and loading state events."
    },
    {
      "name": "AvatarFallback",
      "description": "真实缺图、加载失败时的调用方短回退内容；delay 仅控制显示时机。", descriptionEn: "Caller-provided short fallback for a missing or failed image. delay changes only presentation timing."
    },
    {
      "name": "AvatarPrimitive",
      "description": "Base UI Avatar 公共原语，供需要原语完整组合能力的调用方使用。", descriptionEn: "The public Base UI Avatar primitive for callers needing its complete composition API."
    }
  ]
} satisfies ComponentMeta;
