const n=`import { FileUpload } from "@qingye/ui/components/file-upload";
import { Label } from "@qingye/ui/components/label";

export const meta = { title: "按钮触发", description: "variant=\\"button\\" 适合表单中的单个附件；maxFiles=1 时新文件替换旧文件。" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <Label htmlFor="contract-file">签署版合同</Label>
      <FileUpload
        id="contract-file"
        variant="button"
        accept=".pdf"
        maxFiles={1}
        maxSize={20 * 1024 * 1024}
        chooseLabel="选择 PDF"
        description="仅 PDF，不超过 20 MB"
      />
    </div>
  );
}
`;export{n as default};
