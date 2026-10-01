import { Button } from "@qingye/ui/components/button";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@qingye/ui/components/tabs";
import { Skeleton } from "@qingye/ui/components/skeleton";
import { Card } from "@qingye/ui/components/card";
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";
import { lazy, Suspense, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ComponentPreview } from "@/components/component-preview";
import { GitHubIcon } from "@/components/logo";
import { useDocumentTitle } from "@/components/prose";
import { CopyCodeButton } from "@/components/copy-code-button";
import { components } from "@/lib/registry";
import { SITE, releaseDownloadCommand, releaseFile } from "@/lib/site";
import { DemoComponentLinks } from "@/examples/metadata";

const Dashboard = lazy(() => import("@/examples").then((module) => ({ default: module.DashboardDemo })));
const Mail = lazy(() => import("@/examples").then((module) => ({ default: module.MailDemo })));
const Studio = lazy(() => import("@/examples").then((module) => ({ default: module.StudioDemo })));
const examples = [
  { id: "dashboard", label: "经营概览", english: "Dashboard" },
  { id: "mail", label: "收件箱", english: "Mail" },
  { id: "studio", label: "媒体资源", english: "Media" },
  { id: "components", label: "组件", english: "Components" },
];

function PreviewFallback() {
  return <div aria-busy="true" aria-label="正在载入演示" className="qy-preview-loading"><Skeleton className="h-8 w-48" /></div>;
}

export default function HomePage() {
  useDocumentTitle();
  const [example, setExample] = useState("dashboard");
  const install = `${releaseDownloadCommand} && pnpm add ./${releaseFile}`;
  return (
    <>
      <main className="qy-home outline-none" id="main" tabIndex={-1}>
        <section className="qy-home-hero" data-route-enter>
          <h1 tabIndex={-1}>好界面，从这里开始。</h1>
          <p>精心打磨的组件，让你的下一个产品自然成形。</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button nativeButton={false} render={<Link to="/docs/installation" />} size="lg">开始使用<ArrowRightIcon aria-hidden="true" /></Button>
            <Button nativeButton={false} render={<Link to="/docs/components" />} size="lg" variant="outline">浏览组件</Button>
          </div>
          <div className="qy-home-facts"><span>{components.length} 个组件</span><span>React · Base UI</span><span>浅色 / 深色</span><span>MIT 许可</span></div>
        </section>

        <section aria-label="组件组合演示" className="qy-showcase">
          <Tabs onValueChange={(value) => setExample(String(value))} value={example}>
            <div className="qy-showcase-toolbar">
              <TabsList aria-label="选择演示页面" className="qy-showcase-tabs" size="lg">
                {examples.map((item) => <TabsTab key={item.id} value={item.id}>{item.label}</TabsTab>)}
              </TabsList>
              {example !== "components" && <Link className="qy-preview-open focus-ring" to={`/examples/${example}`}>独立预览<ArrowUpRightIcon aria-hidden="true" size={15} /></Link>}
            </div>
            <Card className="qy-showcase-frame gap-0 py-0">
              <TabsPanel value="dashboard"><Suspense fallback={<PreviewFallback />}><Dashboard embedded /></Suspense></TabsPanel>
              <TabsPanel value="mail"><Suspense fallback={<PreviewFallback />}><Mail embedded /></Suspense></TabsPanel>
              <TabsPanel value="studio"><Suspense fallback={<PreviewFallback />}><Studio embedded /></Suspense></TabsPanel>
              <TabsPanel value="components"><ComponentPreview /></TabsPanel>
            </Card>
          </Tabs>
          <div className="qy-showcase-caption">{example === "components" ? <span>切换通知、创建项目、邀请成员，试用组件的状态与反馈。</span> : <DemoComponentLinks slug={example} />}<Link className="focus-ring" to="/examples">查看全部示例<ArrowRightIcon aria-hidden="true" size={14} /></Link></div>
        </section>

        <section aria-labelledby="start-title" className="qy-home-start">
          <div><h2 id="start-title">带进你的项目。</h2><p>从一个按钮开始，逐步构建完整的体验。</p><Link className="focus-ring inline-flex items-center gap-1.5 text-sm font-medium" to="/docs/installation">安装与配置<ArrowUpRightIcon aria-hidden="true" size={14} /></Link></div>
          <Card className="qy-install-command"><code>{install}</code><CopyCodeButton value={install} /></Card>
        </section>
      </main>
      <footer className="qy-home-footer"><div><span className="font-medium text-foreground">Qingye UI</span><span>青野 · 用心构建</span></div><div><ExternalLink href="https://base-ui.com">Base UI</ExternalLink><ExternalLink href="https://coss.com/ui">coss ui</ExternalLink><a className="focus-ring inline-flex items-center gap-1.5" href={SITE.repo} rel="noreferrer" target="_blank"><GitHubIcon className="size-3.5" />GitHub</a><span>构建版本 v{SITE.version} · MIT</span></div></footer>
    </>
  );
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return <a className="focus-ring transition-colors hover:text-foreground" href={href} rel="noreferrer" target="_blank">{children}</a>;
}
