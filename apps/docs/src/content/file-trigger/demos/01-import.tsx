import { useEffect, useId } from "react";
import { FileTrigger } from "@qingye_lab/ui/components/file-trigger";
import { toastManager } from "@qingye_lab/ui/components/toast";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "导入", titleEn: "Import" };

export default function Demo() {
  const { messages, code } = useUILocale();
  const id = useId();
  useEffect(() => () => toastManager.close(id), [id]);
  return <FileTrigger
    variant="bordered"
    accept=".csv"
    maxSize={64 * 1024}
    onSelect={(accepted, { rejected }) => {
      const reasons = rejected.map(item => item.reason === "custom" ? messages.fileRejectedWith(item.file.name, item.message) : messages.fileError(item.file.name, item.reason));
      if (reasons.length) toastManager.add({ id, type: "error", title: reasons.join("；"), timeout: 5000 });
      else toastManager.add({ id, type: "success", title: accepted.map(file => file.name).join("、"), timeout: 5000 });
    }}
  >{code.startsWith("en") ? "Import CSV" : "导入 CSV"}</FileTrigger>;
}
