import { Field, FieldDescription, FieldLabel } from "@qingye/ui/components/field";
import { FileUpload } from "@qingye/ui/components/file-upload";

export const meta = {
  title: "文件选择",
  description: "附件、证件、导入文件用 FileUpload：文案随界面语言、可校验格式与大小、可显示进度。用 htmlFor + id 关联标签。",
};

export default function Demo() {
  return (
    <Field className="w-full max-w-md">
      <FieldLabel htmlFor="license-file">营业执照</FieldLabel>
      <FileUpload
        accept="image/*,.pdf"
        description="支持 JPG、PNG、PDF，不超过 10 MB"
        id="license-file"
        maxFiles={1}
        maxSize={10 * 1024 * 1024}
        name="license"
        variant="button"
      />
      <FieldDescription>审核通过后可在“企业信息”中重新上传。</FieldDescription>
    </Field>
  );
}
