import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { IconArrowRight, IconCheck, IconCopy } from "@tabler/icons-react";
import { Button, buttonVariants } from "@qingye_lab/ui/components/button";
import { CodeBlock } from "@qingye_lab/ui/components/code-block";
import { CopyButton } from "@qingye_lab/ui/components/copy-button";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@qingye_lab/ui/components/tabs";
import { linkClassName } from "@qingye_lab/ui/components/link";
import { Link } from "@/components/locale-link";
import { parsePublicMarkdown, type PublicDocument, type PublicHeading } from "@/components/public-markdown";
import { useDocumentTitle } from "@/components/prose";
import { useDocsLocale } from "@/lib/docs-locale";
import { designEntryFor } from "@/lib/design-entry";
import { installTarget, repoFile, SITE } from "@/lib/site";
import philosophy from "@/public-content/philosophy.md?raw";
import philosophyEn from "@/public-content/philosophy.en.md?raw";
import "./home.css";

/*
 * 首页与文档同一套版式与同一种字体（库的系统黑体）：层级靠字号、字重与墨色，不靠第二种字体。
 * 结构用的是项目自己的方法：总纲一句，三章各展开其一（展开有据），每章一段正文加一个 1:1 的真实组件，
 * 末了才是开始使用。章里的文字取自设计理念正文，不另写。
 */
const MOTTO = [
  { zh: "器用为本，", en: "Purpose first.", source: { zh: <>「形而下者谓之器。」<cite>《易·系辞》</cite></>, en: <>“What is below form is called the vessel.” <cite>Book of Changes</cite></> } },
  { zh: "关系为法，", en: "Relations as method.", source: { zh: <>「有无相生，难易相成。」<cite>《老子》</cite></>, en: <>“Being and nonbeing produce each other.” <cite>Laozi</cite></> } },
  { zh: "合宜为度。", en: "Fitness as measure.", source: { zh: <>「巧于因借，精在体宜。」<cite>《园冶》</cite></>, en: <>“Skill in borrowing, precision in fitness.” <cite>Yuanye</cite></> } },
];

const SOURCE = { zh: parsePublicMarkdown(philosophy), en: parsePublicMarkdown(philosophyEn) };
const plain = (text: string) => text.replace(/\s*〔\d+〕/g, "");
/** The heading's own wording, without the Chinese method name that prefixes English titles. */
const wording = (text: string) => text.replace(/^\p{Script=Han}+\s+—\s+/u, "");
/** Paragraph `n` (from 0) under the first heading that satisfies `match`. */
function excerpt(doc: PublicDocument, match: (heading: PublicHeading) => boolean, n: number) {
  const start = doc.blocks.findIndex(block => block.type === "heading" && match(block));
  const heading = doc.blocks[start];
  const paragraphs: string[] = [];
  for (const block of doc.blocks.slice(start + 1)) { if (block.type === "heading") break; paragraphs.push(block.text); }
  return { title: heading?.type === "heading" ? wording(heading.text) : "", text: plain(paragraphs[n] ?? "") };
}
const CHAPTERS = {
  zh: [
    excerpt(SOURCE.zh, h => h.text === "从使用出发", 0),
    excerpt(SOURCE.zh, h => h.text === "从关系形成整体", 1),
    excerpt(SOURCE.zh, h => h.method === 7, 1),
  ],
  en: [
    excerpt(SOURCE.en, h => h.text === "Begin with use", 0),
    excerpt(SOURCE.en, h => h.text === "Build a whole through relationships", 1),
    excerpt(SOURCE.en, h => h.method === 7, 1),
  ],
};

