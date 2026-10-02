# Qingye Theme Studio

The local application uses the shared `@qingye/tooling` service, actual library components and two independent iframe documents. Visual finalization is deferred; Azure and Amber are synthetic integration fixtures, not an approved default redesign.

```sh
pnpm --filter @qingye/tooling build
QINGYE_STUDIO_PROJECTS='/absolute/app-a,/absolute/app-b' pnpm --filter @qingye/studio dev
```

Open `http://127.0.0.1:5181`. Projects are registered only at service startup. With no explicit projects, no project can be read or written. A built preview keeps the same service boundary:

```sh
pnpm --filter @qingye/studio build
QINGYE_STUDIO_PROJECTS='/absolute/app-a,/absolute/app-b' pnpm --filter @qingye/studio exec vite preview --host 127.0.0.1 --port 5181
```

The two fixture paths are `apps/studio/fixtures/azure` and `apps/studio/fixtures/amber`. If copying them outside the workspace for acceptance, link/install the intended actual `@qingye/ui` package into that explicit copy; module lookup must not be replaced with an implicit workspace fallback. Adjust its read-only ledger/root references explicitly when the copy changes location.

The local API accepts fixed project IDs, not arbitrary request paths. All requests require a loopback Host; cross-origin requests are refused. Mutations require same-origin `Origin`, JSON, a service session token, bounded request size and source fingerprints. Responses disable caching. Tokens and local paths stay in this local application; no account, remote model or telemetry is used.

Studio's Vite build uses this workspace's installed UI source. Preview metadata states that version/source, its catalog hash and source/style hash. Production builds emit `preview-source.json`; the preview service uses that build snapshot, so later on-disk source changes cannot masquerade as the already-built bundle. The selected project's version, catalog and source hash must all match before previews or Studio apply are enabled; the server rechecks before apply. A same-version but different catalog or component source is also unsupported. CLI source operations remain available separately. This prevents the current Studio from impersonating an arbitrary old package version.

The editor supports registered overrides, import/export, a validated candidate diff, guarded apply, reset of unapplied work and reread after an external edit. Basic parameters are brand paint pairing, preview light/dark, preview standard/compact, control height, control radius and panel radius. Advanced fields come from the installed token registry; their impact is limited to the existing ledger's mapped/measured parts. No slider changes authorization or business save strategy.

Each iframe mounts its own `ThemeProvider` with `storageKey={null}` and its own Toast manager. Messages update brand, chosen brightness mode, density and generated CSS without remounting the preview task. Drafts, query, object selection, simulated outcome and open state belong to that iframe. Previews cover real Button/Input, InputGroup, an edit form with failure recovery, a selected collection, reading and Menu/Select/Dialog/Toast portals. Simulated results are explicitly labeled and never write business data.

“影响” reads the existing static/runtime ledger. Element inspection uses actual `data-slot` markers; no marker/mapping is unknown ownership. The current project report uses the shared scanner, and the multi-project panel reads existing reports without starting scans. Missing/stale evidence remains `UNVERIFIED/NOT_RUN`.

```sh
pnpm --filter @qingye/studio typecheck
pnpm --filter @qingye/studio test
pnpm --filter @qingye/studio build
```

The service tests use one task-owned HTTP server and close it after each test. Browser lifecycle belongs to the root task's single browser owner. Browser/Portal/focus/scroll, actual computed token effects, physical touch/IME/screen reader and human visual acceptance require their own evidence; build or service success cannot stand in for them.
