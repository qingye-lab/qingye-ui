# Component contract and state-truthfulness repairs

Date: 2026-10-03. Task start: `275d730` with substantial pre-existing, uncommitted changes. Scope: C35–C47 and C61–C66 in the user-assigned components. Acceptance: `design.md` → 设计契约, including NG7.

## Verification observed

Both requested commands passed without changing test timeouts, worker settings or package scripts:

```text
pnpm --filter @qingye/ui typecheck
> @qingye/ui@0.4.0 typecheck
> tsc -p tsconfig.json --noEmit
Exit code: 0; no diagnostics

pnpm --filter @qingye/ui test
> @qingye/ui@0.4.0 test
> vitest run
Test Files  61 passed (61)
     Tests  462 passed (462)
  Start at  07:41:28
  Duration  15.97s
Exit code: 0
```

`pnpm --filter docs typecheck` also passed (exit 0). `pnpm --filter @qingye/ui gen:catalog` passed and generated the current catalog, AI documentation and Registry: 88 components and 6 patterns. The six affected coss-derived components retain their original provenance and have current adapted-source digests; upstream sources were not edited.

These results cover the current shared worktree, including changes and tests from other tasks. They are not an isolated branch or physical-device acceptance claim. Initial file snapshots, logs and current source digests are under `/tmp/qingye-contract-state-20261003/`; retained logs include the unsuccessful first integrated run.

Intermediate failures were preserved and corrected or reproduced successfully:

- An early worker invocation accidentally ran the entire suite during parallel edits: 3 failed / 402 passed. A real TagInput trailing-separator bug was repaired; outdated DataTable and DateTimePicker assertions were corrected.
- A Toolbar callback initially passed an ordinary React event to a Base UI event handler. It now uses public `mergeProps` to provide the real event method; both compile and cancellation regressions pass.
- The first root integrated run reported 5 failed / 457 passed. Four date interactions exceeded the existing 5000 ms timeout under that run's load. The fifth assertion expected a decorative Spinner label that its separately owned task had removed concurrently. The corrected regression verifies the current accessible expression, and the same unmodified full test command subsequently passed all 462 tests. No timeout was increased and no test was deleted.

## Per-finding results

### C35 — non-finite circular progress

`progress-circle.tsx` accepts finite measurements and explicit `null` as different inputs. NaN and either Infinity throw `RangeError`; they cannot render as an indeterminate measurement or announce loading. The application handles its input defect through its normal error boundary.

The ProgressCircle API metadata now documents this input boundary. Added parameterized assertions for all three non-finite cases; existing finite value, min/max, zero and indeterminate assertions remain.

### C36 — rejected files and form validity

`file-upload.tsx` derives invalidity from caller invalid state, rejected picks and reported per-file upload errors. The visible trigger and native input expose `aria-invalid` and linked descriptions. Native `setCustomValidity` rejects submission and focuses the visible trigger. Each file's rejection persists until that file is accepted or its rejection is explicitly dismissed; dismissing preserves a usable focus destination.

FileUpload metadata describes the combined validity contract. The original rejection test now verifies invalidity, accessible descriptions and native `customError`; added tests cover both variants, focus, explicit dismissal and accepting one file without clearing another file's error.

### C37 — NumberField naming reaches the input

`number-field.tsx` no longer generates an empty `aria-labelledby`. A real supplied association is retained; an explicit input `aria-label` replaces inherited associations by omitting the attribute. An ordinary Field label remains associated when no explicit input name replaces it.

Metadata clarifies where the name lands. Existing override tests remain, with additional actual-DOM omission checks and a test proving a real labelledby relationship still takes precedence when both naming methods are supplied.

### C38 / C47 — assertive versus persistent Alert

`alert.tsx` defaults to a persistent inline callout (`persistent=true`, `role=note`). A transient error/destructive message (`persistent=false`) uses `alert`; the other transient variants use polite `status`. Applications may explicitly choose the native role for their actual urgency.

The old metadata described a persistent inline object while hardcoding an assertive announcement. The API and guidance now describe persistence and urgency separately. The existing part/role assertion changed from `alert` to `note`; added tests cover every variant, transient errors and explicit role override.

### C39 — Timeline states have text and shapes

`timeline.tsx` supplies localized text for each non-default status; `statusLabel` allows application-specific wording. That text is outside the hidden visual subtree. Status dots use distinct symbols, and custom icon/avatar markers receive a status symbol as well, so colour is not the sole visual distinction. The default neutral marker does not invent a task state.

Timeline metadata now documents the status text and symbols. The original assertion that the whole marker is hidden now checks that only its visual subtree is hidden and that the status text is exposed. New assertions cover distinct shapes, multiple state names and a custom status label.

### C40 — upload failure and recovery

Added FileUpload `onRetry` / `retryLabel`; the per-file retry button has `type=button`, respects disabling and retains the file and error until the application supplies changed state. Error rows are explicitly marked as errors and participate in control invalidity. The progress demo now uses the public recovery API.

