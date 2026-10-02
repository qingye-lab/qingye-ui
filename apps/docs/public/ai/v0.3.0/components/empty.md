# 空状态 Empty

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/empty
Source: packages/ui/src/components/empty.tsx
Source SHA-256: 901c37ab8d8010d009552ba20e94c2780684e9fa9156fdacbc1fd08311794ff0

列表、表格或页面暂时没有内容时，说明原因并给出下一步。用于首次使用、筛选无结果和清空后的状态。

## Use and ownership
- 列表、表格或页面暂时没有内容时，说明原因并给出下一步。用于首次使用、筛选无结果和清空后的状态。
- Avoid: 不要让样式替代语义；空值、未知与零分别表达。
- Library: 当前导出和属性定义的基础交互、可访问语义与样式。
- Application: 数据、权限、动作范围、异步结果与持久化。

## Current exports
- Empty: function; owner empty; PASS; props: React.ComponentProps<"div">
- EmptyContent: function; owner empty; PASS; props: React.ComponentProps<"div">
- EmptyDescription: function; owner empty; PASS; props: React.ComponentProps<"p">
- EmptyHeader: function; owner empty; PASS; props: React.ComponentProps<"div">
- EmptyMedia: function; owner empty; PASS; props: React.ComponentProps<"div"> &
  VariantProps<typeof emptyMediaVariants>
- EmptyTitle: function; owner empty; PASS; props: React.ComponentProps<"div"> & { size?: EmptyTitleSize }
- EmptyTitleSize: type; owner empty; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Empty
根元素，居中纵向排列，默认上下留白 48px（≥768px 时 80px）。放进卡片或表格时用 className 收紧，如 py-10。

### EmptyHeader
包住插图、标题与说明，最大宽度 24rem。

### EmptyMedia
插图区。className 与其余属性只作用在外层包裹元素上；icon 变体中可见的图标方块带 data-slot="empty-media-content"，两侧是装饰用的倾斜副本。
- variant: "default" | "icon"; default "default". icon 把图标放进带边框的小方块并叠出两张倾斜卡片；default 不加修饰，适合放头像组或插画。

### EmptyTitle
一句话说明当前状态。默认 18px / 600；嵌在卡片或表格里时用 size="sm" 降到正文大小。
- size: "default" | "sm"; default "default". sm 使用正文大小，适合卡片、表格单元格等已有层级标题的容器。

### EmptyDescription
补充原因或下一步；内部的 <a> 自动带下划线。

### EmptyContent
操作区，放按钮、搜索框或链接，最大宽度 24rem。

## Keyboard

## Source examples
### 图标
Source: apps/docs/src/content/empty/demos/01-icon.tsx
```tsx
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@qingye/ui/components/empty";
import { FolderOpenIcon } from "lucide-react";

export const meta = { title: "图标", description: "variant=\"icon\" 把图标放进带边框的小方块，两侧叠出倾斜的卡片。" };

export default function Demo() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderOpenIcon aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>还没有项目</EmptyTitle>
        <EmptyDescription>项目用来组织代码仓库、环境变量和成员权限。</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
```

### 带操作
Source: apps/docs/src/content/empty/demos/02-actions.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@qingye/ui/components/empty";
import { BookOpenIcon, RocketIcon } from "lucide-react";

export const meta = { title: "带操作", description: "EmptyContent 放下一步操作：一个主要按钮，最多再配一个次要按钮。" };

export default function Demo() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <RocketIcon aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>还没有部署</EmptyTitle>
        <EmptyDescription>导入一个 Git 仓库，之后每次推送都会自动构建并部署。</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex flex-wrap justify-center gap-2">
          <Button size="sm">导入仓库</Button>
          <Button size="sm" variant="outline">
            <BookOpenIcon aria-hidden="true" />
            查看文档
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  );
}
```

### 头像组
Source: apps/docs/src/content/empty/demos/03-avatars.tsx
```tsx
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@qingye/ui/components/avatar";
import { Button } from "@qingye/ui/components/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@qingye/ui/components/empty";
import { SendIcon } from "lucide-react";

export const meta = { title: "头像组", description: "默认变体不加修饰，可以放头像组或插画。" };

