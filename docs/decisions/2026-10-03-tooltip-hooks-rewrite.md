# Tooltip 与 hooks：语义、关系与重写决定

2026-10-03，E 范围。设计依据仅为根 [design.md](../../design.md)；实现约束采用 [STANDARDS.md](../../STANDARDS.md)、[基础层](2026-10-03-foundation.md)、[逐值裁决](2026-10-03-value-adjudication.md)与[浮层族](2026-10-03-family-overlay.md)。本文件先于实现写入。

## 语义与关系

Tooltip 补充已经可辨认的对象或动作，例如快捷键、复制内容的格式。可访问名称来自触发控件自己的文字或 aria-label；Tooltip 不作为唯一标签来源。唯一关键后果、禁用原因和复制失败后的恢复依据留在持续工作面，遵守 NG7。提示中没有按钮、链接、输入和焦点转移；需要操作的补充使用 Popover，需要持续说明的使用可见正文。

触发者、提示与退出共同构成非阻断关系：键盘聚焦立即出现，与指针悬停等价；Esc 收起且焦点留在触发者；Tab 可以离开，不抢回焦点。指针从触发者移动到提示，提示继续存在；没有自动消失计时器，离开相关区域才收起。Base UI 的公共原语承担关联、位置、共享 handle 和悬停路径，不参考上游包装实现。[WCAG 1.4.13](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html)要求可关闭、可悬停与持续；这是行为约束，不决定唯一延迟。

保留 TooltipProvider 及其 delay、closeDelay、timeout 签名。首次悬停采用原语的 600ms 预设，连续提示共享 400ms 窗口；关闭默认 0ms。保留延迟是避免扫过工具栏时每个提示都展开的策略选择，数值不是理念推导。聚焦不受悬停延迟影响。Root 保留完整公开类型，包括 disableHoverablePopup，但包装强制它为 false：可以配置其他属性，不能关闭可悬停底线。原生 disabled 控件不成为键盘入口，不保证它可触发提示；TooltipTrigger.disabled 仅停用提示，不停用动作。禁用原因必须另有可见说明。

同样保留 trackCursorAxis 的类型，但 both 归一为 none；本地原语的 both 分支会关闭 safePolygon 悬停通路，双轴追踪也会令提示追逐指针。单轴 x/y 与 none 仍可用。此行为差异明确公开，服从可悬停的硬约束。

useMediaQuery 只报告浏览器媒体查询匹配，不代表设备身份。服务端与 hydration 首帧均为 false，随后读取真实 matchMedia；无此 API 时继续为 false。由 useSyncExternalStore 管理订阅、快照与服务端一致性；换查询时移除旧订阅，卸载时清理。保留原始字符串、具名断点、max-断点、区间和对象输入，以及 useIsMobile 导出。

useCopyToClipboard 报告本次浏览器写入事件：调用前与等待中 isCopied=false；writeText resolve 后才为 true 并调用 onCopy；权限拒绝、不可用和同步抛错均令 isCopied=false、isCopying=false 并调用 onError。错误文字与恢复由调用方持有，不退回到未经验证的复制方式。新调用撤销旧成功复位计时器；交叠调用只让最新且仍挂载的请求更新状态与回调，卸载后不回调、不新增计时器。结果不代表远程保存或跨设备同步。

## 表达与值的定位

