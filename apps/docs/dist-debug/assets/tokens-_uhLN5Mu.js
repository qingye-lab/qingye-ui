import{j as e,r as l}from"./vendor-react-DkPWdm9N.js";import{B as C,e as A}from"./index-Bp3wbe0b.js";import{u as O}from"./use-media-query-jfNThk6c.js";import{P as V,a as y,A as z,H as q,C as d,c as w}from"./prose-B2iO_-yQ.js";import{R as D,X as I}from"./vendor-CtnXKZlY.js";import"./vendor-base-ui-NEp_fldd.js";import"./alert-CoYoyWt4.js";import"./vendor-date-j_bVFt3w.js";const B=`/*
 * theme.css — the design token entry point.
 *
 *   Layer 1  tokens/primitives.css   raw palette, no meaning
 *   Layer 2  tokens/semantic.css     roles, light + dark
 *   Layer 3  tokens/components.css   type, space, radius, size, density, motion
 *
 * Customise the library by overriding \`--qy-*\` tokens after this file, for
 * example \`:root { --qy-primary: …; --qy-radius: 0.5rem; }\`.
 *
 * The unprefixed shadcn-style variables below (\`--background\`, \`--card\`, …)
 * are a compatibility surface: components and third-party shadcn blocks read
 * them in arbitrary values. They always resolve to the \`--qy-*\` tokens; do not
 * override them directly.
 */
@import "./tokens/primitives.css";
@import "./tokens/semantic.css";
@import "./tokens/components.css";

@layer base {
  :root,
  .light,
  .dark,
  [data-theme] {
    --background: var(--qy-background);
    --foreground: var(--qy-foreground);
    --card: var(--qy-surface);
    --card-foreground: var(--qy-foreground);
    --popover: var(--qy-surface-raised);
    --popover-foreground: var(--qy-foreground);
    --primary: var(--qy-primary);
    --primary-foreground: var(--qy-primary-foreground);
    --secondary: var(--qy-surface-inset);
    --secondary-foreground: var(--qy-foreground);
    --muted: var(--qy-surface-inset);
    --muted-foreground: var(--qy-foreground-muted);
    --accent: var(--qy-accent);
    --accent-foreground: var(--qy-accent-foreground);
    --destructive: var(--qy-danger);
    --destructive-foreground: var(--qy-danger-foreground);
    --info: var(--qy-info);
    --info-foreground: var(--qy-info-foreground);
    --success: var(--qy-success);
    --success-foreground: var(--qy-success-foreground);
    --warning: var(--qy-warning);
    --warning-foreground: var(--qy-warning-foreground);
    --border: var(--qy-border);
    --input: var(--qy-border-input);
    --ring: var(--qy-ring);
    --chart-1: var(--qy-chart-1);
    --chart-2: var(--qy-chart-2);
    --chart-3: var(--qy-chart-3);
    --chart-4: var(--qy-chart-4);
    --chart-5: var(--qy-chart-5);
    --code: var(--qy-code);
    --code-foreground: var(--qy-foreground);
    --code-highlight: var(--qy-code-highlight);
    --sidebar: var(--qy-sidebar);
    --sidebar-foreground: var(--qy-sidebar-foreground);
    --sidebar-border: var(--qy-sidebar-border);
    --sidebar-accent: var(--qy-sidebar-accent);
    --sidebar-accent-foreground: var(--qy-sidebar-accent-foreground);
    --sidebar-primary: var(--qy-sidebar-primary);
    --sidebar-primary-foreground: var(--qy-sidebar-primary-foreground);
    --sidebar-ring: var(--qy-sidebar-ring);
    --radius: var(--qy-radius);
  }
}

/*
 * Tailwind mapping. \`inline\` keeps utilities pointing at the live custom
 * property, so theme switches apply without recompiling.
 */
@theme inline {
  --font-sans: var(--qy-font-sans);
  --font-heading: var(--qy-font-sans);
  --font-mono: var(--qy-font-mono);

  --color-background: var(--qy-background);
  --color-foreground: var(--qy-foreground);
  --color-card: var(--qy-surface);
  --color-card-foreground: var(--qy-foreground);
  --color-popover: var(--qy-surface-raised);
  --color-popover-foreground: var(--qy-foreground);
  --color-primary: var(--qy-primary);
  --color-primary-foreground: var(--qy-primary-foreground);
  --color-secondary: var(--qy-surface-inset);
  --color-secondary-foreground: var(--qy-foreground);
  --color-muted: var(--qy-surface-inset);
  --color-muted-foreground: var(--qy-foreground-muted);
  --color-accent: var(--qy-accent);
  --color-accent-foreground: var(--qy-accent-foreground);
  --color-destructive: var(--qy-danger);
  --color-destructive-foreground: var(--qy-danger-foreground);
  --color-info: var(--qy-info);
  --color-info-foreground: var(--qy-info-foreground);
  --color-success: var(--qy-success);
  --color-success-foreground: var(--qy-success-foreground);
  --color-warning: var(--qy-warning);
  --color-warning-foreground: var(--qy-warning-foreground);
  --color-border: var(--qy-border);
  --color-input: var(--qy-border-input);
  --color-ring: var(--qy-ring);
  --color-overlay: var(--qy-overlay);
  --color-chart-1: var(--qy-chart-1);
  --color-chart-2: var(--qy-chart-2);
  --color-chart-3: var(--qy-chart-3);
  --color-chart-4: var(--qy-chart-4);
  --color-chart-5: var(--qy-chart-5);
  --color-code: var(--qy-code);
  --color-code-foreground: var(--qy-foreground);
  --color-code-highlight: var(--qy-code-highlight);
  --color-sidebar: var(--qy-sidebar);
  --color-sidebar-foreground: var(--qy-sidebar-foreground);
  --color-sidebar-border: var(--qy-sidebar-border);
  --color-sidebar-accent: var(--qy-sidebar-accent);
  --color-sidebar-accent-foreground: var(--qy-sidebar-accent-foreground);
  --color-sidebar-primary: var(--qy-sidebar-primary);
  --color-sidebar-primary-foreground: var(--qy-sidebar-primary-foreground);
  --color-sidebar-ring: var(--qy-sidebar-ring);

  /* Extended roles beyond the shadcn set. */
  --color-surface: var(--qy-surface);
  --color-surface-raised: var(--qy-surface-raised);
  --color-surface-subtle: var(--qy-surface-subtle);
  --color-surface-inset: var(--qy-surface-inset);
  --color-surface-hover: var(--qy-surface-hover);
  --color-surface-active: var(--qy-surface-active);
  --color-foreground-strong: var(--qy-foreground-strong);
  --color-foreground-subtle: var(--qy-foreground-subtle);
  --color-border-subtle: var(--qy-border-subtle);
  --color-border-strong: var(--qy-border-strong);
  --color-danger-soft: var(--qy-danger-soft);
  --color-warning-soft: var(--qy-warning-soft);
  --color-success-soft: var(--qy-success-soft);
  --color-info-soft: var(--qy-info-soft);

  --radius-xs: var(--qy-radius-xs);
  --radius-sm: var(--qy-radius-sm);
  --radius-md: var(--qy-radius-md);
  --radius-lg: var(--qy-radius-lg);
  --radius-xl: var(--qy-radius-xl);
  --radius-2xl: var(--qy-radius-2xl);

  --text-display-lg: var(--qy-text-display-lg-size);
  --text-display-lg--line-height: var(--qy-text-display-lg-leading);
  --text-display-lg--font-weight: var(--qy-weight-semibold);
  --text-display-lg--letter-spacing: var(--qy-text-display-tracking);
  --text-display: var(--qy-text-display-size);
  --text-display--letter-spacing: var(--qy-text-display-tracking);
  --text-display--line-height: var(--qy-text-display-leading);
  --text-title: var(--qy-text-title-size);
  --text-title--letter-spacing: var(--qy-text-title-tracking);
  --text-title--line-height: var(--qy-text-title-leading);
  --text-heading: var(--qy-text-heading-size);
  --text-heading--letter-spacing: var(--qy-text-heading-tracking);
  --text-heading--line-height: var(--qy-text-heading-leading);
  --text-body: var(--qy-text-body-size);
  --text-body--letter-spacing: var(--qy-text-body-tracking);
  --text-body--line-height: var(--qy-text-body-leading);
  --text-label: var(--qy-text-label-size);
  --text-label--letter-spacing: var(--qy-text-label-tracking);
  --text-label--line-height: var(--qy-text-label-leading);
  --text-caption: var(--qy-text-caption-size);
  --text-caption--letter-spacing: var(--qy-text-caption-tracking);
  --text-caption--line-height: var(--qy-text-caption-leading);

  --shadow-panel: var(--qy-shadow-panel);
  --shadow-control: var(--qy-shadow-control);
  --shadow-raised: var(--qy-shadow-raised);
  --shadow-overlay: var(--qy-shadow-overlay);
  --inset-shadow-track: var(--qy-shadow-inset);

  --ease-out: var(--qy-ease-out);
  --ease-in-out: var(--qy-ease-in-out);
  --ease-drawer: var(--qy-ease-drawer);
  --default-transition-duration: var(--qy-duration-fast);
  --default-transition-timing-function: var(--qy-ease-out);

  /* Keyframe animations used by components (from the coss registry). */
  --animate-skeleton: skeleton 2s -1s infinite linear;
  --animate-caret-blink: caret-blink 1s ease-out infinite;
  --animate-toast-success-odd: toast-success-odd 0.32s cubic-bezier(0.5, 1, 0.89, 1);
  --animate-toast-success-even: toast-success-even 0.32s cubic-bezier(0.5, 1, 0.89, 1);
  --animate-toast-error-odd: toast-error-odd 0.28s cubic-bezier(0.5, 1, 0.89, 1);
  --animate-toast-error-even: toast-error-even 0.28s cubic-bezier(0.5, 1, 0.89, 1);

  @keyframes skeleton {
    to {
      background-position: -200% 0;
    }
  }
  @keyframes caret-blink {
    0%,
    70%,
    100% {
      opacity: 1;
    }
    20%,
    50% {
      opacity: 0;
    }
  }
  @keyframes toast-success-odd {
    0% { scale: 1; }
    30% { scale: 1.025; }
    60% { scale: 0.99; }
    100% { scale: 1; }
  }
  @keyframes toast-success-even {
    0% { scale: 1; }
    30% { scale: 1.025; }
    60% { scale: 0.99; }
    100% { scale: 1; }
  }
  @keyframes toast-error-odd {
    0% { translate: 0 0; }
    25% { translate: -3px 0; }
    50% { translate: 3px 0; }
    75% { translate: -3px 0; }
    100% { translate: 0 0; }
  }
  @keyframes toast-error-even {
    0% { translate: 0 0; }
    25% { translate: -3px 0; }
    50% { translate: 3px 0; }
    75% { translate: -3px 0; }
    100% { translate: 0 0; }
  }
}
`,m=`/*
 * Layer 3 — component tokens.
 * Sizes, radii, density and motion that components consume directly.
 * These exist so a consumer can retune the library (denser tables, rounder
 * controls, slower motion) without editing component source.
 */
@layer base {
  :root {
    /* Type ramp. Sizes are paired with line heights and weights. */
    --qy-font-sans: "Geist Variable", ui-sans-serif, -apple-system, BlinkMacSystemFont,
      "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
    --qy-font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
    --qy-weight-regular: 400;
    --qy-weight-medium: 500;
    --qy-weight-semibold: 600;

    --qy-text-display-lg-size: 2.5rem;
    --qy-text-display-lg-leading: 1.1;
    --qy-text-display-size: 2rem;
    --qy-text-display-leading: 1.15;
    --qy-text-title-size: 1.125rem;
    --qy-text-title-leading: 1.35;
    --qy-text-heading-size: 0.8125rem;
    --qy-text-heading-leading: 1.5;
    --qy-text-body-size: 0.875rem;
    --qy-text-body-leading: 1.5;
    --qy-text-label-size: 0.8125rem;
    --qy-text-label-leading: 1.5;
    --qy-text-caption-size: 0.75rem;
    --qy-text-caption-leading: 1.5;

    /*
     * Tracking belongs to the scale, not to one global constant: 32px display
     * type needs far more negative tracking than 12px caption text. These step
     * from about -0.03em at display to 0 at caption, which is most of the
     * difference between type that reads as designed and type left at default.
     */
    --qy-text-display-tracking: -0.032em;
    --qy-text-title-tracking: -0.022em;
    --qy-text-heading-tracking: -0.01em;
    --qy-text-body-tracking: -0.006em;
    --qy-text-label-tracking: -0.006em;
    --qy-text-caption-tracking: 0em;

    --qy-tracking-heading: var(--qy-text-title-tracking);
    --qy-tracking-caps: 0.06em;

    /* Spacing scale, 4px base. */
    --qy-space-0: 0;
    --qy-space-1: 0.25rem;
    --qy-space-2: 0.5rem;
    --qy-space-3: 0.75rem;
    --qy-space-4: 1rem;
    --qy-space-5: 1.25rem;
    --qy-space-6: 1.5rem;
    --qy-space-8: 2rem;
    --qy-space-10: 2.5rem;
    --qy-space-12: 3rem;
    --qy-space-16: 4rem;

    /*
     * Radii. Controls sit at 8px, small controls at 4–6px, and cards at 12px.
     * Steps subtract half a pixel so a nested corner stays concentric inside the
     * parent's inner edge.
     */
    --qy-radius: 0.5rem;
    --qy-radius-xs: 0.25rem;
    --qy-radius-sm: 0.375rem;
    --qy-radius-md: calc(var(--qy-radius) - 0.5px);
    --qy-radius-lg: var(--qy-radius);
    --qy-radius-xl: 0.625rem;
    --qy-radius-2xl: 0.75rem;
    --qy-radius-full: 9999px;

    /* Control heights. \`md\` is the default for form controls. */
    --qy-control-xs: 1.5rem;
    --qy-control-sm: 1.75rem;
    --qy-control-md: 2rem;
    --qy-control-lg: 2.25rem;
    --qy-control-xl: 2.5rem;
    /* Minimum touch target; enforced on coarse pointers. */
    --qy-touch-target: 2.75rem;

    /* Density. Tables and lists opt into \`compact\` rather than hardcoding. */
    --qy-row-default: 3rem;
    --qy-row-compact: 2.5rem;
    --qy-panel-padding: var(--qy-space-6);
    --qy-panel-padding-sm: var(--qy-space-4);
    --qy-panel-gap: var(--qy-space-4);
    --qy-section-gap: var(--qy-space-5);
    --qy-page-gutter: clamp(1rem, 1.4vw, 1.75rem);
    --qy-topbar-height: 3.5rem;

    /* Motion. Short, eased, and interruptible; see motion.css. */
    --qy-duration-instant: 0ms;
    --qy-duration-press: 100ms;
    --qy-duration-fast: 140ms;
    --qy-duration-feedback: 180ms;
    --qy-duration-base: 220ms;
    --qy-duration-slow: 320ms;
    --qy-ease-out: cubic-bezier(0.23, 1, 0.32, 1);
    --qy-ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
    --qy-ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
    --qy-ease-spring: cubic-bezier(0.34, 1.3, 0.64, 1);
    --qy-stagger: 40ms;

    /* Focus ring, shared by every focusable control. */
    --qy-focus-ring-width: 2px;
    --qy-focus-ring-offset: 1px;
  }

  @media (max-width: 767px) {
    :root {
      --qy-topbar-height: 3.375rem;
      --qy-page-gutter: var(--qy-space-4);
      --qy-panel-padding: var(--qy-space-4);
    }
  }

  /* A consumer can opt into a denser product chrome without touching components. */
  [data-density="compact"] {
    --qy-row-default: var(--qy-row-compact);
    --qy-panel-padding: var(--qy-space-4);
    --qy-panel-gap: var(--qy-space-3);
    --qy-section-gap: var(--qy-space-4);
    --qy-topbar-height: 3rem;
  }
}
`,R=`/*
 * Layer 2 — semantic tokens.
 *
 * Roles the interface talks about. Components reference only this layer (via
 * the Tailwind mapping in theme.css), so light and dark are the same names with
 * different bindings.
 *
 * Neutrals are deliberately translucent: borders, fills and hover states are
 * black or white at low alpha, so they read correctly on any surface they sit
 * on — a card, a sidebar, a popover — without per-surface overrides. The
 * surface tones and elevations keep a clear page → panel → floating control
 * hierarchy without tinting every component with the brand colour.
 */
@layer base {
  :root,
  .light,
  [data-theme="light"] {
    color-scheme: light;

    /*
     * The page carries a quiet neutral tint while panels stay white. The
     * difference remains visible in an actual product layout, including when
     * a consumer removes a card's elevation.
     */
    --qy-background: color-mix(in srgb, var(--qy-white) 96.5%, var(--qy-neutral-950));
    --qy-foreground: var(--qy-neutral-950);

    /* Surfaces, from the page outward. */
    --qy-surface: var(--qy-white);
    --qy-surface-raised: var(--qy-white);
    --qy-surface-subtle: var(--qy-neutral-50);
    --qy-surface-inset: oklch(0 0 0 / 0.045);
    --qy-surface-hover: oklch(0 0 0 / 0.065);
    --qy-surface-active: oklch(0 0 0 / 0.1);
    --qy-overlay: oklch(0 0 0 / 0.32);

    /* Text, strongest to weakest. */
    --qy-foreground-strong: var(--qy-neutral-950);
    --qy-foreground-muted: color-mix(in srgb, var(--qy-neutral-500) 90%, var(--qy-black));
    --qy-foreground-subtle: color-mix(in srgb, var(--qy-foreground-muted) 72%, transparent);
    --qy-foreground-inverse: var(--qy-neutral-50);

    /* Lines. */
    --qy-border: oklch(0 0 0 / 0.08);
    --qy-border-subtle: oklch(0 0 0 / 0.06);
    --qy-border-strong: oklch(0 0 0 / 0.14);
    --qy-border-input: oklch(0 0 0 / 0.1);
    --qy-ring: var(--qy-neutral-400);

    /* Emphasis. */
    --qy-primary: var(--qy-neutral-800);
    --qy-primary-foreground: var(--qy-neutral-50);
    --qy-accent: oklch(0 0 0 / 0.05);
    --qy-accent-foreground: var(--qy-foreground);

    /* Status: solid marks the state, foreground is readable text on the page. */
    --qy-danger: var(--qy-red-500);
    --qy-danger-foreground: var(--qy-red-700);
    --qy-warning: var(--qy-amber-500);
    --qy-warning-foreground: var(--qy-amber-700);
    --qy-success: var(--qy-emerald-500);
    --qy-success-foreground: var(--qy-emerald-700);
    --qy-info: var(--qy-blue-500);
    --qy-info-foreground: var(--qy-blue-700);

    /* Categorical series, ordered so neighbours stay distinguishable. */
    --qy-chart-1: var(--qy-blue-500);
    --qy-chart-2: var(--qy-emerald-500);
    --qy-chart-3: var(--qy-amber-500);
    --qy-chart-4: var(--qy-violet-500);
    --qy-chart-5: var(--qy-rose-500);

    --qy-code: var(--qy-white);
    --qy-code-highlight: oklch(0 0 0 / 0.04);

    --qy-sidebar: var(--qy-neutral-50);
    --qy-sidebar-foreground: color-mix(in srgb, var(--qy-foreground) 64%, var(--qy-sidebar));
    --qy-sidebar-border: oklch(0 0 0 / 0.06);
    --qy-sidebar-accent: oklch(0 0 0 / 0.04);
    --qy-sidebar-accent-foreground: var(--qy-foreground);
    --qy-sidebar-primary: var(--qy-foreground);
    --qy-sidebar-primary-foreground: var(--qy-neutral-0, var(--qy-white));
    --qy-sidebar-ring: var(--qy-neutral-400);

    /* A close contact shadow anchors the surface; the soft tail stays faint. */
    --qy-shadow-panel: 0 1px 2px oklch(0 0 0 / 0.04), 0 4px 12px -8px oklch(0 0 0 / 0.12);
    --qy-shadow-control: 0 1px 2px oklch(0 0 0 / 0.06), 0 2px 4px -2px oklch(0 0 0 / 0.06);
    --qy-shadow-inset: 0 1px 2px oklch(0 0 0 / 0.045);
    --qy-shadow-raised: 0 10px 32px -8px oklch(0 0 0 / 0.12), 0 2px 6px oklch(0 0 0 / 0.05);
    --qy-shadow-overlay: 0 24px 64px -16px oklch(0 0 0 / 0.2), 0 4px 12px oklch(0 0 0 / 0.06);
  }

  .dark,
  [data-theme="dark"] {
    color-scheme: dark;

    --qy-background: color-mix(in srgb, var(--qy-neutral-950) 95%, var(--qy-white));
    --qy-foreground: var(--qy-neutral-100);

    --qy-surface: color-mix(in srgb, var(--qy-background) 98%, var(--qy-white));
    --qy-surface-raised: color-mix(in srgb, var(--qy-background) 94%, var(--qy-white));
    --qy-surface-subtle: color-mix(in srgb, var(--qy-neutral-950) 97%, var(--qy-white));
    --qy-surface-inset: oklch(1 0 0 / 0.04);
    --qy-surface-hover: oklch(1 0 0 / 0.07);
    --qy-surface-active: oklch(1 0 0 / 0.11);
    --qy-overlay: oklch(0 0 0 / 0.56);

    --qy-foreground-strong: var(--qy-white);
    --qy-foreground-muted: color-mix(in srgb, var(--qy-neutral-500) 80%, var(--qy-white));
    --qy-foreground-subtle: color-mix(in srgb, var(--qy-foreground-muted) 72%, transparent);
    --qy-foreground-inverse: var(--qy-neutral-800);

    --qy-border: oklch(1 0 0 / 0.06);
    --qy-border-subtle: oklch(1 0 0 / 0.05);
    --qy-border-strong: oklch(1 0 0 / 0.12);
    --qy-border-input: oklch(1 0 0 / 0.08);
    --qy-ring: var(--qy-neutral-500);

    --qy-primary: var(--qy-neutral-100);
    --qy-primary-foreground: var(--qy-neutral-800);
    --qy-accent: oklch(1 0 0 / 0.055);
    --qy-accent-foreground: var(--qy-neutral-100);

    --qy-danger: color-mix(in srgb, var(--qy-red-500) 90%, var(--qy-white));
    --qy-danger-foreground: var(--qy-red-400);
    --qy-warning: var(--qy-amber-500);
    --qy-warning-foreground: var(--qy-amber-400);
    --qy-success: var(--qy-emerald-500);
    --qy-success-foreground: var(--qy-emerald-400);
    --qy-info: var(--qy-blue-500);
    --qy-info-foreground: var(--qy-blue-400);

    --qy-chart-1: var(--qy-blue-400);
    --qy-chart-2: var(--qy-emerald-400);
    --qy-chart-3: var(--qy-amber-400);
    --qy-chart-4: var(--qy-violet-400);
    --qy-chart-5: var(--qy-rose-400);

    --qy-code: color-mix(in srgb, var(--qy-background) 98%, var(--qy-white));
    --qy-code-highlight: oklch(1 0 0 / 0.04);

    --qy-sidebar: color-mix(in srgb, var(--qy-neutral-950) 97%, var(--qy-white));
    --qy-sidebar-foreground: color-mix(in srgb, var(--qy-foreground) 64%, var(--qy-sidebar));
    --qy-sidebar-border: oklch(1 0 0 / 0.05);
    --qy-sidebar-accent: oklch(1 0 0 / 0.04);
    --qy-sidebar-accent-foreground: var(--qy-neutral-100);
    --qy-sidebar-primary: var(--qy-neutral-100);
    --qy-sidebar-primary-foreground: var(--qy-neutral-800);
    --qy-sidebar-ring: var(--qy-neutral-400);

    --qy-shadow-panel: 0 1px 2px oklch(0 0 0 / 0.2), 0 4px 12px -8px oklch(0 0 0 / 0.24);
    --qy-shadow-control: 0 1px 2px oklch(0 0 0 / 0.24);
    --qy-shadow-inset: 0 1px 2px oklch(0 0 0 / 0.2);
    --qy-shadow-raised: 0 10px 32px -8px oklch(0 0 0 / 0.5), 0 2px 6px oklch(0 0 0 / 0.28);
    --qy-shadow-overlay: 0 24px 64px -16px oklch(0 0 0 / 0.64), 0 4px 12px oklch(0 0 0 / 0.32);
  }

  /*
   * Status fills derive from the solid colour, so a brand that retunes a
   * status hue gets matching tints for free.
   */
  :root,
  .light,
  .dark,
  [data-theme] {
    --qy-danger-soft: color-mix(in srgb, var(--qy-danger) 8%, transparent);
    --qy-warning-soft: color-mix(in srgb, var(--qy-warning) 8%, transparent);
    --qy-success-soft: color-mix(in srgb, var(--qy-success) 8%, transparent);
    --qy-info-soft: color-mix(in srgb, var(--qy-info) 8%, transparent);
  }
}
`,g=(r,n)=>[...new Set([...r.matchAll(n)].map(a=>a[1]))],v=g(R,/--qy-([a-z0-9-]+)\s*:/g).filter(r=>!r.startsWith("shadow-")),G=g(R,/--qy-(shadow-[a-z0-9-]+)\s*:/g),F=g(m,/--qy-text-([a-z]+)-size\s*:/g),S=g(m,/--qy-(space-\d+)\s*:/g),W=g(m,/--qy-(radius(?:-[a-z0-9]+)?)\s*:/g),E=g(m,/--qy-(control-[a-z]+)\s*:/g),L=["touch-target","row-default","row-compact","panel-padding","panel-padding-sm","panel-gap","section-gap","topbar-height"].filter(r=>m.includes(`--qy-${r}:`)),P=g(m,/--qy-(duration-[a-z]+)\s*:/g),M=g(m,/--qy-(ease-[a-z-]+)\s*:/g),U=F.flatMap(r=>[`text-${r}-size`,`text-${r}-leading`]),Y=[...E,...L],K=[...P,...M,"stagger"],Q=(()=>{const r=new Map;for(const[,n,a]of B.matchAll(/--color-([a-z0-9-]+):\s*var\(--qy-([a-z0-9-]+)\)/g))r.set(a,[...r.get(a)??[],n]);return n=>r.get(n)??[]})(),X=[{title:"页面与表面",id:"color-surface",test:r=>/^(background|surface|overlay)/.test(r)},{title:"文字",id:"color-text",test:r=>/^foreground/.test(r)},{title:"线条与焦点",id:"color-lines",test:r=>/^(border|ring)/.test(r)},{title:"强调",id:"color-emphasis",test:r=>/^(primary|accent)/.test(r)},{title:"状态",id:"color-status",test:r=>/^(danger|warning|success|info)/.test(r)},{title:"图表",id:"color-chart",test:r=>/^chart-/.test(r)},{title:"代码与侧栏",id:"color-code",test:r=>/^(code|sidebar)/.test(r)}];function Z(r,n){r.clearRect(0,0,1,1),r.fillStyle="#000",r.fillStyle=n,r.fillRect(0,0,1,1);const[a=0,s=0,o=0,t=255]=r.getImageData(0,0,1,1).data;return{hex:`#${[a,s,o].map(c=>c.toString(16).padStart(2,"0")).join("")}`,alpha:t/255}}function J(r){const n=l.useRef(null),a=l.useRef(null),[s,o]=l.useState(null);return l.useLayoutEffect(()=>{const i=document.createElement("canvas").getContext("2d",{willReadFrequently:!0});if(!i||!n.current||!a.current)return;const c=p=>{const x=p.firstElementChild,_=getComputedStyle(p),N={};for(const k of r){x.style.backgroundColor=`var(--qy-${k})`;const H=getComputedStyle(x).backgroundColor;N[k]={raw:_.getPropertyValue(`--qy-${k}`).trim(),...Z(i,H)}}return N};o({light:c(n.current),dark:c(a.current)})},[r]),{values:s,probes:e.jsxs("div",{"aria-hidden":"true",className:"pointer-events-none invisible absolute size-0 overflow-hidden",children:[e.jsx("div",{className:"light",ref:n,children:e.jsx("span",{})}),e.jsx("div",{className:"dark",ref:a,children:e.jsx("span",{})})]})}}function $(r){return r?r.alpha<.999?`${r.hex} · ${Math.round(r.alpha*100)}%`:r.hex:"…"}function ee(r){const n=r.replace(/-foreground$/,"");return n===r||/^(danger|warning|success|info)$/.test(n)?null:v.includes(n)?`var(--qy-${n})`:null}function T({name:r,scheme:n}){const a=`var(--qy-${r})`,s=r.includes("foreground"),o=/^(border|ring|sidebar-border|sidebar-ring)/.test(r),t=s?ee(r):null;return e.jsx("div",{className:A(n,"grid size-11 shrink-0 place-items-center rounded-lg border bg-background"),title:n==="light"?"浅色":"深色",children:s?e.jsx("span",{className:"grid size-8 place-items-center rounded-md font-semibold text-[0.9375rem]",style:{color:a,...t?{background:t}:{}},children:"Aa"}):o?e.jsx("span",{className:"size-6 rounded-md",style:{boxShadow:`inset 0 0 0 1.5px ${a}`}}):e.jsx("span",{className:"size-6 rounded-md",style:{background:a,boxShadow:"inset 0 0 0 1px oklch(0.5 0 0 / 0.12)"}})})}function re(){const{values:r,probes:n}=J(v),a=new Set,s=X.map(t=>{const i=v.filter(c=>!a.has(c)&&t.test(c));for(const c of i)a.add(c);return{...t,items:i}}),o=v.filter(t=>!a.has(t));return o.length&&s.push({title:"其他",id:"color-other",test:()=>!0,items:o}),e.jsxs(e.Fragment,{children:[n,s.filter(t=>t.items.length).map(t=>e.jsxs(l.Fragment,{children:[e.jsx(w,{id:t.id,children:t.title}),e.jsxs("div",{className:"overflow-hidden rounded-xl border",children:[e.jsxs("div",{className:"hidden grid-cols-[6.25rem_minmax(0,1fr)_7.5rem_7.5rem] gap-4 border-b bg-surface-subtle/60 px-4 py-2 text-muted-foreground text-xs sm:grid dark:bg-surface/40",children:[e.jsx("span",{children:"浅色 / 深色"}),e.jsx("span",{children:"令牌"}),e.jsx("span",{children:"浅色"}),e.jsx("span",{children:"深色"})]}),e.jsx("ul",{className:"divide-y",children:t.items.map(i=>{const c=r?.light[i],p=r?.dark[i],x=Q(i);return e.jsxs("li",{className:"grid grid-cols-[6.25rem_minmax(0,1fr)] items-center gap-x-4 gap-y-1 px-4 py-3 sm:grid-cols-[6.25rem_minmax(0,1fr)_7.5rem_7.5rem]",children:[e.jsxs("div",{className:"row-span-2 flex gap-1.5 sm:row-span-1",children:[e.jsx(T,{name:i,scheme:"light"}),e.jsx(T,{name:i,scheme:"dark"})]}),e.jsxs("div",{className:"flex min-w-0 flex-col gap-0.5",children:[e.jsxs("code",{className:"truncate font-mono text-[0.8125rem] text-foreground-strong",children:["--qy-",i]}),e.jsx("span",{className:"truncate text-muted-foreground text-xs",children:x.length?e.jsxs(e.Fragment,{children:["Tailwind：",e.jsx("span",{className:"font-mono",children:x.join(" / ")})]}):"仅以变量使用"})]}),e.jsxs("div",{className:"col-start-2 flex gap-3 font-mono text-[0.75rem] text-foreground/80 numeric sm:contents",children:[e.jsxs("span",{className:"truncate",title:c?.raw,children:[e.jsx("span",{className:"text-foreground-subtle sm:hidden",children:"浅 "}),$(c)]}),e.jsxs("span",{className:"truncate",title:p?.raw,children:[e.jsx("span",{className:"text-foreground-subtle sm:hidden",children:"深 "}),$(p)]})]})]},i)})})]})]},t.id))]})}function b(r){const[n,a]=l.useState({});return l.useLayoutEffect(()=>{const s=getComputedStyle(document.documentElement);a(Object.fromEntries(r.map(o=>[o,s.getPropertyValue(`--qy-${o}`).trim()])))},[r]),n}const j=r=>{const n=r.match(/^([\d.]+)rem$/);return n?`${Number.parseFloat(n[1])*16}px`:r};function f({head:r,rows:n}){return e.jsx("div",{className:"my-4 overflow-x-auto rounded-xl border",children:e.jsxs("table",{className:"w-full min-w-[30rem] text-sm",children:[e.jsx("thead",{className:"border-b bg-surface-subtle/60 text-start text-muted-foreground text-xs dark:bg-surface/40",children:e.jsx("tr",{children:r.map(a=>e.jsx("th",{className:"px-4 py-2 text-start font-medium",children:a},a))})}),e.jsx("tbody",{className:"divide-y",children:n.map((a,s)=>e.jsx("tr",{children:a.map((o,t)=>e.jsx("td",{className:"px-4 py-2.5 align-middle",children:o},t))},s))})]})})}const h=r=>e.jsx("code",{className:"font-mono text-[0.8125rem] text-foreground-strong",children:r}),u=r=>e.jsx("span",{className:"font-mono text-[0.75rem] text-muted-foreground numeric",children:r||"…"}),ne={display:600,title:600,heading:600,label:500};function ae(){const r=b(U);return e.jsx("div",{className:"my-4 overflow-hidden rounded-xl border",children:e.jsx("ul",{className:"divide-y",children:F.map(n=>{const a=r[`text-${n}-size`],s=r[`text-${n}-leading`];return e.jsxs("li",{className:"flex flex-col gap-2 px-4 py-4 sm:flex-row sm:items-baseline sm:gap-6",children:[e.jsxs("div",{className:"flex w-32 shrink-0 flex-col gap-0.5",title:a,children:[h(`text-${n}`),u(a?`${j(a)} / ${s}`:void 0)]}),e.jsx("p",{className:"min-w-0 truncate text-foreground-strong",style:{fontSize:`var(--qy-text-${n}-size)`,lineHeight:`var(--qy-text-${n}-leading)`,fontWeight:ne[n]??400},children:"精致耐看 Refined 0123"})]},n)})})})}function te(){const r=b(S);return e.jsx(f,{head:["令牌","值",""],rows:S.map(n=>[h(`--qy-${n}`),u(r[n]?`${r[n]} · ${j(r[n])}`:void 0),e.jsx("span",{"aria-hidden":"true",className:"block h-2.5 rounded-sm bg-foreground/16",style:{width:`var(--qy-${n})`,minWidth:1}})])})}function se(){const r=l.useRef(null),[n,a]=l.useState({});return l.useLayoutEffect(()=>{const s={};r.current?.querySelectorAll("[data-radius]").forEach(o=>{s[o.dataset.radius]=getComputedStyle(o).borderTopLeftRadius}),a(s)},[]),e.jsx("ul",{className:"my-4 grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-4",ref:r,children:W.map(s=>e.jsxs("li",{className:"flex flex-col gap-2.5",children:[e.jsx("div",{className:"size-16 border border-foreground/16 bg-surface-subtle dark:bg-surface","data-radius":s,style:{borderRadius:`var(--qy-${s})`}}),e.jsxs("div",{className:"flex flex-col",children:[h(`--qy-${s}`),u(s==="radius-full"?"9999px":n[s])]})]},s))})}function oe(){return e.jsx("ul",{className:"my-4 grid grid-cols-2 gap-4 rounded-xl border bg-surface-subtle/60 p-5 sm:grid-cols-4 dark:bg-background",children:G.map(r=>e.jsxs("li",{className:"flex flex-col gap-3",children:[e.jsx("div",{className:"h-16 rounded-xl bg-card",style:{boxShadow:`var(--qy-${r})`}}),e.jsxs("code",{className:"font-mono text-[0.75rem] text-foreground-strong",children:["--qy-",r]})]},r))})}const ie={"control-xs":"xs","control-sm":"sm","control-md":"default","control-lg":"lg","control-xl":"xl"};function ce(){const r=b(Y);return e.jsxs(e.Fragment,{children:[e.jsx(f,{head:["令牌","桌面","移动端","按钮"],rows:E.map(n=>{const a=r[n],s=a?Number.parseFloat(a)*16:0,o=ie[n];return[h(`--qy-${n}`),u(a?`${a} · ${s}px`:void 0),u(a?`${s+4}px`:void 0),o?e.jsx(C,{"aria-hidden":"true",size:o,tabIndex:-1,variant:"outline",children:o==="default"?"默认":o}):null]})}),e.jsx(f,{head:["密度令牌","默认值"],rows:L.map(n=>[h(`--qy-${n}`),u(r[n]?`${r[n]} · ${j(r[n])}`:void 0)])})]})}function de(){const r=b(K),n=O("(prefers-reduced-motion: reduce)"),[a,s]=l.useState(!1),o=t=>e.jsx("div",{className:"relative h-3 w-full min-w-24 rounded-full bg-foreground/6 [container-type:inline-size]",children:e.jsx("span",{className:"absolute top-0 start-0 size-3 rounded-full bg-foreground",style:{translate:a?"calc(100cqw - 0.75rem) 0":"0 0",transitionProperty:"translate",...t,...n?{transitionDuration:"0s"}:{}}})});return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"mt-4 flex flex-wrap items-center gap-3",children:[e.jsxs(C,{onClick:()=>s(t=>!t),size:"sm",variant:"outline",children:[a?e.jsx(D,{"aria-hidden":"true"}):e.jsx(I,{"aria-hidden":"true"}),a?"回到起点":"播放"]}),e.jsx("span",{className:"text-muted-foreground text-xs",children:n?"系统开启了“减少动态效果”，示例改为即时切换。":"所有圆点同时出发，到达的先后就是时长的差别。"})]}),e.jsx(w,{id:"durations",children:"时长"}),e.jsx(f,{head:["令牌","值","演示（缓动 ease-out）"],rows:P.map(t=>[h(`--qy-${t}`),u(r[t]),o({transitionDuration:`var(--qy-${t})`,transitionTimingFunction:"var(--qy-ease-out)"})])}),e.jsx(w,{id:"easings",children:"缓动"}),e.jsx(f,{head:["令牌","曲线","演示（放慢到 600ms）"],rows:M.map(t=>[h(`--qy-${t}`),e.jsx("span",{className:"block max-w-56 truncate",children:u(r[t])}),o({transitionDuration:"600ms",transitionTimingFunction:`var(--qy-${t})`})])}),e.jsxs(y,{className:"text-[0.875rem] text-muted-foreground",children:[e.jsx(d,{children:"--qy-ease-spring"})," 只用于通知的成功脉冲，其余动效一律不回弹。列表逐项进场的间隔是 ",e.jsx(d,{children:"--qy-stagger"}),"（",r.stagger||"…","），最多累计 8 项。"]})]})}function xe(){return e.jsxs("article",{children:[e.jsx(V,{description:"下面的每个数值都在页面加载时从库的 CSS 中读出，与组件实际使用的完全一致。",title:"设计令牌"}),e.jsxs(y,{children:["令牌分为原语、语义与组件三层，见 ",e.jsx(z,{href:"/docs/theming#layers",children:"主题"}),"。组件只读取语义与组件两层；覆盖它们就能定制整个库。"]}),e.jsx(q,{id:"colors",children:"颜色"}),e.jsx(y,{children:"每个语义颜色都同时给出浅色与深色下的取值。中性色大多是半透明的黑或白，所以放在卡片、侧栏或浮层上都能保持相同的观感；色块按各自主题的背景展示。"}),e.jsx(re,{}),e.jsx(q,{id:"typography",children:"字号"}),e.jsxs(y,{children:["字号与行高成对出现，Tailwind 中写作 ",e.jsx(d,{children:"text-body"}),"、",e.jsx(d,{children:"text-label"})," 等。字重只用 400、500、600：标题 600，标签与按钮 500。"]}),e.jsx(ae,{}),e.jsx(q,{id:"spacing",children:"间距"}),e.jsxs(y,{children:["以 4px 为基数。组件内部间距直接使用 Tailwind 的 ",e.jsx(d,{children:"--spacing"}),"，这里的令牌供布局与自定义组件使用。"]}),e.jsx(te,{}),e.jsx(q,{id:"radius",children:"圆角"}),e.jsxs(y,{children:["全部由 ",e.jsx(d,{children:"--qy-radius"})," 派生。徽章与复选框用 ",e.jsx(d,{children:"sm"}),"，菜单项用 ",e.jsx(d,{children:"md"}),"，控件与浮层用 ",e.jsx(d,{children:"lg"}),"，提示条用 ",e.jsx(d,{children:"xl"}),"，卡片与弹窗用 ",e.jsx(d,{children:"2xl"}),"。"]}),e.jsx(se,{}),e.jsx(q,{id:"shadows",children:"阴影"}),e.jsx(y,{children:"层次主要来自半透明边框，阴影只起辅助作用。下方按当前主题显示；深色下阴影更重，以便在暗背景上仍可分辨。"}),e.jsx(oe,{}),e.jsx(q,{id:"controls",children:"控件高度与密度"}),e.jsxs(y,{children:["控件高度令牌是桌面值。移动端统一加高 4px，避免 iOS 输入时缩放并方便点按；粗指针下独立控件的点击区扩展到 ",e.jsx(d,{children:"--qy-touch-target"}),"。"]}),e.jsx(ce,{}),e.jsx(q,{id:"motion",children:"动效"}),e.jsxs(y,{children:["时长短、缓动统一、随时可被打断。使用规则见 ",e.jsx(z,{href:"/docs/motion",children:"动效"}),"。"]}),e.jsx(de,{})]})}export{xe as default};
