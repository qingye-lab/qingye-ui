# 批量归档实现

- `state.ts` 保留全部导出与类型，规范化跨页 ID 范围，独立保存查询/确认/请求快照。实际范围输入变化使确认失效，同值或 ID 重排保持确认；只接受对应请求结果。
- `BulkPanel.tsx` 使用真实 `Button`，同步外部范围输入，显示当前范围、等待、明确失败与“结果待确认”。请求开始前同步锁定；重试先切换并确认失败 ID 范围，仅调用这些 ID，保留其他结果。
- ID 请求的缺失结果或请求拒绝记为 unknown；查询拒绝保留集合未知反馈，查询部分返回提示未收到结果的数量，不从当前页对象推断整个集合。

实际验证：**PASS** — 执行 `node /Volumes/SUNSANG 1/Codex/qingye-ui/scripts/ai-eval/check-types.mjs --run n-t03-3`，退出码 0，diagnostics 为空，invalidImports / invalidProps 均为 0。

未验证边界：**NOT_RUN** — 隐藏断言、浏览器、运行时交互与真实 API；本次受限试验未执行这些检查。服务端查询集合及逐项结果以注入 API 的实际返回为准，类型通过不代表运行时行为已验收。