| 部位 | 决定 | 定位与修改入口 |
|---|---|---|
| 提示表面 / 文字 | surface-raised / foreground | 角色选择；具体颜色是既有主题预设 |
| 阴影 / 圆角 | shadow-raised / rounded-overlay | 角色选择；既有阴影参数与 12px 圆角均为预设，不证明任意背景的对比 |
| 边界 | 不加装饰线或伪元素高光 | 表面与文字识别提示，删去检验不需要第二套局部阴影或高光 |
| z 序 | 不指定数值，Portal 采用正常绘制顺序（auto） | 结构选择：当前 tokens/theme 中没有 z-index token，不新增 token，不沿用 z-50。任意祖先堆叠场景仍需消费方验收 |
| 提示内距 / 最小外高 | control-sm-padding，control-sm 与 -narrow，按行高换算垂直内距 | 借用已有短文本容纳角色的选择；尺寸、文字值均为预设，窄屏 +4px 接线保留 |
| 文字 | text-control-sm-mobile / sm:text-control-sm，允许换行 | 内容档位选择；数值为预设。可用宽度由定位原语测量，无单行截断 |
| 位置 | top / center，sideOffset=0、alignOffset=0 | 选择：沿用定位原语默认关系，不读取旧实现的偏移或样式 |
| 入退场 | data-slot 与 --transform-origin，交给 motion.css | 所有权选择；组件没有局部时长、曲线、scale 或 opacity 入退值 |
| Provider 延迟 | 首次600ms、关闭0ms、连续窗口400ms | 原语预设；应用可覆盖；键盘即时展开为行为约束 |
| 复制成功复位 | timeout 默认2000ms，仅复位成功反馈 | 选择；不以计时器推断写入成功，不清除调用方失败内容 |
| 媒体查询断点 | sm640/md768/lg1024/xl1280/2xl1536/3xl1920/4xl2560px | 本次明确选择的查询预设，非 design.md 推导；max 使用 width < 阈值避免重叠 |
| useIsMobile | max-md，即 width < 768px | 兼容导出下的查询选择，不断言物理设备类型 |

## 兼容与验收边界

只读取三个待重写文件的导出名、类型声明与编译器推断的公开函数类型；没有读取函数体、className、样式、归档组件源码或 provenance freeze。签名提取时输出了函数参数绑定模式中的默认值（TooltipPopup 位置参数及复制 timeout），它们不作为取值依据。Breakpoint 类型通过类型检查器展开，没有读取断点常量实现。

保留 Tooltip、TooltipTrigger、TooltipPopup、TooltipContent、TooltipProvider、TooltipCreateHandle、TooltipPrimitive 与两 hooks 原导出及输入/结果字段。不新增配置以承载业务状态。TooltipContent 保留消费兼容别名。Popup 的 className 支持原语状态函数，外部样式最后合并；ref、render、ARIA、事件和 portalProps 透传。Provider 直接公开原语，不再造延迟实现。

裸 TooltipTrigger 默认组合现有 quiet Button，复用其内侧 1px 焦点和尺寸/触摸命中策略；显式 render 使用调用方控件。此处不复制第二套按钮样式，尺寸与强调由 render 的真实控件拥有。

render 直接提供 disabled 原生控件/ Button 时同时停用提示，避免只剩鼠标入口；render 函数或自定义控件内部的禁用状态由调用方同时传 Trigger.disabled。Trigger.disabled 本身仍只停用提示，不改变动作语义。

当前安装的 Base UI 1.7 Tooltip 原语只呈现视觉提示，不提供 role/aria-describedby。包装补上 role=tooltip，并根据原语公开的 data-open/data-popup-open 关联当前触发者，保留调用方说明；关闭即移除关联与可访问树内容，不等视觉退出完成。共享内容直接切换当前 payload，不使用保留上一个 payload 的 Viewport：首次测试发现后者把旧、新说明同时加入当前触发者的可访问描述，违反名实相符。MutationObserver 只同步关联，不拥有展开、延迟、位置或动效，并随 ref 卸载清理。

验证覆盖聚焦、Esc、aria-describedby、停用提示与原生禁用动作、共享延迟与 handle、可悬停提示；媒体 SSR/hydration/换查询/清理；复制正常、拒绝、不可用、同步抛错、交叠与卸载。审查与 demo 仅做 ≥1100px 桌面浅深色验证，不新增窄屏适配。生成物与来源台账由主 agent 汇总处理；本批不 build、不生成、不提交。
