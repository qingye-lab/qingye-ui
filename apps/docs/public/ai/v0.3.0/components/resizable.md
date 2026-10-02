# 可调整面板 Resizable

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/resizable
Source: packages/ui/src/components/resizable.tsx
Source SHA-256: 1e25c2186ee6fed17254542a1b4864d4314de415d6a1286bacc37546439ccf6c

用拖动分隔条调整相邻面板的大小，适合文件浏览、编辑器、对比视图等多栏工作区。支持横向、纵向、嵌套、最小 / 最大尺寸与折叠，无第三方依赖。

## Use and ownership
- 编辑、浏览与比较需要共享空间，并允许人调整工作面比例。
- Avoid: 收起到零仍能 Tab 进入隐藏字段；折叠卸载草稿；手机只能拖线到达内容；互相矛盾的 min/max。
- Library: 分配/约束/折叠几何、分隔条键盘、零尺寸退场。
- Application: 布局持久化、草稿、面板任务和响应式替代组合。

## Composition
- Panel 保留内容 DOM，零尺寸暂时 inert；非零图标栏仍可用。Handle 提供键盘伸缩，应用提供窄屏替代入口。

## Responsive behavior
- 窄屏使用堆叠或 Tabs，切换仍保留工作；最小百分比需结合实际容器像素容量判断。

## Customization
- minSize/maxSize/collapsedSize 描述可行约束；panelRef 在真实操作中恢复原有工作面。

## Current exports
- ResizableDirection: type; owner resizable; PASS
- ResizableHandle: function; owner resizable; PASS; props: ResizableHandleProps
- ResizableHandleProps: interface; owner resizable; PASS
- ResizablePanel: function; owner resizable; PASS; props: ResizablePanelProps
- ResizablePanelGroup: function; owner resizable; PASS; props: ResizablePanelGroupProps
- ResizablePanelGroupProps: interface; owner resizable; PASS
- ResizablePanelHandle: interface; owner resizable; PASS
- ResizablePanelProps: interface; owner resizable; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### ResizablePanelGroup
面板与分隔条的容器，填满父元素；尺寸以百分比计算，总和恒为 100。
- direction: "horizontal" | "vertical"; default "horizontal". horizontal 左右排列，vertical 上下排列。
- onLayout: (sizes: number[]) => void. 布局变化时回调各面板百分比，可用于持久化。拖动时会连续触发。
- keyboardStep: number; default 5. 方向键每次移动的百分比。

### ResizablePanel
一个面板，超出部分裁切；内容的内边距写在子元素上。
- defaultSize: number. 初始百分比；未设置的面板平分剩余空间。
- minSize / maxSize: number; default 0 / 100. 百分比约束。拖到最小值后，再拖动会依次压缩更远的面板。
- collapsible: boolean; default false. 拖过最小值的一半时收起到 collapsedSize。
- collapsedSize: number; default 0. 收起后的百分比。
- onResize / onCollapse / onExpand: (size) => void / () => void. 尺寸变化、收起、展开时回调。
- panelRef: Ref<{ collapse; expand; resize; getSize; isCollapsed }>. 命令式控制，例如用按钮切换侧栏。

### ResizableHandle
分隔条，role="separator"，可聚焦。悬停与拖动时线条加深，光标在到达边界时提示可移动方向。
- withHandle: boolean; default false. 在线条中部显示握把。
- disabled: boolean; default false. 禁止拖动与键盘调整。
- aria-label: string; default “调整大小”. 分隔条的无障碍名称；有多个分隔条时建议分别命名。

## Keyboard
- ← / →: 横向分组中移动分隔条（RTL 下方向相反）。
- ↑ / ↓: 纵向分组中移动分隔条。
- Home / End: 让分隔条前面的面板缩到最小 / 放到最大。
- Enter: 收起或恢复相邻的可折叠面板。

