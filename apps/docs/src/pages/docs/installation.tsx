import { CodeBlock } from "@/components/code-block";
import { InstallTabs } from "@/components/install-tabs";
import { A, Callout, Code, Facts, H2, H3, P, PageHeader } from "@/components/prose";
import { releaseDownloadCommand, releaseFile, SITE } from "@/lib/site";

const providers = `import { ThemeProvider } from "@qingye/ui/components/theme-provider";
import { ToastProvider } from "@qingye/ui/components/toast";
import { TooltipProvider } from "@qingye/ui/components/tooltip";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <TooltipProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </TooltipProvider>
  </ThemeProvider>,
);`;

const usage = `import { Button } from "@qingye/ui/components/button";
import { toastManager } from "@qingye/ui/components/toast";

export function SaveButton() {
  return (
    <Button onClick={() => toastManager.add({ title: "已保存", type: "success" })}>
      保存
    </Button>
  );
}`;

export default function InstallationPage() {
  return (
    <article>
      <PageHeader
        description="组件库以单个包发布；按项目是否使用 Tailwind CSS 4 选择样式入口，再在应用根部挂载 Provider。"
        title="安装"
      />

      <H2 id="requirements">环境要求</H2>
      <Facts
        items={[
          { term: "React", detail: <>React 与 React DOM 19.2 或更高版本。</> },
          { term: "样式", detail: <>Tailwind CSS 4（推荐），或者直接使用预编译的样式表。</> },
          {
            term: "可选依赖",
            detail: (
              <>
                使用 DataTable 时另装 <Code>@tanstack/react-table</Code>，使用 Chart 时另装 <Code>recharts</Code>；两者是可选的 peer 依赖。其余依赖（Base UI、图标等）会随包一起安装。 若关闭自动安装 peer，还需为 Recharts 安装与 React 主版本兼容的 react-is。
              </>
            ),
          },
        ]}
      />

      <H2 id="install">安装包</H2>
      <P>
        通过 GitHub Release 分发。仓库目前为私有，请先用有仓库访问权限的账号登录 GitHub CLI，再复制以下命令下载并安装最新版本：
      </P>
      <P className="text-body text-muted-foreground">本站构建版本为 v{SITE.version}；以下命令下载 GitHub 标记的最新 Release，不按本站构建版本固定 tag。未发布的源码变化不会自动进入安装包。</P>
      <InstallTabs downloadCommand={releaseDownloadCommand} pkg={`./${releaseFile}`} />
      <P className="text-body text-muted-foreground">
        保留并提交 <Code>{releaseFile}</Code>、<Code>package.json</Code> 和 lock 文件。日常 <Code>pnpm install</Code> 按 lock 复现；主动升级时重新运行上述命令。发布记录见 <A href={`${SITE.repo}/releases`}>Releases</A>。
      </P>

      <H2 id="styles">引入样式</H2>
      <H3 id="styles-tailwind">Tailwind CSS 4 项目</H3>
      <P>在全局 CSS 中，紧跟 Tailwind 之后引入组件库的样式入口：</P>
      <CodeBlock code={`@import "tailwindcss";\n@import "@qingye/ui/styles.css";`} lang="css" title="src/index.css" />
      <P>
        <Code>styles.css</Code> 包含三层设计令牌、Tailwind 主题映射、<Code>touch-target</Code> 与 <Code>numeric</Code> 等工具类、动效策略，以及{" "}
        <Code>dark</Code> 自定义变体。它通过 <Code>@source</Code> 扫描组件源码，所以只会生成实际用到的类。
      </P>

      <H3 id="styles-css">不使用 Tailwind 的项目</H3>
      <P>在应用入口导入一次预编译样式表：</P>
      <CodeBlock code={`import "@qingye/ui/ui.css";`} title="src/main.tsx" />
      <P>
        <Code>ui.css</Code> 包含组件所需的全部样式和基础 reset，但不是完整的 Tailwind 工具集；页面自身的布局用你自己的 CSS 编写。
      </P>
      <Callout tone="warning" title="二选一">
        <Code>styles.css</Code> 与 <Code>ui.css</Code> 不要同时引入，否则同一组样式会以不同顺序出现两次。
      </Callout>

      <H2 id="providers">挂载 Provider</H2>
      <P>在应用根部各挂载一次。Provider 的顺序没有强制要求。</P>
      <CodeBlock code={providers} title="src/main.tsx" />
      <Facts
        items={[
          {
            term: <Code>ThemeProvider</Code>,
            detail: (
              <>
                管理浅色、深色与跟随系统，在 <Code>{"<html>"}</Code> 上切换 <Code>.dark</Code>，并把选择保存在 <Code>localStorage</Code>（键名{" "}
                <Code>yq-theme</Code>）。配合 <A href="/docs/theming#dark-mode">首屏脚本</A> 避免闪烁。
              </>
            ),
          },
          {
            term: <Code>TooltipProvider</Code>,
            detail: <>让相邻的提示共享延迟：从一个提示移到下一个时立即出现，不再重新等待。</>,
          },
          {
            term: <Code>ToastProvider</Code>,
            detail: (
              <>
                渲染通知视口。之后在任意位置调用 <Code>toastManager.add()</Code> 发出通知。
              </>
            ),
          },
          {
            term: <Code>UILocaleProvider</Code>,
            detail: (
              <>
                可选。内置文案默认是简体中文；需要英文或局部改写时使用，见 <A href="/docs/i18n">国际化</A>。
              </>
            ),
          },
          {
            term: <Code>MotionProvider</Code>,
            detail: (
              <>
                可选。区分键盘与指针输入，让键盘操作跳过过渡、即时响应，见 <A href="/docs/motion#keyboard">动效</A>。
              </>
            ),
          },
        ]}
      />

      <H2 id="usage">使用组件</H2>
      <CodeBlock code={usage} title="save-button.tsx" />
      <H3 id="per-component">按组件导入</H3>
      <P>
        推荐从单组件入口导入，避免加载未使用组件的依赖。根入口 <Code>@qingye/ui</Code> 会导出 Chart/DataTable；在不消除未用导出的环境中（如直接由 Node 加载），仍需安装可选 peer <Code>recharts</Code> 和 <Code>@tanstack/react-table</Code>：
      </P>
      <CodeBlock code={`import { Button } from "@qingye/ui/components/button";\nimport { Select, SelectItem, SelectPopup } from "@qingye/ui/components/select";`} />
      <P>
        入口名与源码文件名一致，即 <Code>@qingye/ui/components/&lt;name&gt;</Code>。每个组件页的“导入”一节都给出了对应路径。
      </P>

      <H2 id="typescript">TypeScript</H2>
      <P>
        类型声明随包发布，无需额外安装。组件的属性类型与 Base UI 保持一致，例如 <Code>MenuPrimitive.Root.Props</Code> 可直接用于封装。
      </P>
    </article>
  );
}
