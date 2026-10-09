import pkg from "@qingye_lab/ui/package.json";
import { CodeBlock } from "@/components/code-block";
import { InstallTabs } from "@/components/install-tabs";
import { A, Code, Facts, H2, H3, P, PageHeader } from "@/components/prose";
import { useDocsLocale } from "@/lib/docs-locale";
import { installTarget, SITE, tarballTarget } from "@/lib/site";

const peers = pkg.peerDependencies;
const providers = `import { MotionProvider } from "${SITE.packageName}/components/motion-provider";
import { ThemeProvider } from "${SITE.packageName}/components/theme-provider";
import { ToastProvider } from "${SITE.packageName}/components/toast";
import { TooltipProvider } from "${SITE.packageName}/components/tooltip";

export function Root() {
  return (
    <ThemeProvider>
      <MotionProvider>
        <TooltipProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </TooltipProvider>
      </MotionProvider>
    </ThemeProvider>
  );
}`;

export default function InstallationPage() {
  const en = useDocsLocale() === "en";
  return <article><PageHeader title={en ? "Installation" : "安装"} description={en ? `Requires React and React DOM ${peers.react}. Tailwind CSS 4 is optional.` : `需要 React 与 React DOM ${peers.react}；Tailwind CSS 4 可选。`} />
    <H2 id="install">{en ? "Install the package" : "安装包"}</H2>
    <H3 id="npm">npm</H3>
    <InstallTabs pkg={installTarget} />
    <H3 id="tarball">{en ? "Tarball" : "tgz 包"}</H3>
    <P>{en ? <>Without npm access, install the same version from a tarball. Download it from a <A href={`${SITE.repo}/releases`}>GitHub Release</A>; if no release carries this version yet, pack it from the Qingye UI repository root:</> : <>无法访问 npm 时，用 tgz 文件安装同一版本。文件从 <A href={`${SITE.repo}/releases`}>GitHub Release</A> 下载；Release 还没有这个版本时，在 Qingye UI 仓库根目录打包：</>}</P>
    <CodeBlock code={`pnpm --filter ${SITE.packageName} pack --pack-destination ../my-app`} lang="shell" />
    <InstallTabs pkg={tarballTarget} />
    <P>{en ? "package.json refers to the file by path. Commit the file with the lockfile so teammates and CI install the same build." : "package.json 按路径引用这个文件。把它与 lock 文件一起提交，其他成员与 CI 才能装到同一份构建。"}</P>
    <H2 id="peers">{en ? "Optional peers" : "可选依赖"}</H2><P>{en ? "Install these only for the components that need them:" : "只在用到对应组件时安装："}</P>
    <Facts items={[
      { term: <Code>{`@tanstack/react-table ${peers["@tanstack/react-table"]}`}</Code>, detail: "DataTable" },
      { term: <Code>{`recharts ${peers.recharts}`}</Code>, detail: "Chart, ScatterChart" },
    ]} />
    <H2 id="styles">{en ? "Style entry" : "样式入口"}</H2><P>{en ? "Import exactly one of the two entries; importing both loads the same styles twice. With Tailwind CSS 4:" : "两个入口只导入一个，同时导入会重复加载同一组样式。使用 Tailwind CSS 4："}</P><CodeBlock code={`@import "tailwindcss";\n@import "${SITE.packageName}/styles.css";`} lang="css" title="src/index.css" /><P>{en ? "Without Tailwind, import the precompiled stylesheet once at the application entry:" : "不使用 Tailwind 时，在应用入口导入一次预编译样式："}</P><CodeBlock code={`import "${SITE.packageName}/ui.css";`} />
    <H2 id="providers">{en ? "Providers" : "Provider"}</H2><P>{en ? "Mount at the application root:" : "挂载在应用根部："}</P>
    <Facts items={[
      { term: <Code>ThemeProvider</Code>, detail: en ? "Light and dark, stored in localStorage." : "浅色与深色，选择存进 localStorage。" },
      { term: <Code>MotionProvider</Code>, detail: en ? "Records keyboard or pointer input; transitions finish at once during keyboard use." : "记录键盘或指针输入；键盘操作时过渡立即完成。" },
      { term: <Code>TooltipProvider</Code>, detail: en ? "Shared open delay for Tooltip." : "Tooltip 共用的打开延迟。" },
      { term: <Code>ToastProvider</Code>, detail: en ? "Queue and placement for Toast." : "Toast 的队列与位置。" },
    ]} />
    <CodeBlock code={providers} title="root.tsx" />
    <P>{en ? <>For English built-in messages, add UILocaleProvider; see <A href="/docs/i18n">Internationalization</A>.</> : <>需要英文内置文案时，再加 UILocaleProvider，见<A href="/docs/i18n">国际化</A>。</>}</P>
    <H2 id="per-component">{en ? "Import per component" : "按组件导入"}</H2><CodeBlock code={`import { Button } from "${SITE.packageName}/components/button";\nimport { Field, FieldLabel } from "${SITE.packageName}/components/field";\nimport { Input } from "${SITE.packageName}/components/input";`} /><P>{en ? <>Before wrapping a component, check its <A href="/docs/components">API</A> and the installed type declarations: a similarly named component from another library may take different props.</> : <>封装组件前，先对照<A href="/docs/components">组件 API</A>与已安装版本的类型声明：其他库里同名的组件未必有相同的属性。</>}</P>
    <H2 id="project-rules">{en ? "Project guidance" : "项目指南"}</H2><P>{en ? <>Merge the snippets from <A href="/docs/ai#project-rules">Using AI</A> into your project's AGENTS.md and design.md, keeping its existing rules.</> : <>把<A href="/docs/ai#project-rules">AI 使用</A>页的片段合并进项目的 AGENTS.md 与 design.md，保留原有规则。</>}</P>
  </article>;
}
