const _01Dropzone = 'import { FileUpload } from "@yanqing/ui";\n\nexport const meta = { title: "拖放区", description: "点击或拖入文件；不符合类型或大小的文件会被拒绝并说明原因。" };\n\nconst sample = (name: string, type: string, size: number) => new File([new Uint8Array(size)], name, { type });\n\nexport default function Demo() {\n  return (\n    <FileUpload\n      className="w-full max-w-md"\n      accept="image/*,.pdf"\n      maxSize={10 * 1024 * 1024}\n      label="上传发票"\n      description="支持 PNG、JPG、PDF，单个不超过 10 MB"\n      defaultFiles={[\n        sample("2026年9月差旅发票.pdf", "application/pdf", 248_000),\n        sample("酒店住宿水单-杭州.jpg", "image/jpeg", 1_860_000),\n      ]}\n    />\n  );\n}\n';
export {
  _01Dropzone as default
};
