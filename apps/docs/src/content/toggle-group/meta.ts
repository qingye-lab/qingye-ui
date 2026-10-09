import type { ComponentMeta } from "@/lib/types";

export default {
  title: "切换组 ToggleGroup", titleEn: "ToggleGroup",
  description: "关联一组单选或多选的切换按钮：选项保持切换状态。", descriptionEn: "A shared single or multiple set of toggles whose pressed fact persists.",
  category: "表单", layer: "primitive", source: "local", exports: ["ToggleGroup", "ToggleGroupItem", "ToggleGroupPrimitive"],
  keywords: ["toolbar toggle", "button group", "切换组", "按钮组", "多选切换"],
  api: [
    { name: "ToggleGroup", description: "单选与多选都使用数组；单选允许取消成 []。", descriptionEn: "Both single/multiple modes use arrays; single permits clearing to [].", props: [
      { name: "multiple", type: "boolean", default: "false", description: "false 为 single，最多切换一项；true 为 multiple，可切换多项。", descriptionEn: "false is single with at most one pressed item; true permits multiple pressed items." },
      { name: "value / defaultValue", type: "readonly string[]", description: "两种模式都是值数组，single 不是 string。[] 表示全部松开。", descriptionEn: "Both modes hold value arrays; single is not a string. [] means all released." },
      { name: "onValueChange", type: "(values: string[], details) => void", description: "传出完整切换值数组；支持 details.cancel()。", descriptionEn: "Supplies the complete pressed-value array; supports details.cancel()." },
      { name: "orientation / loopFocus", type: '"horizontal" | "vertical" / boolean', default: '"horizontal" / true', description: "方向键焦点轴与是否在末项循环。焦点移动本身不改变值。", descriptionEn: "Arrow focus axis and end wrapping; moving focus alone never changes values." },
      { name: "disabled / size", type: "boolean / ToggleSize", description: "禁用全组；size 默认 md，供项继承，可由项显式改写。", descriptionEn: "Disable the whole group. size defaults to md and items may explicitly override it." },
      { name: "aria-label / aria-labelledby / render / ref", type: "Base UI composition", description: "共同名称与根部位，透传样式与原生事件。", descriptionEn: "Shared name/root composition; forward styles and native events." },
    ] },
    { name: "ToggleGroupItem", description: "有唯一 value 的 Toggle，继承组的尺寸与原语状态。", descriptionEn: "A uniquely valued Toggle inheriting group size and primitive states.", props: [{ name: "value", type: "string", description: "组内唯一标识，必填。", descriptionEn: "Required unique group identifier." }, { name: "disabled / shape / size / render / ref", type: "Toggle props", description: "项的限制、几何及公共组合入口。", descriptionEn: "Item restrictions, geometry, and public composition." }] },
    { name: "ToggleGroupPrimitive", description: "Base UI 切换组原语；项原语由 TogglePrimitive 导出。", descriptionEn: "Base UI pressed-group primitive; TogglePrimitive exports the item primitive." },
  ],
  keyboard: [{ keys: "Tab / Shift+Tab", description: "保留组的一个焦点停靠点。", descriptionEn: "Retain one group tab stop." }, { keys: "← / → 或 ↑ / ↓", keysEn: "ArrowLeft / ArrowRight or ArrowUp / ArrowDown", description: "沿 orientation 移动焦点，跳过禁用项；loopFocus 决定是否循环。", descriptionEn: "Move along orientation, skip disabled items, and wrap according to loopFocus." }, { keys: "Space / Enter", description: "改变当前项的切换事实。", descriptionEn: "Change the current item's pressed fact." }],
  notes: ["没有 name 或隐藏表单值；需要提交的互斥值使用 SegmentedControl。", "single 允许全部松开；不能用它冒充必选 radio。"], notesEn: ["No name or hidden form value. Use SegmentedControl for submitted mutually exclusive values.","Single allows all items to be released; it cannot impersonate required radio selection."],
  design: {
    methods: ["名实相符", "相成相制"], whenToUse: ["同一范围的二态工具按钮", "允许全部取消的单选或多选切换"], avoid: ["表单互斥值用 SegmentedControl", "面板视角用 Tabs"],
    composition: ["ToggleGroup + ToggleGroupItem；组的名称必须说明共同范围"], stateOwner: { library: ["非受控值数组、roving focus、切换"], application: ["受控数组、选项、相关内容"] },
    responsive: ["水平方向可以换行，纵向沿上下轴导航；浏览器布局未在本批验证"], customization: ["既有 action-gap、同名五档及 Toggle 表达"],
  }, designEn: {"whenToUse":["Binary tool buttons in a shared scope.","Single/multiple pressed selection permitting all items to be released."],"avoid":["Use SegmentedControl for mutually exclusive form values.","Use Tabs for panel views."],"composition":["ToggleGroup + ToggleGroupItem; its name identifies the shared scope."],"stateOwner":{"library":["Uncontrolled value arrays, roving focus, and pressed states."],"application":["Controlled arrays, options, and associated content."]},"responsive":["Horizontal layouts may wrap; vertical navigation follows up/down. Browser layout was not verified in this batch."],"customization":["Existing action-gap, five matching profiles, and Toggle presentation."]},
} satisfies ComponentMeta;
