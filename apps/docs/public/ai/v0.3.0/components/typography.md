# 排版 Typography

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/typography
Source: packages/ui/src/components/typography.tsx
Source SHA-256: 789879528969abbfe44b9e8fa800e7ee117ed0e93eeee478371e7f188bc365b2

标题 Heading、长文容器 Prose 与文字链接 TextLink。字号取自类型令牌，中文长文使用更宽松的行高。正文与辅助文字请用布局中的 Text。

## Use and ownership
- 以标题大纲、长文和行内链接建立阅读路径与深入依据。
- Avoid: 视觉小字就跳到 h4；传统字体替代排版检查；链接只有弱颜色；长文样式覆盖嵌入控件。
- Library: 标题元素、文字角色、长文规则和外链提示。
- Application: 内容层级、文档语言、阅读宽度、链接目标与媒体替代文本。

## Composition
- Heading level 决定大纲而 size 决定视觉；Prose 只样式化普通元素，TextLink 是有焦点和明确去向的链接。

## Responsive behavior
- 真实中文标点、长链接、代码和表格分别检查；比较表格需可滚动容器，不能只缩小字号。

## Customization
- 集中字体与文字角色是入口，CJK tracking 保持 0，render 不改变应有的可访问语义。

## Current exports
- Heading: function; owner typography; PASS; props: HeadingProps
- HeadingLevel: type; owner typography; PASS
- HeadingProps: interface; owner typography; PASS
- HeadingSize: type; owner typography; PASS
- Prose: function; owner typography; PASS; props: ProseProps
- ProseProps: interface; owner typography; PASS
- TextLink: function; owner typography; PASS; props: TextLinkProps
- TextLinkProps: interface; owner typography; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Heading
语义层级与视觉字号分离：level 决定 <h1>–<h6>，size 决定字号。
- level: 1 | 2 | 3 | 4 | 5 | 6; default 2. 文档大纲层级。
- size: "display" | "title" | "heading" | "label". 对应 --qy-text-* 令牌中的视觉字号，与 level 无关。默认：1→display，2→title，3–4→heading，5–6→label。
- render: ReactElement | (props) => ReactElement. 替换渲染元素。

### Prose
为一段 HTML 长文（段落、列表、链接、引用、行内代码、代码块、表格、分隔线、图片）提供克制的样式。内部的组件库组件保持自身样式。
- size: "sm" | "default"; default "default". default：15px / 1.8 行高，适合文章与帮助中心；sm：14px / 1.75，适合侧栏与说明。

### TextLink
行内文字链接：细下划线、悬停加深、键盘焦点环。支持 render 接入路由链接。
- variant: "default" | "muted"; default "default". muted 用于辅助文字中，下划线更淡，悬停时转为正文色。
- external: boolean; default false. 新标签页打开（rel="noopener noreferrer"），追加箭头图标与读屏提示「在新标签页中打开」。

## Keyboard
- Tab / Enter: 聚焦并打开链接。

## Source examples
### 标题
Source: apps/docs/src/content/typography/demos/01-heading.tsx
```tsx
import { Heading } from "@qingye/ui/components/typography";

export const meta = { title: "标题", description: "level 决定语义层级，size 决定字号，二者可以独立设置。" };

export default function Demo() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Heading level={1}>门店运营概览</Heading>
      <Heading level={2}>本周订单与营收</Heading>
      <Heading level={3}>徐汇漕溪北路店</Heading>
      <Heading level={4} size="label">
        设备与人员
      </Heading>
      <Heading level={2} size="heading" className="text-muted-foreground">
        level 2 · size heading
      </Heading>
    </div>
  );
}
```

