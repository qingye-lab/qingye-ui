import { Link } from "react-router-dom";
import { H2, P, PageHeader } from "@/components/prose";
import { PublicMarkdown } from "@/components/public-markdown";
import { METHODS } from "@/lib/design-guidance";
import philosophy from "@/public-content/philosophy.md?raw";

export default function DesignPhilosophyPage() {
  return <article><PageHeader title="让文化成为设计的方法" description="器用为本，关系为法，合宜为度。" /><H2 id="try-methods">先看方法怎样改变一次使用</H2><div className="qy-pattern-list">{METHODS.map((method) => <Link className="focus-ring" key={method.name} to={method.href}><h3 className="text-title font-semibold">{method.name}</h3><P>{method.decision} {method.example}</P><p className="text-caption text-muted-foreground">避免：{method.avoid}</p></Link>)}</div><PublicMarkdown source={philosophy} /></article>;
}
