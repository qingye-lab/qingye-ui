# 表单与输入家族执行台账

日期：2026-10-02。范围是主代理分配的 21 个组件、各自公开 metadata / demos 与 focused tests。使用 `design.md`、`STANDARDS.md` 和 Rootloom `operating-coding-change` 的 scoped 路线；保留其他代理和主代理的工作，不启动浏览器、不提交、不发布。

本家族以输入、选择和修正的真实任务为判断依据。保留 Base UI 的可访问原语；修复状态、工作容量和可定位焦点的缺口。21 份 `meta.design` 都写有本组件的采用理由、应避免的错误、组合、状态 owner、响应式取舍和修改入口，覆盖通用的表单分类模板。下表的“保留”表示具体设计判断，不表示浏览器或辅助技术验收通过。

## 逐组件处置

| 组件 | 处置 | 任务与设计判断 | 证据和未验证边界 |
| --- | --- | --- | --- |
| Input | 保留结构，修复占位文字对比 | 单行文本要保留可编辑工作区；字段名称、placeholder 示例和错误各司其职。外框负责边界，原生输入负责输入语义；现有尺寸角色、移动字号和触屏高度已经接通。去掉额外 placeholder alpha，复用完整 muted-foreground。 | 主代理实测旧 placeholder light 3.11:1 / dark 3.26:1 FAIL；修正后待重测。Field 与 InputGroup 相关 tests PASS。真实 iOS 输入 UNVERIFIED。 |
| Textarea | 保留结构，修复占位文字对比 | 较长草稿应获得随内容增长的空间，允许限制高度后内部滚动。Field.Control 保留标签与校验关系，InputGroup 承接工具栏。占位提示是可读文字，不再另加透明度。 | 旧 placeholder light 3.11:1 / dark 3.26:1 FAIL；修正后待主代理重测。InputGroup 相关 tests PASS。`field-sizing` 浏览器支持和长草稿滚动仍需确认。 |
| PasswordInput | 保留实现，补具体指导 | 查看字符是输入核对动作，可见性不等于修改密码；稳定按钮名称与 aria-pressed 分工明确。继承禁用已有实现和测试。 | 4 tests PASS，覆盖受控、继承禁用、locale 与 ref。真实密码管理器、读屏和设备行为 UNVERIFIED。 |
| SearchInput | 修复 IME 下 Esc | Esc 可清除已提交的查询文字；组字时 Esc 属于输入法，不应清掉查询草稿。清除后焦点留在输入。请求和过期结果由应用管理。 | 6 tests PASS，新增 composition / keyCode 229 与正常 Esc 恢复。合成事件不等于真实中文 IME 验收。 |
| NumberField | 修复命名、焦点、尺寸链 | 当前消费者把名称传 root，但原语只将其写在 div，实际输入没有名称。用现有 context 传给输入，输入显式名称清除冲突的默认命名属性。输入、增减按钮共享边界，每个动作仍有自己的键盘焦点。 | 7 tests PASS，覆盖 root 名称/说明、input aria-label / aria-labelledby 交叉优先、Field 默认与显式关联、范围及只读。尺寸 computed 和按钮焦点由主代理测。 |
| NativeSelect | 接通已有尺寸角色，修复空值文字对比 | 同名 sm/default/lg 应随项目 --qy-control-* 改变，不能与 Input 的集中主题脱节。原生平台选择器适合移动表单和长列表，placeholder 保留空值且使用完整文字角色。 | 4 tests PASS；默认几何保持原值。旧空值 light 2.97:1 FAIL，修复后对比待重测；项目覆盖 token、平台面板仍需 computed / 设备证据。 |
| Select | 限制浮层可用宽度 | 离散值选择保留分组和完整选项文字。原浮层仅有 anchor 最小宽度，长内容会缺少可用宽度上限；补齐 --available-width 约束。 | 2 tests PASS，保留明确名称与跳过禁用项。浮层长文本及窄屏结果 UNVERIFIED，由主代理检查。 |
| Combobox | 修复标签焦点、容量、移除对象 | 查询和已选对象分开；已选长标签在控件内换行。原 Chip 清除 outline 却未定义焦点，方向键导航无法识别当前对象。移除动作必须说明对象，不能所有按钮都只有“移除”。 | 18 tests PASS，新增本地化对象名与显式 removeProps 优先；demo 使用实际长内容。标签 wrap、focus ring 与 RTL 需浏览器确认。 |
| Autocomplete | 补候选长文本容量 | 自由文字与建议不是同一约束；无建议不代表输入无效。候选允许长文字换行，不要求用户另找 Tooltip。 | 12 tests PASS；basic 新增长建议。候选几何仍需浏览器检查。 |
| Checkbox | 保留实现，补具体指导 | 独立条件和多选成员采用勾选语义；半选表示成员部分选中。Label、Field 和触屏目标已经承担必要关系，不增添第二个选择载体。 | 源码判断；独立控件实机与读屏 NOT_RUN。 |
| CheckboxGroup | 保留实现，补具体指导 | 集合数组和父子选择交给成熟原语；FieldsetLegend 说明共同范围。全选的业务范围由应用定义，不能默默扩大至未显示对象。 | 源码判断；父子半选实际浏览器和读屏 NOT_RUN。 |
| RadioGroup | 保留实现，补具体指导 | 少量互斥方案应同时出现以便比较；共享组维持一个 Tab 停靠点和方向键导航。卡片只作为 Label 载体，不重做选择状态。 | 源码判断；方向键、长标签和真实辅助技术 NOT_RUN。 |
| Switch | 补无效状态与共享动效时间 | 即时设置的名称不随开关变化。原样式未表达已有 aria-invalid 状态，补错误 ring；轨道和滑块的反馈时间接入既有 duration/ease。远程写入和失败恢复仍由应用负责。 | 类型与 conventions PASS；无效 ring 对比、RTL 和 reduced motion 需浏览器检查。 |
| Slider | 保留交互，补 root 样式部位 | 近似数值的范围关系适合轨道，精确任务配 NumberField。两个 thumb 分别命名，读屏数值跟随 UI locale；补 root data-slot，保持可样式化部位完整。 | 2 tests PASS，覆盖范围名称和 locale 数值。实际拖动、竖向及粗指针 NOT_RUN。 |
| OTPField | 补真实 44px 目标与窄容器滚动 | 填满仅表示输入完成。粗指针每格 44×44，关系间距收紧；不足物理最小宽度时保留位序，明确内部横向滚动，不能缩小目标或隐藏溢出。焦点环在滚动容器中留有空间。 | 源码与类型 PASS；390/320 coarse、最后一格键盘可达由主代理测。verify 清除假倒计时，错误关联真实输入，演示邮箱/号码不再声称已发送。 |
| Field | 保留语义，补长文本空间 | 一个问题、输入、必要说明和修正信息维持同一关系。最小宽度允许收缩，长说明/错误可折行，不删必要内容来让版面合格。未注册的组合控件显式关联名称和说明。 | 10 tests PASS，覆盖 FieldError、Form 错误、关联与布局。长不可断字符串的几何仍需浏览器证据。 |
| Fieldset | 保留原语，补长 Legend | 共同问题与禁用传播由原生 fieldset/legend 承担；布局相邻不自动成为语义分组。Legend 可在窄容器中折行。 | TagInput 继承 Fieldset 禁用及重新启用回归 PASS；长 Legend 目检 NOT_RUN。 |
| Form | 保留实现，补具体指导 | 提交和字段校验不等于服务器成功；Form 分派具名错误，应用处理版本、结果未知和恢复。没有理由在共享库增加业务请求。 | Field/Form 相关 tests PASS；真实服务端写入 N/A，本组件不提供。 |
| InputGroup | 保留实现，补具体指导 | 一份主输入与短前后缀、附属命令共享边界。现有 addon 不抢走 button/link 操作，block 工具栏提供独立工作行；继续复用 Button/Input/Textarea。 | 3 tests PASS，覆盖 addon 聚焦、交互取消和按钮语义。长 addon 容量与设备触摸 NOT_RUN。 |
| TagInput | 修复继承禁用与焦点表达 | 失败标签文本保留用于修正，IME 不误提交。原 interactive 仅看显式 disabled，Field/Fieldset 禁用后仍生成附属动作。订阅实际输入及祖先 fieldset 的 disabled 变化，把实际 :disabled 同步到标签动作、状态与隐藏提交值；恢复后既有标签仍有效。 | 19 tests PASS，覆盖 Field / FormData、Fieldset，以及稳定 children 下两种初始状态的双向禁用与恢复，恢复后可移除。实际 IME、触摸与读屏 UNVERIFIED。 |
| FileUpload | 修复原生提交镜像 | 被拒绝/重复/清空的 picker 选择不能清掉已接受文件。原 onChange 清空原生 input，但列表不变时 effect 未重跑；用选择修订触发镜像，受控列表仍由 owner 接受。 | 11 tests PASS，新增三种 picker 变化保留已接受镜像。jsdom 测 FileList 边界；真实 DataTransfer / FormData 浏览器证据由主代理补。 |

