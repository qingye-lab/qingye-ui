import { CodeBlock } from "@/components/code-block";
import { InstallTabs } from "@/components/install-tabs";
import { A, Callout, Code, H2, P, PageHeader } from "@/components/prose";
import { useDocsLocale } from "@/lib/docs-locale";
import { releaseDownloadCommand, releaseFile, SITE } from "@/lib/site";
const providers = `import { ThemeProvider } from "@qingye/ui/components/theme-provider";
import { TooltipProvider } from "@qingye/ui/components/tooltip";
import { ToastProvider } from "@qingye/ui/components/toast";
import "@qingye/ui/ui.css";

export function Root() {
  return <ThemeProvider><TooltipProvider><ToastProvider><App /></ToastProvider></TooltipProvider></ThemeProvider>;
}`;
export default function InstallationPage() {
  const en = useDocsLocale() === "en";
  return <article><PageHeader title={en ? "Installation" : "安装"} />
    <H2 id="requirements">{en ? "Requirements" : "环境要求"}</H2><P>{en ? "Use the React and React DOM versions declared by the installed package. DataTable needs the optional @tanstack/react-table peer; Chart needs the optional recharts peer. Check the installed manifests when upgrading or installing peers manually." : "React 与 React DOM 版本以实际安装包声明为准。DataTable 需要可选 peer @tanstack/react-table；Chart 需要可选 peer recharts。升级或手动安装 peer 时核对实际安装包清单。"} <A href={`${SITE.repo}/blob/${SITE.branch}/packages/ui/README.md`}>{en ? "Peer dependency details" : "Peer 依赖详情"}</A></P>
    <H2 id="install">{en ? "Install the package" : "安装包"}</H2><P>{en ? "Use an account with repository access for GitHub CLI. This command downloads GitHub's latest Release; it does not pin the website's workspace version." : "GitHub CLI 使用有仓库访问权限的账号。命令下载 GitHub 标记的最新 Release，不固定为本站工作区版本。"} v{SITE.version}</P><InstallTabs downloadCommand={releaseDownloadCommand} pkg={`./${releaseFile}`} /><P>{en ? "Keep the downloaded package and commit the lockfile. Unreleased source changes are not part of an installed release." : "保留下载包并提交 lock 文件。未发布的源码变化不会自动进入安装包。"} <A href={`${SITE.repo}/releases`}>Releases</A></P>
    <H2 id="styles">{en ? "Choose one style entry" : "选择一个样式入口"}</H2><P>Tailwind CSS 4:</P><CodeBlock code={'@import "tailwindcss";\n@import "@qingye/ui/styles.css";'} lang="css" title="src/index.css" /><P>{en ? "Without Tailwind, import the compiled component stylesheet once:" : "不使用 Tailwind 时，导入一次预编译组件样式："}</P><CodeBlock code={'import "@qingye/ui/ui.css";'} /><Callout title={en ? "One entry" : "二选一"}>{en ? "Use styles.css or ui.css, so the same styles are not loaded twice." : "styles.css 与 ui.css 二选一，避免同一组样式重复加载。"}</Callout>
    <H2 id="providers">{en ? "Application providers" : "应用 Provider"}</H2><P>{en ? "Mount the providers required by the components you use. UILocaleProvider selects built-in language; MotionProvider tracks input modality. The component reference lists its requirements." : "挂载所用组件需要的 Provider。UILocaleProvider 选择内置文案语言，MotionProvider 跟踪输入方式；具体要求查看组件页。"}</P><CodeBlock code={providers} title="root.tsx" />
    <H2 id="per-component">{en ? "Import from the component entry" : "按组件导入"}</H2><CodeBlock code={'import { Button } from "@qingye/ui/components/button";\nimport { Field, FieldLabel } from "@qingye/ui/components/field";\nimport { Input } from "@qingye/ui/components/input";'} /><P>{en ? "Per-component entries keep dependencies explicit. Read the installed declarations before wrapping a component; a similarly named upstream component may expose different props." : "单组件入口让依赖范围明确。封装前读取实际安装版的声明，同名上游组件未必具有相同属性。"} <A href="/docs/components">{en ? "Current API" : "当前 API"}</A></P>
    <H2 id="project-rules">{en ? "Project references" : "项目引用"}</H2><P><A href="/docs/ai#project-rules">{en ? "Merge guide references into AGENTS.md and design.md" : "将指南引用合并到 AGENTS.md 与 design.md"}</A>{en ? ". Keep existing project rules and verify the installed package in your application." : "，保留既有项目约束，并在应用内验证实际安装包。"}</P>
  </article>;
}
