"use client";

import { useEffect, type ReactNode } from "react";

// One owner at the app root; the document attribute also covers portalled UI.
export function MotionProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.getAttribute("data-ui-input");
    const setInput = (input: "keyboard" | "pointer") => {
      if (root.getAttribute("data-ui-input") !== input) root.setAttribute("data-ui-input", input);
    };
    const pointer = () => setInput("pointer");
    const keyboard = () => setInput("keyboard");
    setInput("pointer");
    document.addEventListener("pointerdown", pointer, true);
    document.addEventListener("pointermove", pointer, true);
    document.addEventListener("keydown", keyboard, true);
    return () => {
      document.removeEventListener("pointerdown", pointer, true);
      document.removeEventListener("pointermove", pointer, true);
      document.removeEventListener("keydown", keyboard, true);
      if (previous === null) root.removeAttribute("data-ui-input");
      else root.setAttribute("data-ui-input", previous);
    };
  }, []);
  return children;
}
