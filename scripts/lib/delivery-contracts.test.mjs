import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { variants, selectVariants } from '../browser-runtime.mjs';

test('desktop delivery selection supports declared themes and rejects old/unknown variants', () => {
  assert.equal(variants.length, 2);
  assert.ok(variants.every(variant => variant.width === 1100 && !variant.mobile));
  assert.deepEqual(selectVariants('dark-desktop').map(variant => variant.theme), ['dark']);
  assert.throws(() => selectVariants('light-mobile'), /unknown variant/);
  assert.throws(() => selectVariants('light-desktop,unknown'), /unknown variant/);
});
test('invalid browser audit selection fails before launch', () => {
  const result = spawnSync(process.execPath, ['scripts/audit.mjs', '--only', 'dark-mobile'], { encoding: 'utf8' });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /unknown variant/);
  assert.doesNotMatch(result.stdout, /browser|audit report/i);
});

test('retired date proof fails before taking a preview port', () => {
  const result = spawnSync(process.execPath, ['scripts/run-browser-audit.mjs', '--date-range-proof'], { encoding: 'utf8' });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /--date-range-proof is retired/);
  assert.doesNotMatch(result.stdout, /preview /);
});