## 实际验证

- PASS：`pnpm --filter @qingye/ui exec vitest run test/file-upload.test.tsx test/tag-input.test.tsx test/search-input.test.tsx test/combobox.test.tsx test/number-field.test.tsx test/native-select.test.tsx test/autocomplete.test.tsx test/field.test.tsx test/password-input.test.tsx test/input-group.test.tsx test/select.test.tsx test/slider.test.tsx test/conventions.test.ts`，13 文件、98 tests。
- PASS：`pnpm --filter @qingye/ui typecheck`。
- PASS：`pnpm --filter docs typecheck`，示例更新后另跑一次。
- PASS：限定源码 / content / tests 的 `git diff --check`。
- FAIL（本家族之外的并行执行状态）：首次 `pnpm test -- <files>` 未正确限制 Vitest，实际执行全套，观察到 sidebar 4 tests 失败、323 通过；当时 sidebar 家族仍在实施。未把这次执行报告为全套 PASS，也未修改其实现或测试。
- NOT_RUN：本代理的浏览器、截图、真实 IME、触屏和辅助技术。主代理为唯一浏览器 owner。

### 独立审查返修

- 复现：有内部 disabled 状态的 Field / Fieldset wrapper 接收稳定 children 时，只有内层原语或原生 fieldset 改变；TagInput 原先只在自身 render 的 layoutEffect 中采样，附属动作和 hidden inputs 因而陈旧。四种稳定 children 回归在修复前均 FAIL。现在保留 render 后同步，并通过 MutationObserver 订阅实际 input 与全部祖先 fieldset 的 disabled 属性；卸载时 disconnect。没有引入 Base UI 私有 context 或改写原语禁用规则。
- 复现：NumberField root aria-labelledby 与 input 显式 aria-label 同时存在时，前者压过后者；自动 FieldLabel 也有同一优先级冲突。两种显式命名回归在修复前 FAIL。现在输入显式 aria-label 清除默认 aria-labelledby，输入显式 aria-labelledby 仍通过最终 props 优先；没有显式命名时保留 Field 的自动关联。
- PASS：`pnpm --filter @qingye/ui exec vitest run test/tag-input.test.tsx test/number-field.test.tsx test/field.test.tsx`，3 文件、36 tests。
- PASS：`pnpm --filter @qingye/ui typecheck`；限定返修文件的 `git diff --check`。
- 返修源码已稳定；没有启动浏览器、提交或修改共享 tokens / locale / manifest。浏览器及真实辅助技术证据仍由主代理汇总。

