import { buttonVariants } from "@qingye_lab/ui/components/button";
import { CodeBlock } from "@qingye_lab/ui/components/code-block";
import { linkClassName } from "@qingye_lab/ui/components/link";
import { Table, TableBody, TableCaption, TableCell, TableContainer, TableHead, TableHeader, TableRow } from "@qingye_lab/ui/components/table";
import { Heading, Text } from "@qingye_lab/ui/components/typography";
import { Link } from "@/components/locale-link";
import { useDocumentTitle } from "@/components/prose";
import { SiteFooter } from "@/components/site-footer";
import { useDocsLocale } from "@/lib/docs-locale";
import { guideMethods, guidePrinciples, type GuideMethod } from "@/lib/home-methods";
import { installTarget } from "@/lib/site";
import { HomeWindow } from "./home-window";
import "./home.css";

/*
 * 首页（2026-10-30 第二稿）。一页只讲一件事的四个层次，每段的形式随内容换，不重复同一个骨架：
 *   一  总纲一行与定位、开始的动作——全页唯一的大字（经营位置：君先由位置与留白确立）
 *   二  产品窗口：示例应用本身，窗口顶栏换示例、改三轴——全页唯一有面的东西
 *   三  总纲释义：三段宣言式正文，出处是页边注（疏）
 *   四  十五法：design.md 原本就是两张表，这里仍是两张表（密）
 *   五  开始使用：一行
 * 文字全部逐字取自 design.md（总纲表、两张方法表、开篇第一句），不另写摘要或口号。
 */
const MOTTO = [
  { zh: "器用为本，", en: "Purpose first." },
  { zh: "关系为法，", en: "Relations as method." },
  { zh: "合宜为度。", en: "Fitness as measure." },
];

function MethodTable({ caption, role, methods, en }: { caption: string; role: string; methods: GuideMethod[]; en: boolean }) {
  return (
    <TableContainer className="home-table" framed={false}>
      <Table>
        <TableCaption className="home-table-caption"><span className="home-table-title">{caption}</span><span className="home-table-role">{role}</span></TableCaption>
        <colgroup><col className="home-col-name" /><col /><col className="home-col-source" /></colgroup>
        <TableHeader>
          <TableRow>
            <TableHead>{en ? "Method" : "方法"}</TableHead>
            <TableHead>{en ? "Design decision" : "设计决定"}</TableHead>
            <TableHead>{en ? "Source" : "出处"}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {methods.map((method) => (
            <TableRow key={method.n}>
              <TableHead scope="row">
                <Link className="home-method-name" to={`/docs/design-philosophy#method-${method.n}`}>{method.name}</Link>
                {method.aside ? <span className="home-aside" lang="zh-CN">{method.aside}</span> : null}
              </TableHead>
              <TableCell className="home-method-decision">{method.decision}</TableCell>
              <TableCell className="home-method-source">{method.source}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function HomePage() {
  useDocumentTitle();
  const locale = useDocsLocale();
  const en = locale === "en";
  const t = (zh: string, english: string) => (en ? english : zh);
  const [use, expression] = guideMethods(locale);
  const principles = guidePrinciples(locale);

  return <>
    <main className="home site-frame" id="main" tabIndex={-1}>
      <section aria-labelledby="home-title" className="home-hero">
        <Heading className="home-motto" id="home-title" level={1} step="display-xl">{MOTTO.map((line) => <span key={line.zh}>{en ? line.en : line.zh}</span>)}</Heading>
        <div className="home-intro">
          {/* 五秒内认出这是什么：先说是什么（React 组件库），再说取法；两句都是正文，焦墨。 */}
          <div>
            <Text step="reading">{t("基于 Base UI 与 Tailwind CSS 4 的 React 组件库。", "A React component library built on Base UI and Tailwind CSS 4.")}</Text>
            <Text className="home-intro-lede" step="reading">{t("Qingye UI 从中国传统的经典与东方美学中取法。", "Qingye UI takes its methods from Chinese classics and Eastern aesthetics.")}</Text>
          </div>
          <div className="home-actions">
            <Link className={buttonVariants({ size: "lg" })} to="/docs/installation">{t("开始使用", "Get started")}</Link>
            <Link className={buttonVariants({ size: "lg", variant: "quiet" })} to="/docs/design-philosophy">{t("阅读设计理念", "Read the design philosophy")}</Link>
          </div>
        </div>
      </section>

      <HomeWindow />

      <section aria-labelledby="home-principles" className="home-principles">
        <h2 className="sr-only" id="home-principles">{t("总纲", "Principles")}</h2>
        {/* 出处就在本段旁边，不再用上标编号连接（位置已经说明了对应关系）。 */}
        {principles.map((principle) => (
          <div className="home-principle" key={principle.name}>
            <p className="home-principle-text">
              <strong>{principle.name}</strong>
              {principle.aside ? <span className="home-aside" lang="zh-CN">{principle.aside}</span> : null}
              <span className="home-principle-gap" aria-hidden="true"> </span>
              {principle.meaning}
              {/[。.]$/.test(principle.meaning) ? "" : en ? "." : "。"}
            </p>
            <p className="home-principle-note">{principle.source}</p>
          </div>
        ))}
      </section>

      <section aria-labelledby="home-methods" className="home-methods">
        <div className="home-methods-head">
          <Heading id="home-methods" step="title">{t("十五法", "Fifteen methods")}</Heading>
          <Link className={`${linkClassName} text-body`} to="/docs/design-philosophy">{t("全文与出处说明", "Full text and notes")}</Link>
        </div>
        <MethodTable caption={t("器用六法", "Six methods of use")} en={en} methods={use} role={t("语义、关系与任务", "Semantics, relationships, and tasks")} />
        <MethodTable caption={t("表达九法", "Nine methods of expression")} en={en} methods={expression} role={t("尺度、墨色、线、形、位置、表面与动", "Measure, ink, line, shape, placement, surface, and motion")} />
      </section>

      <section aria-labelledby="home-start" className="home-start">
        <Heading id="home-start" step="title">{t("开始使用", "Get started")}</Heading>
        <CodeBlock className="home-install" code={`pnpm add ${installTarget}`} />
        <nav aria-label={t("接入资料", "Setup resources")} className="home-start-links">
          <Link className={linkClassName} to="/docs/installation">{t("安装", "Installation")}</Link>
          <Link className={linkClassName} to="/docs/ai">{t("AI 使用", "Using AI")}</Link>
          <Link className={linkClassName} to="/docs/components">{t("组件", "Components")}</Link>
          <a className={linkClassName} download href={en ? "/design.en.md" : "/design.md"}>design.md</a>
        </nav>
      </section>
    </main>
    <SiteFooter />
  </>;
}
