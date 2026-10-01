import {
  Button,
  ResizableHandle,
  ResizablePanel,
  type ResizablePanelHandle,
  ResizablePanelGroup,
} from "@yanqing/ui";
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
