# npm 发布准备与 Studio 预览修正

## 状态

- `@qingye/ui@1.0.0`：公开发布准备完成，**尚未发布到 npm**。
- Studio 预览：已修正并验证。正常服务为 `http://localhost:5182/`，库默认外观为 `/preview.html`。
- 原有工作区改动保留，没有提交、推送 Git 或发布官网。

## 发布产物与检查

产物：`dist-pack/npm/qingye-ui-1.0.0.tgz`，529 个文件、87 个组件，973937 bytes。
SHA-256：`a289891fa6c8c224bde7c5ee5b00afbcea0ed4277833522c651c2247042469f3`。

已观察到：锁定依赖安装、工作区类型检查、UI 758 项测试、docs 59 项测试、tooling 31 项测试、事实台账与生命周期检查、库/docs/Studio 构建通过。首次并发运行的模板编译超时，经单独复测及降低并发的完整 UI 复测通过。

87 个组件 × 浅色/深色，共 174 个页面状态通过浏览器审计。四种独立 tarball 消费项目（Tailwind/预编译 × Button/完整组件）均完成安装、类型、构建及浏览器验证；精确产物证据见 `test-results/packed-consumers/run-FP6hqE/report.json`。组合检查通过，见 `test-results/npm-v1.0.0/patterns-report.json`。此前主题运行时检查 PASS，但静态路径仍为 21 PASS / 26 UNVERIFIED；后续私有 Studio 依赖锁变更使新的台账观测失效，不能沿用为当前全台账 PASS。

此次同步修复了已有发布检查的旧引用：Select 已删除的 demo/size 属性、归档 Group 的 fixture 假设、理念页旧文案、Chart 的必填 type 与按需数据表，以及消费 HTML 缺失的 UTF-8 声明。没有放宽品牌样式、排序、草稿保留、错误或消费断言。

## 发布阻塞

当前 npm 登录账号为 `qingye_lab`，账号已启用 `auth-and-writes` 2FA。真实 `npm publish` 请求返回 E403，要求有效的 2FA 发布认证；账号查询到 `qingye` 组织的成员过滤结果为空。尚需处理命名空间发布权限。

再次执行 `npm publish` 被执行平台在启动前拒绝：`approval required by policy, but AskForApproval is set to Never`。这不撤销用户的公开发布授权，但该平台控制不能通过更换命令或关闭认证绕过。等待用户确定保留 `@qingye/ui` 或改用有权限的命名空间；发布后的 registry 校验与匿名安装为 NOT_RUN。

## Studio 根因与修正

用户看到的 `localhost:5182` 原来是自动验证的临时服务。验证故意将圆角设为 19、23、29px；这些状态不是库默认外观。预览还包含“组件预览 / 字段 / 浮层 / 切换输入错误”等演示文案，且 Studio 的全局 h1/h2/label 样式会覆盖预览中的库文字部位。

修正后，预览以本地文档编辑、筛选和关联资料呈现组件；应用和还原只操作 iframe 内的草稿，必填名称错误来自真实输入。去掉泛化说明与调试按钮，保留操作、真实状态和错误恢复。默认预览不覆盖库主题；Azure/Amber 示例只覆盖品牌配色。Studio 文字规则限制在 `.studio-shell` 内，预览与 Portal 使用库的文字角色。

验证服务改用随机端口及独立 fixture 副本。截图先记录未修改的库默认，压力测试截图另行保存。

最新验证：Studio 构建、类型、14 项服务测试、3 项预览交互测试通过；12 项真实浏览器检查通过，见 `test-results/studio/run-I8HftD/report.json`。浅色/深色的 Button/Input/Select/Textarea 圆角均为 10px，Card 为 16px；默认按钮外高 32px。两主题文字对比检查通过，浏览器及临时服务均已关闭。机械设计检测返回空结果。

正常 5182 服务明确保留供用户预览，使用仓库内未被测试修改的 Azure/Amber 主题。真实设备、输入法及屏幕阅读器验收未执行。

## 用户裁决后的新命名空间

用户已选择 `@qingye_lab/ui`。包配置、当前工作区依赖、导入、双语源指南、生成器、Registry、CI/Release 打包文件名和消费验证已同步；历史版本与冻结资料保留旧名称。Tooling 的配置协议随之同步，版本为 0.5.0。

新产物：`dist-pack/npm/qingye_lab-ui-1.0.0.tgz`，529 个文件、974792 bytes。SHA-256：`c70351a4fdf1f923215fef4de0dce2aed6779828f2dd0ccc6a339e4f3e7b314b`。当前指南与模板无旧导入引用；产物与当前源码逐文件一致。

