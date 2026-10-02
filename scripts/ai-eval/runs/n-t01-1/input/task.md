完成资料编辑模块。只修改 state.ts、Editor.tsx，保留现有导出及类型，可以增加文件内私有函数。使用真实 @qingye/ui API，状态由 state.ts 统一管理，组件调用注入的 api，不访问网络。document 在本次挂载期间不切换对象。

合同：
- 标题、正文可编辑；isDirty 比较草稿与已确认 base。只有有变更且不在 saving/unknown 时 canSave 才为真。
- save-start 捕获提交草稿与 requestId。保存过程中仍可编辑；成功响应更新 base，但不覆盖提交之后的输入。仅当当前草稿等于提交快照时可采用服务端返回的规范化文字。
- save-result 只接受当前 pending.requestId；旧响应不得修改状态。saved/error 为已知结果，清除 pending；unknown 保留该请求以便核实，不能直接重复提交。
- 明确错误保留输入，显示 role=alert，允许重试。save() 的 Promise 拒绝视为 unknown（可能服务端已执行），不是明确错误。未知显示“结果待确认”，提供“查询保存结果”按钮调用 api.check；查询抛错或仍 unknown 时继续未知。查明 saved 后才调用 onSaved；error 允许重新保存。
- 成功调用 onSaved 恰好一次；返回始终可用，onBack 带当前草稿与 dirty，返回不宣称保存成功。按钮名称为“保存资料”“返回列表”“查询保存结果”。
- 提交 api.save 时传当前 id、base.version、提交快照、唯一 requestId。保存中重复点击不得新增请求。保留语义字段标签与输入。

请交付代码与简短 report.md（改动、实际验证、未验证边界）。不要只写方案。
