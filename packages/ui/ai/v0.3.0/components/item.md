# 条目 Item

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/item
Source: packages/ui/src/components/item.tsx
Source SHA-256: 5afb00639ed6638497b7bbb2e3fae841c553e475dc74636a9b17b7d8f02406b3

由媒体、标题、描述和操作组成的一行内容，用于成员列表、设置项、文件、通知等。API 与 shadcn/ui 的 Item 一致。

## Use and ownership
- 在列表中同时识别对象、读取摘要与执行针对该对象的操作。
- Avoid: 整行链接内再放按钮；两行截断隐藏关键后果；ItemGroup 的视觉列表没有实际 listitem 关系。
- Library: 媒体/摘要/动作部位、可样式化列表结构与焦点外观。
- Application: 对象名称、导航、动作权限、摘要完整性和结果。

## Composition
- Content 和 Actions 分工；整行导航用链接，独立动作保留原生控件。自定义 render 保留原生列表或显式 listitem。

## Responsive behavior
- 窄屏让动作换行；必要完整说明覆盖 line-clamp-2，避免长名称把恢复动作推出工作面。

## Customization
- variant 选择边界；size 调整关系间距，真实标题通过 render 定义层级。

## Current exports
- Item: function; owner item; PASS; props: ItemProps
- ItemActions: function; owner item; PASS; props: useRender.ComponentProps<"div">
- ItemContent: function; owner item; PASS; props: useRender.ComponentProps<"div">
- ItemDescription: function; owner item; PASS; props: useRender.ComponentProps<"p">
- ItemFooter: function; owner item; PASS; props: useRender.ComponentProps<"div">
- ItemGroup: function; owner item; PASS; props: useRender.ComponentProps<"div">
- ItemHeader: function; owner item; PASS; props: useRender.ComponentProps<"div">
- ItemMedia: function; owner item; PASS; props: ItemMediaProps
- ItemMediaProps: interface; owner item; PASS
- itemMediaVariants: const; owner item; UNVERIFIED
- ItemProps: interface; owner item; PASS
- ItemSeparator: function; owner item; PASS; props: React.ComponentProps<typeof Separator>
- ItemTitle: function; owner item; PASS; props: useRender.ComponentProps<"div">
- itemVariants: const; owner item; UNVERIFIED

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### ItemGroup
条目列表，role="list"；其中未设置 render 的 Item 自动成为 listitem。默认无间距，配合 ItemSeparator 或 gap-* 使用。

### Item
一行条目。通过 render 渲染为链接或按钮后获得悬停与键盘焦点样式。
- variant: "default" | "outline" | "muted"; default "default". default 透明；outline 为带内高光的卡片面；muted 为浅底。
- size: "default" | "sm"; default "default". 内边距 16px / 10×12px；sm 在粗指针下最低 44px。
- render: ReactElement | (props) => ReactElement. 例如 render={<a href="…" />}。

### ItemMedia
左侧媒体；有描述时自动顶部对齐。
- variant: "default" | "icon" | "avatar" | "image"; default "default". icon：带边框的小方块；avatar：对齐 Avatar；image：裁切缩略图并加发丝边。

### ItemContent
标题与描述的纵向容器，占据剩余宽度。

### ItemTitle
标题，500 字重，可并排放 Badge。

### ItemDescription
描述，弱化色，最多两行。

### ItemActions
右侧操作区。

### ItemHeader / ItemFooter
占满整行的上方 / 下方区域，用于封面图、元信息。

### ItemSeparator
条目间的分隔线。

## Keyboard
- Tab: 聚焦渲染为链接或按钮的条目，或条目内的操作。
- Enter: 打开链接条目。

## Source examples
### 样式
Source: apps/docs/src/content/item/demos/01-variants.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@qingye/ui/components/item";
import { BellRingIcon, ShieldCheckIcon, WalletIcon } from "lucide-react";

export const meta = { title: "样式", description: "default 透明、outline 卡片面、muted 浅底。" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <Item>
        <ItemMedia variant="icon">
          <BellRingIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>告警通知</ItemTitle>
          <ItemDescription>设备离线超过 10 分钟时，通过短信与企业微信通知店长。</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="outline">
            设置
          </Button>
        </ItemActions>
      </Item>
      <Item variant="outline">
        <ItemMedia variant="icon">
          <ShieldCheckIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>两步验证</ItemTitle>
          <ItemDescription>登录后台时需要输入手机验证码。</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="outline">
            管理
          </Button>
        </ItemActions>
      </Item>
      <Item variant="muted">
        <ItemMedia variant="icon">
          <WalletIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>结算账户</ItemTitle>
          <ItemDescription>招商银行 · 尾号 0937，每周一自动结算。</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="ghost">
            更换
          </Button>
        </ItemActions>
      </Item>
    </div>
  );
}
```

### 可点击与尺寸
Source: apps/docs/src/content/item/demos/02-link.tsx
```tsx
import { Badge } from "@qingye/ui/components/badge";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@qingye/ui/components/item";
import { ChevronRightIcon, FileTextIcon, StoreIcon } from "lucide-react";

