import type { ComponentMeta } from "@/lib/types";
export default {
  title: "宽高比 AspectRatio", titleEn: "Aspect ratio",
  description: "给承载盒设置宽高关系，保留完整内容。", descriptionEn: "Set a preferred width-to-height relation without cropping content.",
  category: "布局", layer: "foundation", source: "local", exports: ["AspectRatio"],
  api: [{ name: "AspectRatio", description: "无交互的几何关系。", descriptionEn: "A geometric relationship without interaction.", props: [
    { name: "ratio", type: "number", default: "1", description: "有限正的宽/高比；1 为默认选择，0/负数/非有限值抛 RangeError。", descriptionEn: "A finite positive width/height ratio. The default 1 is a choice; zero, negative, or nonfinite values throw RangeError." },
    { name: "children / style / className / render / ref", type: "useRender.ComponentProps<'div'>", description: "内容、消费布局和真实承载盒；style 可显式改 CSS 关系。默认不设裁剪或 object-fit。", descriptionEn: "Content, consumer layout, and the actual containing box. style may explicitly change the CSS relationship. No default clipping or object-fit." },
  ] }],
  notes: ["CSS aspect-ratio 是首选比例；内容的最小需求可能让盒高超过比例。", "需要图片裁剪时由图片用途决定 object-fit，组件不默认裁剪。"], notesEn: ["CSS aspect-ratio is a preferred ratio; minimum content needs may make the box taller.","The image's purpose determines object-fit when cropping is needed; the component does not crop by default."],
  design: { methods: ["相成相制", "随境取度"], whenToUse: ["由宽度确定首选高度的承载关系"], avoid: ["把比例当裁剪命令或文字固定高"], composition: ["比例盒 + 完整内容"], stateOwner: { library: ["比例约束"], application: ["比例选择、宽度与内容"] }, customization: ["ratio / style / className"] }, designEn: {"whenToUse":["A containing box needs a preferred height determined by its width."],"avoid":["Treating a ratio as a cropping command or fixed text height."],"composition":["Ratio box with complete content."],"stateOwner":{"library":["Ratio constraint."],"application":["Ratio choice, width, and content."]},"customization":["ratio / style / className"]},
} satisfies ComponentMeta;