const EMPTY = { title: "", text: "" };
const SIZES = ["xs", "sm", "md", "lg", "xl"] as const;
const STATES = ["idle", "waiting", "in-progress", "unknown", "failed"] as const;
const INKS = [
  { name: "焦", en: "Deep", token: "jiao", value: "88%", role: "正文与主行动", roleEn: "Content & primary actions" },
  { name: "浓", en: "Rich", token: "nong", value: "66%", role: "辅助文字", roleEn: "Supporting text" },
  { name: "重", en: "Medium", token: "zhong", value: "50%", role: "控件边界", roleEn: "Control boundaries" },
  { name: "淡", en: "Light", token: "dan", value: "24%", role: "轨道", roleEn: "Tracks" },
  { name: "清", en: "Pale", token: "qing", value: "8%", role: "分隔与悬停", roleEn: "Separators & hover" },
];
const INSTALL = `pnpm add ${installTarget}`;

function Chapter({ id, title, text, to, link, children }: { id: string; title: string; text: string; to: string; link: string; children: ReactNode }) {
  return <section aria-labelledby={id} className="home-chapter">
    <div className="home-chapter-copy">
      <h2 id={id}>{title}</h2>
      <p>{text}</p>
      <Link className="home-link focus-ring" to={to}>{link}<IconArrowRight aria-hidden="true" /></Link>
    </div>
    <div className="home-specimen">{children}</div>
  </section>;
}

/** Every state of one real Button. Its width never changes, so the outcomes fall on one line beside it. */
function StateSpecimen({ en }: { en: boolean }) {
  const name = en ? "Publish" : "发布";
  return <div aria-label={en ? "States of one button" : "同一个按钮的各个状态"} className="home-states" role="group">
    {STATES.map(state => <div className="home-state" key={state}><Button state={state}>{name}</Button></div>)}
  </div>;
}

/** The ink ladder: five tones from the library's own tokens, each with the role it carries. */
function InkSpecimen({ en }: { en: boolean }) {
  return <ol className="home-ink">
    {INKS.map(ink => <li key={ink.token} style={{ "--home-ink-step": `var(--qy-ink-${ink.token})` } as CSSProperties}>
      <div aria-hidden="true" className="home-ink-swatch" />
      <div className="home-ink-name"><span>{en ? ink.en : ink.name}</span><code>{ink.value}</code></div>
      <p>{en ? ink.roleEn : ink.role}</p>
    </li>)}
  </ol>;
}

/**
 * The five sizes of one real Button, side by side on the ink ladder's grid. Heights are read from the rendered
 * boxes, and the relation to the module is printed only when the reading actually holds.
 */
