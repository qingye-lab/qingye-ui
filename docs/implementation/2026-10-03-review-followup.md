# 未提交更改审查后续修复（2026-10-03）

用户明确要求修复本轮三处审查问题并提交 Git 版本。保留当前工作区的组件重写、归档与其他并行改动，不恢复归档组件，不修改上游实现。

## 修复

- Tooltip 恢复 `"use client"`，阻止 RSC 在服务端执行模块级 `createContext`。同批重写的剪贴板与媒体查询 hooks 恢复相同客户端入口声明。构建后用 TypeScript AST 检查三个发布模块仍保留首条客户端指令；此检查不是 Next.js 消费项目构建验收。
- SelectTrigger 保留显式 `aria-labelledby` 的优先级；只有调用方提供非空 `aria-label` 而未提供 `aria-labelledby` 时，抑制原语自动加入的 FieldLabel 引用。无显式名称时继续由 FieldLabel 命名。三个回归场景覆盖这三种组合，修复前显式名称场景失败，修复后通过。
- 官网 h3 改为当前 `heading` 档的字号和行高，h2/h3 的组合类分别使用 `chapter` / `heading`，让字距与字重也来自相同语义档。CSS AST 回归检查验证字号/行高引用的 token 存在于库入口的本地导入链；修复前明确报出两项 `lead` 未定义引用。

## 当前验证

| 检查 | 结果 | 范围 |
|---|---|---|
| `pnpm --filter @qingye/ui typecheck` | PASS | 当前库源码 |
| `pnpm --filter @qingye/ui build` | PASS | 生成 catalog、AI/registry 投影、ESM 及 77.8 KB 预编译 CSS |
| `pnpm --filter @qingye/ui test` | PASS | 31 文件，468 项测试；包含 3 项新增 Select 名称回归 |
| Select / Tooltip / 两 hooks 的定向测试 | PASS | 4 文件，65 项测试 |
| 并行文案调整后的 Select 复测 | PASS | 22 项；样本名称改为通用选项，保持三个命名优先级场景 |
| 官网 type-scale / design-guidance 测试 | PASS | 6 项，包含新增未定义字号 token 检查 |
| 发布模块客户端声明 | PASS | `dist/components/tooltip.js` 与两 hooks；`react-server` 条件下的 React 没有 createContext，构建仍保留客户端声明 |
| 标题 computed 值 | PASS | 单页夹具加载真实 Vite `/src/index.css`，1280/390 × 浅/深串行；h2 22px，h3 16px、行高 22.4px；集中 heading token 注入后实际为 18px / 27px |
| `pnpm --filter docs typecheck` | FAIL | 125 条诊断，归档组件/旧 API 消费仍未收尾；prose.tsx 的错误是已归档 Alert 引用。遵守「网站打不开没有关系」的归档裁决 |
| Next.js 项目构建、完整官网构建与发布验收 | NOT_RUN | 不把发布指令检查或独立 CSS 夹具当作这些验收 |

已重建能力清单与 token 台账。当前静态输入指纹 `0f76a057638c7dbe02e5274bc9e7e4c217648fe7f88879aefc8ebf8b059698e1`；78 项旧运行时 probe 均为 NOT_RUN，不沿用它们作为当前源码通过证据。

## 浏览器与提交范围

启动前 CLI list 无浏览器。使用一个任务会话 `qy-review-fixes`、一张页面；CLI daemon PID 34677，Chrome PID 34678、PPID 34677，专属 profile 为 `/var/folders/jp/tkxkqws50fsdwv0bh7_9gg8w0000gn/T/playwright_chromiumdev_profile-ueOuyz`。首次夹具尝试在 SVG 文档调用 setContent，失败后在同一会话改用 HTML 夹具，未另起浏览器。成功夹具检查未观察到 pageerror / console.error。已通过 CLI close 关闭，并确认两个 PID 退出、CLI list 无浏览器。既有 Vite PID 59950 / PPID 59927 保留。

Git 版本包含当前组件重写、归档、文档与生成资源，以及本次修复。五个一次性本地文件保留而不暂存：`apps/docs/.__vc.html`、`apps/docs/.__vc.tsx`、`apps/docs/.__visual-compare.html`、`apps/docs/.__visual-compare.tsx`、`verify-probes.mjs`。
