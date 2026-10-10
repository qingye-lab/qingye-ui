# 动效策略 MotionProvider

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/motion-provider
Source: packages/ui/src/components/motion-provider.tsx
Source SHA-256: 8afcccdffccd39281b9211a5d474b7e4121f0e3895ba39e1c4d79777f664f8b2

在应用根部记录输入方式，键盘操作跳过过渡。

## Decision
键盘与减少动态效果会跳过部分过渡。状态直接更新，不依赖动画结束。

## Notes
- 只在应用根部挂载一次；示例复用本站根部的 MotionProvider。
- motion.css 读取 data-ui-input；键盘下过渡时长归零，指针下保留过渡。
- 系统减少动态效果由 motion.css 处理，独立于输入方式。
- data-instant 让当前元素跳过过渡；自定义部位使用 data-slot 或 qy-pressable 接入公共策略。

## Use and ownership
- 统一让键盘操作即时完成，并让指针操作保留必要过渡。
- Avoid: 在多个子树各挂一个 document owner；动画结束触发保存；减少动态效果后状态不可辨。
- Library: 最近输入方式、监听清理与原文档属性恢复。
- Application: 业务状态时机、根部装配和程序变化是否需要动画。

## Composition
- 根部一次挂载，document 属性覆盖 Portal；组件通过 data-slot/data-motion 使用公共 motion.css。

## Responsive behavior
- 布局变化与动画可被打断；键盘与系统减少动态效果分别检验。

## Customization
- 项目组合可使用 data-instant，但不再重复监听输入方式。

## Current exports
- MotionProvider: function; owner motion-provider; PASS; props: { children: ReactNode }

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: react
- Optional peers: none recorded
- 只在应用根部挂载一次；示例复用本站根部的 MotionProvider。
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### MotionProvider
无界面组件。挂载时把 data-ui-input 设为 pointer；捕获到 keydown 改为 keyboard，pointerdown 或 pointermove 改回 pointer；卸载时还原。属性写在 <html> 上，因此也覆盖传送到 body 的浮层。
- children: ReactNode. 应用内容。

## Keyboard

## Source examples
### 输入方式
Source: apps/docs/src/content/motion-provider/demos/01-modality.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";
import { Inline, Stack } from "@qingye_lab/ui/components/layout";
import { Text } from "@qingye_lab/ui/components/typography";
import { useEffect, useState } from "react";

export const meta = { title: "输入方式", titleEn: "Input modality" };

export default function Demo() {
  const [input, setInput] = useState<string | null>(null);
  useEffect(() => {
    const root = document.documentElement;
    const read = () => setInput(root.getAttribute("data-ui-input"));
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributeFilter: ["data-ui-input"] });
    return () => observer.disconnect();
  }, []);

  return (
    <Stack gap="panel">
      <Inline gap="actions"><Button>按钮</Button><Button variant="bordered">按钮</Button></Inline>
      <Text step="support" className="text-muted-foreground">输入方式：{input === "keyboard" ? "键盘" : input === "pointer" ? "指针" : "待检测"}</Text>
    </Stack>
  );
}
```

### 即时变化
Source: apps/docs/src/content/motion-provider/demos/02-custom.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";
import { Inline } from "@qingye_lab/ui/components/layout";
import { useState } from "react";

export const meta = { title: "即时变化", titleEn: "Instant changes" };

export default function Demo() {
  const [normal, setNormal] = useState(false);
  const [instant, setInstant] = useState(false);
  return (
    <Inline gap="actions">
      <Button variant="bordered" aria-pressed={normal} onClick={() => setNormal(!normal)}>常规</Button>
      <Button variant="bordered" data-instant aria-pressed={instant} onClick={() => setInstant(!instant)}>即时</Button>
    </Inline>
  );
}
```
