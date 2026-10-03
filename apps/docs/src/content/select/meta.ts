import type { ComponentMeta } from "@/lib/types";

export default {
  title: "选择器 Select", titleEn: "Select",
  description: "从可收起的候选列表中取一个值。", descriptionEn: "Choose one value from a collapsible set of options.",
  category: "表单", layer: "primitive", source: "local",
  exports: ["Select", "SelectTrigger", "SelectValue", "SelectPopup", "SelectItem", "SelectGroup", "SelectGroupLabel", "SelectPrimitive"],
  api: [
    { name: "Select", description: "单值状态与表单语义。", props: [
      { name: "value / defaultValue", type: "Value | null", description: "受控值或真实初值，null 是未选择。省略初值不会选第一项。" },
      { name: "items", type: "Record<string, ReactNode> | {value, label}[] | Group[]", description: "当前值的名称映射；显式空字符串候选也要提供可读 label。" },
      { name: "onValueChange", type: "(value, eventDetails) => void", description: "选择变化，可取消；不因高亮移动而改变值。" },
      { name: "name / form / inputRef / autoComplete", type: "Base UI Root props", description: "保留原语隐藏输入、表单与自动填充入口。" },
      { name: "disabled / readOnly / required", type: "boolean", default: "false", description: "交互限制与原生约束；invalid 由 Field 或触发器显式 ARIA 声明。" },
      { name: "open / defaultOpen / onOpenChange", type: "Base UI Root props", description: "受控或非受控展开，取消返回与选择值分开。" },
      { name: "modal", type: "boolean", default: "false", description: "默认允许其余字段交互；可按承载任务显式改变。" },
      { name: "itemToStringLabel / itemToStringValue / isItemEqualToValue", type: "Base UI Root props", description: "对象候选的名称、序列化与相等关系。" },
    ] },
    { name: "SelectTrigger", description: "有边框的选择入口，与 Input 同档。", props: [
      { name: "size", type: '"xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', description: "同名文字、外高、padding-bordered 和图标档。" },
      { name: "children", type: "ReactNode", description: "省略时提供 SelectValue；内含展开图标。" },
      { name: "render / ref / className / style / ARIA", type: "Base UI composition", description: "保留真实触发器的事件、名称和样式入口。" },
    ] },
    { name: "SelectValue", description: "真实当前值名称与未选择占位。", props: [
      { name: "placeholder", type: "ReactNode", default: "locale.selectPlaceholder", description: "仅未选择显示；不能替代 FieldLabel。" },
      { name: "children", type: "ReactNode | (value) => ReactNode", description: "显式值表达优先。" },
    ] },
    { name: "SelectPopup", description: "Portal、定位、面板与可滚动 List 的共同组合。", props: [
      { name: "side / align / sideOffset / alignOffset", type: "Base UI positioning props", default: '"bottom" / "start" / 0', description: "默认贴锚点，不覆盖触发器；由原语处理空间碰撞。" },
      { name: "alignItemWithTrigger", type: "boolean", default: "false", description: "显式选择是否以选中项对齐并覆盖触发器。" },
      { name: "container", type: "HTMLElement | ShadowRoot | RefObject | null", description: "Portal 容器；局部主题、语言或密度需由调用方提供正确继承环境。" },
      { name: "finalFocus / render / ref / className / style", type: "Base UI Popup props", description: "默认取消回到触发器；入退场由 motion.css 拥有。" },
    ] },
    { name: "SelectItem", description: "值候选；高亮表位置，勾标表选中。", props: [
      { name: "value / label / disabled", type: "any / string / boolean", description: "值、类型搜索名称、禁用事实。禁用项可高亮供辨认，但不能选取。" },
      { name: "children / render / ref / className / style", type: "Base UI Item props", description: "名称内容自动进入 ItemText，选中勾标单独呈现。" },
    ] },
    { name: "SelectGroup / SelectGroupLabel", description: "语义分组与组名称。" },
    { name: "SelectPrimitive", description: "完整 Base UI Select 原语出口；公共 Select 接口始终为单值。" },
  ],
  keyboard: [
    { keys: "Tab", description: "进入触发器。" },
    { keys: "Enter / Space / ↑ / ↓", description: "打开候选；展开后方向键移动高亮，Enter/Space 选择。" },
    { keys: "Home / End", description: "展开时移动到首/尾候选。" },
    { keys: "文字键", description: "类型搜索；展开时高亮匹配项，关闭时原语可直接选择匹配值。" },
    { keys: "Esc", description: "关闭并回到触发器，保留原值。" },
  ],
  notes: ["FieldLabel 命名触发器，FieldError 关联错误；SelectGroupLabel 命名候选分组。", "null 是未选择，空字符串和 0 可作为候选；原生表单可能把 null 与空字符串都序列化为空。", "只读保留当前值，禁用项不能选取。", "未设置默认 z-index 或阴影；与其他浮层的遮挡关系仍需验证。"],
  decisions: "高亮表示当前位置，选取才改变值。未选择不会自动变为第一项；需要并置比较时用 RadioGroup。",
  design: {
    methods: ["名实相符", "展开有据", "进退相承", "相成相制"],
    whenToUse: ["已知单值候选，平时只需辨认当前选择"],
    avoid: ["需要并置比较的少量候选用 RadioGroup", "大量候选需过滤时用 Combobox", "命令用 Menu，视角用 Tabs", "关键原生选择行为用 NativeSelect"],
    composition: ["FieldLabel + Select + FieldDescription + FieldError；SelectGroup 提供候选分组"],
    stateOwner: { library: ["焦点、展开、高亮、非受控值"], application: ["受控值、候选、invalid、加载/失败/未知与保存事实"] },
    responsive: ["组件保留 -narrow 与粗指针角色；本批只做桌面检查"],
    customization: ["同档文字和控件尺寸、bordered padding、角色颜色、Portal container"],
  },
} satisfies ComponentMeta;
