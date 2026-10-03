import { buttonVariants } from "@qingye/ui/components/button";
import { A, Code, H2, Ol, P, PageHeader } from "@/components/prose";
import { CodeBlock } from "@/components/code-block";
import { CopyCodeButton } from "@/components/copy-code-button";
import { SITE } from "@/lib/site";
import { DESIGN_GUIDE, PROJECT_AGENTS, PROJECT_DESIGN, TASK_PROMPT } from "@/lib/design-entry";

export default function AIPage() {
  return <article><PageHeader title="把方法与事实交给 AI" />
    <div className="qy-task-actions"><a className={buttonVariants()} download href="/design.md">下载 design.md</a><CopyCodeButton value={DESIGN_GUIDE} label="复制设计指南" /><a className={buttonVariants({ variant: "quiet" })} download href="/ai/SKILL.md">取得主使用 Skill</a></div>
    <H2 id="project-rules">让每次界面任务读取设计指南</H2>
    <Ol><li><A href="/docs/installation">安装并配置组件库</A>，核对项目实际安装的版本。</li><li>将下方两个片段分别合并到项目已有的 <Code>AGENTS.md</Code> 与 <Code>design.md</Code>，保留项目原有规则和具体设计约束。</li><li>让所用 AI 工具按其规则加载项目说明；开始界面任务时，读取本地设计指南、组件 API 与项目入口。</li></Ol>
    <CodeBlock code={PROJECT_AGENTS} lang="text" title="AGENTS.md · 合并片段" />
    <CodeBlock code={PROJECT_DESIGN} lang="text" title="design.md · 合并片段" />
    <P>片段引用安装包内的 <Code>node_modules/@qingye/ui/design.md</Code>。若安装版尚未包含指南，下载后保存为 <Code>docs/qingye-design.md</Code>，再把片段中的指南路径改为该路径。其他技术栈可以下载上方指南放入自己的项目，再在协作规则中写明读取路径；本库 API 只适用于实际安装它的项目。</P>
    <P>下载文件不会自动配置 AI。支持 <Code>AGENTS.md</Code> 的工具仍需按实际加载范围使用；其他工具可把同一规则放入其项目说明入口。写入前遵守项目权限，路径变化时同步修改引用。</P>
    <H2 id="start">从当前项目开始</H2><P>先读取项目协作规则、实际安装的 <Code>@qingye/ui</Code> 版本、UI 入口与集中主题。本站基于工作区 v{SITE.version} 生成，可能先于 Release；本地声明文件与导出是你所用版本的依据，上游同名组件的属性不能直接套用。</P><CodeBlock code={'node -p "require(\'@qingye/ui/package.json\').version"'} lang="shell" /><P><a className="focus-ring underline" href="/catalog.json">catalog.json</a> 列出组件导出、声明、别名归属、可选依赖和同源示例。catalog.json 将无法静态解析的签名和 Provider 要求标为 UNVERIFIED；使用前查本地声明和组件源码。</P>
    <H2 id="task">最小任务提示</H2><CodeBlock code={TASK_PROMPT} lang="text" /><P>在任务提示中写明由应用管理的对象、草稿、查询范围、权限、版本与异步结果。应用收到后端确认后，才显示保存或取消成功。</P>
    <H2 id="resources">按需读取版本资料</H2><ul className="my-4 space-y-3"><li><a className="focus-ring underline" href={`/ai/v${SITE.version}/llms.txt`}>v{SITE.version} 资料索引</a> · <a className="focus-ring underline" href="/llms.txt">llms.txt</a></li><li><a className="focus-ring underline" href={`/ai/v${SITE.version}/installation.md`}>安装与样式路径</a></li><li><A href="/docs/components">当前组件</A> · <A href="/docs/patterns">完整任务模式</A></li></ul>
    <H2 id="registry">共享包与 Registry</H2><P>Registry 提供项目接入、主题入口和公共包组合模板，基础组件继续从 <Code>@qingye/ui</Code> 导入。模板固定来源版本，不静默安装最新版。</P><P><a className="focus-ring underline" href="/registry.json">Registry 索引</a> · <a className="focus-ring underline" href="/r/qingye-provider.json">项目 Provider</a> · <a className="focus-ring underline" href="/r/qingye-theme.json">项目主题</a> · <a className="focus-ring underline" href="/r/qingye-editor.json">编辑组合</a></P><P>使用项目已有的 shadcn Registry 客户端读取模板；先核对依赖和应用目录，再决定安装。JSON 采用 <A href="https://ui.shadcn.com/docs/registry/registry-item-json">shadcn Registry 格式</A>。安装后在项目中验证模板能否编译和运行，并检查所用 AI 工具是否加载了 Skill。</P>
    <H2 id="evidence">检查实际发生的事</H2><P>分别记录源码、浏览器样式与交互、辅助技术和人工视觉检查的结果。结果未知先核实；未运行不能记作通过。实际操作正常路径和相关失败路径，记录观察到的结果。</P>
  </article>;
}
