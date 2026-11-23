import { buttonVariants } from "@qingye_lab/ui/components/button";
import { CopyButton } from "@qingye_lab/ui/components/copy-button";
import { linkClassName } from "@qingye_lab/ui/components/link";
import { Heading, Text } from "@qingye_lab/ui/components/typography";
import { Link } from "@/components/locale-link";
import { useDocumentTitle } from "@/components/prose";
import { SiteFooter } from "@/components/site-footer";
import { useDocsLocale } from "@/lib/docs-locale";
import { guidePrinciples } from "@/lib/home-methods";
import { components } from "@/lib/registry";
import { installTarget } from "@/lib/site";
import { HomeCraft } from "./home-craft";
import { HomeWindow } from "./home-window";
import "./home.css";

/*
 * 首页（2026-11-23 第四稿「器物与法度」）。
 * 现代、简约、克制，不靠装饰渐变与阴影，靠建筑式网格比例、紧实字阶与真实可交互组件成立：
 *   一  首屏：紧实焦墨总纲 + 一句定位 + 同高 40px 动作与安装带（全页仅此一处安装命令），
 *       下方直接衔接实时运行舞台（HomeWindow），首屏内即见真实应用与密度/品牌切换。
 *   二  细节与法度（HomeCraft）：1px 清墨线划分的非对称三格画幅，近景呈现焦点手感、五级墨阶与五等材分阶梯。
 *   三  总纲：一道细线之下三栏并排，逐字取自 design.md 总纲表。
 *   四  收口：零重复，单行直达安装、组件、AI 接入与 design.md。
 */
export default function HomePage() {
  useDocumentTitle();
  const locale = useDocsLocale();
  const en = locale === "en";
  const t = (zh: string, english: string) => (en ? english : zh);
  const principles = guidePrinciples(locale);
  const installCmd = `pnpm add ${installTarget}`;

  return <>
    <main className="home" id="main" tabIndex={-1}>
      <section aria-labelledby="home-title" className="home-hero site-frame">
        <div className="home-hero-copy">
          <Heading className="home-title" id="home-title" level={1} step="display-xl">
            {t("器用为本，关系为法，合宜为度", "Purpose first. Relations as method. Fitness as measure.")}
          </Heading>
          <Text className="home-subtitle text-muted-foreground" step="reading">
            {t("基于 Base UI 与 Tailwind CSS 4 的 React 组件库。", "A React component library built on Base UI and Tailwind CSS 4.")}
          </Text>
        </div>

        <div className="home-action-bar">
          <div className="home-actions">
            <Link className={buttonVariants({ size: "lg" })} to="/docs/components">
              {t(`浏览组件（${components.length}）`, `Browse ${components.length} components`)}
            </Link>
            <Link className={buttonVariants({ size: "lg", variant: "bordered" })} to="/docs/installation">
              {t("开始使用", "Get started")}
            </Link>
          </div>
          <div className="home-install-pill" data-ui>
            <code className="home-install-code">{installCmd}</code>
            <CopyButton aria-label={t("复制安装命令", "Copy install command")} shape="icon" size="sm" value={installCmd} variant="quiet" />
          </div>
        </div>
      </section>

      <section aria-label={t("实时示例应用", "Live example applications")} className="home-stage site-frame">
        <HomeWindow />
      </section>

      <HomeCraft />

      <section aria-labelledby="home-principles" className="home-principles site-frame">
        <div className="home-section-head home-section-head-split">
          <Heading id="home-principles" step="display">{t("总纲", "Principles")}</Heading>
          <Link className={linkClassName} to="/docs/design-philosophy">
            {t("设计理念与十五法", "Design philosophy & fifteen methods")}
          </Link>
        </div>
        <dl className="home-principle-grid">
          {principles.map((principle) => (
            <div className="home-principle-col" key={principle.name}>
              <dt>
                <span className="home-principle-name">{principle.name}</span>
                {principle.aside ? <span className="home-aside" lang="zh-CN">{principle.aside}</span> : null}
              </dt>
              <dd>
                <p className="home-principle-text">{principle.meaning}{/[。.]$/.test(principle.meaning) ? "" : en ? "." : "。"}</p>
                <p className="home-principle-source">{principle.source}</p>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="home-closing site-frame">
        <div className="home-closing-bar">
          <nav aria-label={t("接入资料", "Setup resources")} className="home-closing-links">
            <Link className={linkClassName} to="/docs/installation">{t("安装指南", "Installation")}</Link>
            <Link className={linkClassName} to="/docs/components">{t("组件目录", "Components")}</Link>
            <Link className={linkClassName} to="/docs/ai">{t("AI 接入", "Using AI")}</Link>
            <a className={linkClassName} download href={en ? "/design.en.md" : "/design.md"}>design.md</a>
          </nav>
        </div>
      </section>
    </main>
    <SiteFooter />
  </>;
}
