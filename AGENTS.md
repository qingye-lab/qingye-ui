# Working in this repository

`@yanqing/ui` is a React component library (Base UI + Tailwind CSS 4) adapted from coss ui (MIT), plus locally authored components, and its documentation site.

## Layout

- `packages/ui/src/components/<name>.tsx` — one component per file.
- `packages/ui/tokens/*.css`, `theme.css`, `motion.css`, `utilities.css`, `styles.css` — tokens and global CSS.
- `packages/ui/upstream/` — unmodified coss sources, the baseline for diffs. Never edit.
- `packages/ui/coss-source.json` — upstream SHA and the list of local adaptations per coss file.
- `packages/ui/test/*.test.tsx` — Vitest + Testing Library.
- `apps/docs/src/content/<name>/meta.ts` and `demos/NN-<id>.tsx` — documentation per component (see `apps/docs/src/lib/types.ts`).

## Rules

- Follow `STANDARDS.md` for every component change.
- Keep coss components close to upstream; change them only to fix a defect or meet `STANDARDS.md`, and record each change in `coss-source.json`.
- New built-in strings go through `useUILocale()`; add keys to both `src/locale.tsx` and `src/locales/en-US.ts`.
- Run `pnpm --filter @yanqing/ui gen:index` after adding or removing a component file.

## Commands

- `pnpm dev` — docs site at http://localhost:5180 (`/playground/<name>` shows one component's demos bare).
- `node scripts/shot.mjs <name>` — light/dark × desktop/mobile screenshots of the playground into /tmp/yq-shots.
- `pnpm --filter @yanqing/ui typecheck` / `test` / `build`; `pnpm --filter docs typecheck`.
