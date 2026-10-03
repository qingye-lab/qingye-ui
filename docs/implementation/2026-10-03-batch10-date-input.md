# 第十批日期与候选输入执行证据

2026-10-03 起，收尾检查于 2026-10-04；基线 `a94e8b4`。保留共享工作区其它代理的未提交修改。所有权为六组件源码/测试、六 metadata/十二 demos、本批决定/记录、review77 与必要 locale；随后按主任务交接更新 family-date。未读仓库外归档/冻结/Coss/旧源码。只消费当前重写公共组合、DayPicker10 与 BaseUI1.7 的公开 API。

## 语义与真实出口

- Calendar 承担当地日历位置与年月导航，单日、多日、范围与键盘由成熟 DayPicker 管理。formatLocalDate/parseLocalDate 使用当地年月日，拒绝无效或年份不在1–9999的日期，不经 UTC 移日。Root render/ref/ARIA 公共组合，导出 CalendarPrimitive。日期/导航按钮消费同档 control/text，粗指针实体单元读 touch-target。一个月、caption label、nav after 是选择；颜色、圆角和现有几何值是主题预设。
- DatePicker 控制 Date|undefined，真实 date Input 参与 Field/FormData，选择与原生编辑请求调用方接受；清除请求空值。Calendar 已自行 preventDefault 的选择事件不误当应用取消，选择后关闭并返回触发入口；拒绝值更新保留旧值。只读、禁用、Field 禁用约束附属动作。
- DateRangePicker 只确认完整且有序的 from/to；Popup draft 可以不完整，Apply 不可用时不伪称完整范围。Cancel/Escape 保留原确认值。真实展示 Input 保留 Field Label/error/disabled/ref/render 连接，但剥离最终 native name；确认端点仅以 name.from/name.to 提交。默认允许同日，示例 min=1 是显式跨日规则。当前展示只读，尚无分别键入两个端点的直接路径。
- DateTimePicker 值为无时区 YYYY-MM-DDTHH:mm[:ss] wall-clock 文本。真实 datetime-local Input 提交确认值；Calendar 与无 name 的 time Input 为草稿。完整日期与时间才可 Apply，空时间不补 now，带时区或不完整外部值拒绝。应用拥有时区、DST、可用时段与请求结果。
- Combobox 一个确认候选和独立查询；本批取消原语 input-clear 的隐式选值清空，查询为空仍保留确认候选，显式 Clear 才请求空选择。Autocomplete 输入文本就是自由值，固定 list 模式，高亮建议不会改变 FormData，Enter 才请求建议文字。两者支持受控/非受控与 details.cancel，Field 注册一次；Input 用 nativeInput 公共出口，动作复用 Button，render 状态/ref/ARIA/events 保留。真实 disabled/readOnly 输入事件出口阻止原语更改。
- 候选 Popup 使用自身公开 Portal/Positioner/Popup，并在 Positioner 消费 useFloatingLayer('popup')；caller style 最后合并。没有接第二个 Popover Root，没有散落 z 值，没有新增 token。日期 Popup 消费现有 Popover。

公开 metadata 明确原生 min/max/step 与 Calendar disabled/导航边界由调用方同步；DateRange 无原生日期边界校验；DateTime 的 Apply 仍须调用方做需要的业务校验。未以已有 selected、某个禁用日或本地字符串推断业务结果。新增 locale 五键 previousMonth/nextMonth/month/year/selectedDate，中英同时提供；同一 owner 还代 Batch11 合入 filterUnapplied/bulkVersion/treeEmpty（三键由该批请求，消费归该批）。

## 实际验证

四日期文件首轮：`pnpm --filter @qingye/ui exec vitest run test/calendar.test.tsx test/date-picker.test.tsx test/date-range-picker.test.tsx test/date-time-picker.test.tsx`：**11 PASS、1 FAIL**（00:06:40）。失败为 DatePicker 将 DayPicker 已 preventDefault 的选择事件误当关闭取消；修后只重跑该失败用例 `vitest run test/date-picker.test.tsx -t 'native editing'`：**1 PASS、4 SKIPPED**（00:07:11）。其余11项没有重复执行。覆盖当地日期解析、真实日历键盘/月份/disabled、Field 命名/错误/FormData、原生编辑/清除、readonly/disabled/Fielddisabled、事件取消与 Escape、范围不完整/应用/取消/双端点序列化、时间空草稿不补齐/单一确认提交、外部带时区文本拒绝。

