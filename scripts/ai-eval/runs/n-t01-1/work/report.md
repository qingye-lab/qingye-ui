# 资料编辑模块

- 改动：`state.ts` 统一计算草稿与 base 的 dirty、可保存条件及不可变转换。提交保留 requestId 与草稿快照；只接收当前请求结果；成功更新 base，且只在草稿仍等于快照时采用规范化文字。
- 改动：`Editor.tsx` 使用分配资料中真实的 Qingye UI 字段与按钮 API，调用注入的 save/check。同步通过同一 reducer 推进状态以阻止重复写入；保存拒绝或查询拒绝均保持结果未知；明确错误原位显示 `role=alert` 并允许重试。确认成功后每个请求只通知一次，返回携带当前草稿及 dirty。
- PASS：执行 `node '/Volumes/SUNSANG 1/Codex/qingye-ui/scripts/ai-eval/check-types.mjs' --run n-t01-1`，退出码 0；diagnostics 为空，invalidImports 与 invalidProps 均为 0。
- NOT_RUN：浏览器、运行时交互与隐藏断言未执行；没有据类型检查宣称异步行为、辅助技术或视觉验收通过。
- UNVERIFIED：服务端幂等、规范化与保存结果查询的一致性由注入 API 提供，本模块未访问网络。按合同仅处理本次挂载期间同一 document 的编辑。
