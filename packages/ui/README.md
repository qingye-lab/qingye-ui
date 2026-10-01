# @qingye/ui-kit

可供多个 React 项目复用的私有组件包。当前覆盖 coss 的全部 **54 个 registry 基础组件**、Date Picker 与 Segmented Control 组合模式、两个官方 Hook，以及 9 个本地通用组合组件。完整清单见 `catalog.json`。

## 安装

需要 React / React DOM 19.2。在本仓库中使用 `workspace:*`；其他项目可以安装构建后的 tarball：

```sh
# 本仓库根目录
pnpm --filter @qingye/ui-kit build
cd packages/ui-kit
pnpm pack --pack-destination ../../output/ui-kit

# 消费项目：替换为生成包的实际路径
pnpm add /absolute/path/qingye-ui-kit-0.1.0-dev.2.tgz
```

包保持 `private: true`，本次没有公开发布。

## 普通 React 项目

无需 Tailwind 编译器，导入预编译样式一次：

`ui.css` 包含组件所需样式和基础 reset；应用自定义布局使用自己的 CSS，它不提供完整 Tailwind 工具全集。

```tsx
import "@qingye/ui-kit/ui.css";
import { Button } from "@qingye/ui-kit/components/button";
import { Dialog, DialogTrigger, DialogPopup, DialogHeader, DialogTitle,
  DialogDescription } from "@qingye/ui-kit/components/dialog";
import { PasswordInput, FileUpload, DataTable } from "@qingye/ui-kit/extras";
import { ToastProvider } from "@qingye/ui-kit/components/toast";

export function Example() {
  return <ToastProvider>
    <Dialog>
      <DialogTrigger render={<Button />}>编辑</DialogTrigger>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>编辑资料</DialogTitle>
          <DialogDescription>修改你的偏好设置</DialogDescription>
        </DialogHeader>
      </DialogPopup>
    </Dialog>
  </ToastProvider>;
}
```

一个应用只需一个 ToastProvider。操作结果通过 `toastManager.add` 展示；表单字段验证与持续上下文信息可以保留在页面中。FileUpload 负责选择、拖放、类型/数量/大小校验和移除，不发网络请求；真实上传由调用项目实现。

## Tailwind 4 项目

使用包内源码扫描，保持按需样式拆分；不要同时导入预编译 `ui.css`。

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "@qingye/ui-kit/styles.css";
@custom-variant dark (&:where(.dark, .dark *));
```

需要相关控件的页面再导入 `business.css`（组合选择、数值、日历、Popover、Toast）、`catalog.css`（扩展的 coss 基础组件和本地组合组件）。共享动效从 `motion.css` 导入。

`styles.css` 是唯一 foundation tokens 和 Tailwind 语义映射来源，默认 light-only。消费项目可以在其后覆盖 `--primary`、`--primary-foreground`、`--radius`、`--font-family-sans` 等角色来定制品牌；修改颜色时应验证文字对比度。完整暗色主题尚未验收，不把上游 dark class 的存在视作暗色主题完成。

## 导出与组合

- `@qingye/ui-kit` 保留现有工作台兼容接口，并补充没有同名冲突的基础组件。
- `@qingye/ui-kit/primitives` 提供完整 coss 组合接口；它与现有根入口的 AlertDialog、Sidebar 等接口有区别。
- `@qingye/ui-kit/components/<name>` 按组件导入；包括 `segmented-control` 的共享样式 recipe。
- `@qingye/ui-kit/extras`：PasswordInput、SearchInput、FileUpload、DataTable、Steps、Timeline、Tree、Carousel、CopyButton。

## 语言与默认文案

根入口、`primitives` 和逐组件入口共用语言配置，默认简体中文。它覆盖日历月份、星期、今天/选中状态和导航辅助标签，以及分页、加载、弹框/抽屉关闭、侧栏、选择器、数值输入、Toast 与通用扩展的默认文案；这些默认值不依赖浏览器语言。用户内容、列标题、业务文案和代码片段由调用项目提供。

英文词条按需导入，在应用根部配置一次；宿主页面的 `lang` 也应与项目语言保持一致：

```tsx
import { UILocaleProvider } from "@qingye/ui-kit/locale";
import { enUS } from "@qingye/ui-kit/locales/en-US";

<UILocaleProvider locale={enUS}>
  <YourApp />
</UILocaleProvider>
```

中文应用不需要额外配置，也不加载英文词条。可以用 `messages={{ close: "关闭面板" }}` 局部覆写词条；嵌套 Provider 继承父级语言。组件自身的 `aria-label`、`closeProps`、`copyLabel`、`pageLabel` 等参数优先于默认值。切换 Provider 不重建组件，不清空输入、已选日期或展开状态。

Calendar 保留 DayPicker 的 `locale`、`labels`、`formatters` 和 `weekStartsOn`；默认语言同时影响可见文案和辅助标签。月份下拉使用相同 locale，局部 `formatters` 只覆盖传入项。DatePicker 的按钮日期格式跟随其显式日历 locale 或 Provider，可以继续用 `formatDate` 替换；表单提交仍为本地 `YYYY-MM-DD`。DateTimePicker 的日期时间值和精度保持不变。当前内置语言为简体中文和美式英文，不宣称已翻译其他语言。

DataTable 使用 TanStack Table，可排序、搜索和分页，`columns` 使用 ColumnDef。它是客户端表格组合，服务端分页、虚拟列表和树形表格不包含在此接口中。Tree 支持受控展开/选择、上下左右/Home/End/Enter/Space 键及禁用项；Carousel 支持手动按钮和原生横向滑动，无自动播放。所有组合组件无业务 API、路由或会话依赖，界面文案可通过 props 替换。

## 来源与更新

仅复用 MIT `apps/ui/registry/default`，不提取 AGPL `packages/ui`。保留完整 MIT 通知及上游/本地 SHA-256，见 `THIRD_PARTY_NOTICES.md` 与 `coss-source.json`。现有源码中的本地动效、触摸目标和兼容适配已记录，更新时审核差异后适配，不盲目覆盖。

```sh
pnpm --filter @qingye/ui-kit check:upstream
```

这个命令只读取官方 registry、报告源码变化，不改组件；网络错误视为未验证。完整仓库 Fork 可以另行用于跟踪上游。当前包不依赖 Fork、coss 官网、后端或 Origin UI。

DatePicker 复用官方 Calendar + Popover + Button 组合模式，支持受控/非受控日期、清除、禁用日期和本地 `YYYY-MM-DD` 表单值；与已有 DateTimePicker 分开导出，适用于只选日期的场景。
