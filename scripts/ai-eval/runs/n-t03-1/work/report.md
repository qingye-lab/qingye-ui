# 批量归档实现报告

- 改动：在应用层实现独立的 IDs／查询范围快照、语义相等比较和确认失效规则。跨页选择保留，当前页 rows 仅用于显示。请求捕获范围与 requestId，同步状态阻止等待中的重复请求，并忽略不匹配的结果。
- 恢复：展示等待、成功、明确失败和“结果待确认”。API 拒绝时 IDs 标记 unknown，查询范围显示未知；未返回的 IDs 也保留为 unknown。重试先切换并确认失败 IDs，仅替换这些 ID 的结果，其它结果保留。
- 组件：同步 query、total、selectedIds 和 allMatching 的真实变化，等价 IDs 顺序变化不撤销确认。使用资料中提供的真实 `@qingye/ui/components/button` 导出。
- PASS：实际执行 `node scripts/ai-eval/check-types.mjs --run n-t03-1`，退出码 0，diagnostics 为空，invalidImports=0，invalidProps=0。
- UNVERIFIED：未运行浏览器交互、辅助技术、真实 API 或隐藏断言；类型检查不证明这些行为通过。查询结果只能依据注入 API 返回的逐项事实判断，缺少完整结果时保留未知反馈。