function ScaleSpecimen({ en }: { en: boolean }) {
  const [heights, setHeights] = useState<number[]>([]);
  const [cai, setCai] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => {
    const elements = buttons.current.filter((element): element is HTMLButtonElement => element !== null);
    const measure = () => {
      setHeights(elements.map(element => Math.round(element.getBoundingClientRect().height)));
      setCai(parseFloat(getComputedStyle(document.documentElement).fontSize) * 1.25);
    };
    measure();
    const observer = new ResizeObserver(measure);
    elements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  const label = en ? "Continue" : "继续";
  return <ol aria-label={en ? "Button sizes" : "按钮尺寸"} className="home-scale">
    {SIZES.map((size, index) => {
      const height = heights[index];
      const steps = height && cai ? (height - cai) / (cai / 5) : Number.NaN;
      return <li key={size}>
        <div className="home-scale-stage"><Button ref={element => { buttons.current[index] = element; }} size={size}>{label}</Button></div>
        <div className="home-ink-name"><span>{size.toUpperCase()}</span><code>{height ? `${height}px` : "—"}</code></div>
        <p>{Number.isInteger(steps) && steps > 0 ? (en ? `Module + ${steps} ${steps === 1 ? "unit" : "units"}` : `材 + ${steps} 分`) : ""}</p>
      </li>;
    })}
  </ol>;
}

export default function HomePage() {
  useDocumentTitle();
  const locale = useDocsLocale();
  const en = locale === "en";
  const t = (zh: string, english: string) => en ? english : zh;
  const [use = EMPTY, relations = EMPTY, module = EMPTY] = CHAPTERS[locale];
  return <main className="home site-frame" id="main" tabIndex={-1}>
    <section aria-labelledby="home-title" className="home-hero">
      <div className="home-hero-copy">
        <h1 id="home-title">{MOTTO.map(line => <span key={line.zh}>{en ? line.en : line.zh}</span>)}</h1>
        <p className="home-lede">{t("Qingye UI（青野）是基于 Base UI 与 Tailwind CSS 4 的 React 组件库，附带一份可执行的设计指南 design.md。", "Qingye UI is a React component library on Base UI and Tailwind CSS 4, with an executable design guide, design.md.")}</p>
        <div className="home-actions">
          <Link className={buttonVariants({ size: "lg" })} to="/docs/installation">{t("开始使用", "Get started")}</Link>
          <Link className={buttonVariants({ size: "lg", variant: "quiet" })} to="/docs/components">{t("浏览组件", "Browse components")}</Link>
        </div>
      </div>
      <ul className="home-sources">{MOTTO.map(line => <li key={line.zh}>{en ? line.source.en : line.source.zh}</li>)}</ul>
    </section>

    <Chapter id="home-use" link={t("名实相符", "Names match what is real")} text={use.text} title={use.title} to="/docs/design-philosophy#method-1"><StateSpecimen en={en} /></Chapter>
    <Chapter id="home-relations" link={t("墨分五色", "Ink in five tones")} text={relations.text} title={relations.title} to="/docs/design-philosophy#method-9"><InkSpecimen en={en} /></Chapter>
    <Chapter id="home-module" link={t("设计令牌", "Design tokens")} text={module.text} title={module.title} to="/docs/tokens"><ScaleSpecimen en={en} /></Chapter>

    <section aria-labelledby="home-start" className="home-chapter">
      <div className="home-chapter-copy">
        <h2 id="home-start">{t("开始使用", "Get started")}</h2>
        <p>{SITE.npmPublished ? t("需要 React 19.2 及以上。", "Requires React 19.2 or later.") : t("需要 React 19.2 及以上。通过 GitHub Release 分发，尚未发布到 npm。", "Requires React 19.2 or later. Distributed through GitHub Releases; not yet on npm.")}</p>
        <Link className="home-link focus-ring" to="/docs/installation">{t("安装说明", "Installation")}<IconArrowRight aria-hidden="true" /></Link>
      </div>
      <div className="home-specimen">
        <Tabs className="home-install" defaultValue="install">
          <TabsList aria-label={t("接入方式", "Ways to get started")}>
            <TabsTab value="install">{t("安装组件", "Install components")}</TabsTab>
            <TabsTab value="ai">{t("交给 AI", "Use with AI")}</TabsTab>
          </TabsList>
          <TabsPanel value="install"><CodeBlock code={INSTALL} /></TabsPanel>
          <TabsPanel className="home-ai" value="ai">
            <p>{t("design.md 含设计方法、组件边界与项目接入约定。把任务提示交给 AI，它会按同一套方法判断。", "design.md holds the design methods, component boundaries and project conventions. Give the task prompt to your AI tool and it judges by the same methods.")}</p>
            <div className="home-ai-actions">
              <CopyButton aria-label={t("复制 AI 任务提示", "Copy AI task prompt")} className="home-ai-copy" value={designEntryFor(locale).task} variant="solid"><span className="home-ai-copy-ready"><IconCopy aria-hidden="true" />{t("复制任务提示", "Copy task prompt")}</span><span className="home-ai-copy-done"><IconCheck aria-hidden="true" />{t("已复制", "Copied")}</span></CopyButton>
              <a className={linkClassName} download href={en ? "/design.en.md" : "/design.md"}>{t("下载指南", "Download guide")}</a>
              <Link className={linkClassName} to="/docs/ai">{t("接入说明", "AI setup")}</Link>
            </div>
          </TabsPanel>
        </Tabs>
      </div>
    </section>

    <footer className="home-footer">
      <span>Qingye UI <span className="home-footer-version">{SITE.version}</span></span>
      <nav aria-label={t("项目链接", "Project links")}><a className={linkClassName} href={SITE.repo}>GitHub</a><a className={linkClassName} href={repoFile("LICENSE")}>MIT</a></nav>
    </footer>
  </main>;
}
