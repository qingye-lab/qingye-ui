import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const register = JSON.parse(readFileSync(new URL("../coss-source.json", import.meta.url), "utf8"));
let changed = 0;
let unavailable = 0;
for (const item of register.components) {
  try {
    const registry = JSON.parse(execFileSync("curl", ["--fail", "--silent", "--show-error", "--max-time", "20", item.registry], { encoding: "utf8", maxBuffer: 1024 * 1024 }));
    const source = registry.files?.find((file) => `apps/ui/${file.path}` === item.upstreamPath)?.content;
    if (typeof source !== "string") throw new Error("Registered source missing from response");
    if (createHash("sha256").update(source).digest("hex") !== item.upstreamSha256) {
      changed++; console.log(`CHANGED ${item.file}`);
    }
  } catch (error) { unavailable++; console.error(`UNVERIFIED ${item.file}: ${error.message}`); }
}
console.log(`${register.components.length} registered sources; ${changed} changed; ${unavailable} unverified. No local files modified.`);
if (changed || unavailable) process.exitCode = 1;
