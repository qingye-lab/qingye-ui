import { useTheme } from "@qingye_lab/ui/components/theme-provider";
import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";

/*
 * 法度台账的数据：每一行是一个入口、它与锚点的关系、以及来源类别。
 * - 关系与来源取自 docs/decisions/2026-10-03-foundation.md 与 packages/ui/tokens/components.css 的注释；
 *   基础层文档表头列了五类，正文另用「选择」，台账按正文实际使用的六类记。
 * - 值一律不写在这里：页面挂载后在当前主题与密度里实测（probe 的计算值），主题切换后重测。
 */

export type Source = "anchor" | "derived" | "constraint" | "ruling" | "choice" | "preset";
type Text = { zh: string; en: string };

export const SOURCES: { id: Source; zh: string; en: string; note: Text }[] = [
  { id: "anchor", zh: "锚点", en: "Anchor", note: { zh: "人选定的自由值；改它，派生值随之改变", en: "A free value chosen by a person; change it and derived values follow" } },
  { id: "derived", zh: "派生", en: "Derived", note: { zh: "锚点加一条写明的关系；改关系，不改结果", en: "An anchor plus a written relation; change the relation, not the result" } },
  { id: "constraint", zh: "约束", en: "Constraint", note: { zh: "关系给出下限或区间，取值在其中", en: "A relation sets a floor or range; the value sits inside it" } },
  { id: "ruling", zh: "裁决", en: "Ruling", note: { zh: "用户的明确决定，附日期；只能另行裁决", en: "An explicit, dated decision by the user; only another ruling changes it" } },
  { id: "choice", zh: "选择", en: "Choice", note: { zh: "关系之内的取舍，理由写在关系里", en: "A pick within what the relations allow; the reason is in the relation" } },
  { id: "preset", zh: "预设", en: "Preset", note: { zh: "暂时写不出关系；逐步收敛，不写成派生", en: "No relation yet; to be narrowed, never labeled derived" } },
];

/** 一个值怎样量：长度与百分比用 probe 的宽度，颜色用背景色，文字档用字号与行高，其余读原文。 */
export type Measure =
  | { kind: "len"; exprs: string[]; density?: boolean }
  | { kind: "pct"; exprs: string[] }
  | { kind: "raw"; exprs: string[] }
  | { kind: "color"; exprs: string[] }
  | { kind: "type"; step: string };

export type Row = { entry: string; measure: Measure; rel: Text; src: Source[] };
export type Section = { id: string; title: Text; origin: Text; rows: Row[] };

const v = (name: string) => `var(--qy-${name})`;
const grades = ["xs", "sm", "md", "lg", "xl"] as const;
const each = (pattern: (grade: string) => string) => grades.map((grade) => v(pattern(grade)));
const len = (...names: string[]): Measure => ({ kind: "len", exprs: names.map(v) });
const dens = (name: string): Measure => ({ kind: "len", exprs: [v(name)], density: true });
const raw = (name: string): Measure => ({ kind: "raw", exprs: [v(name)] });

export const STEPS: { step: string; use: Text }[] = [
  { step: "display-xl", use: { zh: "落地页大字", en: "Landing statement" } },
  { step: "display-lg", use: { zh: "页面标题", en: "Page title" } },
  { step: "display", use: { zh: "页面标题", en: "Page title" } },
  { step: "title", use: { zh: "区块标题", en: "Block title" } },
  { step: "chapter", use: { zh: "小节标题", en: "Subsection title" } },
  { step: "heading", use: { zh: "卡片、面板与浮层的标题", en: "Title of a card, panel or overlay" } },
  { step: "reading", use: { zh: "长文与富文本，每行留出换行余地", en: "Long-form and rich text, with room to wrap" } },
  { step: "body", use: { zh: "正文，也是文档的默认文字", en: "Body text, also the document default" } },
  { step: "support", use: { zh: "说明，与字段名同大", en: "Notes, the same size as field names" } },
  { step: "caption", use: { zh: "最小的说明，仍占一材", en: "The smallest note, still one module high" } },
  { step: "dense", use: { zh: "表格、标记与工具条里的密集文字", en: "Dense text in tables, markers and toolbars" } },
  { step: "metric", use: { zh: "单独的读数 1,284", en: "A standalone reading 1,284" } },
];

