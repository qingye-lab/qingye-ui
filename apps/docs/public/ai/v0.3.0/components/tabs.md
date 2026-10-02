# 标签页 Tabs

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/tabs
Source: packages/ui/src/components/tabs.tsx
Source SHA-256: 1f6f008ff2167c241614596134b1039646212e09c3b51ffb7f22acd0a1e50b42

在同一位置切换几组相关内容，例如项目的概览、成员与设置。切换的是页面内的面板；跳转到不同地址请用导航链接。

## Use and ownership
- 在同一对象下切换几组有直接关系的内容面板，保留当前对象。
- Avoid: 地址跳转用链接；切换面板不能无意丢失未保存字段，也不能把未聚焦面板的控件留在键盘路径。
- Library: 管理 tablist、tab、tabpanel 关联、选中状态与键盘焦点；指示器只表达实际激活面板。
- Application: 决定面板数据、未保存内容、关闭清除政策及是否持久保留编辑。

## Composition
- Tab 与 Panel 使用同一 value；长列表可置于横向 ScrollArea，编辑面板按需求选择 keepMounted。

## Responsive behavior
- 横向列表保持可达，不通过换行破坏顺序；纵向方向与方向键一致，窄屏保留面板宽度。

## Customization
- default 与 underline 表达不同边界；指示器使用公共展开时长，尺寸与状态不依赖动画完成。

## Current exports
- Tabs: function; owner tabs; PASS; props: TabsPrimitive.Root.Props
- TabsContent: function; owner tabs; alias of TabsPanel; PASS; props: TabsPrimitive.Panel.Props
- TabsList: function; owner tabs; PASS; props: TabsPrimitive.List.Props & {
  size?: TabsSize;
  variant?: TabsVariant;
}
- TabsPanel: function; owner tabs; PASS; props: TabsPrimitive.Panel.Props
- TabsPrimitive: reexport; owner tabs; UNVERIFIED
- TabsSize: type; owner tabs; PASS
- TabsTab: function; owner tabs; PASS; props: TabsPrimitive.Tab.Props & {
  size?: TabsSize;
}
- TabsTrigger: function; owner tabs; alias of TabsTab; PASS; props: TabsPrimitive.Tab.Props & {
  size?: TabsSize;
}
- TabsVariant: type; owner tabs; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Tabs
根组件，管理当前选中的标签。
- value: any. 受控的当前值。
- defaultValue: any; default 0. 非受控时的初始值。
- onValueChange: (value, details) => void. 选中标签变化时调用。
- orientation: "horizontal" | "vertical"; default "horizontal". 排列方向；纵向时列表在左、面板在右，方向键改为上下。

### TabsList
标签容器，内含滑动的选中指示器。
- variant: "default" | "underline"; default "default". default 为分段底板加浮起滑块；underline 为下划线，适合页面级分区。
- size: "sm" | "default" | "lg"; default "default". 标签高度，移动端自动加高 4px。
- activateOnFocus: boolean; default false. 方向键移动焦点时是否立即切换面板。

### TabsTab
单个标签，别名 TabsTrigger。可放图标与计数。
- value: any. 与对应 TabsPanel 的 value 相同。
- disabled: boolean; default false. 禁用该标签。

### TabsPanel
标签对应的内容面板，别名 TabsContent。
- value: any. 与对应 TabsTab 的 value 相同。
- keepMounted: boolean; default false. 隐藏时是否保留在 DOM 中。

## Keyboard
- Tab: 焦点进入当前选中的标签，再按一次进入面板。
- ← / →: 在横向标签之间移动焦点（纵向时为 ↑ / ↓）。
- Home / End: 移动到第一个 / 最后一个标签。
- Enter / Space: 选中获得焦点的标签。

## Source examples
### 默认
Source: apps/docs/src/content/tabs/demos/01-default.tsx
```tsx
import { Tabs, TabsList, TabsPanel, TabsTab } from "@qingye/ui/components/tabs";

export const meta = { title: "默认" };

export default function Demo() {
  return (
    <Tabs className="w-full max-w-md" defaultValue="overview">
      <TabsList>
        <TabsTab value="overview">概览</TabsTab>
        <TabsTab value="members">成员</TabsTab>
        <TabsTab value="settings">设置</TabsTab>
      </TabsList>
      <TabsPanel className="rounded-lg border p-4 text-sm" value="overview">
        <p className="font-medium">青烟官网改版</p>
        <p className="mt-1 text-muted-foreground">本周完成 18 项任务，距离上线还有 6 天。</p>
      </TabsPanel>
      <TabsPanel className="rounded-lg border p-4 text-sm" value="members">
        <p className="font-medium">5 位成员</p>
        <p className="mt-1 text-muted-foreground">林晓、周舟、陈默、许诺、王一然。</p>
      </TabsPanel>
      <TabsPanel className="rounded-lg border p-4 text-sm" value="settings">
        <p className="font-medium">项目设置</p>
        <p className="mt-1 text-muted-foreground">可见范围：仅团队成员。</p>
      </TabsPanel>
    </Tabs>
  );
}
```

### 尺寸
Source: apps/docs/src/content/tabs/demos/02-sizes.tsx
```tsx
import { Tabs, TabsList, TabsTab } from "@qingye/ui/components/tabs";

export const meta = { title: "尺寸", description: "sm、default、lg 三档；移动端自动加高 4px。" };

const sizes = ["sm", "default", "lg"] as const;

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-4">
      {sizes.map((size) => (
        <Tabs defaultValue="day" key={size}>
          <TabsList size={size}>
            <TabsTab value="day">日</TabsTab>
            <TabsTab value="week">周</TabsTab>
            <TabsTab value="month">月</TabsTab>
            <TabsTab value="year">年</TabsTab>
          </TabsList>
        </Tabs>
      ))}
    </div>
  );
}
```

