# 阶段五：官网消费端执行记录

授权边界：官网外壳、预览、页面、相关 CSS/fixture/测试与本报告。执行跨至 2026-10-04。与组件作者、metadata/英文指南 owner 并行；保留他人工作，没有读取归档、冻结副本或旧上游实现。

## 已实现

- 当前公共 Card/Heading/Inline 的首页目录，真实第一 demo 的延迟缩略预览；整对象导航，预览不抢焦点。
- 桌面 Header、公共 ThemeMenu、搜索、双语链接、文档侧栏/目录/页脚。普通菜单消费其自身 Portal/Positioner，网站 chrome 层级低于公共浮层。
- 当前 inline Combobox+Dialog 搜索，真实内容评分与导航；正常选择、无匹配与 Escape 恢复。
- 公共 Tabs、CopyButton、TableContainer、Empty 的组件页与裸 playground；加载/渲染失败局部恢复，源代码保留原文本。
- 六个简单组合入口，当前 Pattern 结构目录；删除缺失业务模式详情路由与旧 API 消费。旧业务资源生成入口为兼容现有构建命令的 no-op，不产生假服务数据。
- 指南页改为实际版本/角色与 caller 状态；主题台保留可操作预览，动作变为实际聚焦/重置。Token 页从当前 CSS 读取名称及当前主题计算值，不凭角色名声明对比度。
- 完整英文哲学源、中文源哈希与稳定方法锚点；AI 页面接 metadata owner 的同源英文指南/接入/任务接口。非示例页面内容按路由语言选择。
- 经 root 单项授权，将 theme-provider segmented demo 的原生 label 替换为公共 Label，保留内容与交互。

## 精准证据

| 检查 | 观察结果 |
| --- | --- |
| 网站 components/pages/App/nav 与四个对应 fixture 定点 strict TS | PASS；最后一轮无诊断。只包含官网拥有范围并自然解析依赖，未运行完整项目 typecheck。 |
| 官网控件 AST | PASS：223 个 TSX、0 个控件违规。原生 option/optgroup 仅在来自本库的 NativeSelect 结构中合法；孤立、别库同名与其他原生控件仍检查。 |
| `site-contracts.test.mjs` | 9 个不同契约均观察到 PASS：导航焦点、公共单搜索入口、搜索 Enter、无匹配/Escape、局部失败重试、Empty 结构、复制 pending/confirmed/rejected、定点 demo 加载、原生侧栏容器滚动。前 8 项最后同次 PASS，新增侧栏项单独 PASS。 |
| `task-contracts.test.mjs` | 5 个不同契约均观察到 PASS：双路由/旧入口恢复、当前搜索身份与全词匹配、当前首页目的地、英文哲学/方法/出处、英文 AI 同源接入。修复后仅重跑对应失败/新增项。 |
| `truthfulness.test.mjs` | 3 个不同契约均观察到 PASS：实际第一 demo 草稿/应用/取消/空态恢复、Tabs 草稿与零值、已删除业务示例的不可用状态与返回路径。 |
| 英文组件页相关回归 | PASS：真实英文 API/章节、缺组件/失败标题、部分翻译消费 3 项。 |
| 文档 shell 相关回归 | PASS：标题/主区域聚焦与动态目录文本 2 项。 |
| AST 所属边界正反例 | PASS：相关原有 3 项、NativeSelect 新结构正反例 1 项、实际网站 1 项。未重复整库检查矩阵。 |

第一次检查揭示：Node DOM fixture 在 DOM 创建前导入 react-dom/client，controlled-input 的 change 路径未初始化；改为建好 DOM 后导入。Search Enter 真实复现 `finalFocus` 内手动 focus 造成重入，改为返回目标后正常关闭与聚焦。英文 source marker 与 H1 连行时曾被当正文，parser 改为只剥离精确 marker。

一次已有 locale/docs-shell SSR 组合调用开启旧 Vite WebSocket，遇到 24678 占用并停留；fixture 改为 middlewareMode + hmr/ws=false，随后串行定点检查 PASS。中止的 task-owned Node 父子进程按确切 PID 清理，最终核对没有本批测试残留；未触碰 root 浏览器或开发服务。

## 集成与未验证项

- NOT_RUN：本 agent 的 build、gen:index、gen:catalog、完整测试套件、Git 操作与浏览器；统一由 root 接管。
- UNVERIFIED：当前官网桌面浅深色的真实 computed/截图、首页缩略裁切、长表比较容量、浏览器焦点与叠层、发布资源响应；不能以本报告 DOM/SSR PASS 替代。
- 当前 `/examples/<slug>` 只支持公开列出的六个简单组合；旧 Mail/Dashboard/Studio 等页面显示明确不存在。旧模式详情进入 not-found。
- 其他跨批旧 browser fixture/pack/Studio 脚本由阶段六 owner 核对。`focus-rederivation.tsx` 的旧模块契约不在当前 App 中消费，已经通知 owning agent，不能当作当前网站验收依据。
- 根指南英文块和全部 metadata 的写入属于 C；网站只消费公开接口。生成副本没有手工改写。