## 公开示例与主代理浏览器检查

1. `/playground/file-upload`，`form`：input `name=attachments`，按钮“添加附件”。先选择 `saved.pdf`，再选择被拒绝的 `rejected.exe`，再重复 `saved.pdf`，点击“提交工单”；原生 FormData 与 role=status 的“本次附件：saved.pdf”保持一致。仅提交了前端示例结果，不声称真实工单保存成功。
2. `/playground/tag-input`，`states`：“技能（禁用）”仅从 Field 继承禁用；“交接标签”从 Fieldset 继承。点击外部“编辑标签”后可移除，再“锁定标签”禁用，值保留。
3. `/playground/combobox`，`multiple`：默认标签“华东跨区域容灾与高可用服务的生产发布验证与灾后恢复协作流程”。方向键进入标签后应有 ring；长文字留在控件内；按钮名称为“移除 {标签}”，移除后焦点返回输入。
4. `/playground/autocomplete`，`basic`：建议“跨区域容灾演练结束后如何核对主备切换、告警订阅和数据一致性”检查窄屏换行与高亮，不丢失完整文字。
5. `/playground/number-field` 和 `/playground/native-select`，`sizes`：覆盖现有 `--qy-control-sm/md/lg`，检查外部高度 = 角色 + 移动增量、内部高度 = 外部 −2；另测 coarse 44px 优先。NumberField 的 root aria-label 应可命名实际 input。
6. `/playground/otp-field`，`separator` / `verify`：390 / 320 coarse 检查每格至少44×44、页面无横向溢出；极窄控件内部滚动合法，最后一格经键盘聚焦后须可见。默认 coarse 普通六格约285px、带 separator 约300px（含焦点留白）；字体和布局以实际 computed 为准。
7. Field / Fieldset 的长 label、description、error / legend；Select 长候选浮层；Switch invalid / RTL / reduced-motion。所有有表面的变化须检查 light 和 dark 真实组合与对比度。

