"use client";

import { IconChevronLeft, IconChevronRight, IconZoomIn, IconZoomOut, IconZoomReset } from "@tabler/icons-react";
import * as React from "react";
import { useUILocale } from "../locale";
import { isList, isName, received } from "../require-name";
import { cn } from "../utils";
import { Button } from "./button";
import { Dialog, DialogClose, DialogFooter, DialogPopup, DialogTitle } from "./dialog";
import { Text } from "./typography";

export type ImagePreviewImage = {
  src: string;
  /** 必填：缩略图按钮的名称、大图的名称、加载失败时唯一能读到的文字，都是它。 */
  alt: string;
  /** 缩略图用的小图；省略时缩略图也读 src。 */
  thumbnailSrc?: string;
};
export type ImagePreviewProps = Omit<React.ComponentProps<"div">, "children"> & {
  /** 同一组图片：缩略图并排，大图里可以在它们之间前后切换。单张图传一项。 */
  images: readonly ImagePreviewImage[];
  thumbnailClassName?: string;
};

/* 放大的级别：1 是「适应窗口」，之后每级多 1 倍，到 4 倍。预设（没有来源可推导）：整数倍好读，
 * 4 倍足以看清细节，更大的放大是专门图片查看器的事。放大按舞台宽度的倍数计，不是图片原始像素。 */
const zoomLevels = [1, 2, 3, 4] as const;

/**
 * 图片预览：缩略图按钮打开阻断式对话框看大图（复用 Dialog，焦点困住、Esc 关闭、背景阻断都来自它）。
 * - 缩略图是按钮，名称是 alt；对话框标题（仅读屏）是当前图的 alt，位置「第 2 张，共 5 张」随切换播报。
 * - 同组多张：上一张 / 下一张按钮与左右方向键；从右向左的排版里方向键随之对调。到头即止，不循环（按钮保持可聚焦并标为禁用）。
 * - 放大：按钮与键盘（+ / - / 0）；放大后舞台可滚动，且获得焦点以便用键盘滚动，此时方向键归滚动、不切图。
 * - 关闭后焦点回到打开它的那张缩略图，即使在对话框里已经切到别的图。
 * - 加载失败时舞台里显示可读的文字（失败说明加上 alt），不留一个破图图标。
 * - 尺寸：缩略图边长 4 材（80px，预设），圆角取面板圆角（图片是独立对象，与 Card 同形）；舞台宽度最大 48 材（960px，预设），
 *   高度取视口的 70%，让图片、页脚与对话框内边距在常见的矮屏上都放得下。
 */
