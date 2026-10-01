# Task 5: AST 颜色检查验收

状态：实现及非浏览器验收 PASS；此任务不改变组件外观，也不修改生产组件 API 或兼容行为。

TS compiler API 从 JSX className/style、cn/clsx/cva、props 对象的 className/style 提取可检查表达式，解析 lexical constants、条件、数组、对象键和静态模板。再按括号/引号深度切分 utility 与 selector，检查真正的 arbitrary paint value；不再用删除含 hex 方括号内容的整文件正则。

覆盖任务卡八例、alpha hex、RGB/HSL/OKLCH/color()、带 selector 的 raw utility、shadow arbitrary、style border/outline 简写、cn/cva/template 和参数/解构遮蔽。图表 selector 的 #666/#ccc/#fff 按非 paint 上下文排除，没有整文件豁免。

实际仓库运行：

| 命令 | 观察结果 |
|---|---|
| `pnpm --filter @qingye/ui exec vitest run test/color-check.test.ts test/conventions.test.ts` | PASS，2 files，56 tests（49 helper + 7 conventions） |
| `pnpm --filter @qingye/ui test --maxWorkers=2` | PASS，46 files，280 tests |
| `pnpm --filter @qingye/ui typecheck` | PASS，tsc --noEmit exit 0 |

现有 88 个组件由 AST 检查得到零违规。49 个 helper 测试中包含对现有全组件源文件的检查，未把仅凭案例通过解释为全库扫描完成。

边界：静态检查不会执行组件代码或解析运行时 props/import/member lookup。无法求值的表达式记录在 helper 的 `unresolved`，不会断言已通过运行时颜色/主题验证；本次快照共有 145 个 unresolved 表达式。未知片段与已知字符串用 sentinel 隔开，避免伪造静态 class 拼接；参数和解构遮蔽外层变量时保持 unresolved，而不把外层常量错误当作参数值。

检测词法只应用于 AST 提取的值。URL fragment、属性 selector、注释、非 paint 文字/尺寸、semantic CSS var 不报告。相同违规记录包含源码行号及 class/style 上下文。

日志保存在 `docs/baseline/task5-color-check/`，同目录 `receipt.json` 记录每份小型日志的 SHA-256 与字节数。此验收没有启动浏览器，也没有修改 A/B 的事实台账、浏览器执行器或 AGENTS.md。
