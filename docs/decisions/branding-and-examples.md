# 青野 UI 品牌与组件组合演示

Status: accepted
Date: 2026-10-01

## Context

用户明确要求将整个组件项目与 GitHub 仓库改名为青野 UI / Qingye UI，并提升组件质感、提供精致的完整演示页面。演示用于展示组件能力的组合，页面中的控件全部复用组件库。

## Evidence

组件与文档工作区原使用 @yanqing/ui，公开目录还保留 @qingye/ui-kit 路径。文档站直接消费组件源码，原首页主要展示独立组件组合。GitHub 仓库 ID 为 1398934676；原 Pages 项目标识为 yanqing-ui。

## Decision

包名统一为 @qingye/ui，仓库为 qingye-lab/qingye-ui，显示品牌为青野 UI / Qingye UI。本次组件版本为 0.2.0。保留已经存在的 yq-theme 用户主题键及 Pages 项目标识与可用域名，避免品牌修改打断用户偏好或站点入口；GitHub 仓库重命名保持同一仓库 ID。

通过共享语义材质令牌及少量基础控件适配改善质感，保留 Base UI 行为、触屏尺寸和 reduced-motion 支持。

提供经营概览（`/examples/dashboard`）、青野邮箱（`/examples/mail`）和媒体资源（`/examples/studio`）三个组件组合 demo，同时支持首页嵌入与独立路径。用指标、图表、筛选、表格、输入、菜单、选择和弹窗呈现组件的完整状态与交互。控件全部复用 `@qingye/ui`，布局与示例数据留在文档应用；业务请求与权限不进入基础组件。媒体资源示例展示分类、搜索、收藏，以及 Card + AspectRatio 缩略图、Dialog + Carousel 预览、ToggleGroup 视图切换与 FileUpload 的拖放、预览、拒绝和移除状态。

公开组件目录从源码文件及本地文档元数据生成，随构建刷新，避免包名与使用指导发生偏离。

## Alternatives considered

改用 HeroUI 会替换现有原语与接口，无法直接满足本次组件系统持续演进的要求。仅更改首页 CSS 无法改善消费项目的组件质感。参考 HeroUI、Linear、Stripe、Superhuman 等成熟界面的层级、密度与交互处理，最终由本组件库实现演示。

## Consequences

旧包名的消费项目需要更新导入与依赖；本工作区的消费文档已同步修改。新示例仍为前端演示，不提供实际邮件服务、成员邀请或上传后端。仓库保持原有私有可见性；源码与 Release 下载需 GitHub 访问权限。

## Verification

运行库测试、类型检查、目录一致性校验、文档构建和包构建；以真实浏览器串行验证新示例的默认与交互状态，以及浅色、深色和移动布局。远端重命名检查仓库 ID 保持不变；发布后分别确认提交、Release 产物和文档部署。

## Revisit when

新增实际业务服务或更多示例时评估状态与请求边界。用户要求更换正式域名时再迁移 Pages 入口。
