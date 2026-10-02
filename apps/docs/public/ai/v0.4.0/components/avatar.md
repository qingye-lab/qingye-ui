# 头像 Avatar

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/avatar
Source: packages/ui/src/components/avatar.tsx
Source SHA-256: f7ed811070e5027f9011b53c9a0f6b00d74ec9dee722beae75485ea2f0192daa

用图片或姓名缩写代表一个人或团队。图片加载失败或缺失时自动显示回退内容；多人时用头像组叠放。

## Use and ownership
- 以图像或姓名缩写识别人、团队与集合成员。
- Avoid: 把头像当作唯一姓名；在线状态只画绿色圆点；头像组的 +N 隐藏总人数含义。
- Library: 图片加载与回退切换、尺寸、重叠关系。
- Application: 人物身份、图片来源、姓名、成员总数与在线事实。

## Composition
- AvatarImage 与 AvatarFallback 共用身份；旁边已有姓名时图片 alt 留空，独立身份需有完整名称；状态配文字。

## Responsive behavior
- 小尺寸使用单字或可辨图标；头像组保留足够可见边缘，不把触摸操作压缩到头像直径。

## Customization
- size 调整身份标记，交互由包裹姓名与头像的公共链接或 Button 承担。

## Current exports
- Avatar: function; owner avatar; PASS; props: AvatarPrimitive.Root.Props & { size?: AvatarSize }
- AvatarBadge: function; owner avatar; PASS; props: React.ComponentProps<"span">
- AvatarFallback: function; owner avatar; PASS; props: AvatarPrimitive.Fallback.Props
- AvatarGroup: function; owner avatar; PASS; props: React.ComponentProps<"div">
- AvatarGroupCount: function; owner avatar; PASS; props: React.ComponentProps<"div">
- AvatarImage: function; owner avatar; PASS; props: AvatarPrimitive.Image.Props
- AvatarPrimitive: reexport; owner avatar; UNVERIFIED
- AvatarSize: type; owner avatar; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Avatar
根元素，圆形裁切并带一圈内描边，避免浅色图片与页面融在一起。
- size: "xs" | "sm" | "default" | "lg" | "xl"; default "default". 直径依次为 20 / 24 / 32 / 40 / 48px，回退文字随之缩放。
- render: ReactElement | (props) => ReactElement. 替换渲染元素，例如包成链接。

### AvatarImage
头像图片；加载中和加载失败时隐藏，由 AvatarFallback 顶上。
- src: string. 图片地址。
- alt: string. 替代文本；头像旁已显示姓名时传空字符串，避免重复朗读。
- onLoadingStatusChange: (status: "idle" | "loading" | "loaded" | "error") => void. 图片加载状态变化时调用。

### AvatarFallback
图片缺失、加载中或失败时显示，通常放姓氏或图标。
- delay: number; default 0. 延迟显示的毫秒数，图片很快加载完成时可避免回退内容闪一下。

### AvatarBadge
固定在右下角的状态圆点，默认为成功色；尺寸随头像自动匹配，颜色用 className 覆盖，如 bg-muted-foreground 表示离线。可放一个小图标。

### AvatarGroup
叠放的一组头像，按头像尺寸自动调整重叠量，并用页面底色描边保持边缘清晰。

### AvatarGroupCount
放在 AvatarGroup 末尾的 “+N” 计数，自动匹配组内头像的尺寸。

## Keyboard

## Source examples
### 图片与回退
Source: apps/docs/src/content/avatar/demos/01-basic.tsx
```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@qingye/ui/components/avatar";
import { UserIcon } from "lucide-react";

export const meta = {
  title: "图片与回退",
  description: "没有图片或图片加载失败时显示 AvatarFallback，通常放姓氏或图标。",
};

export default function Demo() {
  return (
    <>
      <Avatar>
        <AvatarImage
          alt="林晓雯"
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=faces"
        />
        <AvatarFallback>林</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>周</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>
          <UserIcon aria-hidden="true" className="size-4 text-muted-foreground" />
        </AvatarFallback>
      </Avatar>
    </>
  );
}
```

