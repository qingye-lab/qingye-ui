import type { ComponentMeta } from "@/lib/types";

export default {
  "title": "长文 Prose",
  "titleEn": "Prose",
  "description": "给已渲染的 Markdown / 富文本排版：一张独立的阅读纸，标题、列表、引用、代码、表格读已有的文字档与墨阶。",
  "descriptionEn": "Typesets already-rendered Markdown or rich text as an independent reading paper; headings, lists, quotes, code and tables read existing text tiers and ink roles.",
  "category": "排版",
  "layer": "foundation",
  "source": "local",
  "exports": [
    "Prose"
  ],
  "keywords": [
    "markdown", "阅读", "文章", "richtext", "typography"
  ],
  "decisions": "Prose 不解析 Markdown、不内置渲染器：调用方用任意工具（react-markdown、MDX、服务端 HTML）产出原生元素，Prose 只用后代选择器给 h1–h4、p、strong/em、a、ul/ol（含任务列表）、blockquote、行内代码、pre > code、table、hr、img/figure/figcaption、kbd、details/summary 排版，不改写它们的结构或属性。",
  "decisionsEn": "Prose neither parses Markdown nor bundles a renderer: callers use any tool (react-markdown, MDX, server-rendered HTML) to produce native elements, and Prose only typesets h1–h4, p, strong/em, a, ul/ol (including task lists), blockquote, inline code, pre > code, table, hr, img/figure/figcaption, kbd and details/summary through descendant selectors, without rewriting their structure or attributes.",
  "design": {
    "methods": [
      "以材为祖", "疏密有致", "墨分五色", "骨法用笔", "绘事后素", "经营位置", "材有美"
    ],
    "whenToUse": [
      "展示一段已经渲染好的长文或 Markdown 结果：帮助文章、更新日志、AI 回复、文档正文。"
    ],
    "avoid": [
      "Prose 不解析 Markdown 字符串；把原始文本交给具体渲染器，渲染结果再放进 Prose。",
      "短小的字段说明或摘要用 Text；Prose 是给整段长文排版，不是通用的富文本容器。"
    ],
    "composition": [
      "children 是渲染器产出的原生元素树，或经审查的 dangerouslySetInnerHTML；Prose 只加一层 className。",
      "表格读与 Table 组件相同的视觉规则（清染表头/表尾、行高、数字列等宽），行内代码读 Typography 的 Code 规则，链接读 Link 的 linkClassName，不另起一套画法。"
    ],
    "stateOwner": {
      "library": [
        "标题、段落、列表、引用、代码、表格、分隔线、图片、键位、详情框的排版与墨阶。"
      ],
      "application": [
        "Markdown 解析、内容本身、任务列表勾选框的完成事实、脚注与链接目标。"
      ]
    },
    "responsive": [
      "版心固定 38em，不随视口拉宽；内缘在窄屏收紧到既有面板内缘的窄屏取值。",
      "很宽的表格目前不会在 Prose 内独立横向滚动（纸的圆角需要 overflow-hidden 而非 overflow-x-auto），只能按单元格自然换行——已知缺口，非默认画法缺失。"
    ],
    "customization": [
      "使用公开 render/ref/className/style 与原生属性；不混用主题三轴。"
    ]
  },
  "designEn": {
    "whenToUse": [
      "Present an already-rendered long-form or Markdown result: a help article, a changelog entry, an AI reply, or documentation body copy."
    ],
    "avoid": [
      "Prose does not parse Markdown strings; hand raw text to an actual renderer first and place its output inside Prose.",
      "Use Text for short field descriptions or summaries; Prose typesets a whole long-form passage, not a general rich-text container."
    ],
    "composition": [
      "Children are the renderer's native element tree, or reviewed dangerouslySetInnerHTML; Prose only adds one className.",
      "Tables read the same visual rules as the Table component (washed header/footer bands, row height, tabular numeric cells); inline code reads Typography's Code rule; links read Link's linkClassName — none of these get a second drawing."
    ],
    "stateOwner": {
      "library": [
        "Typesetting and ink roles for headings, paragraphs, lists, quotes, code, tables, rules, images, keys and disclosure widgets."
      ],
      "application": [
        "Markdown parsing, the content itself, task-list completion facts, footnotes and link destinations."
      ]
    },
    "responsive": [
      "The measure is a fixed 38em and does not widen with the viewport; the inset tightens to the existing panel padding's narrow value.",
      "A very wide table does not yet scroll independently inside Prose (the paper's rounded corners need overflow-hidden rather than overflow-x-auto), so cells simply wrap — a known gap, not a missing default treatment."
    ]
  },
  "api": [
    {
      "name": "Prose",
      "description": "阅读面容器；默认渲染为 article。",
      "descriptionEn": "The reading-pane container; renders as article by default.",
      "props": [
        {
          "name": "render / ref / className / style / 原生属性",
          "nameEn": "render / ref / className / style / native props",
          "type": "useRender.ComponentProps<\"article\">",
          "description": "属性、事件与 ref 透传实际元素；children 是调用方已渲染好的内容。",
          "descriptionEn": "Forward attributes, events and refs to the actual element; children are content the caller has already rendered."
        }
      ]
    }
  ],
  "notes": [
    "不内置任何文案字符串，不需要经过 useUILocale。",
    "深浅主题下墨阶与纸自动互换，不需要调用方处理。"
  ],
  "notesEn": [
    "Ships no built-in copy strings; does not go through useUILocale.",
    "Ink roles and the paper swap automatically between light and dark; callers do not handle this."
  ]
} satisfies ComponentMeta;
