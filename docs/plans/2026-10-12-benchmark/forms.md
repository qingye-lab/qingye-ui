# 表单、输入与日期时间族：适配性调研

调研日期 2026-10-12。范围：`packages/ui/src/components/` 下 34 个组件的源码与 `apps/docs/src/content/<name>/meta.ts`，并对照 `design.md`、`STANDARDS.md`、`docs/decisions/2026-10-03-family-form.md`、`2026-10-03-family-date.md`。只读调研，未改仓库，未运行浏览器。

**基线事实**
- 本库安装：`@base-ui/react` 1.7.0、`@daypicker/react` 10.0.1（只是 `react-day-picker` 10.0.1 的再导出）、React 19.2.1。
- 外部：Base UI 已到 1.9.0（2026-10-09）；DayPicker 文档站为 10.0.2；Mantine 已到 9.7.0（2026-10-06），不是 8；shadcn 在 2026-07 把 Base UI 设为默认底座，并同月加入 React Aria 版本。
- 凡标「UNVERIFIED」的结论只来自读源码或二手资料，没有真实浏览器/输入法/读屏实测。所有外部页面均在本次会话取到，取不到的在第六节列出，不以记忆补属性名。

**判断口径**（取自 design.md）：一个组件一件事（能组合解决的不增加配置）；状态必须真实、归属清楚；NG3 同一关系只有一种画法；NG7 关键后果不得只存在于会消失的提示；材有美——保留平台原生行为。库内已有的用户裁决（如 Form 不分发校验事实、粘贴 TagInput 不自动拆分）被当作前提，若建议与之冲突会明说，由库主裁决。

---

## 一、最值得做的 10 项（按价值/代价排序）

### 1. 把 Base UI 从 1.7.0 升到 1.9.0，DayPicker 升到 10.0.2
受益者：所有用 Field、Slider、Combobox、Select、Checkbox 的人，不增加任何新 API。
- 1.8 修了 Field 的校验生命周期：自定义校验归属、受控值同步、过期/重复控件 ID、「Form 内按 Enter 只校验一次」、异步校验期间发布中性 validity、受控 blur 校验与过期 filled 状态。
- 1.9：Slider 在 `touchcancel`/`pointercancel` 结束拖动，并修复触屏点轨道不触发 `onValueCommitted`；Checkbox/Switch/RadioGroup 优先使用 `aria-label` 而不是关联 label；Combobox/Autocomplete 的 `autoHighlight` 对异步结果生效；Combobox/Select/Menu 大列表挂载更快；新增 `eventDetails.preventUnmountOnClose()`；Shadow DOM 里 label 聚焦修复。
- 1.7：Form 把焦点移到文档顺序里第一个无效字段；Combobox/Autocomplete 加入 `input-press`、`cancel-open` 事件细节；Autocomplete 按 locale 过滤。
- **升级会改变一处语义，必须回归**：1.8 起 Combobox/Autocomplete/Select 在 `readOnly` 时允许打开并浏览候选（Select #5531、Combobox/Autocomplete #5541）。本库 `ComboboxTrigger`/`AutocompleteTrigger` 在 `readOnly` 时手动 `disabled`，文档写的是「只读保留当前值」，要确认升级后触发器、键盘和文档仍一致。
- 相容：纯依赖维护，不触及 design.md 的取舍。代价：小，非破坏；跑受影响的 select/combobox/autocomplete/slider/field/checkbox 测试和一次浏览器扫描即可。
- 来源：https://github.com/mui/base-ui/releases ，https://base-ui.com/react/overview/releases ，https://daypicker.dev/

### 2. 认证类输入对齐 WCAG 3.3.8：OtpField 粘贴归一化 + PasswordInput 自动填充约束
受益者：用短信/邮件验证码登录、用密码管理器的人；复制到 `123 456`、`123-456` 这种带分隔符验证码的人。
- 现状：`otp-field.tsx` 的 `onPaste`（105–113 行）把「光标前文本 + 粘贴文本 + 光标后文本」直接按 code point 数和 `length` 比较，超长就 `preventDefault` 并提示「最多输入 N 个字符；本次输入未添加」。粘贴 `123 456` 到 `length=6` 会被整次拒绝（源码推断，UNVERIFIED 运行时）。WCAG 3.3.8 的 Understanding 页明确写到：拆成单字符的输入框若拒绝粘贴的验证码，且没有替代方式，则不合规。
- 别家：Base UI OTPField 在去掉空白、按 `validationType` 过滤、可选 `normalizeValue` 之后才截断到 `length`，并用 `onValueInvalid` 报告被拒字符（https://base-ui.com/react/components/otp-field ）；Ark PinInput 用 `sanitizeValue` 在校验前清理粘贴值，例如去掉横线和空格（https://ark-ui.com/docs/components/pin-input ）。
- 建议：**采纳**，小，非破坏。接口：`OtpField` 新增可选 `normalizeValue?: (text: string) => string`，同时作用于粘贴与键入；默认只去掉空白，数字码由调用方传 `v => v.replace(/\D/g, "")`。归一化之后仍超长则保持库现有「整次拒绝并说明」的裁决。状态仍由组件持有草稿、应用持有校验与结果。不加 `onValueComplete`/`autoSubmit`（应用从 `onValueChange` 可得，且文档已声明长度完成不代表验证）。
- 同批：`PasswordInput` 在开发环境下未传 `autoComplete` 时 `console.warn`（沿用 `Select` 缺 `items` 的做法），文案提示 `current-password`/`new-password`；文档写明不得阻止粘贴。WCAG 3.3.8 写明「登录字段应能被浏览器和密码管理器自动填充；阻止自动填充或粘贴不合规」（https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html ）。小，非破坏。
- 与 design.md：名实相符（输入的是码，不是格子）；Base UI 要求每格各设 `aria-label="Character 2 of 6"`，本库保持单输入的路线更省读屏噪音，不需要改。

