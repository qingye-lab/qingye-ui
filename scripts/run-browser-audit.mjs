// Run audit against built docs, owning only the preview server started here.
import { spawn, execFileSync } from 'node:child_process';
import { createServer } from 'node:net';
import { fileURLToPath } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';

const root = fileURLToPath(new URL('../', import.meta.url));
const port = Number(process.env.UI_AUDIT_PORT ?? 5181);
if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error('invalid UI_AUDIT_PORT');
const base = `http://127.0.0.1:${port}`;
const args = process.argv.slice(2);
const fixture = args.includes('--fixture-overflow');
const foundations = args.includes('--foundations');
if (fixture && foundations) throw new Error('overflow fixture is only supported by audit');
const auditArgs = args.filter((arg) => !['--fixture-overflow', '--foundations'].includes(arg));
const members = (group) => execFileSync('ps', ['-axo', 'pid=,ppid=,pgid='], { encoding: 'utf8' })
  .trim().split('\n').map((line) => line.trim().split(/\s+/).map(Number))
  .filter((entry) => entry[2] === group);

// Refuse an occupied port rather than accidentally auditing or closing somebody
// else's server. The server itself also uses Vite's strictPort safeguard.
await new Promise((resolve, reject) => {
  const reservation = createServer();
  reservation.once('error', reject);
  reservation.listen(port, '127.0.0.1', () => reservation.close(resolve));
});
let audit;
const preview = spawn('pnpm', ['--filter', 'docs', 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'], {
  cwd: root, detached: true, stdio: ['ignore', 'pipe', 'pipe'],
});
preview.stdout.pipe(process.stdout); preview.stderr.pipe(process.stderr);
let previewFailure;
const previewExited = new Promise((resolve) => {
  preview.once('error', (error) => { previewFailure = error; resolve({ error: error.message }); });
  preview.once('exit', (code, signal) => resolve({ code, signal }));
});
const started = Date.now();
let interrupted = false;
const interrupt = () => { interrupted = true; audit?.kill('SIGTERM'); };
process.on('SIGINT', interrupt); process.on('SIGTERM', interrupt);
console.log(`preview ${JSON.stringify({ pid: preview.pid, parent: process.pid, processGroup: preview.pid, base })}`);
let failure;
try {
  let ready = false;
  const deadline = Date.now() + 30000;
  while (Date.now() < deadline) {
    if (interrupted) throw new Error('audit runner interrupted before ready');
    if (previewFailure || preview.exitCode !== null || preview.signalCode !== null) throw new Error(`preview exited before ready: ${JSON.stringify(await previewExited)}`);
    try {
      const response = await fetch(base, { signal: AbortSignal.timeout(1000) });
      const html = await response.text();
      const asset = html.match(/<script[^>]+src="([^"]+)"/);
      if (response.ok && html.includes('id="root"') && asset) {
        const javascript = await fetch(new URL(asset[1], base), { signal: AbortSignal.timeout(1000) });
        if (javascript.ok) { ready = true; break; }
      }
    } catch {}
    await delay(250);
  }
  if (!ready) throw new Error('preview readiness timed out after 30s');
  if (interrupted) throw new Error('audit runner interrupted before audit');
  console.log(`preview ready after ${Date.now() - started}ms`);
  audit = spawn(process.execPath, [fileURLToPath(new URL(foundations ? './verify-ui-foundations.mjs' : './audit.mjs', import.meta.url)), ...auditArgs], {
    cwd: root,
    env: { ...process.env, DOCS_URL: base, ...(fixture ? { AUDIT_FIXTURE_OVERFLOW: '1' } : {}) },
    stdio: 'inherit',
  });
  const status = await new Promise((resolve, reject) => {
    audit.once('error', reject);
    audit.once('exit', (code, signal) => resolve({ code, signal }));
  });
  if (status.code !== 0) throw new Error(`browser audit failed: ${JSON.stringify(status)}`);
} catch (error) {
  failure = error;
} finally {
  try {
    if (preview.pid && members(preview.pid).length) {
      process.kill(-preview.pid, 'SIGTERM');
      for (let attempt = 0; attempt < 20 && members(preview.pid).length; attempt++) await delay(250);
      if (members(preview.pid).length) {
        // This exact process group was created by this invocation; never use
        // process-name matching or act on the user's existing dev server.
        process.kill(-preview.pid, 'SIGKILL');
        await delay(250);
      }
      if (members(preview.pid).length) throw new Error('owned preview process group remains after cleanup');
    }
    console.log(`preview cleanup ${JSON.stringify({ pid: preview.pid, closed: true, elapsedMs: Date.now() - started })}`);
  } catch (error) {
    failure = failure ? new AggregateError([failure, error], `${failure.message}; ${error.message}`) : error;
  }
  process.off('SIGINT', interrupt); process.off('SIGTERM', interrupt);
}
if (failure) { console.error(failure.message); process.exitCode = 1; }
