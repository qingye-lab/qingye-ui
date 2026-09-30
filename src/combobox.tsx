import type { ComponentProps } from "react";
import { ComboboxItem as CossComboboxItem, ComboboxInput as CossComboboxInput } from "./coss/combobox";
import { cn } from "./utils";

export {
  Combobox, ComboboxPopup, ComboboxEmpty, ComboboxList,
  ComboboxValue, ComboboxChips, ComboboxChipsInput, ComboboxChip,
  ComboboxChipRemove, ComboboxClear, ComboboxTrigger, ComboboxGroup,
  ComboboxGroupLabel, ComboboxSeparator, ComboboxStatus, ComboboxCollection,
  useComboboxFilter,
} from "./coss/combobox";

export function ComboboxInput({ className, triggerProps, clearProps, ...props }: ComponentProps<typeof CossComboboxInput>) {
  return <CossComboboxInput className={cn("pointer-coarse:min-h-(--control-hit-target) pointer-coarse:[&_input]:min-h-(--control-hit-target)", className)} {...(triggerProps ? { triggerProps } : {})} {...(clearProps ? { clearProps } : {})} {...props} />;
}

export function ComboboxItem({ className, ...props }: ComponentProps<typeof CossComboboxItem>) {
  return <CossComboboxItem className={cn("pointer-coarse:min-h-(--control-hit-target)", className)} {...props} />;
}
