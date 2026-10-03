import { Link } from "@/components/locale-link";
import { buttonVariants } from "@qingye/ui/components/button";
import { P, PageHeader } from "@/components/prose";
import { PublicMarkdown } from "@/components/public-markdown";
import { methodsFor } from "@/lib/design-guidance";
import { useDocsLocale } from "@/lib/docs-locale";
import philosophy from "@/public-content/philosophy.md?raw";
import philosophyEn from "@/public-content/philosophy.en.md?raw";
export default function DesignPhilosophyPage() {
  const locale = useDocsLocale(); const en = locale === "en";
  return <article><PageHeader title={en ? "Culture as a method of design" : "让文化成为设计的方法"}><div className="qy-task-actions"><Link className={buttonVariants({ variant: "quiet" })} to="/docs/ai#project-rules">{en ? "Project guidance" : "带进项目协作"}</Link><a className={buttonVariants({ variant: "quiet" })} download href={en ? "/design.en.md" : "/design.md"}>{en ? "Download design guide" : "下载设计指南"}</a></div></PageHeader><nav aria-label={en ? "Six design methods" : "六种设计方法"} className="qy-pattern-list">{methodsFor(locale).map(method => <Link className="focus-ring" key={method.href} to={method.href}><h2 className="text-title">{method.name}</h2><P>{method.decision}</P></Link>)}</nav><PublicMarkdown source={en ? philosophyEn : philosophy} /></article>;
}
