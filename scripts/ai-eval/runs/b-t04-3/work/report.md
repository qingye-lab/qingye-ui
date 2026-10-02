# 单文件上传实现

- `state.ts` 保留导出合同，区分传输、业务处理、取消请求、取消确认、失败与结果待确认；按当前 jobId 和阶段过滤事件，进度限制为 0–100，100% 不触发业务完成。
- `UploadPanel.tsx` 使用真实 FileUpload 的受控文件及 getProgress/getError/renderActions。等待期间锁定选择与删除，取消期间另行保留既有传输进度。失败和确认取消均保留文件，可用不同 jobId 重试。
- 异步流程按 upload → transmitted → process → processed 执行；同步状态引用在取消请求时立即拦截迟到结果，处理成功才调用一次 onComplete。上传/处理拒绝显示明确错误，取消拒绝显示结果待确认。

实际验证：指定可信类型检查 `node '/Volumes/SUNSANG 1/Codex/qingye-ui/scripts/ai-eval/check-types.mjs' --run b-t04-3` 返回 PASS，diagnostics 为空，invalidImports 和 invalidProps 均为 0。

未验证边界：按试验边界未执行隐藏断言、浏览器交互或真实网络请求。分配资料没有完整 FileUpload 插槽实现说明，属性兼容性以指定类型检查为据；运行时交互及异步竞态仍由独立评估者验证。
