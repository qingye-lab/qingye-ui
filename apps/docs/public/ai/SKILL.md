---
name: qingye-ui
description: Build complete React tasks using the installed Qingye UI version, public methods and verified facts.
---

# Qingye UI

This file accompanies @qingye_lab/ui 5.6.0. Read the installed version first; a website or upstream namesake may describe another API.

## 在项目中持续使用

接入 `@qingye_lab/ui` 时，把方法与真实 API 的引用留在项目的 `AGENTS.md` 和 `design.md`，后续任务沿用。以下片段合并到已有文件，保留原有规则和项目事实，遵守项目指导文件的写入权限；本指南不授权自动修改其他仓库或覆盖文件。合并时查明并记录项目集中主题、公共组合和验证命令的实际入口；尚不存在的入口如实注明。

若已安装版本尚未包含本指南，可把下载文件保存为 `docs/qingye-design.md`，并将下方片段中的指南路径改为该路径；组件 API 仍按已安装的包核对。

项目 `AGENTS.md`：

```md
## Qingye UI

- 界面设计先读本项目 design.md 与 node_modules/@qingye_lab/ui/design.md，依据器用六法判断任务、语义、结构和状态，依据表达九法决定尺度、墨色、线、形与位置。
- 实现前核对已安装 @qingye_lab/ui 的 package.json、catalog.json、声明和相关示例；交互控件复用共享包，项目负责主题与公共组合，应用负责权限、草稿、请求和结果。
- 验证正常与相关失败、取消或恢复路径，并按影响检查键盘、可访问名称、对比度、窄屏和长文本；仅报告实际运行的检查。
```

项目 `design.md`：

```md
## Qingye UI 方法

器用为本，关系为法，合宜为度。具体判断依据 node_modules/@qingye_lab/ui/design.md：器用六法（名实相符、相成相制、布白有用、随境取度、展开有据、进退相承）处理任务与语义，表达九法（以材为祖、疏密有致、墨分五色、骨法用笔、应物象形、经营位置、绘事后素、气韵生动、材有美）处理尺度与形制；普通组件采用相关方法，完整任务检查全部问题。

组件能力以本项目已安装 @qingye_lab/ui 的 catalog.json、类型和示例为准。品牌、明暗、密度独立；集中主题、公共组合和验证命令在本文件记录实际入口，变更时更新。
```

包升级后仍读取安装版指南和声明；网站资料用于发现，不能替代本地版本事实。其他技术栈可把完整指南保存为项目文档并引用该路径，采用设计方法，但须另行验证平台语义，不能假定本库 API 可用。

## 常见名称与用法纠偏

以下是消费方常见的误写与误用：部分来自其他 React 组件库的命名习惯（非本库历史旧名），部分是状态语义的误用。全部由组件元数据生成，并校验为所在模块的当前真实导出：

| 常见误写 / 误用 | 当前导出 | 说明 |
|---|---|---|
| 刷新时用 Skeleton 替换旧内容 | `AsyncContent` (`@qingye_lab/ui/components/async-content`) | 已有内容刷新时用 AsyncContent 并保持 hasContent={true}，保留工作面与焦点。 |
| 独立 Spinner 或按钮内成功/失败状态 | `Button` (`@qingye_lab/ui/components/button`) | Button 只有布尔 loading 忙碌态，结果交由 Alert / toastManager，确认交由 AlertDialog / ConfirmAction；不提供独立 Spinner。 |
| DialogContent | `DialogPopup` (`@qingye_lab/ui/components/dialog`) | 对话框承载面名为 DialogPopup（长内容滚动区配 DialogPanel）。 |
| Sheet / SheetContent | `Drawer` / `DrawerPopup` (`@qingye_lab/ui/components/drawer`) | 边缘工作面统一用 Drawer 与 DrawerPopup（对应 SheetContent），方向由 swipeDirection 指定；DrawerContent 只是承载面内的可滚动内容区，不能代替 DrawerPopup。 |
| DropdownMenu / DropdownMenuContent | `Menu` / `MenuPopup` / `MenuItem` (`@qingye_lab/ui/components/menu`) | 命令下拉菜单统一用 Menu 族导出，无 DropdownMenu* 别名。 |
| 用错误提示代替写入结果未知 | `PendingValue` (`@qingye_lab/ui/components/pending-value`) | 写入已发出但超时或断连无法确认结果时，用 PendingValue 保留原值并提供核实入口。 |
| TabsTrigger / TabsContent | `TabsTab` / `TabsPanel` (`@qingye_lab/ui/components/tabs`) | 标签触发器与内容面板名为 TabsTab 与 TabsPanel。 |
| Toast | `ToastProvider` / `toastManager` (`@qingye_lab/ui/components/toast`) | 库不导出 Toast 组件；挂载 ToastProvider 并调用 toastManager.add/update/promise。 |

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
NG9. 以新增形状表达状态：外扩的焦点圈、加粗的边框、随状态改变的尺寸

Also binding: prose length and text size must never change the structure;
density tightens spacing and never shrinks type; sizes come from the named type
steps, never a one-off value.

## Task workflow

1. Read project instructions, the UI entry point, installed package.json, catalog.json and design.md. Check the project's persistent references described above when completing onboarding. Preserve unrelated work.
2. State the object, action, scope, current status and work to retain. Use relevant methods; cultural terms are not HTML roles or API names.
3. Load related resources from ai/v<installed-version>/components. actualExports and local declarations are authority. api is curated guidance; typeApi lists the props this library declares, resolved from its types, and providers lists what each component needs from the app. Anything marked UNVERIFIED stays unverified. Inspect example imports and optionalPeers.
4. Reuse current props and combinations. The library owns shared UI behavior, the project owns recipes/theme, the application owns permissions/drafts/requests/versions, and tooling owns facts/diagnostics. Do not copy foundation controls.
5. Implement normal, waiting, relevant failure/unknown, cancellation and return paths. Timeout does not prove a write failed. Confirm current objects and revisions. Cancellation requested differs from cancellation complete.
6. Run existing checks. If the project configures `@qingye/tooling`, run `qingye-ui check` and follow each diagnostic's `repairGuide` anchor (`@qingye/tooling/diagnostics.md#<rule-slug>`, where the slug replaces `/` with `-`, e.g. `#imports-invalid-export`). Separate source, computed styles, interactions, accessibility and human visual judgment. Report PASS, FAIL, UNVERIFIED, NOT_RUN or justified N/A. Never relax tests or invent success.

Read [design-philosophy.md](design-philosophy.md) for methods and their sources; [the public guide](../design.md) for project adoption; [installation](v5.6.0/installation.md) for styles and dependencies; [the resource index](v5.6.0/llms.txt) for component constraints. Examples use synthetic local application state and do not prove backend permissions, persistence, idempotency or cancellation.

Registry templates reference this exact package version. Check configured package access; never silently substitute latest. This skill grants no external-action authority and creates no runtime model service.
