# 消费项目迁移能力收尾

Status: GitHub and npm published / anonymous registry installation verified · 2026-10-24

## Direction and scope

用户在缺陷与能力缺口核对后要求“完成”，本轮完成剩余可独立交付的库侧能力、分发与发布准备，并核实消费项目的实际可访问性。保留此前 Dialog / AlertDialog 定位修复和 Field / Pagination 文档修改，不覆盖当前工作区。

已有接口保持兼容；新能力显式启用，不改变 Badge 无底色、Button 色调、Alert 静态默认、原生 ScrollArea 默认及主题三轴。请求、权限、业务草稿与跨服务器结果仍由消费项目拥有。

## Contracts and ownership

1. VirtualList：保留等高模式与原生滚动元素 ref；增加可变高度测量、独立动作 ref 的 scrollToIndex / scrollToEnd、稳定 key 的插入锚点与显式尾部跟随。焦点保留、删除后回到视口、嵌套编辑键位与有界渲染须保持。
2. DataTable / DataTablePattern：接通列尺寸与省略显示、可配置选择外观、排除内部交互控件的行激活及键盘等价路径；增加显式虚拟化，保留原生表格结构、排序、分页范围与稳定行身份。
3. Sparkline：显式开启逐点读数，覆盖悬停、键盘、触摸、Escape / 失焦关闭，未知值不变为零；默认静态摘要保持。提示复用库内浮层与主题角色。
4. Menu / ScrollArea：补 inset 与可选择的标记位置；原生滚动入口继续可用，新增有实际 Scrollbar / Thumb 的高级组合及迁移示例。
5. 主 agent：依赖、共享 locale、生成产物、交付记录、集成、单浏览器验证、包消费检查与发布。按仓库并行实施约定将前三项交给独立 owner；子 agent 不启动浏览器、不改共享生成物或发布。

## Dependency decision

当前手写等高窗口不能完成动态测量、稳定跳转与表格虚拟化。复用已核实的 `@tanstack/react-virtual@3.14.22`（MIT，依赖 `@tanstack/virtual-core@3.19.7`，无 install 生命周期脚本），不复制上游组件实现或设计值。锁定版本，保留本库对语义、焦点、锚点及外观的所有权。

## Execution

- [x] 三个数据组件能力与针对性测试、双语 API、真实示例。
- [x] Menu / ScrollArea 能力与测试、双语 API、示例。
- [x] 主 agent 审查整合，更新反馈处置中的已实现边界。
- [x] 类型、完整测试、库 / 文档 / Studio 构建、API 与事实检查。
- [x] 单浏览器串行验证新能力、浅深与窄屏、键盘 / 指针、失败或取消路径；记录每次浏览器与服务的归属并清理。
- [x] 包内容和安装后的消费检查；新 minor 版本、发布说明与完整可审阅产物。
- [x] 核实消费项目与账号边界；外部迁移版本未提供，npm 登录账号已确认 qingye_lab。
- [ ] 外部消费项目验收：需报告对应的迁移提交与可访问地址。
- [x] 发布授权由本次“完成”覆盖；GitHub 与 npm 4.2.0 已发布，official registry 的 latest、包摘要、匿名下载和隔离安装均已核实。

## Verification boundaries and recovery

纯单元测试不代替浏览器布局、真实辅助技术播报、实体触摸或消费项目登录页验收。只报告实际观察；访问不到的环境不填 PASS。新 API 采用显式 opt-in，现有消费可通过不启用新选项保持原行为；发布不可覆盖已存在版本，不执行历史改写、删除版本或破坏性远端操作。

执行证据持续记录在本计划末尾及 `docs/decisions/2026-10-23-consumer-migration-feedback.md`，不新增竞争计划。

## Observed integration results

