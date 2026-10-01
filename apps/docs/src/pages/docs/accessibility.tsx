import { Button } from "@yanqing/ui/components/button";
import { Checkbox } from "@yanqing/ui/components/checkbox";
import { Progress } from "@yanqing/ui/components/progress";
import { RotateCcwIcon } from "lucide-react";
import { Fragment, useId, useState } from "react";
import { A, Code, Facts, H2, H3, P, PageHeader, Ul } from "@/components/prose";

const CHECKLIST: { group: string; items: string[] }[] = [
  {
    group: "键盘",
    items: [
      "只用键盘能完成全部任务：Tab 到达每个控件，Enter / Space 触发，Esc 关闭浮层。",
      "焦点顺序与阅读顺序一致，没有跳到看不见的位置。",
      "每个可聚焦元素都有清晰可见的焦点环，深浅两种主题都能看清。",
      "打开弹窗后焦点进入弹窗，关闭后回到触发它的元素。",
    ],
  },
  {
    group: "名称与结构",
    items: [
      "仅图标的按钮带有 aria-label，装饰性图标带 aria-hidden。",
      "每个表单控件都有可见标签（Field + FieldLabel），错误信息与控件关联。",
      "页面有唯一的 h1，标题层级不跳级；导航区域有可区分的名称。",
      "<html lang> 与界面语言一致，内置文案语言与之匹配。",
    ],
  },
  {
    group: "视觉",
    items: [
      "正文对比度不低于 4.5:1，辅助文字与图形边界不低于 3:1，浅色与深色都验证过。",
      "状态不只靠颜色表达：同时有文字或图标。",
      "放大到 200% 或 390px 宽度时内容不被截断，也没有横向滚动。",
    ],
  },
  {
    group: "动效与反馈",
    items: [
      "开启“减少动态效果”后没有位移或缩放，状态变化仍可辨认。",
      "异步结果有可被读屏感知的反馈，例如通知或带 role=\"status\" 的区域。",
    ],
  },
];

const TOTAL = CHECKLIST.reduce((sum, group) => sum + group.items.length, 0);

function Checklist() {
  const [done, setDone] = useState<Set<string>>(new Set());
  const base = useId();
  const toggle = (key: string, checked: boolean) =>
    setDone((prev) => {
      const next = new Set(prev);
      if (checked) next.add(key);
      else next.delete(key);
      return next;
    });
  return (
    <div className="my-6 overflow-hidden rounded-xl border">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b bg-surface-subtle/60 px-4 py-3 dark:bg-surface/40">
        <Progress aria-label="核对进度" className="w-32 flex-none" max={TOTAL} value={done.size} />
        <span aria-live="polite" className="text-muted-foreground text-xs numeric">
          已核对 {done.size} / {TOTAL}
        </span>
        <Button className="ms-auto" disabled={!done.size} onClick={() => setDone(new Set())} size="xs" variant="ghost">
          <RotateCcwIcon aria-hidden="true" />
          清空
        </Button>
      </div>
      <div className="divide-y">
        {CHECKLIST.map((group, g) => (
          <fieldset className="m-0 border-0 px-4 py-4" key={group.group}>
            <legend className="float-start mb-3 w-full font-medium text-foreground-strong text-sm">{group.group}</legend>
            <ul className="clear-both flex flex-col gap-3">
              {group.items.map((item, i) => {
                const key = `${g}-${i}`;
                const id = `${base}-${key}`;
                return (
                  <li className="flex items-start gap-3" key={key}>
                    <Checkbox checked={done.has(key)} className="mt-0.5" id={id} onCheckedChange={(checked) => toggle(key, checked)} />
                    <label className="cursor-pointer text-pretty text-[0.875rem] text-foreground/90 leading-relaxed" htmlFor={id}>
                      {item}
                    </label>
                  </li>
                );
              })}
            </ul>
          </fieldset>
        ))}
      </div>
    </div>
  );
}

