import { buttonVariants } from "@qingye/ui/components/button";
import { Card } from "@qingye/ui/components/card";
import { Inline } from "@qingye/ui/components/layout";
import { Heading } from "@qingye/ui/components/typography";
import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@/components/locale-link";
import { ComponentThumbnail, hasComponentThumbnail } from "@/components/component-thumbnails";
import { useDocumentTitle } from "@/components/prose";
import { componentLabel, componentPath } from "@/lib/nav";
import { useDocsLocale } from "@/lib/docs-locale";
import { localizedMeta } from "@/lib/localized-meta";
import { components, loadPreview, type ComponentEntry } from "@/lib/registry";
import { SITE } from "@/lib/site";
import "./home.css";

const previews = new Map<string, ReturnType<typeof lazy>>();
function previewFor(slug: string) {
  let preview = previews.get(slug);
  if (!preview) {
    preview = lazy(() => loadPreview(slug));
    previews.set(slug, preview);
  }
  return preview;
}

class PreviewBoundary extends Component<{ children: ReactNode; label: string }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <span className="text-body text-muted-foreground">{this.props.label}</span> : this.props.children; }
}

function Preview({ slug }: { slug: string }) {
  const en = useDocsLocale() === "en";
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const target = host.current;
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { rootMargin: "200px" });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);
  const curated = hasComponentThumbnail(slug);
  const Demo = visible && !curated ? previewFor(slug) : null;
  return <div className="home-preview" ref={host} inert aria-hidden="true">
    {visible ? <PreviewBoundary label={en ? "Open example" : "打开示例"}><Suspense fallback={<span aria-busy="true" />}>
      <div className={`home-preview-content${curated ? "" : " home-preview-demo"}`}>
        {curated ? <ComponentThumbnail slug={slug} /> : Demo ? <Demo /> : null}
      </div>
    </Suspense></PreviewBoundary> : null}
  </div>;
}

function ComponentCard({ entry }: { entry: ComponentEntry }) {
  const locale = useDocsLocale();
  entry = localizedMeta(entry, locale);
  const { title, hint } = componentLabel(entry, locale);
  return <Card render={<section />} className="home-component" data-component={entry.slug}>
    <header className="flex items-center gap-(--qy-panel-gap) p-(--qy-panel-padding) home-component-heading">
      <Heading level={2} step="heading">
        <Link className="home-component-link focus-ring" to={componentPath(entry.slug, locale)}>
          <span>{title}</span>{hint && <span className="home-component-hint">{hint}</span>}
        </Link>
      </Heading>
    </header>
    <div className="home-component-surface"><Preview slug={entry.slug} /></div>
  </Card>;
}

export default function HomePage() {
  useDocumentTitle(); const locale = useDocsLocale(); const text = locale === "en" ? { intro: <>React components<br />built on Base UI.</>, start: "Get started", examples: "Examples", ai: "Using AI", components: "Components", footer: "Footer navigation", design: "Design methods" } : { intro: <>基于 Base UI 的<br />React 组件库。</>, start: "开始使用", examples: "查看示例", ai: "AI 使用", components: "组件", footer: "页脚导航", design: "设计方法" };
  return <>
    <main className="home-page outline-none" id="main" tabIndex={-1}>
      <section className="home-intro" aria-labelledby="home-title">
        <Heading level={1} step="chapter" id="home-title" className="home-title" tabIndex={-1}>{text.intro}</Heading>
        <p className="home-lede">React · Tailwind CSS 4 · MIT</p>
        <Inline className="home-actions" gap="actions">
          <Link className={buttonVariants()} to="/docs/installation">{text.start}</Link>
          <Link className={buttonVariants({ variant: "quiet" })} to="/examples">{text.examples}</Link>
          <Link to="/docs/ai" className="home-ai-link focus-ring rounded-item underline">{text.ai}</Link>
        </Inline>
      </section>
      <section className="home-gallery" aria-label={text.components}>
        {components.map((entry) => <ComponentCard key={entry.slug} entry={entry} />)}
      </section>
    </main>
    <footer className="home-footer">
      <span>Qingye UI · 青野</span>
      <nav aria-label={text.footer}>
        <Link className="focus-ring rounded-item underline" to="/docs/design-philosophy">{text.design}</Link>
        <a className="focus-ring rounded-item underline" href={locale === "en" ? "/design.en.md" : "/design.md"} download="qingye-design.md">design.md</a>
        <a className="focus-ring rounded-item underline" href={SITE.repo}>GitHub</a>
        <Link className="focus-ring rounded-item underline" to="/docs">MIT</Link>
      </nav>
    </footer>
  </>;
}
