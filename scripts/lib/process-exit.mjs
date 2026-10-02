import { setTimeout as delay } from 'node:timers/promises';

// Browser.close() and descendant exit/reaping are separate events. Never kill
// by a stale PID: observe only the captured task tree and fail if it stays live.
export async function waitForProcessExit(pids, snapshot, {
  timeoutMs = 5000, intervalMs = 100, now = Date.now, wait = delay,
} = {}) {
  const owned = new Set(pids), start = now();
  for (;;) {
    const present = snapshot().filter(process => owned.has(process.pid));
    // Z is a terminated child awaiting its parent's wait(), not a running
    // browser. Retain it in evidence; a signal cannot reap a zombie.
    const exitedAwaitingReap = present.filter(process => process.state?.startsWith('Z'));
    const remainingProcesses = present.filter(process => !process.state?.startsWith('Z'));
    const elapsedMs = now() - start;
    if (!remainingProcesses.length || elapsedMs >= timeoutMs) {
      return { closed: remainingProcesses.length === 0, elapsedMs, remainingProcesses, exitedAwaitingReap };
    }
    await wait(Math.min(intervalMs, timeoutMs - elapsedMs));
  }
}
