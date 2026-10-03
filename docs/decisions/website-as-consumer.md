# 官网作为组件库的第一方消费端

当前裁决：2026-10-03 重写任务，执行收尾跨至 2026-10-04。取代本文件早期的 88 模块、业务任务模拟和移动外壳安排；历史裁决见对应日期的计划与执行记录。

## 任务与边界

官网帮助人识别组件、打开真实示例、查当前 API，并把同源设计指南带入项目。当前目标为已重写的 83 个组件，目录数量与示例来自 `content/*/meta.ts` 和当前 registry，不另维护计数或示例库存。

- 首页用简短介绍、开始使用和组件预览目录组织桌面浏览。每个目录对象用当前公共 Card、Heading 和真实第一 demo；预览 inert、aria-hidden，卡片链接进入可操作的文档。
- `/docs/components/:slug` 与 `/components/:slug` 共用组件内容身份；playground 裸页消费同一 registry 和 demo ID。预览、源码、API 与键盘信息保留各自用途。
- `/examples` 只呈现 InputGroup、Tabs、FilterBar、BulkActionBar、DataTable、Toolbar 的简单公共组合。实际 demo 展示本地内容和 caller 管理的状态，不模拟业务对象、请求、权限或服务结果。
- `/docs/patterns` 是当前 Pattern 公共结构目录。已删除业务模式的详情路由进入 not-found，不从归档恢复旧消费者。`generate-fixtures.mjs` 保持构建调用入口但不再生成无人消费的假业务资源。
- 所有交互控件复用本库公开组合；页面结构、表单分组和原生链接保留 HTML 语义。链接外观可用 `buttonVariants`。NativeSelect 的原生 option/optgroup 是其必要结构，并非一套另造的基础控件。
- 当前范围是桌面网站，Header 直接呈现导航；不为旧 Sheet 恢复移动菜单，也不恢复 Skeleton、Disclosure、Frame、Command 等禁用模块。

## 语义与状态

搜索由当前公开的 inline Combobox 与 Dialog 组成。结果来自当前指南与组件，caller 排序并提供目的地；无匹配不能发明结果。选择结果后把页面标题/主区域返回给 Dialog 的 `finalFocus`，由原语实际聚焦，避免在关闭回调中提前 focus 造成重入；取消归还原触发位置。

草稿和已应用条件分别保存；应用后才改变结果，取消回到已应用条件。Tabs 保留隐藏面板的草稿。复制成功由 Clipboard Promise 确认，拒绝后呈现公共 CopyButton 错误反馈。加载和渲染失败按对应局部说明，重试不丢弃文档邻接内容；未知、空与不适用分别使用当前 Empty 状态。

侧栏选中项在当前原生 ScrollArea 容器内滚动到可见处，使用真实 `data-slot="scroll-area"`，不依赖已删除的 Viewport 部件。

## 表达取值

| 取值 | 归属与理由 |
| --- | --- |
| 控件、对象边界、字号与焦点 | 公共组件和当前角色接管；页面链接 focus 使用 quiet 角色向盒内绘制。 |
| 页面间隔与动作共置 | field/fields/actions/panel/section 关系角色；Chrome 与正文属于不同阅读位置。 |
| 首页 90rem 容量，四列目录，70rem/50rem 降列 | 官网桌面预设，用于同时识别多个组件；不写成理念强制值。 |
| 文档 48rem、组合目录 72rem 容量 | 官网阅读与并置预设；长 API 表使用公共 TableContainer 保留比较列和键盘滚动。 |
| 预览 15rem 高、20rem 内容容量、0.8 缩放 | 缩略目录预设，只用于识别；完整可操作示例不缩放。浏览器需检查裁切与识别能力。 |
| Header z=1、SkipLink z=2 | 页面 chrome 的集中预设，低于公共 popup=10 与 modal=30。浮层由共享层级工具管理。 |
| 主题试验台配色与圆角范围 | 官网预设；真实公共角色消费，不能凭预设声明对比度通过。 |

## 双语与同源指南

页面 chrome、指南正文、加载/错误恢复及非示例组件资料选择路由语言；具体作者 demo 可保留原示例内容。组件页显式传 locale 到公共 metadata/decision 接口，缺译事实由接口按字段保留，不用通用英语覆盖作者判断。

根 `design.md` 是设计指南唯一源。AI 页面消费 `designEntryFor(locale)`，同源抽取指南、AGENTS/design 接入片段与任务提示；中文 `/design.md` 契约保持，英文入口为 `/design.en.md` 与对应 AI 资源。哲学英文源为 `public-content/philosophy.en.md`，用 canonical 中文源 SHA256 绑定翻译；方法标题生成稳定 `method-1..6`，不修改中文正文、不执行 Markdown HTML。

## 验证边界

本批执行者只运行定点 strict TS、官网真实 DOM/SSR 契约和 TypeScript AST 控件检查。执行记录见 `docs/implementation/2026-10-03-website-consumer.md`。

生成、构建、浏览器由主 agent 串行执行。桌面浅深色首页预览容量、组件页长表、搜索、复制、组合状态、英文路由和公开 Markdown 是实际验收对象；类型检查和 DOM 契约不代表人工视觉、辅助技术或真机验收。没有恢复旧业务测试，也不为通过测试恢复被禁用模块。
