# Slot 透传与 Sidebar 当前项前景色

- Status: accepted
- Date: 2026-10-22
- Owners: UI library maintainers
- Scope: Dialog / AlertDialog / Popover、CopyButton / LocaleSwitch / OtpField 的 slot 转发；Sidebar 当前项主题角色
- Supersedes: none
- Superseded by: none

## Context

消费端需要覆盖组件的 `data-slot`；Sidebar 的 rail 分支本身也是 PopoverTrigger 的消费方。当前项背景已有独立角色，文字却与悬停共用，项目无法为这两张面分别配色。

## Evidence

当前源码中六个文件共有 27 处在展开调用方属性后写入固定 slot。新增回归在修复前出现 6 项失败，包括 Sidebar 收起后的默认与自定义 slot 丢失。原有 Sidebar / 状态面 20 项测试未覆盖该问题。证据来自 `packages/ui/test/slot-forwarding.test.tsx` 和源码渲染；不是仅凭 JSX 文本数量推断运行效果。

`motion.css` 原先按浮层 slot 匹配动画。SidebarSubTrigger 包含当前子页时仍位于普通侧栏面上，未使用 `--qy-sidebar-current`，因此不能直接使用为当前项选中面配对的文字色。

## Decision

- 对已有属性转发入口，使用调用方 `data-slot`，仅在 null / undefined 时取组件默认值；内置装饰子部位不重新指向调用方属性。Base UI `render` 合并优先级保留。
- 三种浮层的 popup、modal backdrop 和 Popover viewport 使用随组件合并的内部 `qy-*` 类承接原有动效。slot 继续承担可样式化部位名称，重命名不再改变这些动效，包括减少动态偏好。
- 台账继续用 AST 识别部位：明确的调用方 slot 访问加字面量 nullish 默认值可记录默认部位；任意函数、动态字符串、其他属性及未知回退保持 unresolved。内部动效类按实际 className 绑定回部位，不扫描 TSX 文本猜测。
- 增加 `--qy-sidebar-current-foreground`，在语义层默认引用 `--qy-sidebar-accent-foreground`，通过 theme 映射供 SidebarLink 的实际当前项消费。角色是当前项选中面上的主要文字色，不是新的默认色值。
- 当前链接的 hover 文字规则不参与覆盖当前项。包含当前子页的父入口没有当前项底色，继续使用原有 accent 文字色，避免反色当前项文字落在普通侧栏底上。

## Alternatives considered

- 只调整 Sidebar 调用方：无法修复公共组件转发边界的相同问题。
- 全部 slot 替换而不处理 motion：自定义浮层名称会丢失原有入退与减少动态策略。
- 把父分支一起改用 current 前景色：它没有配对的当前面，独立的白色当前项文字会落在浅色侧栏上。

## Consequences

- 默认 slot、默认配色和默认动效保持原有关系；传入自定义 slot 的消费方开始获得其声明的部位名称，需要重建 CSS。
- 新 token 可由项目主题分别配对 hover/current；不改变全库选中面同源的约定。
- 内部动效类随库样式与组件共同分发，不是另一套公开状态 API。

## Verification

执行 `slot-forwarding` 与相关组件、浮层、约定和状态面测试；UI / docs 类型检查。`scripts/verify-slot-sidebar-regressions.mjs` 使用单浏览器串行验证浅深主题的普通 / hover / current / current+hover、父分支与 rail，以及默认 / 自定义浮层 slot 的动效、减少动态偏好和关闭焦点恢复；报告位于 `test-results/slot-sidebar-regressions/`。新增 token 纳入标准 ledger 探针，未重测的旧指纹观测不作为本次通过证据。

本轮观测：相关 UI 测试累计 115 项通过，UI / docs typecheck、UI build 和 facts-ledger 检查通过。浏览器 19 项检查通过；台账在更新后的解析器指纹下独立复测，新 token 浅深两项 PASS，其余 26 项 NOT_RUN。浏览器均通过 finally 关闭并核实无剩余进程。该证据不覆盖真实读屏器、触屏设备或其他浏览器引擎。

## Revisit when

父分支获得独立选中面、动效机制更换，或其他组合暴露相同的 slot 与行为耦合时，重新核对角色与所属边界。