## Source examples
### 基础用法
Source: apps/docs/src/content/resizable/demos/01-basic.tsx
```tsx
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@qingye/ui/components/resizable";
import { FileTextIcon, FolderIcon } from "lucide-react";

export const meta = { title: "基础用法", description: "拖动中间的分隔条，或聚焦后用方向键调整。" };

const files = ["季度复盘.md", "品牌规范.pdf", "首页改版.fig", "用户访谈纪要.docx"];

export default function Demo() {
  return (
    <div className="h-64 w-full max-w-2xl overflow-hidden rounded-xl border">
      <ResizablePanelGroup>
        <ResizablePanel defaultSize={34} maxSize={60} minSize={22}>
          <div className="flex h-full flex-col gap-0.5 p-2">
            <p className="flex items-center gap-2 px-2 py-1.5 font-medium text-muted-foreground text-xs">
              <FolderIcon aria-hidden="true" className="size-3.5" />
              设计资料
            </p>
            {files.map((file, index) => (
              <div
                className={`flex items-center gap-2 truncate rounded-md px-2 py-1.5 text-sm ${index === 0 ? "bg-accent font-medium" : "text-muted-foreground"}`}
                key={file}
              >
                <FileTextIcon aria-hidden="true" className="size-4 shrink-0 opacity-72" />
                <span className="truncate">{file}</span>
              </div>
            ))}
          </div>
        </ResizablePanel>
        <ResizableHandle aria-label="调整文件列表宽度" withHandle />
        <ResizablePanel>
          <article className="flex h-full flex-col gap-2 overflow-auto p-5">
            <h3 className="font-semibold text-sm">季度复盘</h3>
            <p className="text-muted-foreground text-sm text-pretty">
              本季度新用户留存提升 6.4%，主要来自引导流程的简化。下季度重点关注付费转化与团队协作功能的渗透率。
            </p>
          </article>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
```

