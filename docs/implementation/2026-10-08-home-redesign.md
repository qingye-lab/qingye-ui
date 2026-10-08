# 2026-10-08 首页重设计

> 已被取代（2026-10-08 稍晚）：该版首页（设计摘录交互面板、宋体总纲）被用户评为不美；现行首页见 `docs/decisions/website-as-consumer.md`「信息架构」与 `apps/docs/.impeccable/surfaces/apps-docs-src-pages-home-tsx.md`。以下为当时的记录，保留作历史。

状态：首页实现与定点验证完成；全站类型门禁 FAIL（本任务之外的当前文档渲染修改）。未执行发布。

## 授权与范围

用户在首页深度评审后要求「帮我重新设计，我觉得设计和交互都不够优秀」。变更 `/`、`/en` 的首页结构、交互、局部样式及其测试。保留其他未提交工作、根 design.md、公共组件 API、主题轴和共享 token。

视觉基线发生明确变化：原来的整屏总纲、古籍出处、长文及十五种方法目录，改为横向品牌区、理念与真实操作样张、按钮尺度实验、墨阶、安装/AI 接入。此项属于首页重设计，不以 refactor 命名。

## 实现与取值

- HomeCollection 复用 Input、Checkbox、Label、SegmentedControl、Button、Empty 与公共剪贴板 hook。六条设计摘录是本页交互示例；没有业务请求或保存成功模拟。
- 筛选保留隐藏项选择；全选只增加当前结果，清空选择明确清除全部；密度与内容状态分离。
- 复制等待防重复，Promise 决定成功或失败，旧内容的结果不能证明新内容已复制。
- SizeStudy 使用公开 Button 五等 API，外高与圆角由 DOM 实测，复制对应 JSX。显示值不沿用可能失效的文档指纹。
- 五级墨阶消费当前语义 token，安装命令使用 GitHub Release，AI 提示由当前 design.md 提取。
- 版心、字阶、页边距、章节间距是官网预设，见 surface brief；系统字体、组件几何、焦点和反馈由已有体系接管。没有新建第二份根设计指南或 token 真源。

## 已观察的验证

| 检查 | 结果 | 范围 |
| --- | --- | --- |
| HomeCollection 状态回归 | PASS | 7 tests；筛选/隐藏选择、密度、当前结果全选、空态、失败重试、Label、过期异步反馈 |
| `node --test apps/docs/test/task-contracts.test.mjs` | PASS | 5 tests；双语路由、主页采用入口、公共组合、Release 命令、指南契约 |
| 首页及传递依赖 TypeScript 检查 | PASS | home.tsx、home-collection.tsx 为 roots，使用 docs tsconfig |
| 交互控件 AST 检查 | PASS | 两个首页 TSX 文件，0 violations |
| `pnpm --filter docs exec vite build` | PASS | 最终 Vite production build；有既存大 chunk 提示；不等于全站类型门禁通过 |
| 构建后浏览器矩阵 | PASS | Chromium 153；中英 × 浅深 × 1024×768、1100×900、1440×1000，共 12 个状态；所测文字/容器无溢出，页面与网络错误 0 |
| 实际密度 | PASS | Input 32→28px，列表行 50→48px，内容文字保持14px；查询“尺度”与3条选择保留 |
| 复制/空态/入口 | PASS | 实际读取 clipboard；注入拒绝得到失败提示；搜索清空恢复6项并保留选择；AI复制与指南下载、安装代码复制 |
| 尺度读数 | PASS | XS/MD/XL 实际外高24/32/40px；页面显示的圆角与 computed 值一致 |
| 键盘与减少动态 | PASS | SkipLink 聚焦 main、Tab焦点可见、Space切换选择；reduce下入场动画none、行过渡0s |
| 文字对比度抽测 | PASS | 标题、定位、总纲、说明、已选/未选摘要、计数、安装注释；合成实际背景后浅色最低6.06:1，深色最低6.43:1 |
| `git diff --check`（本任务路径） | PASS | 代码、样式、测试、决策记录 |
| 全站 `pnpm --filter docs typecheck` | FAIL | 当前 public-markdown.tsx:67、69 的 colophon?: string 收到 string\|undefined，TS2375；该文件不属于本任务修改 |

初轮密度脚本用 aria-label 文本定位 Checkbox 超时。实际 accessible name 由关联 Label 提供，复核通过真实 Label 点击完成；最终构建检查通过。该自动化定位问题不作为产品缺陷。

## 独立评审与证据边界

独立完成评审 disposition: ship，范围是截图中的视觉、构图与表面契约。评审提出的英文1100、暗色窄桌面、密度实测及对比度记录缺口，均在最终构建轮补齐。当前 harness 无专用 Impeccable finish agent，使用隔离上下文的独立 reviewer；额外文档代理因 agent thread limit 不可用，文档由主 agent 校准。

证据目录 `/tmp/qingye-home-redesign-20261008/`：初轮截图与 browser.json、detector.json、最终 build/typecheck 日志；`final/` 包含最终12状态截图与 browser.json。此路径是本机临时证据，不是仓库提交或线上验收。

未测：物理设备、屏幕阅读器、完整 WCAG 矩阵、生产性能与线上部署。当前产品约定只做桌面，窄布局重排不等同于移动真机验收。类型错误与打包结果保持分开报告。

## 资源生命周期

两轮浏览器分别串行启动一个实例，均通过 finally 关闭 context/browser 并确认所属进程树退出。最终构建 preview 为本任务的5181端口，检查结束后停止；原有5180开发服务器保留。
