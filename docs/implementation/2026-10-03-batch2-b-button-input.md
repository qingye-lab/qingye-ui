# Batch 2 B：Button、Input 与 registry 模板

2026-10-03。B 范围修复与浏览器检查完成；库 typecheck、Button/Input 的 75 个用例通过。完整测试为 **FAIL：282 PASS / 1 FAIL**，唯一失败是已约定由主 agent 统一重建后处理的生成物同步检查。

## 范围与依据

- 开工 HEAD：`275d730`。工作区已包含大量重写与归档中的未提交变更，按现状增量修改，未恢复、提交或覆盖其他代理的文件。
- 已读 `AGENTS.md`、`design.md`、逐值裁决、归档裁决与 `STANDARDS.md`。只读取了用户特许的归档 **Button 测试**，没有读取归档组件源码或 provenance freeze。
- `design.md` 的组合、后果在场和状态真实性决定修复边界：已有可靠说明可以复用；reset 后不能继续报告旧值状态。它们不规定唯一包装容器或唯一状态属性形式。
- 未修改 token、尺寸、圆角或焦点数值。2px solid 内线与 1px quiet 内线是当前用户裁决的表达选择，不宣称由理念唯一推导。

本任务实际修改：`button.tsx`、`input.tsx`、两份对应测试、生成器的 `editor` 模板一处、Button/Input metadata、Button 的 `09-form-actions`、Input 的 `05-file` 与 `07-native-file`，以及本报告。没有新增组件内置界面文字，locale 文件无需变动。生成副本、registry 输出、dist 均未生成或手改。

## Button：后果关联与校验时机

`tone="danger"` 接受两种组合：

1. 位于有效的 `ButtonProtection` 内，沿用容器提供的后果关联。
2. 真实按钮的 `aria-describedby` 列表中，至少一个 ID 指向其 `ownerDocument` 中文本非空的元素。检查包含 `render` 元素自身提供的关联；自动生成的 Button 状态说明不充当动作后果。

两种关联都不成立时，仅非 production 环境抛错。检查位于 `useEffect`，渲染期不访问 DOM；对象 ref 和 React 19 callback ref cleanup 保留。

时机差异：旧实现渲染时直接失败，新实现允许 DOM 提交后再检查。同次提交中排在按钮后的说明已经可被找到；SSR 不执行 effect，也不校验；开发环境的错误在提交后交给错误边界，生产环境不因缺少关联而中断渲染。后续异步出现的说明，应先挂载再启用 danger。该检查证明关联文本存在，不证明文本可见、后果正确或业务确认已经完成，调用方仍负责这些事实。

`ButtonProtection` 自身的非空 consequence 契约保留；空容器没有被改成有效保护。

环境证据：

- **PASS**：Vitest 缺少/空白关联抛错；production 环境同一无关联按钮可渲染。
- **PASS**：SSR 渲染无关联 danger 不抛错。
- **PASS**：Vite 5180 返回的模块将 `process.env.NODE_ENV` 替换为开发分支；浏览器实际挂载两种合法关联均无 pageerror。
- 库的浏览器源码没有 Node ambient types，因此在该模块内声明最小 `process.env.NODE_ENV` 类型；不新增依赖，不进入公共 props。

## 测试恢复与生成器约束

归档 Button 测试的 **31 个执行用例全部移植**。菜单相关用例通过 Base UI 公共 Menu 原语组合运行，保留 `aria-haspopup="menu"`、mousedown、click、ArrowDown/ArrowUp/Enter/Space、等待与 unknown 阻断、焦点保留和恢复后的展开断言；两个 `render` 组合方向均保留。

新增 17 个 Button 执行用例，合计 48：三档 `data-variant`、bordered 五档边框与对应 `padding-bordered` 类、直接 DOM 说明、render 目标说明、缺失/空白说明、状态说明不可冒充后果、SSR/production 分支、ref cleanup 与 registry 模板编译。

对既有断言的改动逐项如下：

