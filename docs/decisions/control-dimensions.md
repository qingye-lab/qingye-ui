# 控件尺寸、内部高度与触摸目标

## Status

Applied；阶段单元 285/285、类型检查 PASS，最终全库 299/299。最终浏览器验证默认档桌面/窄屏尺寸和独立粗指针目标；默认外观尺寸保持。

## Context

控件外部尺寸、边框内高度、粗指针触摸目标是不同概念。原 Input 内部 34/30px 加两个 1px 边框后外部是 36/32px，不能以内部比 Button 外部并“补大”Input。

## Evidence

`input.tsx` 的 `input-control` 是 border span，内部 `input` 使用 h-8.5/sm:h-7.5。`input-group.tsx` 的 unstyled Input 通过 display:contents 消去 span，边框由父 InputGroup 提供。`STANDARDS.md` 明确窄屏控件比桌面高 4px。

## Decision

`--qy-control-xs/sm/md/lg/xl` 控制桌面外部高度，默认 24/28/32/36/40px；窄屏加 `--qy-control-mobile-extra` 默认 4px，≥640px 使用桌面值。md 对应组件 default。Button 全尺寸（含图标按钮）、Input 三尺寸、SelectTrigger/SelectButton 三尺寸读取这些角色；Select 继续使用最小高度，允许内容自然增长。

Input 内部高度为对应外部高度减 2px。InputGroup unstyled 仍减父边框 2px。数字 size 继续表示原生输入宽度，默认高度仍是 md；unstyled 继续把包装样式交给宿主。

`--qy-touch-target` 独立控制 coarse 最小目标，默认 44px：Input 内部至少 42px + 边框得到外部至少 44px；Button/Select 由伪元素扩命中区，外部视觉仍按控件角色值。

## Alternatives

未直接给 Input 内层完整外部高度：会多出 2px。未取消移动 +4px：这是既有约定。未把触摸目标统一为视觉高度：Button/Select 与输入的现有策略有意不同。

## Consequences

默认几何没有变化。SelectItem 行尺寸、图标尺寸与列表行保持各自几何角色，不机械绑定控件高度。消费者改变既有 1px 边框厚度时，需同时处理内部尺寸关系，此方案不自动推断用户新增边框类。

## Verification

Live 全量单元 285/285、类型检查 PASS。Autocomplete 既有测试改为验证 size=sm 透传到 Input 控制层，disabled 断言保留；高度需真实浏览器证明。探针区分 desktop-fine/narrow-fine 与 coarse，读默认32/36及token注入后同档协调，再验证Input外部44下限与按钮/Select伪元素44目标。最终浏览器默认档实测：Button/Input/Select/InputGroup 的 fine 桌面外高32px、窄屏36px；将 md 改为35px后分别变为35px/39px。coarse 下 Input/InputGroup 外高44px下限保持，Button/Select 的伪元素最小目标44px独立于视觉高度。证据为 `test-results/ui-foundations-accepted/runtime.json`，并非所有 size/组合状态的穷举验收。

收据：`docs/baseline/task8-token-wiring/receipt.json`。

## Revisit

新增控件尺寸、修改包装边框、调整粗指针命中策略或加入组合控件时，补对应真实浏览器部位与响应式验证。
