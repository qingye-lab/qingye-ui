# 组件规范

这份规范定义 `@yanqing/ui` 每个组件必须满足的细节。新增或修改组件时逐条核对；评审以此为准。

基调：**精致、耐看、不浮夸**。克制的层次靠半透明边框、细微内高光和准确的间距建立，不靠大面积色块、重阴影或装饰性动画。

---

## 1. 结构与 API

- **一个组件一个文件**，位于 `packages/ui/src/components/<name>.tsx`，文件名用 kebab-case。
- 每个可样式化的部分都带 `data-slot="<component>-<part>"`，供样式钩子、动效策略和测试定位。
- 外部 `className` 永远最后合并：`cn(内部类, className)`。
- 需要改变渲染元素时用 Base UI 的 `render` 属性（`useRender` + `mergeProps`），不要另造 `as` 属性（`layout.tsx` 中已有的除外）。
- 基于 Base UI 的组件同时导出原语命名空间，例如 `export { MenuPrimitive }`。
- 状态型组件同时支持受控与非受控：`value` / `defaultValue` / `onValueChange`，`open` / `defaultOpen` / `onOpenChange`。
- 组件**不含业务逻辑**：不发请求、不读路由、不依赖会话。
- 透传所有原生属性；不要吞掉 `id`、`aria-*`、`data-*`、事件处理器。
- 已有 shadcn 命名的组件保留别名导出（`DropdownMenu*`、`TooltipContent`、`SheetContent`、`TabsTrigger`……），方便从 shadcn 迁移。

## 2. 尺寸

控件在移动端比桌面端高 4px（避免 iOS 输入缩放并方便点按），`sm:` 断点回到桌面尺寸：

| 尺寸 | 移动端 | ≥640px | 用途 |
|---|---|---|---|
| `xs` | 28px | 24px | 行内、表格内操作 |
| `sm` | 32px | 28px | 工具栏、密集表单 |
| `default` | 36px | 32px | 标准控件 |
| `lg` | 40px | 36px | 突出表单、登录 |
| `xl` | 44px | 40px | 落地页主操作 |

- 字号同理：移动端 `text-base`，`sm:text-sm`。
- 图标：控件内 `size-4.5 sm:size-4`，`opacity-80`；小尺寸控件 `size-4 sm:size-3.5`。
- 水平内边距写成 `px-[calc(--spacing(3)-1px)]`，扣掉 1px 边框，让文字与相邻无边框元素对齐。
- **触屏**：小于 44px 的独立控件加 `touch-target`（只扩大点击区，不改变外观）；列表行加 `pointer-coarse:min-h-11`；输入框在粗指针下最小高度 44px。

## 3. 表面与边框

- 中性色**全部半透明**（见 `tokens/semantic.css`）：容器边框 `border`，控件边框 `border-input`。不要写死灰色。
- 控件与卡片的内高光：
  - 浅色：`before:shadow-[0_1px_--theme(--color-black/4%)]`（底部一线阴影）
  - 深色：`dark:before:shadow-[0_-1px_--theme(--color-white/6%)]`（顶部一线高光）
  - 伪元素：`before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-*)-1px)]`
- 浅色下有边框的表面加 `not-dark:bg-clip-padding`，深色下背景延伸到半透明边框下方。
- 深色输入类控件底色 `dark:bg-input/32`，悬停 `dark:hover:bg-input/64`。
- **实心按钮不带外投影**：层次由填充色和内高光建立。外投影会让按钮像塑料凸起，超出其他体系（Linear / Vercel / Radix 的实心按钮均无投影）。
- 其余阴影克制：控件 `shadow-xs/5`，浮层 `shadow-lg/5`，弹窗用 `shadow-overlay` token。

## 4. 圆角

| 元素 | 值 | 用途 |
|---|---|---|
| `rounded-xs` | 4px | 徽章、复选框 |
| `rounded-sm` | 6px | 菜单项、标签、行内控件 |
| `rounded-md` | 7.5px | 小号控件 |
| `rounded-lg` | **8px** | 按钮、输入框、浮层——控件默认档 |
| `rounded-xl` | 10px | 提示条、内嵌面板 |
| `rounded-2xl` | 12px | 卡片、弹窗 |

控件默认 8px、卡片 12px，比模板常见的 10px / 16px 更紧。嵌套圆角：内层 = 外层 − 0.5px（或减内边距），保持同心；内高光伪元素比宿主小 1px。

## 5. 状态

每个交互组件必须覆盖以下状态，且视觉区分明确：

