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
    detail: "尺寸、圆角、状态和动效共用一套规则：控件在移动端统一加高 4px，悬停、焦点、禁用与无效状态在每个组件里写法相同，嵌套圆角按“外层减间距”推算。",
  },
  {
    term: "可访问",
    detail: "键盘、焦点管理和读屏语义由 Base UI 提供，并按 WAI-ARIA APG 实现；组件不重写也不破坏这些行为。每个组件页都列出键盘交互。",
  },
  {
    term: "可主题化",
    detail: "组件只读取语义令牌。覆盖几个 --qy-* 变量就能更换品牌色、圆角与密度；深色模式是同一组名字的另一套取值，而不是另一套组件。",
  },
];

export default function IntroductionPage() {
  const categories = componentsByCategory().length;
  return (
    <article>
      <PageHeader
        description="一套面向中文产品的 React 组件库：可访问的交互原语、分层的设计令牌，以及仔细调校过的浅色与深色主题。"
        title="介绍"
      />

      <H2 id="what">它是什么</H2>
      <P>
        <Code>@yanqing/ui</Code> 以 <A href="https://base-ui.com">Base UI</A> 负责行为与无障碍，以 Tailwind CSS 4 负责样式。大部分组件改编自{" "}
        <A href="https://coss.com/ui">coss ui</A>，另有一批本地编写的组合组件，例如日期时间选择、文件上传、数据表格、步骤与树。
      </P>
      <P>
        组件只做界面：不发请求、不读路由、不依赖会话，可以放进任何 React 19 应用。目前文档收录了 {components.length} 个组件，分为 {categories}{" "}
        类，每个都有可交互的示例、导入方式、API 与键盘说明。
      </P>

      <H2 id="principles">设计原则</H2>
      <P>基调是“精致、耐看、不浮夸”。具体落到四条：</P>
      <Facts items={principles} />

      <H2 id="lineage">与 coss ui、Base UI 的关系</H2>
      <P>
        <Strong>coss ui</Strong> 是 Cal.com 团队基于 Base UI 的组件集。这里的改编尽量贴近上游：只为修复缺陷或满足组件规范而改动，每处改动都登记在{" "}
        <Code>coss-source.json</Code>，未修改的上游源码保存在 <Code>packages/ui/upstream/</Code>，作为比对基线。
      </P>
      <P>
        <Strong>Base UI</Strong> 提供无样式、可访问的原语：焦点管理、键盘交互、ARIA 状态与浮层定位。它以依赖的形式安装，基于它的组件同时导出原语命名空间（例如{" "}
        <Code>MenuPrimitive</Code>），需要更底层的控制时可以直接使用。
      </P>
      <Callout title="许可">
        Yanqing UI 以 MIT 许可发布。coss ui 与 Base UI 同为 MIT 许可；改编自 coss ui 的文件保留来源注释，版权声明收录在包内的{" "}
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
