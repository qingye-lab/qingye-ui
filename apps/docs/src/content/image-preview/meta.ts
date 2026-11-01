import type { ComponentMeta } from "@/lib/types";

export default {
  title: "图片预览 ImagePreview", titleEn: "ImagePreview",
  description: "缩略图打开大图，可在同组图片间切换并放大。", descriptionEn: "Thumbnails open a large view with switching within the set and zoom.",
  category: "数据展示", layer: "pattern", source: "local", exports: ["ImagePreview"],
  keywords: ["image preview", "lightbox", "gallery", "zoom", "图片预览", "大图", "放大"],
  decisions: "复用 Dialog：焦点困住、Esc 关闭、背景阻断都来自它。alt 必填，它同时是缩略图按钮、大图和加载失败时唯一能读到的文字。放大后舞台可滚动并获得焦点，此时方向键归滚动、不切图。关闭后焦点回到打开的那张缩略图，即使已切到别的图。",
  decisionsEn: "Built on Dialog, which supplies the focus trap, Esc to close and the blocking backdrop. alt is required and is the only text available for the thumbnail button, the large view and a load failure. When zoomed, the stage scrolls and takes focus, and the arrow keys then scroll instead of switching images. After closing, focus returns to the thumbnail that opened it, even after switching to another image.",
  design: { methods: ["名实相符", "应物象形"], whenToUse: ["图片是内容的一部分，且需要放大看细节或在同组中浏览。"], avoid: ["装饰性图片不需要预览；只展示一张固定大小的图用普通 img。"], composition: ["缩略图是按钮；大图在阻断式对话框里，页脚是位置、前后切换与缩放。"], stateOwner: { library: ["开合、当前图、缩放级别、键盘与焦点归还。"], application: ["图片来源、alt 文案与分组。"] }, responsive: ["舞台宽度有上限，高度取视口的 70%；窄屏下收窄到视口内。"], customization: ["thumbnailClassName 调整缩略图；其余用 className。"] },
  designEn: { whenToUse: ["Images are part of the content and details need zooming, or browsing within a set."], avoid: ["Decorative images need no preview; a single fixed-size image can be a plain img."], composition: ["Thumbnails are buttons; the large view sits in a blocking dialog whose footer carries position, previous/next and zoom."], stateOwner: { library: ["Open state, current image, zoom level, keyboard handling and focus return."], application: ["Image sources, alt text and grouping."] }, responsive: ["The stage has a maximum width and a height of 70% of the viewport, narrowing to fit on small screens."], customization: ["thumbnailClassName adjusts thumbnails; use className for the rest."] },
  api: [
    { name: "ImagePreview", description: "一排缩略图按钮，打开 Dialog 中的大图。", descriptionEn: "A row of thumbnail buttons that open the large view in a Dialog.", props: [
      { name: "images", type: "{ src, alt, thumbnailSrc? }[]", description: "同一组图片；alt 必填，thumbnailSrc 省略时缩略图也读 src。单张图传一项。", descriptionEn: "One set of images; alt is required and thumbnailSrc falls back to src. Pass one item for a single image." },
      { name: "thumbnailClassName", type: "string", description: "作用于每个缩略图按钮。", descriptionEn: "Applies to every thumbnail button." },
      { name: "className / native props", type: "React.ComponentProps<div>", description: "其余属性透传到根元素。", descriptionEn: "Remaining attributes forward to the root." },
    ] },
  ],
  notes: ["键盘：左右方向键切图（从右向左排版时对调）、+ / - 缩放、0 适应窗口；到头即止，不循环。"], notesEn: ["Keyboard: Left/Right switch images (swapped under right-to-left), +/- zoom, 0 fits; stops at the ends, no looping."],
} satisfies ComponentMeta;
