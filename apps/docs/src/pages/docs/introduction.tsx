import { ArrowRightIcon } from "lucide-react";
import { Link } from "@/components/locale-link";
import { A, Callout, Code, Facts, H2, P, PageHeader } from "@/components/prose";
import { componentsByCategory } from "@/lib/nav";
import { components } from "@/lib/registry";

const principles = [
  {
    term: "精致",
    detail: "默认主题使用半透明边框和一线内高光，间距由令牌控制。",
  },
  {
    term: "一致",
    detail: "组件共用尺寸、圆角、状态和动效规则。已接入尺寸角色的控件在窄屏加高 4px，粗指针的命中目标单独设置。动作焦点与输入焦点分别控制；控件与面板使用各自的圆角角色，内高光圆角等于外层圆角减去边框宽度。",
  },
  {
    term: "可访问",
    detail: "Base UI 提供键盘交互、焦点管理与读屏语义，遵循 WAI-ARIA APG；使用这些原语的组件保留相应行为。",
  },
  {
    term: "可主题化",
    detail: "组件读取语义和组件令牌。品牌用 html[data-brand]，明暗由 ThemeProvider 默认切换类，密度用 data-density；覆盖有实际消费的角色，保持三个维度独立。",
  },
];

export default function IntroductionPage() {
  const categories = componentsByCategory().length;
  return (
    <article>
      <PageHeader title="介绍" />

      <H2 id="purpose">器用、关系与合宜</H2><P>给用户保留暂停操作、拒绝确认和改变选择的入口。Qingye UI 从中国传统思想、造物与艺术中借鉴方法。</P><P>用<A href="/docs/design-philosophy">六种方法</A>检查组件的名称、操作、空间与状态；同一方法不限定一种外观。先试用<A href="/docs/patterns">完整任务</A>，再查组件的状态与 API。</P>
      <H2 id="what">它是什么</H2>
      <P>
        <Code>@qingye/ui</Code> 是 React 组件库。组件依据 <A href="/design.md">design.md</A> 编写，样式基于 Tailwind CSS 4；需要键盘交互、焦点管理与 ARIA 状态时，使用 <A href="https://base-ui.com">Base UI</A> 的公共原语。
      </P>
      <P>
        组件可用于 React 19.2 应用，不发请求、不读路由，也不依赖会话。文档收录 {components.length} 个组件，分为 {categories}{" "}
        类；各组件页提供交互示例、导入方式、API 与键盘说明。
      </P>

      <H2 id="principles">设计原则</H2>
      <Facts items={principles} />

      <H2 id="lineage">设计与可访问行为</H2>
      <P>
        <Strong>Qingye UI</Strong> 依据设计指南确定组件语义、结构、状态与表达。组件实现由本库编写，具体 API 与可用能力以当前组件文档和类型为准。
      </P>
      <P>
        <Strong>Base UI</Strong> 提供无样式、可访问的原语：焦点管理、键盘交互、ARIA 状态与浮层定位。它以依赖的形式安装，基于它的组件同时导出原语命名空间（例如{" "}
        <Code>DialogPrimitive</Code>），需要更底层的控制时可以直接使用。
      </P>
      <Callout title="许可">
        Qingye UI 以 MIT 许可发布，许可正文随包分发。Base UI 等依赖保留各自的许可。
      </Callout>

      <H2 id="next">从这里开始</H2>
      <ul className="my-4 grid max-w-[42rem] gap-2 sm:grid-cols-3">
        {[
          { to: "/docs/installation", title: "安装", text: "接入样式与 Provider" },
          { to: "/docs/theming", title: "主题", text: "品牌色、圆角与深色" },
          { to: "/docs/components", title: "组件", text: "按类别浏览全部组件" },
        ].map((link) => (
          <li key={link.to}>
            <Link
              className="group focus-ring flex h-full flex-col gap-0.5 rounded-xl border px-4 py-3 transition-colors hover:bg-accent/60"
              to={link.to}
            >
              <span className="flex items-center gap-1 font-medium text-foreground-strong text-body">
                {link.title}
                <ArrowRightIcon aria-hidden="true" className="size-3.5 opacity-60 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="text-muted-foreground text-caption">{link.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}

function Strong({ children }: { children: string }) {
  return <strong className="font-medium text-foreground-strong">{children}</strong>;
}
