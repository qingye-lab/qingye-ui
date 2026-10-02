完成批量归档模块。只修改 state.ts、BulkPanel.tsx，保留导出/类型，可增加文件内函数。使用真实 Button。API 由 props 注入；不要访问网络。selectedIds 可跨页，rows 只是当前页显示对象，不定义操作范围。

合同：
- currentScope 在 allMatching=false 返回去重排序的 selectedIds，在 true 返回当前 query 与 total 的快照。query 模式表示匹配集合，不能把它降为当前页 rows。
- confirm 保存独立 scope 快照；canExecute 只在非空、无 pending 且确认范围与当前范围完全相同时为真。select/query/total/allMatching 实际变化使确认失效；同值更新或相同 IDs 不同顺序不应使确认失效。查询变化保留 selectedIds。
- start 仅在 canExecute 时创建 pending 捕获 scope 与 requestId。result 只处理匹配 requestId。等待时与部分结果可见，不能把 unknown 当成功/失败。
- retryIds 只返回明确 failure，去重排序，排除 success/unknown。重试调用 api.archive 的 scope={kind:'ids',ids:retryIds}，不能重试原全部集合。重试结束替换这批 ID 的结果，其它已知/未知结果保留。
- 组件同步 query/total/selectedIds/allMatching 的变化；显示“已选 N 项”或“匹配 N 项”；选择/查询变化后必须重新“确认操作范围”，然后“执行归档”。重复执行等待中不新增请求。重试按钮为“重试失败项”，需要先在本地把范围切为失败 IDs 并确认该次重试（可在 retry 函数里完成），随后 start。
- API 拒绝无法判断写入结果，ids 范围标记这些 ID unknown；query 范围显示结果未知，不能伪造整个集合成功。未知反馈包含“结果待确认”，明确失败可见。

请交付代码与简短 report.md（改动、实际验证、未验证边界）。不要只写方案。
