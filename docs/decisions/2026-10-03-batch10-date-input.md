# 第十批日期与候选输入关系

2026-10-03，基线a94e8b4。依据design.md、STANDARDS.md、分层与当前Input/Field/Button/Popover公共组合，以及已安装DayPicker10/BaseUI1.7公开API。未参考冻结/归档/Coss。

- Calendar是日期集合的选择与年月导航Pattern；DayPicker持有当地日历计算、键盘与range/disabled，不用UTC字符串反推日期。五档日按钮消费同名control/text角色，粗指针实体单元读touch-target，避免扩大伪命中覆盖邻日。无任务依据不预设日期长度/业务禁用日。一个月、label caption与nav after是布局选择，日期/范围/年月约束由应用提供。格式化和解析使用当地年/月/日。
- DatePicker是单个当地日期值的输入与日历展开；Date|undefined受控事实由调用方持有，真实date Input参与Field与FormData，Calendar选择和native编辑请求变化。禁用、只读阻止附属更改；清除是undefined，Escape关闭但不伪称撤销已经接受的值。
- DateRangePicker的提交值必须有from/to两个端点。Calendar可持有未完成draft，显式Apply才请求提交完整范围；Cancel/Escape退出丢弃该次draft并保留调用方值。表单用同组名.from/.to序列化确认端点，过滤Input原生name以免提交展示文本。当前同日范围由DayPicker合法规则决定，不强加过夜/最小时长；需要跨日完整选择由应用传min。
- DateTimePicker是当地墙上日期与时间字符串（datetime-local），不表示时区/UTC瞬间。Calendar日期和time Input组成草稿，空时间不补now，不自动推断DST可用性。Apply须日期/时间完整；native编辑与清除继续请求调用方，FormData始终来自实际确认字符串。
- Combobox是一个确认候选值与独立过滤文本；BaseCombobox负责注册/序列化/取消/清除/键盘，不把查询草稿提交成候选。Autocomplete是可自由的输入文本，候选仅建议；选择建议才请求文本变化，默认list模式不把高亮候选当值。各自Input通过共享Input nativeInput公共出口，避免第二Field注册；clear/trigger通过Button。Root、各部位及安装原语命名空间公开，不附业务选项。

日期展开消费Popover；候选Popup消费其专属公开BasePortal/Positioner/Popup，不接入另一个Popover Root。Positioner实际读取foundation owner提供的useFloatingLayer('popup')；caller style最后合并。未新增z字面值/token。色彩/圆角/焦点/控制几何是既有选择/预设；本批关系只算local日期、范围完整性、时间完整性及同一控件的内部可用空间。示例是控件与简单Field，不虚构流程/服务。

原生date/datetime-local的min/max/step与Calendar的disabled/startMonth/endMonth是不同公开约束入口，调用方须同步并在onValueChange中做需要的应用校验；本批不从某个入口静默推断另一个入口。Range不使用原生date输入校验，只提交确认的两个hidden端点；当前展示只读，键盘编辑通过日历，不宣称已提供分别键入起止端点的路径。其他日期语言可显式传DayPicker locale；周起始日/RTL/跨午夜更新仍需对应真实运行验收。
