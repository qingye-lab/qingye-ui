import type { ComponentMeta } from "@/lib/types";

export default {
  title: "分段控件 SegmentedControl", titleEn: "SegmentedControl",
  description: "从并列的少量候选中输入一个值。", descriptionEn: "Enter one value from a small set of visible segments.",
  category: "表单", layer: "primitive", source: "local", exports: ["SegmentedControl", "SegmentedControlItem", "SegmentedControlPrimitive", "SegmentedControlItemPrimitive"],
  keywords: ["segmented", "button group", "切换", "分段", "分段控制", "视图切换"],
  api: [
    { name: "SegmentedControl", description: "radio 值输入；不拥有面板或选项清单。", descriptionEn: "Radio value input without owning panels or an option inventory.", props: [
      { name: "value / defaultValue", type: "Value", description: "受控值或初始选择；不传初值保持未选择，0 与空字符串可以是真实选项。", descriptionEn: "Controlled or initial selection; omitted initial values stay unselected. Zero and empty string may be actual options." },
      { name: "onValueChange", type: "(value, details) => void", description: "选择值，可取消。点击已选项不会取消到空状态。", descriptionEn: "Cancelable selection; clicking a selected item does not clear it." },
      { name: "name / form / required / inputRef", type: "RadioGroup props", description: "原生表单入口；required 不自动推断 invalid。", descriptionEn: "Native form entry; required does not automatically infer invalid." },
      { name: "disabled / readOnly", type: "boolean", default: "false", description: "禁用退出操作；只读保持当前值和焦点。", descriptionEn: "Disabled blocks operation; read-only retains the current value and focus." },
      { name: "size", type: '"xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', description: "同档 control 与 text-control，由各项继承。", descriptionEn: "Matching control/text-control profiles inherited by items." },
      { name: "aria-label / aria-labelledby / render / ref / className / style", type: "Base UI composition", description: "组的名称、部位与状态样式入口。", descriptionEn: "Group names, parts, and state styling." },
    ] },
    { name: "SegmentedControlItem", description: "带完整名称的 radio 候选。", descriptionEn: "A radio candidate with its full name.", props: [{ name: "value", type: "Value", description: "候选的真实值，必填。", descriptionEn: "The candidate's actual required value." }, { name: "children / disabled / readOnly / size / render / nativeButton / ref", type: "Radio props", description: "默认原生 button；改变元素时说明 nativeButton，保留 ARIA 和原生事件。", descriptionEn: "Native button by default; identify nativeButton for another element while retaining ARIA and native events." }] },
    { name: "SegmentedControlPrimitive / SegmentedControlItemPrimitive", description: "Base UI RadioGroup 与 Radio 原语公共出口。", descriptionEn: "Public Base UI RadioGroup and Radio primitives." },
  ],
  keyboard: [{ keys: "Tab / Shift+Tab", description: "在组内保留一个停靠点。", descriptionEn: "Retain one tab stop within the group." }, { keys: "↑ / ↓ / ← / →", description: "移动并选择候选，跳过禁用项。", descriptionEn: "Move and select candidates, skipping disabled items." }, { keys: "Space", description: "选择当前项；Home/End 不属于 Radio 原语契约。", descriptionEn: "Select the current item; Home/End are outside the Radio primitive contract." }],
  notes: ["放在 Field 内时，整组的名称、描述与错误落在 radiogroup；每一段自己开标签作用域，id 各不相同，名称仍是段内文字，不会被 Field 的标签接管。", "方向键遵循书写方向：UILocaleProvider 的 dir 为 rtl 时，→ 移向前一段。"],
  notesEn: ["Inside a Field, the group's name, description, and error land on the radiogroup. Each segment opens its own label scope, so ids are distinct and its name stays the segment text instead of being taken over by the Field label.", "Arrow keys follow writing direction: with UILocaleProvider dir=\"rtl\", → moves to the previous segment."],
  decisions: "SegmentedControl 产生一个新值。切换内容面板用 Tabs；允许全部取消的工具切换用 ToggleGroup。选中段是淡染的面加焦墨字，不用主操作的填充，所以品牌覆写 --qy-primary 不会改变它；要调整，改 --qy-track-selected 与 --qy-track-selected-foreground。", decisionsEn: "SegmentedControl produces a value. Use Tabs for content panels and ToggleGroup for tools whose toggles may all be released. The selected segment is a light ink wash with ink text, not the primary action fill, so overriding --qy-primary does not change it. To adjust it, change --qy-track-selected and --qy-track-selected-foreground.",
  design: {
    methods: ["名实相符", "相成相制", "随境取度"], whenToUse: ["少量可并列比较的互斥值"], avoid: ["面板视角用 Tabs", "候选较长或可收起用 Select", "独立二态使用 Toggle"],
    composition: ["FieldTitle 命名组；FieldDescription/FieldError 关联输入；候选 children 是名称"], stateOwner: { library: ["非受控值、焦点、方向键"], application: ["受控值、候选、invalid、提交"] },
    responsive: ["保留全部候选并允许换行；五档窄屏尺寸不改变语义"], customization: ["选中段读 --qy-track-selected 与 --qy-track-selected-foreground（默认淡染 + 焦墨），未选段字为浓墨；与同档文字；不新增外围焦点圈"],
  }, designEn: {"whenToUse":["A few mutually exclusive values benefit from side-by-side comparison."],"avoid":["Use Tabs for panel views.","Use Select for longer or collapsible candidates.","Use Toggle for independent pressed states."],"composition":["FieldTitle names the group; FieldDescription/FieldError associate with the input; candidate children supply names."],"stateOwner":{"library":["Uncontrolled values, focus, and arrows."],"application":["Controlled values, candidates, invalid facts, and submission."]},"responsive":["Retain all candidates and permit wrapping; five narrow-screen profiles preserve semantics."],"customization":["The selected segment reads --qy-track-selected and --qy-track-selected-foreground (light ink wash and ink text by default); unselected segments use muted ink; matching text, no outer focus ring."]},
} satisfies ComponentMeta;
