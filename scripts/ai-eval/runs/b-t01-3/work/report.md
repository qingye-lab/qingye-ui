# 资料编辑模块

- `state.ts` 实现草稿与 base 的比较、保存资格、提交快照和请求编号过滤。已知结果清除 pending，未知结果保留 pending；保存成功仅在当前草稿仍等于提交快照时采用服务端规范化内容，否则保留后续输入。
- `Editor.tsx` 使用分配 catalog 中的 Qingye 组件入口，通过注入的 `api.save` / `api.check` 完成保存与查询。同步使用同一个 reducer 防止渲染前重复提交；Promise 拒绝进入未知状态，明确错误显示 `role=alert`。确认成功后调用一次 `onSaved`，返回按钮始终传递当前草稿及 dirty。
- 字段使用可见标签及明确的 id/htmlFor 关联；保存、返回、查询按钮保持约定名称，并提供保存中、成功和未知结果反馈。

实际验证：执行 `node /Volumes/SUNSANG 1/Codex/qingye-ui/scripts/ai-eval/check-types.mjs --run b-t01-3`，结果 `PASS`，diagnostics 为空，invalidImports=0，invalidProps=0。

未验证边界：按照本次试验限制，未启动浏览器、网络、额外测试或隐藏断言。运行时渲染、交互及评估者断言尚未验证；类型检查通过不代表这些检查通过。
