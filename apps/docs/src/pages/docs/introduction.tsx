import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { A, Callout, Code, Facts, H2, P, PageHeader } from "@/components/prose";
import { componentsByCategory } from "@/lib/nav";
import { components } from "@/lib/registry";

const principles = [
  {
    term: "精致",
    detail: "层次来自半透明边框、一线内高光和准确的间距，而不是大面积色块、重阴影或装饰性动画。细节在第二眼才被注意到，也经得起每天看。",
  },
  {
    term: "一致",
    detail: "尺寸、圆角、状态和动效共用一套规则：已接入尺寸角色的控件在窄屏加高4px，粗指针命中目标独立；动作与输入焦点分别控制，控件与面板圆角各有角色，内高光按外层减边框推算。",
  },
  {
    term: "可访问",
    detail: "键盘、焦点管理和读屏语义由 Base UI 提供，并按 WAI-ARIA APG 实现；组件不重写也不破坏这些行为。每个组件页都列出键盘交互。",
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
      <PageHeader
        description="从人的目的出发，组织名称、关系、空间与状态的 React 公共组件库。"
        title="介绍"
      />

      <H2 id="purpose">器用、关系与合宜</H2><P>阅读、表达、比较与判断是目的，暂停、拒绝和改变决定也同样正常。Qingye UI 从中国传统思想、造物与艺术中借鉴方法，让文化参与命名、操作、空间与状态变化的判断。</P><P><A href="/docs/design-philosophy">六种方法</A>影响具体决定，同一方法可以形成不同面貌。先操作<A href="/docs/patterns">完整任务</A>，再查当前组件事实。</P>
      <H2 id="what">它是什么</H2>
      <P>
        <Code>@qingye/ui</Code> 以 <A href="https://base-ui.com">Base UI</A> 负责行为与无障碍，以 Tailwind CSS 4 负责样式。大部分组件改编自{" "}
        <A href="https://coss.com/ui">coss ui</A>，另有一批本地编写的组合组件，例如日期时间选择、文件上传、数据表格、步骤与树。
      </P>
      <P>
        组件只做界面：不发请求、不读路由、不依赖会话，可以放进任何 React 19 应用。目前文档收录了 {components.length} 个组件，分为 {categories}{" "}
        类，每个都有可交互的示例、导入方式、API 与键盘说明。
      </P>

      <H2 id="principles">设计原则</H2>
      <P>方法落实到可理解的命名、完整状态与合适表达，也需要这些实现基础：</P>
      <Facts items={principles} />

      <H2 id="lineage">与 coss ui、Base UI 的关系</H2>
      <P>
        <Strong>coss ui</Strong> 是 Cal.com 团队基于 Base UI 的组件集。当前实现保留了来自上游的部件与来源记录，按实际任务和公共规范调整；必要时可以重新设计共享外观和组合。已有改编记录在{" "}
        <Code>coss-source.json</Code>，未修改的上游源码保存在 <Code>packages/ui/upstream/</Code>，作为比对基线。
      </P>
      <P>
        <Strong>Base UI</Strong> 提供无样式、可访问的原语：焦点管理、键盘交互、ARIA 状态与浮层定位。它以依赖的形式安装，基于它的组件同时导出原语命名空间（例如{" "}
        <Code>MenuPrimitive</Code>），需要更底层的控制时可以直接使用。
      </P>
      <Callout title="许可">
        Qingye UI 以 MIT 许可发布。coss ui 与 Base UI 同为 MIT 许可；改编自 coss ui 的文件保留来源注释，版权声明收录在包内的{" "}
        <Code>THIRD_PARTY_NOTICES.md</Code>。
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
              <span className="flex items-center gap-1 font-medium text-foreground-strong text-sm">
                {link.title}
                <ArrowRightIcon aria-hidden="true" className="size-3.5 opacity-60 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="text-muted-foreground text-xs">{link.text}</span>
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
