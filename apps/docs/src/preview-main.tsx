/**
 * 预览入口：一页真实界面，把打磨过的组件放在它们实际会出现的版面里。
 *
 * 与 review.html 的分工：审查页是「逐个组件 × 状态 × 密度」的矩阵，用来发现自己
 * 不知道的问题；预览页是**一个说得通的界面**，用来判断这些组件放在一起是否成立
 * ——间距关系、层次、对齐、密度切换后的整体密度感，只有在真实版面里才看得出来。
 *
 * 页面自带明暗与密度切换：两者是主题三轴里可以实时切换的两轴（品牌由项目静态配置），
 * 切换只改属性，不改任何组件代码。
 */
import { ThemeProvider, useTheme } from "@qingye_lab/ui/components/theme-provider";
import { UILocaleProvider, zhCN } from "@qingye_lab/ui/locale";
import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import PreviewApp from "./pages/preview/PreviewApp";
import InputsPage from "./pages/preview/InputsPage";
import DataPage from "./pages/preview/DataPage";
import NavigationPage from "./pages/preview/NavigationPage";
import OverlayPage from "./pages/preview/OverlayPage";
import CompositionPage from "./pages/preview/CompositionPage";
import { isPreviewPage, PreviewShell, type PreviewPageId } from "./pages/preview/shell";
import { ToastProvider } from "@qingye_lab/ui/components/toast";
import "./index.css";

type Density = "default" | "compact";

function Shell() {
  const { resolvedTheme, setTheme } = useTheme();
  const [density, setDensity] = useState<Density>("default");
  // 页面存在 URL 里，刷新与分享都指到同一页。
  const [page, setPage] = useState<PreviewPageId>(() => {
    const fromHash = location.hash.replace("#", "");
    return isPreviewPage(fromHash) ? fromHash : "components";
  });
  const change = (next: PreviewPageId) => { setPage(next); location.hash = next; };
  // data-density 是主题三轴里的密度轴，由容器写入（见 CLAUDE.md「主题三轴」）。
  return (
    <div data-density={density === "compact" ? "compact" : undefined}>
      <PreviewShell page={page} onPageChange={change} density={density} onDensityChange={setDensity} theme={resolvedTheme} onThemeChange={next => setTheme(next)}>
        {page === "components" && <PreviewApp />}
        {page === "inputs" && <InputsPage />}
        {page === "data" && <DataPage />}
        {page === "navigation" && <NavigationPage />}
        {page === "overlay" && <OverlayPage />}
        {page === "composition" && <CompositionPage />}
      </PreviewShell>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <UILocaleProvider locale={zhCN}>
        {/* 通知需要一个挂载点；放在最外层，任何页面都能发出通知。 */}
        <ToastProvider><Shell /></ToastProvider>
      </UILocaleProvider>
    </ThemeProvider>
  </StrictMode>,
);