**Premise correction:** the supplied task baseline already suppressed the percentage and progressbar when `getError` returned a visible error. This was not reimplemented as a new fix. A regression now proves that even a failed transfer supplied as 100% shows the persistent error, neither percentage nor progressbar, and retry does not submit the form, delete the file or pre-emptively clear the error. Transition back to application-reported indeterminate progress is also tested.

### C41 — attributable TagInput rejections

`tag-input.tsx` retains a separate rejected value/reason record for every pending rejected tag. Rejecting another value does not overwrite earlier reasons. Editing, accepting or explicitly discarding one draft removes its own error; removal of an accepted tag does not clear pending rejections. A trailing separator is preserved after a rejected comma commit, preventing later typing from merging into that rejected value.

TagInput metadata explains error ownership. The old generic validation assertion now requires `周屹: 不是有效的邮箱地址` and verifies the input's accessible description. New tests cover three failures, repeat rejection, independent editing/discard, accepted-tag removal and limits per tag.

### C42 — Spinner/Button are separately owned

This task did not edit `spinner.tsx` or `button.tsx`.

**Premise correction:** `aria-hidden` does not itself overwrite a translated label; it removes the icon from the accessible tree. A decorative Spinner within a busy Button should not add an independent name or announcement: Button preserves its action name and supplies `aria-busy`. This was observed in the starting source and DOM tests.

During execution, the separate Spinner task changed its source and tests. The current Spinner explicitly removes role and naming attributes when hidden and exposes a localized waiting status when standalone. The final regression checks the standalone status, hidden decorative indicator, empty accessible name, no duplicated status, and busy Button's preserved action name. Those separately authored source changes were preserved.

### C43 — consistent date read-only and Escape

DatePicker, DateRangePicker and DateTimePicker now share focusable read-only value displays, visible localized markers and accessible descriptions. Read-only prevents opening, editing and clearing while preserving named hidden form values; native disabled controls remain a distinct state. Changing an open picker to read-only closes the editing surface without losing its committed value.

**Premise correction:** DateTimePicker did not offer rollback of emitted changes at task start. Its source emitted date/time edits immediately, and its metadata already said Done/Escape only closed the popup. The common contract preserves immediate complete-value emission. Escape closes local UI and only discards DateRangePicker's incomplete anchor; it cannot undo previously emitted values. Transaction drafts and save/cancel decisions remain application-owned. All three metadata files state this consistently.

The old DateTimePicker test expected unsupported `aria-readonly` on a button. It now checks the real accessible description and `data-readonly`, and rejects that unsupported attribute. Added tests exercise all three controls' focus, value, form submission and blocked editing, open-to-read-only transition, and Escape retaining emitted edits. Existing incomplete-range discard tests remain.

### C44 — read-only Input and Textarea are identifiable

Input and Textarea retain native read-only semantics, focus, copyable values and form submission. Their default wrappers expose `data-readonly` and display a localized persistent read-only marker with distinct border/surface styling. Values are not dimmed as disabled values. In explicit `unstyled` compositions, native semantics and the structural state hook remain; the consumer supplies its visible treatment.

Both API pages document this distinction. New tests verify Base UI and native Input modes, English Textarea, blocked typing, focus, retained submitted values, editable alternate path and unstyled state hooks.

### C45 — server response identity and unknown results

DataTable adds application-owned `request: { queryKey, dataQueryKey?, status }`. Only matching successful responses are confirmed. Mismatching rows and totals are excluded; they cannot publish current `aria-sort`, clamp the current page or announce a confirmed empty result. Unidentified server rows remain usable but visibly unconfirmed. Unknown outcomes are neither busy requests nor empty results. Refreshing the same query retains the row editor, its draft and focus.

Metadata specifies query generations, same-query retry versions, cancellation and late-response guards. The server demo uses both AbortController and an active-generation guard; transport cancellation does not claim backend cancellation. The cross-page selection demo attaches a matching identity to its synchronous page data.

The original server page-count assertion now supplies a matching response identity before verifying its page summary. Added tests submit an out-of-order response and false total, confirm their suppression and no pagination callback, cover identity absence/unknown status and preserve a same-query editor. Real request and response identities remain application-owned; the library does not start network requests or infer freshness from array identity.

### C46 — loading Toast reaches a truthful deadline

Toast and AnchoredToast providers accept `loadingTimeout` (default 30000 ms, valid range 1–2147483647). An overdue loading episode becomes persistent `unknown`, stops the spinner, retains its original task identity/context and recovery action, and receives no success animation. A subsequent update or Promise result can still settle that same id. Reconciliation checks the latest store snapshot so a real result and deadline in one batch preserve the real result.

The metadata distinguishes waiting, known results and unknown outcomes, describes both providers and manual result timeouts, and states NG7 explicitly. Toast examples retain key results on the page; a completed firmware upload now claims upload completion rather than device upgrade completion. Closing or hiding a notification cannot be used as the sole record of a critical outcome.

Added assertions cover expiry, persistence, recovery, real late settlement, completed-before-deadline protection, same-batch races, anchored behavior and native timer overflow. Existing add/update/close/Promise tests remain.