新命名空间下重新观察到：工作区类型检查、UI 758 / docs 59 / tooling 31 / Studio 服务 14 / Preview 交互 3 项测试通过；全部构建、锁定依赖安装与事实检查通过。独立 tarball 消费四种组合通过，见 `test-results/packed-consumers/run-RTSwer/report.json`；tooling tarball 消费通过，见 `test-results/packed-tooling/run-q3dqO5/report.json`；Studio 12 项浏览器检查通过，见 `test-results/studio/run-kKNTCj/report.json`。

新的 174 页面浏览器审计无问题，任务组合检查通过；主题运行时 PASS，静态路径 21 PASS / 26 UNVERIFIED。证据见 `test-results/npm-v1.0.0/newscope/`。

本次对新目标的实际发布请求已被执行平台接受，但 npm 仍以 E403 拒绝旧会话的 2FA 发布认证。已重新发起官方 CLI 登录，等待用户完成现有 2FA；此时仍未发布。前一次平台启动前拒绝只对应其当时的旧目标/命令，不能据此宣称新目标已经被发布，也没有关闭平台或 npm 的认证控制。

## 本轮交付状态

`@qingye_lab/ui@1.0.0` 的候选包、名称迁移及上述检查已完成。后续官方 CLI 授权链接在用户完成认证前超时，已取消其 legacy username/password 回退；没有读取或传递账号密码，没有创建 bypass-2FA token。npm 发布仍未完成，registry 下载及匿名安装仍为 NOT_RUN。

README 与本地官网安装入口已明确使用 `qingye_lab-ui-1.0.0.tgz` 候选文件，`SITE.npmPublished=false`；没有用旧名称 GitHub tarball 冒充新包，也没有将未发布候选标为 npm 可安装。该安装状态变更已重新通过官网 59 项测试及构建。完成实际 npm 发布后，再核对 registry 内容、匿名安装，并更新发布状态。

## npm 分阶段发布

2026-10-08 后续认证重试仍收到直接发布 E403。按 npm 官方 staged publishing 流程，已成功上传同一精确产物：`@qingye_lab/ui@1.0.0`，stage ID `c5dbdd15-0067-421a-bdc6-9e9f70f83170`，tag `latest`，access `public`。返回的 integrity 与本地已验证文件一致。状态由 validating 转为 staged。

CLI 的 `npm stage approve` 在 staged 状态下仍返回 E404；读/list 接口能读取同一 stage。不能将列表存在或 placeholder 当作 1.0.0 已发布。用户可从 npm 官网 Staged Packages 通过现有 2FA 批准；当前等待此批准，并继续核实公开 registry 的 1.0.0 与精确产物。

## 官网批准待完成

stage 的最新读取状态为 staged，packageName 为 `@qingye_lab/ui`，version 为 1.0.0，tag 为 latest，access 为 public，shasum 与本地精确产物一致。匿名 registry 当前仅有 0.0.0-stage placeholder；没有公开 1.0.0。CLI 批准在 validating 与 staged 两个状态均返回 E404；阶段列表与读取正常。已请用户从 npm 官网 Staged Packages 批准 1.0.0 并完成现有 2FA。

此记录只证明候选已上传，不代表正式 npm 发布成功。正式批准后还需检查 1.0.0 registry integrity、匿名下载/安装，更新 `SITE.npmPublished` 与公开发行说明。

## CLI 审批诊断

用户询问 CLI 审批后，已核对本机 npm 11.19.0 与官方 latest 的 stage/approve 实现，均调用 `POST /-/stage/<stage-id>/approve`。仅记录请求元数据的临时观测确认：实际发送了正确阶段 ID、官方 registry、POST 方法及已有 Authorization；没有暴露凭据值。普通输出与 JSON 输出均返回 404；一个保持认证选项不变的空 JSON 请求体兼容性探测同样返回 404，没有重定向，也没有 EOTP 挑战。

新的官方 CLI 登录已实际完成，终端返回 Logged in，凭据文件更新到 2026-10-08 18:09:30；随后审批仍返回相同 404。因此旧会话不是全部原因，不能继续将重新登录当作已证明的根因修复。公开维护者为 qingye_lab，与阶段 actor 一致；包仍只公开 placeholder，1.0.0 仍 staged。

尝试以后台方式读取现有 Chrome 审批入口时，Mirasim 的 macOS Accessibility 权限层拒绝读取；没有前置浏览器、移动指针或修改系统权限。已向用户请求开启该平台权限及允许在 Chrome 的 npm 审批页操作。实际 Touch ID / 2FA 仍由用户完成。
