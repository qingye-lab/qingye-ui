import { buttonVariants } from "@qingye_lab/ui/components/button";
import { CodeBlock } from "@qingye_lab/ui/components/code-block";
import { linkClassName } from "@qingye_lab/ui/components/link";
import { Heading, Text } from "@qingye_lab/ui/components/typography";
import { Link } from "@/components/locale-link";
import { useDocumentTitle } from "@/components/prose";
import { SiteFooter } from "@/components/site-footer";
import { useDocsLocale } from "@/lib/docs-locale";
import { guideMethods, type GuideMethod } from "@/lib/home-methods";
import { installTarget } from "@/lib/site";
import { HomeFinder } from "./home-finder";
import "./home.css";

/*
 * 首页（2026-10-30 重做）。全页一张两栏网格：起始栏 24 材放总纲、章题与章题下的一句角色，
 * 其余放这一章的内容；所有章的内容都从同一条竖线开始（经营位置：对齐线少而可数）。
 *   一  总纲与定位 + 工作台（用本库组件搭成的组件查找，以主题三轴预览）
 *   二  器用六法、表达九法：方法名、设计决定与出处，逐字取自 design.md 两张方法表
 *   三  墨分五色：页面正在使用的五级墨与一方印，色块读的就是库的 token
 *   四  开始使用：安装、AI 使用与示例三个去处
 */
type Copy = { zh: string; en: string };

const MOTTO: Copy[] = [
  { zh: "器用为本，", en: "Purpose first." },
  { zh: "关系为法，", en: "Relations as method." },
  { zh: "合宜为度。", en: "Fitness as measure." },
];

/* 五级墨：百分比与角色取自 tokens/semantic.css 的墨阶注释；色块读同名 token，换明暗时随之重算。 */
const INKS = [
  { name: "焦", en: "Jiao", token: "--qy-ink-jiao", value: 88, role: { zh: "正文与标题、实心填充、焦点线", en: "Body text and headings, solid fills, focus lines" } },
  { name: "浓", en: "Nong", token: "--qy-ink-nong", value: 66, role: { zh: "辅助文字", en: "Secondary text" } },
  { name: "重", en: "Zhong", token: "--qy-ink-zhong", value: 50, role: { zh: "必要的控件边界", en: "Required control boundaries" } },
  { name: "淡", en: "Dan", token: "--qy-ink-dan", value: 24, role: { zh: "读数的凹槽：进度、计量、滑块轨道", en: "Readout grooves: progress, meters, slider tracks" } },
  { name: "清", en: "Qing", token: "--qy-ink-qing", value: 8, role: { zh: "容器线；彩色的柔底", en: "Container lines; soft tints" } },
];

