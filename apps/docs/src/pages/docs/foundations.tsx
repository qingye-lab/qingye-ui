import type { ReactNode } from "react";
import { A, H2, PageHeader } from "@/components/prose";
import { useDocsLocale } from "@/lib/docs-locale";
import { DensitySpecimen, StateSpecimen } from "./foundations-specimens";
import "./foundations.css";

/*
 * 基础判断页：什么时候用间距、什么时候用边界、强调与状态怎样判断。
 * 数值、关系与来源只在设计令牌页（法度台账）出现，这里链接过去，不重复列值（NG1）。
 * 出处取自 design.md 器用六法与表达九法的出处列；只有判断本身需要看见时才放标本。
 */

type Link = { href: string; zh: string; en: string };
type Judgment = { id: string; title: [string, string]; origin: [string, string]; text: [string, string]; links: Link[]; specimen?: (props: { en: boolean }) => ReactNode };

const ledger = (id: string, zh: string, en: string): Link => ({ href: `/docs/tokens#${id}`, zh: `台账：${zh}`, en: `Ledger: ${en}` });
const component = (slug: string, name: string): Link => ({ href: `/docs/components/${slug}`, zh: name, en: name });

const JUDGMENTS: Judgment[] = [
  {
    id: "grouping",
    title: ["分组", "Grouping"],
    origin: ["《老子》「当其无，有室之用」", "Laozi: “Where the room is empty lies its use”"],
    text: [
      "名称、控件和说明放在同一组；组与组之间空出一行正文，章节之间空出两行。去掉所有线与底色，分组仍应读得出来；读不出来时先调间距，不先加框。",
      "Keep a label, its control and its note in one group. Leave one line of body text between groups and two between sections. With every line and fill removed the groups should still read; if they do not, fix the spacing before adding a box.",
    ],
    links: [ledger("shumi", "疏密", "spacing"), component("layout", "Layout")],
  },
  {
    id: "boundaries",
    title: ["边界", "Boundaries"],
    origin: ["谢赫「骨法用笔」", "Xie He: “bone method in using the brush”"],
    text: [
      "有独立身份的对象才围合：一张比较表、一篇长文、一个浮层。一个范围只用一种边界：填充已划出范围就不再描边，底色与承载面相同时才由线承担；同一平面上不加阴影。相关的控件可以共用一条边界。",
      "Enclose only objects with their own identity: a comparison table, a long article, an overlay. One mechanism per region: a fill that marks the region needs no outline, a line carries the edge only when the fill matches the surface, and nothing on the same plane gets a shadow. Related controls can share one boundary.",
    ],
    links: [component("input-group", "InputGroup"), component("card", "Card")],
  },
  {
    id: "emphasis",
    title: ["强调", "Emphasis"],
    origin: ["《素问》君臣佐使", "Suwen: sovereign, minister, assistant, envoy"],
    text: [
      "一个视图只有一个君：先由位置与留白确立，再用尺寸与墨色加强。实心填充表示强调，不表示已授权或更安全；危险的后果写在按钮旁，按下之前就看得到。",
      "A view has one sovereign: establish it by position and space, then reinforce it with size and ink. A solid fill means emphasis, not permission or safety; a dangerous consequence is written beside the button and visible before it is pressed.",
    ],
    links: [component("button", "Button"), component("confirm-action", "ConfirmAction")],
  },
  {
    id: "density",
    title: ["密度", "Density"],
    origin: ["屋有大小，人无大小", "The house has grades; people do not"],
    text: [
      "紧凑密度把填值控件降一等、间距收一级；输入的值、正文、勾选标记与触摸目标不变。",
      "Compact density lowers value controls by one grade and tightens spacing by one step; input values, body text, check markers and touch targets stay the same.",
    ],
    specimen: DensitySpecimen,
    links: [ledger("deng", "等", "grades"), { href: "/docs/theming", zh: "主题三轴", en: "Theme axes" }],
  },
  {
    id: "type",
    title: ["文字与对齐", "Type and alignment"],
    origin: ["谢赫「经营位置」", "Xie He: “planning placement”"],
    text: [
      "用真实内容检查：长名称、中英混排、标点、真实数值与字体回退。比较的数字右对齐并用等宽数字；同一行的控件同高，文字落在同一条行中线上。长文字留出换行的余地，不把标签一律缩成小字。",
      "Check with real content: long names, mixed scripts, punctuation, real numbers and font fallback. Right-align compared numbers with tabular figures; controls on one row share a height and their text shares a center line. Leave room for long text to wrap instead of shrinking every label.",
    ],
    links: [ledger("wenzi", "文字", "type"), component("typography", "Typography")],
  },
  {
    id: "state",
    title: ["真实状态", "Truthful states"],
    origin: ["《论语·子路》「名不正，则言不顺」", "Analects: “If names are not correct, language will not accord”"],
    text: [
      "草稿与已应用、进行中与已确认、未知与空分别表达。动作与结果分属两个元素：按钮宽度不随状态变，结果写在按钮旁；结果未知时先核实，不当作失败。失败后保留恢复所需的已有工作。",
      "Express a draft and an applied condition, work in progress and a confirmed result, unknown and empty as different facts. Action and result are separate elements: the button keeps its width and the result is written beside it; an unknown result is checked before it is treated as failure. After a failure, keep the work needed to recover.",
    ],
    specimen: StateSpecimen,
    links: [component("filter-bar", "FilterBar"), component("button", "Button")],
  },
];

export default function FoundationsPage() {
  const en = useDocsLocale() === "en";
  const pick = ([zh, english]: [string, string]) => (en ? english : zh);
  return (
    <article className="fd">
      <PageHeader title={en ? "Foundations" : "基础判断"} />
      {JUDGMENTS.map(({ id, title, origin, text, links, specimen: Specimen }) => (
        <section className="fd-section" key={id}>
          <H2 id={id}>{pick(title)}</H2>
          <p className="fd-origin">{pick(origin)}</p>
          <p className="fd-text docs-p">{pick(text)}</p>
          {Specimen ? <Specimen en={en} /> : null}
          <p className="fd-links">
            {links.map((link) => <A href={link.href} key={link.href}>{en ? link.en : link.zh}</A>)}
          </p>
        </section>
      ))}
      <p className="fd-links fd-footer">
        <A href="/docs/tokens">{en ? "Design tokens" : "设计令牌"}</A>
        <A href="/docs/theming">{en ? "Theme axes" : "主题三轴"}</A>
        <A href="/docs/accessibility">{en ? "Accessibility" : "无障碍"}</A>
      </p>
    </article>
  );
}