### 纵向
Source: apps/docs/src/content/resizable/demos/02-vertical.tsx
```tsx
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@qingye/ui/components/resizable";

export const meta = { title: "纵向", description: "direction=\"vertical\" 上下排列，外层需要确定的高度。" };

export default function Demo() {
  return (
    <div className="h-72 w-full max-w-2xl overflow-hidden rounded-xl border">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={64} minSize={30}>
          <pre className="h-full overflow-auto p-4 font-mono text-xs leading-relaxed">
            <code>{`export async function loadReport(id: string) {
  const response = await fetch(\`/api/reports/\${id}\`);
  if (!response.ok) throw new Error("报表加载失败");
  return response.json();
}`}</code>
          </pre>
        </ResizablePanel>
        <ResizableHandle aria-label="调整终端高度" />
        <ResizablePanel minSize={18}>
          <div className="flex h-full flex-col gap-1 overflow-auto bg-muted/48 p-4 font-mono text-muted-foreground text-xs">
            <span>$ pnpm test</span>
            <span className="text-success-foreground">✓ 42 项测试通过（1.8 秒）</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
```

### 多栏与嵌套
Source: apps/docs/src/content/resizable/demos/03-nested.tsx
```tsx
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@qingye/ui/components/resizable";

export const meta = {
  title: "多栏与嵌套",
  description: "三栏布局中嵌套纵向分组。拖到最小值后继续拖动，会依次压缩更远的面板。",
};

function Pane({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="flex h-full flex-col justify-between gap-2 p-3">
      <span className="font-medium text-sm">{title}</span>
      <span className="truncate text-muted-foreground text-xs">{hint}</span>
    </div>
  );
}

export default function Demo() {
  return (
    <div className="h-80 w-full max-w-3xl overflow-hidden rounded-xl border">
      <ResizablePanelGroup>
        <ResizablePanel defaultSize={22} minSize={14}>
          <Pane hint="最小 14%" title="资源管理器" />
        </ResizablePanel>
        <ResizableHandle aria-label="调整资源管理器宽度" />
        <ResizablePanel defaultSize={56} minSize={30}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={70} minSize={25}>
              <Pane hint="最小 30%" title="编辑器" />
            </ResizablePanel>
            <ResizableHandle aria-label="调整终端高度" />
            <ResizablePanel minSize={15}>
              <Pane hint="最小 15%" title="终端" />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle aria-label="调整大纲宽度" />
        <ResizablePanel minSize={12}>
          <Pane hint="最小 12%" title="大纲" />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
```

### 可折叠与命令式控制
Source: apps/docs/src/content/resizable/demos/04-collapsible.tsx
```tsx
import { ResizablePanel } from "@qingye/ui/components/resizable";
import { Button } from "@qingye/ui/components/button";
import { ResizableHandle, ResizablePanelGroup } from "@qingye/ui/components/resizable";
import { type ResizablePanelHandle } from "@qingye/ui";
import { HashIcon, PanelLeftCloseIcon, PanelLeftOpenIcon } from "lucide-react";
import { useRef, useState } from "react";

export const meta = {
  title: "可折叠与命令式控制",
  description: "拖过最小宽度的一半即收起为图标栏，也可以聚焦分隔条按 Enter，或通过 panelRef 用按钮切换。",
};

const channels = ["产品讨论", "设计评审", "发布计划", "客户反馈"];

export default function Demo() {
  const sidebar = useRef<ResizablePanelHandle>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [sizes, setSizes] = useState<number[]>([]);

  return (
    <div className="flex w-full max-w-2xl flex-col gap-3">
      <div className="h-64 overflow-hidden rounded-xl border">
        <ResizablePanelGroup onLayout={setSizes}>
          <ResizablePanel
            collapsedSize={9}
            collapsible
            defaultSize={30}
            maxSize={45}
            minSize={20}
            onCollapse={() => setCollapsed(true)}
            onExpand={() => setCollapsed(false)}
            panelRef={sidebar}
          >
            <nav aria-label="频道" className="flex h-full flex-col gap-0.5 bg-muted/40 p-2">
              {channels.map((channel, index) => (
                <span
                  className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm ${collapsed ? "justify-center" : ""} ${index === 1 ? "bg-accent font-medium text-foreground" : "text-muted-foreground"}`}
                  key={channel}
                  title={collapsed ? channel : undefined}
                >
                  <HashIcon aria-hidden="true" className="size-3.5 shrink-0 opacity-72" />
                  {collapsed ? <span className="sr-only">{channel}</span> : <span className="truncate">{channel}</span>}
                </span>
              ))}
            </nav>
          </ResizablePanel>
          <ResizableHandle aria-label="调整频道列表宽度" withHandle />
          <ResizablePanel minSize={40}>
            <div className="flex h-full flex-col gap-3 p-3">
              <div className="flex items-center gap-2">
                <Button
                  aria-label={collapsed ? "展开频道列表" : "收起频道列表"}
                  onClick={() => (collapsed ? sidebar.current?.expand() : sidebar.current?.collapse())}
                  size="icon-sm"
                  variant="ghost"
                >
                  {collapsed ? <PanelLeftOpenIcon /> : <PanelLeftCloseIcon />}
                </Button>
                <span className="font-medium text-sm"># 设计评审</span>
              </div>
              <p className="text-muted-foreground text-sm text-pretty">
                周四下午三点评审新版结算页，请提前在原型中留下批注。
              </p>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <p className="text-muted-foreground text-xs numeric">
        当前布局：{sizes.map((size) => `${Math.round(size)}%`).join(" / ")}
      </p>
    </div>
  );
}
```

### 收起与继续编辑
Source: apps/docs/src/content/resizable/demos/05-draft.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Label } from "@qingye/ui/components/label";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup, type ResizablePanelHandle } from "@qingye/ui/components/resizable";
import { Textarea } from "@qingye/ui/components/textarea";
import { useRef, useState } from "react";

export const meta = { title: "收起与继续编辑" };

export default function Demo() {
  const editor = useRef<ResizablePanelHandle>(null);
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <Button onClick={() => collapsed ? editor.current?.expand() : editor.current?.collapse()} size="sm" variant="outline">
        {collapsed ? "继续编辑" : "收起编辑区"}
      </Button>
      <ResizablePanelGroup className="h-64 overflow-hidden rounded-xl border">
        <ResizablePanel collapsible defaultSize={55} minSize={30} onCollapse={() => setCollapsed(true)} onExpand={() => setCollapsed(false)} panelRef={editor}>
          <div className="flex h-full flex-col gap-2 p-3">
            <Label htmlFor="panel-draft">发布草稿</Label>
            <Textarea className="min-h-0 flex-1" defaultValue="本次发布改善了窄屏阅读。" id="panel-draft" />
          </div>
        </ResizablePanel>
        <ResizableHandle aria-label="调整编辑区宽度" />
        <ResizablePanel minSize={30}>
          <div className="p-3 text-sm">版本 0.3.0<br />发布前需要完成复核。</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
```

