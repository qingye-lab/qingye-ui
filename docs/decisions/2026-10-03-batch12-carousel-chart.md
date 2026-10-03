# 第十二批：顺序阅读与真实图表

2026-10-04。依据当前根 design.md、STANDARDS、分层与展示族；主 agent 已审核最小 API。只拥有 carousel/chart 源、测试、组件文档、review80 与本批记录，保留其他代理变更。不读取归档、冻结或 Coss。

## Carousel

有限项以稳定 id、非空名称与真实内容组成；label 为整个阅读对象命名。value/defaultValue/onValueChange 是呈现位置，不是阅读完成、权限或业务结果。原生 region 和可见当前位置/总数共同成立，已有 locale.carousel/slide/slideOf/previousSlide/nextSlide 足够，不新增语言键。

默认只有手动顺序，不自动播放、不循环首尾。前后边界用 Button 的真实 aria-disabled 与动作守卫，控件保持焦点；容器自身焦点上的 ArrowLeft/Right/Home/End 切换，字段和嵌套控件的键盘不被截获。左右跟随实际 direction。ScrollArea 提供原生容量和盒内焦点，不复制基本按钮。

各项保持 DOM，当前项之外 hidden 且不可达，保持同一输入对象；隐藏字段是否仍提交由应用的字段属性决定。当前项移除或受控外部切换时，若真实焦点仍属旧项，恢复到有名称的阅读容器；真实焦点已离开则不夺回。空数组没有伪造的“第1张共0张”，调用方提供空内容。受控拒绝不改变实际位置；稳定 id 与有效受控值是调用契约。

## Chart

图表表达真实共享量纲，调用者提供 label/categoryLabel/valueLabel、至多五个有名称系列与同源 rows。finite number 是已知数值，0 不等于无数据；unknown 和 not-applicable 必须显式带真实名称，不把 null、NaN 或缺键猜成0。整图 empty/unknown/not-applicable 也由调用方明确给内容，不能借图形推断请求状态。

默认使用安装 Recharts 公共 LineChart、XAxis、YAxis、Line。投影只将显式非数值置为 gap，connectNulls=false，关闭动画以避免图表状态依赖动效。共享量纲轴名、分类轴名、可见图例与同源可见 Table 一起提供；未知和不适用在表中保留各自调用方文字。图形是补充，表格仍可到达并保留实际值；formatValue 只格式化已知数值。renderPlot 可用同源投影替换图形，不移除名称、图例和等价表格。

系列只消费已有 chart1..5，最多五系列是当前角色范围约束。圆/方/三角/菱形/十字标记及不同线型与文字图例共同区分，不能只靠颜色。必要图形与真实背景≥3:1，文字≥4.5:1由主 agent 浅深实际验证，源码色名不算通过。

图高12em、线宽2px、标记8px是本批明确的集中预设，不伪称关系唯一推导。作用分别是图形阅读容量、非文本线信号、系列形态区分；入口为组件集中默认与根 style 的局部 --qy-chart-plot-height/--qy-chart-stroke-width/--qy-chart-marker-size，实际图形与图例消费。不是新增全局token，不通过空间阶梯间接调尺寸；分类文字与表格换行/原生滚动保留长中英容量。

## 验证边界

只运行相关真实正常/首尾/键盘/受控拒绝/输入保持/旧项焦点恢复和图表零/显式未知/不适用/空态/非法值路径，定点TS。主 agent负责唯一浏览器与浅深computed、容量、图形对比；本代理不运行浏览器、build、生成器、pack、全suite或Git。

## 默认图形轴容量实测修复

主代理实际浏览器发现浅色 0 的左半与深色负号被图形左界裁掉。Recharts 3.10 的公开自定义 tick 将自身测量 class 传给 tick；`YAxis width="auto"` 用实际带该 class 的 SVG 文本测量宽度，再加原语 tickSize/tickMargin。自有 AxisTick 忽略 className，使原语只得到刻度线/间距宽度。修复在 owning AxisTick 转发 className 到公开 Text，保留 text-support 与既有锚点，不硬加 margin 或抄内部测量器；轴宽继续由真实格式化刻度文本决定。
