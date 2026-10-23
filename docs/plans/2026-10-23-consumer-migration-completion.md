# 消费项目迁移能力收尾

Status: verified locally / remote release in progress · 2026-10-23

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
- [ ] 核实消费项目和 npm 账号状态；有访问能力的验收继续执行，缺失访问或认证按实际控制层记录。
- [ ] 发布授权已由本次“完成”覆盖上一条列出的新版本发布；发布前核对 registry、包名、版本与打包内容，发布后读取实际 registry 状态。

## Verification boundaries and recovery

纯单元测试不代替浏览器布局、真实辅助技术播报、实体触摸或消费项目登录页验收。只报告实际观察；访问不到的环境不填 PASS。新 API 采用显式 opt-in，现有消费可通过不启用新选项保持原行为；发布不可覆盖已存在版本，不执行历史改写、删除版本或破坏性远端操作。

执行证据持续记录在本计划末尾及 `docs/decisions/2026-10-23-consumer-migration-feedback.md`，不新增竞争计划。

## Observed integration results

- 最终源码：完整工作区类型检查 PASS；UI 117 文件 / 1104 用例、Tooling 31、Docs 61、Studio 14 均 PASS。另有 Studio preview 3 用例、facts-ledger 检查、process/delivery 8 用例 PASS。
- UI / Tooling / Studio / Docs 最终构建 PASS；API 漂移检查为 95 个 type-resolved、0 missing / 0 unresolved，未增加 baseline。包内容、703 个打包文件、声明映射、publint strict、attw esm-only PASS。
- `test-results/consumer-migration/report.json`：最终构建上 25 项 PASS，0 runtime errors。1200px / 390px × 浅深主题，覆盖五项新能力及 Dialog/AlertDialog 定位、反向校验、关闭焦点返回；另有触摸同点第二次点击关闭。浏览器进程退出已核对。
- 独立审查修复 DataTable 换模型及用户滚动后的旧索引命令；缩短模型用例在修复前失败，修复后通过。Sparkline 修饰键与调用方取消协议通过回归。Menu/ScrollArea 复核未发现确定缺陷。
- `dist-pack/qingye_lab-ui-4.2.0.tgz` 已生成，npm dry-run PASS。SHA-256 `ad6807e683ff631532b17042f998bbd38ade1a93d0821a01d399fd014c749993`；SHA-512 integrity `sha512-vZWtw5TSO/Eh8eGRypV8xnuaObdtsifRBi1M+/voCvOpsuJZKh/EkVI8PVcHiMmWvibeXUB9QyyzOoOvy5+Mbg==`。历史 AI 版本未混入新 tarball。
- 外部边界：npm registry 最新仍为 4.1.0，whoami 返回 HTTP 401。未扫描其他凭证来源，未将 dry-run 记为已发布。外部消费项目尚缺报告对应提交/可访问地址；未修改本地 UI-AI，也不使用无迁移代码的远端默认分支冒充验收。

- 最终 `--foundations`：runtime PASS，0 errors / control findings；53 条实际观测，令牌计算 PASS 27 / FAIL 0 / UNVERIFIED 26 / NOT_RUN 0，指纹匹配。UNVERIFIED 为静态路径边界，未提升为通过。`docs/token-ledger.json` 保存本轮观测。
- 最终 Studio：`test-results/studio/run-xgnu1R/report.json` PASS，覆盖两项目、草稿/错误、Portal、写入冲突、导入导出、属性明暗模式及迟到结果；浏览器与 fixture 服务退出已核对。
- 最终全组件审计：95 组件 × 2 主题，190 页，0 problems；`test-results/release-audit/report.json`。新 public-demo 回归加入 CI 与 Release 串行门禁。原有组合 `--patterns` PASS。
- 四个真正隔离安装项目（Tailwind / precompiled × Button-only / full）均 PASS，新增能力均在 full 中验证，Button-only 无 Table/Chart peer；无 workspace source alias。报告 `test-results/packed-consumers/run-GCx3qO/report.json`。所有 preview 与浏览器退出已核对。
- 打包 Tooling 0.5.0 安装检查 PASS，报告 `test-results/packed-tooling/run-AOKfNj/report.json`。UI minor 不绑定 Tooling 或私有 Studio 版本。
- 最初几何扫描因输出目录不存在未写出报告，已建目录后完整重跑；测试中的弹窗居中判断已改为真实 modal viewport（包含文档 scrollbar gutter 约束），关闭焦点等待实际退场结束。最终门禁均非沿用失败结果。

远端发布结果在执行后补记。
