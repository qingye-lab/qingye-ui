# 文档级主题三轴

## Status

Applied；12 项 Provider/三轴单元测试 PASS。最终浏览器确认 html 品牌在 Provider 挂载与 light→dark→light 切换时保留，Button 背景按品牌覆盖变化；data-density 同时保留。默认视觉没有变化。

## Context

明暗由 `ThemeProvider` 写 `.light/.dark` 或 `data-theme="light|dark"`，密度由项目写 `data-density`。品牌不能复用 Provider 会重写的明暗属性。

## Evidence

`theme-provider.tsx` 的 apply/themeScript 只写明暗、colorScheme；`components.css` 已有 compact 密度规则。现有无值 `[data-theme]` 只重绑明暗语义/兼容变量，不读取品牌名。

## Decision

首版把品牌写在 `html[data-brand]`，三轴独立；Provider 不设置品牌或密度。缺省 `data-brand` 继续使用原默认主题，没有新增默认品牌或内置项目品牌。项目在唯一主题入口、库样式之后添加覆盖：

```css
/* src/ui/theme/index.css */
html[data-brand="project-a"] {
  --qy-primary: oklch(0.51 0.18 268);
  --qy-primary-foreground: oklch(0.985 0 0);
  --qy-ring: oklch(0.62 0.14 268);
}
html[data-brand="project-a"]:is(.dark, [data-theme="dark"]) {
  --qy-primary: oklch(0.72 0.13 268);
  --qy-primary-foreground: oklch(0.21 0.04 268);
  --qy-ring: oklch(0.6 0.12 268);
}
```

```html
<html lang="zh-CN" data-brand="project-a" data-density="compact">
```

## Alternatives

未添加品牌到 ThemeProvider：品牌是项目静态视觉身份。未将品牌写进 `data-theme="project-a"`：那会被明暗切换覆盖。未添加库内虚构品牌：项目可直接维护自己的唯一 CSS 入口。

## Consequences

默认视觉没有变化。覆盖声明需晚于库样式，或具备足够选择器优先级。明暗组合选择器负责分别定义对应模式值。品牌自选值的可读性必须测真实前景/背景；示例值不构成整套品牌对比度验收。

首版不提供局部品牌自动重绑定、局部品牌跨 Portal 传播或自动色彩推导。文档级品牌在 Portal 上的具体部位仍需实测；不能把普通 Dialog token 测量当成所有品牌/Portal 组合已验收。派生 CSS 变量在声明元素解析，局部容器覆盖一两个原始变量不能保证全部别名重算。

## Verification

Live 测试覆盖 Provider 挂载、切换、首屏脚本对品牌属性、密度属性及 CSS 品牌覆盖的保留，12/12 PASS。最终真实浏览器记录在 `test-results/ui-foundations-accepted/runtime.json` 的 brand 段：品牌在 #root 尚不存在时已设定，挂载后两个主题的 Button 背景分别为 rgb(32,96,192) 与 rgb(128,176,240)，切回 light 恢复原值。该证据不扩展为局部品牌或所有 Portal 已验收。

收据：`docs/baseline/task7-token-wiring/receipt.json`。

## Revisit

出现局部品牌或 Portal 不同品牌需求时，先明确派生变量和跨容器继承契约；不得默认为首版已支持。
