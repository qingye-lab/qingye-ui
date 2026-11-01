import type { ComponentMeta } from "@/lib/types";

export default {
  title: "对话输入框 Composer", titleEn: "Composer",
  description: "多行输入，支持 @ 提及、/ 命令与原子令牌，值是文字与令牌片段的数组。", descriptionEn: "Multi-line input with @ mentions, / commands and atomic tokens; its value is an array of text and token segments.",
  category: "表单", source: "local", layer: "pattern", exports: ["Composer", "ComposerInput", "ComposerToolbar", "ComposerSubmit", "composerValueToText", "composerValueFromText", "parseComposerValue", "normalizeComposerValue", "composerValueLength", "isComposerValueEmpty", "emptyComposerValue"],
  keywords: ["composer", "chat", "对话", "输入框", "mention", "提及", "slash", "命令", "token", "令牌", "contenteditable"],
  decisions: "编辑区是 contenteditable，因为令牌必须是行内原子对象（整体删除、光标进不去、读屏读名字），原生文本框做不到。值是片段数组而不是字符串：令牌带稳定 id，应用不必从文字里反解。候选浮层按 combobox 模式接线，但编辑区的角色是 textbox（多行的 combobox 不存在）。消息列表与气泡不在库内。",
  decisionsEn: "The editor is contenteditable because tokens must be inline atoms (deleted whole, unreachable by the caret, read by name), which a native text box cannot do. The value is an array of segments, not a string, so a token keeps a stable id and apps need not parse text back. The candidate popup follows the combobox pattern, but the editor's role is textbox since no multi-line combobox exists. Message lists and bubbles are not in the library.",
  api: [
    { name: "Composer", description: "根：填值边界与状态，持有值、提交与禁用/只读。", descriptionEn: "Root: fill-control frame and state; owns value, submit and disabled/readOnly.", props: [
      { name: "value / defaultValue", type: "readonly ComposerSegment[]", default: "defaultValue: []", description: "受控/非受控值；文字片段 { type: 'text', text } 与令牌片段 { type: 'token', trigger, id, label }。相邻文字片段会被合并。", descriptionEn: "Controlled/uncontrolled value: text segments and token segments. Adjacent text segments are merged." },
      { name: "onValueChange", type: "(value: ComposerSegment[], details: ComposerChangeDetails) => void", description: "details.reason 为 input/paste/cut/newline/token/action/delete-token/undo/redo/clear；cancel() 拒绝这次改动，编辑区随即恢复。", descriptionEn: "details.reason is input/paste/cut/newline/token/action/delete-token/undo/redo/clear. cancel() rejects the change and the editor reverts." },
      { name: "onSubmit", type: "(value: ComposerSegment[], details: { event, clear }) => void", description: "Enter（或 ComposerSubmit）触发；没有令牌且文字全是空白时不调用。clear() 经 onValueChange 把值清空。", descriptionEn: "Fired by Enter or ComposerSubmit; not called when there is no token and the text is whitespace only. clear() empties the value through onValueChange." },
      { name: "submitOn", type: "'enter' | 'mod-enter'", default: "'enter'", description: "enter：Enter 提交，Shift+Enter 换行；mod-enter：Ctrl/⌘+Enter 提交，Enter 换行。", descriptionEn: "enter: Enter submits and Shift+Enter breaks the line. mod-enter: Ctrl/Cmd+Enter submits and Enter breaks the line." },
      { name: "disabled / readOnly", type: "boolean", default: "false", description: "都不可编辑、不提交、不开候选；只读可聚焦与复制。", descriptionEn: "Neither edits, submits nor opens candidates; read-only stays focusable and copyable." },
    ] },
    { name: "ComposerInput", description: "编辑区与候选浮层。", descriptionEn: "The editor and candidate popup.", props: [
      { name: "aria-label / aria-labelledby", type: "string", description: "必填其一，否则抛错。", descriptionEn: "One is required, otherwise it throws." },
      { name: "placeholder", type: "string", description: "空时显示，同时写入 aria-placeholder。", descriptionEn: "Shown when empty and exposed as aria-placeholder." },
      { name: "triggers", type: "readonly ComposerTrigger[]", description: "触发项：char、getItems(query, { signal })、select（token 或 action）、onSelect、startOnly、label、emptyText。getItems 可返回数组或 Promise；加载中与无结果与 Combobox 同文案，迟到的结果被丢弃。候选项 ComposerItem 为 { id, label, group?, description?, icon?, disabled?, select? }：id 是令牌身份，label 是显示名，令牌读作“触发字符 + label”；同名 group 归为一组，按首次出现顺序排列；select 覆盖触发项的 select（token 插入令牌，action 删掉触发文字、只回调 onSelect）。", descriptionEn: "Triggers: char, getItems(query, { signal }), select (token or action), onSelect, startOnly, label, emptyText. getItems may return an array or a Promise; loading and no-result copy match Combobox and late results are discarded. A ComposerItem is { id, label, group?, description?, icon?, disabled?, select? }: id is the token identity and label the display name, so a token reads as trigger + label; items with the same group are grouped in order of first appearance; select overrides the trigger's select (token inserts a token, action removes the trigger text and only calls onSelect)." },
      { name: "minRows / maxRows", type: "number", default: "1 / 8", description: "起始行数与增长上限。超过上限在内部滚动，且不超过视口高度的一半。", descriptionEn: "Starting rows and growth cap. Beyond the cap the editor scrolls, and never exceeds half the viewport height." },
    ] },
    { name: "ComposerToolbar / ComposerSubmit", description: "工具条放 xs 按钮；ComposerSubmit 在内容为空、禁用或只读时不可用。", descriptionEn: "The toolbar holds xs buttons; ComposerSubmit is unavailable when empty, disabled or read-only.", props: [
      { name: "ComposerSubmit aria-label", type: "string", default: "messages.composerSubmit", description: "默认“发送”。", descriptionEn: "Defaults to “Send”." },
    ] },
  ],
  keyboard: [
    { keys: "Enter / Shift+Enter", description: "按 submitOn 提交或换行；组字中（isComposing 或 keyCode 229）不处理。", descriptionEn: "Submit or break the line per submitOn; ignored during composition (isComposing or keyCode 229)." },
    { keys: "ArrowDown / ArrowUp", description: "候选打开时移动高亮，循环并跳过禁用项。", descriptionEn: "Move the highlight while candidates are open, wrapping and skipping disabled items." },
    { keys: "Enter / Tab", description: "候选打开且有高亮时选中，不提交。", descriptionEn: "Select the highlight while candidates are open, without submitting." },
    { keys: "Escape", description: "关闭候选，保留已输入的文字。", descriptionEn: "Close the candidates and keep the typed text." },
    { keys: "Backspace / Delete", description: "光标紧邻令牌时整体删除。", descriptionEn: "Delete an adjacent token as a whole." },
    { keys: "Ctrl/⌘+Z、Ctrl/⌘+Shift+Z", description: "撤销与重做，用组件自己的快照栈。", descriptionEn: "Undo and redo using the component's own snapshot stack." },
  ],
  notes: [
    "粘贴、拖放一律只收纯文字；复制与剪切输出纯文字，令牌写作“触发字符 + label”。",
    "composerValueToText 默认把令牌写作“触发字符 + label”；composerValueFromText 可传入已知令牌，按字面匹配还原。",
    "没有 name 与表单提交，也未接入 Field；需要时由应用在 onSubmit 里取值。",
    "jsdom 无法验证真实输入法、各浏览器 contenteditable 的光标与 beforeinput 差异、浮层碰撞翻转与 Range 坐标，需在真实浏览器中另验。",
  ],
  notesEn: [
    "Paste and drop accept plain text only; copy and cut emit plain text with a token written as trigger + label.",
    "composerValueToText writes a token as trigger + label by default; composerValueFromText accepts known tokens and restores them by literal match.",
    "There is no name or form submission and no Field integration; read the value in onSubmit.",
    "jsdom cannot verify a real IME, per-browser contenteditable caret and beforeinput behavior, popup collision flipping or Range geometry; verify these in real browsers.",
  ],
  design: { methods: ["名实相符", "相成相制", "进退相承"], whenToUse: ["对话式输入：多行文字夹带提及与命令"], avoid: ["单行短文本用 Input；纯多行文字用 Textarea；只能从候选选择用 Combobox"], composition: ["Composer + ComposerInput + ComposerToolbar + ComposerSubmit"], stateOwner: { library: ["非受控值、撤销栈、候选高亮与异步结果的新旧判断"], application: ["受控值、候选数据来源、提交后的清空与发送、消息列表"] }, responsive: ["一套几何，起始高与上限按行数换算，跟随密度轴"], customization: ["root render/ref；ComposerInput 的 className 作用于编辑区"] },
  designEn: { whenToUse: ["Conversational input: multi-line text with mentions and commands."], avoid: ["Use Input for short single-line text, Textarea for plain multi-line text, and Combobox when values must come from candidates."], composition: ["Composer + ComposerInput + ComposerToolbar + ComposerSubmit"], stateOwner: { library: ["Uncontrolled value, undo stack, candidate highlight and stale-result discarding."], application: ["Controlled value, candidate sources, clearing and sending after submit, the message list."] }, responsive: ["One geometry; starting height and cap derive from rows and follow the density axis."], customization: ["Root render/ref; ComposerInput className applies to the editor."] },
} satisfies ComponentMeta;