- 最终源码：完整工作区类型检查 PASS；UI 117 文件 / 1104 用例、Tooling 31、Docs 61、Studio 14 均 PASS。另有 Studio preview 3 用例、facts-ledger 检查、process/delivery 8 用例 PASS。
- UI / Tooling / Studio / Docs 最终构建 PASS；API 漂移检查为 95 个 type-resolved、0 missing / 0 unresolved，未增加 baseline。包内容、703 个打包文件、声明映射、publint strict、attw esm-only PASS。
- 首轮 `test-results/consumer-migration/report.json`：最终构建上 25 项 PASS，0 runtime errors。1200px / 390px × 浅深主题，覆盖五项新能力及 Dialog/AlertDialog 定位、反向校验、关闭焦点返回；另有触摸同点第二次点击关闭。浏览器进程退出已核对。
- 独立审查修复 DataTable 换模型及用户滚动后的旧索引命令；缩短模型用例在修复前失败，修复后通过。Sparkline 修饰键与调用方取消协议通过回归。Menu/ScrollArea 复核未发现确定缺陷。
- `dist-pack/qingye_lab-ui-4.2.0.tgz` 已生成，npm dry-run PASS。SHA-256 `ad6807e683ff631532b17042f998bbd38ade1a93d0821a01d399fd014c749993`；SHA-512 integrity `sha512-vZWtw5TSO/Eh8eGRypV8xnuaObdtsifRBi1M+/voCvOpsuJZKh/EkVI8PVcHiMmWvibeXUB9QyyzOoOvy5+Mbg==`。历史 AI 版本未混入新 tarball。
- 发布准备时的外部边界：npm registry 最新为 4.1.0，whoami 返回 HTTP 401；后续登录及发布状态见末尾记录。未扫描其他凭证来源，未将 dry-run 记为已发布。外部消费项目尚缺报告对应提交/可访问地址；未修改本地 UI-AI，也不使用无迁移代码的远端默认分支冒充验收。

- 最终 `--foundations`：runtime PASS，0 errors / control findings；53 条实际观测，令牌计算 PASS 27 / FAIL 0 / UNVERIFIED 26 / NOT_RUN 0，指纹匹配。UNVERIFIED 为静态路径边界，未提升为通过。`docs/token-ledger.json` 保存本轮观测。
- 最终 Studio：`test-results/studio/run-xgnu1R/report.json` PASS，覆盖两项目、草稿/错误、Portal、写入冲突、导入导出、属性明暗模式及迟到结果；浏览器与 fixture 服务退出已核对。
- 最终全组件审计：95 组件 × 2 主题，190 页，0 problems；`test-results/release-audit/report.json`。新 public-demo 回归加入 CI 与 Release 串行门禁。原有组合 `--patterns` PASS。
- 四个真正隔离安装项目（Tailwind / precompiled × Button-only / full）均 PASS，新增能力均在 full 中验证，Button-only 无 Table/Chart peer；无 workspace source alias。报告 `test-results/packed-consumers/run-GCx3qO/report.json`。所有 preview 与浏览器退出已核对。
- 打包 Tooling 0.5.0 安装检查 PASS，报告 `test-results/packed-tooling/run-AOKfNj/report.json`。UI minor 不绑定 Tooling 或私有 Studio 版本。
- 最初几何扫描因输出目录不存在未写出报告，已建目录后完整重跑；测试中的弹窗居中判断已改为真实 modal viewport（包含文档 scrollbar gutter 约束），关闭焦点等待实际退场结束。最终门禁均非沿用失败结果。

## Remote validation and remaining boundary

