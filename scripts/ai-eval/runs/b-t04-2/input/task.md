完成单文件上传流程。只修改 state.ts、UploadPanel.tsx，保留导出/类型，可增加文件内私有函数。使用当前真实 FileUpload 的受控 files/onFilesChange、getProgress/getError/renderActions 插槽，不复制上传组件、不发真实网络请求。api 为固定注入依赖。

合同：
- start 创建 jobId 与 transmitting；progress 只处理当前 jobId 并限制到 0–100；100% 仍是传输中，不代表业务完成。
- upload Promise resolve 后 dispatched transmitted→processing，再调用 api.process；process resolve 才 processed→done 并 onComplete 恰好一次。phase 状态文字固定：传输中、处理中、正在请求取消、已取消、处理完成、上传失败、结果待确认。
- “开始上传”只在有文件且 idle/error/cancelled 时可用。等待中锁定文件选择/删除以保留对象；getProgress 仅传输时返回数值；getError 仅明确 error 时返回 message；renderActions 提供该文件的“请求取消”按钮，在 transmitting/processing 可用。
- cancel-request 立即显示正在请求取消，但不显示已取消、移除文件或调用 onComplete。api.cancel confirmed=true 才 cancelled；confirmed=false 或 Promise 拒绝为 unknown。取消后迟到的 progress/transmitted/processed 不得覆盖 cancel-requested/cancelled/unknown。请求取消时允许继续看到既有进度但不误报完成。
- 上传/处理失败保留文件，getError 显示明确错误，允许开始上传重试，新 jobId 必须不同。所有旧 jobId 事件忽略。取消确认后保留文件并可重新开始。
- 上传或处理 Promise 拒绝视为 failure，消息取 Error.message 或“上传失败”。cancel Promise 拒绝视为 unknown，不视为已取消。组件异步代码必须避免取消过程中的迟到成功调用 onComplete。

请交付代码与简短 report.md（改动、实际验证、未验证边界）。不要只写方案。
