import type { ComponentMeta } from "@/lib/types";

export default {
  "title": "角标 CornerMark",
  "titleEn": "CornerMark",
  "description": "钉在宿主一角的未读数或在线点，不是宿主内容本身。",
  "descriptionEn": "A count or presence dot anchored to a host's corner, never part of the host's own content.",
  "category": "数据展示",
  "layer": "primitive",
  "source": "local",
  "exports": [
    "CornerMark"
  ],
  "keywords": [
    "corner-mark",
    "badge",
    "unread",
    "presence"
  ],
  "decisions": "角标本身是装饰性的：数字必须经宿主的可访问名称，或 label（视觉隐藏文字）才能被读屏听到；零计数直接隐藏，不留空壳。与 Badge（正文里的一段字）、StatusDot（彩色圆点 + 墨色名称）各管各的边界。",
  "decisionsEn": "The mark is decorative on its own: a count only reaches assistive tech through the host's accessible name or the required label (visually hidden text); a zero count hides the mark entirely rather than leaving an empty shell. Kept distinct from Badge (inline text) and StatusDot (a colored dot with an ink label).",
  "api": [
    {
      "name": "CornerMark",
      "description": "包裹宿主内容，角标钉在宿主的右上角。",
      "descriptionEn": "Wraps the host content; the mark is pinned to the host's top-right corner.",
      "props": [
        {
          "name": "count / max",
          "type": "number / number",
          "description": "计数档；超过 max（默认 99）显示「max+」，真实数字仍在 label 里；count 为 0 时角标与 label 一起消失。",
          "descriptionEn": "The count variant; past max (default 99) it reads \"max+\" while the real number stays in label; a count of 0 hides the mark and its label together."
        },
        {
          "name": "dot",
          "type": "true",
          "description": "不显示数字的圆点档，与 count 互斥。",
          "descriptionEn": "A digit-free dot variant, mutually exclusive with count."
        },
        {
          "name": "label",
          "type": "string（必填）",
          "description": "角标本身 aria-hidden；这段视觉隐藏文字是数字或状态唯一确定能被读屏听到的途径，开发环境缺失时会抛错。",
          "descriptionEn": "The mark itself is aria-hidden; this visually hidden text is the only guaranteed path for the count or status to reach assistive technology. Missing it throws in development."
        },
        {
          "name": "tone",
          "type": "\"neutral\" | \"success\" | \"danger\"",
          "description": "默认焦墨；success、danger 是已有语义类别，没有脱离类别的彩色。",
          "descriptionEn": "Defaults to ink; success and danger are existing semantic categories, never hue without meaning."
        },
        {
          "name": "className / wrapperClassName",
          "type": "string",
          "description": "className 作用于角标本身（例如覆盖纸色圈，使其匹配实际承载面）；wrapperClassName 作用于外层定位容器。",
          "descriptionEn": "className targets the mark itself (for example overriding the paper-colored ring to match the actual surface); wrapperClassName targets the outer positioning wrapper."
        }
      ]
    }
  ],
  "notes": [
    "纸色圈默认读 --qy-surface；宿主底色不是纸面时（例如侧栏行的 --qy-sidebar），用 className 覆盖——库不猜父背景。"
  ],
  "notesEn": [
    "The paper-colored ring defaults to --qy-surface; when the host's own surface differs (for example a sidebar row's --qy-sidebar), override it via className — the library never guesses a parent background."
  ],
  "design": {
    "methods": [
      "名实相符",
      "应物象形",
      "随境取度"
    ],
    "whenToUse": [
      "窄处（图标、rail、头像）需要附加一个未读数或存在状态，而没有空间放一整行文字。"
    ],
    "avoid": [
      "正文里的一段标注文字用 Badge；要被直接读到的状态名称用 StatusDot。"
    ],
    "stateOwner": {
      "library": [
        "几何、墨色类别与装饰性标记本身。"
      ],
      "application": [
        "真实计数、在线等状态事实与可访问 label 的文字内容。"
      ]
    },
    "responsive": [
      "同一个数字可以在不同容器宽度下切换成行内文字或角标——语义与数值必须一致（随境取度）。"
    ],
    "customization": [
      "尺寸与圈宽消费现有角色 token；具体墨阶为已验证默认。"
    ]
  },
  designEn: {
    "whenToUse": ["A narrow host (an icon, a rail, an avatar) needs an attached unread count or presence fact with no room for a full text line."],
    "avoid": ["Use Badge for an inline annotation in running text, and StatusDot for a status name meant to be read directly."],
    "stateOwner": { "library": ["Geometry, ink categories, and the decorative mark itself."], "application": ["The real count, presence facts such as online, and the accessible label's text."] },
    "responsive": ["The same number may switch between inline text and an anchored mark across container widths — semantics and the value itself must stay identical."],
    "customization": ["Size and ring width consume existing role tokens; specific ink levels are a verified default."],
  },
} satisfies ComponentMeta;