| 改动 | 理由 |
|---|---|
| `ButtonProps["variant"]` 的类型期望加入 `bordered` | 用户已裁决并实现三档 API；旧期望只有 solid/quiet。没有移除任何合法档位断言 |
| 其余既有断言 | 原样保留，未放宽、删除或跳过 |
| `loading` 不存在的断言旁注 | 改为说明当前接口选择，删除“理念禁止 boolean”的错误理由；断言本身保留 |
| Menu imports / fixture | 使用当前可用的 Base UI 原语替代已归档的库 Menu，检查同一真实交互契约；没有读取归档 Menu 实现 |

生成器只将 `loading={saving}` 改为 `state={saving ? "in-progress" : "idle"}`。新增检查用 TypeScript AST 提取模板，再以内存 TSX 文件编译，imports 解析到 **当前库源码**，不运行生成器、不读取旧 dist 声明。有效模板必须零 diagnostics；将 state 改回 loading 的反例必须得到 `Property 'loading' does not exist`。该检查同时避免其他不存在的 Button props 混入模板。

## Input：原生 reset

根因是 NativeInput 自己保存 observed/touched，而外层 Input 原有 reset 监听只更新了清空按钮等附属状态。原生 reset 不发 input/change，所以内部 observed 没有机会跟随 DOM 值。

修复在原生出口自己的状态边界：通过真实输入的 `.form` 监听 reset，在默认动作完成后的 microtask 读取实际值并清除 touched。被 `preventDefault()` 取消的 reset 保留状态；受控值仍来自调用方；不伪造 `onValueChange`。监听随卸载清理，外部 ref cleanup 保留。

**修复前复现 FAIL**：新增两个真实 `<form>` / `form.reset()` 用例分别恢复空值与 `initial`，DOM 值已恢复，但 render 的 dirty 仍是 true。

**修复后 PASS**：Input 原有 22 个执行用例保留，新增 5 个，合计 27。覆盖空/非空默认值的 render、class、style 和附属动作同步，取消 reset，受控 reset 与 ref cleanup。没有修改既有 Input 断言。

浏览器在同一 `review.html` 内临时挂载真实库组件，检查结束卸载：

| 阶段 | value | dirty | filled | touched | onValueChange 次数 |
|---|---|---|---|---|---|
| 初始 | 空串 | false | false | false | 0 |
| 输入并 Tab 离开 | draft | true | true | true | 1 |
| 取消 reset | draft | true | true | true | 1 |
| 成功 reset | 空串 | false | false | false | 1 |

此浏览器路径 **PASS**。证据：[runtime.json](/tmp/qy-batch2-b/runtime.json)。

## 演示与 API

- `09-form-actions` 中的「返回已保留名称」改用 bordered，作为保存草稿旁的次要动作。真实浏览器输入「新设备名称」后点击该动作，恢复「杭州网关」：**PASS**。
- Button metadata 补齐 solid/bordered/quiet，说明两条 danger 关联路径和挂载后校验时机。
- Input `05-file` 仍引用已经不存在的 FileUpload，改为真实 `Input type="file"`，删去组件未实现的 maxFiles/maxSize 限制。`07-native-file` 与 metadata 不再推荐当前缺席的 FileUpload。
- 21 个 Button/Input demos 用 TypeScript 编译并解析到当前源码，**PASS：0 diagnostics**。没有把官网外壳 typecheck 算作通过。

## 焦点实测

入口 `http://localhost:5180/review.html`，Chrome 单会话、单页，900×900 与 390×900；light/dark 串行。通过真实 `page.keyboard.press("Tab")` 到达每个目标，每次聚焦后等 600ms，再读取 computed style 与尺寸，保存并目检 16 张局部截图。

四种主题/视口组合的尺寸均为实际控件外盒；Input 使用拥有边界的 `input-control`：

| 视口 | 主题 | solid 前→后 | bordered 前→后 | quiet 前→后 | Input 前→后 |
|---|---|---|---|---|---|
| 900 | light | 112×32 → 112×32 | 56×32 → 56×32 | 98×32 → 98×32 | 256×32 → 256×32 |
| 900 | dark | 112×32 → 112×32 | 56×32 → 56×32 | 98×32 → 98×32 | 256×32 → 256×32 |
| 390 | light | 118×36 → 118×36 | 58×36 → 58×36 | 103×36 → 103×36 | 256×36 → 256×36 |
| 390 | dark | 118×36 → 118×36 | 58×36 → 58×36 | 103×36 → 103×36 | 256×36 → 256×36 |

