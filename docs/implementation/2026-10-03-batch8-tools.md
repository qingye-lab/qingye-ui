# 第八批工具执行证据

2026-10-03，基线 `a94e8b4`。既有工作区含多个代理的未提交文件，保留全部无关修改。拥有五组件源码/测试、五份 metadata/十个 demos、本批决定/执行记录、`review/sections/74-batch8-tools.tsx` 与必要 locale 新键。未改 index/catalog/生成物/全局 token、未读取归档冻结或上游视觉实现、未 Git 提交/发布。

## 实施与实际出口

- CopyButton 复用当前 useCopyToClipboard；writeText resolve 后显示成功，等待屏蔽重复激活，拒绝/不可用显示手动复制提示并可再试。保留 Button 的五档、variant/shape、ARIA、ref/render、原生/非原生入口及事件取消。更换 value 不显示旧文本的复制成功。timeout=2000ms 只是继承反馈预设，quiet 为本批附属动作选择。
- ScrollArea 采用原生滚动 div；默认 tabIndex=0，真实 scroll 事件/ref/render 透传，键盘默认动作保留。未以自绘轨道取代原生滚动条；条的常显/自动隐藏由平台设置承担，组件不承诺强制常显。
- AspectRatio 只写首选 CSS aspect-ratio，默认1是选择；无默认裁剪/object-fit。有限正比率是约束，内容的最小需求仍参与实际高度。
- LocaleSwitch 复用 NativeSelect，Provider.code 为唯一选择事实；应用接受 onLocaleChange 并更新 Provider 后才改变。拒绝/事件取消/disabled 不伪造新当前值，缺失当前选项时显示真实 code 的禁用选项。不修改文档、系统、路由或存储。
- VirtualList 只有明确等高项与有限视口，getKey 要求稳定唯一身份。总高/偏移/窗口由 items、itemSize、height 算出，实际 clientHeight/ResizeObserver 适应视口变化；overscan=2 为渲染预算预设。方向/Home/End 可跨窗口，内嵌编辑键位保留；离屏焦点项仍挂载，真实删除后焦点回视口，能继续到现存行。真实 list/listitem 与完整 aria-posinset/setsize，无选择/业务列。没有已安装 virtual-list 依赖，本实现明确不支持可变高项。

新增 locale 仅 `language`（中文“语言”、英文“Language”）；复制沿用现有消息。没有新增组件 token。VirtualList 示例行高48px与四项视口是消费示例选择，修改 rowSize 或调用参数，不伪称设计推导。其他尺寸/文字/焦点消费既有 Button、NativeSelect、focus-quiet-width/ring/action-gap；ScrollArea/AspectRatio 不套控件五档。

## 实际验证

首轮 `pnpm --filter @qingye/ui exec vitest run test/copy-button.test.tsx test/scroll-area.test.tsx test/aspect-ratio.test.tsx test/locale-switch.test.tsx test/virtual-list.test.tsx`：**PASS，5 文件、12 测试**（23:33:48）。包含真实 Promise 等待/成功与重复激活屏蔽、剪贴板拒绝/API 不可用及再试、disabled/事件取消、ref/render、原生滚动与默认键盘不被取消、比例与无裁剪、Provider 接受/拒绝/缺失选项、虚拟窗口/完整位置/跨窗口键盘/稳定身份与焦点保留、空集合与显式无效数据失败。

后续真实删除聚焦项的 alternate 合入现有焦点用例：`vitest run test/virtual-list.test.tsx -t 'focused descendant'` **PASS，1 项、3 跳过**（23:36:55），回到视口并 Home 到现存首行。LocaleSwitch 补实际 disabled 事件入口守卫：该文件定向 **PASS，2 项**（23:42:44）。CopyButton 随后只补默认 icon/text 的 action-gap，没有重复行为测试。因此首轮12项是当时源码证据，没有把最终源码的未重跑项另算全套通过。

五工具 strict / exactOptionalPropertyTypes / noUncheckedIndexedAccess 定点 tsc：**PASS**。首次发现 LocaleSwitch 原生 ChangeEvent 无 Base UI 专属取消属性、VirtualList 可选 ref 数组类型问题，按真实原生事件与可选 ref 组合修正后通过；最终五工具及后续 NumberField/TagInput 定点检查再次 **PASS**。五 metadata/十 demos/review section 继承 docs 配置、使用 `/tmp/qingye-batch8-tools-docs-tsconfig.json` 定点 tsc：**PASS**。自审实际源码、metadata 与受影响 tracked diff；git diff --check 范围内 **PASS**，保留其他代理修改。

## 交接与验证边界

本批30个文件：5源码、5测试、5metadata、10demos、2文档、1review section、2locale。review id=`batch8-tools`，标题 text-chapter / 子标题 text-heading，直接复用 demos。src/locale.tsx 与 locales/en-US.ts 所有权交回主任务；tokens/components.css 所有权此前已交回，本批未写。

索引/catalog/能力生成、build、全库测试：**NOT_RUN（主任务统一）**。工具浅深桌面/窄屏的真实滚动、复制权限与系统剪贴板、焦点可见/对比度、200%文字、粗指针、平台自动隐藏条、浏览器 ResizeObserver/重排与辅助技术：**UNVERIFIED**。没有启动浏览器或服务；jsdom 的 scrollTop、合成 Promise 和焦点只能证明对应行为路径，不能代替真实浏览器验收。前值/Slider确定收尾证据分别追加到 batch6-values/selection 报告，主任务 computed 回报已明确标来源。


## 后续公开事件与主任务浏览器回报（2026-10-04）

CopyButton 成功/失败回调改为 onCopySuccess/onCopyError，保留原生 onCopy/onError 透传，metadata 与测试同步。没有已发布消费者，不加冲突别名。测试以真实 DOM copy 与子 img 资源 error 事件确认原生出口，回调不误占；`vitest run test/copy-button.test.tsx -t 'native copy/error|success follows|reject clipboard'`：**3 PASS、2 SKIPPED（00:01:52）**。一开始向 button 直接派发 error 不能证明资源错误传播，改为实际 img 出口后通过。CopyButton 与当时四日期源码定点 strict TS **PASS**；未重复工具12项。

主任务随后回报其真实浏览器浅深工具检查：Clipboard Qingye、Provider en-US 与 Copy 名、Virtual End100/Home1、scroll+reverse draft 保留、原生 ScrollArea 键盘、三个 AspectRatio、无 pageerror/段溢出均 **PASS**。这是主任务的实际运行回报，本 agent 未启动浏览器；没有由该回报推断窄屏、200%文字、粗指针或辅助技术通过。
