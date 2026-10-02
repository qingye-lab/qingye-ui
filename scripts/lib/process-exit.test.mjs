import test from 'node:test';
import assert from 'node:assert/strict';
import { waitForProcessExit } from './process-exit.mjs';

function clock() {
  let time = 0;
  return { now: () => time, wait: async ms => { time += ms; }, timeoutMs: 300, intervalMs: 100 };
}

test('waits for owned descendants to exit after the browser close event', async () => {
  let reads = 0;
  const result = await waitForProcessExit([12], () => ++reads < 3 ? [{pid:12,state:'S'}] : [], clock());
  assert.equal(result.closed, true);
  assert.equal(result.elapsedMs, 200);
});

test('a live owned process is a bounded cleanup failure with diagnostic evidence', async () => {
  const process = {pid:12,parent:1,state:'S',command:'owned browser'};
  const result = await waitForProcessExit([12], () => [process], clock());
  assert.equal(result.closed, false);
  assert.equal(result.elapsedMs, 300);
  assert.deepEqual(result.remainingProcesses, [process]);
});

test('terminated zombies are recorded separately and unrelated live processes are untouched', async () => {
  const zombie = {pid:12,parent:1,state:'Z+',command:'[chrome] <defunct>'};
  const result = await waitForProcessExit([12], () => [zombie,{pid:99,state:'R'}], clock());
  assert.equal(result.closed, true);
  assert.deepEqual(result.exitedAwaitingReap, [zombie]);
  assert.deepEqual(result.remainingProcesses, []);
});

test('unknown process state stays live and snapshot failure is not accepted', async () => {
  assert.equal((await waitForProcessExit([12], () => [{pid:12}], clock())).closed, false);
  await assert.rejects(waitForProcessExit([12], () => { throw new Error('ps unavailable'); }, clock()), /ps unavailable/);
});