function Methods({ id, title, role, methods }: { id: string; title: string; role: string; methods: GuideMethod[] }) {
  return (
    <section aria-labelledby={id} className="home-chapter">
      <div className="home-chapter-head">
        <Heading id={id} step="display">{title}</Heading>
        <Text className="text-muted-foreground" step="reading">{role}</Text>
      </div>
      <ul className="home-methods">
        {methods.map((method) => (
          <li key={method.n}>
            <Heading level={3} step="title">
              <Link className="home-method-name" to={`/docs/design-philosophy#method-${method.n}`}>{method.name}</Link>
            </Heading>
            {method.aside ? <Text className="text-muted-foreground" lang="zh-CN" step="support">{method.aside}</Text> : null}
            <Text className="home-method-decision" step="body">{method.decision}</Text>
            <Text className="home-method-source text-muted-foreground" step="support">{method.source}</Text>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function HomePage() {
  useDocumentTitle();
  const locale = useDocsLocale();
  const en = locale === "en";
  const t = (zh: string, english: string) => (en ? english : zh);
  const pick = (copy: Copy) => (en ? copy.en : copy.zh);
  const [use, expression] = guideMethods(locale);

  return <>
    <main className="home site-frame" id="main" tabIndex={-1}>
      <section aria-labelledby="home-title" className="home-hero">
        <div className="home-hero-text">
          <Heading className="home-motto" id="home-title" level={1} step="display-xl">{MOTTO.map((line) => <span key={line.zh}>{pick(line)}</span>)}</Heading>
          <Text className="home-intro-lede" step="reading">{t("Qingye UI 从中国传统的经典与东方美学中取法。", "Qingye UI takes its methods from Chinese classics and Eastern aesthetics.")}</Text>
          <Text className="text-muted-foreground" step="reading">{t("基于 Base UI 与 Tailwind CSS 4 的 React 组件库，附一份人和 AI 共用的设计指南。", "A React component library on Base UI and Tailwind CSS 4, with one design guide for people and AI.")}</Text>
          <div className="home-actions">
            <Link className={buttonVariants({ size: "lg" })} to="/docs/installation">{t("开始使用", "Get started")}</Link>
            <Link className={buttonVariants({ size: "lg", variant: "bordered" })} to="/docs/design-philosophy">{t("阅读设计理念", "Read the design philosophy")}</Link>
          </div>
          <CodeBlock className="home-install" code={`pnpm add ${installTarget}`} />
        </div>
        <HomeFinder />
      </section>

      <Methods id="home-use" methods={use} role={t("处理语义、关系与任务。", "Semantics, relationships, and tasks.")} title={t("器用六法", "Six methods of use")} />
      <Methods id="home-expression" methods={expression} role={t("处理尺度、墨色、线、形、位置、表面与动。", "Measure, ink, line, shape, placement, surface, and motion.")} title={t("表达九法", "Nine methods of expression")} />

      <section aria-labelledby="home-ink" className="home-chapter">
        <div className="home-chapter-head">
          <Heading id="home-ink" step="display">{t("墨分五色", "Five tones of ink")}</Heading>
          <Text className="text-muted-foreground" step="reading">{t("文字、线与承载面都从这五级墨取色；彩色只表达状态、数据系列与品牌。", "Text, lines and surfaces all take their tone from these five inks; hue marks only status, data series and brand.")}</Text>
          <Link className={`${linkClassName} text-reading`} to="/docs/tokens">{t("设计令牌", "Design tokens")}</Link>
        </div>
        <ul className="home-inks">
          {INKS.map((ink) => (
            <li key={ink.token}>
              <span aria-hidden="true" className="home-ink-chip" style={{ background: `color-mix(in srgb, var(--qy-ink) var(${ink.token}), var(--qy-paper))` }} />
              <span className="home-ink-name"><span lang="zh-CN">{ink.name}</span>{en ? <span className="text-muted-foreground"> {ink.en}</span> : null}</span>
              <span className="home-ink-value numeric text-muted-foreground">{ink.value}%</span>
              <Text step="support">{pick(ink.role)}</Text>
            </li>
          ))}
          <li>
            <span aria-hidden="true" className="home-ink-chip home-ink-seal" />
            <span className="home-ink-name"><span lang="zh-CN">印</span>{en ? <span className="text-muted-foreground"> Seal</span> : null}</span>
            <span className="home-ink-value text-muted-foreground">{t("品牌", "Brand")}</span>
            <Text step="support">{t("品牌强调色如一方印，少而明确", "A brand accent works like a seal: rare and unmistakable")}</Text>
          </li>
        </ul>
      </section>

      <section aria-labelledby="home-start" className="home-chapter">
        <div className="home-chapter-head">
          <Heading id="home-start" step="display">{t("开始使用", "Get started")}</Heading>
        </div>
        <nav aria-label={t("接入资料", "Setup resources")} className="home-paths">
          <Link className="home-path" to="/docs/installation">
            <span className="home-path-title">{t("安装", "Installation")}</span>
            <span className="home-path-text">{t("包、样式入口、主题与第一个组件。", "The package, stylesheet entry, theme, and a first component.")}</span>
          </Link>
          <Link className="home-path" to="/docs/ai">
            <span className="home-path-title">{t("AI 使用", "Using AI")}</span>
            <span className="home-path-text">{t("把 design.md 与当前 API 留在项目里，交给 AI 执行。", "Keep design.md and the current API in the project for AI to follow.")}</span>
          </Link>
          <Link className="home-path" to="/examples">
            <span className="home-path-title">{t("示例", "Examples")}</span>
            <span className="home-path-text">{t("只用本库组件搭成的完整应用。", "Complete applications built only from these components.")}</span>
          </Link>
        </nav>
        <a className={`${linkClassName} home-download text-reading`} download href={en ? "/design.en.md" : "/design.md"}>{t("下载 design.md", "Download design.md")}</a>
      </section>
    </main>
    <SiteFooter />
  </>;
}
