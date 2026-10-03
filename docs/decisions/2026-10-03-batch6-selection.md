# 第六批：集合、按压、分段值与区间输入

2026-10-03。实现前记录语义与关系，依据根 `design.md`、`STANDARDS.md`、基础层、表单族与选择器族。读取当前重写组件与安装版 Base UI 1.7.0 公开声明、官方公共 API；为定位 ARIA 桥接，仅另核对安装版 SliderThumb 的 ARIA/解剖执行路径。未读取仓库外归档、冻结或上游 Coss 实现。

## 语义与关系

| 对象 | 必须保持的事实 | 组合与替代 |
|---|---|---|
| CheckboxGroup | 字符串集合；增删一项改变同一集合。allValues 声明父 Checkbox 所控制的完整范围，不从 DOM 推断业务范围 | 当前 Checkbox + FieldItem/FieldLabel；共同名称用 FieldTitle 或 FieldsetLegend。只布局用 Group；互斥值用 RadioGroup |
| Toggle | 稳定名称的二态 pressed 按钮，不声称保存、服务执行或设置已送达 | 独立命令用 Button；表单布尔值用 Checkbox；即时开关用 Switch |
| ToggleGroup | multiple=false 的单个按压值或 multiple=true 的集合；都以数组表达，允许全部松开。方向键只移动焦点，按压才改变值 | ToggleGroupItem 复用 Toggle；必须总有一个表单值用 SegmentedControl；面板视角用 Tabs |
| SegmentedControl | 从并列候选中输入一个值；radio/radiogroup、非受控或受控、原生表单名。未给初值保持未选择 | 不强加业务选项；较长或可收起候选用 Select；面板切换用 Tabs |
| Slider | 在明确 min/max/step 内输入数值或有序区间；不是进度，不推断请求结果 | SliderLabel 或每个 SliderThumb 的名称；多滑块各有 index 和区分名称；精确数值用 NumberField |

状态由 Base UI 持有焦点、按压、非受控选择、拖动；受控值、候选范围、invalid、持久化由应用声明。CheckboxGroup 的表单名由 Field.name 或各 Checkbox.name 给出。Slider 的 readOnly 保留焦点、值与表单序列化，通过取消原语变化阻止键盘、轨道点击、拖动和 input 变化；disabled 退出操作并不提交。

Slider 明确拒绝非有限值、min>=max、非正 step/largeStep、未落在 min 起始步进上的 max、负数或非整数 minStepsBetweenValues、空数组、乱序、越界、未对齐步进及不足最小间距的显式值，抛出 RangeError。max 对齐是本批接口选择：使 End 端点、受控值与原生 range 步进共同成立，避免原生 input 规范化为另一个数。未传 value/defaultValue 时从 min 开始，这只是公开默认选择，不把未选择混成零。原语交互可按 step 吸附，不能静默改写调用方给出的无效初值。

Base UI 1.7 的 Thumb 将通用 aria-readonly/aria-invalid 留在可见 div；本批通过公开 render/useRender 遍历原语 Fragment，将只读、Field invalid 和显式 Thumb ARIA 事实接到真实 range input，保留 inputRef、事件、原语渲染的隐藏输入及消费者 render/ref。该差异以实际行为测试与安装版原语的 ARIA/解剖执行路径核对，未把原语源码用于设计取值。默认 aria-valuetext 只使用格式化数值，避免范围原语添加英语 start/end range；每个 Thumb 的区分名称仍由调用方提供，不新增内置文案。

## 表达、选择与预设

- 五档沿用当前 control 外高、同名 text-control 文字、水平留白与圆角。它们都是基础层预设；本批不重新声称唯一推导。Toggle/ToggleGroupItem 复用当前 Button 的 bordered/solid 几何和焦点通道。未按压由线承担入口范围，按压由填充及 aria-pressed 表达；具体机制是选择。
- SegmentedControl 以可换行的共同候选组组织 radio，候选各自有完整命中高度，选中使用 primary/配对前景，未选使用 card/输入线。它不靠滑动动画表示值，不新增业务候选或指示器状态。
- 有边框部位聚焦只改色；填充部位的信号位于盒内，复用既定 focus width。disabled 的 opacity-64、颜色、字号、时长和曲线继续是预设。命中使用库内 touch-target 选择，不能声称 44px 是 WCAG AA 统一下限。
- Slider Control 外高（vertical 时外宽）读取同档 control，Thumb 默认读取同档文字行高；窄屏从同档 control-narrow−control 保留 +4px。Thumb 有输入线，焦点只改变该线颜色。thumbAlignment 默认选择 edge，使端点不越出工作区；调用方可使用原语其他对齐策略。
- 新增 `--qy-slider-track-size: 4px` 是轨道厚度预设，由 SliderTrack/Indicator 实际消费；轨道不是控件外高，也不由全局 spacing 驱动。新增 `--qy-slider-vertical-length: 10rem` 是纵向工作长度预设，由纵向 SliderControl 实际消费；另一个有效长度也可成立。集中修改入口为 `packages/ui/tokens/components.css` 或项目主题覆写，本批只增加角色区块。Track 使用 border-input 的实色工作轨道，Indicator 使用 primary 表示实际值区间，不能代替 Progress。

## 来源与验证边界

原语公共接口参考 [Checkbox Group](https://base-ui.com/react/components/checkbox-group)、[Toggle](https://base-ui.com/react/components/toggle)、[Toggle Group](https://base-ui.com/react/components/toggle-group)、[Slider](https://base-ui.com/react/components/slider)，签名以本地安装版声明为准。未复制官方视觉示例或旧组件外观。

精准测试覆盖集合范围/父项、受控与取消、键盘/禁用、radio 值与表单、Slider 步进/端点/区间/只读/禁用/输入序列化及透传。实际结果记录在本批 implementation 文档。浏览器拖动、computed 几何与对比、窄屏和触摸命中、强制颜色、实体辅助技术未在本子任务运行；生成物、构建和统一浏览器验收由主 agent 承接。
