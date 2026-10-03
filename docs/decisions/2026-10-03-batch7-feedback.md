# 第七批：标记、测量与结果事实

## Status

Decided（2026-10-03）。依据根 design.md、STANDARDS.md、组件分层、展示族和动作反馈族。九个组件均为 Primitive；只读当前公共组合与 Base UI 原语，不读归档、冻结或 Coss 实现。

## 语义与关系

| 组件 | 真实职责与取舍 | 状态归属 |
|---|---|---|
| Badge | 短标记，neutral/emphasis 仅区分表达；不编码成功失败，不成为按钮 | 内容及强调归调用方 |
| Kbd | 原生 kbd 表达实际键位，不设键盘监听或可点击动作 | 键位与适用平台归调用方 |
| Avatar | Base UI 图片加载事实与调用方 fallback；根有名称，图像与回退是同一对象 | 原语持有图片事实；来源、名称、initials 归调用方 |
| StatusDot | 状态色与可见名称共同表达；pending、in-progress、unknown 分别命名 | 状态事实归应用，不由动效猜测 |
| Alert | 就地说明默认静态；仅调用方给 role=alert/status 时宣告 | 对象、内容、严重度与宣告需求归应用 |
| PendingValue | 保留对象及原值，明确写入结果未知；核实/恢复入口为显式组合 | 未知由应用传入，不用超时推断；不默认危险重试 |
| Meter | Base UI meter 的真实测量范围，0 是有效读数 | 测量值、范围、单位及阈值判断归应用 |
| Progress | Base UI progressbar 的可靠分母；null 才是不定进度，0 不同于null | 已确认进度归应用，动画不推进值 |
| ProgressCircle | 同一进度契约的圆形表达，不作为独立 Spinner | 与 Progress 一致 |

组件透传 id、ARIA、data、事件、ref 与公共 render。被动内容不添加 tabIndex；确需将其 render 为入口时，仍按既有盒内焦点角色显示，不增加外圈。长中文/英文允许换行，不以截断吞掉对象与状态。

Avatar 根为 role=img，调用方 label 给整个身份视觉样本命名；Image 的 alt 仍透传，不依赖虚构人物或自动猜 initials。Fallback 内容由调用方显式给出；相同对象的视觉切换不自动宣告为服务结果。

PendingValue 分开显示对象、原值与结果未知。`0`、空内容与无原值不得混同；原值由 children 提供，没有值时不替调用方填0。核实入口由 actions 提供，不自行发送请求或附加“重试”按钮。没有超时、假 loading 或自动恢复状态。

Meter/Progress 选择严格范围协议：min/max 及二者差必须有限且 max>min，已知 value 必须有限并位于闭区间，否则 RangeError；两个有限端点相减溢出也不能形成可靠分母。不把坏数据默默夹成有效读数。Progress 的 null 保留无 aria-valuenow；圆环将实际范围换算至 pathLength=100，0/100 和 dash offset 是归一数学关系，不是外观预设。

Base UI 的 locale 只处理数字格式，其不定进度默认可访问文字仍为英文。公开 getAriaValueText 和 Value children 格式化回调按真实 value===null 处理：默认使用现有 buttonInProgress（已知进行中但量未知），保留数字格式，并优先调用方显式定制。不能用 formatted 是否为空判断 null；公开回调在不定状态也可给英文占位字符串。Circle 继承同一默认可访问文字。

## 尺寸与表达定位

允许的集中追加仅在 components.css，修改入口均为对应 --qy-*：

- `avatar-xs…xl` 与 `progress-circle-xs…xl`：身份样本与圆进度各自有独立尺寸角色，默认引用同名 control 尺寸；该初值为预设，不代表二者属于交互控件。各档采用同名控件文字档。
- `status-dot-size`：状态图形直径，默认 .5rem 为预设；文字角色与图形分离。
- `meter-track-size`、`progress-track-size`：测量/任务进度轨厚，默认 .5rem 为预设，各自可改。
- `progress-circle-stroke`：圆形轨/指示笔画，默认 2px 为预设；实际圆半径为容器半径减半个笔画，保证同一轮廓不裁切。
- Badge/Kbd 的 inline/block padding：按字形围合，默认 .5/.125em 与 .375/.125em 为预设，不随全局 spacing 偶然增高；两者使用已有 marker 圆角。

所有角色须由本批对应部位实际消费，不机械搬运散落值。颜色用已有语义前景与表面；轨与值不推断好坏。Alert/PendingValue 采用开放的对象/说明关系，不将说明自动套卡。Progress 的不定状态只表达无可靠比例，不自动转成失败或完成。

## 验证边界

精准测试覆盖原生键位/静态内容语义、Avatar 图片失败与同对象回退、StatusDot 各事实及 locale、静态/显式宣告 Alert、PendingValue 原值0与核实入口、Meter 与 Progress 的真实范围/0/null/错误输入及可访问名称、圆环相同进度契约。定点 TypeScript 检查本批源码、metadata 与 demo。尺寸、浅深色真实对比、长文字容量与强制颜色由主 agent 浏览器检查；不运行构建、生成器或全库测试。