### C61 — current step belongs to the sequence item

Steps sets `aria-current=step` on the ordered-list item in both static and interactive modes. Its inner button no longer duplicates that state. The existing clickable-step assertion now verifies the parent list item and the absence of duplicate button state; existing arrow navigation and disabled-step tests remain.

**Premise correction:** the starting inner button did carry the global `aria-current` attribute. The claim that neither element exposed it was not supported by the actual starting DOM. The repair makes its sequence ownership consistent.

### C62 — reachable Resizable bounds

Resizable derives minimum and maximum layouts from its existing constraint solver, and Home/End commit those exact layouts. ARIA advertises actual reachable endpoints rather than each panel's unconstrained configured limits. Collapsed positions and fractional percentages remain exact.

Metadata now states whole-group constraints. Added tests verify a configured 0–100 range constrained to 30–65 by its neighbour, a reachable collapsed minimum of 5, and exact 20.25–74.25 endpoints. Existing pointer, arrow, collapse and inert-panel tests remain.

### C63 — Tree does not depend on `data-id` for entry

Tree obtains node identity from its registered elements. Home/End can enter from the tree root, and navigation works when the item has no `data-id`; nested controls retain their own keys.

New assertions remove the attribute and exercise End, Home and ArrowDown, enter from the root, and protect nested field behavior. Focus recovery also uses registered identity, preserving selection ownership.

### C64 — Chinese IME typeahead

Tree resets interim typeahead at composition start, ignores composing keydown events, and consumes the full committed `compositionend.data`. It moves focus without pretending that selection changed. Metadata now describes composed text.

Tests commit Chinese `青年` after interim Latin/key events, assert the correct node receives focus and selection does not change, and ensure nested text fields keep their composition events. This is synthetic composition evidence, not physical IME acceptance.

### C65 — Carousel focus reveal

Carousel immediately scrolls only its horizontal track to reveal the slide containing the focused link/control, including reverse Tab traversal. It uses instant movement for keyboard focus and leaves nested carousel ownership intact.

**Documentation decision:** the supplied baseline already claimed Tab reaching the track and links/controls within slides, not every plain slide container. That is appropriate for ordinary noninteractive content. The missing implementation was focus reveal; it is now implemented, and the metadata clarifies both the behavior and the absence of extra container Tab stops. No supported keyboard behavior was removed.

A Tab/Shift+Tab regression walks offscreen slide links/buttons and checks exact immediate scrolling. Existing track arrow, nested-control arrow and boundary tests remain. Actual browser scroll-snap/RTL behavior remains UNVERIFIED.

### C66 — Toolbar Home/End

Installed Base UI 1.7.0 `toolbar/root/ToolbarRoot.mjs` does not pass `enableHomeAndEndKeys`; `internals/composite/root/useCompositeRoot.mjs` defaults it to false. The existing documentation's Home/End promise was therefore not implemented by the dependency.

The wrapper now implements that promise. It preserves Base UI roving focus, skips nonfocusable/hidden endpoints, retains discoverable disabled endpoints, leaves editable-field caret keys alone and respects caller cancellation. A dedicated marker survives data-slot changes and public Button/MenuTrigger composition. Targeted capture allows navigation away from Base UI's focusable disabled buttons; public `mergeProps` supplies the real Base UI cancellation method.

Metadata clarifies input behavior without removing the promise. New tests verify both endpoints, the single roving Tab stop, grouping, disabled reachability/exit, caller cancellation, real event methods, hidden exclusions and public render composition.

## Ownership, visual changes and remaining gaps

The starting worktree was snapshotted and preserved. This task made incremental changes to its assigned components, associated metadata/tests/demos, locale keys, six derived-source records and generated public artifacts. No reset, stash, bulk restore, commit, deployment or release was performed. Changes to tokens, Spinner and Button visible in the final worktree belong to pre-existing or concurrent tasks; this task did not modify their source.

Visual baseline changes are explicit: read-only Input/Textarea and date controls gain visible state markers/treatment; Timeline replaces coloured-only status dots with state symbols and adds symbols to custom markers; FileUpload gains per-file retry/dismissal actions; overdue Toasts replace their spinner with an unknown result. These changes are not presented as invisible refactoring.

**UNVERIFIED:** actual screen-reader announcements, real foreground/background composition, light/dark × desktop/390px screenshots, enlarged text, native browser file-validation focus, physical Chinese IME, touch/pointer behavior, browser scroll-snap and RTL focus scrolling, real upload/server cancellation and task-page persistence in consuming applications. The test output itself reports 826 inherited/runtime colour contexts UNVERIFIED; resolved token-pair checks are not browser computed-style evidence.

Browser ownership checks found active `c67-contrast` and `qingye-w42` sessions belonging to other tasks. No additional browser or server was launched, and those sessions were not navigated, closed or terminated. No task-owned browser/server cleanup remains.

Durable API/state choices and alternatives are recorded in [component-state-contracts.md](../decisions/component-state-contracts.md).
