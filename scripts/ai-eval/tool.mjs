import { resolve } from 'node:path';
import { args, tasks, root, ui, harness, runDir, json, logTool, runCommand, hash, read } from './lib.mjs';
const options = args(), directory = runDir(options.run), manifest = json(resolve(directory, 'manifest.json'));
if (manifest.group !== 'new' || !tasks[manifest.task].subjects.includes(options.subject)) throw new Error('Only assigned new-material CLI docs subjects are available');
const materialManifest = json(resolve(directory, 'materials/manifest.json'));
logTool(directory, `docs ${options.subject}`);
// Once documentation is regenerated, return the output captured by the real CLI
// at freeze time. Do not silently change an in-progress trial's information.
if (materialManifest.hashes.catalog !== hash(read(resolve(ui, 'catalog.json')))) {
  process.stdout.write(read(resolve(directory, 'materials', `cli-docs-${options.subject}.json`))); process.exit(0);
}
const result = runCommand(process.execPath, [resolve(root, 'packages/tooling/bin/qingye-ui.mjs'), 'docs', options.subject, '--project', materialManifest.cliProject, '--json']);
process.stdout.write(result.stdout); process.stderr.write(result.stderr); process.exitCode = result.exitCode ?? 2;
