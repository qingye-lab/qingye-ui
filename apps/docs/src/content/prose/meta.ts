import type { ComponentMeta } from "@/lib/types";

export default {
  "title": "长文 Prose",
  "titleEn": "Prose",
  "description": "给已渲染的 Markdown / 富文本排版：标题、段落、列表、引用、代码、表格读已有的文字档与墨阶。默认只排版、不带框；文章独自成篇、没有承载面时用 framed 给它一张阅读纸。",
  "descriptionEn": "Typesets already-rendered Markdown or rich text: headings, paragraphs, lists, quotes, code and tables read existing text tiers and ink roles. It only typesets by default, with no frame; give it a reading paper with framed when the article stands alone with no surface of its own.",
  "category": "排版",
  "layer": "foundation",
  "source": "local",
  "exports": [
    "Prose"
  ],
  "keywords": [
    "markdown", "阅读", "文章", "richtext", "typography"
  ],
  "decisions": "Prose 不解析 Markdown、不内置渲染器：调用方用任意工具（react-markdown、MDX、服务端 HTML）产出原生元素，Prose 只给直接子块里的原生文本元素（header、h1–h4、p、ul/ol 含任务列表、blockquote、pre、table、figure、details、hr、img）以及这些子块之内的原生元素（strong/em、a、行内代码、kbd、figcaption、summary 等）排版，不改写它们的结构或属性。带 data-slot 的元素与它的内部不进入，所以文章里可以直接放组件与演示。标题三级取页面已有的文字档（h1 展示、h2 标题、h3 章节），与官网文档同一套（2026-10-12 裁决）。",
  "decisionsEn": "Prose neither parses Markdown nor bundles a renderer: callers use any tool (react-markdown, MDX, server-rendered HTML) to produce native elements, and Prose typesets only the native text blocks among its direct children (header, h1–h4, p, ul/ol including task lists, blockquote, pre, table, figure, details, hr, img) and the native elements inside them (strong/em, a, inline code, kbd, figcaption, summary and so on), without rewriting their structure or attributes. An element carrying data-slot, and everything inside it, is left alone, so components and live examples can sit directly in an article. The three heading ranks read the page's existing text tiers (h1 display, h2 title, h3 chapter), the same scale as the documentation site (ruling of 2026-10-12).",
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
      "文章里直接放库组件：带 data-slot 的元素及其内部不排版。自己画的一段内容加上 data-slot，就声明了它不是正文。",
      "div、section 这类容器子块不进入。要让容器里的标题与段落也成文，用 render 把这个容器本身做成一篇 Prose。",
      "页面已经有承载面（Card、文档站的纸）时保持默认（不带框）：只排版，不再画第二张纸；栏宽与内缘读 --qy-prose-column、--qy-prose-inset，承载面可以取同一组值。文章独自成篇、没有承载面时才设 framed。",
      "h1 与紧随的一段导语放进 header：两者相隔一个字段间距，导语读淡墨。",
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
      "栏宽 38 材（760px），不随视口拉宽；段落、列表与引用的行长止于 40 个正文字（640px），代码块与表格可以用满栏。纸的内缘 2 材，窄屏收紧到面板内缘。三个值都是预设，入口是 --qy-prose-column、--qy-prose-measure、--qy-prose-inset。",
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
      "Place library components directly in an article: an element carrying data-slot, and everything inside it, is not typeset. Put data-slot on a block you draw yourself to declare that it is not running text.",
      "Container children such as div and section are not entered. To typeset the headings and paragraphs inside one, make that container itself a Prose through render.",
      "Where the page already has a surface (a Card, the documentation paper) keep the default (no frame): it only typesets and draws no second paper; the column and inset come from --qy-prose-column and --qy-prose-inset, so the surface can read the same values. Set framed only when the article stands alone with no surface of its own.",
      "Put the h1 and the lead paragraph that follows it in a header: they sit one field gap apart and the lead reads in muted ink.",
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
      "The column is 38 材 (760px) and does not widen with the viewport; paragraphs, lists and quotes stop at a measure of 40 reading characters (640px), while code blocks and tables may use the whole column. The paper's inset is 2 材 and tightens to the panel padding on narrow screens. All three are presets, set through --qy-prose-column, --qy-prose-measure and --qy-prose-inset.",
      "A very wide table does not yet scroll independently inside Prose (the paper's rounded corners need overflow-hidden rather than overflow-x-auto), so cells simply wrap — a known gap, not a missing default treatment."
    ]
  },
  "api": [
    {
      "name": "Prose",
      "description": "长文容器；默认渲染为 article。",
      "descriptionEn": "The long-form container; renders as article by default.",
      "props": [
        {
          "name": "framed",
          "type": "boolean",
          "default": "false",
          "description": "是否自带阅读纸（面、清墨线、圆角、内缘与栏宽上限）。默认 false，只排版，纸由所在的承载面负责（不要盒装样本、不要多余的框）；独自成篇时设为 true。",
          "descriptionEn": "Whether it brings its own reading paper (surface, hairline, radius, inset and column limit). False by default: it only typesets and the surrounding surface is the paper (no boxed specimens, no redundant frames); set true when the article stands alone."
        },
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
    "深浅主题下墨阶与纸自动互换，不需要调用方处理。",
    "排版规则在样式的 components 层：给文章里的元素加任何工具类都能覆盖它，不需要 !important。",
    "中文段落两端对齐并按严格规则断行；判断依据是元素的 lang，页面须正确声明语言。",
    "已知边界：另一篇 Prose 若隔着组件嵌在外层 Prose 的原生文本块里（如 figure 里的 Card 里再放 Prose），内层的行内元素不排版；把它放进 div 或 section。"
  ],
  "notesEn": [
    "Ships no built-in copy strings; does not go through useUILocale.",
    "Ink roles and the paper swap automatically between light and dark; callers do not handle this.",
    "The typesetting rules sit in the stylesheet's components layer: any utility class on an element in the article overrides them, with no !important.",
    "Chinese paragraphs are justified and break lines under the strict rule; this follows the element's lang, so the page must declare its language correctly.",
    "Known limit: a second Prose nested through a component inside a native text block of an outer Prose (a Prose in a Card in a figure, for example) does not get its inline elements typeset; place it in a div or section instead."
  ]
} satisfies ComponentMeta;
