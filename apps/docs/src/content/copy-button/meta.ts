import type { ComponentMeta } from "@/lib/types";
export default {
  title: "复制按钮 CopyButton", titleEn: "Copy button",
  description: "复制给定文本，并呈现剪贴板实际写入结果。", descriptionEn: "Copy supplied text and reflect the clipboard write result.",
  category: "工具", layer: "primitive", source: "local", exports: ["CopyButton"],
  keywords: ["copy", "clipboard", "复制", "剪贴板"],
  api: [{ name: "CopyButton", description: "继承 Button 的五档、强调、原生/非原生 render 与 ref。", descriptionEn: "Inherits Button's five profiles, emphasis, native/non-native render, and refs.", props: [
    { name: "value", type: "string", description: "本次复制的真实文本；不从 DOM 或业务对象猜测。", descriptionEn: "The actual text to copy; never inferred from DOM or business objects." },
    { name: "timeout", type: "number", default: "2000", description: "清除成功反馈的毫秒预设，只清反馈，不建立成功。", descriptionEn: "A millisecond preset for clearing success feedback; it clears feedback without establishing success." },
    { name: "onCopySuccess / onCopyError", type: "() => void / (error: unknown) => void", description: "writeText resolve 后成功回调；拒绝或 API 不可用走失败回调。", descriptionEn: "Success callback after writeText resolves; rejection or an unavailable API invokes the error callback." },
    { name: "size / shape / variant", type: "ButtonProps", default: 'md / label / quiet', description: "五档继承同档 control/text；icon 形态仍有本地化动作名称。", descriptionEn: "Five matching control/text profiles; icon shape retains a localized action name." },
    { name: "disabled / onClick / render / ref / ARIA", type: "ButtonProps", description: "事件取消阻止写入，等待时屏蔽重复激活；ref 与 render 对应真实按钮。", descriptionEn: "Canceled events prevent writing; waiting blocks repeated activation. ref and render correspond to the actual button." },
  ] }],
  keyboard: [{ keys: "Enter / Space", description: "可用时启动一次复制；等待期间不重复写入。", descriptionEn: "Start one copy when available; waiting never repeats the write." }],
  notes: ["剪贴板需要运行环境支持与权限；失败保留手动复制提示。", "onCopySuccess 只确认传入文本写入当前剪贴板，不表示保存或业务完成。"], notesEn: ["Clipboard access needs environment support and permission. Failure retains guidance for manual copying.","onCopySuccess confirms only writing the supplied text to the current clipboard, not saving or business completion."],
  decisions: "CopyButton 复用 useCopyToClipboard，成功从写入 Promise resolve 建立。反馈时间、quiet 默认和图标是选择/预设。", decisionsEn: "CopyButton uses useCopyToClipboard; success comes from the write Promise resolving. Feedback duration, the quiet default, and icons are choices or presets.",
  design: { methods: ["名实相符", "进退相承"], whenToUse: ["复制已知文本"], avoid: ["复制后直接宣称业务成功"], composition: ["Button + 实际复制状态/失败恢复"], stateOwner: { library: ["剪贴板等待/实际结果/反馈"], application: ["文本内容、复制后处理"] }, customization: ["Button 五档/variant 与 timeout"] }, designEn: {"whenToUse":["Copy known text."],"avoid":["Announcing business success after copying."],"composition":["Button + actual copy state/failure recovery."],"stateOwner":{"library":["Clipboard waiting, actual outcome, and feedback."],"application":["Text content and subsequent handling."]},"customization":["Button's five profiles/variant and timeout."]},
} satisfies ComponentMeta;