export default function AccessibilityPage() {
  return (
    <article>
      <PageHeader
        description="组件负责交互语义与键盘行为，应用负责名称、结构与内容。这一页说明两边各自的职责，并给出上线前的检查清单。"
        title="无障碍"
      />

      <H2 id="approach">做法</H2>
      <P>
        交互行为来自 <A href="https://base-ui.com">Base UI</A>，它按 <A href="https://www.w3.org/WAI/ARIA/apg/">WAI-ARIA APG</A>{" "}
        实现键盘交互、焦点管理与 ARIA 状态。组件库在此之上只加样式与少量组合，不重写、也不绕开这些行为：一个下拉菜单的方向键、首字母跳转与焦点回归，都与 Base UI 文档描述的一致。
      </P>
      <P>
        每个组件页列出它的键盘交互；视觉上的要求（对比度、焦点环、触控尺寸）写在组件规范里，并在浅色、深色、桌面与 390px 宽度下逐一目检。
      </P>

      <H2 id="built-in">组件已经处理的</H2>
      <Facts
        items={[
          { term: "键盘", detail: "菜单、选择器、标签页、滑块等复合控件支持方向键、Home / End 与类型跳转；Esc 关闭浮层。" },
          { term: "焦点", detail: "弹窗与抽屉打开时锁定焦点，关闭后归还给触发元素；焦点环统一用 focus-visible，只在键盘导航时出现。" },
          { term: "语义", detail: "角色、状态与关联（aria-expanded、aria-controls、aria-invalid 等）由原语维护；分页、面包屑、侧栏带有默认的可访问名称。" },
          { term: "触控", detail: "粗指针下，小于 44px 的独立控件通过 touch-target 扩大点击区，外观不变；列表行最小 44px。" },
          { term: "动效", detail: "遵循“减少动态效果”，并在键盘操作时跳过过渡。" },
          { term: "方向", detail: "只使用逻辑方向属性（ms / me / start / end），从右到左的界面无需改样式。" },
        ]}
      />

      <H2 id="your-part">需要你提供的</H2>
      <Ul>
        <li>
          仅图标按钮的 <Code>aria-label</Code>，以及 <Code>AvatarImage</Code> 等图片的替代文字。
        </li>
        <li>
          表单字段的标签：用 <Code>Field</Code> 包裹控件并放入 <Code>FieldLabel</Code>，标签与错误信息会自动关联。
        </li>
        <li>页面结构：唯一的 h1、按层级排列的标题、有名称的导航区域。</li>
        <li>
          不只靠颜色传达状态。例如把 <Code>Badge</Code> 的 success 变体与“已完成”这样的文字一起使用。
        </li>
        <li>
          与界面语言一致的 <Code>lang</Code> 属性，以及对应的内置文案，见 <A href="/docs/i18n">国际化</A>。
        </li>
      </Ul>

      <H2 id="checklist">检查清单</H2>
      <P>评审一个页面时逐项勾选。勾选状态只保存在当前页面里。</P>
      <Checklist />

      <H2 id="testing">如何测试</H2>
      <H3 id="testing-keyboard">键盘</H3>
      <P>拔掉鼠标走一遍主流程。留意焦点是否始终可见、是否会落到被遮挡的元素上、浮层关闭后焦点回到了哪里。</P>
      <H3 id="testing-sr">读屏软件</H3>
      <P>
        macOS 用 VoiceOver（<Code>⌘ F5</Code> 开启，<Code>⌃ ⌥ →</Code> 逐项浏览），Windows 用 NVDA。确认每个控件读出的名称、角色和状态都符合预期。
      </P>
      <H3 id="testing-visual">视觉与偏好</H3>
      <Ul>
        {[
          "在浅色与深色下各检查一次对比度。",
          "把浏览器缩放到 200%，再把窗口收窄到 390px。",
          "在开发者工具的 Rendering 面板中模拟“减少动态效果”与强制颜色。",
        ].map((text) => (
          <Fragment key={text}>
            <li>{text}</li>
          </Fragment>
        ))}
      </Ul>
    </article>
  );
}
