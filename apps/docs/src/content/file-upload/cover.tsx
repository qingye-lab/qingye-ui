import { FileUpload } from "@qingye_lab/ui/components/file-upload";

export default function Cover() {
  return <FileUpload className="w-full" accept=".txt,image/*" maxFiles={3} />;
}
