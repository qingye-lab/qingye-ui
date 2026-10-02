# 资料编辑模块

- `state.ts` 统一实现草稿与已确认 base 的比较、保存快照、请求匹配、明确错误、未知结果和成功确认。成功更新 base；仅草稿仍等于提交快照时采用服务端规范化文字，保留保存后的输入。
- `Editor.tsx` 使用分配资料中的 Qingye 表单与按钮 API，保留可见字段标签。同步应用同一 reducer，避免渲染前重复提交；保存拒绝转为未知，查询沿用原 requestId。已确认成功只通知一次，返回始终携带当前草稿与 dirty。
- 实际验证：运行 `node /Volumes/SUNSANG 1/Codex/qingye-ui/scripts/ai-eval/check-types.mjs --run b-t01-2`，结果 `PASS`，diagnostics 为空，invalidImports 与 invalidProps 均为 0。
- 未验证边界：未运行浏览器、交互测试或隐藏断言；未调用真实后端。真实组件渲染、异步交互及视觉表现仍待独立评估。
