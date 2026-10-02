import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { writeFileSync } from "node:fs";
import { projectResources } from "../test/fixtures/permissions.mjs";
const docs = resolve(dirname(fileURLToPath(import.meta.url)), "..");
export function generateResourceFixtures() {
  const data = `${JSON.stringify({ visibility: "public-projection", rows: projectResources("public") }, null, 2)}\n`;
  writeFileSync(resolve(docs, "src/patterns/authorized-resources.json"), data);
  writeFileSync(resolve(docs, "public/authorized-resources.json"), data);
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) generateResourceFixtures();
