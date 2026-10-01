const _04States = 'import { FileUpload } from "@yanqing/ui";\n\nexport const meta = { title: "状态", description: "禁用与错误。错误状态要同时给出文字说明。" };\n\nexport default function Demo() {\n  return (\n    <div className="grid w-full max-w-2xl gap-6 sm:grid-cols-2">\n      <FileUpload disabled label="上传固件包" description="设备在线升级期间不可上传" />\n      <div className="flex flex-col gap-2">\n        <FileUpload invalid aria-describedby="id-card-error" label="上传身份证照片" description="正反面各一张，JPG 或 PNG" accept="image/*" />\n        <p id="id-card-error" className="text-destructive-foreground text-xs">请上传身份证正反面照片</p>\n      </div>\n    </div>\n  );\n}\n';
export {
  _04States as default
};
