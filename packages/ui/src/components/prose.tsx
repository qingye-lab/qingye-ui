"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "../utils";

export type ProseProps = useRender.ComponentProps<"article"> & {
  /**
   * 是否自带一张纸（线、圆角、底、内缘）。文章已经放在一张纸上时（页面的主栏、Card、面板）设为 false，
   * 只留排版，不再铺第二张；与 TableContainer 的 framed 同义。
   */
  framed?: boolean;
};

/*
 * 长文的阅读面（design.md「表达九法」；基础层 §1、§3、§6、§7、§8、§19）。
 * 库不解析 Markdown：调用方用任意渲染器（react-markdown、MDX、服务端 HTML）产出原生元素，
 * Prose 给这些原生元素排版，不改变、也不读取它们的结构或内容。
 *
 * 排版规则不在这里：它们在 packages/ui/prose.css（styles.css 引入，components 层），按 data-slot="prose"
 * 找到这个根元素。范围、节奏、各元素的画法与每个取值的出处都写在那份文件的注释里；改排版改那里。
 * 这里只有根元素自己的事：元素与属性透传，以及那张纸。
 *
 * 纸（绘事后素，基础层 §6）：framed 时阅读面是一张纸——bg-surface + 清墨容器线 + rounded-panel，
 * 与 Card、Popover、浮层同一边界机制，不新造画法。纸宽 = 版心 + 两侧内缘（42 材）；内缘 2 材从纸的
 * 外缘量起，那 1px 线算在内缘里，版心恰为 38 材。窄屏内缘退回面板内缘（该 token 自带窄屏取值）。
 * 两个量是 --qy-prose-column / -inset（预设，见 tokens/components.css）。
 */

// 纸才定墨色；不带纸时文章跟随所在的面。
const PAPER =
  "w-full max-w-[calc(var(--qy-prose-column)+2*var(--qy-prose-inset))] rounded-panel border border-border bg-surface p-(--qy-panel-padding) text-foreground sm:p-[calc(var(--qy-prose-inset)-var(--qy-line-width))]";

/**
 * 长文的阅读面；库不解析 Markdown，调用方用任意渲染器产出原生元素后直接放进 Prose。
 * 排版规则见 packages/ui/prose.css。
 */
export function Prose({ framed = true, render, className, ...props }: ProseProps) {
  return useRender({
    defaultTagName: "article",
    render,
    props: mergeProps({
      "data-slot": "prose",
      "data-framed": framed,
      className: cn("min-w-0", framed && PAPER, className),
    }, props),
  });
}