### 3. 日期三件套补齐值模型：`defaultValue` 与同源的 `min`/`max`
受益者：用 `<form action>` 的表单（React 19 在 action 结束后自动 reset 表单）、做「不得早于今天」的预订/截止日期的人。
- 缺口 a：`DatePicker`/`DateRangePicker`/`DateTimePicker` 只有受控 `value` + 必填 `onValueChange`，没有 `defaultValue`。`STANDARDS.md` 第 1 节写「可控状态同时保留适用的受控与非受控入口」，同族的 NumberField、OtpField、TagInput、FileUpload 都有。React Aria 的 DateField 同时提供 `value` 与 `defaultValue`（https://react-aria.adobe.com/DateField ）。
- 缺口 b：原生 `min/max` 在 `inputProps`，日历禁用在 `calendarProps.disabled/startMonth/endMonth`，库的 `family-date.md` 明确写「调用方同步两者」。React Aria 的 `minValue`/`maxValue`、Ark 的 `min`/`max`、Ant 的 `minDate`/`maxDate`、Mantine 的 `minDate`/`maxDate` 都是一处声明（https://react-aria.adobe.com/DateField ，https://ark-ui.com/docs/components/date-picker ，https://ant.design/components/date-picker ，https://mantine.dev/dates/date-picker/ ）。
- 建议：**采纳**，小，非破坏。接口：`defaultValue`（类型同 `value`）；`value === undefined` 时组件持有草稿，`onValueChange` 变可选；监听原生 `reset`，沿用其他组件的做法。`min?: Date`/`max?: Date`（DateTimePicker 用本地文本），组件同时写原生 `min`/`max`（`formatLocalDate`）并与 `calendarProps.disabled` 合并成 `{ before }`/`{ after }` 匹配器、同步 `startMonth/endMonth`。禁用理由仍由调用方给出（family-date 决定 5）。
- **冲突提示**：缺口 b 会取代 family-date.md 里「调用方同步两者」的既有写法，需要库主裁决。

### 4. TagInput：可选的分隔符拆分、数量上限、失焦收下草稿，并修 `required`
受益者：粘贴 `a@x.com, b@x.com, c@x.com` 的人，要求「最多 5 个」的字段。
- 现状：粘贴只改草稿（文档明写「不自动拆分或批量确认」）；无数量上限；输入但未确认的草稿在提交时静默不入表单；自定义拒绝理由只能 `details.cancel()` 而没有就地文案。
- 别家：Ark TagsInput 有 `delimiter`、`addOnPaste`（默认 false）、`max`、`maxLength`、`validate`、`blurBehavior: 'add' | 'clear'`、`onValueInvalid`（https://ark-ui.com/docs/components/tags-input ）；Mantine TagsInput 有 `splitChars`（粘贴时拆分）、`maxTags`、`acceptValueOnBlur`（默认 true）、`isDuplicate`、`clearable`；9.0 又加了 `onMaxTags` 与 `renderPill`（https://mantine.dev/core/tags-input/ ，https://mantine.dev/changelog/9-0-0/ ）。
- 建议：**采纳**，小，非破坏——全部可选，默认保持现行裁决。接口：`splitOn?: string | RegExp`（默认 undefined，不拆分）、`max?: number`（达到上限时用 `messages.tagLimit(max)` 就地提示，仍走 `onValueChange` 的 `details.cancel`）、`addOnBlur?: boolean`（默认 false，开启后失焦把非空草稿当作一次 `add`）、`validate?: (tag: string) => string | undefined`（返回文案即拒绝并显示在同一条 `role="status"` 里）。去重大小写规则不动。
- 关联缺陷：`TagInput` 的 `inputProps` 允许 `required`，见第五节 D5。
- 与 design.md：进退相承（失败不清草稿）、名实相符（拒绝要说出原因）。已有的 IME 处理（composition + keyCode 229）比 Ark、Mantine 文档里所写的更完整，保留。

### 5. 表单失败路径：失败后落焦点，并决定原生约束失败的就地文案（需库主裁决）
受益者：提交后出错的人，尤其是键盘和读屏用户；浏览器界面语言与站点语言不一致的人。
- 现状：`Form` 是纯 `<form>`（`form.tsx`），`Field` 通过 `onInvalidCapture` + `preventBaseUIHandler()` 阻止原语把 native invalid 推成组件状态（`field.tsx` 32–34 行注释写「保留浏览器约束」）。结果：必填/格式/范围失败时只有浏览器气泡，语言跟浏览器而不是 `useUILocale`，且气泡消失后没有就地文案（NG7）。应用设 `Field.invalid` 并放 `FieldError` 是约定路径，但库不帮落焦点。
- 别家：React Aria Form 默认把焦点移到第一个无效字段，`onInvalid` 中 `preventDefault()` 可改去别处；`validationBehavior` 在 `native` 与 `aria` 间选择；`validationErrors` 按字段名接服务端错误（https://react-aria.adobe.com/Form ）。Base UI 1.7 起 Form 聚焦第一个无效字段（https://github.com/mui/base-ui/releases ）。GOV.UK 要求失败后把焦点移到错误摘要，摘要与行内错误并存（https://design-system.service.gov.uk/components/error-summary/ ）。
- 建议：分两步。(a)**采纳**一个导出的纯函数 `focusFirstInvalid(form: HTMLFormElement): boolean`，聚焦文档顺序里第一个 `[aria-invalid="true"]` 或 `:user-invalid` 的控件（`:user-invalid` 自 2023-11 起 Widely available，https://developer.mozilla.org/en-US/docs/Web/CSS/:user-invalid ）。由应用在设置完 `invalid` 后调用，状态仍归应用，不违反「Form 不分发」。小，非破坏。(b)**观察/待裁**：给 `Form` 一个选项把原生约束失败转成就地 `FieldError` 文案（与 React Aria `validationBehavior="aria"` 同类），这会推翻 `family-form.md` 里「Field 阻止 native invalid 推成状态」的取舍，所以只记录，不替库主决定。
- 不采纳：把 Base UI 的 `Form errors={...}` 按字段名自动分发（family-form 明写 Form「不分发或推断校验/结果事实」）。

### 6. DateRangePicker 支持分别键入两个端点
受益者：键盘用户、读屏用户、已知确切日期区间的人；窄屏上不想点两次日历的人。
- 现状：显示框是只读（`date-range-picker.tsx` 66–68 行 `readOnly`），区间只能经日历草稿 + Apply 写入。`family-date.md` 自己记录了这条缺口：「Range 分别键入两个端点……旧族级『直接键入区间』仍是缺口」，决定 6 写「键入必须是等价路径」。
- 别家：React Aria DateRangePicker 起止各一个可键入字段，`startName`/`endName` 提交（https://react-aria.adobe.com/DateRangePicker ）；Ark 范围模式用两个 `DatePicker.Input`，`index` 为 0 和 1（https://ark-ui.com/docs/components/date-picker ）；Ant RangePicker 起止两个输入，`allowEmpty`、`preserveInvalidOnBlur`（https://ant.design/components/date-picker ）；Carbon「日历选择器应始终同时提供简单的文本输入」（https://carbondesignsystem.com/components/date-picker/usage/ ）。
- 建议：**采纳**，中，非破坏（提交仍是 `name.from`/`name.to`）。接口：边界内放两个原生 `Input type="date"`（沿用 DatePicker 的做法），中间是区间分隔；键入写入同一份草稿；两端完整且 `from ≤ to` 时才请求 `onValueChange`（保持「只有完整区间才是确认值」）；反向或不完整不提交，两个输入标 `aria-invalid`，并通过可选 `onInvalid?: (draft: { from?: Date; to?: Date }, reason: "order" | "incomplete") => void` 交给应用写 FieldError。不静默交换（family-date 决定 2）。日历 Apply/Cancel 流程不变。

