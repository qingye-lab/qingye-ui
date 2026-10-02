# 独立审查后的修复与推送准备

用户在独立审查后明确要求“修复所有问题并推送”。本轮修复三个已确认问题，并将此前已授权的 W00–W12 完整实现一同提交到 `qingye-lab/qingye-ui` 的 `main`；不创建发布 tag。本文记录推送前的实际本地验证，远端执行结论以该提交的 GitHub CI 为准。

## 修复

1. **Studio 跨项目响应乱序。** 统一状态归属到 `StudioProjectState`，以项目、读取代次、操作请求和候选版本过滤迟到成功/失败。切换立即清空旧项目编辑及预览；读取、预览未就绪时不可应用。导入、查询、报告与应用结果使用相同归属规则。已发送的写入仍绑定发送时的项目，不声称切换能够取消服务端写入。
2. **撤销中断后永久锁定。** 离页或刷新恢复时，将未完成撤销转换为待核实，保留原请求、撤销尝试编号、已保存值和后续草稿。核实成功恢复原保存值而不覆盖后续草稿；明确失败后按有效期恢复重试或编辑。迟到旧尝试不能完成新尝试，超时不被伪造为撤销成功。
3. **已有报告漏判新增源文件。** 报告读取重新枚举与 `checkProject` 相同的扫描范围，比较完整路径与内容指纹。新增、删除、改名、内容改变均使报告陈旧；扫描范围之外和已排除文件不影响。枚举失败保留 NOT_RUN，读取不重跑诊断或改写旧报告。

## 验证

- `pnpm typecheck`、`pnpm test`、`pnpm verify:facts` 通过。共 381 项：UI 314、tooling 31、docs 22、Studio 14。
- docs 与 Studio 构建通过。任务浏览器 138 项通过，包括离页返回、整页刷新两条撤销恢复路径及成功/失败分支；原有 108 组布局/文字检查继续通过。
- Studio 浏览器 11 项通过。真实本地服务响应按 B→A 顺序返回后，编辑器保持 B；应用请求和文件写入均落在 B，A 文件逐字节不变；读取期间不可应用。原有两文档、Portal、冲突、导入/导出、几何、对比度继续通过。
- 安装后的真实 tooling tgz 通过 CLI 验证：保存报告后新增源码，读取显示 `stale: true` / `UNVERIFIED`，旧报告字节不变。
- 主题 token 的源码指纹已重生成，最终实测结果见主执行记录和 scenario-results.json。

证据：`test-results/review-fixes/{typecheck,test,facts,patterns,studio,packed-tooling,foundations}.log`、`test-results/task-patterns/report.json`、`test-results/studio/run-Mu74Dw/report.json`、`test-results/packed-tooling/run-Rt2tPL/report.json`。

Studio 测试首次暴露旧脚本的固定延时不足：应用成功消息早于重新读取/iframe 更新，归属查询也可能超过 300ms。脚本已等待实际 computed 圆角与实际归属接口响应，保持原业务断言；失败运行记录保留在 `run-OhJFco`、`run-6cGsqs`。最终通过运行的浏览器及临时服务均已关闭。

人工视觉定稿、真实 IME、物理触屏和读屏仍未执行。前期 24 次 AI 固定任务对照、UI 安装消费证据保持原结论，不因本轮修复扩大验收范围。
