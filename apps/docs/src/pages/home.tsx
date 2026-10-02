import { buttonVariants } from "@qingye/ui/components/button";
import { Card, CardFrame, CardFrameHeader, CardFrameTitle } from "@qingye/ui/components/card";
import { Inline } from "@qingye/ui/components/layout";
import { Skeleton } from "@qingye/ui/components/skeleton";
import { Heading, TextLink } from "@qingye/ui/components/typography";
import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ComponentThumbnail, hasComponentThumbnail } from "@/components/component-thumbnails";
import { useDocumentTitle } from "@/components/prose";
import { splitTitle } from "@/lib/nav";
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

class PreviewBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <span className="text-sm text-muted-foreground">打开示例</span> : this.props.children; }
}

function Preview({ slug }: { slug: string }) {
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
    {visible ? <PreviewBoundary><Suspense fallback={<Skeleton className="h-10 w-32" />}>
      <div className={`home-preview-content${curated ? "" : " home-preview-demo"}`}>
        {curated ? <ComponentThumbnail slug={slug} /> : Demo ? <Demo /> : null}
      </div>
    </Suspense></PreviewBoundary> : null}
  </div>;
}

function ComponentCard({ entry }: { entry: ComponentEntry }) {
  const { zh, en } = splitTitle(entry.title);
  return <CardFrame className="home-component" data-component={entry.slug}>
    <CardFrameHeader className="home-component-heading">
      <CardFrameTitle render={<h2 />}>
        <Link className="home-component-link focus-ring" to={`/docs/components/${entry.slug}`}>
          {en || zh}{en && <span className="home-component-zh">{zh}</span>}
        </Link>
      </CardFrameTitle>
    </CardFrameHeader>
    <Card className="home-component-surface"><Preview slug={entry.slug} /></Card>
  </CardFrame>;
}

export default function HomePage() {
  useDocumentTitle();
  return <>
    <main className="home-page outline-none" id="main" tabIndex={-1}>
      <section className="home-intro" aria-labelledby="home-title">
        <Heading level={1} id="home-title" className="home-title" tabIndex={-1}>基于 Base UI 的<br />React 组件库。</Heading>
        <p className="home-lede">React · Tailwind CSS 4 · MIT</p>
        <Inline className="home-actions" gap={3}>
          <Link className={buttonVariants()} to="/docs/installation">开始使用</Link>
          <Link className={buttonVariants({ variant: "outline" })} to="/examples">查看示例</Link>
          <TextLink render={<Link to="/docs/ai" />} className="home-ai-link" variant="muted">AI 使用</TextLink>
        </Inline>
      </section>
      <section className="home-gallery" aria-label="组件">
        {components.map((entry) => <ComponentCard key={entry.slug} entry={entry} />)}
      </section>
    </main>
    <footer className="home-footer">
      <span>Qingye UI · 青野</span>
      <nav aria-label="页脚导航">
        <TextLink render={<Link to="/docs/design-philosophy" />} variant="muted">设计理念</TextLink>
        <TextLink href="/design.md" download="qingye-design.md" variant="muted">design.md</TextLink>
        <TextLink href={SITE.repo} variant="muted">GitHub</TextLink>
        <TextLink render={<Link to="/docs" />} variant="muted">MIT</TextLink>
      </nav>
    </footer>
  </>;
}