### 尺寸
Source: apps/docs/src/content/avatar/demos/02-sizes.tsx
```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@qingye/ui/components/avatar";

export const meta = { title: "尺寸", description: "xs 到 xl 依次为 20 / 24 / 32 / 40 / 48px。" };

const src = "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=96&h=96&fit=crop&crop=faces";

export default function Demo() {
  return (
    <>
      <div className="flex items-center gap-3">
        <Avatar size="xs">
          <AvatarImage alt="周子航" src={src} />
          <AvatarFallback>周</AvatarFallback>
        </Avatar>
        <Avatar size="sm">
          <AvatarImage alt="周子航" src={src} />
          <AvatarFallback>周</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage alt="周子航" src={src} />
          <AvatarFallback>周</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarImage alt="周子航" src={src} />
          <AvatarFallback>周</AvatarFallback>
        </Avatar>
        <Avatar size="xl">
          <AvatarImage alt="周子航" src={src} />
          <AvatarFallback>周</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex items-center gap-3">
        <Avatar size="xs">
          <AvatarFallback>陈</AvatarFallback>
        </Avatar>
        <Avatar size="sm">
          <AvatarFallback>陈</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>陈</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>陈</AvatarFallback>
        </Avatar>
        <Avatar size="xl">
          <AvatarFallback>陈</AvatarFallback>
        </Avatar>
      </div>
    </>
  );
}
```

### 状态标记
Source: apps/docs/src/content/avatar/demos/03-badge.tsx
```tsx
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@qingye/ui/components/avatar";

export const meta = {
  title: "状态标记",
  description: "AvatarBadge 默认为在线的绿色，用 className 换成其他状态色；旁边始终配上文字。",
};

const people = [
  {
    name: "林晓雯",
    status: "在线",
    tone: "bg-success",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=faces",
  },
  {
    name: "周子航",
    status: "离开 · 15 分钟",
    tone: "bg-warning",
    src: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=96&h=96&fit=crop&crop=faces",
  },
  { name: "陈思远", status: "会议中", tone: "bg-destructive" },
  { name: "许嘉怡", status: "离线", tone: "bg-muted-foreground" },
];

export default function Demo() {
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
      {people.map((person) => (
        <div key={person.name} className="flex items-center gap-3">
          <Avatar size="lg">
            {person.src ? <AvatarImage alt="" src={person.src} /> : null}
            <AvatarFallback>{person.name.slice(0, 1)}</AvatarFallback>
            <AvatarBadge className={person.tone} />
          </Avatar>
          <div className="flex flex-col gap-1">
            <span className="font-medium text-sm leading-none">{person.name}</span>
            <span className="text-muted-foreground text-xs leading-none">{person.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### 头像组
Source: apps/docs/src/content/avatar/demos/04-group.tsx
```tsx
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@qingye/ui/components/avatar";

export const meta = {
  title: "头像组",
  description: "AvatarGroup 按头像尺寸调整重叠量；AvatarGroupCount 自动与组内头像同尺寸。",
};

export default function Demo() {
  return (
    <>
      <AvatarGroup aria-label="共 9 位成员">
        <Avatar size="sm">
          <AvatarImage alt="林晓雯" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=faces" />
          <AvatarFallback>林</AvatarFallback>
        </Avatar>
        <Avatar size="sm">
          <AvatarImage alt="周子航" src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=96&h=96&fit=crop&crop=faces" />
          <AvatarFallback>周</AvatarFallback>
        </Avatar>
        <Avatar size="sm">
          <AvatarFallback>陈</AvatarFallback>
        </Avatar>
        <Avatar size="sm">
          <AvatarImage alt="沈若溪" src="https://images.unsplash.com/photo-1569913486515-b74bf7751574?w=96&h=96&fit=crop&crop=faces" />
          <AvatarFallback>沈</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+5</AvatarGroupCount>
      </AvatarGroup>
      <AvatarGroup aria-label="共 16 位成员">
        <Avatar size="lg">
          <AvatarImage alt="许嘉怡" src="https://images.unsplash.com/photo-1614644147724-2d4785d69962?w=96&h=96&fit=crop&crop=faces" />
          <AvatarFallback>许</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>王</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarImage alt="林晓雯" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=faces" />
          <AvatarFallback>林</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarImage alt="周子航" src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=96&h=96&fit=crop&crop=faces" />
          <AvatarFallback>周</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+12</AvatarGroupCount>
      </AvatarGroup>
    </>
  );
}
```

### 组合：成员列表
Source: apps/docs/src/content/avatar/demos/05-members.tsx
```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@qingye/ui/components/avatar";
import { Badge } from "@qingye/ui/components/badge";
import { Button } from "@qingye/ui/components/button";
import { Card, CardAction, CardDescription, CardHeader, CardPanel, CardTitle } from "@qingye/ui/components/card";
import { UserPlusIcon } from "lucide-react";

