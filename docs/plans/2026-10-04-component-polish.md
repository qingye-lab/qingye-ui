# 组件打磨清单

2026-10-04 起。用户裁决：配色保持原墨色；底面与纸面均可，不另定；重点是打磨组件本身的细节——字体、超宽、过宽等。依据：根 `design.md`、基础层 `docs/decisions/2026-10-03-foundation.md`。证据来源：`review.html` 1440px 浅色全页 22 屏目视。

## 第一轮：全局（已完成，主 agent）

| 项 | 改动 | 依据 |
|---|---|---|
| 字体 | `--qy-font-sans` 去掉 Geist，改为系统字体栈；官网不再加载 Geist | 中英混排时系统字体的拉丁与中文字面成对设计；Geist + 苹方同行出现两套 x 高度与灰度。选择，可覆写 |
| 字重 | 五档控件文字 500 → 400；Button 自带 `font-medium` | 输入值、选项是内容不是命令；全部中黑使中文发粗，强调失去稀缺性 |
| 控件内间隔 | 新增 `--qy-control-content-gap: 0.375em`，Button 内容与状态使用 | 图标与文字原来无间隔；随文字档缩放，值为预设 |
| 按钮状态 | 「保存⌛· 等待中」→「保存 ⌛ 等待中」，状态文字 80% 不透明 | 去掉挤在一起的点号 |
| 只读 | 虚线边框 → 容器线 + `surface-inset` 实底（Input、Textarea、Select、Checkbox、Radio、InputGroup、NumberField、OtpField） | 虚线像未渲染完成；只读用不可编辑的承载面表达。禁用不再误中 `:read-only` |
| 开关 | 关闭态：承载面 + 输入线 + 辅助色抓手（同复选框未选）；抓手圆角按同心换算 | 原深灰底与开启态难区分；圆抓手配方轨道违反 §4 同心 |
| 原生下拉 | 去平台箭头，换与 Select 相同图标；宽度随最长选项；列表形态选项留白与选中底色 | 平台箭头与库内其他下拉不一致；拉满容器 |

## 第二轮：按组件（待执行）

### 宽度
- 选值类（Select、Combobox、DatePicker、DateTimePicker、NumberField）默认宽度随内容与合理最小宽度，不默认拉满；文字输入（Input、Textarea、Autocomplete、TagInput）填满容器，由版式限宽。
- 演示与审查页的 Field 限宽，不让单个输入横跨 800px。

### 输入组合
- DatePicker / DateTimePicker：平台日历图标、外置日历按钮、外置清除三者并存 → 一个输入框，内部尾部放日历与清除。
- DateRangePicker：同上；空态只显示「只读」不成立。
- Combobox / Autocomplete：外置带框下拉按钮与清除 → 收进输入框尾部。
- TagInput：标签堆在框外、输入与「添加标签」分离 → 标签与输入在同一编辑边界内换行。

### 选择
- SegmentedControl：三个分离的带框按钮 → 连续轨道、选中段浮起。
- Toggle 按下态用 64% 灰填充，像禁用 → 用 accent 底 + 前景色。
- Slider：方形带框抓手偏移、轨道过细 → 抓手与轨道居中，同心圆角，轨道加粗。
- Calendar 区间：起止是两个独立黑块，无区间带 → 中间日期连续浅底，两端实心。

### 展示
- Alert：只有彩色文字 → 有图标与承载边界。
- Progress 不确定态：虚线条 → 动态条（减少动效时静态说明）。ProgressCircle 尺寸与文字对齐。
- Avatar 回退显示「图」→ 姓名首字或图形。
- Pagination：当前页无可见标识 → 当前页有边界或填充。
- Table / DataTable：排序列表头基线下沉、选择列过宽 → 表头同一基线，选择列按复选框宽度。
- DescriptionList：名与值 50/50 分栏导致大空隙 → 名列按内容宽度。
- Tree：缩进与行高过大。
- FileUpload：没有拖放区 → 有可见的放置区域。
- Carousel：无可见幻灯片承载。
- Sidebar、Toolbar、Item、CodeBlock 演示结构破碎，逐一核对。

### 演示内容
- 「条目 A / 选项 / 值 / 甲乙丙 / 图」等抽象占位 → 短而真实的文字（审查页与演示仍不编业务流程）。

## 验收

每个组件：浅深桌面截图目视；相关行为测试与 typecheck；token 改动按 CLAUDE.md 重生成台账。只报告实际运行的检查。
