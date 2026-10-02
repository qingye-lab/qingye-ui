# 上传流程实现

- 改动：在应用层区分传输、处理、请求取消、取消确认、失败和未知结果。进度限制为 0–100；仅处理当前 jobId 的合法阶段事件，取消后忽略迟到结果。只有处理成功才调用一次 onComplete。
- FileUpload 使用真实受控 files/onFilesChange 和 getProgress/getError/renderActions。等待及结果未知时保留并锁定文件；失败、确认取消后保留文件并允许以新 jobId 重试。请求取消期间单独显示既有传输进度，不表示业务完成。
- PASS：执行 `node scripts/ai-eval/check-types.mjs --run n-t04-3`，退出码 0，diagnostics 为空，invalidImports 与 invalidProps 均为 0。
- UNVERIFIED：未执行浏览器交互、辅助技术检查或异步运行测试。NOT_RUN：隐藏断言由独立评估者稍后运行；本实现未发起真实网络请求。

仅写入本 run 的 state.ts、UploadPanel.tsx、report.md，保留所有原有导出类型与 API 合同。
