import {
  Badge,
  Button,
  Menu,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuTrigger,
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  useMediaQuery,
} from "@yanqing/ui";
import { ChevronDownIcon, KeyboardIcon, MousePointer2Icon, RotateCcwIcon } from "lucide-react";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { CodeBlock } from "@/components/code-block";
import { A, Code, H2, P, PageHeader, Ul } from "@/components/prose";

function Stage({ children, caption }: { children: ReactNode; caption?: ReactNode }) {
  return (
    <figure className="my-5 overflow-hidden rounded-xl border">
      <div className="flex min-h-32 flex-wrap items-center justify-center gap-3 p-6 sm:p-8">{children}</div>
      {caption ? <figcaption className="border-t bg-surface-subtle/60 px-4 py-2.5 text-muted-foreground text-xs leading-relaxed dark:bg-surface/40">{caption}</figcaption> : null}
    </figure>
  );
}

function useInputModality() {
  const [mode, setMode] = useState<string | null>(null);
  useEffect(() => {
    const root = document.documentElement;
    const read = () => setMode(root.getAttribute("data-ui-input"));
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ["data-ui-input"] });
    return () => observer.disconnect();
  }, []);
  return mode;
}

/** Entry and exit drawn to scale, so "exit is faster" is visible rather than asserted. */
function Timeline() {
  const rows = [
    { label: "进入", token: "--qy-duration-fast", ms: 140 },
    { label: "退出", token: "--qy-duration-press", ms: 100 },
  ];
  return (
    <figure className="my-5 rounded-xl border p-4 sm:p-5">
      <div className="flex flex-col gap-3">
        {rows.map((row) => (
          <div className="grid grid-cols-[2.5rem_minmax(0,1fr)_3.5rem] items-center gap-3" key={row.label}>
            <span className="text-muted-foreground text-xs">{row.label}</span>
            <div className="h-2 rounded-full bg-foreground/6">
              <div className="h-full rounded-full bg-foreground/56" style={{ width: `${(row.ms / 200) * 100}%` }} />
            </div>
            <span className="text-end font-mono text-muted-foreground text-xs numeric">{row.ms}ms</span>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-muted-foreground text-xs">菜单与选择器浮层的进入和退出时长，按同一比例绘制。</figcaption>
    </figure>
  );
}

const fruits = [
  { label: "龙井", value: "longjing" },
  { label: "碧螺春", value: "biluochun" },
  { label: "铁观音", value: "tieguanyin" },
  { label: "白毫银针", value: "yinzhen" },
];

function StaggerDemo() {
  const [run, setRun] = useState(0);
  const items = ["同步设计令牌", "生成组件索引", "构建类型声明", "打包样式表", "写入发布说明"];
  return (
    <Stage
      caption={
        <>
          列表使用 <Code>data-motion="stagger"</Code>，每项通过 <Code>--qy-index</Code> 推迟 40ms，最多累计 8 项。
        </>
      }
    >
      <div className="flex w-full max-w-sm flex-col gap-3">
        <ul className="flex flex-col gap-1.5" data-motion="stagger" key={run}>
          {items.map((item, index) => (
            <li
              className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm"
              key={item}
              style={{ "--qy-index": index } as CSSProperties}
            >
              {item}
              <Badge variant="success">完成</Badge>
            </li>
          ))}
        </ul>
        <Button className="self-start" onClick={() => setRun((value) => value + 1)} size="sm" variant="outline">
          <RotateCcwIcon aria-hidden="true" />
          重播
        </Button>
      </div>
    </Stage>
  );
}

export default function MotionPage() {
  const modality = useInputModality();
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  return (
    <article>
      <PageHeader
        description="动效只用来说明状态的变化：短、缓出、随时可以被打断。全库的策略集中在 motion.css，组件不各自发明。"
        title="动效"
      />
      <P>
        <Code>motion.css</Code> 随 <Code>styles.css</Code> 一起引入，只补充全局或缺失的部分：按压反馈、选择器与菜单的入场、键盘即时与减少动态效果。组件自带的过渡保留上游调校，时长与缓动见{" "}
        <A href="/docs/tokens#motion">设计令牌</A>。
      </P>

      <H2 id="press">按压反馈</H2>
      <P>
        带 <Code>qy-pressable</Code> 类的元素在按下时缩到 0.97，用时 100ms，松开即回。<Code>Button</Code> 默认带有它；禁用、加载中的元素不缩放。
      </P>
      <Stage caption="按住按钮不放，能感到它轻微下沉；松手后立即复位。">
        <Button>主要操作</Button>
        <Button variant="outline">次要操作</Button>
        <Button loading variant="outline">
          加载中
        </Button>
      </Stage>

      <H2 id="popups">浮层从触发点展开</H2>
      <P>
        浮层以 <Code>origin-(--transform-origin)</Code> 为原点，从 <Code>scale-98</Code> 与透明开始展开，所以总是像从触发它的按钮里长出来。选择器和菜单上游没有入场动效，由{" "}
        <Code>motion.css</Code> 补上。
      </P>
      <Stage caption="分别打开菜单和选择器，注意它们从按钮所在的一侧展开。">
        <Menu>
          <MenuTrigger render={<Button variant="outline" />}>
            更多操作
            <ChevronDownIcon aria-hidden="true" />
          </MenuTrigger>
          <MenuPopup>
            <MenuItem>重命名</MenuItem>
            <MenuItem>复制链接</MenuItem>
            <MenuSeparator />
            <MenuItem variant="destructive">删除</MenuItem>
          </MenuPopup>
        </Menu>
        <Select defaultValue="longjing" items={fruits}>
          <SelectTrigger aria-label="选择茶类" className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            {fruits.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectPopup>
        </Select>
      </Stage>

      <H2 id="exit">退出比进入快</H2>
      <P>
        出现时给眼睛一点时间定位，消失时不该让人等。菜单与选择器以 140ms 进入、100ms 退出；动画进行中再次操作会从当前状态继续，而不是排队播放。
      </P>
      <Timeline />

      <H2 id="keyboard">键盘操作即时</H2>
      <P>
        反复按方向键时，每一步都不该等动画。<Code>MotionProvider</Code> 在 <Code>{"<html>"}</Code> 上记录最近一次输入来自键盘还是指针（
        <Code>data-ui-input</Code>），键盘输入期间，带 <Code>data-slot</Code> 的组件跳过过渡。
      </P>
      <Stage
        caption={
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
            当前输入方式：
            <Badge variant="outline">
              {modality === "keyboard" ? <KeyboardIcon aria-hidden="true" /> : <MousePointer2Icon aria-hidden="true" />}
              {modality === "keyboard" ? "键盘" : modality === "pointer" ? "指针" : "未启用 MotionProvider"}
            </Badge>
            用鼠标点选标签，指示条会滑动；按 Tab 聚焦后用方向键切换，它会直接跳到位。
          </span>
        }
      >
        <Tabs className="w-full max-w-sm" defaultValue="overview">
          <TabsList className="w-full">
            <TabsTab value="overview">概览</TabsTab>
            <TabsTab value="activity">动态</TabsTab>
            <TabsTab value="settings">设置</TabsTab>
          </TabsList>
          <TabsPanel className="px-1 pt-2 text-muted-foreground text-sm" value="overview">
            项目概况与关键指标。
          </TabsPanel>
          <TabsPanel className="px-1 pt-2 text-muted-foreground text-sm" value="activity">
            最近的提交与评论。
          </TabsPanel>
          <TabsPanel className="px-1 pt-2 text-muted-foreground text-sm" value="settings">
            成员、权限与通知。
          </TabsPanel>
        </Tabs>
      </Stage>

      <H2 id="reduced-motion">减少动态效果</H2>
      <P>
        系统开启“减少动态效果”后，位移和缩放全部取消，只保留透明度与颜色的变化，状态依然清楚；骨架屏闪光、通知抖动这类装饰性动画停止，加载指示继续转动，因为它在传达“仍在进行”。
      </P>
      <P className="text-[0.875rem] text-muted-foreground">
        当前系统设置：<Strong>{reduced ? "已开启减少动态效果" : "未开启"}</Strong>。在 Chrome 开发者工具的 Rendering 面板中可以模拟这一设置。
      </P>

      <H2 id="helpers">进场辅助</H2>
      <P>页面内容在导航或数据加载后出现时，可以借用三个属性，而不必自己写关键帧：</P>
      <Ul>
        <li>
          <Code>data-motion="fade-in"</Code>：原地淡入，用于行内反馈。
        </li>
        <li>
          <Code>data-motion="rise-in"</Code>：淡入并上移 4px，用于新出现的区块。
        </li>
        <li>
          <Code>data-motion="stagger"</Code>：子元素依次上移淡入，配合 <Code>--qy-index</Code>。
        </li>
      </Ul>
      <StaggerDemo />
      <CodeBlock
        code={`<ul data-motion="stagger">\n  {items.map((item, index) => (\n    <li key={item.id} style={{ "--qy-index": index }}>{item.title}</li>\n  ))}\n</ul>`}
      />

      <H2 id="rules">编写组件时的约定</H2>
      <Ul>
        <li>时长只用令牌：按压 100ms，反馈 140ms，展开与滑动 220ms，抽屉 450ms 配合 <Code>--qy-ease-drawer</Code>。</li>
        <li>缓动默认 <Code>--qy-ease-out</Code>，不使用回弹；通知的成功脉冲是唯一例外。</li>
        <li>
          只动画 <Code>opacity</Code>、<Code>scale</Code>、<Code>translate</Code>、颜色与必要的 <Code>height</Code>，不动画会引起布局抖动的宽度和位置（指示条除外）。
        </li>
        <li>
          程序触发、不该有过渡的变化，在元素上加 <Code>data-instant</Code>。
        </li>
        <li>键盘即时与减少动态效果由 motion.css 统一处理，组件内不要重复实现。</li>
      </Ul>
    </article>
  );
}

function Strong({ children }: { children: ReactNode }) {
  return <strong className="font-medium text-foreground-strong">{children}</strong>;
}