export const SECTIONS: Section[] = [
  {
    id: "cai",
    title: { zh: "材与分", en: "Module and unit" },
    origin: { zh: "《营造法式》「凡构屋之制，皆以材为祖」", en: "Yingzao Fashi: “All building begins from the cai module”" },
    rows: [
      { entry: "--qy-cai", measure: len("cai"), rel: { zh: "14px 正文的行高；几何从正文的一行出发", en: "The line height of 14px body text; geometry starts from one line of text" }, src: ["anchor"] },
      { entry: "--qy-fen", measure: len("fen"), rel: { zh: "材 ÷ 5；除数 5 是选择", en: "Module ÷ 5; the divisor 5 is a choice" }, src: ["anchor"] },
      { entry: "calc(var(--qy-fen) / 2)", measure: { kind: "len", exprs: ["calc(var(--qy-fen) / 2)"] }, rel: { zh: "半分，只用于贴身细部：轨道内缩、标记外加", en: "Half a unit, only for close detail: track inset, marker margin" }, src: ["derived"] },
      { entry: "--qy-marker-size", measure: len("marker-size"), rel: { zh: "材 − 分；与同一行的 md 图标同大", en: "Module − unit; as large as an md icon on the same line" }, src: ["derived"] },
      { entry: "--qy-marker-inset", measure: len("marker-inset"), rel: { zh: "(材 − 标记) ÷ 2：标记连同空白正好占一行", en: "(module − marker) ÷ 2: marker and space fill exactly one line" }, src: ["derived"] },
      { entry: "--qy-switch-size", measure: len("switch-size"), rel: { zh: "开关高一材、长两材", en: "A switch is one module high and two long" }, src: ["derived"] },
    ],
  },
  {
    id: "deng",
    title: { zh: "等：控件尺寸", en: "Grades: control size" },
    origin: { zh: "屋有大小，人无大小", en: "The house has grades; people do not" },
    rows: [
      { entry: "--qy-control-{xs…xl}", measure: { kind: "len", exprs: each((g) => `control-${g}`) }, rel: { zh: "外高 = 材 + n 分，n = 1…5", en: "Height = module + n units, n = 1…5" }, src: ["derived"] },
      { entry: "--qy-control-{xs…xl}-narrow", measure: { kind: "len", exprs: each((g) => `control-${g}-narrow`) }, rel: { zh: "窄屏升一等（+1 分），sm: 断点回到桌面；粗指针另由命中区保证", en: "Narrow viewports go up one grade (+1 unit) until sm:; coarse pointers rely on the hit area" }, src: ["derived"] },
      { entry: "--qy-control-{xs…xl}-padding", measure: { kind: "len", exprs: each((g) => `control-${g}-padding`) }, rel: { zh: "(外高 − 分) ÷ 2：文字两侧比上下多一个组内间隔；带边框时扣 1px", en: "(height − unit) ÷ 2: one in-group gap more at the sides than above and below; 1px less with a border" }, src: ["derived"] },
      { entry: "--qy-control-{xs…xl}-icon", measure: { kind: "len", exprs: each((g) => `control-${g}-icon`) }, rel: { zh: "该等字号 + 2px 取偶数，在偶数外高里整像素居中", en: "That grade's font size + 2px, made even, so it centers on whole pixels" }, src: ["derived"] },
      { entry: "--qy-fill-height", measure: dens("fill-height"), rel: { zh: "填值控件只有一等，默认 md、紧凑降为 sm；md 按钮同读此值，与同行的输入同高（2026-10-05）", en: "Value controls have one grade: md, or sm when compact; md buttons read it too and match inputs on their row (2026-10-05)" }, src: ["ruling"] },
      { entry: "--qy-touch-target", measure: len("touch-target"), rel: { zh: "粗指针下的命中区，不随等与密度；WCAG 2.2 AA 2.5.8 的基础要求是 24 × 24px", en: "Hit area under coarse pointers, fixed across grade and density; WCAG 2.2 AA 2.5.8 requires 24 × 24px" }, src: ["choice"] },
    ],
  },
  {
    id: "shumi",
    title: { zh: "疏密：间距", en: "Density: spacing" },
    origin: { zh: "邓石如「疏处可以走马，密处不使透风」", en: "Deng Shiru: “Where sparse, a horse may run; where dense, no wind passes”" },
    rows: [
      { entry: "--qy-control-content-gap", measure: len("control-content-gap"), rel: { zh: "1.5 分，比组内小一级：图标与名称读作一体", en: "1.5 units, one step below in-group: icon and name read as one" }, src: ["derived"] },
      { entry: "--qy-field-gap · --qy-action-gap", measure: len("field-gap"), rel: { zh: "2 分：名称、控件、说明之间；相邻动作之间", en: "2 units: between label, control and note; between adjacent actions" }, src: ["derived"] },
      { entry: "--qy-space-module", measure: dens("space-module"), rel: { zh: "疏密之材：默认一材，紧凑换成 4 分，文字的材不变", en: "The spacing module: one module, or 4 units when compact; the text module stays" }, src: ["derived"] },
      { entry: "--qy-field-group-gap · --qy-panel-gap", measure: dens("field-group-gap"), rel: { zh: "一个疏密之材：组与组之间空出一行正文", en: "One spacing module: a blank line of body text between groups" }, src: ["derived"] },
      { entry: "--qy-section-gap", measure: dens("section-gap"), rel: { zh: "两个疏密之材", en: "Two spacing modules" }, src: ["derived"] },
      { entry: "--qy-panel-padding", measure: dens("panel-padding"), rel: { zh: "组间 + 1 分：面板里的内容先彼此成组，再与边框成组", en: "Group gap + 1 unit: content groups with itself before the border" }, src: ["derived"] },
      { entry: "--qy-panel-padding-sm", measure: dens("panel-padding-sm"), rel: { zh: "组间 − 1 分：Popover、Alert 通常只装一组内容", en: "Group gap − 1 unit: a Popover or Alert usually holds one group" }, src: ["derived"] },
      { entry: "--qy-row-default", measure: dens("row-default"), rel: { zh: "一个填值控件 + 上下各一个组内间隔", en: "One value control plus an in-group gap above and below" }, src: ["derived"] },
      { entry: "--qy-level-indent", measure: len("level-indent"), rel: { zh: "3 分：明显小于行高，又数得出级数；密度不改层级", en: "3 units: clearly below a line, still countable; density leaves depth alone" }, src: ["preset"] },
      { entry: "--qy-page-gutter", measure: len("page-gutter"), rel: { zh: "clamp(16px, 1.4vw, 28px)，值随本窗口宽度", en: "clamp(16px, 1.4vw, 28px); the value follows this window" }, src: ["preset"] },
    ],
  },
  {
    id: "yuanjiao",
    title: { zh: "圆角", en: "Corners" },
    origin: { zh: "谢赫「应物象形」", en: "Xie He: “correspond to the object in depicting form”" },
    rows: [
      { entry: "--qy-radius-{xs…xl}", measure: { kind: "len", exprs: each((g) => `radius-${g}`) }, rel: { zh: "round(外高 × 5/16)，不设上限：大小控件读来同一种圆（2026-10-07）", en: "round(height × 5/16), uncapped: large and small controls share one curve (2026-10-07)" }, src: ["derived", "ruling"] },
      { entry: "--qy-radius-control", measure: len("radius-control"), rel: { zh: "md 外高 × 5/16：填值控件与 md 按钮", en: "md height × 5/16: value controls and md buttons" }, src: ["derived"] },
      { entry: "--qy-radius-marker", measure: len("radius-marker"), rel: { zh: "round(标记边长 × 5/16)", en: "round(marker edge × 5/16)" }, src: ["derived"] },
      { entry: "--qy-radius-item", measure: len("radius-item"), rel: { zh: "行项与最小一等控件同角", en: "Row items share the smallest grade's corner" }, src: ["choice"] },
      { entry: "--qy-overlay-inset", measure: len("overlay-inset"), rel: { zh: "1 分", en: "1 unit" }, src: ["derived"] },
      { entry: "--qy-radius-overlay", measure: len("radius-overlay"), rel: { zh: "控件圆角 + 浮层内缩：浮层里的行项与控件同角，内外同心", en: "Control corner + overlay inset: items inside match controls and stay concentric" }, src: ["derived"] },
      { entry: "--qy-radius-overlay-item", measure: len("radius-overlay-item"), rel: { zh: "max(0, 浮层圆角 − 内缩)", en: "max(0, overlay corner − inset)" }, src: ["derived"] },
      { entry: "--qy-track-inset", measure: len("track-inset"), rel: { zh: "半分；轨道里的候选按同心换算圆角", en: "Half a unit; options inside a track take concentric corners" }, src: ["derived"] },
      { entry: "--qy-radius-panel", measure: len("radius-panel"), rel: { zh: "4 分：同一比例落到面板会过方", en: "4 units: the control ratio would make a panel too square" }, src: ["choice"] },
    ],
  },
  {
    id: "mo",
    title: { zh: "墨与彩", en: "Ink and color" },
    origin: { zh: "张彦远「运墨而五色具」；谢赫「随类赋彩」", en: "Zhang Yanyuan: “Handle ink and the five colors are present”; Xie He: “apply color by category”" },
    rows: [
      { entry: "--qy-ink-jiao", measure: { kind: "pct", exprs: [v("ink-jiao")] }, rel: { zh: "焦：正文与标题、实心填充、焦点线；正文对纸约 16:1", en: "Jiao: text, headings, solid fills and focus lines; about 16:1 on paper" }, src: ["choice"] },
      { entry: "--qy-ink-nong", measure: { kind: "pct", exprs: [v("ink-nong")] }, rel: { zh: "浓：辅助文字；在最深的叠层上仍有 4.5:1 的最淡一级，下限约 65%", en: "Nong: supporting text; the lightest step still 4.5:1 on the deepest layer, floor about 65%" }, src: ["constraint"] },
      { entry: "--qy-ink-zhong", measure: { kind: "pct", exprs: [v("ink-zhong")] }, rel: { zh: "重：填值控件、未选标记；重墨线表示可编辑（2026-10-03）", en: "Zhong: fill controls, unselected markers; the heavy line means editable (2026-10-03)" }, src: ["ruling"] },
      { entry: "--qy-ink-dan", measure: { kind: "pct", exprs: [v("ink-dan")] }, rel: { zh: "淡：读数的凹槽、bordered 按钮的线；再浅看不见，再深空轨道像已填满；按钮是命令，不用表示可编辑的重墨线（2026-10-09）", en: "Dan: readout grooves and the bordered button line; lighter disappears, darker looks already filled; a button is a command, not an editable field (2026-10-09)" }, src: ["choice"] },
      { entry: "--qy-ink-qing", measure: { kind: "pct", exprs: [v("ink-qing")] }, rel: { zh: "清：容器线、悬停、彩色的柔底", en: "Qing: container lines, hover, soft color fills" }, src: ["choice"] },
      { entry: "--qy-wash-qing", measure: { kind: "pct", exprs: [v("wash-qing")] }, rel: { zh: "清染 = 清 ÷ 2：一层面与一道细线一样淡；内嵌面、页面底纸", en: "Light wash = qing ÷ 2: a surface reads as light as a hairline; insets, page ground" }, src: ["derived"] },
      { entry: "--qy-wash-dan", measure: { kind: "pct", exprs: [v("wash-dan")] }, rel: { zh: "淡染 = 淡 ÷ 2：按下与当前位置", en: "Pale wash = dan ÷ 2: pressed and current position" }, src: ["derived"] },
      { entry: "--qy-primary-hover", measure: { kind: "color", exprs: [v("primary-hover")] }, rel: { zh: "填充与纸调和，纸占一级清墨：淡一级，仍在墨阶上", en: "Fill mixed with paper by one qing step: lighter, still on the ladder" }, src: ["derived"] },
      { entry: "--qy-background · --qy-surface · --qy-surface-raised", measure: { kind: "color", exprs: [v("background"), v("surface"), v("surface-raised")] }, rel: { zh: "底纸、面板、浮起；浅色底纸是纸上一层清染，深色三级纸的明度为预设", en: "Ground, panel, raised; light ground is paper plus a light wash, dark paper levels are preset" }, src: ["derived", "preset"] },
      { entry: "--qy-{danger,warning,success,info}", measure: { kind: "color", exprs: [v("danger"), v("warning"), v("success"), v("info")] }, rel: { zh: "只表达状态；色值预设，柔底取清墨浓度", en: "Status only; hues are preset, soft fills use the qing strength" }, src: ["preset"] },
      { entry: "--qy-chart-{1…5}", measure: { kind: "color", exprs: [1, 2, 3, 4, 5].map((n) => v(`chart-${n}`)) }, rel: { zh: "花青、赭石、石绿、藤黄、胭脂；相邻色盲 ΔE ≥ 9、对承载面 ≥ 3:1，次序不调换", en: "Indigo, ochre, malachite, gamboge, rouge; adjacent CVD ΔE ≥ 9, ≥ 3:1 on surfaces, order fixed" }, src: ["constraint"] },
      { entry: "--qy-overlay", measure: { kind: "color", exprs: [v("overlay")] }, rel: { zh: "阻断遮罩是影，不是墨", en: "A blocking scrim is shadow, not ink" }, src: ["preset"] },
      { entry: "--qy-focus-ring-width", measure: len("focus-ring-width"), rel: { zh: "实心填充没有线可加深，在填充内侧画反色线；全库唯一的 2px 线", en: "Solid fills have no line to deepen, so an inverse line is drawn inside; the only 2px line" }, src: ["constraint"] },
      { entry: "--qy-focus-quiet-width", measure: len("focus-quiet-width"), rel: { zh: "无底无线的入口在自身盒内画一道", en: "Entries without fill or line draw one inside their own box" }, src: ["choice"] },
    ],
  },
  {
    id: "wenzi",
    title: { zh: "文字", en: "Type" },
    origin: { zh: "《考工记》「材有美」", en: "Kaogong Ji: “materials have their beauty”" },
    rows: [
      ...STEPS.map(({ step }) => ({ entry: `--qy-text-${step}-*`, measure: { kind: "type", step } as Measure, rel: { zh: "", en: "" }, src: ["preset", "derived"] as Source[] })),
      { entry: "--qy-text-support-size ≤ --qy-text-label-size", measure: { kind: "len", exprs: [v("text-support-size"), v("text-label-size")] }, rel: { zh: "说明从属于名称，不得大于字段名", en: "A note belongs to its name and is never larger" }, src: ["constraint"] },
      { entry: "--qy-text-control-{xs…xl}-size", measure: { kind: "len", exprs: each((g) => `text-control-${g}-size`) }, rel: { zh: "按钮名称随等变化；输入的值固定读 md 档", en: "Button names follow the grade; input values stay at md" }, src: ["preset"] },
      { entry: "--qy-font-sans", measure: raw("font-sans"), rel: { zh: "系统字体：中西字面成对，同一行只有一套 x 高度；品牌层可覆写", en: "System faces pair Latin and Chinese, one x-height per line; brands may override" }, src: ["choice"] },
      { entry: "--qy-text-body-tracking", measure: raw("text-body-tracking"), rel: { zh: "拉丁字距；中日韩文字为 normal", en: "Latin tracking; Chinese, Japanese and Korean use normal" }, src: ["preset"] },
    ],
  },
  {
    id: "dong",
    title: { zh: "动", en: "Motion" },
    origin: { zh: "谢赫「气韵生动」", en: "Xie He: “resonance of spirit, vitality of movement”" },
    rows: [
      { entry: "--qy-duration-instant", measure: raw("duration-instant"), rel: { zh: "程序性的即时变化", en: "Programmatic instant change" }, src: ["preset"] },
      { entry: "--qy-duration-press", measure: raw("duration-press"), rel: { zh: "按压；浮层退出", en: "Press; overlay exit" }, src: ["preset"] },
      { entry: "--qy-duration-fast", measure: raw("duration-fast"), rel: { zh: "快速反馈；浮层进入", en: "Quick feedback; overlay entry" }, src: ["preset"] },
      { entry: "--qy-duration-feedback", measure: raw("duration-feedback"), rel: { zh: "原位进入", en: "Entry in place" }, src: ["preset"] },
      { entry: "--qy-duration-base", measure: raw("duration-base"), rel: { zh: "展开、滑动", en: "Expand, slide" }, src: ["preset"] },
      { entry: "--qy-duration-slow", measure: raw("duration-slow"), rel: { zh: "较大范围的变化；当前无消费", en: "Larger changes; no consumer yet" }, src: ["preset"] },
      { entry: "--qy-duration-drawer", measure: raw("duration-drawer"), rel: { zh: "抽屉", en: "Drawer" }, src: ["preset"] },
      { entry: "--qy-ease-out", measure: raw("ease-out"), rel: { zh: "进入与反馈", en: "Entry and feedback" }, src: ["preset"] },
      { entry: "--qy-ease-in-out", measure: raw("ease-in-out"), rel: { zh: "原位往返", en: "Back and forth in place" }, src: ["preset"] },
      { entry: "--qy-ease-drawer", measure: raw("ease-drawer"), rel: { zh: "抽屉", en: "Drawer" }, src: ["preset"] },
      { entry: "--qy-ease-spring", measure: raw("ease-spring"), rel: { zh: "当前无消费", en: "No consumer yet" }, src: ["preset"] },
      { entry: "--qy-stagger", measure: raw("stagger"), rel: { zh: "内容错峰", en: "Content stagger" }, src: ["preset"] },
    ],
  },
];

