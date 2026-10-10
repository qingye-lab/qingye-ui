# Component state contracts

Status: accepted within the 2026-10-03 contract/state defect task.

## Context

`design.md` requires names to match observed facts, application ownership of asynchronous results and drafts, accessible state expression, and persistent access to critical consequences (NG7). The component library renders application state; it cannot determine that a request succeeded, failed or was cancelled on the server.

## Evidence

The starting checkout (`275d730` plus existing local changes) treated non-finite circular progress as indeterminate; every Alert used an assertive role; date read-only support differed; manual DataTable rows had no response identity; loading Toasts had no finite display deadline. Current callers include the component playgrounds, server DataTable demos, and the FileUpload retry demo. DateTimePicker already committed edits immediately, so Escape was never a rollback mechanism.

## Decision

- ProgressCircle accepts finite measurements and explicit `null` for indeterminate progress. Non-finite input throws `RangeError`; applications handle input defects through their normal error boundary rather than receiving a false loading state.
- Alert is a persistent inline callout by default (`persistent=true`, `role=note`). A transient message (`persistent=false`) uses `alert` only for error/destructive variants and `status` otherwise. Explicit native `role` remains available for application-specific urgency.
- All three date controls use focusable read-only value displays, block opening, editing and clearing, and retain named hidden form values. Selection commits immediately when a date, date-time edit or complete range is emitted. Escape closes the local popup and discards an incomplete range anchor; it cannot undo an emitted value. Transaction drafts and cancellation belong to applications.
- Manual/server DataTable results carry application-owned `request.queryKey`, `request.dataQueryKey` and `request.status`. Only a matching successful response is confirmed. Mismatching data and totals are suppressed; unidentified results remain explicitly unconfirmed. Only confirmed successful results can clamp pagination. Applications abort old transports and reject obsolete responses by generation; aborting transport does not prove backend cancellation.
- **Superseded 2026-10-10 (user ruling: Toast does not infer):** the deadline below is removed. A notice presents only the type the application gives it; deadlines and deciding when a result counts as unknown belong to the application.
- (Historical) Each loading Toast has a finite provider deadline (`loadingTimeout`, default 30000 ms). Expiry replaces the spinner with persistent `unknown`, retaining the task title, context and recovery action. A subsequent real result may settle the same id. The deadline does not abort a task or infer failure. Notifications can still be closed or hidden by stack limits, so applications must retain critical results, unknown states and recovery on their task page.
- FileUpload and TagInput rejection messages retain rejected object identity. Retry requests do not clear application-owned upload errors before the application publishes a changed state.

## Alternatives considered

Treating NaN as missing data, asserting all callouts, inferring result freshness from array changes, or declaring timeout to be failure would repeat the incorrect claims. Adding library-owned network requests or rollback drafts would move application state into the wrong boundary. Removing documented keyboard navigation would preserve the bugs; Carousel focus reveal and Toolbar Home/End are implemented instead.

## Consequences

Alert's default announcement behavior changes. Read-only inputs gain visible labels and distinct surfaces/borders. Timeline status dots gain distinct symbols and accessible text; custom markers gain a status symbol. Server DataTable callers must provide identities to show confirmed summaries and sorting. Applications manually settling persistent Toasts set the desired result timeout explicitly.

No persisted business data, dependency or deployment changes are needed. Existing locale overrides receive additional message keys in the public locale type.

## Verification

Regression assertions cover actual DOM naming and descriptions, native form validity/submission, rejection attribution, request generation mismatch and pagination protection, deadline-to-unknown transitions and late real results, plus keyboard navigation. The execution report records exact integrated commands/results and separates jsdom evidence from browser/device/assistive-technology acceptance.

## Revisit when

Revisit if an application needs transactional date editing, requests need a shared public adapter, toast ownership spans providers, or Base UI changes its native Toolbar Home/End support. These changes require evidence of real consumers and explicit ownership; they are not inferred from visual styling.
