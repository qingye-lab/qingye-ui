import type { ComponentMeta } from "@/lib/types";

export default {
  title: "级别 SeverityMark", titleEn: "SeverityMark",
  description: "用填了几格表达有次序的级别，名称由应用给出。", descriptionEn: "An ordered level shown as a number of filled cells, named by the application.",
  category: "数据展示", layer: "primitive", source: "local", exports: ["SeverityMark"],
  keywords: ["severity-mark", "severity", "level", "priority", "级别", "等级", "严重程度", "优先级", "告警级别"],
  decisions: "级别由填充的格数承担，tone 只是附带的类别：两个级别如果格数相同、只有色相不同，隐藏名称后就分不开，所以不同的级别要用不同的 level。库不内置任何级别用词，也不从数字推断名称；label 必填。没有级别时不放这个标记，level 没有 0。", decisionsEn: "The level is carried by the number of filled cells and tone is only an accompanying category: two levels with the same cell count and different hues cannot be told apart once the name is hidden, so different levels take different level values. The library ships no level words and infers no name from the number; label is required. With no level, omit the mark: level has no 0.",
  design: {
    methods: ["名实相符", "随境取度"],
    whenToUse: ["一行对象带有一个有次序的级别，需要不占一列文字就能比较高低。"],
    avoid: ["对象处于哪一种状态用 StatusDot：状态之间没有次序。", "有单位的测量值用 Meter；任务完成比例用 Progress。", "不用色相区分格数相同的两个级别。"],
    composition: ["同一列里的标记用同一个 max。", "name=\"hidden\" 时名称仍是可访问名称；同一行或表头要有文字让看得见的读者知道这一列是级别。", "与 StatusDot 同行时两种标记同高、同一条行中线。"],
    stateOwner: {
      library: ["格数与填充的对应、图形语义与可访问名称。"],
      application: ["级别的数值、一共几级、每一级的名称与类别。"],
    },
    responsive: ["名称跟随所在那一行的字号，过长时换行；格不缩小。"],
    customization: ["使用公开 render/ref、ARIA、事件与样式；不混用主题三轴。"],
  },
  designEn: {
    whenToUse: ["A row's object has an ordered level that must be comparable without spending a text column."],
    avoid: ["Use StatusDot for which state an object is in: states have no order.", "Use Meter for a measurement with a unit and Progress for task completion.", "Do not tell two levels with the same cell count apart by hue."],
    composition: ["Marks in one column share one max.", "With name=\"hidden\" the name remains the accessible name; the row or the column header must still tell sighted readers that the column is a level.", "Beside a StatusDot both marks have the same height and share one row midline."],
    stateOwner: {
      library: ["The mapping from level to filled cells, the image semantics and the accessible name."],
      application: ["The level value, the number of levels, and each level's name and category."],
    },
    responsive: ["The name follows the text size of its row and wraps when long; cells do not shrink."],
    customization: ["Public render/refs, ARIA, events, and styles; keep theme axes independent."],
  },
  api: [
    {
      name: "SeverityMark",
      description: "一排格加一个名称；根是 role=\"img\"，可访问名称就是 label。", descriptionEn: "A row of cells and a name; the root is role=\"img\" and its accessible name is label.",
      props: [
        { name: "level", type: "number", description: "第几级：填满的格数，1 到 max 的整数，必填。越界或非整数抛 RangeError，不取整。根上带 data-level。", descriptionEn: "Required level: the number of filled cells, an integer from 1 to max. Out-of-range or non-integer values throw RangeError and are never rounded. The root carries data-level." },
        { name: "max", type: "number", default: "3", description: "一共几级：格的总数，2 到 5 的整数；否则抛 RangeError。未填的格保留为空格。", descriptionEn: "The number of levels: total cells, an integer from 2 to 5; otherwise RangeError is thrown. Unfilled cells stay as empty cells." },
        { name: "tone", type: "\"danger\" | \"warning\" | \"success\" | \"info\"", description: "已填格的状态类别，由调用方声明，组件不从级别猜好坏；根上带 data-tone。不给时用焦墨。非法值抛 RangeError。", descriptionEn: "The status category of the filled cells, declared by the caller; the component does not guess good or bad from the level. The root carries data-tone. Omitted, the ink color is used. An invalid value throws RangeError." },
        { name: "label", type: "string", description: "这一级的名称，必填；缺失或为空时抛错。它是可访问名称，也是可见名称。", descriptionEn: "Required name of the level; a missing or blank value throws. It is the accessible name and the visible name." },
        { name: "name", type: "\"visible\" | \"hidden\"", default: "\"visible\"", description: "hidden 时画面上只剩格，label 仍是可访问名称。", descriptionEn: "With hidden only the cells remain on screen; label is still the accessible name." },
        { name: "render / ref / 原生属性", nameEn: "render / ref / native props", type: "current public component props", description: "属性、事件与ref透传实际元素；样式由className/style调整。", descriptionEn: "Forward attributes, events, and refs to the actual element; adjust presentation through className/style." },
      ],
    },
  ],
  notes: [
    "读屏只读一次名称：格与可见名称都不进可访问树。",
    "级别不只靠颜色：去掉色相后，已填的实心格与未填的空格仍读得出第几级。",
    "强制颜色下已填的格是 CanvasText 实心，未填的格是一圈线；tone 的色相收成同一色。",
  ],
  notesEn: [
    "A screen reader reads the name once: the cells and the visible name stay out of the accessibility tree.",
    "The level does not rely on color: without hue, solid filled cells and outlined empty cells still give the level.",
    "In forced colors filled cells are solid CanvasText and empty cells are an outline; tone hues collapse to one color.",
  ],
} satisfies ComponentMeta;
