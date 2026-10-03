import NumberValues from "@/content/number-field/demos/01-values";
import NumberSizes from "@/content/number-field/demos/02-sizes";
import OtpInput from "@/content/otp-field/demos/01-input";
import OtpSizes from "@/content/otp-field/demos/02-sizes";
import TagCollections from "@/content/tag-input/demos/01-collections";
import TagSizes from "@/content/tag-input/demos/02-sizes";

export default function Batch6ValuesReview() {
  return <section id="batch6-values" className="border-t border-border py-(--qy-section-gap)">
    <h2 className="text-chapter text-foreground">值输入</h2>
    <div className="mt-(--qy-field-group-gap) grid grid-cols-1 gap-(--qy-section-gap) lg:grid-cols-2">
      <div className="min-w-0"><h3 className="mb-(--qy-field-gap) text-heading">NumberField</h3><NumberValues /></div>
      <div className="min-w-0"><h3 className="mb-(--qy-field-gap) text-heading">NumberField · 尺寸</h3><NumberSizes /></div>
      <div className="min-w-0"><h3 className="mb-(--qy-field-gap) text-heading">OtpField</h3><OtpInput /></div>
      <div className="min-w-0"><h3 className="mb-(--qy-field-gap) text-heading">OtpField · 尺寸</h3><OtpSizes /></div>
      <div className="min-w-0"><h3 className="mb-(--qy-field-gap) text-heading">TagInput</h3><TagCollections /></div>
      <div className="min-w-0"><h3 className="mb-(--qy-field-gap) text-heading">TagInput · 尺寸</h3><TagSizes /></div>
    </div>
  </section>;
}
