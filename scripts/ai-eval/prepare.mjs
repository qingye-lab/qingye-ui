import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { args, tasks, harness, runDir, read, json, hash, write, writeJSON, filesUnder, targetFingerprint } from './lib.mjs';

const options = args(), task = tasks[options.task], group = options.group, replicate = Number(options.replicate);
if (!task || !['baseline', 'new', 'selftest'].includes(group) || ![1, 2, 3].includes(replicate)) throw new Error('--task t01..t04 --group baseline|new --replicate 1|2|3 required');
const directory = runDir(options.id);
if (existsSync(directory)) throw new Error('Run directory exists; never overwrite a trial');
const starter = resolve(harness, 'tasks', task.directory);
const materials = resolve(options.materials ?? resolve(harness, 'materials', group, options.task));
if (group !== 'selftest') {
  if (!existsSync(resolve(materials, 'manifest.json'))) throw new Error('Freeze materials before preparing runs');
  if (json(resolve(materials, 'manifest.json')).group !== group) throw new Error('Material group mismatch');
  if (json(resolve(materials, 'manifest.json')).hashes.targetSource !== targetFingerprint()) throw new Error('Target UI source differs from frozen materials; start a new batch');
}
for (const file of [...task.files, ...task.fixed ?? []]) write(resolve(directory, 'work', file), read(resolve(starter, file)));
write(resolve(directory, 'input/task.md'), read(resolve(starter, 'task.md')));
if (group !== 'selftest') for (const file of filesUnder(materials)) { if (file.symlink) throw new Error('Material symlink is forbidden'); write(resolve(directory, 'materials', file.path), read(resolve(materials, file.path))); }
const manifest = { schemaVersion: 1, id: options.id, group, task: options.task, replicate, model: 'gpt-6.1-sol', reasoningEffort: 'xhigh', preparedAt: new Date().toISOString(), budget: { tokens: options['budget-tokens'] ? Number(options['budget-tokens']) : null, seconds: options['budget-seconds'] ? Number(options['budget-seconds']) : null, enforcement: 'Independent root runner; this harness does not invoke models' }, permittedFiles: [...task.files, 'report.md'], fixedFiles: task.fixed ?? [], originalFiles: filesUnder(resolve(directory, 'work')), materialFiles: filesUnder(resolve(directory, 'materials')), taskSHA256: hash(read(resolve(starter, 'task.md'))), fixtureSHA256: hash(JSON.stringify(filesUnder(starter))), targetSourceSHA256: targetFingerprint(), targetVersion: group === 'selftest' ? null : json(resolve(materials, 'manifest.json')).targetVersion };
writeJSON(resolve(directory, 'manifest.json'), manifest);
const prompt = `你是一次独立受限实现试验。请实现 ${resolve(directory, 'input/task.md')} 的任务。\n只读该 task.md、${resolve(directory, 'work')} 的骨架及 ${resolve(directory, 'materials')} 内分配资料。只在 ${resolve(directory, 'work')} 写入；可改文件：${manifest.permittedFiles.join('、')}。不要读取仓库其它文件、其他试验、隐藏测试、脚本实现或参考答案；不要启动浏览器、子 agent、模型、网络、Git 操作或安装依赖。不要修改导出类型以躲避合同。\n可以执行可信类型检查：node ${resolve(harness, 'check-types.mjs')} --run ${options.id}。${group === 'new' ? `可查询已构建的当前安装 CLI：node ${resolve(harness, 'tool.mjs')} --run ${options.id} --subject <${task.subjects.join('|')}>。命令实现不属于可读资料。` : '本组不提供 Qingye CLI；使用已分配 README/catalog。'}\n真实目标组件版本在两组相同。完成代码、类型检查、report.md 后结束。隐藏断言由独立评估者稍后运行，不可获取。遇到资料不足，应在现有范围作可运行实现并明确边界，不请求改变任务范围。\n`;
write(resolve(directory, 'prompt.txt'), prompt);
console.log(JSON.stringify({ run: options.id, prompt: resolve(directory, 'prompt.txt'), work: resolve(directory, 'work'), manifest: resolve(directory, 'manifest.json') }, null, 2));
