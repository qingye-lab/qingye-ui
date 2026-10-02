# 批量归档实现

- `state.ts`：规范化跨页 ID 集合；保存独立确认与请求范围快照；仅真实选择、查询、总数或模式变化使确认失效；按 requestId 接收结果。ID 结果缺失按 unknown 处理，重试只包含明确失败，结束后替换该批结果并保留其它结果。
- `BulkPanel.tsx`：使用真实 `@qingye/ui/components/button`；同步外部范围变化；先确认后执行，通过同步状态引用阻止等待中的重复请求。重试在本地切换到失败 ID、确认后执行。展示等待、明确失败和“结果待确认”；查询请求拒绝或返回不完整集合时保留未知反馈，不以当前页代替查询范围。

实际验证：执行 `node scripts/ai-eval/check-types.mjs --run b-t03-1`，返回 `PASS`，diagnostics 为空，invalidImports 与 invalidProps 均为 0。

未验证边界：未运行交互测试、浏览器或隐藏断言；未访问网络。接口只提供最终 Promise 结果，无法展示该 Promise 内未返回的逐项进度；等待期间保留已有逐项结果。查询模式下无法枚举未返回记录的 ID，因此以查询快照及未知数量反馈。
