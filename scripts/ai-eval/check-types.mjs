import { args, runDir, compile, logTool } from './lib.mjs';
const options = args(), directory = runDir(options.run);
logTool(directory, 'check-types');
const result = compile(directory);
console.log(JSON.stringify(result, null, 2));
process.exitCode = result.status === 'PASS' ? 0 : 1;
