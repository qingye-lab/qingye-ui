# 2026-10-03 审查问题修复

范围为本次审查确认的五个问题。开始时 HEAD 为 `275d730`，工作区已有大量未提交改动；本次保留这些改动，未提交、发布或改写 upstream 基线。

## 修复边界

1. **加载按钮仍能打开组合菜单。** Button 在 capture 阶段阻止主指针和鼠标按下，依据最终元素的 popup 语义阻止上下方向键打开菜单。保留加载时焦点、Tab/Escape 和正常按钮的方向键行为；loading 结束后恢复操作，显式 disabled 仍使用原生语义。
2. **Toast 的未知结果文案污染后到达的真实结果。** 超时只更新状态；未知结果文案由展示层临时组合，不写入应用的 title/description。promise 的字符串及对象成功/失败结果、手动更新、紧凑 anchored 提示均有回归覆盖。手动更新的结果停留时间继续由调用方指定。
3. **未读邮件打开后正文立即消失。** Reader 按 selectedId 从完整消息集合取值，未读筛选仍作用于列表。读取触发标记已读时保留正文与回复草稿；用户主动切换筛选、文件夹或搜索时仍清空 reader。
4. **响应式字体 class 被迁移脚本拆坏。** 修复 12 个组件中的完整 mobile/desktop 字号和强调字重；为 dense 的移动端强调形式补齐集中别名。迁移脚本通过 TS AST 定位静态 class，再处理完整 utility；隔离 fixture 验证后缀、行高括号、断点、普通文案及 cva 变体名称，动态表达式报告 UNVERIFIED。
5. **表头最小高度不生效。** 恢复 table-cell 可消费的 height 约束，保留换行和内容撑高；密度与 row token 继续控制高度。

## 外观基线变化

- support 强调文字恢复移动端 16px / 桌面 14px，dense 强调标签恢复 14px / 12px；两端保留 500 字重。
- 默认表头恢复 40px，紧凑表头恢复 36px。长标题仍可超过该高度，不截断内容。
- Toast 到达真实结果时移除超时提示，保留应用自己的内容。

## 验证记录

| 检查 | 结果 |
|---|---|
| Button 定向回归 | PASS，13/13；旧实现先复现 4 个失败 |
| CopyButton / InputGroup / Overlays / Toolbar | PASS，31/31 |
| Toast 定向回归 | PASS，32/32；旧实现先复现 7 个失败 |
| 文档 truthfulness 测试 | PASS，10/10；未读 reader 新断言在旧实现上失败 |
| 迁移 CLI、幂等性、断点及 CSS/cn 合并 | PASS，11/11；最初 3 个隔离 fixture 在旧脚本上全部失败 |
| Table / Tabs / Disclosure / Select / Combobox / TagInput / Stat / 字体合并 / conventions | PASS，72/72 |
| `pnpm --filter @qingye/ui build` | PASS，含 catalog、TS、预编译 CSS |
| `pnpm --filter docs build` | PASS，含 fixtures、TS、Vite |
| `git diff --check` | PASS |
| 浏览器定向回归 | PASS，23 项；页面及 console error 均为 0 |

浏览器命令：`PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' node scripts/verify-review-regressions.mjs`。TSX 夹具只由开发服务动态加载，验证不等同于部署产物验收。观察覆盖 1280px / 390px；字号与表头各测浅色/深色。字号实测 16/14 与 14/12，500 字重；注入集中字号 token 后实际变为 19/15。表头短标题实测 40/36，注入 row token 后变为 72/56；窄屏自然换行和额外长标题均可撑高。

第一次浏览器运行的检查器错误地要求所有自然表头恰好等高，在 390px 的合法换行标题处失败；未因此改变产品代码。将检查分为自然标题不低于最小值、短标题精确最小值、长标题撑高后，最终 23 项通过。首次和最终运行都核实了任务浏览器及其后代进程退出；保留用户原有的开发服务与其他浏览器。

最终完整浏览器记录：[2026-10-03-review-fixes.browser.json](./2026-10-03-review-fixes.browser.json)。本地四张表格截图位于 `test-results/review-regressions/`。本轮单元测试最初曾因 `pnpm test -- <file>` 参数形式误触发全库，记录到当时尚未完成的并行修复失败；最终改用 `pnpm --filter @qingye/ui exec vitest run <file…>` 执行上述定向集合，不将误触发记录算作通过。

已更新 9 个受影响 coss 派生文件的 adaptation 与源码 hash，并重新生成 catalog、能力清单和 token 台账。能力清单输入指纹为 `d546b2ea265bbe32e188561a13471cacc4cf64d9a26027dedf7097d1783e761c`。台账保留旧 runtime 证据并因指纹变化将 78 个旧 probe 标记为 `NOT_RUN`；本轮仅对上述受影响字号与表头做新的 computed 验证，不将旧 probe 宣称为通过。

非阻断提示：官网构建仍有超过 500 kB 的 chunk 提示；文档 DOM 测试含既有 act/chart 警告。

本记录不代表真机验收、生产部署或完整组件/主题矩阵扫描。