export type Value = { text: string; compact?: string | undefined; colors?: { hex: string; alpha: number }[]; size?: number; leading?: number };

const trimNumber = (n: number) => String(Math.round(n * 100) / 100);
const px = (value: string) => Number.parseFloat(value);

export function colorOf(css: string, canvas: CanvasRenderingContext2D) {
  canvas.clearRect(0, 0, 1, 1);
  canvas.fillStyle = "#000";
  canvas.fillStyle = css;
  canvas.fillRect(0, 0, 1, 1);
  const [r = 0, g = 0, b = 0, a = 0] = canvas.getImageData(0, 0, 1, 1).data;
  return { hex: `#${[r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("")}`, alpha: Math.round((a / 255) * 100) };
}

/**
 * 在 probe 上实测一组行的值。`host` 的两个子元素分别处在默认与紧凑密度里；
 * 宿主宽 100px，所以百分比读出来的像素数就是百分数。
 */
export function measure(host: HTMLElement, rows: Row[]) {
  const [base, compact] = [host.children[0] as HTMLElement, host.children[1] as HTMLElement];
  const canvas = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
  const width = (probe: HTMLElement, expr: string) => {
    probe.style.inlineSize = expr;
    return px(getComputedStyle(probe).inlineSize);
  };
  const out = new Map<Row, Value>();
  for (const row of rows) {
    const m = row.measure;
    if (m.kind === "len") {
      const values = m.exprs.map((expr) => width(base, expr));
      const text = `${values.map(trimNumber).join(" / ")}px`;
      if (m.density) {
        const other = width(compact, m.exprs[0]!);
        out.set(row, { text, compact: other === values[0] ? undefined : `${trimNumber(other)}px` });
      } else out.set(row, { text });
    } else if (m.kind === "pct") {
      out.set(row, { text: `${m.exprs.map((expr) => trimNumber(width(base, expr))).join(" / ")}%` });
    } else if (m.kind === "raw") {
      const style = getComputedStyle(base);
      out.set(row, { text: m.exprs.map((expr) => style.getPropertyValue(expr.slice(4, -1)).trim()).join(" / ") });
    } else if (m.kind === "color" && canvas) {
      const colors = m.exprs.map((expr) => {
        base.style.backgroundColor = expr;
        return colorOf(getComputedStyle(base).backgroundColor, canvas);
      });
      base.style.backgroundColor = "";
      out.set(row, { text: colors.map((c) => (c.alpha < 100 ? `${c.hex} ${c.alpha}%` : c.hex)).join(" / "), colors });
    } else if (m.kind === "type") {
      base.style.fontSize = `var(--qy-text-${m.step}-size)`;
      base.style.lineHeight = `var(--qy-text-${m.step}-leading)`;
      const style = getComputedStyle(base);
      const size = px(style.fontSize);
      const leading = px(style.lineHeight);
      base.style.fontSize = base.style.lineHeight = "";
      out.set(row, { text: `${trimNumber(size)} / ${trimNumber(leading)}px`, size, leading });
    }
  }
  base.style.inlineSize = compact.style.inlineSize = "";
  return out;
}

/** 外观变化的标记：主题切换，或文档根上的明暗、品牌、密度标记被改写（项目可能不经 ThemeProvider 直接改）。 */
export function useAppearanceKey() {
  const { resolvedTheme } = useTheme();
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const observer = new MutationObserver(() => setTick((value) => value + 1));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme", "data-brand", "data-density"] });
    return () => observer.disconnect();
  }, []);
  return `${resolvedTheme}:${tick}`;
}

/** 当前外观下的实测值；外观变化后重测。返回 probe 宿主的 ref，需渲染 `<Probe />`。 */
export function useMeasured(rows: Row[]): [RefObject<HTMLDivElement | null>, Map<Row, Value>] {
  const appearance = useAppearanceKey();
  const host = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState(() => new Map<Row, Value>());
  useLayoutEffect(() => {
    if (host.current) setValues(measure(host.current, rows));
  }, [rows, appearance]);
  return [host, values];
}

export function Probe({ host }: { host: RefObject<HTMLDivElement | null> }) {
  return (
    <div aria-hidden="true" className="ledger-probe" ref={host}>
      <div />
      <div data-density="compact" />
    </div>
  );
}
