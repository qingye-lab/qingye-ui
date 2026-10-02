# 单文件上传流程

- `state.ts` 实现按 jobId 和阶段约束的状态机：进度限制在 0–100，传输完成进入处理，处理完成才进入 done；取消请求、取消确认和结果待确认分别处理。取消之后及旧 jobId 的迟到事件不会改变当前结果。
- `UploadPanel.tsx` 使用真实受控 FileUpload 的 files/onFilesChange、getProgress/getError/renderActions，串行调用注入的 upload/process，处理成功才调用一次 onComplete。等待期间锁定选择和删除；失败或确认取消保留文件并允许以新 jobId 重试。取消请求期间单独展示既有传输进度，进度插槽仅在 transmitting 返回数值。
- 同步状态引用保护异步回调，取消一经请求便阻止迟到上传成功继续处理及迟到处理成功调用 onComplete。

实际验证：执行指定可信检查 `node /Volumes/SUNSANG\ 1/Codex/qingye-ui/scripts/ai-eval/check-types.mjs --run b-t04-1`，结果 PASS，diagnostics 为空，invalidImports=0，invalidProps=0。

未验证边界：未运行浏览器、运行时交互测试或隐藏断言；真实 FileUpload 的禁用表现、插槽显示及完整异步交互由独立评估者后续验证。未发起真实网络请求。
