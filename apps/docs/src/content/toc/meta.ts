import type { ComponentMeta } from "@/lib/types";

export default {
  "title": "阅读目录 Toc",
  "titleEn": "Toc",
  "description": "本页内几个段落之间走动的纵向目录：当前位置把一条清墨基线上自己那一段加深为焦墨，不新增形状。",
  "descriptionEn": "A vertical in-page table of contents for moving between sections; the current location deepens its own segment of an existing thin line instead of adding a new shape.",
  "category": "导航",
  "layer": "pattern",
  "source": "local",
  "exports": [
    "Toc", "scanTocHeadings", "useTocHeadings", "useTocScrollSpy"
  ],
  "keywords": [
    "toc", "目录", "大纲", "outline", "anchor", "scroll-spy"
  ],
  "decisions": "Toc 不读路由、不做平滑滚动：<a href=\"#id\"> 是原生锚点跳转，吸顶偏移、路由集成这类页面细节留给项目。当前位置（current）由调用方传入，组件不猜测滚动位置；useTocScrollSpy 是可选工具，不是 Toc 的隐藏依赖。",
  "decisionsEn": "Toc neither reads routing nor performs smooth scrolling: <a href=\"#id\"> is a native anchor jump; sticky-header offsets and router integration stay with the project. The current location is supplied by the caller — the component never guesses scroll position — and useTocScrollSpy is an optional utility, not a hidden dependency of Toc.",
  "design": {
    "methods": [
      "经营位置", "骨法用笔", "墨分五色", "以材为祖", "名实相符"
    ],
    "whenToUse": [
      "一篇长文或文档页需要在几个段落间快速定位，并看到自己读到了哪一节。"
    ],
    "avoid": [
      "少于两个目的地时目录没有意义，由调用方决定是否渲染（Toc 本身只在 items 为空时不渲染）。",
      "跨页面的目的地用 Breadcrumb 或 NavigationMenu；Toc 只表达同一页内的位置。"
    ],
    "composition": [
      "items 可以手写，也可以用 useTocHeadings 从容器里扫描 h2/h3[id]（Prose 渲染的标题天然满足）。",
      "current 可以手动受控，也可以用 useTocScrollSpy 按滚动位置计算；两者都是可选项，不用也能渲染一份纯目录。",
      "纵向导航线复用 src/nav-line.ts 的机制（与 Tabs、NavigationMenu 的横向导航线同源，只换轴向）。"
    ],
    "stateOwner": {
      "library": [
        "目录的排版、层级缩进、当前项的视觉表达。"
      ],
      "application": [
        "标题的真实 id、滚动容器、吸顶偏移、是否需要目录（少于两项时渲染与否）。"
      ]
    },
    "responsive": [
      "条目纵向紧排，不加 touch-target（会盖住上下条目），用内边距撑开命中区。"
    ],
    "customization": [
      "使用公开 render/ref/className/style 与原生属性；不混用主题三轴。"
    ]
  },
  "designEn": {
    "whenToUse": [
      "A long article or documentation page needs quick movement between sections, with visible confirmation of the current one."
    ],
    "avoid": [
      "A single destination makes no table of contents; the caller decides whether to render one (Toc itself only withholds rendering when items is empty).",
      "Use Breadcrumb or NavigationMenu for destinations across pages; Toc only expresses position within the current page."
    ],
    "composition": [
      "items can be written by hand, or scanned from a container's h2/h3[id] with useTocHeadings (headings Prose renders already satisfy this).",
      "current can be controlled manually or computed from scroll position with useTocScrollSpy; both are optional — a plain table of contents renders without either.",
      "The vertical nav line reuses src/nav-line.ts's mechanism (the same source as Tabs' and NavigationMenu's horizontal nav line, just a different axis)."
    ],
    "stateOwner": {
      "library": [
        "The table of contents' layout, level indent, and the current item's visual expression."
      ],
      "application": [
        "Headings' actual ids, the scroll container, sticky-header offsets, and whether a table of contents is needed at all."
      ]
    },
    "responsive": [
      "Items sit in a tight vertical stack without touch-target (it would cover adjacent items); padding alone widens the hit area."
    ]
  },
  "api": [
    {
      "name": "Toc",
      "description": "目录容器；渲染为 nav，没有条目时不渲染。",
      "descriptionEn": "The table of contents container; renders as nav, and renders nothing when there are no items.",
      "props": [
        { "name": "items", "type": "{ id: string; label: string; level: 2 | 3 }[]", "description": "目的地列表；id 对应页面上真实存在的锚点。", "descriptionEn": "The destination list; id must match an anchor that actually exists on the page." },
        { "name": "current", "type": "string", "description": "当前所在目的地的 id；缺省时没有条目带 aria-current。", "descriptionEn": "The id of the current destination; omitted means no item carries aria-current." },
        { "name": "render / ref / className / style / 原生属性", "nameEn": "render / ref / className / style / native props", "type": "useRender.ComponentProps<\"nav\">", "description": "属性、事件与 ref 透传实际元素。", "descriptionEn": "Forward attributes, events and refs to the actual element." }
      ]
    },
    {
      "name": "scanTocHeadings(root, selector?)",
      "description": "从一段已渲染内容里直接读出标题，不是 React hook；selector 默认 \":is(h2,h3)[id]\"。",
      "descriptionEn": "Reads headings directly from already-rendered content; not a React hook. selector defaults to \":is(h2,h3)[id]\"."
    },
    {
      "name": "useTocHeadings(containerRef, selector?)",
      "description": "scanTocHeadings 的 React 封装：内容变化（含异步加载）时用 MutationObserver 重新扫描。",
      "descriptionEn": "A React wrapper around scanTocHeadings: rescans via MutationObserver when content changes, including asynchronous loads."
    },
    {
      "name": "useTocScrollSpy(items, { container?, offset? })",
      "description": "按滚动位置计算当前目的地；container 缺省为 window，组件不猜测页面用了哪个滚动容器。",
      "descriptionEn": "Computes the current destination from scroll position; container defaults to window — the hook never guesses which element actually scrolls."
    }
  ],
  "keyboard": [
    { "keys": "Tab / Shift+Tab", "description": "在原生锚点之间移动焦点。", "descriptionEn": "Move focus between the native anchors." },
    { "keys": "Enter", "description": "跳转到对应锚点。", "descriptionEn": "Jump to the corresponding anchor." }
  ],
  "notes": [
    "当前项不改字重，只加深线段与文字墨色，避免整排因变宽而跳动。",
    "二级目录到基线 = 组内间隔；三级在此基础上再加层级缩进（--qy-level-indent），两个既有关系相加，不是新值。"
  ],
  "notesEn": [
    "The current item does not change font weight; only the line segment and text ink deepen, so the row never shifts width.",
    "Level 2 sits one relationship gap from the baseline; level 3 adds the existing level indent on top — two existing relationships added together, not a new value."
  ]
} satisfies ComponentMeta;
