import { FileUpload } from "@yanqing/ui/components/file-upload";

export const meta = { title: "拖放区", description: "点击或拖入文件；不符合类型或大小的文件会被拒绝并说明原因。" };

const sample = (name: string, type: string, size: number) => new File([new Uint8Array(size)], name, { type });

export default function Demo() {
  return (
    <FileUpload
      className="w-full max-w-md"
      accept="image/*,.pdf"
      maxSize={10 * 1024 * 1024}
      label="上传发票"
      description="支持 PNG、JPG、PDF，单个不超过 10 MB"
      defaultFiles={[
        sample("2026年9月差旅发票.pdf", "application/pdf", 248_000),
        sample("酒店住宿水单-杭州.jpg", "image/jpeg", 1_860_000),
      ]}
    />
  );
}
