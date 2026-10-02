import { buttonVariants } from "@qingye/ui/components/button";
import { A, Code, H2, Ol, P, PageHeader } from "@/components/prose";
import { CodeBlock } from "@/components/code-block";
import { CopyCodeButton } from "@/components/copy-code-button";
import { SITE } from "@/lib/site";
import { DESIGN_GUIDE, PROJECT_AGENTS, PROJECT_DESIGN, TASK_PROMPT } from "@/lib/design-entry";

export default function AIPage() {
  return <article><PageHeader title="把方法与事实交给 AI" description="设计指南给出判断，当前版本给出 API，示例说明状态由谁负责。" />
    <div className="qy-task-actions"><a className={buttonVariants()} download href="/design.md">下载 design.md</a><CopyCodeButton value={DESIGN_GUIDE} label="复制设计指南" /><a className={buttonVariants({ variant: "outline" })} download href="/ai/SKILL.md">取得主使用 Skill</a></div>
    <H2 id="project-rules">让每次界面任务读取设计指南</H2>
    <Ol><li><A href="/docs/installation">安装并配置组件库</A>，核对项目实际安装的版本。</li><li>将下方两个片段分别合并到项目已有的 <Code>AGENTS.md</Code> 与 <Code>design.md</Code>，保留项目原有规则和具体设计约束。</li><li>让所用 AI 工具按其规则加载项目说明；开始界面任务时，读取本地设计指南、组件 API 与项目入口。</li></Ol>
    <CodeBlock code={PROJECT_AGENTS} lang="text" title="AGENTS.md · 合并片段" />
    <CodeBlock code={PROJECT_DESIGN} lang="text" title="design.md · 合并片段" />
    <P>片段引用安装包内的 <Code>node_modules/@qingye/ui/design.md</Code>。若安装版尚未包含指南，下载后保存为 <Code>docs/qingye-design.md</Code>，再把片段中的指南路径改为该路径。其他技术栈可以下载上方指南放入自己的项目，再在协作规则中写明读取路径；本库 API 只适用于实际安装它的项目。</P>
    <P>下载文件不会自动配置 AI。支持 <Code>AGENTS.md</Code> 的工具仍需按实际加载范围使用；其他工具可把同一规则放入其项目说明入口。写入前遵守项目权限，路径变化时同步修改引用。</P>
    <H2 id="start">从当前项目开始</H2><P>先读取项目协作规则、实际安装的 <Code>@qingye/ui</Code> 版本、UI 入口与集中主题。本站基于工作区 v{SITE.version} 生成，可能先于 Release；本地声明文件与导出是你所用版本的依据，上游同名组件的属性不能直接套用。</P><CodeBlock code={'node -p "require(\'@qingye/ui/package.json\').version"'} lang="shell" /><P><a className="focus-ring underline" href="/catalog.json">catalog.json</a> 包含实际导出、声明、别名归属、可选依赖和同源示例。静态无法解析的签名和 Provider 要求标为 UNVERIFIED，不据此声称所有属性或上下文均可用。</P>
    <H2 id="task">最小任务提示</H2><CodeBlock code={TASK_PROMPT} lang="text" /><P>普通组件只需要相关方法。完整任务还要明确应用拥有的对象、草稿、查询、权限、版本和异步结果；组件库不会保证真实后端已保存或取消。</P>
    <H2 id="resources">按需读取版本资料</H2><ul className="my-4 space-y-3"><li><a className="focus-ring underline" href={`/ai/v${SITE.version}/llms.txt`}>v{SITE.version} 资料索引</a> · <a className="focus-ring underline" href="/llms.txt">llms.txt</a></li><li><a className="focus-ring underline" href={`/ai/v${SITE.version}/installation.md`}>安装与样式路径</a></li><li><A href="/docs/components">当前组件</A> · <A href="/docs/patterns">完整任务模式</A></li></ul><P>指南、catalog、组件 Markdown 和模式源码由同一生成链提供。输入来源变化后重新生成；网站版本和本地安装版不同，应先查本地事实。</P>
    <H2 id="registry">共享包与 Registry</H2><P>Registry 提供项目接入、主题入口和公共包组合模板，基础组件继续从 <Code>@qingye/ui</Code> 导入。模板固定来源版本，不静默安装最新版。</P><P><a className="focus-ring underline" href="/registry.json">Registry 索引</a> · <a className="focus-ring underline" href="/r/qingye-provider.json">项目 Provider</a> · <a className="focus-ring underline" href="/r/qingye-theme.json">项目主题</a> · <a className="focus-ring underline" href="/r/qingye-editor.json">编辑组合</a></P><P>使用项目已有的 shadcn Registry 客户端读取模板；先核对依赖和应用目录，再决定安装。JSON 采用 <A href="https://ui.shadcn.com/docs/registry/registry-item-json">shadcn Registry 格式</A>。资料可直接取得，当前页面不代替客户端接入测试，也不承诺所有 AI 产品自动加载 Skill。</P>
    <H2 id="evidence">检查实际发生的事</H2><P>区分源码检查、真实样式、交互、辅助技术与人工视觉结果。结果未知先核实；未运行不能记作通过。模型解释了方法，不等于任务已经可用，最终仍要操作正常和相关失败路径。</P>
  </article>;
}
