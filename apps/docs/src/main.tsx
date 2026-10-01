import { MotionProvider } from "@yanqing/ui/components/motion-provider";
import { ThemeProvider } from "@yanqing/ui/components/theme-provider";
import { ToastProvider } from "@yanqing/ui/components/toast";
import { TooltipProvider } from "@yanqing/ui/components/tooltip";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./app";
import "./index.css";

// Give the landing history entry its own key (React Router otherwise calls it
// "default"), so scroll restoration also works when navigating back to it.
if (!history.state?.key) history.replaceState({ ...history.state, key: Math.random().toString(36).slice(2, 10) }, "");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <MotionProvider>
        <TooltipProvider delay={400}>
          <ToastProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ToastProvider>
        </TooltipProvider>
      </MotionProvider>
    </ThemeProvider>
  </StrictMode>,
);