### 下划线
Source: apps/docs/src/content/tabs/demos/03-underline.tsx
```tsx
import { Tabs, TabsList, TabsPanel, TabsTab } from "@qingye/ui/components/tabs";

export const meta = {
  title: "下划线",
  description: "页面级分区用 underline，配合一条贯穿的底边。",
};

export default function Demo() {
  return (
    <Tabs className="w-full max-w-md" defaultValue="activity">
      <div className="border-b">
        <TabsList variant="underline">
          <TabsTab value="activity">动态</TabsTab>
          <TabsTab value="deployments">部署</TabsTab>
          <TabsTab value="logs">日志</TabsTab>
          <TabsTab value="analytics">分析</TabsTab>
        </TabsList>
      </div>
      <TabsPanel className="py-3 text-muted-foreground text-sm" value="activity">
        周舟 10 分钟前合并了「修复移动端导航遮挡」。
      </TabsPanel>
      <TabsPanel className="py-3 text-muted-foreground text-sm" value="deployments">
        生产环境最近一次部署于今天 14:32，耗时 48 秒。
      </TabsPanel>
      <TabsPanel className="py-3 text-muted-foreground text-sm" value="logs">
        过去 24 小时没有错误日志。
      </TabsPanel>
      <TabsPanel className="py-3 text-muted-foreground text-sm" value="analytics">
        本周访问 12,480 次，较上周增长 8%。
      </TabsPanel>
    </Tabs>
  );
}
```

### 纵向
Source: apps/docs/src/content/tabs/demos/04-vertical.tsx
```tsx
import { Tabs, TabsList, TabsPanel, TabsTab } from "@qingye/ui/components/tabs";

export const meta = { title: "纵向", description: "设置页常用；方向键改为上下。" };

const sections = [
  { value: "profile", label: "个人资料", text: "头像、昵称与个人简介。" },
  { value: "account", label: "账号与安全", text: "登录邮箱、密码与两步验证。" },
  { value: "notifications", label: "通知", text: "选择通过邮件或站内信接收哪些提醒。" },
];

export default function Demo() {
  return (
    <div className="grid w-full max-w-lg gap-8">
      <Tabs defaultValue="profile" orientation="vertical">
        <TabsList>
          {sections.map((s) => (
            <TabsTab key={s.value} value={s.value}>
              {s.label}
            </TabsTab>
          ))}
        </TabsList>
        {sections.map((s) => (
          <TabsPanel className="px-2 py-1.5 text-muted-foreground text-sm" key={s.value} value={s.value}>
            {s.text}
          </TabsPanel>
        ))}
      </Tabs>
      <Tabs defaultValue="account" orientation="vertical">
        <div className="border-s">
          <TabsList variant="underline">
            {sections.map((s) => (
              <TabsTab key={s.value} value={s.value}>
                {s.label}
              </TabsTab>
            ))}
          </TabsList>
        </div>
        {sections.map((s) => (
          <TabsPanel className="px-2 py-1.5 text-muted-foreground text-sm" key={s.value} value={s.value}>
            {s.text}
          </TabsPanel>
        ))}
      </Tabs>
    </div>
  );
}
```

### 图标、计数与禁用
Source: apps/docs/src/content/tabs/demos/05-icons-counts.tsx
```tsx
import { Tabs, TabsList, TabsTab } from "@qingye/ui/components/tabs";
import { ArchiveIcon, InboxIcon, SendIcon, Trash2Icon } from "lucide-react";

export const meta = {
  title: "图标、计数与禁用",
  description: "计数使用等宽数字；禁用的标签跳过键盘焦点。",
};

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <Tabs defaultValue="inbox">
        <TabsList>
          <TabsTab value="inbox">
            <InboxIcon />
            收件箱
            <span className="numeric text-muted-foreground text-xs">12</span>
          </TabsTab>
          <TabsTab value="sent">
            <SendIcon />
            已发送
          </TabsTab>
          <TabsTab disabled value="archive">
            <ArchiveIcon />
            归档
          </TabsTab>
        </TabsList>
      </Tabs>
      <Tabs defaultValue="inbox">
        <TabsList variant="underline">
          <TabsTab aria-label="收件箱" value="inbox">
            <InboxIcon />
          </TabsTab>
          <TabsTab aria-label="已发送" value="sent">
            <SendIcon />
          </TabsTab>
          <TabsTab aria-label="归档" value="archive">
            <ArchiveIcon />
          </TabsTab>
          <TabsTab aria-label="废纸篓" value="trash">
            <Trash2Icon />
          </TabsTab>
        </TabsList>
      </Tabs>
    </div>
  );
}
```

### 窄屏溢出
Source: apps/docs/src/content/tabs/demos/06-overflow.tsx
```tsx
import { ScrollArea } from "@qingye/ui/components/scroll-area";
import { Tabs, TabsList, TabsTab } from "@qingye/ui/components/tabs";

export const meta = {
  title: "窄屏溢出",
  description: "标签多时放进 ScrollArea 横向滚动，边缘渐隐提示还有内容。",
};

const channels = ["全部", "设计", "前端", "后端", "测试", "运维", "产品", "市场", "客服"];

export default function Demo() {
  return (
    <Tabs className="w-full max-w-sm" defaultValue="全部">
      <ScrollArea scrollFade>
        <div className="w-max min-w-full border-b">
          <TabsList variant="underline">
            {channels.map((name) => (
              <TabsTab key={name} value={name}>
                {name}
              </TabsTab>
            ))}
          </TabsList>
        </div>
      </ScrollArea>
    </Tabs>
  );
}
```

