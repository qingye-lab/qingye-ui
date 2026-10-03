import LabelAssociation from "@/content/label/demos/01-association";
import LabelDisabled from "@/content/label/demos/02-disabled";
import FormSubmit from "@/content/form/demos/01-submit";
import FormErrorAndReset from "@/content/form/demos/02-error-and-reset";
import InputGroupAddon from "@/content/input-group/demos/01-addon";
import InputGroupStates from "@/content/input-group/demos/02-states";
import NativeSelectSizes from "@/content/native-select/demos/01-sizes";
import NativeSelectList from "@/content/native-select/demos/02-list-and-disabled";
import NativeSelectField from "@/content/native-select/demos/03-field";
import ButtonGroupActions from "@/content/button-group/demos/01-actions";
import ButtonGroupVertical from "@/content/button-group/demos/02-vertical";
import GroupDirections from "@/content/group/demos/01-directions";
import { Stack } from "@qingye/ui/components/layout";

export default function Batch6Structure() {
  return <section id="batch6-structure" className="min-w-0"><Stack gap="section"><h2 className="text-chapter">名称、表单与成组</h2><Stack gap="panel"><h3 className="text-heading">标签</h3><LabelAssociation /><LabelDisabled /></Stack><Stack gap="panel"><h3 className="text-heading">表单</h3><FormSubmit /><FormErrorAndReset /></Stack><Stack gap="panel"><h3 className="text-heading">输入组合</h3><InputGroupAddon /><InputGroupStates /></Stack><Stack gap="panel"><h3 className="text-heading">原生选择</h3><NativeSelectSizes /><NativeSelectList /><NativeSelectField /></Stack><Stack gap="panel"><h3 className="text-heading">动作组</h3><ButtonGroupActions /><ButtonGroupVertical /></Stack><Stack gap="panel"><h3 className="text-heading">成组布局</h3><GroupDirections /></Stack></Stack></section>;
}
