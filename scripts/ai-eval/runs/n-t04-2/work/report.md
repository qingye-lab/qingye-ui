# 单文件上传实现

- `state.ts` 保留导出类型，按当前 jobId 和合法阶段接收事件；进度限于 0–100，100% 不结束任务。传输完成进入处理，处理完成才进入 done。取消请求、确认取消和结果未知分别表达；取消后的迟到进度、成功或失败不会覆盖取消状态。
- `UploadPanel.tsx` 使用真实 FileUpload 的受控 files/onFilesChange、getProgress/getError/renderActions。等待及结果未知时锁住文件选择和删除；失败或确认取消后保留同一 File，可用不同 jobId 重试。取消等待期间以文字保留既有传输进度。
- 同步状态引用在调用取消 API 前封住异步成功路径；只有被 reducer 接受的 processed 事件触发一次 onComplete。业务调用仅使用注入 api，未引入网络请求。

实际验证：**PASS** — `node /Volumes/SUNSANG 1/Codex/qingye-ui/scripts/ai-eval/check-types.mjs --run n-t04-2`，退出码 0，diagnostics 空，invalidImports=0，invalidProps=0。

未验证边界：**NOT_RUN** — 浏览器、运行时交互与隐藏断言均未执行；取消竞态和组件实际 DOM 行为仍需独立评估。**UNVERIFIED** — 实际服务端上传、处理和取消确认行为，由注入 API 提供。
