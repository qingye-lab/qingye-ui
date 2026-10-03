import { A, Code, H2, P, PageHeader } from "@/components/prose";
import { useDocsLocale } from "@/lib/docs-locale";
import { components } from "@/lib/registry";
export default function IntroductionPage() {
  const en = useDocsLocale() === "en";
  return <article><PageHeader title={en ? "Introduction" : "介绍"} description={en ? "React components for clear relationships, usable space, and honest states." : "器用为本，关系为法，合宜为度。"} />
    <H2 id="what">{en ? "The library" : "组件库"}</H2><P><Code>@qingye/ui</Code>{en ? ` provides ${components.length} documented components. Styles use Tailwind CSS 4; compound interactions use public Base UI primitives where appropriate. Components do not own your routes, requests, permissions, or business results.` : ` 当前收录 ${components.length} 个组件。样式基于 Tailwind CSS 4；复合交互按需使用 Base UI 公共原语。组件不管理项目路由、请求、权限或业务结果。`}</P>
    <H2 id="purpose">{en ? "Design through relationships" : "从关系作设计判断"}</H2><P>{en ? "Name actions accurately, keep comparison data together, leave room for expression, and preserve context when a state changes. The methods guide decisions without requiring every product to look the same." : "名称与行动相符，比较内容同时在场，表达有可用空间，状态变化保留上下文。方法参与判断，不要求所有产品具有相同外观。"} <A href="/docs/design-philosophy">{en ? "Design philosophy" : "设计理念"}</A></P>
    <H2 id="start">{en ? "Start using components" : "开始使用"}</H2><P><A href="/docs/installation">{en ? "Install the library" : "安装组件库"}</A> · <A href="/docs/components">{en ? "Browse components" : "浏览组件"}</A> · <A href="/examples">{en ? "Try simple compositions" : "试用简单组合"}</A> · <A href="/docs/ai#project-rules">{en ? "Add project guidance" : "接入项目协作"}</A></P>
    <H2 id="license">{en ? "License and dependencies" : "许可与依赖"}</H2><P>{en ? "Qingye UI is distributed under the MIT license. Dependencies retain their own licenses. Current exports, types, and component documentation define the available API." : "Qingye UI 以 MIT 许可分发，依赖保留各自许可。可用 API 以当前导出、声明和组件文档为准。"}</P>
  </article>;
}