### 7. DateRangePicker 的 `presets`
受益者：看「近 7 天/本月」的报表使用者。
- 别家：Ant RangePicker 的 `presets`，且 `value` 可以是函数以便在打开时才取「今天」（5.8.0 起）（https://ant.design/components/date-picker ）；Mantine DatePicker 的 `presets`，`{ value, label }`，range 时 value 是 `[start, end]`（https://mantine.dev/dates/date-picker/ ）；Ark `DatePicker.PresetTrigger` + `getRangePresetValue`（https://ark-ui.com/docs/components/date-picker ）。React Aria 页面未提供预设。
- 相容：family-date 决定 3/4（「今天」是环境事实、相对只是显示层）——库只接收应用算好的绝对区间，不自己算「近 7 天」，所以不越界。
- 建议：**采纳**，小，非破坏。接口：`presets?: readonly { label: string; value: DateRangeValue | (() => DateRangeValue) }[]`，在弹层里渲染为一列 quiet 按钮，**只写入草稿并翻到对应月份，仍需 Apply**；草稿与某预设相等时该项 `aria-pressed`。函数形式在每次打开弹层时求值，解决跨午夜陈旧。

### 8. Combobox/Autocomplete 补分组、分隔与异步状态播报
受益者：候选很多且有分类的人（地区、成员）、使用读屏的异步搜索用户。
- 现状：`Select` 已有 `SelectGroup`/`SelectGroupLabel`，`Combobox` 与 `Autocomplete` 没有对应部件；同一关系两种画法（NG3）。`ComboboxPrimitive` 虽然导出，但没有样式，也没有 `Status`。
- 别家：Base UI Combobox 提供 `Group`、`GroupLabel`、`Separator`、`Status`（「礼貌地向读屏播报内容变化，适合异步加载」，根元素必须保持挂载）、`Collection`、`Row`，并有「异步搜索（单选/多选）」「Creatable」「Virtualized」示例（https://base-ui.com/react/components/combobox ）；MUI Autocomplete 有 `groupBy`、`freeSolo`、`limitTags` 与「Creatable」（https://mui.com/material-ui/react-autocomplete/ ）；React Aria ComboBox 支持 sections，`allowsCustomValue`、`menuTrigger`（https://react-aria.adobe.com/ComboBox ）；Mantine 的 `data` 接受 `{ group, items }`。
- 建议：**采纳**，小到中，非破坏。导出 `ComboboxGroup`、`ComboboxGroupLabel`、`ComboboxSeparator`、`ComboboxStatus`（样式沿用 `SelectGroupLabel`；`ComboboxStatus` 默认视觉隐藏，由应用提供文案，例如「找到 12 项」）；`AutocompleteGroup/…/AutocompleteStatus` 同形。「异步」「创建新项」做成文档中的组合示例，不加配置：加载、空、错三态的事实归应用，组件只负责表达（design.md 状态归属表）。`limit` 已由原语 Root 透传，只补文档。
- 注意：Base UI 1.8 的 `createItems` 集合 API 是否值得封装，待升级后再看，目前观察。

### 9. FileUpload：自定义规则的拒绝理由、粘贴文件、文档级拖放守卫
受益者：上传时有额外限制（尺寸/重名/内容校验）的人；从剪贴板粘贴截图的人；误把文件拖到区域外而丢掉整页表单的人。
- 现状：拒绝理由固定为 `"type" | "size" | "count"`（`file-upload.tsx` 13 行）；应用能 `details.cancel()` 但不会出现就地提示；没有粘贴入口；拖到区域外时浏览器直接打开文件、离开页面。
- 别家：Ark FileUpload 的 `validate` 返回 `FileError[]`、错误码 `FILE_EXISTS`/`TOO_MANY_FILES` 等，`setClipboardFiles` 处理粘贴，`preventDocumentDrop` 默认 `true`，`directory`、`capture`（https://ark-ui.com/docs/components/file-upload ）；Ant Upload 的 `beforeUpload`（返回 `false` 或 `Upload.LIST_IGNORE`）、`pastable`（5.25.0 起）、`directory`、`maxCount`（https://ant.design/components/upload ）；Mantine `Dropzone.FullScreen` 在整个窗口捕获拖入（https://mantine.dev/x/dropzone/ ）。
- 建议：**采纳**前两项，**观察**第三项。(a)`validate?: (file: File) => string | undefined`（返回文案即拒绝，`FileUploadRejection` 增加 `{ reason: "custom"; message: string }`）；小，需要 `fileError` locale 文案兼容自定义消息，非破坏。(b)粘贴：在根上监听 `onPaste`，把 `clipboardData.files` 送入同一条 `add(…, "paste")`，`FileUploadChangeDetails.reason` 增加 `"paste"`；小，非破坏。(c)文档级守卫是全局副作用，是否放进组件需裁决，先写进文档给应用自行处理。
- 与边界：上传状态、进度、重试仍由应用提供（现有 `getStatus`），不改。
- 关联缺陷：D10（拖入文件夹会产生伪文件，UNVERIFIED）。

### 10. Calendar：补上年/月快速跳转的样式
受益者：用 DateRangePicker（无键入）或触屏、需要选远日期的人。
- 现状：DayPicker 10.0.1 的 `captionLayout` 支持 `"label" | "dropdown" | "dropdown-months" | "dropdown-years"`，并有 `startMonth/endMonth`；`calendar.tsx` 49–56 行的 `classNames` 没有 `dropdowns`/`dropdown_root`/`months_dropdown`/`years_dropdown`，却已经提供了 `labelMonthDropdown/labelYearDropdown` 文案。用 `captionLayout="dropdown"` 会出现未设样式的原生 select（UNVERIFIED，源码推断）。
- 别家：Mantine DatePicker 的 `defaultLevel`/`maxLevel`（月/年视图）（https://mantine.dev/dates/date-picker/ ）；Ark 的 `view`/`minView`/`maxView`（https://ark-ui.com/docs/components/date-picker ）；Ant 的 `picker` 面板切换。
- 建议：**采纳**，小，非破坏，无新属性。给上述 classNames 补上与 `NativeSelect` 同一套填值控件角色的样式，并在文档里示范 `calendarProps={{ captionLayout: "dropdown", startMonth, endMonth }}`。`DatePicker` 本身因为原生输入可键入，不依赖这一项（Carbon 也建议已知日期用文本输入）。

---

## 二、逐组件表

