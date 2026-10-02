import { Link } from "react-router-dom";
import { buttonVariants } from "@qingye/ui/components/button";
import { H2, P, PageHeader } from "@/components/prose";
import { PublicMarkdown } from "@/components/public-markdown";
import { METHODS } from "@/lib/design-guidance";
import philosophy from "@/public-content/philosophy.md?raw";

export default function DesignPhilosophyPage() {
  return <article><PageHeader title="让文化成为设计的方法" description="器用为本，关系为法，合宜为度。"><div className="qy-task-actions"><Link className={buttonVariants({ variant: "outline" })} to="/docs/ai#project-rules">带进项目协作规则</Link><a className={buttonVariants({ variant: "ghost" })} download href="/design.md">下载设计指南</a></div></PageHeader><H2 id="try-methods">先看方法怎样改变一次使用</H2><div className="qy-pattern-list">{METHODS.map((method) => <Link className="focus-ring" key={method.name} to={method.href}><h3 className="text-title font-semibold">{method.name}</h3><P>{method.decision} {method.example}</P><p className="text-caption text-muted-foreground">避免：{method.avoid}</p></Link>)}</div><PublicMarkdown source={philosophy} /></article>;
}
