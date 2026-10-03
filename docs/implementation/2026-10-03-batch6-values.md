# 第六批值输入执行证据

2026-10-03。基线 `a94e8b4`；工作区已有其他代理、来源文档与本地探针，本批没有回退或清理。拥有范围为 NumberField / OtpField / TagInput 三个组件、三个测试、三份 metadata / 六个 demos、本批决定/执行记录、共享 locale 新键与 `review/sections/71-batch6-values.tsx`。未修改其他组件或全局 token；未读取仓库外冻结/归档或上游组件；未提交/发布。

## 已实施契约

- NumberField 采用已安装 Base UI 1.7.0 的公开 NumberField 原语；Root、Group、Input、Increment、Decrement 与命名空间导出。Input 与 Button 走当前公共组合。原语注册 Field 一次；render 回调保留 NumberField 状态而不是被子组件状态替代。直接编辑固定 allowOutOfRange，步进保留范围；数值 null 与空文本保留，未完成负号/小数不改零。
- OtpField 是单个真实 text Input 与分段显示。长度由调用方给出；文本/前导零、原生光标、选择、复制、方向与删除不改数值。点击段选择字符；超容量插入拒绝整次并说明。外部超长文本完整显示。控件没有 completed/verified/success 结果状态。
- TagInput 保留集合与草稿双状态。Enter/add 确认时 trim、精确且区分大小写去重；空/重复留草稿并就地提示。受控集合拒绝/尚未接受时留草稿；接受后仅清同一份待确认草稿。IME Enter 不确认。Backspace 先聚焦已有项，再显式删除；附属动作不提交表单。隐藏表单值只包含确认集合，并服从真实输入与 Field/fieldset 的禁用。
- locale 增量键：`otpLengthExceeded(length)`、`tagEmpty`、`removeTag(tag)`，中英同键。数字步进与只读沿用现有键。
- 六个 demos 和 `#batch6-values` 审查入口均是控件/简单 Field 组合，未增加登录、假服务或虚构保存。

## 实际验证

`pnpm --filter @qingye/ui exec vitest run test/number-field.test.tsx test/otp-field.test.tsx test/tag-input.test.tsx`：**PASS，3 文件、31 测试**。涵盖编辑文本、范围外编辑与原生 rangeOverflow、步进及受控拒绝、render/ref/事件取消、非原生步进 render、前导零、段点击/方向/退格、粘贴替换与整次拒绝、Tag 空/重复/IME/受控拒绝与接受、禁用/只读、Field 名称/说明/错误、Field disabled 的输入及表单排除、非提交动作、reset 和取消 reset。

三个组件采用仓库相同 strict / exactOptionalPropertyTypes / noUncheckedIndexedAccess 设置作定点 `tsc --noEmit`：**PASS**。新增 metadata/demos/review section 用 `/tmp/qingye-batch6-values-docs-tsconfig.json` 定点继承 docs 配置检查：**PASS**。未运行全库测试、build、gen:index/catalog 或浏览器。

## 视觉变化与待验证

本次是从零重写的新边界和 API，不承诺旧视觉/API 兼容。NumberField 共享单边界，OTP 单输入分段，TagInput 确认项与草稿分行；五档 control/text、窄屏 +4px、色彩与圆角均沿用基础层预设/选择，不新增散落值。

统一索引/catalog、UI/docs 整体构建：**NOT_RUN（主任务拥有）**。浅深色、桌面/窄屏/200% 文字、真实 Tab 的盒内焦点与边框、粗指针几何/命中、必要边界与文字对比、自动填充、真实中文 IME 与辅助技术：**UNVERIFIED**。jsdom composition 和原生文本键盘只能证明相应合成事件路径，不能替代设备验收。

## 23:24 后续确定缺陷收尾

父任务交接三组件所有权后，以新增最小用例实测 **3 FAIL / 1 PASS**：具名 Field 使 TagInput 草稿额外进入 FormData；NumberField 未取消 reset 后仍为步进值 5（取消路径通过）；外部超长 OTP 的 Backspace 6→5 被拒绝。

TagInput 通过公共 Input render 出口移除已计算的原生 name，保持单次 Field 注册、Label/error/disabled/form 和 ref/render；仅确认集合的隐藏字段提交。编辑区 Input 可收缩，短添加动作本地 shrink-0/nowrap，保持完整名称与控件高度。NumberField owning wrapper 保持公开原语的编辑/提交/事件，接管非受控数值并订阅真实隐藏输入的 form reset；默认动作后恢复 defaultValue，取消 reset 不动值，受控值由应用持有。OtpField 允许超容量值实际缩短字符数的恢复编辑；不缩短的超容量插入仍整次拒绝。

`vitest run test/tag-input.test.tsx test/number-field.test.tsx test/otp-field.test.tsx -t 'named Field|native form reset|over-capacity initial|Field name and error|empty, minus|controlled changes|paste replaces'`：**PASS，8 测试、27 跳过**（23:24:38）。包括确认集合序列化、正常与取消 reset/下一次步进、OTP 两次退格与整次拒绝，以及受影响的 Field render/ref/错误关联、NumberField 未完成草稿/受控拒绝、OTP 粘贴 alternate。三个修改组件同 strict/exactOptional/noUnchecked 定点 tsc：**PASS**（首次发现 TagInput public useRender state 类型缺口，展开状态后重跑通过）。旧 31 项通过记录属于收尾之前的源码，未据此宣称本次全套通过。TagInput 193px 容量的真实布局复测 **NOT_RUN（主任务拥有）**。

主任务五档 computed 发现 NumberFieldStep 的 quiet icon 按钮内高等于外部 control 高，再被共同边界加 2px。owning step 的纵向内距改为已有同档 icon-padding-bordered / narrow 角色，扣除上下共同边界各 1px；保留图标尺寸、横向命中与内容增长，不固定高度裁剪。未新增镜像 CSS 测试；五档 computed 复测 **NOT_RUN（主任务拥有）**。

父任务后续真实 computed 回报：**PASS**，NumberField 五档外高 24/28/32/36/40；193px TagInput 输入 99px、动作 84px/32px，scrollWidth=193 无溢出。此为父任务实际浏览器观测，子代理未运行浏览器；后续仅额外将短动作的内部 button-content 显式 nowrap，未依据此改变其他全局按钮。
