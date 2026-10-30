import { useUILocale } from "./locale";
import { InputGroupAddon } from "./components/input-group";

/**
 * 编辑边界（InputGroup）里的「只读」说明，与 Input 在自己的边框内给出的说明是同一件事、同一档字（caption）：
 * Input 只在 unstyled=false 时自带说明，进到共同边界的输入（日期三件套、SearchInput）不再各写一份，读这一个。
 * 用 InputGroupAddon 而不是裸 span：输入与附件之间的贴合间距由 InputGroup 按 data-slot 识别（`input-control` 后接 `input-group-addon` 时左内距为 0），
 * 右侧让出一个控件内间隔，使它与其后的图标动作读作一组。aria-hidden 与 Input 一致：只读本身由原生 readonly 属性向读屏表达。
 */
export function InputGroupReadOnlyNote() {
  const { messages } = useUILocale();
  return <InputGroupAddon aria-hidden="true" className="shrink-0 pe-(--qy-control-content-gap) text-caption">{messages.readOnly}</InputGroupAddon>;
}