- 组件及分发源码提交 `4421c7f`，已推送 main 与 `v4.2.0` tag；tag 不改写。对应 [CI 39964327710](https://github.com/qingye-lab/qingye-ui/actions/runs/39964327710) 全部 PASS，包括 Linux 的 25 项新能力检查、包消费与 Tooling。下载的完整检查位于 `test-results/ci-4421c7f/consumer-migration/report.json`。
- [Release 39964333594](https://github.com/qingye-lab/qingye-ui/actions/runs/39964333594) 首次 attempt 在 24 项通过后，触摸首次点击的 tooltip 可见性等待超时；其余桌面/窄屏检查及主题检查通过。失败报告保存为 `test-results/release-remote-failure/consumer-migration/report.json`。没有点击目标、事件或触摸失败截图，不能据此证明库内缺陷或具体竞态。第二次 attempt 仍在同一触摸首次点击等待超时。保留两次失败状态，不继续盲目重跑，不改写 tag。后续发布依据加固脚本通过完整 CI 的产物，见末尾记录。
- 测试加固：字体 ready 后再滚动；touch 使用 locator.tap 的稳定/命中检查，记录 viewport、bbox、hit target、pointer/click 事件及失败截图，向日志输出异常。它缩小 raw 旧坐标与异步 hash 滚动之间的未验证窗口，属于测试驱动的防护，未宣称确认原失败根因。新增诊断路径的浅深/桌面窄屏及触摸 5 项 PASS，报告 `test-results/consumer-migration/sparkline-hardened-report.json`；两次点击均命中实际 sparkline-trigger，浏览器与 preview 退出已核对。
- 补做的本地 10 次触摸开关均 PASS；后续轮次复用了 document，不能当作 10 次独立冷启动，也不能将诊断监听器累积误判为组件重复点击。
- 官方 npm registry 的生产依赖审计 PASS：79 个依赖，0 已知漏洞。镜像 registry 无 audit endpoint，已明确改用官方接口核实。
- 用户完成登录后，npm whoami 确认为 qingye_lab；4.2.0 版本未被占用。最初两次正式 publish 触发 npm 独立的网页发布认证，回调持续 HTTP 202，最终以 404 结束；该阶段 registry 无 4.2.0。后续成功认证与实际发布见末尾记录。认证链接不写入仓库，不将账号登录或 GitHub 附件记成 npm publication。

## Published GitHub delivery

- [加固后完整 CI 39967917648](https://github.com/qingye-lab/qingye-ui/actions/runs/39967917648) 对 aa3343d 全部 PASS。相对 tag 的变更只有私有验证脚本与本执行记录，packages/ui 公共源和分发资源完全一致。
- [GitHub v4.2.0](https://github.com/qingye-lab/qingye-ui/releases/tag/v4.2.0) 已正式发布，非 draft / prerelease，附件来自该完整 CI 的实际产物；保留原自动 Release 的失败记录，发布说明如实说明分发来源。
- UI CI tarball 含 703 个文件：702 个与本地 npm pack 逐字节相同；package.json 差异仅为 pnpm pack 移除 prepack 和键顺序，其余 JSON 属性相等。最终产物 SHA-256 为 3396e388d6ad9ded8d3b8eabd5b7f735c66dc47767703aa7cde2c7058902aa03，integrity 为 sha512-qWPCkm/+WwY6RKXpAlDt55tM57TnG6XTPEY1WIowv97umMVKwL5uVZEQZ0hzWEgXI3A0LclD5QP5/Notc/aCKg==。
- GitHub asset digest 与该 SHA-256 一致；额外匿名 HTTP 下载成功，1537129 bytes，摘要一致。报告位于 test-results/release-preparation/package-comparison.json 和 github-download.json。Tooling 0.5.0 附件也已上传，不另行发布未变更的 npm Tooling 版本。
- npm 使用上述同一份 UI CI 产物；最终公开版本与匿名消费验证见下。外部消费项目验收继续保持待提供版本/地址。

## Published npm delivery

- 2026-10-24 用户授权重新发起发布认证；账号仍为 qingye_lab。此次认证回调 HTTP 200，publish 请求 HTTP 202，命令退出 0。随后等待公开 registry 实际出现版本，没有把 CLI 接收结果当作公开可安装的证明，也没有重复提交已接收的发布请求。
- 官方 registry 于 2026-10-24T01:15:14.873Z 公开 [@qingye_lab/ui@4.2.0](https://www.npmjs.com/package/@qingye_lab/ui/v/4.2.0)，latest=4.2.0。匿名 metadata / tarball 均 HTTP 200；1537129 bytes，SHA-256 3396e388d6ad9ded8d3b8eabd5b7f735c66dc47767703aa7cde2c7058902aa03，SHA-1 与 integrity 均匹配上述 CI 产物。npm、GitHub 下载与 CI tarball 逐字节一致，报告 test-results/release-preparation/npm-publication.json。
- 清空独立 user/global npm 配置并移除认证环境变量后，从官方 registry 隔离安装 4.2.0 PASS；未使用 workspace source alias。12 个公共组件导出及动态 VirtualList、交互 Sparkline、定宽虚拟 DataTable 的 SSR 检查 PASS，报告 test-results/release-preparation/registry-consumer/report.json。此前完整 CI 和浏览器证据对应的产物未改变，本次只更新交付记录，不重跑无关组件测试。
