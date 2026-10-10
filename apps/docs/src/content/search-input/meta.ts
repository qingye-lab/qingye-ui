import type { ComponentMeta } from "@/lib/types";

export default {
  title: "搜索输入 SearchInput", titleEn: "SearchInput",
  description: "输入一个搜索词，并能一步清空。", descriptionEn: "Enter a search term and clear it in one step.",
  category: "表单", layer: "pattern", source: "local", exports: ["SearchInput"],
  keywords: ["search", "search-input", "搜索", "搜索框", "清空", "clear", "filter", "筛选"],
  decisions: "搜索输入是组合，不是 Input 的一个模式：编辑边界（InputGroup）里依次放搜索图标、输入、清空动作，三者都是公开部件。输入框只承载值；清空是附在边界上的另一个动作，有自己的名称与焦点。它只持有搜索词，不发请求、不决定何时搜索，也不显示结果。",
  decisionsEn: "SearchInput is a composition, not a mode of Input: a search icon, the input, and a clear action sit inside one editing boundary (InputGroup), all public parts. The input only holds the value; clearing is a separate action on the boundary with its own name and focus. It holds the search term only: it sends no request, does not decide when to search, and shows no results.",
  design: {
    methods: ["名实相符", "相成相制", "进退相承"],
    whenToUse: ["输入搜索词或就地筛选一个列表。"],
    avoid: ["普通文本字段用 Input；需要候选项时用 Autocomplete 或 Combobox。", "只靠 placeholder 命名：提供 FieldLabel 或 aria-label。"],
    composition: ["与 FieldLabel 共处，或在工具条里以 aria-label 命名。需要别的附属动作时，用 InputGroup + InputGroupInput + InputGroupButton 自行组合。"],
    stateOwner: {
      library: ["共同边界、搜索图标、清空动作的出现与焦点返回、首个 Escape 清空本字段。"],
      application: ["搜索词的含义、何时查询、结果、无结果与失败的表达。"],
    },
    responsive: ["宽度由所在容器决定；几何与 Input 相同，跟随密度轴。"],
    customization: ["className、style、render 与 ref 属于真实 input；controlClassName 属于编辑边界；clearLabel 改写清空动作的名称。"],
  },
  designEn: {
    whenToUse: ["Entering a search term or filtering a list in place."],
    avoid: ["Use Input for an ordinary text field; use Autocomplete or Combobox when candidates are offered.", "Naming it by placeholder alone: provide FieldLabel or aria-label."],
    composition: ["Pair with FieldLabel, or name it with aria-label in a toolbar. For other adjunct actions, compose InputGroup + InputGroupInput + InputGroupButton yourself."],
    stateOwner: {
      library: ["The shared boundary, the search icon, when the clear action appears and where focus returns, and the first Escape clearing this field."],
      application: ["What the term means, when to query, and how results, no results and failure are expressed."],
    },
    responsive: ["Width follows the container; geometry matches Input and follows the density axis."],
    customization: ["className, style, render and ref belong to the real input; controlClassName belongs to the editing boundary; clearLabel renames the clear action."],
  },
  api: [{
    name: "SearchInput",
    description: "InputGroup + 搜索图标 + Input（type=search）+ 清空动作。",
    descriptionEn: "InputGroup + search icon + Input (type=search) + a clear action.",
    props: [
      { name: "value / defaultValue / onChange / onValueChange", type: "InputProps", description: "受控与非受控值；清空沿同一条原生事件链更新值。", descriptionEn: "Controlled and uncontrolled values; clearing updates the value through the same native event path." },
      { name: "onClear", type: "() => void", description: "清空之后调用；值的变化已由 onChange / onValueChange 送出。清空不提交表单。", descriptionEn: "Called after clearing; the value change has already been sent through onChange / onValueChange. Clearing does not submit a form." },
      { name: "clearLabel", type: "string", description: "清空动作的名称，默认从 locale 读取。", descriptionEn: "Name of the clear action, read from the locale by default." },
      { name: "readOnly / disabled", type: "boolean", default: "false", description: "只读与禁用时不出现清空动作；禁用同样服从 Field 与原生 fieldset。", descriptionEn: "No clear action when read only or disabled; disabling also follows Field and a native fieldset." },
      { name: "className / style / render / ref", type: "InputProps", description: "全部作用于真实 input。", descriptionEn: "Applied to the real input." },
      { name: "controlClassName", type: "string", description: "作用于编辑边界，例如宽度。", descriptionEn: "Applied to the editing boundary, e.g. its width." },
      { name: "其余 InputProps（除 type / unstyled）", nameEn: "Other InputProps (except type / unstyled)", type: "InputProps", description: "placeholder、name、form、aria-* 等原样透传给输入。", descriptionEn: "placeholder, name, form, aria-* and the rest are forwarded to the input." },
    ],
  }],
  keyboard: [
    { keys: "Tab / Shift+Tab", description: "在输入与清空动作之间移动。", descriptionEn: "Move between the input and the clear action." },
    { keys: "Escape", description: "非空且可编辑时清空本字段，之后的 Escape 交给外层；输入法组字与调用方取消时保留草稿。", descriptionEn: "Clear this field when it is nonempty and editable; a later Escape reaches the parent. Composition and caller cancellation preserve the draft." },
    { keys: "Enter / Space", description: "焦点在清空动作上时清空并把焦点还给输入，不提交表单。", descriptionEn: "On the clear action: clear, return focus to the input, and do not submit the form." },
  ],
  notes: ["此前写作 Input type=\"search\" 的用法改为 SearchInput；Input 的 clearable / clearLabel / onClear 已移除。普通字段需要清空时用 InputGroup + InputGroupButton 组合。"],
  notesEn: ["Replace Input type=\"search\" with SearchInput; Input's clearable / clearLabel / onClear are removed. For a clear action on an ordinary field, compose InputGroup + InputGroupButton."],
} satisfies ComponentMeta;
