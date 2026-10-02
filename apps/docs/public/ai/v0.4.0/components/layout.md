# 布局 Layout

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/layout
Source: packages/ui/src/components/layout.tsx
Source SHA-256: aa435569288e039061f954c2f2b760151702b69dec971ed50c2437e31d2c63ac

四个轻量的布局原语：纵向排列的 Stack、横向排列的 Inline、自动换行的 Grid，以及走字号阶梯的 Text。间距取自设计令牌，读 JSX 时就能看出意图；它们覆盖不到的情况，直接写 Tailwind 即可。

## Use and ownership
- 以 Stack/Inline/Grid 组织真实信息关系，Text 表达文字角色。
- Avoid: 所有段落用相同 gap；Grid 重排丢失当前焦点；视觉标签替代 heading/label 的语义。
- Library: 布局、角色文字、属性透传与响应式列数。
- Application: 任务分组、DOM 阅读顺序、语义元素和工作保留。

## Composition
- as 选择正确 HTML 结构，gap 表达关系；Inline 换行，Grid minItemWidth 按宿主容量流动。

## Responsive behavior
- minItemWidth 跟随容器而 columns 跟随视口；重要二维比较仍用 Table。

## Customization
- gap 使用既有空间档位，Text tone 只改强调，不能改变状态事实。

## Current exports
- Grid: function; owner layout; PASS; props: GridProps<E>
- GridProps: type; owner layout; PASS
- Inline: function; owner layout; PASS; props: InlineProps<E>
- InlineProps: type; owner layout; PASS
- LayoutGap: type; owner layout; PASS
- Stack: function; owner layout; PASS; props: StackProps<E>
- StackProps: type; owner layout; PASS
- Text: function; owner layout; PASS; props: TextProps<E>
- TextProps: type; owner layout; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Stack
子元素纵向排列，间距均匀。
- gap: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16; default 4. 间距档位，对应 --qy-space-*（4 = 1rem）。
- align: "stretch" | "start" | "center" | "end"; default "stretch". 交叉轴对齐。
- as: "div" | "section" | "article" | "form" | "fieldset" | "ul" | "ol" | …; default "div". 渲染的元素，属性类型随之变化。

### Inline
子元素横向排列、垂直居中，空间不足时换行。
- gap: 同 Stack; default 2. 间距档位。
- align: "center" | "start" | "end" | "baseline" | "stretch"; default "center". 交叉轴对齐；混排不同字号时用 baseline。
- justify: "start" | "center" | "end" | "between"; default "start". 主轴分布；标题与操作两端对齐用 between。
- wrap: boolean; default true. 是否允许换行。
- as: "div" | "header" | "footer" | "nav" | "ul" | …; default "div". 渲染的元素。

### Grid
等宽单元格，窄屏自动减少列数。
- columns: 1 | 2 | 3 | 4; default 1. 宽屏列数；手机一列，640px 起两列，1024px 起达到设定值。按视口计算。
- minItemWidth: string. 每格最小宽度（如 "14rem"），按容器宽度放下尽可能多的列，优先于 columns。
- gap: 同 Stack; default 4. 间距档位。
- as: "div" | "section" | "ul" | "ol"; default "div". 渲染的元素。

### Text
走字号阶梯与语义色的文字。
- size: "body" | "label" | "caption"; default "body". 14px 正文、13px 标签、12px 说明。
- tone: "default" | "muted" | "success" | "warning" | "danger". 语义色；不传时继承父级颜色。
- as: "span" | "p" | "div" | "small" | "strong" | "em" | "time"; default "span". 渲染的元素。

## Keyboard

## Source examples
### Stack
Source: apps/docs/src/content/layout/demos/01-stack.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Input } from "@qingye/ui/components/input";
import { Label } from "@qingye/ui/components/label";
import { Stack, Text } from "@qingye/ui/components/layout";

export const meta = { title: "Stack", description: "表单字段纵向排列：外层 gap 5 分隔字段，内层 gap 2 连接标签与输入。" };

export default function Demo() {
  return (
    <Stack as="form" className="w-full max-w-sm" gap={5} onSubmit={(event) => event.preventDefault()}>
      <Stack gap={2}>
        <Label htmlFor="team-name">团队名称</Label>
        <Input defaultValue="青烟科技" id="team-name" />
      </Stack>
      <Stack gap={2}>
        <Label htmlFor="team-slug">团队地址</Label>
        <Input defaultValue="qingyan" id="team-slug" />
        <Text size="caption" tone="muted">
          成员通过 qingyan.tech/qingyan 访问团队主页。
        </Text>
      </Stack>
      <Button className="self-start" type="submit">
        保存
      </Button>
    </Stack>
  );
}
```

### Inline
Source: apps/docs/src/content/layout/demos/02-inline.tsx
```tsx
import { Badge } from "@qingye/ui/components/badge";
import { Button } from "@qingye/ui/components/button";
import { Inline, Stack, Text } from "@qingye/ui/components/layout";
import { PlusIcon } from "lucide-react";

