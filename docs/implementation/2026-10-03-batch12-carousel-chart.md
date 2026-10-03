# 第十二批：Carousel / Chart 实施记录

2026-10-04。按主 agent 已批准的最小 API 与本批关系决策实现，保留其他代理变更；未读归档、冻结或 Coss。

## 文件与契约

- `packages/ui/src/components/{carousel,chart}.tsx`，`packages/ui/test/{carousel,chart}.test.tsx`。
- `apps/docs/src/content/{carousel,chart}/meta.ts` 与 `demos/01-states.tsx`；`review/sections/80-batch12-carousel-chart.tsx`。
- 本批 decision 与 implementation 两记录。两meta补齐 API/键盘/notes 英文和新 designEn，交 C 审英，不改其他移交metadata或STANDARDS。

Carousel：必需非空对象名称和唯一稳定id项；手动前后首尾，无自动播放或环回。实际ARIA边界保留 Button 焦点；仅容器自身键盘切换，字段键盘不被截获。各项输入保持DOM，只有当前项可达；当前位置不宣告阅读完成。移除当前项或受控外部切换只恢复旧项内实际焦点，外部焦点保留。空项无假位置或按钮；受控拒绝保持原位。

Chart：真实共同量纲、分类/数值轴名、至多五命名系列、同源可见Table。0保留，未知和不适用显式带调用方名称，缺值/NaN/Infinity拒绝；非数据状态由调用方提供真实内容，不造表或轴。默认Recharts公开LineChart的线不连接gap、不动画；marker与线型加文字图例区分系列。renderPlot收到同源0/null投影，名称/图例/表格仍保留，自定义图形不强制隐藏交互ARIA。所有值不可用时不画虚假数值轴。

数值demo由可编辑Input实际草稿提供，初始0仅展示零状态，清空转换为显式未完整数值，未模拟测量服务或业务结果。原生UI语言使用已有carousel/slide/slideOf/previousSlide/nextSlide；**无新增locale键或全局token**。

## 已观察检查

| 检查 | 实际结果 |
|---|---|
| 5项Carousel行为 | PASS：实际输入/表单值保持、首尾与控件焦点；根Home/End/左右与字段键盘分离；受控拒绝和接受切换/外部焦点保持；移除当前项的焦点恢复；空项及后来加入内容。 |
| 3项Chart语义/数据路径 | PASS：0、未知、N/A同源表与调用方plot投影；空/未知/N/A整图及所有单元不可用不造图；非法非有限/缺值拒绝而非猜0。 |
| 2源入口定点strict TS | PASS。 |
| 5个docs/meta/review入口定点strict TS | PASS，含源码依赖，补英文后再次通过。 |
| 实际自审 | 新源、相应文档与测试按拥有边界检查；git diff --check可跟踪拥有文件无空白错误，新未跟踪文件另按实际内容检查。 |

仅上述8项相关行为一次运行，不扩大既有83组件矩阵。静态低风险外观没有样式镜像断言。

## 预设与验证边界

12em图高、2px线宽、8px标记为组件集中默认，根style的局部--qy-chart-plot-height/--qy-chart-stroke-width/--qy-chart-marker-size是覆写入口并实际消费；五种marker归一8×8坐标为几何绘制，不是第二个外部尺寸。具体线型同处集中系列表，是当前可区分预设；颜色只读已有chart1..5。

NOT_RUN（本代理）：浏览器、build、生成器、pack、全suite、Git、真实屏幕阅读器。UNVERIFIED至root实际证据：默认Recharts图形尺寸/标记定位、局部role覆写、0域/gap图形、长中英容量、浅深图形≥3:1与文字≥4.5:1、真实键盘与焦点。此记录不把定点TS或数字投影当作视觉/几何通过。

### 主代理最后浏览器观测与轴修复

Carousel 往返草稿保持 PASS；Chart marker 8→16、plot 12em→16em 实际局部覆写生效。默认 Y 轴 0/负值曾被图形左界裁字，已按 decision 转发原语 tick class 以恢复 width=auto 的实际文本测量。此修复待主代理复核负值/0/多位数/长 category；不重复已通过的 8 行为用例。

主代理随后实际确认 AxisTick class 转发修复 PASS：-1,234 与 123,456,789 刻度在 figure x305..817 内（最左 309.66）；浅深 39 个实际文字组合未见对比度 FAIL，5 图形最小对比浅色 3.75、深色 6.01。长类别/零/200% 另给仅验证临时 `apps/docs/.__chart-probe.html/.tsx`，由主代理唯一浏览器测并清理。

长文本临时 probe 主代理浅深确认：真实零线为 0，长中英 category 完整保留于可见同源表；Recharts 按碰撞自适应只展示末端长 x tick。CSS zoom=2 容量探针 client/scroll=1280/1280、刻度与图形未出 figure；这只是 CSS 布局放大，不称浏览器原生缩放、辅助技术或完整 200% 验收。临时 probe 不再由本代理修改，主代理结束后清理。