候选两文件首轮 **7 FAIL、2 PASS**（00:08:34）：定位查询清空隐式清除候选、Field 的 Trigger 命名覆盖动作名、合成 disabled/readOnly 输入路径与关闭后异步文本恢复观测。Owning 出口修后 `vitest run test/combobox.test.tsx test/autocomplete.test.tsx`：**9 PASS、2 文件**（00:11:07），包含确认/查询分离、自由文本/仅高亮不提交、键盘确认/清除、受控取消、Escape/焦点/ref/render、禁用/只读/Fielddisabled 的表单事实。

六源码 strict、exactOptionalPropertyTypes、noUncheckedIndexedAccess 定点 `tsc --noEmit`：**PASS**，包括接入共享浮层之后。六 metadata、十二 demos、review77 继承 docs 配置，`pnpm --filter docs exec tsc -p /tmp/qingye-batch10-date-input-docs-tsconfig.json`：**PASS（19 个 docs 文件）**。最后仅移除 Calendar chevron 的多余固定 sm 档，图标继续由实际按钮同档角色决定；该样式收尾没有重复行为测试。

## 文件与交接

本批主体35文件：六 src/components/<slug>.tsx、六 test/<slug>.test.tsx、六 content/<slug>/meta.ts、十二 content/<slug>/demos、两本批文档、review/sections/77-batch10-date-input.tsx、locale.tsx/en-US.ts。六 slug 为 calendar/date-picker/date-range-picker/date-time-picker/combobox/autocomplete。review id=batch10-date-input，直接复用 demos；text-chapter/text-heading 分工。family-date 作为另授所有权同步当前能力与验证边界。CopyButton 的事件 API 修正另记 batch8 报告。

索引/catalog/生成、build、全库测试、浏览器/服务/Git：**NOT_RUN（主任务统一）**。本批真实浅深/窄屏、五档 computed、焦点可见/对比度、原生日期环境差异、真实浮层与模态排序、RTL/其他历法、跨午夜 today 更新、辅助技术：**UNVERIFIED**。jsdom 行为、原语键盘与定点 TS 不代替这些验收。locale 仍按主任务新批交接由本 agent 唯一持有；tokens 所有权已在先前批次交回，未再写共享 CSS。


## 主任务真实桌面回报（2026-10-04）

主任务 browser owner 回报浅深值路径 **PASS**：DatePicker 选择2026-10-09并返回 trigger 焦点；Range 半程 FormData 空/Apply disabled，取消不改值，完整 pair.from/to 正确；DateTime 未造 time，手填12:30后提交正确 wall-clock 文本；Combobox 查询乙时 FormData 仍甲，Enter 确认乙；Autocomplete 自由文本独立提交。浅深832/832无 pageerror，截图由主任务保存、尚待其视觉查看。脚本一处“与/和”名称定位已修，属于检查定位，不记产品缺陷。本 agent 没有启动浏览器；没有由此推断未测的窄屏、RTL、200%文字、对比度或午夜更新通过。


Calendar 导航 dark 黑色 fill 缺口由主任务实际截图发现。通过公开 components.Chevron 包装安装版 Chevron，只给实际 SVG 加 fill-current，caller components 最后合并优先；图标尺寸仍由同档 Button 角色决定，未复制原语。修后19 docs/连带源码 scoped TS 再次 **PASS**；没有重复行为测试，dark computed 由主任务定点确认。原生日期 icon 的 dark 颜色由主任务修正 harness colorScheme 后观测，本组件未误修。

自审源码/元数据/示例实际出口；33个本批未跟踪文件与两个 locale/family-date owning tracked 差异的 whitespace **PASS**。首次脚本将 git diff --no-index 的普通差异退出码1误当失败，修正为只有检查输出/错误才失败；该检查错误不记产品缺陷。


主任务随后定点确认 Calendar 修复 **PASS**：dark 导航 SVG fill=color=oklch(.97 0 0)，同档尺寸16×16，截图箭头清晰。首次同步读处于颜色过渡起点，稳定后computed与截图一致；harness也已同步根colorScheme=dark。主任务接受本批资料。