export const meta = { title: "组合：成员列表", description: "头像旁已有姓名时，图片 alt 留空，避免读屏重复朗读。" };

const members = [
  {
    name: "林晓雯",
    email: "linxiaowen@qingye.example",
    role: "所有者",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=faces",
  },
  {
    name: "周子航",
    email: "zhouzihang@qingye.example",
    role: "管理员",
    src: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=96&h=96&fit=crop&crop=faces",
  },
  { name: "陈思远", email: "chensiyuan@qingye.example", role: "成员" },
  {
    name: "沈若溪",
    email: "shenruoxi@qingye.example",
    role: "成员",
    src: "https://images.unsplash.com/photo-1569913486515-b74bf7751574?w=96&h=96&fit=crop&crop=faces",
  },
];

export default function Demo() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>成员</CardTitle>
        <CardDescription>4 人可以访问此项目</CardDescription>
        <CardAction>
          <Button size="sm" variant="outline">
            <UserPlusIcon aria-hidden="true" />
            邀请
          </Button>
        </CardAction>
      </CardHeader>
      <CardPanel>
        <ul className="-my-3 divide-y">
          {members.map((member) => (
            <li key={member.email} className="flex items-center gap-3 py-3">
              <Avatar>
                {member.src ? <AvatarImage alt="" src={member.src} /> : null}
                <AvatarFallback>{member.name.slice(0, 1)}</AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="font-medium text-sm leading-none">{member.name}</span>
                <span className="truncate text-muted-foreground text-xs leading-none">{member.email}</span>
              </div>
              <Badge variant={member.role === "成员" ? "outline" : "secondary"}>{member.role}</Badge>
            </li>
          ))}
        </ul>
      </CardPanel>
    </Card>
  );
}
```

### 组合：评论
Source: apps/docs/src/content/avatar/demos/06-comments.tsx
```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@qingye/ui/components/avatar";
import { Badge } from "@qingye/ui/components/badge";

export const meta = { title: "组合：评论", description: "头像与姓名、时间组成评论头部，正文与姓名左对齐。" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-5">
      <div className="flex gap-3">
        <Avatar>
          <AvatarImage
            alt=""
            src="https://images.unsplash.com/photo-1569913486515-b74bf7751574?w=96&h=96&fit=crop&crop=faces"
          />
          <AvatarFallback>沈</AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">沈若溪</span>
            <time className="text-muted-foreground text-xs numeric">今天 10:24</time>
          </div>
          <p className="text-pretty text-sm">
            首页骨架屏和真实内容的高度不一致，加载完成时列表会往下跳一下，能统一成 72px 吗？
          </p>
        </div>
      </div>
      <div className="flex gap-3">
        <Avatar>
          <AvatarFallback>陈</AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">陈思远</span>
            <Badge size="sm" variant="secondary">作者</Badge>
            <time className="text-muted-foreground text-xs numeric">今天 10:41</time>
          </div>
          <p className="text-pretty text-sm">已改，骨架行高现在和列表项一致，预发环境可以看效果。</p>
        </div>
      </div>
    </div>
  );
}
```