「保留」列写本库比别家更对、不要改的地方。「缺口」引用第二节 B 的编号。

### A. 总表

| 组件 | 保留（本库做得更对） | 缺口 | 结论 |
|---|---|---|---|
| autocomplete | 文本即值、高亮不改文本、确认才替换 | G7 | 采纳（小） |
| checkbox | `indeterminate` 由调用方给事实；`aria-invalid` 与选中并存 | — | 无需改动 |
| checkbox-group | `allValues` 父项范围由调用方声明 | G18 | 观察（只补文档） |
| combobox | 查询草稿与确认值分离；清空查询不清选择；多选芯片与 TagInput 同一几何 | G7 | 采纳（小～中） |
| date-picker | 本地 Date 不经 UTC；原生输入可直接键入 | G2 G3；D7 D8 | 采纳 |
| date-range-picker | 只有完整 from/to 是确认值；草稿 + Apply；取消保留原值 | G2 G3 G4 G5；D8 D9 D14 | 采纳 |
| date-time-picker | 无时区 wall-clock；空时间不补 now | G2 G3；D8 D9 | 采纳（小） |
| calendar | 名称含「今天/已选」；文案走 UILocale；RTL 渐变 | G6 G22 | 采纳（小）/ 观察 |
| field | disabled/readonly 的视觉职责互换；`FieldError` 接受 `{message}[]` | G16 G17 G19 G20 | 见各项 |
| fieldset | `legend`/`label` 两档与每字段自带名称 | — | 无需改动 |
| file-upload | 受控拒绝不夺焦点；移除后焦点回邻项；`formdata` 事件追加；reset 恢复 | G12 | 采纳（小）；D10 |
| form | 只做原生提交范围 | G11 G19 | 采纳 `focusFirstInvalid`；其余待裁 |
| input | 只承载一个值；`nativeInput` 避免重复注册 | G13 | 无需改动 |
| input-group | 附件与值读作一体的间距规则 | G24 | 观察 |
| label | — | — | 无需改动 |
| native-select | 已用 `appearance: base-select` 渐进增强 | — | 无需改动（升级后复验） |
| number-field | 空/负号/未完成小数不被替换为 0；默认不开滚轮 scrub | — | 无需改动；全角数字待测 |
| otp-field | 单一真实输入、分段只是呈现、保留前导零 | G9 G21；D1–D4 | 采纳（小） |
| password-input | 开关不改内容、不提交；`aria-pressed` | G10 | 采纳（小） |
| radio-group | 未选择不自动选第一项 | G18 | 观察（只补文档） |
| search-input | Escape 先清本字段且避开 IME | — | 无需改动 |
| segmented-control | 产生一个值；选中不借用主色 | — | 无需改动 |
| select | `items` 缺失时开发期警告；空字符串值有名称 | G1 复验 | 无需改动 |
| slider | 区间用数组，抓手 `aria-readonly` | G14；D9 | 观察 |
| switch | 名称不随状态变 | G13 | 观察 |
| tag-input | 草稿/确认分离；IME composition；受控拒绝不清草稿 | G8；D5 D6 | 采纳（小） |
| textarea | `field-sizing:content` 自增高 | G15 | 观察 |
| toggle | 单独的二态 | — | 无需改动 |
| toggle-group | 同一关系同一画法（轨道） | — | 无需改动；Chip 形态不采纳 |
| filter-bar | 草稿/已应用分离；Enter 提交 | — | 无需改动 |
| confirm-action | 对打开时的快照确认；内容变化使认可失效 | — | 无需改动 |
| pending-value | 「结果未知」独立表达 | — | 无需改动 |
| copy-button | 成功来自写入 Promise resolve | — | 无需改动 |

### B. 缺口明细

**G1 依赖升级**：见第一节 1。

**G2 日期族 `defaultValue`**：见第一节 3。

**G3 日期族 `min`/`max` 同源**：见第一节 3。

**G4 DateRange 键入两端**：见第一节 6。

**G5 DateRange 预设**：见第一节 7。

**G6 Calendar 年月跳转样式**：见第一节 10。

**G7 Combobox/Autocomplete 分组与状态**：见第一节 8。

**G8 TagInput**：见第一节 4。

**G9 OTP 粘贴归一化**：见第一节 2。

**G10 PasswordInput 自动填充**：见第一节 2。

**G11 表单失败路径**：见第一节 5。

**G12 FileUpload**：见第一节 9。

**G13 即时保存与异步校验时的忙碌表达（Switch、Checkbox、Input 族）**
- 谁有：Mantine 9 给所有 Input 系组件加了 `loading` 与 `loadingPosition`（https://mantine.dev/changelog/9-0-0/ ）；shadcn 的组件清单里有 `Spinner`（https://ui.shadcn.com/docs/components ）。Switch 上的 `loading` 本次未取到可靠来源（见第六节）。
- 任务：立即保存的开关在请求期间要挡住再次切换；用户名可用性检查时在输入旁显示「检查中」。
- 相容：design.md 状态归属表「加载由应用决定事实，组件负责表达」；`Button` 已有 `loading`，Switch 没有对应表达，同一关系两种画法（NG3）。库内也没有独立的忙碌标记，Button 的忙碌标记是内部实现。
- 代价：中；需要一个公共的忙碌标记原语。
- 建议：**观察**。先在 Switch 文档写明待定期间用 `readOnly`（保留焦点）而不是 `disabled`（会掉出 Tab 顺序、降为 64% 不透明度），并补一个 `aria-busy` 示例；等有了公共的忙碌标记再统一加 `loading`。该文档写法需要先实测 Base UI Switch 的 `readOnly` 行为，UNVERIFIED。

**G14 Slider 刻度/标记**
- 谁有：Ant Slider 的 `marks`、Mantine 的 `marks`、Ark 的标记组——本次均未取到页面（第六节）；Base UI Slider 页同样未核对是否有对应部件。
- 建议：**观察**。任务（离散档位如「低/中/高」）真实，但没有核实的第一手来源，且可由应用在 `SliderControl` 里按百分比定位组合。

**G15 字数提示**
- 谁有：GOV.UK 字符计数：读屏用户在**停止输入后**才听到数量；超限不阻断输入，而是提示并在提交时报错（https://design-system.service.gov.uk/components/character-count/ ）。
- 现状：`apps/docs/src/content/input/demos/05-character-count.tsx` 把 `aria-live="polite"` 放在随每次按键更新的 `FieldDescription` 上，见 D12。
- 建议：**观察**。先修示例；是否抽成 `CharacterCount` Pattern 看有没有第二个消费者。

