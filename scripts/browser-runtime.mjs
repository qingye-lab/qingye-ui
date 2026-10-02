import { execFileSync } from "node:child_process";
import { chromium } from "playwright-core";

export const variants = [
  { name: "light-desktop", theme: "light", width: 1100, height: 900 },
  { name: "dark-desktop", theme: "dark", width: 1100, height: 900 },
  { name: "light-mobile", theme: "light", width: 390, height: 844, mobile: true },
  { name: "dark-mobile", theme: "dark", width: 390, height: 844, mobile: true },
];

export function selectVariants(only) {
  if (!only) return variants;
  const names = only.split(",");
  if (names.some((name) => !variants.some((v) => v.name === name))) {
    throw new Error(`unknown variant: ${only}`);
  }
  return variants.filter((v) => names.includes(v.name));
}

const processes = () => execFileSync("ps", ["-axo", "pid=,ppid=,command="], { encoding: "utf8" })
  .split("\n").map((line) => {
    const match = line.match(/^\s*(\d+)\s+(\d+)\s+(.+)$/);
    return match && { pid: Number(match[1]), parent: Number(match[2]), command: match[3] };
  }).filter(Boolean);

export async function closeWithTimeout(resource, label) {
  let timer;
  try {
    await Promise.race([
      resource.close(),
      new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(`${label} cleanup timed out`)), 5000); }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}

// One browser per invocation; failures are reported, never hidden by relaunch.
export async function withBrowser(run) {
  const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
  const browser = await chromium.launch(executablePath ? { executablePath } : {});
  // Playwright can leave teardown pending after a crashed browser disconnects.
  // Keep Node alive long enough to report the failure and bounded cleanup.
  const keepAlive = setInterval(() => {}, 1000);
  const errors = [];
  let owned = [];
  let result;
  const lifecycle = {
    nodePid: process.pid,
    executablePath: executablePath ?? chromium.executablePath(),
    version: browser.version(),
    processes: [],
    descendantPids: [],
    closed: false,
  };
  browser.on("disconnected", () => { lifecycle.disconnectedAt = new Date().toISOString(); });
  const capture = () => {
    const snapshot = processes();
    if (!owned.length) {
      owned = snapshot.filter((p) => p.parent === process.pid && p.command.includes("--remote-debugging-pipe"));
      // chromium.executablePath() names full Chromium even when launch() chose
      // headless shell. Record the process we actually own in runtime evidence.
      if (owned[0]) lifecycle.executablePath = owned[0].command.split(" --")[0];
      lifecycle.processes = owned.map((p) => ({ pid: p.pid, parent: p.parent, profile: p.command.match(/--user-data-dir=(\S+)/)?.[1] }));
    }
    const profiles = lifecycle.processes.map((p) => p.profile).filter(Boolean);
    const ids = new Set([...lifecycle.descendantPids, ...owned.map((p) => p.pid)]);
    for (let size = -1; size !== ids.size;) {
      size = ids.size;
      for (const p of snapshot) {
        if (ids.has(p.parent) || profiles.some((profile) => p.command.includes(profile))) ids.add(p.pid);
      }
    }
    lifecycle.descendantPids = [...ids];
  };
  let closing;
  const closeOwnedBrowser = () => {
    if (!closing) closing = closeWithTimeout(browser, "browser");
    return closing;
  };
  const interrupt = (signal) => {
    lifecycle.interruptedBy = signal;
    errors.push(new Error(`browser run interrupted by ${signal}`));
    try { capture(); } catch (error) { errors.push(error); }
    // Close through the normal lifecycle API. The active operation then rejects,
    // reaches finally, and verifies the same owned process tree.
    closeOwnedBrowser().catch(() => {});
  };
  const sigint = () => interrupt("SIGINT");
  const sigterm = () => interrupt("SIGTERM");
  process.on("SIGINT", sigint);
  process.on("SIGTERM", sigterm);
  try {
    capture();
    console.log(`browser ${JSON.stringify(lifecycle)}`);
    result = await run(browser, lifecycle);
  } catch (error) {
    errors.push(error);
  } finally {
    // A failed process snapshot must never prevent closing an already launched
    // browser, and a cleanup error must not erase the original run failure.
    try { capture(); } catch (error) { errors.push(error); }
    try { await closeOwnedBrowser(); } catch (error) { errors.push(error); }
    try {
      const alive = new Set(processes().map((p) => p.pid));
      lifecycle.closed = lifecycle.descendantPids.every((pid) => !alive.has(pid));
      console.log(`browser cleanup ${JSON.stringify({ nodePid: process.pid, closed: lifecycle.closed })}`);
      if (!lifecycle.closed) errors.push(new Error("task-owned browser process remains after close"));
    } catch (error) {
      errors.push(error);
    } finally {
      clearInterval(keepAlive);
      process.off("SIGINT", sigint);
      process.off("SIGTERM", sigterm);
    }
  }
  if (errors.length) throw new AggregateError(errors, errors.map((error) => error.message).join("; "));
  return result;
}
