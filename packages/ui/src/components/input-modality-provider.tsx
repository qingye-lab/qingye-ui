"use client";

import { useEffect, type ReactNode } from "react";

/**
 * 只记录最近一次输入来自键盘还是指针，写在 html[data-ui-input]；它不提供、也不改变任何动效，
 * 动效如何随输入方式变化由 motion.css 读这个属性决定。
 * 应用根部挂一个：属性在文档根上，传送到 body 的浮层也一并覆盖。
 */
export function InputModalityProvider({ children }: { children: ReactNode }) {
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

/** @deprecated 旧名：它从来只记录输入方式、不提供动效。请改用 `InputModalityProvider`；下一个主版本移除。 */
export const MotionProvider = InputModalityProvider;
