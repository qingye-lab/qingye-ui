import { A, Code, H2, P, PageHeader, Ul } from "@/components/prose";
import { useDocsLocale } from "@/lib/docs-locale";
import { components } from "@/lib/registry";
import { SITE } from "@/lib/site";
export default function IntroductionPage() {
  const en = useDocsLocale() === "en";
  return <article><PageHeader title={en ? "Introduction" : "介绍"} description={en ? `${SITE.packageName} is a React component library with ${components.length} components.` : `${SITE.packageName} 是一套 React 组件库，当前有 ${components.length} 个组件。`} />
    <H2 id="what">{en ? "What it is built on" : "构成"}</H2><P>{en ? "Styles are written with Tailwind CSS 4; projects without Tailwind import a precompiled stylesheet instead. Compound interactions such as menus, dialogs and selects are built on public Base UI primitives, which supply focus management and ARIA state." : "样式用 Tailwind CSS 4 编写；不用 Tailwind 的项目改为导入预编译的样式表。菜单、对话框、选择框等复合交互建立在 Base UI 的公共原语上，焦点管理与 ARIA 状态由原语提供。"}</P>
    <H2 id="boundary">{en ? "What stays in your application" : "职责边界"}</H2><P>{en ? "Routes, requests, permissions and business results belong to your application. Components display the results you pass in; they do not infer whether a save succeeded." : "路由、请求、权限与业务结果由你的应用持有。组件显示你传入的结果，不替应用推断保存是否成功。"}</P>
    <H2 id="purpose">{en ? "Design basis" : "设计依据"}</H2><P>{en ? "Names, spacing, ink steps and state expression follow one guide, design.md. It ships in the package at " : "命名、间距、墨阶与状态表达依据同一份指南 design.md。它随包发布在 "}<Code>{`node_modules/${SITE.packageName}/${en ? "design.en.md" : "design.md"}`}</Code>{en ? <>, where your project and AI tools can read it. <A href="/docs/design-philosophy">Design philosophy</A> explains how its methods enter a decision.</> : <>，你的项目与 AI 工具可以直接读取。其中的方法怎样参与判断，见<A href="/docs/design-philosophy">设计理念</A>。</>}</P>
    <H2 id="start">{en ? "Start" : "开始使用"}</H2><Ul><li><A href="/docs/installation">{en ? "Install the library" : "安装组件库"}</A></li><li><A href="/docs/components">{en ? "Browse components" : "浏览组件"}</A></li><li><A href="/examples">{en ? "Try the examples" : "试用示例"}</A></li><li><A href="/docs/ai#project-rules">{en ? "Add the guide to a project" : "把指南接入项目"}</A></li></Ul>
    <H2 id="license">{en ? "License" : "许可"}</H2><P>{en ? "MIT. Dependencies keep their own licenses." : "MIT 许可。依赖各自保留许可。"}</P>
  </article>;
}
