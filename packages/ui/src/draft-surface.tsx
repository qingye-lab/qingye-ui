"use client";

import { useRender } from "@base-ui/react/use-render";
import type { Input as InputPrimitive } from "@base-ui/react/input";
import * as React from "react";
import type { InputProps } from "./components/input";

/**
 * Field 把 name 交给它登记的输入；日期区间的两个输入与周期输入里放的是草稿 / 展示文本，不参与提交——
 * 提交的是确认值（隐藏输入，按 ISO 日期）。这里读出 Field 给的 name（`onName`），并从输入上拿掉。
 */
export function DraftSurface({ elementProps, state, render, onName }: { elementProps: React.ComponentPropsWithRef<"input">; state: InputPrimitive.State; render: InputProps["render"]; onName: (name: string | undefined) => void }) {
  React.useLayoutEffect(() => onName(elementProps.name), [elementProps.name, onName]);
  return useRender({ defaultTagName: "input", render, ref: elementProps.ref, state: { ...state }, props: { ...elementProps, name: undefined } });
}
