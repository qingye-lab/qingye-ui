import type { ComponentMeta } from "@/lib/types";

export default {
  title: "颜色选择 ColorPicker", titleEn: "ColorPicker",
  description: "选取用户数据里的颜色：标签颜色、主题配置取值，得到一个 #rrggbb。", descriptionEn: "Choose a colour that belongs to the user's data, such as a label colour or a theme setting, and get a #rrggbb string.",
  category: "表单", layer: "pattern", source: "local",
  exports: ["ColorSwatchPicker", "ColorPicker"],
  keywords: ["color", "colour", "颜色", "取色", "色板", "标签颜色", "hex", "swatch"],
  decisions: "它只产出用户数据，不改库的主题：色块显示的就是那份数据，别处的颜色仍来自语义 token。值只有 #rrggbb，不含透明度；把它存下来的是应用。",
  decisionsEn: "It only produces user data and never changes the library theme: a swatch shows exactly that data, and every other colour still comes from semantic tokens. The value is #rrggbb only, with no transparency; storing it is the application's job.",
  api: [
    { name: "ColorSwatchPicker", description: "从预设里选一个颜色，是一个单选组；每个色块是名称明确的单选项。", descriptionEn: "Choose one colour from presets. It is a radio group and every swatch is a named radio.", props: [
      { name: "swatches", type: "{ value: string; label: string }[]", description: "预设色。value 是 #rrggbb，label 是名称（如「靛蓝」）；缺名称、值格式不对或值重复都会抛错。", descriptionEn: "Preset colours. value is #rrggbb and label is its name; a missing name, a malformed value or a duplicate throws." },
      { name: "value / defaultValue / onValueChange", type: "string / string / (value, eventDetails) => void", description: "当前颜色。值不在 swatches 里（例如来自自由取色）时没有色块被选中；输出一律小写。", descriptionEn: "The current colour. A value outside swatches selects nothing. Output is always lowercase." },
      { name: "aria-label / aria-labelledby", type: "string", description: "组的名称；放在带 FieldLabel 的 Field 内时可省略，否则缺名称抛错。", descriptionEn: "The group name. May be omitted inside a Field with a FieldLabel; otherwise a missing name throws." },
      { name: "name / disabled / readOnly / required / form", type: "RadioGroup props", description: "与 RadioGroup 相同，未选择时不提交该字段。", descriptionEn: "Same as RadioGroup; nothing is submitted while no swatch is selected." },
    ] },
    { name: "ColorPicker", description: "自由取色：按钮显示当前颜色与 hex，点开是饱和度与明度面、色相条、hex 输入和可选的预设行。", descriptionEn: "Free choice: a button shows the current colour and its hex; it opens a saturation and brightness area, a hue slider, a hex input and an optional preset row.", props: [
      { name: "value / defaultValue / onValueChange", type: "string / string / (value: string) => void", description: "#rrggbb。传了 value 即受控；defaultValue 省略时为 #000000；格式不对抛错。onValueChange 在拖动中也每次变化都调用。", descriptionEn: "#rrggbb. Passing value makes it controlled; defaultValue defaults to #000000; a malformed value throws. onValueChange fires on every change, including during a drag." },
      { name: "onValueCommit", type: "(value: string) => void", description: "一次操作结束才调用：松开指针、键盘离键、确认 hex、选预设。保存放这里，不放 onValueChange。", descriptionEn: "Called when an interaction ends: pointer release, key release, a confirmed hex, a chosen preset. Save here rather than in onValueChange." },
      { name: "swatches", type: "{ value: string; label: string }[]", description: "预设行，复用 ColorSwatchPicker，规则相同。", descriptionEn: "A preset row using ColorSwatchPicker, with the same rules." },
      { name: "name / form / disabled", type: "string / string / boolean", description: "name 存在时随表单提交 #rrggbb；disabled 时不提交、不可打开。", descriptionEn: "With name, #rrggbb is submitted with the form. When disabled it is neither submitted nor openable." },
      { name: "aria-label / aria-labelledby", type: "string", description: "触发器的名称。放在带 FieldLabel 的 Field 内时来自标签，否则缺名称抛错。", descriptionEn: "The trigger name. Inside a Field it comes from the FieldLabel; otherwise a missing name throws." },
      { name: "className / style / 其余 button 属性", type: "ComponentProps<\"button\">", description: "交给触发按钮。", descriptionEn: "Passed to the trigger button." },
    ] },
  ],
  keyboard: [
    { keys: "← / →（面）", description: "饱和度 −1 / +1；Shift 为 10。Home / End 到饱和度 0 / 100。", descriptionEn: "Saturation −1 / +1; Shift uses 10. Home / End go to saturation 0 / 100.", keysEn: "← / → (area)" },
    { keys: "↑ / ↓（面）", description: "明度 +1 / −1；Shift 为 10。PageUp / PageDown 明度 ±10。", descriptionEn: "Brightness +1 / −1; Shift uses 10. PageUp / PageDown change brightness by 10.", keysEn: "↑ / ↓ (area)" },
    { keys: "← / → / Shift + 方向键（色相条）", description: "色相 ±1°；Shift 或 PageUp / PageDown 为 10°。", descriptionEn: "Hue ±1°; Shift or PageUp / PageDown uses 10°.", keysEn: "← / → / Shift + arrow (hue)" },
    { keys: "Enter / 失焦（hex 输入）", description: "校验并整理成 #rrggbb；不合法时文字保留并提示格式。", descriptionEn: "Validate and normalise to #rrggbb. An invalid entry stays in the field with a format message.", keysEn: "Enter / blur (hex input)" },
    { keys: "← / → / ↑ / ↓（预设）", description: "移动并选中色块，整组只占一个 Tab 停靠点。", descriptionEn: "Move to and select a swatch; the group takes one tab stop.", keysEn: "Arrows (presets)" },
  ],
  notes: [
    "选中靠勾，不靠颜色；勾色取压在该色块上对比更高的黑或白。",
    "色块外缘有一条与输入框同角色的边线，白色或近底色的色块在浅深主题里都有清楚的边界。",
    "饱和度/明度面由两个隐藏的 range 承担无障碍，各有名称，aria-valuetext 读出通道与当前 hex。",
    "不含透明度：值只有 #rrggbb。",
  ],
  notesEn: [
    "Selection is shown by a check, not by colour; the check is the black or white with more contrast against that swatch.",
    "A swatch has a rim with the same role as an input border, so white or ground-coloured swatches keep a clear edge in light and dark themes.",
    "The saturation and brightness area exposes two named hidden range inputs; aria-valuetext reads the channel and the current hex.",
    "No transparency: the value is #rrggbb only.",
  ],
  design: {
    methods: ["名实相符", "相成相制"],
    whenToUse: ["标签、分类、主题配置里需要用户指定一个颜色", "候选少且固定时用 ColorSwatchPicker，需要任意取值时用 ColorPicker"],
    avoid: ["库自身的主题色不要用它改，主题由 token 决定", "需要透明度的场景（不在范围内）", "只是展示颜色时用普通元素，不用单选组"],
    composition: ["Field + FieldLabel 命名触发器或色块组；放在 Form 里用 name 提交 #rrggbb；onValueCommit 里保存"],
    stateOwner: { library: ["取色面、色相、hex 草稿与校验提示、焦点与键盘"], application: ["受控值、预设列表、保存与结果"] },
    responsive: ["读填值控件与标记的既有尺寸角色；本批只做桌面检查"],
    customization: ["色块边长跟随填值控件高度（密度轴）；颜色数据经 CSS 变量进入样式"],
  },
  designEn: {
    whenToUse: ["A label, category or theme setting needs a user-specified colour.", "Use ColorSwatchPicker for a small fixed set and ColorPicker for any value."],
    avoid: ["Do not use it to change the library's own theme; tokens decide that.", "Cases that need transparency (out of scope).", "Use a plain element when only displaying a colour."],
    composition: ["Field + FieldLabel names the trigger or swatch group; name submits #rrggbb in a Form; save in onValueCommit."],
    stateOwner: { library: ["The area, hue, hex draft and validation message, focus and keyboard."], application: ["Controlled value, preset list, saving and its outcome."] },
    responsive: ["Reads the existing fill-control and marker size roles; this batch checked desktop only."],
    customization: ["Swatch edge follows the fill-control height (density axis); colour data enters styles through CSS variables."],
  },
} satisfies ComponentMeta;
