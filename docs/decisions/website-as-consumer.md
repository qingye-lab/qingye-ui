# 官网作为组件库的第一方消费端

2026-10-02。依据用户最新裁决：首页参考 [coss UI](https://coss.com/ui) 的布局；反对说明书式界面；组件按实际使用需求设计，允许重构而不强留 coss 实现。

- 首页用简短产品介绍、开始使用/示例入口与组件预览目录建立顺序。移除双长任务和后续摘记叙事方案；它们均不作为本轮视觉验收结果。
- 组件预览实际渲染 `@qingye/ui`；卡片由 CardFrame/Card 构成，标题由 Heading 承担，布局使用公共组件与页面 CSS。预览不抢焦点，整个卡片链接进入可操作的组件文档。
- 官网不复制一套基础控件。页面结构、列表、原生链接与库 `render` 根元素保留正确 HTML 语义；链接外观可使用 `buttonVariants`，不能把导航强制改为 button 角色。
- 结构和状态承担解释。界面删除重复标签、显然的操作说明、设计自述与装饰性描述；保留真实内容、动作、必要后果和错误恢复。方法的完整说明属于设计指南和文档。
- 根 `design.md` 是公开指南唯一源。生成器写入网站与包，并将项目接入段同步到 AI Skill。AI 文档提供可复制的 AGENTS/design 项目片段；消费项目持续读取实际安装版本，不凭网站版本猜测 API。
- 全部 88 个库模块按独立边界由子代理逐项检查并实施，主 agent 审核集成。语义、状态、层级、密度、窄屏、长内容和键盘路径须有具体判断；可以保留成熟实现，不以重写数量或统一换皮为验收。

## 验证入口

- `pnpm --filter docs check:components`：TypeScript AST 检查实际 JSX 控件与 Button 导航，不把代码字符串算作渲染控件，不把任意 `render` 属性当通行证。它不是全部运行时语义或第三方组件审计。
- `pnpm --filter docs test`：控制复用正反例、任务状态测试和公开资料约束。
- `pnpm --filter @qingye/ui exec vitest run test/public-guidance.test.ts`：指南副本、catalog 哈希和 Skill 接入段同源。
- `pnpm docs:build`；构建后的 preview 上检查首页 1440px / 390px、浅色 / 深色、组件预览、键盘、导航、复制与溢出。改变视觉后查看截图；不能只用类型检查代替。
- `scripts/verify-task-patterns.mjs`：共享任务模式正常与异常路径。折叠入口按可访问按钮名称定位，避免锁定原生 summary。

证据保存在 `test-results/home-renovation/`；最终采用的画面和已放弃方案分别标注。视口模拟不等于真机、屏幕阅读器或真实中文输入法验收。