### 长文 Prose
Source: apps/docs/src/content/typography/demos/02-prose.tsx
```tsx
import { CodeBlock } from "@qingye/ui/components/code-block";
import { Prose } from "@qingye/ui/components/typography";

export const meta = { title: "长文 Prose", description: "段落、列表、链接、引用、行内代码、表格、分隔线；内部的组件保持自身样式。" };

export default function Demo() {
  return (
    <Prose className="w-full max-w-2xl">
      <h1>门店设备接入指南</h1>
      <p>
        新门店开业前，需要把收银机、厨房打印机和自助点餐屏接入管理后台。接入完成后，设备状态、订单与告警会实时同步，运营人员可以在
        <a href="#devices">设备列表</a>中远程查看和重启。
      </p>
      <h2>准备工作</h2>
      <ul>
        <li>确认门店网络可以访问 <code>api.qingye.example</code> 的 443 端口。</li>
        <li>
          在后台创建门店并记下门店编号，例如 <code>XH-001</code>。
        </li>
        <li>
          每台设备准备好序列号，通常贴在机身底部。
          <ul>
            <li>收银机：以 T2S 开头</li>
            <li>打印机：以 GP 开头</li>
          </ul>
        </li>
      </ul>
      <h2>接入步骤</h2>
      <ol>
        <li>设备开机后进入「设置 → 管理平台」，填写门店编号。</li>
        <li>在后台点击「添加设备」，输入序列号完成绑定。</li>
        <li>
          绑定后约 <strong>30 秒</strong> 内状态变为「在线」。
        </li>
      </ol>
      <CodeBlock code={`curl -s https://api.qingye.example/v2/stores/XH-001/devices \\\n  -H "Authorization: Bearer $TOKEN"`} filename="查询设备" />
      <blockquote>
        <p>如果 5 分钟后仍显示离线，请先检查门店路由器是否拦截了出站连接，再联系技术支持。</p>
      </blockquote>
      <h3>常见设备型号</h3>
      <table>
        <thead>
          <tr>
            <th>类型</th>
            <th>型号</th>
            <th>接入方式</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>收银机</td>
            <td>SUNMI T2s</td>
            <td>后台绑定序列号</td>
          </tr>
          <tr>
            <td>厨房打印机</td>
            <td>佳博 GP-L80</td>
            <td>通过收银机局域网发现</td>
          </tr>
          <tr>
            <td>自助点餐屏</td>
            <td>SUNMI K2</td>
            <td>扫码绑定</td>
          </tr>
        </tbody>
      </table>
      <hr />
      <p>
        更新于 2026 年 9 月 30 日。发现文档有误？请在<a href="#feedback">反馈页</a>告诉我们。
      </p>
    </Prose>
  );
}
```

### 文字链接
Source: apps/docs/src/content/typography/demos/03-text-link.tsx
```tsx
import { TextLink } from "@qingye/ui/components/typography";

export const meta = { title: "文字链接", description: "默认样式、弱化样式与外部链接。" };

export default function Demo() {
  return (
    <div className="flex max-w-md flex-col gap-3 text-sm">
      <p>
        修改结算周期前，请先阅读<TextLink href="#billing">结算规则</TextLink>。
      </p>
      <p className="text-muted-foreground">
        没有收到验证码？<TextLink href="#resend" variant="muted">重新发送</TextLink>
      </p>
      <p>
        设备型号参数见{" "}
        <TextLink external href="https://developer.sunmi.com/">
          商米开发者中心
        </TextLink>
        。
      </p>
    </div>
  );
}
```

### 紧凑长文
Source: apps/docs/src/content/typography/demos/04-prose-sm.tsx
```tsx
import { Prose } from "@qingye/ui/components/typography";

export const meta = { title: "紧凑长文", description: "size=\"sm\" 用于侧栏、抽屉中的说明文字。" };

export default function Demo() {
  return (
    <Prose className="w-full max-w-sm" size="sm">
      <h3>关于自动对账</h3>
      <p>
        每天凌晨 2:00 系统会拉取前一日的支付流水与订单，自动比对金额与笔数。差异会出现在<a href="#diff">对账差异</a>中。
      </p>
      <ul>
        <li>金额差异小于 0.01 元的记录自动忽略。</li>
        <li>退款以原支付渠道的到账时间为准。</li>
      </ul>
    </Prose>
  );
}
```

