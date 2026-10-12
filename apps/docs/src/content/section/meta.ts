import type { ComponentMeta } from "@/lib/types";
export default {
  title: "区块 Section", titleEn: "Section", description: "不带边框的页面区块，由标题命名；标题与操作同一行。", descriptionEn: "A page block without a border, named by its title; the title and its actions share one row.",
  category: "布局", layer: "pattern", source: "local", exports: ["Section", "SectionHeader", "SectionTitle", "SectionActions"],
  decisions: "区块靠间距分组，自己不画线、不铺底、不加圆角；区块之间的距离由调用方用节间距排布，需要线时放 Separator。区块由标题命名：SectionTitle 把自己的 id 交给 Section 作 aria-labelledby，没有标题就不产生引用。计数不是独立部件，它是标题里的一段浓墨等宽数字。", decisionsEn: "A section groups by spacing and draws no line, fill or radius; the caller spaces sections with the section gap and places a Separator when a line is wanted. A section is named by its title: SectionTitle hands its id to Section as aria-labelledby, and without a title no reference is made. A count is not a part of its own; it is a run of muted tabular digits inside the title.",
  design: {
    methods: ["名实相符", "布白有用", "相成相制"],
    whenToUse: ["页面里一段内容需要名称，并可能在标题行右端放一个与它有关的操作。"],
    avoid: ["有独立边界、需要围合的内容用 Card；页面名称与页面级动作用 PageHeader。", "标题没有内容可命名时不要放区块。", "标题行右端只放一两个小号操作；成组的常驻操作用 Toolbar。"],
    composition: ["区块之间用 Stack gap=\"section\"；需要线时在两个 Section 之间放 Separator。", "右侧操作用 Link 或 Button variant=\"quiet\" size=\"sm\"。", "计数写成标题里的一段 numeric text-muted-foreground。"],
    stateOwner: {
      library: ["标题与区块的命名关联、标题行的行高与中线。"],
      application: ["标题内容、计数的含义、标题层级与操作的真实目标。"],
    },
    responsive: ["标题与操作同一行；标题长到放不下时操作落到下一行，第一行的中线不动。"],
    customization: ["className、style、render 与 ref 属于各自的部件；标题层级用 SectionTitle 的 level，不改字号。"],
  },
  designEn: {
    whenToUse: ["A stretch of page content needs a name, and perhaps one related action at the right end of the title row."],
    avoid: ["Use Card for content that needs its own boundary; use PageHeader for a page's name and page-level actions.", "Do not add a section whose title names nothing.", "Keep one or two small actions at the right end; use Toolbar for a persistent group of actions."],
    composition: ["Space sections with Stack gap=\"section\"; place a Separator between two Sections when a line is wanted.", "Use Link or Button variant=\"quiet\" size=\"sm\" for the right-hand action.", "Write a count as a numeric text-muted-foreground run inside the title."],
    stateOwner: {
      library: ["The naming link between title and section, and the row height and midline of the title row."],
      application: ["The title, what a count means, the heading level and the real target of the action."],
    },
    responsive: ["The title and actions share a row; when the title is too long the actions drop to the next row and the first row's midline stays."],
    customization: ["className, style, render and ref belong to each part; change the heading level with SectionTitle's level, never its size."],
  },
  keywords: ["section", "block", "heading", "区块", "分区", "段落标题", "标题栏", "节"],
  api: [
    { name: "Section", description: "默认 section；内部有 SectionTitle 时自动用它的 id 作 aria-labelledby。", descriptionEn: "A section by default; when it holds a SectionTitle, that title's id becomes aria-labelledby.", props: [{ name: "render / ref / children / native props", type: "useRender.ComponentProps<section>", description: "显式传入 aria-label 或 aria-labelledby 时不再自动关联。", descriptionEn: "An explicit aria-label or aria-labelledby disables the automatic link." }] },
    { name: "SectionHeader", description: "标题栏一行：标题在左，操作在右。", descriptionEn: "The title row: title at the left, actions at the right.", props: [{ name: "render / ref / children / native props", type: "useRender.ComponentProps<div>", description: "行高恒为一个小号控件高，与 ChartHeader 同一规则。", descriptionEn: "Row height is always one small control, the same rule as ChartHeader." }] },
    { name: "SectionTitle", description: "区块标题，复用 Heading。", descriptionEn: "The section title, built on Heading.", props: [{ name: "level", type: "1 | 2 | 3 | 4 | 5 | 6", default: "2", description: "文档大纲层级，独立于文字档。", descriptionEn: "Document outline level, independent of the text step." }, { name: "id / render / ref / Heading props", type: "HeadingProps", description: "传入 id 时区块用它作关联；文字档默认 heading（16/24）。", descriptionEn: "A given id is the one the section links to; the text step defaults to heading (16/24)." }] },
    { name: "SectionActions", description: "靠行尾的操作。", descriptionEn: "Actions at the end of the row.", props: [{ name: "render / ref / children / native props", type: "useRender.ComponentProps<div>", description: "放 Link 或 Button variant=\"quiet\" size=\"sm\"。", descriptionEn: "Hold a Link or a Button variant=\"quiet\" size=\"sm\"." }] },
  ],
  notes: ["区块之间的距离、分界线由调用方决定；区块自己不画线。"], notesEn: ["The caller decides the distance and any line between sections; a section draws none."],
} satisfies ComponentMeta;