**G16 Field 的 responsive 方向**
- 谁有：shadcn Field 的 `responsive` 方向，用容器查询在 `FieldGroup` 里切换（https://ui.shadcn.com/docs/components/field ）。
- 建议：**不采纳**（当前）。库主既有「页面不需要移动端适配」的约定；窄屏如需再议。

**G17 必填/选填标记**
- 谁有：Carbon 规则：多数必填则只标「选填」，反之只标「必填」，全站一致（https://carbondesignsystem.com/patterns/forms-pattern/ ）。Ant、Mantine、Chakra 的标记方式未取到。
- 建议：**不采纳**新属性。`<FieldLabel>邮箱（选填）</FieldLabel>` 已可组合（design.md「能组合解决的不增加配置」）；只在 Field 文档写一条约定，即标少数那一类。

**G18 选项卡（Radio/Checkbox 卡片）**
- 谁有：Chakra 有 Checkbox Card 与 Radio Card（https://chakra-ui.com/docs/components/concepts/overview ）；shadcn Field 用「在 `FieldLabel` 里再放一个 `Field`」做选项卡，适用 RadioItem/Checkbox/Switch（https://ui.shadcn.com/docs/components/field ）。
- 建议：**观察**。纯组合，只补一个文档示例。注意 NG4（用卡片围合没有独立身份的内容）：只有选项各自有说明和价格这类独立身份时才成立。

**G19 Form 按字段名分发服务端错误（Base UI `Form errors` / React Aria `validationErrors`）**
- 与 `family-form.md` 的「Form 不分发或推断校验/结果事实」冲突。**观察**，等库主决定。

**G20 Standard Schema**
- 事实：shadcn Field 文档写 `FieldError` 接受任何实现 Standard Schema 的校验器的 issues（Zod、Valibot、ArkType）（https://ui.shadcn.com/docs/components/field ）；Mantine 9 在 `@mantine/form` 加了 `schemaResolver`（https://mantine.dev/changelog/9-0-0/ ）；Base UI 的 Form 页用 Zod 的 `flattenError` 映射（https://base-ui.com/react/components/form ）。
- 本库 `FieldError` 的 `errors` 形状是 `{ message?: string }[]`，与 issue 的 `message` 字段兼容，不需要新代码。
- 建议：**采纳**为文档示例（小）；**不采纳** `schemaResolver` 这类校验适配（属表单库/应用，不在本库）。

**G21 OTP 分组分隔符**
- 谁有：Base UI 有 `OTPField.Separator`（https://base-ui.com/react/components/otp-field ）；shadcn `InputOTPSeparator`（https://ui.shadcn.com/docs/components/input-otp ）。
- 建议：**观察**；任务是 6～8 位码的可读性，纯呈现，等真实消费者再加（例如 `groupSize?: number`）。

**G22 Calendar 非公历与时区**
- 事实：DayPicker 支持 ISO 8601、波斯、回历、佛历、埃塞俄比亚、希伯来历，并有 `timeZone` 属性（https://daypicker.dev/ ；本地类型文件核对了 `timeZone?`、`captionLayout?`）。React Aria 的 DateField 使用 `createCalendar`/`I18nProvider` 切换历法（https://react-aria.adobe.com/DateField ）。
- 本库把日期值定义为本地 Date，历法与周起始日经 `calendarProps` 透传（family-date 已写明）。建议：**观察**，保持现状，仅在有消费者需要非公历时补文档与示例。

**G23 NumberField**
- 原语参数 `format`、`locale`、`step/smallStep/largeStep`、`snapOnStep`、`allowWheelScrub`、`ScrubArea` 均透传；`onValueCommitted` 在 blur 或指针释放时触发（https://base-ui.com/react/components/number-field ）。Mantine 9 加了 `selectAllOnFocus`、`onMinReached/onMaxReached`、`bigint`（https://mantine.dev/changelog/9-0-0/ ）。
- 建议：**不采纳**（都是个别任务）。仅标 UNVERIFIED：中文输入法下输入全角数字「１２３」能否被解析。

**G24 InputGroup 的块级附件**
- shadcn Input Group 在组件清单中存在，块级对齐（`block-start/block-end`）的 API 本次未取到；任务多是文本域加工具栏。**观察**，且受库主「不做业务场景」约定限制，不推进。

---

## 三、缺少的组件

| 候选 | 任务 | 谁有 | 建议 | 理由 |
|---|---|---|---|---|
| DateField（分段输入） | 键入日期并逐段校验 | React Aria DateField（https://react-aria.adobe.com/DateField ）；Chakra「Date Input」（https://chakra-ui.com/docs/components/concepts/overview ） | **观察** | `Input type="date"` 已是平台的分段输入（材有美：保留平台原生行为）。代价是外观随浏览器、显示格式用浏览器语言而日历用 UILocale。需要非公历、`ZonedDateTime` 或跨浏览器一致外观时再做；Temporal 目前不是 Baseline（见第四节） |
| TimeField / TimePicker | 只选时刻 | Mantine 8 的 TimePicker、TimeValue、TimeGrid（https://mantine.dev/changelog/8-0-0/ ）；Ant TimePicker（https://ant.design/components/overview ） | **不采纳** | `Input type="time"` 已用于 DateTimePicker 的弹层；时刻槽位选择（TimeGrid）是预订业务能力，应由应用组合 |
| 预设区间 | 见 G5 | — | 合入 DateRangePicker | 不是新组件 |
| ColorPicker | 选颜色 | Chakra Color Picker/Swatch、Ant ColorPicker（以上清单页）；Mantine 9.0 里 `ColorPicker` 加了 `name`、`hiddenInputProps` | **不采纳** | 属于设计工具类能力；原生 `<input type="color">` 能覆盖「选一个颜色提交」的任务 |
| Rating | 给出 1～N 的评分 | Chakra Rating、Ant Rate（以上清单页）；Mantine 9.0 `Rating` 加 `allowClear` | **观察** | 语义就是一组单选。真实任务（评价表单）存在；若做，应是 RadioGroup 的一种外观而非新交互，并满足灰度检验（星形满/空不能只靠颜色）。等第一个消费者 |
| Signature | 手写签名 | Ark（未取到页面，仅知有）| **不采纳** | 画布 + 位图，Capability；证据不足 |
| RangeSlider | 区间 | — | **已覆盖** | `Slider` 的 `value` 为数组即区间，`minStepsBetweenValues` 已有 |
| Mention | 在文本中 @ 人 | Ant Mentions（清单页）| **不采纳**（当前） | 需要文本域内的触发与光标定位，属编辑器能力；先看库是否要有富文本 |
| Editable / InlineEdit | 原位改名/改值，保持预览 → 编辑 → 提交/取消 | Ark Editable：`activationMode`、`submitMode`、`selectOnFocus`、`autoResize`、`onValueCommit/onValueRevert`，Enter 保存、Escape 放弃（https://ark-ui.com/docs/components/editable ）；Chakra Editable（清单页） | **采纳（Pattern，低优先，中等代价）** | 无业务对象仍成立，组合出错点集中：Enter 在输入法合成期间不得提交（TagInput 已有同类处理）、Escape 复原、失败时保留草稿（进退相承）、焦点归还。接口草案：`<Editable value onValueChange>`（受控/非受控）+ `onCommit(value, details)`（`details.cancel()` 拒绝，保留草稿）+ `submitOn?: "enter" | "blur" | "both"`（默认 `"enter"`） |
| Cascader / TreeSelect | 选层级中的一项 | Ant Cascader、TreeSelect（清单页与迁移页）；Mantine 9.7 TreeSelect 有 `renderPill`（https://mantine.dev/changelog/9-7-0/ ）；Chakra Tree View | **观察** | 等于 Tree 放进 Combobox；键盘模型和异步展开代价大；先稳定 `Tree` |
| Transfer | 两栏互转 | Ant（清单页） | **不采纳** | 被「Combobox 多选 + 已选列表」或 CheckboxGroup 覆盖，且双栏需要宽度 |
| PhoneInput | 带国家区号的电话号码 | 本次抽查的清单中均未出现 | **不采纳** | 需要号码元数据，属 Capability；`Input type="tel"` + `autoComplete="tel"` 足够 |
| ErrorSummary（表单错误摘要） | 失败后集中列出并链到各字段 | GOV.UK（https://design-system.service.gov.uk/components/error-summary/ ） | **观察** | 是 Pattern；先做 `focusFirstInvalid`，摘要待第二个消费者（Carbon 的表单规范页并未定义摘要） |
| Questionnaire / 多步问答 | 逐题的向导 | shadcn Questionnaire（2026-08，原生 radio/checkbox、可选字母/数字快捷键、原生表单序列化）（https://ui.shadcn.com/docs/changelog/2026-08-questionnaire ） | **观察** | 属流程；库已有 `Steps`，不新增 |
| Spinner | 通用忙碌标记 | shadcn、Chakra 的清单均有 | **观察**（跨族，仅提示） | 与 G13 相关，是否要公共忙碌标记应由「反馈」族一并裁决 |