export const meta = {
  title: "可点击与尺寸",
  description: "render 渲染为链接后获得悬停底色与键盘焦点环；sm 用于紧凑列表。",
};

export default function Demo() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <Item render={<a href="#store" />} variant="outline">
        <ItemMedia variant="icon">
          <StoreIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>
            徐汇漕溪北路店
            <Badge variant="success">营业中</Badge>
          </ItemTitle>
          <ItemDescription>今日订单 286 单 · 3 台设备在线</ItemDescription>
        </ItemContent>
        <ItemActions>
          <ChevronRightIcon aria-hidden="true" className="size-4 text-muted-foreground" />
        </ItemActions>
      </Item>
      <Item render={<a href="#report" />} size="sm" variant="outline">
        <ItemMedia>
          <FileTextIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>9 月经营月报.pdf</ItemTitle>
        </ItemContent>
        <ItemActions className="text-muted-foreground text-xs numeric">2.4 MB</ItemActions>
      </Item>
      <Item render={<a href="#invoice" />} size="sm">
        <ItemMedia>
          <FileTextIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>2026 年第三季度发票汇总.xlsx</ItemTitle>
        </ItemContent>
        <ItemActions className="text-muted-foreground text-xs numeric">186 KB</ItemActions>
      </Item>
    </div>
  );
}
```

### 成员列表
Source: apps/docs/src/content/item/demos/03-group.tsx
```tsx
import { Avatar, AvatarFallback } from "@qingye/ui/components/avatar";
import { Badge } from "@qingye/ui/components/badge";
import { Button } from "@qingye/ui/components/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@qingye/ui/components/card";
import { ItemGroup, Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemSeparator, ItemTitle } from "@qingye/ui/components/item";
import { XIcon } from "lucide-react";
import { Fragment } from "react";

export const meta = { title: "成员列表", description: "ItemGroup + ItemSeparator 组成列表；操作按钮的 aria-label 写明对象。" };

const members = [
  { name: "林嘉怡", initials: "林", email: "linjiayi@qingye.example", role: "店长" },
  { name: "周子航", initials: "周", email: "zhouzihang@qingye.example", role: "收银" },
  { name: "陈思远", initials: "陈", email: "chensiyuan@qingye.example", role: "后厨" },
];

export default function Demo() {
  return (
    <Card className="w-full max-w-lg gap-0">
      <CardHeader>
        <CardTitle>门店成员</CardTitle>
        <CardDescription>徐汇漕溪北路店 · 3 人</CardDescription>
      </CardHeader>
      <ItemGroup className="px-2 pb-2">
        {members.map((member, index) => (
          <Fragment key={member.email}>
            {index > 0 ? <ItemSeparator className="mx-2 data-[orientation=horizontal]:w-auto" /> : null}
            <Item size="sm">
              <ItemMedia variant="avatar">
                <Avatar>
                  <AvatarFallback>{member.initials}</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>
                  {member.name}
                  {index === 0 ? <Badge variant="secondary">{member.role}</Badge> : null}
                </ItemTitle>
                <ItemDescription className="truncate">{member.email}</ItemDescription>
              </ItemContent>
              <ItemActions>
                {index === 0 ? null : (
                  <Button aria-label={`移除 ${member.name}`} size="icon-sm" variant="ghost">
                    <XIcon />
                  </Button>
                )}
              </ItemActions>
            </Item>
          </Fragment>
        ))}
      </ItemGroup>
    </Card>
  );
}
```

### 缩略图、页眉与页脚
Source: apps/docs/src/content/item/demos/04-media.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemHeader, ItemMedia, ItemTitle } from "@qingye/ui/components/item";
import { MapPinIcon } from "lucide-react";

export const meta = {
  title: "缩略图、页眉与页脚",
  description: "image 媒体裁切缩略图；ItemHeader / ItemFooter 占满整行。",
};

const thumb = (hue: number) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="oklch(0.86 0.06 ${hue})"/><stop offset="1" stop-color="oklch(0.66 0.1 ${hue + 30})"/></linearGradient></defs><rect width="80" height="80" fill="url(#g)"/></svg>`,
  )}`;

export default function Demo() {
  return (
    <div className="grid w-full items-start gap-4 sm:grid-cols-2">
      <Item variant="outline">
        <ItemMedia variant="image">
          <img alt="" src={thumb(40)} />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>生椰拿铁</ItemTitle>
          <ItemDescription>本月销量 4,218 杯</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemHeader>
          <img alt="" className="aspect-[16/7] w-full rounded-lg object-cover" src={thumb(200)} />
        </ItemHeader>
        <ItemContent>
          <ItemTitle>静安南京西路店</ItemTitle>
          <ItemDescription>计划 10 月 18 日开业，设备已到店 6 / 8 台。</ItemDescription>
        </ItemContent>
        <ItemFooter>
          <span className="inline-flex items-center gap-1 text-muted-foreground text-xs">
            <MapPinIcon aria-hidden="true" className="size-3.5" />
            南京西路 1266 号
          </span>
          <ItemActions>
            <Button size="xs" variant="outline">
              查看进度
            </Button>
          </ItemActions>
        </ItemFooter>
      </Item>
    </div>
  );
}
```

