import type { ComponentMeta } from "@/lib/types";

export default {
  title: "选择器 Select", titleEn: "Select",
  description: "从可收起的候选列表中取一个值。", descriptionEn: "Choose one value from a collapsible set of options.",
  category: "表单", layer: "primitive", source: "local",
  exports: ["Select", "SelectTrigger", "SelectValue", "SelectPopup", "SelectItem", "SelectGroup", "SelectGroupLabel", "SelectPrimitive"],
  api: [
    { name: "Select", description: "单值状态与表单语义。", descriptionEn: "Single-value state and form semantics.", props: [
      { name: "value / defaultValue", type: "Value | null", description: "受控值或真实初值，null 是未选择。省略初值不会选第一项。", descriptionEn: "Controlled or actual initial value; null means no selection. Omitting an initial value does not choose the first item." },
      { name: "items", type: "Record<string, ReactNode> | {value, label}[] | Group[]", description: "当前值的名称映射；显式空字符串候选也要提供可读 label。", descriptionEn: "Name mapping for current values; an explicit empty-string candidate also needs a readable label." },
      { name: "onValueChange", type: "(value, eventDetails) => void", description: "选择变化，可取消；不因高亮移动而改变值。", descriptionEn: "Cancelable selection change; moving the highlight does not change the value." },
      { name: "name / form / inputRef / autoComplete", type: "Base UI Root props", description: "保留原语隐藏输入、表单与自动填充入口。", descriptionEn: "Retain primitive hidden inputs, form ownership, and autofill." },
      { name: "disabled / readOnly / required", type: "boolean", default: "false", description: "交互限制与原生约束；invalid 由 Field 或触发器显式 ARIA 声明。", descriptionEn: "Interaction limits and native constraints; Field or explicit trigger ARIA declares invalid." },
      { name: "open / defaultOpen / onOpenChange", type: "Base UI Root props", description: "受控或非受控展开，取消返回与选择值分开。", descriptionEn: "Controlled or uncontrolled opening; canceled return is separate from value selection." },
      { name: "modal", type: "boolean", default: "false", description: "默认允许其余字段交互；可按承载任务显式改变。", descriptionEn: "Other fields remain interactive by default; change explicitly for the containing task." },
      { name: "itemToStringLabel / itemToStringValue / isItemEqualToValue", type: "Base UI Root props", description: "对象候选的名称、序列化与相等关系。", descriptionEn: "Names, serialization, and equality for object candidates." },
    ] },
    { name: "SelectTrigger", description: "有边框的选择入口，与 Input 同档。", descriptionEn: "A bordered selection entry matching Input's profile.", props: [
      { name: "children", type: "ReactNode", description: "省略时提供 SelectValue；内含展开图标。", descriptionEn: "Defaults to SelectValue with a disclosure icon." },
      { name: "render / ref / className / style / ARIA", type: "Base UI composition", description: "保留真实触发器的事件、名称和样式入口。", descriptionEn: "Retain actual trigger events, names, and styling entries." },
    ] },
    { name: "SelectValue", description: "真实当前值名称与未选择占位。", descriptionEn: "The actual current value name and no-selection placeholder.", props: [
      { name: "placeholder", type: "ReactNode", default: "locale.selectPlaceholder", description: "仅未选择显示；不能替代 FieldLabel。", descriptionEn: "Shown only without selection; cannot replace FieldLabel." },
      { name: "children", type: "ReactNode | (value) => ReactNode", description: "显式值表达优先。", descriptionEn: "Explicit value presentation takes precedence." },
    ] },
    { name: "SelectPopup", description: "Portal、定位、面板与可滚动 List 的共同组合。", descriptionEn: "Shared composition of Portal, positioning, panel, and scrollable List.", props: [
      { name: "side / align / sideOffset / alignOffset", type: "Base UI positioning props", default: '"bottom" / "start" / 0', description: "默认贴锚点，不覆盖触发器；由原语处理空间碰撞。", descriptionEn: "Anchored by default without covering the trigger; the primitive handles space collisions." },
      { name: "alignItemWithTrigger", type: "boolean", default: "false", description: "显式选择是否以选中项对齐并覆盖触发器。", descriptionEn: "Explicitly choose selected-item alignment that covers the trigger." },
      { name: "container", type: "HTMLElement | ShadowRoot | RefObject | null", description: "Portal 容器；局部主题、语言或密度需由调用方提供正确继承环境。", descriptionEn: "Portal container; callers supply an appropriate inheritance environment for local themes, language, or density." },
      { name: "positionerProps", type: "SelectPrimitive.Positioner.Props", description: "自身公开定位层的 ref/render/事件/样式透传；调用方 style 最后合并。", descriptionEn: "Forward its own public positioning refs/render/events/styles; caller style merges last." },
      { name: "finalFocus / render / ref / className / style", type: "Base UI Popup props", description: "默认取消回到触发器；入退场由 motion.css 拥有。", descriptionEn: "Cancellation returns to the trigger by default; motion.css owns entry/exit." },
    ] },
    { name: "SelectItem", description: "值候选；高亮表位置，勾标表选中。", descriptionEn: "Value candidate; highlight marks position and a check marks selection.", props: [
      { name: "value / label / disabled", type: "any / string / boolean", description: "值、类型搜索名称、禁用事实。禁用项可高亮供辨认，但不能选取。", descriptionEn: "Value, typeahead name, and disabled facts. Disabled items can be highlighted for identification without being selected." },
      { name: "children / render / ref / className / style", type: "Base UI Item props", description: "名称内容自动进入 ItemText，选中勾标单独呈现。", descriptionEn: "Name content enters ItemText automatically; the selection check is separate." },
    ] },
    { name: "SelectGroup / SelectGroupLabel", description: "语义分组与组名称。", descriptionEn: "Semantic grouping and group names." },
    { name: "SelectPrimitive", description: "完整 Base UI Select 原语出口；公共 Select 接口始终为单值。", descriptionEn: "The complete public Base UI Select primitive; public Select remains single-value." },
  ],
  keyboard: [
    { keys: "Tab", description: "进入触发器。", descriptionEn: "Reach the trigger." },
    { keys: "Enter / Space / ↑ / ↓", description: "打开候选；展开后方向键移动高亮，Enter/Space 选择。", descriptionEn: "Open candidates; arrows move the highlight while open and Enter/Space select." },
    { keys: "Home / End", description: "展开时移动到首/尾候选。", descriptionEn: "Reach the first/last candidate while open." },
    { keys: "文字键", keysEn: "Typing", description: "类型搜索；展开时高亮匹配项，关闭时原语可直接选择匹配值。", descriptionEn: "Typeahead highlights matches while open; the closed primitive may select a matching value directly." },
    { keys: "Esc", description: "关闭并回到触发器，保留原值。", descriptionEn: "Close and return to the trigger, retaining the original value." },
  ],
  notes: ["FieldLabel 命名触发器，FieldError 关联错误；SelectGroupLabel 命名候选分组。", "null 是未选择，空字符串和 0 可作为候选；原生表单可能把 null 与空字符串都序列化为空。", "只读保留当前值，禁用项不能选取。", "自身 Positioner 消费共享 popup 层级，父工作面内候选高于该工作面；positionerProps 保留调用方 style/ref/render。"], notesEn: ["FieldLabel names the trigger, FieldError associates errors, and SelectGroupLabel names candidate groups.","null is no selection; empty string and zero can be candidates. Native forms may serialize null and empty string identically as empty.","Read-only retains the current value; disabled candidates cannot be selected.","Its Positioner consumes shared popup layers; candidates inside a parent workspace sit above it. positionerProps retain caller styles/refs/render."],
  decisions: "高亮表示当前位置，选取才改变值。未选择不会自动变为第一项；需要并置比较时用 RadioGroup。", decisionsEn: "Highlight marks position; selection changes the value. No selection does not choose the first item automatically. Use RadioGroup for side-by-side comparison.",
  design: {
    methods: ["名实相符", "展开有据", "进退相承", "相成相制"],
    whenToUse: ["已知单值候选，平时只需辨认当前选择"],
    avoid: ["需要并置比较的少量候选用 RadioGroup", "大量候选需过滤时用 Combobox", "命令用 Menu，视角用 Tabs", "关键原生选择行为用 NativeSelect"],
    composition: ["FieldLabel + Select + FieldDescription + FieldError；SelectGroup 提供候选分组"],
    stateOwner: { library: ["焦点、展开、高亮、非受控值"], application: ["受控值、候选、invalid、加载/失败/未知与保存事实"] },
    responsive: ["组件保留 -narrow 与粗指针角色；本批只做桌面检查"],
    customization: ["同档文字和控件尺寸、bordered padding、角色颜色、Portal container"],
  }, designEn: {"whenToUse":["Known single-value candidates whose current choice usually suffices."],"avoid":["Use RadioGroup for small sets needing side-by-side comparison.","Use Combobox when many candidates need filtering.","Use Menu for commands and Tabs for views.","Use NativeSelect for essential native picker behavior."],"composition":["FieldLabel + Select + FieldDescription + FieldError; SelectGroup groups candidates."],"stateOwner":{"library":["Focus, opening, highlight, and uncontrolled values."],"application":["Controlled values, candidates, invalid facts, loading/failure/unknown states, and save facts."]},"responsive":["Retains -narrow and coarse-pointer roles; this batch checked desktop only."],"customization":["Matching text/control dimensions, bordered padding, role colors, and Portal containers."]},
} satisfies ComponentMeta;
