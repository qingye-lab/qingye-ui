# 批量归档实现

- `state.ts` 保留全部导出与类型，实现去重排序的跨页 ID 范围、查询快照、独立确认/请求快照、同值更新保留确认、实际变化清除确认，以及 requestId 匹配后的结果合并。ID 响应缺失项归为 unknown；重试只取明确失败 ID，其它结果保留。
- `BulkPanel.tsx` 使用真实 `@qingye/ui` Button，同步四项外部范围数据；当前页 rows 仅用于展示。执行前要求确认，通过同步请求锁防止等待中重复请求。重试先在本地切换并确认失败 ID 范围，再执行归档。
- 等待、成功、失败、未知和部分结果原位显示。API 拒绝时 ID 范围逐项显示“结果待确认”；查询范围显示未确认数量，查询部分返回也不推定其余对象成功。重试保留此前查询未确认反馈。

## 实际验证

- PASS：`node /Volumes/SUNSANG\ 1/Codex/qingye-ui/scripts/ai-eval/check-types.mjs --run n-t03-2`，退出码 0，diagnostics 为 []，invalidImports 和 invalidProps 均为 0。
- 已按分配的 Button 文档核对所用导入与属性，并检查导出类型未修改。

## 未验证边界

- NOT_RUN：浏览器、网络、真实 API、交互自动化及隐藏断言；本次仅执行允许的类型检查。
- UNVERIFIED：实际服务端写入结果与完整匹配集合。查询拒绝或部分返回时不能从当前页 rows 推定集合内其它对象的结果，需应用提供后续核实能力。