export function ImagePreview({ images, thumbnailClassName, className, ...props }: ImagePreviewProps) {
  const { messages } = useUILocale();
  if (!isList(images) || images.length === 0) throw new Error(`ImagePreview images must be a nonempty array; received ${isList(images) ? "an empty array" : received(images)}.`);
  images.forEach((image, index) => {
    if (typeof image !== "object" || image === null || !isName(image.src)) throw new Error(`ImagePreview images[${index}] requires a nonempty src; received ${received((image as { src?: unknown } | null)?.src)}.`);
    if (!isName(image.alt)) throw new Error(`ImagePreview images[${index}] requires a nonempty alt; received ${received(image.alt)}.`);
  });
  const [open, setOpen] = React.useState(false);
  // 关闭动画期间对话框还在，所以「当前第几张」与「是否打开」分开记，关闭时不清空。
  const [current, setCurrent] = React.useState(0);
  const [zoom, setZoom] = React.useState<(typeof zoomLevels)[number]>(1);
  const [failed, setFailed] = React.useState<ReadonlySet<string>>(() => new Set());
  const thumbs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const origin = React.useRef(0);
  const stage = React.useRef<HTMLDivElement | null>(null);

  const total = images.length;
  const index = Math.min(current, total - 1);
  const image = images[index]!;
  const go = (next: number) => { if (next >= 0 && next < total) { setCurrent(next); setZoom(1); } };
  const zoomBy = (step: 1 | -1) => setZoom(level => zoomLevels[Math.min(zoomLevels.length - 1, Math.max(0, zoomLevels.indexOf(level) + step))]!);
  const markFailed = (src: string) => setFailed(previous => previous.has(src) ? previous : new Set(previous).add(src));

  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      if (zoom > 1 && event.target === stage.current) return;
      const rtl = getComputedStyle(event.currentTarget).direction === "rtl";
      go(index + ((event.key === "ArrowRight") !== rtl ? 1 : -1));
    } else if (event.key === "+" || event.key === "=") zoomBy(1);
    else if (event.key === "-") zoomBy(-1);
    else if (event.key === "0") setZoom(1);
    else return;
    event.preventDefault();
  };

  return (
    <div data-slot="image-preview" {...props} className={cn("flex min-w-0 flex-wrap items-center gap-(--qy-field-gap)", className)}>
      {images.map((item, position) => (
        <button key={`${position}:${item.src}`} type="button" aria-haspopup="dialog" data-slot="image-preview-thumbnail"
          ref={element => { thumbs.current[position] = element; }}
          onClick={() => { origin.current = position; setCurrent(position); setZoom(1); setOpen(true); }}
          className={cn("relative inline-flex size-[calc(4*var(--qy-cai))] shrink-0 cursor-zoom-in items-center justify-center overflow-hidden rounded-panel border border-border bg-neutral-soft p-0 text-muted-foreground outline-none focus-visible:ring-[length:var(--qy-focus-ring-width)] focus-visible:ring-(--qy-focus-ring-color)", thumbnailClassName)}>
          {failed.has(item.thumbnailSrc ?? item.src)
            ? <span className="min-w-0 p-(--qy-space-1) text-support wrap-anywhere">{item.alt}</span>
            : <img src={item.thumbnailSrc ?? item.src} alt={item.alt} onError={() => markFailed(item.thumbnailSrc ?? item.src)} className="size-full object-cover" />}
        </button>
      ))}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogPopup onKeyDown={onKeyDown} data-slot="image-preview-dialog" finalFocus={() => thumbs.current[origin.current] ?? true}>
          <DialogTitle className="sr-only">{image.alt}</DialogTitle>
          <div ref={stage} tabIndex={zoom > 1 ? 0 : undefined} data-slot="image-preview-stage" data-zoom={zoom}
            className="flex h-[70dvh] w-[min(calc(48*var(--qy-cai)),calc(100vw-4*var(--qy-panel-padding)))] min-w-0 overflow-auto rounded-item outline-none focus-visible:ring-[length:var(--qy-focus-ring-width)] focus-visible:ring-(--qy-focus-ring-color)">
            {failed.has(image.src)
              ? <div role="img" aria-label={`${messages.imagePreviewFailed}: ${image.alt}`} className="m-auto grid min-w-0 gap-(--qy-space-1) p-(--qy-panel-padding)">
                <Text className="text-muted-foreground">{messages.imagePreviewFailed}</Text>
                <Text step="support" className="text-muted-foreground">{image.alt}</Text>
              </div>
              : <img key={image.src} src={image.src} alt={image.alt} onError={() => markFailed(image.src)}
                style={zoom > 1 ? { width: `${zoom * 100}%` } : undefined}
                className={cn("m-auto", zoom > 1 ? "h-auto max-w-none shrink-0" : "max-h-full max-w-full object-contain")} />}
          </div>
          <DialogFooter className="justify-between">
            <div className="flex items-center gap-(--qy-action-gap)">
              {total > 1 && <>
                <Button variant="quiet" shape="icon" aria-label={messages.imagePreviewPrevious} aria-disabled={index === 0} onClick={() => go(index - 1)}><IconChevronLeft aria-hidden="true" className="rtl:-scale-x-100" /></Button>
                <span aria-live="polite" className="numeric text-support text-muted-foreground">
                  <span aria-hidden="true">{index + 1} / {total}</span>
                  <span className="sr-only">{messages.imagePreviewPosition(index + 1, total)}</span>
                </span>
                <Button variant="quiet" shape="icon" aria-label={messages.imagePreviewNext} aria-disabled={index === total - 1} onClick={() => go(index + 1)}><IconChevronRight aria-hidden="true" className="rtl:-scale-x-100" /></Button>
              </>}
            </div>
            <div className="flex items-center gap-(--qy-action-gap)">
              <Button variant="quiet" shape="icon" aria-label={messages.imagePreviewZoomOut} aria-disabled={zoom === zoomLevels[0]} onClick={() => zoomBy(-1)}><IconZoomOut aria-hidden="true" /></Button>
              <Button variant="quiet" shape="icon" aria-label={messages.imagePreviewZoomFit} aria-disabled={zoom === 1} onClick={() => setZoom(1)}><IconZoomReset aria-hidden="true" /></Button>
              <Button variant="quiet" shape="icon" aria-label={messages.imagePreviewZoomIn} aria-disabled={zoom === zoomLevels[zoomLevels.length - 1]} onClick={() => zoomBy(1)}><IconZoomIn aria-hidden="true" /></Button>
              <DialogClose />
            </div>
          </DialogFooter>
        </DialogPopup>
      </Dialog>
    </div>
  );
}
