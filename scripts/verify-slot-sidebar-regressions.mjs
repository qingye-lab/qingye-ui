// Requires the docs development server; owns one browser, context and page.
import assert from 'node:assert/strict';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { withBrowser, closeWithTimeout } from './browser-runtime.mjs';
import { runTokenLedgerProbe } from './token-ledger-runtime.mjs';

const base = process.env.DOCS_URL ?? 'http://localhost:5180';
const onlyLedger = process.argv.includes('--ledger-only');
const out = 'test-results/slot-sidebar-regressions';
mkdirSync(out, { recursive: true });
const report = { base, checks: [], errors: [] };
const record = (name, details) => { report.checks.push({ name, details }); console.log(`PASS ${name}`); };
const snapshot = locator => locator.evaluate(node => {
  const s = getComputedStyle(node);
  return { color: s.color, background: s.backgroundColor, transition: s.transitionProperty, duration: s.transitionDuration, slot: node.getAttribute('data-slot') };
});

try {
  await withBrowser(async (browser, lifecycle) => {
    report.lifecycle = lifecycle;
    const context = await browser.newContext({ viewport: { width: 1200, height: 900 }, reducedMotion: 'no-preference' });
    try {
      const page = await context.newPage();
      page.on('pageerror', error => report.errors.push(error.message));
      page.on('console', message => { if (message.type() === 'error') report.errors.push(message.text()); });
      for (const theme of onlyLedger ? [] : ['light', 'dark']) {
        await page.goto(`${base}/playground/sidebar?theme=${theme}`, { waitUntil: 'networkidle' });
        await page.evaluate(async () => {
          const { mountSlotSidebarRegressions } = await import('/test/fixtures/slot-sidebar-regressions.tsx');
          const docsRoot = document.getElementById('root');
          if (docsRoot) docsRoot.style.display = 'none';
          const host = document.createElement('section');
          host.style.cssText = 'position:fixed;inset:0;z-index:0;padding:24px;background:var(--qy-background);overflow:auto';
          document.body.append(host);
          window.slotSidebarRegressions = mountSlotSidebarRegressions(host);
        });
        const current = page.getByTestId('current-link');
        const ordinary = page.getByTestId('ordinary-link');
        const branch = page.getByTestId('branch-trigger');
        await current.waitFor();
        await page.waitForFunction(theme => document.documentElement.classList.contains(theme), theme);
        await page.mouse.move(1100, 850);
        await page.waitForTimeout(500);
        const baseline = await snapshot(current);
        assert.equal(baseline.color, (await snapshot(branch)).color);
        record(`${theme} default current foreground`, baseline);

        const colors = theme === 'light'
          ? { normal: 'rgb(40, 45, 50)', base: 'rgb(250, 250, 250)', hover: 'rgb(20, 80, 40)', hoverBase: 'rgb(225, 240, 230)' }
          : { normal: 'rgb(210, 215, 220)', base: 'rgb(24, 28, 32)', hover: 'rgb(190, 235, 200)', hoverBase: 'rgb(45, 65, 55)' };
        await page.evaluate(colors => {
          for (const [key, value] of Object.entries({
            '--qy-sidebar': colors.base, '--qy-sidebar-foreground': colors.normal,
            '--qy-sidebar-accent': colors.hoverBase, '--qy-sidebar-accent-foreground': colors.hover,
            '--qy-sidebar-current': 'rgb(20, 80, 120)', '--qy-sidebar-current-foreground': 'rgb(255, 255, 255)',
          })) document.documentElement.style.setProperty(key, value);
        }, colors);
        await page.waitForTimeout(500);
        assert.equal((await snapshot(ordinary)).color, colors.normal);
        assert.equal((await snapshot(current)).color, 'rgb(255, 255, 255)');
        await ordinary.hover();
        await page.waitForTimeout(500);
        assert.equal((await snapshot(ordinary)).color, colors.hover);
        assert.equal((await snapshot(ordinary)).background, colors.hoverBase);
        await current.hover();
        await page.waitForTimeout(500);
        assert.equal((await snapshot(current)).color, 'rgb(255, 255, 255)');
        assert.equal((await snapshot(current)).background, 'rgb(20, 80, 120)');
        // A parent contains the current page but is not itself on the selected surface.
        await branch.hover();
        await page.waitForTimeout(500);
        assert.equal((await snapshot(branch)).color, colors.hover);
        record(`${theme} independent normal/hover/current/current-hover and parent`, { current: await snapshot(current), branch: await snapshot(branch) });
        await page.screenshot({ path: `${out}/${theme}.png` });
        await page.getByTestId('subject-sidebar').getByRole('button', { name: '收起' }).click();
        assert.equal(await branch.getAttribute('data-slot'), 'sidebar-sub-trigger');
        record(`${theme} rail preserves sidebar slot`, await snapshot(branch));
        await page.waitForTimeout(500);
        await page.screenshot({ path: `${out}/${theme}-rail.png` });

        for (const custom of [false, true]) {
          await page.evaluate(custom => window.slotSidebarRegressions.render(custom), custom);
          for (const [entry, role, close, part, backdrop] of [
            ['Open popover', 'dialog', 'Close popover', 'popover-popup', null],
            ['Open dialog', 'dialog', 'Close dialog', 'dialog-popup', 'dialog-backdrop'],
            ['Open alert', 'alertdialog', 'Keep', 'alert-dialog-popup', 'alert-backdrop'],
          ]) {
            const trigger = page.getByRole('button', { name: entry, exact: true });
            await trigger.click();
            const popup = page.getByRole(role);
            await popup.waitFor();
            await page.waitForTimeout(500);
            const before = await snapshot(popup);
            assert.equal(before.slot, custom ? `consumer-${part}` : part);
            assert.ok(before.transition.includes('opacity') && before.transition.includes('scale'));
            assert.ok(before.duration.split(',').some(value => parseFloat(value) > 0));
            if (backdrop) assert.equal((await snapshot(page.getByTestId(backdrop))).transition, 'opacity');
            await page.emulateMedia({ reducedMotion: 'reduce' });
            const reduced = await snapshot(popup);
            assert.ok(!reduced.transition.includes('scale') && !reduced.transition.includes('translate'));
            assert.ok(reduced.transition.includes('opacity'));
            await page.emulateMedia({ reducedMotion: 'no-preference' });
            await page.getByRole('button', { name: close, exact: true }).click();
            await popup.waitFor({ state: 'hidden' });
            assert.ok(await trigger.evaluate(node => node === document.activeElement));
            record(`${theme} ${part} ${custom ? 'custom' : 'default'} slot motion, reduced motion and focus`, { before, reduced });
          }
        }
        await page.evaluate(() => window.slotSidebarRegressions.dispose());
      }
      const ledger = await runTokenLedgerProbe(page, {
        ledger: JSON.parse(readFileSync('docs/token-ledger.json', 'utf8')),
        baseURL: base, probeIds: ['sidebar-current-foreground'],
      });
      const cases = ledger.computation.cases.filter(entry => entry.probeId === 'sidebar-current-foreground');
      assert.equal(cases.length, 2);
      assert.ok(cases.every(entry => entry.status === 'PASS' && entry.observation === 'OBSERVED_CHANGE'));
      record('current foreground token ledger in both themes', cases);
      assert.deepEqual(report.errors, []);
    } finally { await closeWithTimeout(context, 'slot-sidebar context'); }
  });
} finally {
  writeFileSync(`${out}/${onlyLedger ? "ledger-only" : "report"}.json`, `${JSON.stringify(report, null, 2)}\n`);
}
