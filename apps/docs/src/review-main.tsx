import { ThemeProvider } from "@qingye/ui/components/theme-provider";
import { UILocaleProvider, zhCN } from "@qingye/ui/locale";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import DesignReview from "./pages/review/DesignReview";
import FocusFallback from "./pages/review/FocusFallback";

// 每个组件的审查段落是 sections/ 下的一个文件，按文件名排序追加在主审查页之后。
// 并行开发时各自新增文件，不必改同一份页面。
const sections = Object.entries(import.meta.glob<{ default: () => React.ReactElement }>("./pages/review/sections/*.tsx", { eager: true }))
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, mod]) => ({ path, Section: mod.default }));
import "./index.css";

// 独立的审查入口：只挂载主题与本地化，不经过站点外壳。
// 站点外壳依赖已归档的组件，重写期间不可用；审查页只依赖仓库内保留的组件。
// 用法：/review.html（四个试点）或 /review.html#focus-fallback（强制颜色模式下的焦点）。
function Page() {
  if (location.hash === "#focus-fallback") return <FocusFallback />;
  return (
    <>
      <DesignReview />
      <div className="mx-auto max-w-4xl px-8 pb-16">
        {sections.map(({ path, Section }) => <Section key={path} />)}
      </div>
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <UILocaleProvider locale={zhCN}>
        <Page />
      </UILocaleProvider>
    </ThemeProvider>
  </StrictMode>,
);