---

## 四、近期趋势（2025–2026）

**1. 底座合流：shadcn 默认 Base UI，同月出 React Aria 版**
- 事实：shadcn 2026-01「Base UI Documentation」，2026-07「Base UI as the Default」和「React Aria」（https://ui.shadcn.com/docs/changelog ）。Base UI 1.5（2026-05-19）的更新项里已有 OTPField 的改动、1.6（2026-06-18）标为 stable（https://base-ui.com/react/overview/releases ）。
- 意味着：本库选 Base UI 的路线与生态一致；Base UI 自己的 OTPField 可用，但库选择的单输入路线（与 shadcn 的 input-otp 同路线）更利于粘贴和读屏，不必替换。
- 建议：保持，按第一节 1 跟随小版本升级。

**2. React 19 表单动作**
- 事实：`useActionState` 返回 `[state, dispatchAction, isPending]`；传给 `<form action>` 时提交自动包进 Transition；**表单 action 完成后会自动重置表单，非受控输入因此清空**，可用 reducer 处理重置或用 `key` 重新挂载（https://react.dev/reference/react/useActionState ）。Mantine 9 要求 React 19.2+（https://mantine.dev/changelog/9-0-0/ ）；Base UI Form 页给出把 `action` 与 `useActionState` 结合、`state.serverErrors` 传给 `errors` 的写法（https://base-ui.com/react/components/form ）。
- 意味着：本库有内部状态的控件（OtpField、TagInput、FileUpload、NumberField、`useInputFacts`）都在监听 `reset` 事件并恢复 `defaultValue`，方向对；日期三件套只有受控入口，action 重置后要由应用自己清（G2）。TagInput 的隐藏 `name` 输入、DateRangePicker 的 `name.from/name.to`、FileUpload 的 `formdata` 追加是否在 `<form action>` 构造 `FormData` 时按预期工作，**没有实测**（UNVERIFIED）。
- 建议：补一个 `<Form action={…}>` + `useActionState` 的文档示例，并用它做一次验证；`Button loading` 可由 `useFormStatus().pending` 驱动（示例，不是新 API）。

**3. Standard Schema**
- 事实见 G20。Standard Schema 规范页本次未取到，`issues[].message` 的形状来自 shadcn 文档的转述。
- 建议：文档示例即可。

**4. 可定制原生 select：`appearance: base-select`**
- 事实：Chrome/Edge 135（2025-03）起支持（https://developer.chrome.com/blog/a-customizable-select ，https://caniuse.com/mdn-css_properties_appearance_base-select ）；Safari 27 据 WebKit 的说法将加入（二手转述 https://pxlnv.com/linklog/safari-27-features/ ，caniuse 两个页面对 Safari 27 的标注不一致）；Firefox 149 起在偏好项后面（https://bugzilla.mozilla.org/show_bug.cgi?id=1974787 ）。MDN 的 `appearance` 页只说整个属性 Widely available，不给 `base-select` 的 Baseline 状态（https://developer.mozilla.org/en-US/docs/Web/CSS/appearance ）。**本次没有查到官方 Baseline 声明，不能说它已 Baseline。**
- 意味着：`native-select.tsx` 已用 `supports-[appearance:base-select]` 渐进增强，不支持的浏览器仍用平台选项面，做法正确。
- 建议：不改；Safari 27 发布后复验（含选项对勾、`::picker-icon` 隐藏与自绘箭头不重复）。不用它替换 Base UI `Select`（需要受控、分组、键盘类型预测和统一浮层层级）。

**5. `field-sizing: content`**
- 事实：MDN 标为 Baseline 2026「Newly available」，自 2026-06 起三大浏览器可用；对 textarea 先横向再纵向增长，`rows` 无效（https://developer.mozilla.org/en-US/docs/Web/CSS/field-sizing ）。
- 意味着：`textarea.tsx` 与 DateRangePicker 的显示框已使用，不再需要把不支持当主要情形写进文档；`rows` 在支持的浏览器里被忽略，本库用 `min-h` 计算起始容量（`--qy-textarea-rows`）绕开，正确。
- 建议：保持；变成 Widely available 之后可以删去文档里的不支持措辞。

**6. 原生 Popover / Invoker Commands**
- 事实：`command`/`commandfor` 属于 Baseline 2025「Newly available」，自 2025-12 起（https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API ）。
- 意味着：对本族影响小。Combobox、Select、DatePicker 弹层由 Base UI 的 JS 状态机和受控 `open` 管理，用声明式命令会失去受控开合；好处只在 hydration 之前。
- 建议：**观察**，无需改动。

