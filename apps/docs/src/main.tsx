import { MotionProvider } from "@qingye_lab/ui/components/motion-provider";
import { ThemeProvider } from "@qingye_lab/ui/components/theme-provider";
import { ToastProvider } from "@qingye_lab/ui/components/toast";
import { TooltipProvider } from "@qingye_lab/ui/components/tooltip";
import { UILocaleProvider, zhCN } from "@qingye_lab/ui/locale";
import { enUS } from "@qingye_lab/ui/locales/en-US";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./app";
import { DocsLanguageBoundary, useDocsLocale } from "./lib/docs-locale";
import "./index.css";

// Give the landing history entry its own key (React Router otherwise calls it
// "default"), so scroll restoration also works when navigating back to it.
if (!history.state?.key) history.replaceState({ ...history.state, key: Math.random().toString(36).slice(2, 10) }, "");

function LocalizedApp() {
  const locale = useDocsLocale();
  return (
    <DocsLanguageBoundary>
      <UILocaleProvider locale={locale === "en" ? enUS : zhCN}>
        <TooltipProvider delay={400}>
          <ToastProvider><App /></ToastProvider>
        </TooltipProvider>
      </UILocaleProvider>
    </DocsLanguageBoundary>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <MotionProvider>
        <BrowserRouter><LocalizedApp /></BrowserRouter>
      </MotionProvider>
    </ThemeProvider>
  </StrictMode>,
);
