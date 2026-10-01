# 接线前浏览器基线

本快照保留任务 1 修正及 3–5 工具落地后、7–10 组件接线前的任务 6 工作区快照。HEAD 基线 `fb8a389` 尚未包含本次未提交修改；视觉源码以 manifest 的完整 SHA256 指纹为准。

- 全量 audit：88 组件 × light/dark × desktop/mobile，共 352 次测量，问题 0，耗时 323797 ms。
- 先前分类：4/352 页为 Slider 居中刻度设计意图；10 个真实 demo 越界页案例分别修正 Item、Calendar、OTP、Pagination；另一个 favicon 404 独立修正。没有降低全局 2px 阈值，也没有跳过整个组件。
- 24 张截图位于 `test-results/ui-baseline/before-token-wiring/shots/`，覆盖 Button/Input/Select/Dialog/Card/Table 四变体。它们是本地证据，未加入 Git；manifest 列出路径、尺寸、字节数和 SHA256。最终接线后的截图必须使用另一个目录。
- 六类 fine 代表探针四模式 + Input coarse 四模式，共 28 条有效观测。未选择项保持 NOT_RUN。Input control 未接线时实测 OBSERVED_NO_CHANGE，不等于令牌已被消费。小型观测存 `token-ledger-observations.json`，完整台账及运行脚本存同一 test-results 目录。
- InputGroup wrapper/addon/inner input 的桌面、窄屏读数单列 `input-group.json`；保留一组 touch 窄屏附加读数以便区分 pointer。
- Calendar booking 在临时移除 flush 裁切后仍无越界：390px viewport 中 demo frame 350px、卡片 322px、日期格 44px。Pagination 窄屏点击 Next 和最后页的测量也无越界，详见 affected-final.json。

构建、类型检查和测试输出来自同一视觉源码状态，详见 manifest 的 checks。未记录的耗时为 null；真实 GitHub CI 此时 NOT_RUN。本机 Playwright 自带 Chromium 153 约30秒退出的原因未验证，本次显式使用系统 Chrome154，并记录浏览器进程树与 profile、正常关闭证据。用户原有 docs dev server 被复用且保留。

后续接线验收使用独立的 `docs/baseline/2026-10-01-accepted/receipt.json` 和 `test-results/ui-foundations-accepted/`，真实GitHub故障验证另存 `docs/baseline/2026-10-01-ci-gate-failure/receipt.json`。当前交付见 `docs/tasks-01-10-review.md`；本基线的历史观测不覆盖。
