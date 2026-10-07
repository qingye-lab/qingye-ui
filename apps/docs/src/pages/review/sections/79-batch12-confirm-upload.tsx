import Snapshot from "@/content/confirm-action/demos/01-snapshot";
import ConfirmSizes from "@/content/confirm-action/demos/02-outcome";
import Files from "@/content/file-upload/demos/01-files";
import FileSizes from "@/content/file-upload/demos/02-density";
export default function Batch12ConfirmUploadReview() {
  return <section id="batch12-confirm-upload" className="grid gap-(--qy-section-gap) py-(--qy-section-gap)">
    <h2 className="text-chapter text-foreground">确认与文件</h2>
    <section className="grid gap-(--qy-field-group-gap)"><h3 className="text-heading text-foreground">ConfirmAction</h3><Snapshot /><ConfirmSizes /></section>
    <section className="grid gap-(--qy-field-group-gap)"><h3 className="text-heading text-foreground">FileUpload</h3><Files /><FileSizes /></section>
  </section>;
}
