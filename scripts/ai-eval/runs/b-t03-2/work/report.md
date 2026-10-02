# 批量归档实现报告

- `state.ts`：实现跨页 IDs 去重排序、查询集合快照、独立确认与 pending 快照；实际范围变化使确认失效，同值更新保留确认。仅接受匹配 requestId 的结果；遗漏的请求 IDs 记为 unknown，重试结果按 ID 替换并保留其它结果。
- `BulkPanel.tsx`：使用分配 catalog 的真实 Button 导入，按语义同步外部范围，显示选择/匹配数量、等待和逐项结果；同步请求锁阻止重复请求。重试先切换到失败 IDs 并确认，再启动该批请求；API 拒绝显示“结果待确认”，查询集合未获得全部逐项结果时保留未知反馈。
- 保留全部原有导出和类型，rows 仅参与当前页显示与结果标题，不定义操作范围。

实际验证：执行 `node /Volumes/SUNSANG 1/Codex/qingye-ui/scripts/ai-eval/check-types.mjs --run b-t03-2`，结果 PASS，diagnostics 为空，invalidImports / invalidProps 均为 0。

未验证边界：按试验约束未运行浏览器、运行时交互测试、隐藏断言或网络调用；API 的实际归档与未知结果后续核实由调用方负责。类型检查不证明交互或 API 行为通过。