export const meta = { title: "Inline", description: "标题与操作两端对齐；标签一行放不下时自动换行。" };

const tags = ["React", "TypeScript", "设计系统", "无障碍", "深色模式", "国际化"];

export default function Demo() {
  return (
    <Stack className="w-full max-w-md" gap={3}>
      <Inline justify="between">
        <Text as="p" className="font-medium">
          技术标签
        </Text>
        <Button size="sm" variant="outline">
          <PlusIcon />
          添加
        </Button>
      </Inline>
      <Inline as="ul" aria-label="技术标签">
        {tags.map((tag) => (
          <li key={tag}>
            <Badge variant="outline">{tag}</Badge>
          </li>
        ))}
      </Inline>
    </Stack>
  );
}
```

### Grid
Source: apps/docs/src/content/layout/demos/03-grid.tsx
```tsx
import { Grid, Stack, Text } from "@qingye/ui/components/layout";

export const meta = { title: "Grid", description: "columns={3}：手机一列，640px 起两列，1024px 起三列。" };

const stats = [
  { label: "本月部署", value: "126", note: "较上月 +18" },
  { label: "平均构建时长", value: "48 秒", note: "较上月 −6 秒" },
  { label: "成功率", value: "99.2%", note: "失败 1 次" },
];

export default function Demo() {
  return (
    <Grid className="w-full" columns={3} gap={3}>
      {stats.map((stat) => (
        <Stack className="rounded-xl border p-4" gap={1} key={stat.label}>
          <Text size="caption" tone="muted">
            {stat.label}
          </Text>
          <Text className="numeric font-semibold text-2xl">{stat.value}</Text>
          <Text size="caption" tone="muted">
            {stat.note}
          </Text>
        </Stack>
      ))}
    </Grid>
  );
}
```

### 按容器自适应
Source: apps/docs/src/content/layout/demos/04-grid-fluid.tsx
```tsx
import { Avatar, AvatarFallback } from "@qingye/ui/components/avatar";
import { Grid, Inline, Stack, Text } from "@qingye/ui/components/layout";

export const meta = {
  title: "按容器自适应",
  description: "minItemWidth=\"12rem\"：按容器宽度放下尽可能多的列，适合宽度不确定的区域。",
};

const members = [
  { name: "林晓", role: "设计负责人" },
  { name: "周舟", role: "前端工程师" },
  { name: "陈默", role: "后端工程师" },
  { name: "许诺", role: "产品经理" },
  { name: "王一然", role: "测试工程师" },
];

export default function Demo() {
  return (
    <Grid as="ul" aria-label="团队成员" className="w-full" gap={3} minItemWidth="12rem">
      {members.map((member) => (
        <Inline as="li" className="rounded-xl border p-3" gap={3} key={member.name} wrap={false}>
          <Avatar>
            <AvatarFallback>{member.name.slice(-1)}</AvatarFallback>
          </Avatar>
          <Stack className="min-w-0" gap={0}>
            <Text className="truncate font-medium">{member.name}</Text>
            <Text className="truncate" size="caption" tone="muted">
              {member.role}
            </Text>
          </Stack>
        </Inline>
      ))}
    </Grid>
  );
}
```

### Text
Source: apps/docs/src/content/layout/demos/05-text.tsx
```tsx
import { Stack, Text } from "@qingye/ui/components/layout";

export const meta = { title: "Text", description: "三档字号与五种语义色；不设 tone 时继承父级颜色。" };

export default function Demo() {
  return (
    <Stack className="w-full max-w-sm" gap={4}>
      <Stack gap={1}>
        <Text as="p">正文 body · 部署完成后会发送邮件通知。</Text>
        <Text as="p" size="label">
          标签 label · 部署区域
        </Text>
        <Text as="p" size="caption">
          说明 caption · 最近更新于 <time dateTime="2026-10-01T14:32">10 月 1 日 14:32</time>
        </Text>
      </Stack>
      <Stack gap={1}>
        <Text as="p" tone="muted">muted · 次要信息与说明文字</Text>
        <Text as="p" tone="success">success · 证书已自动续期</Text>
        <Text as="p" tone="warning">warning · 本月构建时长已用 85%</Text>
        <Text as="p" tone="danger">danger · 域名解析校验失败</Text>
      </Stack>
    </Stack>
  );
}
```

