import { RecordsWorkspace } from "@/content/workspace/demos/03-records";
import { useExampleEmbedded } from "./embedding";

// The live page and the distributable documentation example share one implementation; inside the site's
// example page the outer <main> already exists, so the workspace renders embedded (see embedding.ts).
export default function RecordsPage() {
  return <RecordsWorkspace insideMain={useExampleEmbedded()} />;
}
