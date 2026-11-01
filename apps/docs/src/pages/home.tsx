import { buttonVariants } from "@qingye_lab/ui/components/button";
import { CodeBlock } from "@qingye_lab/ui/components/code-block";
import { linkClassName } from "@qingye_lab/ui/components/link";
import { Heading, Text } from "@qingye_lab/ui/components/typography";
import { Link } from "@/components/locale-link";
import { useDocumentTitle } from "@/components/prose";
import { SiteFooter } from "@/components/site-footer";
import { useDocsLocale } from "@/lib/docs-locale";
import { guidePrinciples } from "@/lib/home-methods";
import { installTarget } from "@/lib/site";
import { HomeWindow } from "./home-window";
import "./home.css";

/*
 * 首页（2026-10-30 第三稿「墨阶」）。画面只靠三样东西：尺度的反差、墨的浓淡、地的翻转；不加任何装饰。
 *   一  海报：总纲三句上下排，细字重、海报尺度，三行依次取焦、浓、重三级墨——次序就是「本、法、度」的先后（墨分五色）。
 *       说明与动作是一小块，落在右下、与末行同一条下缘：大块在左上，小块在右下，对角相应（经营位置）。
 *   二  示例：正在运行的示例应用（不是截图），所在一整段铺一层清染，与站点同一种明暗。
 *   三  总纲：三条，名在左、释义在右，逐字取自 design.md 总纲表。
 *   四  开始：一行大号的安装命令。
 * 十五法的表不在首页：它们是文档，在理念页。
 */
const MOTTO = [
  { zh: "器用为本，", en: "Purpose first." },
  { zh: "关系为法，", en: "Relations as method." },
  { zh: "合宜为度。", en: "Fitness as measure." },
];

export default function HomePage() {
  useDocumentTitle();
  const locale = useDocsLocale();
  const en = locale === "en";
  const t = (zh: string, english: string) => (en ? english : zh);
  const principles = guidePrinciples(locale);

  return <>
    <main className="home" id="main" tabIndex={-1}>
      <section aria-labelledby="home-title" className="home-hero site-frame">
        <Heading className="home-motto" id="home-title" level={1} step="display-xl">
          {MOTTO.map((line) => <span key={line.zh}>{en ? line.en : line.zh}</span>)}
        </Heading>
        <div className="home-intro">
          <Text step="reading">{t("基于 Base UI 与 Tailwind CSS 4 的 React 组件库。", "A React component library built on Base UI and Tailwind CSS 4.")}</Text>
          <Text className="home-intro-lede" step="reading">{t("Qingye UI 从中国传统的经典与东方美学中取法。", "Qingye UI takes its methods from Chinese classics and Eastern aesthetics.")}</Text>
          <div className="home-actions">
            <Link className={buttonVariants({ size: "lg" })} to="/docs/installation">{t("开始使用", "Get started")}</Link>
            <Link className={buttonVariants({ size: "lg", variant: "quiet" })} to="/docs/design-philosophy">{t("阅读设计理念", "Read the design philosophy")}</Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="home-examples" className="home-field">
        <div className="site-frame">
          <div className="home-field-head">
            <Heading id="home-examples" step="display-lg">{t("只用这套组件搭成", "Built only from these components")}</Heading>
            <Text className="text-muted-foreground" step="reading">{t("这是正在运行的应用，不是截图：每个控件都可以操作，明暗跟随本站，密度与品牌可以在窗口上试。", "This is the running app, not a screenshot: every control works, it follows the site's light or dark mode, and you can try density and brand on the window.")}</Text>
          </div>
          <HomeWindow />
        </div>
      </section>

      <section aria-labelledby="home-principles" className="home-principles site-frame">
        <Heading className="home-principles-title" id="home-principles" step="display-lg">{t("总纲", "Principles")}</Heading>
        <dl className="home-principle-list">
          {principles.map((principle) => (
            <div className="home-principle" key={principle.name}>
              <dt>{principle.name}{principle.aside ? <span className="home-aside" lang="zh-CN">{principle.aside}</span> : null}</dt>
              <dd>
                <p className="home-principle-text">{principle.meaning}{/[。.]$/.test(principle.meaning) ? "" : en ? "." : "。"}</p>
                <p className="home-principle-source">{principle.source}</p>
              </dd>
            </div>
          ))}
        </dl>
        <Link className={`${linkClassName} home-more`} to="/docs/design-philosophy">{t("十五法与全文", "The fifteen methods and full text")}</Link>
      </section>

      <section aria-labelledby="home-start" className="home-start site-frame">
        <Heading id="home-start" step="display-lg">{t("开始使用", "Get started")}</Heading>
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
