/*
 * The type ramp's step names, in one place.
 *
 * Three consumers need this exact list and they drift apart silently when it
 * is copied:
 *
 *   css     `cn()` — tailwind-merge has to know each step is a font-size
 *           utility, or `cn("text-caption-strong", "text-muted-foreground")`
 *           reads the two as the same group and drops the size.
 *   build   `scripts/build.mjs` — the precompiled stylesheet pins every step
 *           so a step no component happens to use still ships to consumers
 *           who do not run Tailwind.
 *
 * A step missing from `css` drops the size at runtime; a step missing from
 * `build` is absent from `@qingye_lab/ui/ui.css`. Both are quiet. Add a step here
 * and both follow.
 *
 * Ordering does not matter; names must match `--text-<name>` in theme.css and
 * `--qy-text-<name>-size` in tokens/components.css.
 */
export const TEXT_STEPS = [
  // Content semantics from foundation §8, including derived companions.
  "display-xl",
  "display-lg",
  "display",
  "title",
  "chapter",
  "heading",
  "body",
  "body-strong",
  "reading",
  "prose",
  "prose-strong",
  "prose-h1",
  "prose-h2",
  "prose-h3",
  "support",
  "support-mobile",
  "support-strong",
  "support-strong-mobile",
  "dense",
  "dense-mobile",
  "dense-strong",
  "dense-strong-mobile",
  "caption",
  "caption-strong",
  "label",
  "metric",
  "micro",
  // Control geometry is independent of content hierarchy (§8 control table).
  "control-xs",
  "control-xs-mobile",
  "control-sm",
  "control-sm-mobile",
  "control-md",
  "control-md-mobile",
  "control-lg",
  "control-lg-mobile",
  "control-xl",
  "control-xl-mobile",
] as const;

export type TextStep = (typeof TEXT_STEPS)[number];