**7. `inputmode`/`enterkeyhint`**
- 事实：`enterkeyhint` 自 2021-11 起 Widely available，取值 `enter|done|go|next|previous|search|send`；未设置时浏览器可能按 `inputmode`、`type`、`pattern` 推断（https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/enterkeyhint ）。
- 意味着：这些是原生属性，经 `Input` 透传即可。`SearchInput` 使用 `type="search"`，多数键盘会给搜索键，不必额外设置；`OtpField` 是 `type="text"`，默认不设数字键盘。
- 建议：文档为 OtpField 给出 `inputMode="numeric"` 与 `autoComplete="one-time-code"`（已默认）的示例；不新增属性。

**8. Temporal**
- 事实：MDN 标「Limited availability」，非 Baseline（https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal ）。Firefox 139（2025-05-27）与 Chrome 144（2026-01-13）已发布，Safari 稳定版尚无，这些日期出自 TC39 记录的二手转述，不是浏览器官方发布说明（WebSearch 汇总）。React Aria 用 `@internationalized/date` 的对象作为值类型。
- 意味着：本库把值定义为本地 `Date` 或无时区文本，不依赖 Temporal，是安全的。待 Safari 发布后，`formatLocalDate/parseLocalDate` 可以增加 `Temporal.PlainDate` 适配，而不改变对外值。
- 建议：**观察**。

**9. WCAG 2.2 的 3.3.7 冗余输入与 3.3.8 可访问认证**
- 事实：3.3.8（AA）禁止在认证的任一步要求认知功能测试，例外包括有「机制」帮助完成（密码管理器、粘贴）；人工抄写验证码不合规；拆成单字符的框拒绝粘贴验证码不合规（https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html ）。3.3.7（A）：多步流程里不得重复要求同一信息，需自动填入或可选择；新建密码确认等安全需要是例外（https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html ）。
- 意味着：直接对应 OtpField 的粘贴（第一节 2）和 PasswordInput 的自动填充。`ConfirmAction` 的「键入确认文字」不是认证，不适用 3.3.8。

**10. 输入组件的忙碌与清除表达**
- 事实：Mantine 9 在所有 Input 系组件上加了 `loading`/`loadingPosition`，在 Select、Autocomplete、MultiSelect、TagsInput、FileInput、DateInput 等上加了 `clearSectionMode`（https://mantine.dev/changelog/9-0-0/ ）。
- 意味着：异步校验和异步搜索是常见需求；本库的清除已经是 `InputGroupButton` 组合，忙碌表达缺公共标记（G13）。
- 建议：观察。

**11. 原生校验伪类 `:user-invalid`**
- 事实：自 2023-11 起 Widely available，只在用户交互之后匹配（https://developer.mozilla.org/en-US/docs/Web/CSS/:user-invalid ）。
- 意味着：库已经选择把「无效」限定为调用方声明的 `aria-invalid`，不用 `:invalid` 样式；`:user-invalid` 可用于 `focusFirstInvalid` 的查找，不应改变视觉的事实来源。

---

## 五、发现的缺陷

文件与行号取自读取时的工作树（`HEAD a0753db` 之上有未提交改动，行号可能随之漂移）。除注明外，均为源码推断，**UNVERIFIED**：没有在浏览器、输入法或读屏里复现。

**D1 OtpField 拒绝带分隔符的粘贴** — `packages/ui/src/components/otp-field.tsx` 105–113 行（`onPaste`）与 94–104 行（`onChange`）。复现：`length={6}`，复制 `123 456` 或 `123-456` 后粘贴。预期：被清理后输入；实际（推断）：整次拒绝，提示「最多输入 6 个字符」。关联 WCAG 3.3.8。

**D2 OtpField 在输入法合成期间的长度拒绝** — 同文件 99 行。`nextLength > length` 时 `preventBaseUIHandler()` 并 `return`，控件是受控的，React 会回写旧值；合成中途回写会打断合成。Base UI 的 OTPField 在 1.9 修过「Safari IME 合成时槽位被过度填充」（#5098），同类。复现：Safari/Chrome 的拼音输入法，在已满的框里继续输入。验证需要真实输入法。

**D3 OtpField 在 RTL 页面** — 同文件 56–87 行。分段用网格列顺序，没有 `dir="ltr"`；验证码是数字串，通常应保持从左到右。复现：`dir="rtl"` 的页面里输入 `123456`，看分段顺序与光标方向。

**D4 OtpField 的移动端手势** — 同文件 62–74 行与 90 行。真实输入 `opacity-0` + `pointer-events-none`，点击靠容器 `onPointerDown` 里 `preventDefault()` 再 `focus()`；一是长按无法弹出系统的「粘贴」菜单，二是 iOS 能否在 `pointerdown` 里唤起键盘需实测。

**D5 TagInput 的 `required` 作用于草稿输入** — `tag-input.tsx` 132–170 行：`inputProps` 的类型没有排除 `required`，它会落在草稿 `<input>` 上。已确认标签但草稿为空时原生校验判为缺失；草稿非空但未确认时反而判为通过。FileUpload 已明确排除 `required` 并要求应用校验集合，TagInput 与它不一致。复现：`<TagInput inputProps={{ required: true }} defaultValue={["a"]} />` 放进表单后提交。

**D6 TagInput 未确认的草稿在提交时静默丢失** — 同文件 197 行，隐藏输入只由 `value` 生成。这是「草稿/确认分离」的既定取舍，但没有任何信号告诉提交者还有一条没确认的文字。复现：键入 `foo` 不回车，直接点提交。参见第一节 4 的 `addOnBlur`。

**D7 DatePicker 在年份段键入第 5 位数字时清空整个字段** — `date-picker.tsx` 56–58 行与 `calendar.tsx` 28–35 行：原生 date 输入的年份可超过 4 位，`parseLocalDate` 的正则 `^\d{4}-\d{2}-\d{2}$` 对 `20200-05-12` 返回 `undefined`，`onValueChange(undefined)` 使受控 `value` 变为 `""`，React 把原生输入写成空，月、日一起丢失。复现：Chrome 中聚焦年份段连续键入 5～6 位。文档写的有效年份是 1–9999。

**D8 嵌套 fieldset 时的禁用状态不同步** — `date-picker.tsx` 31–39、`date-range-picker.tsx` 42–50、`date-time-picker.tsx` 37–45、`file-upload.tsx` 94–103、`tag-input.tsx` 74–90、`input-facts.ts` 的 MutationObserver。它们只观察 `input.closest("fieldset")`（最近的一层）子树里的 `disabled` 变化；外层 fieldset 被动态禁用时，变化发生在被观察子树之外，不触发 `sync`。日期三件套和 FileUpload 只在挂载和变化时同步，所以弹层入口仍显示为可用。复现：`<fieldset id=outer><fieldset><Field><DatePicker/></Field></fieldset></fieldset>`，挂载后给外层加 `disabled`，日历按钮仍可点。`TagInput`/`useInputFacts` 每次渲染都会 `sync`，受影响较小。