export default function Demo() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <AvatarGroup>
            <Avatar size="lg">
              <AvatarImage alt="" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=faces" />
              <AvatarFallback>林</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarImage alt="" src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=96&h=96&fit=crop&crop=faces" />
              <AvatarFallback>周</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarFallback>陈</AvatarFallback>
            </Avatar>
          </AvatarGroup>
        </EmptyMedia>
        <EmptyTitle>#发布协调 还没有消息</EmptyTitle>
        <EmptyDescription>林晓雯、周子航和陈思远都在这里，打个招呼吧。</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">
          <SendIcon aria-hidden="true" />
          发送消息
        </Button>
      </EmptyContent>
    </Empty>
  );
}
```

### 在卡片中
Source: apps/docs/src/content/empty/demos/04-card.tsx
```tsx
import { Card, CardDescription, CardHeader, CardPanel, CardTitle } from "@qingye/ui/components/card";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@qingye/ui/components/empty";
import { BellIcon } from "lucide-react";

export const meta = { title: "在卡片中", description: "嵌在卡片里时收紧留白，标题降到 text-base。" };

export default function Demo() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="border-b">
        <CardTitle>待办</CardTitle>
        <CardDescription>需要你审批或回复的事项</CardDescription>
      </CardHeader>
      <CardPanel>
        <Empty className="px-0 py-8 md:py-10">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <BellIcon aria-hidden="true" />
            </EmptyMedia>
            <EmptyTitle size="sm">全部处理完了</EmptyTitle>
            <EmptyDescription>新的审批和评论会出现在这里。</EmptyDescription>
          </EmptyHeader>
        </Empty>
      </CardPanel>
    </Card>
  );
}
```

### 在表格中
Source: apps/docs/src/content/empty/demos/05-table.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@qingye/ui/components/empty";
import { Frame } from "@qingye/ui/components/frame";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@qingye/ui/components/table";

export const meta = {
  title: "在表格中",
  description: "表体放一行一格，colSpan 覆盖全部列；单元格默认不换行，要加 whitespace-normal。",
};

export default function Demo() {
  return (
    <Frame className="w-full">
      <Table variant="card">
        <TableHeader>
          <TableRow>
            <TableHead>订单号</TableHead>
            <TableHead>客户</TableHead>
            <TableHead>状态</TableHead>
            <TableHead className="text-end">金额</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={4} className="whitespace-normal">
              <Empty className="gap-4 px-4 py-10 md:py-10">
                <EmptyHeader>
                  <EmptyTitle size="sm">没有符合条件的订单</EmptyTitle>
                  <EmptyDescription>筛选条件：华东区 · 待付款 · 本月</EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Button size="sm" variant="outline">清除筛选</Button>
                </EmptyContent>
              </Empty>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Frame>
  );
}
```

### 搜索无结果
Source: apps/docs/src/content/empty/demos/06-search.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@qingye/ui/components/empty";
import { SearchInput } from "@qingye/ui/components/search-input";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

export const meta = { title: "搜索无结果", description: "标题带上关键词，并提供清除搜索的出口。" };

const devices = ["客厅网关 Mini", "智能门锁 S2", "温湿度传感器", "人体感应器", "智能插座 Pro"];

export default function Demo() {
  const [query, setQuery] = useState("摄像头");
  const results = devices.filter((device) => device.includes(query.trim()));

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <SearchInput aria-label="搜索设备" placeholder="搜索设备" value={query} onValueChange={setQuery} />
      {results.length > 0 ? (
        <ul className="divide-y rounded-xl border">
          {results.map((device) => (
            <li key={device} className="px-3 py-2.5 text-sm">
              {device}
            </li>
          ))}
        </ul>
      ) : (
        <Empty className="rounded-xl border border-dashed py-8 md:py-8">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <SearchIcon aria-hidden="true" />
            </EmptyMedia>
            <EmptyTitle size="sm">没有找到“{query}”</EmptyTitle>
            <EmptyDescription>换个关键词试试，或检查拼写。</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button size="sm" variant="outline" onClick={() => setQuery("")}>
              清除搜索
            </Button>
          </EmptyContent>
        </Empty>
      )}
    </div>
  );
}
```

