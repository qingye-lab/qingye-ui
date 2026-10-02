import { buttonVariants } from "@qingye/ui/components/button";
import { Link } from "react-router-dom";
import { CopyCodeButton } from "@/components/copy-code-button";
import { useDocumentTitle } from "@/components/prose";
import { SITE, releaseDownloadCommand, releaseFile } from "@/lib/site";
import EditPattern from "@/patterns/edit";
import ReadPattern from "@/patterns/read";
import "@/patterns/patterns.css";

export default function HomePage() {
  useDocumentTitle();
  const install = `${releaseDownloadCommand} && pnpm add ./${releaseFile}`;
  return <><main className="qy-home qy-task-home outline-none" id="main" tabIndex={-1}>
    <header className="qy-task-home-intro" data-route-enter><p className="text-caption text-muted-foreground">Qingye UI · 青野</p><h1 className="text-display font-semibold" tabIndex={-1}>从一次使用开始。</h1><p>编辑、比较、阅读。可以继续，也可以停下。</p></header>
    <section aria-label="试用工作台与阅读" className="qy-task-home-examples"><div><div className="qy-task-home-label"><span>工作台</span><Link className="focus-ring" to="/docs/patterns/edit">完整编辑模式 →</Link></div><div className="qy-pattern-frame"><EditPattern compact /></div><p className="qy-task-home-note">保存失败后输入仍在；结果未知先核实；放弃修改也保留恢复入口。</p></div><div><div className="qy-task-home-label"><span>阅读</span><Link className="focus-ring" to="/docs/patterns/read">完整阅读模式 →</Link></div><div className="qy-pattern-frame"><ReadPattern compact /></div><p className="qy-task-home-note">正文成为主轴，章节可以直达，停下以后仍能继续阅读。</p></div></section>
    <section className="qy-task-home-method"><p className="text-caption text-muted-foreground">让文化成为设计的方法</p><h2 className="text-display font-semibold">器用为本，关系为法，合宜为度。</h2><p>Qingye UI 从使用出发，把名称、关系、空间与状态组织成可以理解、可以继续，也可以停下的界面。文化参与这些具体判断；专业工作台与舒展的阅读可以有不同面貌。</p><div className="qy-task-actions"><Link className={buttonVariants()} to="/docs/patterns">试用六种任务</Link><Link className={buttonVariants({ variant: "outline" })} to="/docs/design-philosophy">了解六种方法</Link><Link className={buttonVariants({ variant: "ghost" })} to="/docs/components">查找组件</Link></div></section>
    <section className="qy-task-home-start"><div><h2 className="text-title font-semibold">带进你的项目</h2><p>React 公共组件、真实 API、项目主题与完整任务示例。</p><div className="qy-task-actions"><Link className="focus-ring underline" to="/docs/installation">安装与配置</Link><Link className="focus-ring underline" to="/docs/ai">交给 AI 使用</Link><Link className="focus-ring underline" to="/examples">已有产品示例</Link></div></div><div className="qy-install-command"><code>{install}</code><CopyCodeButton value={install} /></div></section>
  </main><footer className="qy-home-footer"><div><span>Qingye UI</span><span>从器用出发，为使用留下余地。</span></div><div><a className="focus-ring" href={SITE.repo}>GitHub</a><Link className="focus-ring" to="/docs">来源与许可</Link><span>文档对应 v{SITE.version} · MIT</span></div></footer></>;
}