**D9 渲染期抛错的位置过多** — `slider.tsx` 25–36 与 40 行、`date-range-picker.tsx` 52 行、`date-time-picker.tsx` 28 行、`file-upload.tsx` 74 与 79 行、`confirm-action.tsx` 29–33 与 41 行、`pending-value.tsx` 13 行、`otp-field.tsx` 23 行。设计取向是「显式无效值拒绝，不静默改写」，但服务端返回带 `Z` 的时间、未对齐步长的数值或反向区间会直接让所在子树卸载（没有错误边界时是整页）。这不是缺陷而是需要库主确认的取舍：是否在生产环境降级为 `console.error` + 空值。

**D10 FileUpload 拖入文件夹** — `file-upload.tsx` 173 行用 `dataTransfer.files`。浏览器把拖入的文件夹作为一个伪 `File` 条目放进去（无 MIME 类型）；未设 `accept` 时通过 `accepts()` 被当作普通文件接收。复现：拖一个文件夹到区域上。Ark 与 Ant 都有 `directory` 选项来专门处理（G12），本次没有查到它们如何过滤。

**D11 DateRangePicker 的只读显示框可聚焦但无键盘打开方式** — `date-range-picker.tsx` 66–68 行：`onClick` 打开弹层，但 Enter/Space/ArrowDown 在该只读输入上不会；键盘用户需要再 Tab 到旁边的日历按钮。读屏会把它读成只读文本框。解决方案随第一节 6 一并处理。

**D12 文档示例：字数提示** — `apps/docs/src/content/input/demos/05-character-count.tsx` 约 14–18 行：`aria-live="polite"` 放在每次按键都更新的 `FieldDescription` 上，读屏会逐字播报；`value.length` 与 `maxLength` 都按 UTF-16 码元计数，含补充平面字符（如 𠮷、emoji）时「还可输入 N 个字」与用户看到的字数不一致。GOV.UK 的做法是停顿后再播报。

**D13 Calendar 的下拉布局没有样式** — `calendar.tsx` 49–56 行的 `classNames` 未覆盖 DayPicker 10.0.1 的 `dropdowns`、`dropdown_root`、`months_dropdown`、`years_dropdown`（已在本地类型文件核对这些名字与 `captionLayout` 取值存在）。复现：`<Calendar captionLayout="dropdown" startMonth={…} endMonth={…} />`，看是否出现未设样式的原生 select。

**D14 升级后的 readOnly 语义**（不是现有缺陷，是升级风险）— 见第一节 1。

---

## 六、未取到的来源与未验证项

**未取到或只取到部分**
- HeroUI v3 组件页：只返回了分类标题，没有组件名（https://www.heroui.com/docs/react/components ）。本报告没有引用 HeroUI。
- Adobe Spectrum 2：没有单独查。React Aria 的 DateField、DateRangePicker、ComboBox、DropZone、Form 取到；React Aria 组件总览页失败（Socket is closed），TimeField、ColorPicker、TagGroup、SearchField、NumberField、Slider 的页面未查。
- Fluent 2：TagPicker 页返回重定向到 storybook，未再取（https://storybooks.fluentui.dev/react/ ）。
- Primer：`TextInputWithTokens` 取到（且已标为 deprecated）；表单设计规范页只返回了站点首页内容，没有校验时机等内容。
- Carbon：表单规范页与日期选择器用法页取到；FileUploader、NumberInput、TimePicker 未查。Carbon 的表单页没有定义错误摘要，也没有说明失败后的焦点。
- MUI：只取到 Autocomplete；MUI X 日期选择器（shortcuts、field 分段）未查。
- Chakra v3：只取到组件总览清单，没有各组件属性页。
- Ark UI：DatePicker、PinInput、TagsInput、Editable、FileUpload 取到；Rating、ColorPicker、SignaturePad 页未查。
- Mantine：9.0、9.7 更新日志，DatePicker、TagsInput、PinInput 取到；Dropzone 页没有属性表；Rating、ColorInput、Slider `marks` 未查。
- Ant Design：迁移页、DatePicker、Upload、组件总览取到；Mentions、Cascader、Transfer、Rate、Switch `loading` 的属性页未查。
- Base UI：更新日志、OTP、Combobox（含 API 部分）、NumberField、Form 取到；Slider、Select、Autocomplete、Field、Checkbox Group 的属性页未直接核对。
- shadcn：更新日志、组件清单、Field、Input OTP、Questionnaire 取到；Input Group、Date Picker、Calendar 页未查，所以不能转述 Input Group 的块级对齐 API。
- Standard Schema 规范页（standardschema.dev）未取；`issues[].message` 的形状只有 shadcn 文档的转述。
- Popover API 的 Baseline 状态未查。
- web.dev/baseline 对 `appearance: base-select` 的官方状态未取到；第四节 4 的支持情况是 Chrome 博客、caniuse 的摘要、Bugzilla 与 WebKit 二手转述的拼合。
- Temporal 的各浏览器版本与发布日期未能从 MDN 兼容表取到，来自 WebSearch 汇总的二手来源。
- Baseline 从 Newly 到 Widely 的 30 个月规则出自记忆，未取到 web.dev 原文，报告中未据此给出具体日期。

**未验证（UNVERIFIED），需要真实环境**
- 第五节 D1–D13 的运行时行为，尤其 D2（真实中文输入法）、D3（RTL）、D4（iOS）、D7、D8、D10。
- Combobox/Autocomplete 在中文输入法合成期间的 Enter 是否会误选高亮项（Base UI 文档未涉及 IME；本库 TagInput/SearchInput 自己处理了，但这两个组件没有）。
- NumberField 对全角数字的解析（Base UI 1.5 说明只提到接受波斯数字）。
- `<Form action>` + `useActionState` 下，TagInput/DateRangePicker/FileUpload 的隐藏输入与 `formdata` 追加的提交结果，以及 action 完成后的自动 reset 与各控件内部状态的交互。
- Base UI 1.9 升级后 Select/Combobox/Autocomplete 的 `readOnly` 浏览行为（G1）与现有文档、键盘、读屏的一致性。
- Switch 在 `readOnly` 状态下的实际行为（G13 文档写法的前提）。
- Calendar 下拉布局的真实外观（D13）。
- 强制颜色模式下各控件的组合（STANDARDS §5 已声明 UNVERIFIED，本次未涉及）。
