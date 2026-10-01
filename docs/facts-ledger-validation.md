# 能力清单与 token 台账验证记录

任务 3–4 在 `fb8a389` 基线上新增生成器与内部文档；本记录只说明实际执行结果，不替代后续组件改动和浏览器验收。

| 命令 | 实际结果 |
| --- | --- |
| `node --check` 检查生成器、runtime 和辅助模块 | 通过 |
| `node scripts/gen-capabilities.mjs` | 88 个源码组件，158 个公开 token；当前事实重新生成，初始 baseline 未覆盖 |
| `node scripts/token-ledger.mjs` | 538 条静态路径；17 个预选 runtime case 均 `NOT_RUN`，无浏览器证据时没有 PASS |
| `node scripts/lib/facts-ledger.test.mjs` | 通过；覆盖 exports/type/alias、公开 companion 导出、无 dist 的源码 checkout、token 转发与 typography、精确 className 部位、真实 demo ID、主题冲突、无效注入、stale、未执行和 pointer 条件跳过；临时 fixture 在 finally 删除 |
| `pnpm --filter @qingye/ui typecheck` | 通过，`tsc -p tsconfig.json --noEmit` 退出 0 |
| `pnpm --filter @qingye/ui test` | 未全通过：45 个文件中 44 通过，231 个测试中 230 通过；`date-range-picker.test.tsx` 的 `two clicks pick a range, apply it and close` 超过 5000ms，退出 1 |
| `pnpm --filter @qingye/ui exec vitest run test/date-range-picker.test.tsx` | 针对失败复核通过：9/9，退出 0；上述用例 1124ms，测试文件 2090ms |

全库运行开始于 2026-10-01 21:47:14，耗时 30.26s；针对失败复核开始于 21:48:44，耗时 5.78s。台账变更未修改 DateRangePicker 源码；独立复核没有重现超时，但不能据此将第一次全库运行记作通过，或确认超时一定属于环境因素。

边界验证由真实解析结果和隔离 fixture 断言完成，未启动浏览器。运行时由唯一 browser owner 在已有 page 上执行 `runTokenLedgerProbe`；实际测量写入同一份 `docs/token-ledger.json`。任何后续源码、demos、CSS 或探针定义变化都会使旧证据失效，必须重新生成并按最终输入重测。历史 `current-capabilities.baseline.json` 保留接通 control 之前的零引用事实。

任务 7–10 合入后的独立复核：

- `node scripts/lib/facts-ledger.test.mjs` 再次通过，新增断言确认锁文件、文档初始 HTML 和存在的 Vite 配置进入静态指纹。
- `pnpm --filter @qingye/ui exec vitest run test/radius-role-merging.test.ts test/text-role-merging.test.tsx` 通过，2 个文件、12 个测试；22:15:54 开始，1.08s。真实字号角色与颜色保留、调用方字号替换、control/panel 圆角与 none/arbitrary/variant 覆盖均按原拥有边界工作。
- 全部 57 个 coss 记录的 `adaptedSha256` 与对应 live 文件 SHA-256 一致。固定 clear/trigger 预留与 NativeSelect 图标末端位置已按源码几何复核；紧凑 spacing 的实际外观由 browser owner 测量。
- current 重新生成：88 个组件、183 个 token；静态台账 813 条路径，正式 runtime 尚未运行时 17 个预选 case 均 `NOT_RUN`。新 `--qy-danger-fill` 在 Button 的 destructive 背景、边框、hover 和 pressed 路径均登记，但未据此自动声称运行时 PASS。
- 初始 snapshot 的 5 个 control token 引用仍全部为 0；current 的 lg/md/sm 各 10，xl/xs 各 4，新增 mobile-extra 为 19。它们仍明确标为源码引用数，不能代替渲染证据。

随后唯一源码跟进将 destructive solid 的边框恢复为 `border-destructive`，背景/hover/pressed 仍消费独立 fill。再次实际执行两个生成命令：current 仍为 88 个组件、183 个 token；静态台账为 814 条路径，新 fill 仅有 3 条背景路径，边框消费 `--qy-danger` 的转发链。正式测量交接指纹为 `8cf37ded0f8eaec4c8c4bef84132b1e3a92d84e57421942a43b1b479bc9fe058`，交接时 17 个 case 为 `NOT_RUN`；边框对比度是否通过由最终浏览器观测决定。此跟进未修改生成工具，未重复已经通过的边界测试。

最终字号命名跟进：Tailwind 的 `--color-input` 与 `--text-input` 存在 utility 名称冲突，输入字号 namespace 改为 `--text-field-input` / `--text-field-input-mobile`，六组件及 `cn` 注册同步；公开 `--qy-text-input-*` 和既有 `--color-input` 保持。独立只读复核未发现新的命名遗漏；静态路径明确记录 `sm:text-field-input` → `--text-field-input` → `--qy-text-input-size`。全部 57 个 coss adapted hash 再次核对一致。

该源码冻结后实际再次运行 `node scripts/gen-capabilities.mjs`、`node scripts/token-ledger.mjs` 和 `node scripts/lib/facts-ledger.test.mjs`：生成与边界检查均通过，current 88 个组件、183 个 token，static 814 条路径。新指纹 `42d2c560332b379a371f7bc8f79f4bb20b439c45da16996a657dd9c976a3a595` 与上轮实际 66 条 runtime 观测的 `8cf37ded…` 不同，生成器保留旧观察但将其全部标记 `NOT_RUN`、`staleRuntime=true`，未复用旧 PASS。接线前 baseline 的 control 零引用事实仍保留。正式运行时需在最终重建 CSS 上重测，最终计数以 browser owner 写入的同一 JSON 为准；此时尚未记录为通过。

最终实际浏览器在同一42d2c560…指纹下重新生成正式台账：814条静态路径、62个PASS、0个FAIL/UNVERIFIED、4个NOT_RUN。四个未运行项为fine指针不适用的coarse目标探针；coarse环境的四个对应case另有真实观测并通过。没有把未测状态扩大为普遍支持。原始观测与关闭证据见 `test-results/ui-foundations-accepted/runtime.json`，正式两层数据见 `docs/token-ledger.json`。
