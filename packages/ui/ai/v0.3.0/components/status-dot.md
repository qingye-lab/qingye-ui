# 状态点 StatusDot

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/status-dot
Source: packages/ui/src/components/status-dot.tsx
Source SHA-256: 8f8b0aea1b8692ed31c27fb99984d02a9aba51d58cac6abbb8e146834ed74da5

用一个小圆点加文字表示对象当前的状态，如设备在线、任务运行、服务告警。实时状态可加柔和的呼吸光环。

## Use and ownership
- 用一个小圆点加文字表示对象当前的状态，如设备在线、任务运行、服务告警。实时状态可加柔和的呼吸光环。
- Avoid: 不要让样式替代语义；空值、未知与零分别表达。
- Library: 当前导出和属性定义的基础交互、可访问语义与样式。
- Application: 数据、权限、动作范围、异步结果与持久化。

## Current exports
- StatusDot: function; owner status-dot; PASS; props: StatusDotProps
- statusDotIndicatorVariants: const; owner status-dot; UNVERIFIED
- StatusDotProps: interface; owner status-dot; PASS
- StatusDotSize: type; owner status-dot; PASS
- StatusDotStatus: type; owner status-dot; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- 优先写可见文字；只有在表格的状态列等上下文已经说明含义时才单独使用圆点。
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### StatusDot
圆点 + 可选的可见文字（children）。没有可见文字时输出只供读屏的状态名，颜色不会是唯一信息。
- status: "online" | "offline" | "warning" | "error" | "info" | "neutral"; default "neutral". 状态；分别对应成功、空心灰、警告、危险、信息、灰色。离线为空心圆，与中性灰在形状上也能区分。
- size: "sm" | "default" | "lg"; default "default". 圆点 6 / 8 / 10px；sm 同时使用 12px 文字。
- pulse: boolean; default false. 向外扩散的柔和光环，用于「正在发生」的状态。用户偏好减少动态效果时停止。
- label: string; default locale.statusLabel(status). 没有可见文字时的读屏文本。
- render: ReactElement | (props) => ReactElement. 替换外层 <span>。

## Keyboard

## Source examples
### 状态
Source: apps/docs/src/content/status-dot/demos/01-statuses.tsx
```tsx
import { StatusDot } from "@qingye/ui/components/status-dot";

export const meta = { title: "状态", description: "离线为空心圆，与中性灰在形状上也能区分。" };

export default function Demo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
      <StatusDot status="online">在线</StatusDot>
      <StatusDot status="offline">离线</StatusDot>
      <StatusDot status="warning">电量低</StatusDot>
      <StatusDot status="error">连接异常</StatusDot>
      <StatusDot status="info">升级中</StatusDot>
      <StatusDot status="neutral">未激活</StatusDot>
    </div>
  );
}
```

### 实时光环
Source: apps/docs/src/content/status-dot/demos/02-pulse.tsx
```tsx
import { StatusDot } from "@qingye/ui/components/status-dot";

export const meta = {
  title: "实时光环",
  description: "pulse 用于正在发生的状态；减少动态效果时只保留圆点。",
};

export default function Demo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
      <StatusDot pulse status="online">
        直播中
      </StatusDot>
      <StatusDot pulse status="info">
        正在同步
      </StatusDot>
      <StatusDot pulse status="error">
        告警未处理
      </StatusDot>
    </div>
  );
}
```

### 尺寸与仅圆点
Source: apps/docs/src/content/status-dot/demos/03-sizes.tsx
```tsx
import { StatusDot } from "@qingye/ui/components/status-dot";

export const meta = { title: "尺寸与仅圆点", description: "不写文字时组件输出读屏文本，例如「在线」。" };

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        <StatusDot size="sm" status="online">
          小
        </StatusDot>
        <StatusDot status="online">默认</StatusDot>
        <StatusDot size="lg" status="online">
          大
        </StatusDot>
      </div>
      <div className="flex items-center gap-4">
        <StatusDot size="sm" status="online" />
        <StatusDot status="warning" />
        <StatusDot size="lg" status="error" />
        <StatusDot label="打印机缺纸" status="warning" />
      </div>
    </div>
  );
}
```

### 表格中的状态列
Source: apps/docs/src/content/status-dot/demos/04-in-table.tsx
```tsx
import type { StatusDotStatus } from "@qingye/ui/components/status-dot";
import { StatusDot } from "@qingye/ui/components/status-dot";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@qingye/ui/components/table";

export const meta = { title: "表格中的状态列", description: "状态列让圆点和文字一起扫读。", flush: true };

const devices: { name: string; store: string; status: StatusDotStatus; label: string; seen: string }[] = [
  { name: "前台收银机", store: "徐汇店", status: "online", label: "在线", seen: "刚刚" },
  { name: "后厨打印机", store: "徐汇店", status: "warning", label: "缺纸", seen: "2 分钟前" },
  { name: "自助点餐屏", store: "静安店", status: "error", label: "连接异常", seen: "16 分钟前" },
  { name: "门口客流计", store: "静安店", status: "offline", label: "离线", seen: "3 天前" },
];

export default function Demo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="ps-4">设备</TableHead>
          <TableHead>门店</TableHead>
          <TableHead>状态</TableHead>
          <TableHead className="pe-4 text-end">最后上报</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {devices.map((device) => (
          <TableRow key={device.name}>
            <TableCell className="ps-4 font-medium">{device.name}</TableCell>
            <TableCell className="text-muted-foreground">{device.store}</TableCell>
            <TableCell>
              <StatusDot status={device.status}>{device.label}</StatusDot>
            </TableCell>
            <TableCell className="pe-4 text-end text-muted-foreground numeric">{device.seen}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

