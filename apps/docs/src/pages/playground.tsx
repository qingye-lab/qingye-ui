import { Button } from "@qingye/ui/components/button";
import { Card } from "@qingye/ui/components/card";
import { useTheme } from "@qingye/ui/components/theme-provider";
import { useDocsLocale } from "@/lib/docs-locale";
import { localizedMeta } from "@/lib/localized-meta";
import { ContentBoundary } from "@/components/content-boundary";
import { PageState } from "@/components/page-state";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { findComponent, loadDemos, type LoadedDemo } from "@/lib/registry";
/** Bare current demos; query theme is an explicit review-harness choice. */
export function PlaygroundPage() {
  const { slug = "" } = useParams(); const locale = useDocsLocale(); const en = locale === "en";
  const [params] = useSearchParams(); const { setTheme } = useTheme();
  const [demos,setDemos] = useState<LoadedDemo[] | null>(null); const [failed,setFailed] = useState(false); const [attempt,setAttempt] = useState(0);
  const forced = params.get("theme");
  useEffect(() => { if (forced === "dark" || forced === "light") setTheme(forced); },[forced,setTheme]);
  useEffect(() => { let live = true; setDemos(null); setFailed(false); loadDemos(slug).then(loaded => { if (live) setDemos(loaded); },() => { if (live) setFailed(true); }); return () => { live = false; }; },[slug,attempt]);
  const found = findComponent(slug); const entry = found ? localizedMeta(found,locale) : undefined;
  if (!entry) return <main className="mx-auto max-w-3xl p-(--qy-panel-padding)" id="main" tabIndex={-1}><PageState state="not-applicable" title={en ? "Component not found" : "组件不存在"} /></main>;
  return <main className="mx-auto flex w-full max-w-3xl flex-col gap-(--qy-section-gap) p-(--qy-panel-padding)" id="main" tabIndex={-1} data-playground={slug}><header><h1 className="text-display" tabIndex={-1}>{entry.title}</h1><p className="text-body text-muted-foreground">{entry.description}</p></header>{failed ? <PageState title={en ? "Examples could not be loaded" : "示例暂时无法加载"}><Button variant="quiet" onClick={() => setAttempt(value => value+1)}>{en ? "Retry" : "重试"}</Button></PageState> : demos === null ? <span aria-busy="true">{en ? "Loading…" : "加载中…"}</span> : demos.length === 0 ? <PageState state="empty" title={en ? "No examples yet" : "暂无示例"} /> : null}{demos?.map(demo => { const meta = localizedMeta(demo.meta,locale); return <section className="grid min-w-0 gap-(--qy-field-group-gap)" data-demo={demo.id} key={demo.id}><header><h2 className="text-heading">{meta.title}</h2>{meta.description && <p className="text-support text-muted-foreground">{meta.description}</p>}</header><Card className={meta.flush ? "min-w-0" : "min-w-0 p-(--qy-panel-padding)"}><ContentBoundary title={en ? "Example could not be displayed" : "示例暂时无法显示"}><demo.default /></ContentBoundary></Card></section>; })}</main>;
}
