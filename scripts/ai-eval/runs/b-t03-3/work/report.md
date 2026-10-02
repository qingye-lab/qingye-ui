# 批量归档实现

- `state.ts` 实现去重排序的跨页 ID 范围、完整查询快照、独立确认与请求快照；实际输入变化使确认失效，同值更新保留确认。仅匹配请求编号的结果生效。
- ID 请求只替换本次范围内的结果，缺失反馈记为 unknown；失败 ID 去重排序，并排除 success/unknown。重试保留范围外已有结果。
- `BulkPanel.tsx` 使用真实 Qingye Button，并同步四项外部范围参数。确认后才能执行；同步请求状态阻止重复提交。重试在本地切换到失败 ID 范围并确认，再调用注入 API。显示范围数量、等待、成功、失败与“结果待确认”。查询请求拒绝或未返回完整集合时保留明确的未知反馈。

实际验证：运行 `node /Volumes/SUNSANG 1/Codex/qingye-ui/scripts/ai-eval/check-types.mjs --run b-t03-3`，返回 **PASS**，diagnostics 为空，invalidImports / invalidProps 均为 0。

未验证边界：未运行浏览器、组件交互或行为测试，未访问网络和真实归档服务；隐藏断言由独立评估者运行。查询集合中未返回的成员无法枚举，界面报告集合结果待确认，不推定其成功或失败。
