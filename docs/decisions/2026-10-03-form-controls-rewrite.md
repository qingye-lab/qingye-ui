# Textarea / Checkbox / Switch 重写决定

2026-10-03，Decided。设计依据为根 [design.md](../../design.md)：先定语义、关系、表达；状态归属、删去检验与可访问行为。表单族与选择器族提供组合关系，基础层和 STANDARDS 提供已裁定的约束与预设，不从旧实现取值。

## 语义与关系

- Textarea 是多行值的编辑入口。单行值用 Input；富文本与编辑器功能不属于本控件。Field 持有名称、说明和调用方错误；Textarea 不从空值、required、maxLength 或错误文字推断 invalid，不清空失败后的草稿。
- Checkbox 表达独立的是/否或集合中的一项，可在提交前保留选择。indeterminate 是集合部分选中的事实，由调用方从集合计算；不能用一个外观开关虚构该事实。全选例中的父项由应用计算 checked/indeterminate，子项仍是独立 Checkbox，不引入不存在的 CheckboxGroup。
- Switch 表达立即生效的开/关。点击应改变当前设置，名称保持稳定，状态由原语的 aria-checked 表达。需提交才生效的选择、条款同意、多选项、不可逆命令或尚无确定结果的请求不用 Switch；分别用 Checkbox 或动作与明确结果反馈。库不请求、不保存、不从动画完成推出生效；示例立即改变本地告警状态，只把它称作当前页面状态。
- 三者复用 Field 的标签注册、说明与错误关联。Textarea 使用 Base UI Field.Control 的 textarea render 出口，Checkbox/Switch 使用其 Root 原语；不另写标签/校验系统。原语命名空间公开，完整自动校验需完整使用 FieldPrimitive；本库 Field 是调用方管理 invalid 的组合。

## 几何：选择与预设

| 部位 | 决定及定位 | 修改入口 |
|---|---|---|
| Textarea 起始容量 | 默认 rows=3 是选择：设备备注容纳数句，不默认占据长文编辑面积。rows 可改变最小行数。默认 CSS field-sizing:content 自动增高，保留 resize-y；不支持的平台保留原生 rows 和手工调整，不引入测量脚本 | rows、className/style |
| Textarea 最小外高 | 行数 × 同名文字行高 +（同档单行外高 − 同名行高）。算式由保持首末行余量的关系推出；外高、行高本身是基础层预设。实际内容增长不受该下限限制 | size=xs/sm/md/lg/xl；局部变量仅接线现有角色 |
| Textarea 内距 | 水平复用 control-*-padding-bordered；垂直为（同档外高 − 同名行高 − 2×1px边框）/2。窄屏接 -narrow / -mobile，sm 回桌面。公式保持 Input 的文字起点；1px 是既定边界选择 | 既有控件与文字 token |
| Checkbox 方框 | 选择桌面与同名控件文字行高等高，以便与 FieldLabel 的文字列相邻。复用行高作默认值，局部绑定不是新增全局角色。默认 md 为20px；窄屏通过同档 control-narrow−control 读取既有+4px，得到24px，不从 mobile 行高推断另一个增量 | size；style 的 --qy-checkbox-edge / --qy-checkbox-edge-narrow |
| Switch 轨道 | 桌面与同名控件文字行高等高，宽=2×高是选择，为两个端点留足位移。不是把普通 spacing 改大来驱动几何；默认 md 为40×20px，窄屏同样从同档 control-narrow−control 保留高+4px | size；style 的 --qy-switch-height / --qy-switch-height-narrow |
| Switch 滑块 | 留边=quiet焦点宽度+填充焦点宽度，默认3px；直径=轨道高−2×留边，位移=轨道宽−轨道高。留边是避免滑块遮住焦点线的选择；圆形滑块是明确的圆形身份，豁免方整轮廓约束 | 已有 focus width；局部 --qy-switch-inset |
| 圆角 | Textarea xs6/sm7/md-xl8；约束以单行名义档高为准，不因多行变胶囊。Checkbox=min(marker,高/4)，Switch=min(control radius,高/4)，均满足 r≤25%×名义外高；取上限并非唯一推导 | 既有 radius 角色 |
| 命中 | 三者接 touch-target；Textarea 粗指针外高至少 touch-target。44px为库内选择，不是WCAG统一下限 | --qy-touch-target |

不新增全局 token，不改基础层文件。以上局部变量只建立真实消费链，不以变量名把任意值追认为理念要求。五档提供与同组控件匹配的入口，不新增强调变体。

## 表达与焦点

- Textarea 与 Input 同属有边框编辑区：浅色 card、深色 surface-inset，1px border-input。只变边框颜色；invalid 使用危险边框，聚焦危险文字色，宽度不变。只读用 dashed 及已有 locale.readOnly 文字，禁用以原生行为和既有 opacity-64 预设共同表达。
- 未选 Checkbox 用同强度输入边框标出范围，聚焦只变边框颜色。已选或部分选中由 primary 填充及勾/横杠区分，边框透明但保留1px结构占位，焦点在填充内侧读 focus-ring-width 和 primary-foreground。invalid不覆盖勾/横杠事实，仍有aria-invalid及FieldError；未选框以错误线表达。
- Switch 两态都使用有对比的实心轨道：关为 foreground-muted，开为 primary，滑块使用配对前景；位置与 aria-checked 共同表达，不只用颜色。两态焦点均在填充内侧画反色线，不在外面加环。invalid仍由调用方声明并由FieldError表达，不伪造第三个开关状态。
- 颜色、透明度、文字档、时长、曲线是基础层预设。滑块位移用已有 duration-fast/ease-out，reduce下去掉位移动画；不新增局部入退动画。强制颜色焦点由 styles.css 统一回退。

## 验证边界与来源

新文件从零编写。读当前已重写 Input/Field 的完整组合实现、utils、token声明、文档类型、三个上一批报告及安装版Base UI 1.7.0公开类型；查官方 [Field](https://base-ui.com/react/components/field)、[Checkbox](https://base-ui.com/react/components/checkbox)、[Switch](https://base-ui.com/react/components/switch) 的公共API。未读取归档组件源码、冻结来源或旧组件函数体；未读取归档测试。本批不修改既有断言。

验收包括标签激活、Field说明/错误、显式invalid、受控/非受控、Space/Tab、混合状态、只读/禁用、表单提交及样式透传。桌面≥1100px浅深色串行实测，真实Tab后等待≥500ms取几何、边框、内线、颜色和截图。生成物、build、官网外壳恢复、390px及实体设备不属于本批。
