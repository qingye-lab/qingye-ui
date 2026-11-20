# T4 应用顶栏

本项目用 `react-router`（v7，已安装）做路由，`<App>` 外层已有 Router。在 `src/AppTopBar.tsx` 实现并导出 `AppTopBar`，界面使用 `@qingye_lab/ui`。

## 接口（已在骨架中给出，不要改名）

```ts
export type NavItem = { label: string; to: string };
export type AppTopBarProps = {
  navItems: NavItem[];      // 导航抽屉里的链接
  syncing: boolean;         // 后台同步是否进行中（不知道进度比例）
  onOpenSearch: () => void; // 打开全局搜索
};
```

## 需求

1. **新建报表**：顶栏上醒目的主要操作“新建报表”，点击后进入 `/reports/new` 页面（应用内路由，不整页刷新）。
2. **搜索**：一个只有图标的搜索按钮，可访问名称为“搜索”。悬停或键盘聚焦时显示提示，提示内容为快捷键“⌘K”。点击它调用 `onOpenSearch`；在页面任意位置按 ⌘K 或 Ctrl+K 也调用 `onOpenSearch`。
3. **同步状态**：`syncing` 为 true 时显示一条名为“正在同步”的进度条，为 false 时不显示。
4. **导航抽屉**：名称为“打开导航”的按钮打开一个从屏幕**左侧**滑出的导航抽屉，抽屉标题为“导航”，其中按 `navItems` 列出链接。点击其中的链接时在应用内跳转，并关闭抽屉。

允许修改：`src/AppTopBar.tsx`（可在 `src/` 下新增文件）。不要修改 `package.json`、`vitest.config.ts`、`tsconfig.json` 与 `src/test/`。
