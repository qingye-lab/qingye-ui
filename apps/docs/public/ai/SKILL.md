---
name: qingye-ui
description: Build complete React tasks using the installed Qingye UI version, public methods and verified facts.
---

# Qingye UI

This file accompanies @qingye/ui 1.0.0. Read the installed version first; a website or upstream namesake may describe another API.

## 在项目中持续使用

接入 `@qingye/ui` 时，把方法与真实 API 的引用留在项目的 `AGENTS.md` 和 `design.md`，后续任务沿用。以下片段合并到已有文件，保留原有规则和项目事实，遵守项目指导文件的写入权限；本指南不授权自动修改其他仓库或覆盖文件。合并时查明并记录项目集中主题、公共组合和验证命令的实际入口；尚不存在的入口如实注明。

若已安装版本尚未包含本指南，可把下载文件保存为 `docs/qingye-design.md`，并将下方片段中的指南路径改为该路径；组件 API 仍按已安装的包核对。

项目 `AGENTS.md`：

```md
## Qingye UI

- 界面设计先读本项目 design.md 与 node_modules/@qingye/ui/design.md，依据相关方法判断任务、语义、结构和状态。
- 实现前核对已安装 @qingye/ui 的 package.json、catalog.json、声明和相关示例；交互控件复用共享包，项目负责主题与公共组合，应用负责权限、草稿、请求和结果。
- 验证正常与相关失败、取消或恢复路径，并按影响检查键盘、可访问名称、对比度、窄屏和长文本；仅报告实际运行的检查。
```

项目 `design.md`：

```md
## Qingye UI 方法

器用为本，关系为法，合宜为度。具体判断依据 node_modules/@qingye/ui/design.md 的名实相符、相成相制、布白有用、随境取度、展开有据、进退相承；普通组件采用相关方法，完整任务检查六类问题。

组件能力以本项目已安装 @qingye/ui 的 catalog.json、类型和示例为准。品牌、明暗、密度独立；集中主题、公共组合和验证命令在本文件记录实际入口，变更时更新。
```

包升级后仍读取安装版指南和声明；网站资料用于发现，不能替代本地版本事实。其他技术栈可把完整指南保存为项目文档并引用该路径，采用设计方法，但须另行验证平台语义，不能假定本库 API 可用。

## Style contract

Read [style.md](style.md) before implementing UI. It contains the 设计契约 from
../design.md and the component implementation rules from STANDARDS.md.

These are bans, not preferences:

NG1. 复述标题或相邻元素已经表达的内容
NG2. 把本来有主次的信息平铺为等权
NG3. 在同一产品面上混用互不相干的设计语言
NG4. 用卡片围合没有独立身份的内容
NG5. 标题上方加 kicker 或 eyebrow
NG6. 用装饰性动效交代状态，或让任务结果依赖动画结束
NG7. 让唯一的关键后果只存在于会消失的提示里
NG8. 在界面文案里解释自身的设计或实现

Also binding: prose length and text size must never change the structure;
density tightens spacing and never shrinks type; sizes come from the named type
steps, never a one-off value.

## Task workflow

1. Read project instructions, the UI entry point, installed package.json, catalog.json and design.md. Check the project's persistent references described above when completing onboarding. Preserve unrelated work.
2. State the object, action, scope, current status and work to retain. Use relevant methods; cultural terms are not HTML roles or API names.
3. Load related resources from ai/v<installed-version>/components. actualExports and local declarations are authority. api is curated guidance. Missing signatures and provider requirements remain UNVERIFIED. Inspect example imports and optionalPeers.
4. Reuse current props and combinations. The library owns shared UI behavior, the project owns recipes/theme, the application owns permissions/drafts/requests/versions, and tooling owns facts/diagnostics. Do not copy foundation controls.
5. Implement normal, waiting, relevant failure/unknown, cancellation and return paths. Timeout does not prove a write failed. Confirm current objects and revisions. Cancellation requested differs from cancellation complete.
6. Run existing checks. Separate source, computed styles, interactions, accessibility and human visual judgment. Report PASS, FAIL, UNVERIFIED, NOT_RUN or justified N/A. Never relax tests or invent success.

Read [design-philosophy.md](design-philosophy.md) for methods and their sources; [the public guide](../design.md) for project adoption; [installation](v1.0.0/installation.md) for styles and dependencies; [the resource index](v1.0.0/llms.txt) for component constraints. Examples use synthetic local application state and do not prove backend permissions, persistence, idempotency or cancellation.

Registry templates reference this exact package version. Check configured package access; never silently substitute latest. This skill grants no external-action authority and creates no runtime model service.
