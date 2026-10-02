# 单文件上传实现

- 改动：保留所有导出类型，以 reducer 管理传输、处理、取消等待、取消确认、失败与未知结果。进度限制在 0–100；100% 不结束业务流程。按 jobId 和当前阶段过滤迟到事件，失败及取消确认后可用新 jobId 重试。
- 组件：使用真实 FileUpload 的受控文件列表、getProgress、getError、renderActions。等待期间锁定选择和删除，取消请求保留文件及既有进度；结果未知时继续保留并锁定对象。同步 reducer 引用阻止取消过程中的迟到成功触发 onComplete，仅处理成功转换为 done 时调用一次。
- PASS：已运行 `node /Volumes/SUNSANG\ 1/Codex/qingye-ui/scripts/ai-eval/check-types.mjs --run n-t04-1`，退出码 0，diagnostics 为空，invalidImports 与 invalidProps 均为 0。
- UNVERIFIED：未运行浏览器、交互或异步竞态运行测试，未访问隐藏断言；未发送真实网络请求。取消是否发生及业务处理是否完成，以注入 api 的 Promise 结果为依据。