16/16 为真实 `:focus-visible`，宽高差全部 0。四种组合共同结果：

| 控件 | 边框前→后 | 焦点线 | outline-style | 水平 padding |
|---|---|---|---|---|
| solid | 0 → 0px | 可见 shadow 仅 `2px inset` | none | 14px |
| bordered | 1 → 1px | 无非零扩展 shadow，只变边框颜色 | none | 13px |
| quiet | 0 → 0px | 可见 shadow 仅 `1px inset` | none | 14px |
| Input 外盒 | 1 → 1px | `box-shadow: none`，只变边框颜色 | none | 外盒 0px，真实 input 13px |

bordered/Input 边框颜色浅色由 `oklch(0 0 0 / 0.5)` 变为 `oklch(0.269 0 0)`，深色由 `oklch(1 0 0 / 0.44)` 变为 `oklch(0.87 0 0)`。solid 内线浅色为 `oklch(0.985 0 0)`、深色为 `oklch(0.269 0 0)`；quiet 内线浅色为 `oklch(0.269 0 0)`、深色为 `oklch(0.87 0 0)`。

**PASS：所测普通颜色模式下控件外没有新增焦点圈；边框未加粗，几何未变化。** 数字证据：[focus.json](/tmp/qy-batch2-b/focus.json)，16 张截图 `/tmp/qy-batch2-b/focus-{light,dark}-{900,390}-{solid,bordered,quiet,Input}.png`。本报告未以此宣称所有尺寸、附属按钮、品牌或强制颜色矩阵都已通过；这些额外矩阵本次 **NOT_RUN**。

## 验证结果与交接

| 检查 | 结果 |
|---|---|
| `pnpm --filter @qingye/ui typecheck` | **PASS**，最终 0 错误 |
| `pnpm --filter @qingye/ui exec vitest run test/button.test.tsx test/input.test.tsx` | **PASS**，2 文件 / 75 用例 |
| `pnpm --filter @qingye/ui test` 最终运行 | **FAIL**，19 文件：18 PASS / 1 FAIL；283 用例：282 PASS / 1 FAIL |
| 完整测试唯一失败 | `style-contract.test.ts` 的 STANDARDS→生成 style.md 同步检查；生成物由主 agent 后续统一重建，未改测试或生成副本 |
| Registry 有效与移除 prop 反例编译 | **PASS** |
| 21 个 Button/Input demos 编译 | **PASS** |
| `node --check packages/ui/scripts/gen-catalog.mjs` | **PASS** |
| 本范围 `git diff --check` | **PASS** |
| 16 个真实键盘焦点样本、两条 danger 关联、原生 reset 与 bordered 表单动作 | **PASS** |
| 包 build / gen:catalog / 正式打包消费验收 | **NOT_RUN**，按任务由主 agent 统一生成与重建 |
| 官网外壳验收 | **NOT_RUN**，用户已接受当前外壳不可用 |

较早完整检查曾遇到并行 Field 工作中的类型错误及 blur 行为失败；没有越界修改 Field，也没有过滤 TypeScript diagnostics。Field 更新后，最终 typecheck 与 registry 编译通过，完整测试中 Field 用例全部通过。保留的日志：[focused](/tmp/qy-batch2-b/tests-focused.log)、[full](/tmp/qy-batch2-b/tests-full.log)、[typecheck](/tmp/qy-batch2-b/typecheck.log)。

浏览器 pageerror 为 0；首次导航有站点 `favicon.ico` 404，另有 React DevTools 与无 form 的既有密码演示提示。最终浏览器 error 级日志为 0，没有把这些页面资源/提示算作库逻辑错误。

资源所有权：复用原有 docs server PID 59950；本任务 CLI 会话 `qy-batch2-b`，daemon PID 16243，浏览器 PID 16244，profile `playwright_chromiumdev_profile-9swxaP`。已用 CLI `close` 显式关闭，并确认 daemon、browser、记录的子进程及 profile 匹配进程均已退出；原有 5180 server 保留。
