import { Button } from "@qingye/ui/components/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@qingye/ui/components/card";
import { Heading, TextLink } from "@qingye/ui/components/typography";
import { ArrowLeft, ArrowUpRight, Image, Mail, PanelsTopLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { DashboardDemo, DemoComponentLinks, EXAMPLES, MailDemo, StudioDemo } from "../examples";
import { SITE } from "../lib/site";
import { useDocumentTitle } from "../components/prose";

const DEMOS = { dashboard: DashboardDemo, mail: MailDemo, studio: StudioDemo };
const ICONS = { dashboard: PanelsTopLeft, mail: Mail, studio: Image };

export function ExamplesPage() {
  useDocumentTitle("组件组合示例");
  return <main id="main" tabIndex={-1} className="examples-index-page"><header><Heading level={1} size="display">组件能力示例</Heading><p className="text-body text-muted-foreground">在完整场景中试用组件的筛选、编辑、输入与反馈。</p></header><div className="examples-index-grid">{EXAMPLES.map((example) => { const Icon = ICONS[example.slug]; return <Card key={example.slug}><CardHeader><Icon aria-hidden /><CardTitle>{example.title}</CardTitle><CardDescription>{example.description}</CardDescription></CardHeader><CardFooter><Button nativeButton={false} render={<Link to={`/examples/${example.slug}`} />} variant="outline">打开示例<ArrowUpRight aria-hidden /></Button></CardFooter><div className="px-6 pb-6"><DemoComponentLinks slug={example.slug} /></div></Card>; })}</div><div className="examples-index-note"><p className="text-caption text-muted-foreground">示例使用本地数据；刷新后恢复初始状态。</p><Button variant="outline" nativeButton={false} render={<Link to="/docs/components" />}>浏览组件<ArrowUpRight aria-hidden /></Button></div></main>;
}

export default function ExamplePage() {
  const { slug } = useParams();
  const example = EXAMPLES.find((item) => item.slug === slug);
  const Demo = slug && slug in DEMOS ? DEMOS[slug as keyof typeof DEMOS] : undefined;
  useDocumentTitle(example?.title ?? "示例不存在");
  if (!Demo || !example) return <main id="main" className="examples-index-page" tabIndex={-1}><Heading level={1}>这个示例还不存在</Heading><Button nativeButton={false} render={<Link to="/examples" />} variant="outline">浏览全部示例</Button></main>;
  return <main id="main" tabIndex={-1} className="example-page"><header className="example-page-bar"><Button nativeButton={false} render={<Link to="/examples" />} variant="ghost" size="sm"><ArrowLeft aria-hidden />全部示例</Button><span className="text-caption text-muted-foreground">{example.title}</span><TextLink variant="muted" external href={`${SITE.repo}/tree/main/apps/docs/src/examples/${example.slug}.tsx`}>查看源码</TextLink></header><div className="example-page-frame"><Demo /></div><footer className="example-page-note"><p className="text-caption text-muted-foreground">当前页面使用演示数据，刷新后恢复。</p><DemoComponentLinks slug={example.slug} /></footer></main>;
}