## 外观、部位和真实契约

- NumberField / NativeSelect 接通既有尺寸角色，默认主题的外部/内部高度保持原值；NumberField sm 的桌面 line-height 原先误用较大档位，现与实际 sm 内高一致。不是新增 token 或仅改名通过检查。
- OTP coarse 格子实际变大；间距收紧、根容器增加焦点留白和窄容器横向滚动。verify 去掉无独立对象意义的嵌套卡片、边界和 padding。
- Combobox Chip 实际新增可见焦点、长标签换行与 `combobox-chip-label` 部位。默认纯文字 remove 可访问名称变为动作加对象；`removeProps` 仍优先。新增标签包装元素可能影响消费项目针对 Chip 直接子元素的 CSS，应在升级说明中列出。
- Field/Fieldset 的长文本折行、Select 可用宽度上限、Switch 的无效 ring 与反馈时长属于真实外观变化，不以 refactor 名义掩盖。
- 主代理真实 preview 测到 Input/Textarea/Combobox/Autocomplete/SearchInput placeholder light 3.11:1 / dark 3.26:1、NativeSelect 空值 light 2.97:1。移除 Input、Textarea、NativeSelect、Select、OTPField、TagInput 的额外 `/72`：复用现有完整 `muted-foreground`，共享 Input 同时修复 Combobox / Autocomplete / SearchInput 的转发链。实际字色变深，未新造 token；修正后数值由主代理重建重测，不能把源码移除 alpha 当作对比 PASS。原始证据：`test-results/home-renovation/placeholders.json`。
- 同一检查发现 ComboboxChipsInput 与 NumberFieldInput 没有声明 placeholder 角色，会退到 Tailwind preflight 的 currentColor 50%。它们现在也明确消费 `placeholder:text-muted-foreground`；未设置 placeholder 的正常值外观不变。
- 新内置文案 keys：无；对象移除名称复用已存在的 `messages.remove`，zh/en 有回归。
- 没有删除公共导出或改变值回调签名；NumberFieldContext 的补充输入属性为可选，现有仅提供 fieldId 的类型仍成立。没有增加业务保存或兼容服务。

## coss 派生变更短句（由主代理统一登记）

| coss 文件 | adaptation 建议 |
| --- | --- |
| autocomplete.tsx | Allow long suggestion labels to wrap within the popup. |
| combobox.tsx | Add visible chip keyboard focus, contained long labels, and localized object-specific removal names. |
| field.tsx | Preserve long labels, descriptions and errors in shrinkable field layouts. |
| fieldset.tsx | Allow long legends to wrap within the fieldset. |
| input.tsx | Keep placeholder text on the full readable muted foreground role. |
| number-field.tsx | Forward root input labels/descriptions, consume control size roles, and show per-stepper keyboard focus. |
| otp-field.tsx | Provide real coarse-pointer targets, reachable narrow-container scrolling, and readable placeholders. |
| select.tsx | Bound popups to available width and keep empty-value labels on the full readable text role. |
| slider.tsx | Expose a root data-slot while retaining primitive range behavior. |
| switch.tsx | Express invalid state and consume shared feedback timing for track and thumb. |
| textarea.tsx | Keep placeholder text on the full readable muted foreground role. |

主代理还需统一更新 coss-source、生成 catalog / AI 公开副本及 capability / token 台账，并合并本轮浏览器证据。本代理未改这些共享派生文件或 upstream baseline。