| 状态 | 写法 |
|---|---|
| 悬停 | 填充 `hover:bg-accent` 或叠加 `/90`；不改变尺寸 |
| 按下 | `data-pressed` / `:active`，阴影收起；`qy-pressable` 提供按压反馈 |
| 键盘焦点 | 按钮类：`focus-visible:ring-2 ring-ring ring-offset-1 ring-offset-background`；输入类：`focus-visible:border-ring ring-[3px] ring-ring/24` |
| 禁用 | `opacity-64` + `pointer-events-none`（或 `cursor-not-allowed`） |
| 无效 | `aria-invalid:border-destructive/36`；聚焦时 `border-destructive/64 ring-destructive/16`；深色 `ring-destructive/24` |
| 加载 | `aria-busy`，内容透明保留宽度，居中 Spinner |
| 选中/展开 | `data-checked` / `data-selected` / `data-open` / `data-panel-open` |

只在鼠标聚焦时出现焦点环的写法（`focus:`）禁止使用，统一 `focus-visible:`。

## 6. 动效

- 时长只用 token：按压 `--qy-duration-press`(100ms)，反馈 `--qy-duration-fast`(140ms)，展开/滑动 `--qy-duration-base`(220ms)，抽屉 450ms（`--ease-drawer`）。
- 缓动默认 `--qy-ease-out`；**不使用回弹**，Toast 成功脉冲是唯一例外。
- 浮层从触发点展开：`origin-(--transform-origin)`，起止态 `scale-98` + `opacity-0`。
- **退出比进入快**；动画随时可被打断，不阻塞输入。
- 键盘操作即时切换，减少动态效果时只保留透明度与颜色变化——这两条由 `motion.css` 统一处理，组件不要自行实现。
- 只动画 `opacity`、`scale`、`translate`、颜色与必要的 `height`；不动画 `width`/`top`/`left` 造成布局抖动（指示条除外）。

## 7. 排版

参照对象是 Linear / Vercel / Radix 三家实测出的排版系统，不是浏览器默认值。

- **字距随字号递减，不是全局常量**。字号越大，负字距越强：

  | 文字档位 | 字号 | 字距 |
  |---|---|---|
  | `display-lg` | 40px | −0.032em |
  | `display` | 32px | −0.032em |
  | `title` | 18px | −0.022em |
  | `heading` | 13px | −0.01em |
  | `body` / `label` | 14 / 13px | −0.006em |
  | `caption` | 12px | 0 |

  一律用 `text-display` / `text-title` 这类语义类，不要手写 `text-[18px]` 或 `tracking-*`；这些值由 `tokens/components.css` 的 `--qy-text-*-tracking` 驱动。

- 字重只用 400 / 500 / 600。标题 600，标签与按钮 500。不使用 700（大标题靠字号和字距建立层级，不靠加粗）。
- 数字列、计数、时间、金额使用 `numeric`（等宽数字）。
- **中文不套用负字距**：中日韩文本的 `letter-spacing` 保持 0，负字距只作用于拉丁文（`typography.tsx` 已用 `:lang()` 处理）。
- 长文本：单行 `truncate`；多行说明 `text-balance` / `text-pretty`。

## 8. 无障碍

- 交互遵循 WAI-ARIA APG；Base UI 已覆盖的行为不要重复实现或破坏。
- 仅图标的按钮必须有 `aria-label`。
- 装饰性图标 `aria-hidden="true"`。
- 颜色不能是唯一信息：状态同时有文字或图标。
- 正文对比度 ≥ 4.5:1，辅助文字与图形边界 ≥ 3:1，浅色与深色都要满足。

## 9. 国际化与方向

- 组件内置文案全部来自 `useUILocale()`；对应参数（如 `aria-label`、`clearLabel`）优先于默认值。新增文案时同时补 `zhCN` 与 `locales/en-US.ts`。
- 只用逻辑方向属性：`ms/me/ps/pe/start/end/text-start`，不用 `ml/mr/left/right`（定位箭头等确需物理方向的除外）。

## 10. 深色模式

- 每个有表面、边框或填充的组件都要在 `.dark` 下目检。
- 上游 coss 组件的 `dark:` / `not-dark:` 变体必须保留；本地新增组件按第 3 节补齐。

## 11. 文档与验收

每个组件在文档站有一页，至少包含：

1. 一句话说明与使用场景
2. 默认示例 + 覆盖每个变体、尺寸、状态的示例
3. 导入方式
4. API 表（组件部件 + 关键属性）
5. 无障碍说明（键盘交互）

验收：类型检查通过；浅色 / 深色、桌面 / 390px 宽各截图目检；键盘可完整操作。
