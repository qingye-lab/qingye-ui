// Gate: the hand-written API tables must not name properties or parts the types do not have.
//
//   node scripts/check-api-drift.mjs            summary; exit 1 on documented-but-missing / unresolved
//                                               that the baseline does not already list
//   node scripts/check-api-drift.mjs --list     print every documented-but-missing entry
//   node scripts/check-api-drift.mjs --undocumented [n]   print undocumented own props
//
// The full report is written by gen-catalog.mjs to docs/api-drift.json; this script recomputes it
// from source so it never trusts a stale file. docs/api-drift.baseline.json lists drift that was
// already present when the gate landed; entries leave it as they are fixed, and none is added.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { analyzeAll, buildDriftReport, gateDrift, repoRoot } from "./api-resolver.mjs";

const args = process.argv.slice(2);
const report = buildDriftReport(analyzeAll());
const baselinePath = join(repoRoot, "docs/api-drift.baseline.json");
const baseline = existsSync(baselinePath) ? JSON.parse(readFileSync(baselinePath, "utf8")) : { documentedButMissing: [], unresolved: [] };
const { added, fixed } = gateDrift(report, baseline);
const { summary } = report;

console.log(`API tables vs types (${report.checker}): ${summary.components} components`);
for (const [status, count] of Object.entries(summary.byStatus)) console.log(`  ${status}: ${count}`);
console.log(`  documented-but-missing ${summary.documentedButMissing} (gated); unresolved ${summary.unresolved} (gated)`);
console.log(`  undocumented ${summary.undocumented} (${summary.undocumentedDeclaredInThisComponentsFile} declared in the component's own file; report only)`);
console.log(`  written names not checked ${summary.uncheckedWrittenNames}: ${JSON.stringify(summary.uncheckedByReason)}`);
if (args.includes("--list")) for (const item of report.documentedButMissing) console.log(`  MISSING ${item.component} ${item.part}${item.prop ? ` .${item.prop}` : ""} [${item.reason}] ${item.meta}`);
if (args.includes("--undocumented")) for (const item of report.undocumented.slice(0, Number(args[args.indexOf("--undocumented") + 1]) || 30)) console.log(`  UNDOCUMENTED ${item.component} ${item.part}.${item.prop} ${item.declaredAt ?? ""}`);
for (const item of fixed) console.log(`  FIXED (remove from docs/api-drift.baseline.json): ${item}`);
if (added.length) {
  console.log(`FAIL: ${added.length} new entr${added.length === 1 ? "y" : "ies"} not in the baseline`);
  for (const item of added) console.log(`  ${item.kind} ${item.component} ${item.part ?? ""}${item.prop ? ` .${item.prop}` : ""} ${item.reason ?? ""} ${item.meta ?? ""}`);
  console.log("Fix the table in meta.ts (or the type). Do not add to the baseline to get a green run.");
  process.exit(1);
}
console.log("PASS: no drift beyond the baseline");
