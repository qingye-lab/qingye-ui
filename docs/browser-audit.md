# Browser audit gate

`node scripts/audit.mjs --report report.json` scans all 88 playgrounds in four serial light/dark desktop/mobile variants. Nonzero exit means page/console errors, page overflow, empty demos, internal overflow, invalid intent declarations, or a harness/cleanup failure. Unknown variants, flags and missing flag values fail before launch.

The detector keeps the existing 2 CSS-pixel boundary threshold. For stable layout measurement, it temporarily fixes only an isolated infinite pure full-turn rotation at its identity start: positive duration, zero delay/iterationStart, replace effect, rotation-only keyframes, no competing effect, and an actual identity transform/rotate check. It restores the original animation time/playback afterward. Mixed translate/scale/opacity effects and static transforms remain measured as rendered. The complete rotation cycle is not a paint-containment acceptance check. Normalized animation keyframes/timing/before-and-measured transforms are recorded in the report. It measures content boxes including borders/padding, compensates computed negative margins, rounds coordinates to device pixels, and walks through display:contents or strict 0×0 visible-overflow sizing wrappers to the nearest real box. It never skips an entire SVG or component. Intentional scroll/hidden containers retain the prior treatment.

Only `data-audit-overflow-inline="1em"` on a text leaf centered by a zero-width flex-column anchor declares the reviewed Slider label intent. It budgets at most that leaf's computed font-size on each inline edge. Unknown values or different structures fail validation. The declaration does not exempt page overflow or overflow beyond its budget.

`node scripts/test-audit.mjs` verifies 23 browser fixtures, including 2px rotated intent, real 3px overflow, negative margins, borders, display:contents, 0×0 wrappers and 2000px overflow beyond the finite declaration. Dedicated fixtures cover 32px pure rotation, rotating 2000px overflow, static translation/scale and mixed translation animation. Task 1 evidence is saved under `test-results/ui-audit-task1/`. The full final scan measured 352 pages with no findings; earlier raw findings and classification remain preserved.

CI builds docs, installs managed Playwright Chromium, then runs `node scripts/run-browser-audit.mjs --report test-results/ci-audit/report.json`. This runner owns a strict-port Vite preview on 127.0.0.1:5181, waits for the built HTML and JS asset, propagates audit failure, and closes only its own preview process group. Audit uses one browser and one active tab, closes through finally and SIGINT/SIGTERM handlers, and verifies its owned process tree exited. `UI_AUDIT_PORT` selects another free port. The runner refuses occupied ports and never adopts an unrelated server.

Gate failure can be proved without editing a demo:

```sh
node scripts/run-browser-audit.mjs button --only light-desktop --fixture-overflow --report test-results/ci-audit/failure.json
```

The explicit flag inserts a 2000px element after render through `AUDIT_FIXTURE_OVERFLOW=1`; normal runs do not modify the page. Local built-preview success returned 0, injected overflow returned 1 (page 1106px/internal 1312px), and SIGTERM interruption returned 1. All three closed their browser and preview; JSON/logs/receipt are in `test-results/ci-audit/`. Actual GitHub CI and the tag-triggered Release workflow are **NOT_RUN** at this checkpoint. Release runs the same built-preview browser audit before pack/create, so a finding prevents release creation. No tag or release was created for this local validation.

This macOS host's managed Chromium153 exited around30s without an identified cause. Local browser evidence explicitly used `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'` (154.0.8037.58). The Ubuntu workflow uses its installed managed Chromium; the local workaround is not an assertion about CI runtime.

## Actual GitHub gate proof

The Ubuntu run [36879986837](https://github.com/qingye-lab/qingye-ui/actions/runs/36879986837) executed the injected overflow audit after successful typecheck/tests/build/install. The report contains page overflow1106px and internal overflow1312px; audit returned1, Pack was skipped, and browser/preview both closed. The audit measured2000ms; runner3658ms; full job589s, including419s installing system/browser dependencies. See `docs/baseline/2026-10-01-ci-gate-failure/receipt.json`. The final workflow removes injection and restores88×4; its observed result is attached to the current verify check on [PR1](https://github.com/qingye-lab/qingye-ui/pull/1). The tag-triggered Release execution remains NOT_RUN.
