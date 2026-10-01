import { j as jsxRuntimeExports, r as reactExports, B as Button, e as cn } from "./index-DM02Iz28.js";
import { u as useMediaQuery } from "./use-media-query-CGVr0VA1.js";
import { P as PageHeader, a as P, A, H as H2, C as Code, c as H3 } from "./prose-Boxfwb1Q.js";
import { R as RotateCcw } from "./rotate-ccw-DDqGWf8q.js";
import { P as Play } from "./play-_isrQBUt.js";
import "./alert-twlv_qhe.js";
const themeCss = '/*\n * theme.css — the design token entry point.\n *\n *   Layer 1  tokens/primitives.css   raw palette, no meaning\n *   Layer 2  tokens/semantic.css     roles, light + dark\n *   Layer 3  tokens/components.css   type, space, radius, size, density, motion\n *\n * Customise the library by overriding `--qy-*` tokens after this file, for\n * example `:root { --qy-primary: …; --qy-radius: 0.5rem; }`.\n *\n * The unprefixed shadcn-style variables below (`--background`, `--card`, …)\n * are a compatibility surface: components and third-party shadcn blocks read\n * them in arbitrary values. They always resolve to the `--qy-*` tokens; do not\n * override them directly.\n */\n@import "./tokens/primitives.css";\n@import "./tokens/semantic.css";\n@import "./tokens/components.css";\n\n@layer base {\n  :root,\n  .light,\n  .dark,\n  [data-theme] {\n    --background: var(--qy-background);\n    --foreground: var(--qy-foreground);\n    --card: var(--qy-surface);\n    --card-foreground: var(--qy-foreground);\n    --popover: var(--qy-surface-raised);\n    --popover-foreground: var(--qy-foreground);\n    --primary: var(--qy-primary);\n    --primary-foreground: var(--qy-primary-foreground);\n    --secondary: var(--qy-surface-inset);\n    --secondary-foreground: var(--qy-foreground);\n    --muted: var(--qy-surface-inset);\n    --muted-foreground: var(--qy-foreground-muted);\n    --accent: var(--qy-accent);\n    --accent-foreground: var(--qy-accent-foreground);\n    --destructive: var(--qy-danger);\n    --destructive-foreground: var(--qy-danger-foreground);\n    --info: var(--qy-info);\n    --info-foreground: var(--qy-info-foreground);\n    --success: var(--qy-success);\n    --success-foreground: var(--qy-success-foreground);\n    --warning: var(--qy-warning);\n    --warning-foreground: var(--qy-warning-foreground);\n    --border: var(--qy-border);\n    --input: var(--qy-border-input);\n    --ring: var(--qy-ring);\n    --chart-1: var(--qy-chart-1);\n    --chart-2: var(--qy-chart-2);\n    --chart-3: var(--qy-chart-3);\n    --chart-4: var(--qy-chart-4);\n    --chart-5: var(--qy-chart-5);\n    --code: var(--qy-code);\n    --code-foreground: var(--qy-foreground);\n    --code-highlight: var(--qy-code-highlight);\n    --sidebar: var(--qy-sidebar);\n    --sidebar-foreground: var(--qy-sidebar-foreground);\n    --sidebar-border: var(--qy-sidebar-border);\n    --sidebar-accent: var(--qy-sidebar-accent);\n    --sidebar-accent-foreground: var(--qy-sidebar-accent-foreground);\n    --sidebar-primary: var(--qy-sidebar-primary);\n    --sidebar-primary-foreground: var(--qy-sidebar-primary-foreground);\n    --sidebar-ring: var(--qy-sidebar-ring);\n    --radius: var(--qy-radius);\n  }\n}\n\n/*\n * Tailwind mapping. `inline` keeps utilities pointing at the live custom\n * property, so theme switches apply without recompiling.\n */\n@theme inline {\n  --font-sans: var(--qy-font-sans);\n  --font-heading: var(--qy-font-sans);\n  --font-mono: var(--qy-font-mono);\n\n  --color-background: var(--qy-background);\n  --color-foreground: var(--qy-foreground);\n  --color-card: var(--qy-surface);\n  --color-card-foreground: var(--qy-foreground);\n  --color-popover: var(--qy-surface-raised);\n  --color-popover-foreground: var(--qy-foreground);\n  --color-primary: var(--qy-primary);\n  --color-primary-foreground: var(--qy-primary-foreground);\n  --color-secondary: var(--qy-surface-inset);\n  --color-secondary-foreground: var(--qy-foreground);\n  --color-muted: var(--qy-surface-inset);\n  --color-muted-foreground: var(--qy-foreground-muted);\n  --color-accent: var(--qy-accent);\n  --color-accent-foreground: var(--qy-accent-foreground);\n  --color-destructive: var(--qy-danger);\n  --color-destructive-foreground: var(--qy-danger-foreground);\n  --color-info: var(--qy-info);\n  --color-info-foreground: var(--qy-info-foreground);\n  --color-success: var(--qy-success);\n  --color-success-foreground: var(--qy-success-foreground);\n  --color-warning: var(--qy-warning);\n  --color-warning-foreground: var(--qy-warning-foreground);\n  --color-border: var(--qy-border);\n  --color-input: var(--qy-border-input);\n  --color-ring: var(--qy-ring);\n  --color-overlay: var(--qy-overlay);\n  --color-chart-1: var(--qy-chart-1);\n  --color-chart-2: var(--qy-chart-2);\n  --color-chart-3: var(--qy-chart-3);\n  --color-chart-4: var(--qy-chart-4);\n  --color-chart-5: var(--qy-chart-5);\n  --color-code: var(--qy-code);\n  --color-code-foreground: var(--qy-foreground);\n  --color-code-highlight: var(--qy-code-highlight);\n  --color-sidebar: var(--qy-sidebar);\n  --color-sidebar-foreground: var(--qy-sidebar-foreground);\n  --color-sidebar-border: var(--qy-sidebar-border);\n  --color-sidebar-accent: var(--qy-sidebar-accent);\n  --color-sidebar-accent-foreground: var(--qy-sidebar-accent-foreground);\n  --color-sidebar-primary: var(--qy-sidebar-primary);\n  --color-sidebar-primary-foreground: var(--qy-sidebar-primary-foreground);\n  --color-sidebar-ring: var(--qy-sidebar-ring);\n\n  /* Extended roles beyond the shadcn set. */\n  --color-surface: var(--qy-surface);\n  --color-surface-raised: var(--qy-surface-raised);\n  --color-surface-subtle: var(--qy-surface-subtle);\n  --color-surface-inset: var(--qy-surface-inset);\n  --color-foreground-strong: var(--qy-foreground-strong);\n  --color-foreground-subtle: var(--qy-foreground-subtle);\n  --color-border-subtle: var(--qy-border-subtle);\n  --color-border-strong: var(--qy-border-strong);\n  --color-danger-soft: var(--qy-danger-soft);\n  --color-warning-soft: var(--qy-warning-soft);\n  --color-success-soft: var(--qy-success-soft);\n  --color-info-soft: var(--qy-info-soft);\n\n  --radius-xs: var(--qy-radius-xs);\n  --radius-sm: var(--qy-radius-sm);\n  --radius-md: var(--qy-radius-md);\n  --radius-lg: var(--qy-radius-lg);\n  --radius-xl: var(--qy-radius-xl);\n  --radius-2xl: var(--qy-radius-2xl);\n\n  --text-display: var(--qy-text-display-size);\n  --text-display--line-height: var(--qy-text-display-leading);\n  --text-title: var(--qy-text-title-size);\n  --text-title--line-height: var(--qy-text-title-leading);\n  --text-heading: var(--qy-text-heading-size);\n  --text-heading--line-height: var(--qy-text-heading-leading);\n  --text-body: var(--qy-text-body-size);\n  --text-body--line-height: var(--qy-text-body-leading);\n  --text-label: var(--qy-text-label-size);\n  --text-label--line-height: var(--qy-text-label-leading);\n  --text-caption: var(--qy-text-caption-size);\n  --text-caption--line-height: var(--qy-text-caption-leading);\n\n  --shadow-panel: var(--qy-shadow-panel);\n  --shadow-control: var(--qy-shadow-control);\n  --shadow-raised: var(--qy-shadow-raised);\n  --shadow-overlay: var(--qy-shadow-overlay);\n\n  --ease-out: var(--qy-ease-out);\n  --ease-in-out: var(--qy-ease-in-out);\n  --ease-drawer: var(--qy-ease-drawer);\n  --default-transition-duration: var(--qy-duration-fast);\n  --default-transition-timing-function: var(--qy-ease-out);\n\n  /* Keyframe animations used by components (from the coss registry). */\n  --animate-skeleton: skeleton 2s -1s infinite linear;\n  --animate-caret-blink: caret-blink 1s ease-out infinite;\n  --animate-toast-success-odd: toast-success-odd 0.32s cubic-bezier(0.5, 1, 0.89, 1);\n  --animate-toast-success-even: toast-success-even 0.32s cubic-bezier(0.5, 1, 0.89, 1);\n  --animate-toast-error-odd: toast-error-odd 0.28s cubic-bezier(0.5, 1, 0.89, 1);\n  --animate-toast-error-even: toast-error-even 0.28s cubic-bezier(0.5, 1, 0.89, 1);\n\n  @keyframes skeleton {\n    to {\n      background-position: -200% 0;\n    }\n  }\n  @keyframes caret-blink {\n    0%,\n    70%,\n    100% {\n      opacity: 1;\n    }\n    20%,\n    50% {\n      opacity: 0;\n    }\n  }\n  @keyframes toast-success-odd {\n    0% { scale: 1; }\n    30% { scale: 1.025; }\n    60% { scale: 0.99; }\n    100% { scale: 1; }\n  }\n  @keyframes toast-success-even {\n    0% { scale: 1; }\n    30% { scale: 1.025; }\n    60% { scale: 0.99; }\n    100% { scale: 1; }\n  }\n  @keyframes toast-error-odd {\n    0% { translate: 0 0; }\n    25% { translate: -3px 0; }\n    50% { translate: 3px 0; }\n    75% { translate: -3px 0; }\n    100% { translate: 0 0; }\n  }\n  @keyframes toast-error-even {\n    0% { translate: 0 0; }\n    25% { translate: -3px 0; }\n    50% { translate: 3px 0; }\n    75% { translate: -3px 0; }\n    100% { translate: 0 0; }\n  }\n}\n';
const componentsCss = '/*\n * Layer 3 — component tokens.\n * Sizes, radii, density and motion that components consume directly.\n * These exist so a consumer can retune the library (denser tables, rounder\n * controls, slower motion) without editing component source.\n */\n@layer base {\n  :root {\n    /* Type ramp. Sizes are paired with line heights and weights. */\n    --qy-font-sans: "Geist Variable", ui-sans-serif, -apple-system, BlinkMacSystemFont,\n      "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;\n    --qy-font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;\n    --qy-weight-regular: 400;\n    --qy-weight-medium: 500;\n    --qy-weight-semibold: 600;\n\n    --qy-text-display-size: 1.75rem;\n    --qy-text-display-leading: 1.25;\n    --qy-text-title-size: 1.125rem;\n    --qy-text-title-leading: 1.4;\n    --qy-text-heading-size: 0.9375rem;\n    --qy-text-heading-leading: 1.5;\n    --qy-text-body-size: 0.875rem;\n    --qy-text-body-leading: 1.5;\n    --qy-text-label-size: 0.8125rem;\n    --qy-text-label-leading: 1.5;\n    --qy-text-caption-size: 0.75rem;\n    --qy-text-caption-leading: 1.5;\n    --qy-tracking-heading: -0.015em;\n    --qy-tracking-caps: 0.06em;\n\n    /* Spacing scale, 4px base. */\n    --qy-space-0: 0;\n    --qy-space-1: 0.25rem;\n    --qy-space-2: 0.5rem;\n    --qy-space-3: 0.75rem;\n    --qy-space-4: 1rem;\n    --qy-space-5: 1.25rem;\n    --qy-space-6: 1.5rem;\n    --qy-space-8: 2rem;\n    --qy-space-10: 2.5rem;\n    --qy-space-12: 3rem;\n    --qy-space-16: 4rem;\n\n    /* Radii. Control radii derive from the base so a brand can round everything. */\n    --qy-radius: 0.625rem;\n    --qy-radius-xs: calc(var(--qy-radius) - 0.375rem);\n    --qy-radius-sm: calc(var(--qy-radius) - 0.25rem);\n    --qy-radius-md: calc(var(--qy-radius) - 0.125rem);\n    --qy-radius-lg: var(--qy-radius);\n    --qy-radius-xl: calc(var(--qy-radius) + 0.25rem);\n    --qy-radius-2xl: calc(var(--qy-radius) + 0.375rem);\n    --qy-radius-full: 9999px;\n\n    /* Control heights. `md` is the default for form controls. */\n    --qy-control-xs: 1.5rem;\n    --qy-control-sm: 1.75rem;\n    --qy-control-md: 2rem;\n    --qy-control-lg: 2.25rem;\n    --qy-control-xl: 2.5rem;\n    /* Minimum touch target; enforced on coarse pointers. */\n    --qy-touch-target: 2.75rem;\n\n    /* Density. Tables and lists opt into `compact` rather than hardcoding. */\n    --qy-row-default: 3rem;\n    --qy-row-compact: 2.5rem;\n    --qy-panel-padding: var(--qy-space-6);\n    --qy-panel-padding-sm: var(--qy-space-4);\n    --qy-panel-gap: var(--qy-space-4);\n    --qy-section-gap: var(--qy-space-5);\n    --qy-page-gutter: clamp(1rem, 1.4vw, 1.75rem);\n    --qy-topbar-height: 3.5rem;\n\n    /* Motion. Short, eased, and interruptible; see motion.css. */\n    --qy-duration-instant: 0ms;\n    --qy-duration-press: 100ms;\n    --qy-duration-fast: 140ms;\n    --qy-duration-feedback: 180ms;\n    --qy-duration-base: 220ms;\n    --qy-duration-slow: 320ms;\n    --qy-ease-out: cubic-bezier(0.23, 1, 0.32, 1);\n    --qy-ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);\n    --qy-ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);\n    --qy-ease-spring: cubic-bezier(0.34, 1.3, 0.64, 1);\n    --qy-stagger: 40ms;\n\n    /* Focus ring, shared by every focusable control. */\n    --qy-focus-ring-width: 2px;\n    --qy-focus-ring-offset: 1px;\n  }\n\n  @media (max-width: 767px) {\n    :root {\n      --qy-topbar-height: 3.375rem;\n      --qy-page-gutter: var(--qy-space-4);\n      --qy-panel-padding: var(--qy-space-4);\n    }\n  }\n\n  /* A consumer can opt into a denser product chrome without touching components. */\n  [data-density="compact"] {\n    --qy-row-default: var(--qy-row-compact);\n    --qy-panel-padding: var(--qy-space-4);\n    --qy-panel-gap: var(--qy-space-3);\n    --qy-section-gap: var(--qy-space-4);\n    --qy-topbar-height: 3rem;\n  }\n}\n';
const semanticCss = '/*\n * Layer 2 — semantic tokens.\n *\n * Roles the interface talks about. Components reference only this layer (via\n * the Tailwind mapping in theme.css), so light and dark are the same names with\n * different bindings.\n *\n * Neutrals are deliberately translucent: borders, fills and hover states are\n * black or white at low alpha, so they read correctly on any surface they sit\n * on — a card, a sidebar, a popover — without per-surface overrides. The\n * values follow the coss ui neutral theme the components were tuned against.\n */\n@layer base {\n  :root,\n  .light,\n  [data-theme="light"] {\n    color-scheme: light;\n\n    /*\n     * The page carries a 1–2% neutral tint while cards stay pure white, so a\n     * card separates from the page by surface tone rather than by shadow.\n     */\n    --qy-background: color-mix(in srgb, var(--qy-white) 98.5%, var(--qy-neutral-950));\n    --qy-foreground: var(--qy-neutral-950);\n\n    /* Surfaces, from the page outward. */\n    --qy-surface: var(--qy-white);\n    --qy-surface-raised: var(--qy-white);\n    --qy-surface-subtle: var(--qy-neutral-50);\n    --qy-surface-inset: oklch(0 0 0 / 0.04);\n    --qy-surface-hover: oklch(0 0 0 / 0.04);\n    --qy-surface-active: oklch(0 0 0 / 0.08);\n    --qy-overlay: oklch(0 0 0 / 0.32);\n\n    /* Text, strongest to weakest. */\n    --qy-foreground-strong: var(--qy-neutral-950);\n    --qy-foreground-muted: color-mix(in srgb, var(--qy-neutral-500) 90%, var(--qy-black));\n    --qy-foreground-subtle: color-mix(in srgb, var(--qy-foreground-muted) 72%, transparent);\n    --qy-foreground-inverse: var(--qy-neutral-50);\n\n    /* Lines. */\n    --qy-border: oklch(0 0 0 / 0.08);\n    --qy-border-subtle: oklch(0 0 0 / 0.06);\n    --qy-border-strong: oklch(0 0 0 / 0.14);\n    --qy-border-input: oklch(0 0 0 / 0.1);\n    --qy-ring: var(--qy-neutral-400);\n\n    /* Emphasis. */\n    --qy-primary: var(--qy-neutral-800);\n    --qy-primary-foreground: var(--qy-neutral-50);\n    --qy-accent: oklch(0 0 0 / 0.04);\n    --qy-accent-foreground: var(--qy-foreground);\n\n    /* Status: solid marks the state, foreground is readable text on the page. */\n    --qy-danger: var(--qy-red-500);\n    --qy-danger-foreground: var(--qy-red-700);\n    --qy-warning: var(--qy-amber-500);\n    --qy-warning-foreground: var(--qy-amber-700);\n    --qy-success: var(--qy-emerald-500);\n    --qy-success-foreground: var(--qy-emerald-700);\n    --qy-info: var(--qy-blue-500);\n    --qy-info-foreground: var(--qy-blue-700);\n\n    /* Categorical series, ordered so neighbours stay distinguishable. */\n    --qy-chart-1: var(--qy-blue-500);\n    --qy-chart-2: var(--qy-emerald-500);\n    --qy-chart-3: var(--qy-amber-500);\n    --qy-chart-4: var(--qy-violet-500);\n    --qy-chart-5: var(--qy-rose-500);\n\n    --qy-code: var(--qy-white);\n    --qy-code-highlight: oklch(0 0 0 / 0.04);\n\n    --qy-sidebar: var(--qy-neutral-50);\n    --qy-sidebar-foreground: color-mix(in srgb, var(--qy-foreground) 64%, var(--qy-sidebar));\n    --qy-sidebar-border: oklch(0 0 0 / 0.06);\n    --qy-sidebar-accent: oklch(0 0 0 / 0.04);\n    --qy-sidebar-accent-foreground: var(--qy-foreground);\n    --qy-sidebar-primary: var(--qy-foreground);\n    --qy-sidebar-primary-foreground: var(--qy-neutral-0, var(--qy-white));\n    --qy-sidebar-ring: var(--qy-neutral-400);\n\n    /* Elevation stays quiet; depth comes mostly from translucent borders. */\n    --qy-shadow-panel: 0 1px 2px oklch(0 0 0 / 0.04);\n    --qy-shadow-control: 0 1px 2px oklch(0 0 0 / 0.05);\n    --qy-shadow-raised: 0 10px 32px -8px oklch(0 0 0 / 0.12), 0 2px 6px oklch(0 0 0 / 0.05);\n    --qy-shadow-overlay: 0 24px 64px -16px oklch(0 0 0 / 0.2), 0 4px 12px oklch(0 0 0 / 0.06);\n  }\n\n  .dark,\n  [data-theme="dark"] {\n    color-scheme: dark;\n\n    --qy-background: color-mix(in srgb, var(--qy-neutral-950) 95%, var(--qy-white));\n    --qy-foreground: var(--qy-neutral-100);\n\n    --qy-surface: color-mix(in srgb, var(--qy-background) 98%, var(--qy-white));\n    --qy-surface-raised: color-mix(in srgb, var(--qy-background) 98%, var(--qy-white));\n    --qy-surface-subtle: color-mix(in srgb, var(--qy-neutral-950) 97%, var(--qy-white));\n    --qy-surface-inset: oklch(1 0 0 / 0.04);\n    --qy-surface-hover: oklch(1 0 0 / 0.04);\n    --qy-surface-active: oklch(1 0 0 / 0.08);\n    --qy-overlay: oklch(0 0 0 / 0.56);\n\n    --qy-foreground-strong: var(--qy-white);\n    --qy-foreground-muted: color-mix(in srgb, var(--qy-neutral-500) 90%, var(--qy-white));\n    --qy-foreground-subtle: color-mix(in srgb, var(--qy-foreground-muted) 72%, transparent);\n    --qy-foreground-inverse: var(--qy-neutral-800);\n\n    --qy-border: oklch(1 0 0 / 0.06);\n    --qy-border-subtle: oklch(1 0 0 / 0.05);\n    --qy-border-strong: oklch(1 0 0 / 0.12);\n    --qy-border-input: oklch(1 0 0 / 0.08);\n    --qy-ring: var(--qy-neutral-500);\n\n    --qy-primary: var(--qy-neutral-100);\n    --qy-primary-foreground: var(--qy-neutral-800);\n    --qy-accent: oklch(1 0 0 / 0.04);\n    --qy-accent-foreground: var(--qy-neutral-100);\n\n    --qy-danger: color-mix(in srgb, var(--qy-red-500) 90%, var(--qy-white));\n    --qy-danger-foreground: var(--qy-red-400);\n    --qy-warning: var(--qy-amber-500);\n    --qy-warning-foreground: var(--qy-amber-400);\n    --qy-success: var(--qy-emerald-500);\n    --qy-success-foreground: var(--qy-emerald-400);\n    --qy-info: var(--qy-blue-500);\n    --qy-info-foreground: var(--qy-blue-400);\n\n    --qy-chart-1: var(--qy-blue-400);\n    --qy-chart-2: var(--qy-emerald-400);\n    --qy-chart-3: var(--qy-amber-400);\n    --qy-chart-4: var(--qy-violet-400);\n    --qy-chart-5: var(--qy-rose-400);\n\n    --qy-code: color-mix(in srgb, var(--qy-background) 98%, var(--qy-white));\n    --qy-code-highlight: oklch(1 0 0 / 0.04);\n\n    --qy-sidebar: color-mix(in srgb, var(--qy-neutral-950) 97%, var(--qy-white));\n    --qy-sidebar-foreground: color-mix(in srgb, var(--qy-foreground) 64%, var(--qy-sidebar));\n    --qy-sidebar-border: oklch(1 0 0 / 0.05);\n    --qy-sidebar-accent: oklch(1 0 0 / 0.04);\n    --qy-sidebar-accent-foreground: var(--qy-neutral-100);\n    --qy-sidebar-primary: var(--qy-neutral-100);\n    --qy-sidebar-primary-foreground: var(--qy-neutral-800);\n    --qy-sidebar-ring: var(--qy-neutral-400);\n\n    --qy-shadow-panel: 0 1px 2px oklch(0 0 0 / 0.24);\n    --qy-shadow-control: 0 1px 2px oklch(0 0 0 / 0.3);\n    --qy-shadow-raised: 0 10px 32px -8px oklch(0 0 0 / 0.5), 0 2px 6px oklch(0 0 0 / 0.28);\n    --qy-shadow-overlay: 0 24px 64px -16px oklch(0 0 0 / 0.64), 0 4px 12px oklch(0 0 0 / 0.32);\n  }\n\n  /*\n   * Status fills derive from the solid colour, so a brand that retunes a\n   * status hue gets matching tints for free.\n   */\n  :root,\n  .light,\n  .dark,\n  [data-theme] {\n    --qy-danger-soft: color-mix(in srgb, var(--qy-danger) 8%, transparent);\n    --qy-warning-soft: color-mix(in srgb, var(--qy-warning) 8%, transparent);\n    --qy-success-soft: color-mix(in srgb, var(--qy-success) 8%, transparent);\n    --qy-info-soft: color-mix(in srgb, var(--qy-info) 8%, transparent);\n  }\n}\n';
const tokenNames = (css, pattern) => [...new Set([...css.matchAll(pattern)].map((match) => match[1]))];
const colorNames = tokenNames(semanticCss, /--qy-([a-z0-9-]+)\s*:/g).filter((name) => !name.startsWith("shadow-"));
const shadowNames = tokenNames(semanticCss, /--qy-(shadow-[a-z0-9-]+)\s*:/g);
const textRoles = tokenNames(componentsCss, /--qy-text-([a-z]+)-size\s*:/g);
const spaceNames = tokenNames(componentsCss, /--qy-(space-\d+)\s*:/g);
const radiusNames = tokenNames(componentsCss, /--qy-(radius(?:-[a-z0-9]+)?)\s*:/g);
const controlNames = tokenNames(componentsCss, /--qy-(control-[a-z]+)\s*:/g);
const densityNames = ["touch-target", "row-default", "row-compact", "panel-padding", "panel-padding-sm", "panel-gap", "section-gap", "topbar-height"].filter(
  (name) => componentsCss.includes(`--qy-${name}:`)
);
const durationNames = tokenNames(componentsCss, /--qy-(duration-[a-z]+)\s*:/g);
const easeNames = tokenNames(componentsCss, /--qy-(ease-[a-z-]+)\s*:/g);
const typeTokens = textRoles.flatMap((role) => [`text-${role}-size`, `text-${role}-leading`]);
const controlTokens = [...controlNames, ...densityNames];
const motionTokens = [...durationNames, ...easeNames, "stagger"];
const utilityFor = (() => {
  const map = /* @__PURE__ */ new Map();
  for (const [, color, token] of themeCss.matchAll(/--color-([a-z0-9-]+):\s*var\(--qy-([a-z0-9-]+)\)/g)) {
    map.set(token, [...map.get(token) ?? [], color]);
  }
  return (token) => map.get(token) ?? [];
})();
const COLOR_GROUPS = [
  { title: "页面与表面", id: "color-surface", test: (n) => /^(background|surface|overlay)/.test(n) },
  { title: "文字", id: "color-text", test: (n) => /^foreground/.test(n) },
  { title: "线条与焦点", id: "color-lines", test: (n) => /^(border|ring)/.test(n) },
  { title: "强调", id: "color-emphasis", test: (n) => /^(primary|accent)/.test(n) },
  { title: "状态", id: "color-status", test: (n) => /^(danger|warning|success|info)/.test(n) },
  { title: "图表", id: "color-chart", test: (n) => /^chart-/.test(n) },
  { title: "代码与侧栏", id: "color-code", test: (n) => /^(code|sidebar)/.test(n) }
];
function toHex(ctx, color) {
  ctx.clearRect(0, 0, 1, 1);
  ctx.fillStyle = "#000";
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const [r = 0, g = 0, b = 0, a = 255] = ctx.getImageData(0, 0, 1, 1).data;
  const hex = `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
  return { hex, alpha: a / 255 };
}
function useResolvedColors(names) {
  const light = reactExports.useRef(null);
  const dark = reactExports.useRef(null);
  const [values, setValues] = reactExports.useState(null);
  reactExports.useLayoutEffect(() => {
    const ctx = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
    if (!ctx || !light.current || !dark.current) return;
    const read = (host) => {
      const probe = host.firstElementChild;
      const style = getComputedStyle(host);
      const out = {};
      for (const name of names) {
        probe.style.backgroundColor = `var(--qy-${name})`;
        const computed = getComputedStyle(probe).backgroundColor;
        out[name] = { raw: style.getPropertyValue(`--qy-${name}`).trim(), ...toHex(ctx, computed) };
      }
      return out;
    };
    setValues({ light: read(light.current), dark: read(dark.current) });
  }, [names]);
  const probes = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "aria-hidden": "true", className: "pointer-events-none invisible absolute size-0 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "light", ref: light, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dark", ref: dark, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}) })
  ] });
  return { values, probes };
}
function formatColor(value2) {
  if (!value2) return "…";
  return value2.alpha < 0.999 ? `${value2.hex} · ${Math.round(value2.alpha * 100)}%` : value2.hex;
}
function surfaceFor(name) {
  const base = name.replace(/-foreground$/, "");
  if (base === name || /^(danger|warning|success|info)$/.test(base)) return null;
  return colorNames.includes(base) ? `var(--qy-${base})` : null;
}
function Swatch({ name, scheme }) {
  const token = `var(--qy-${name})`;
  const isText = name.includes("foreground");
  const isLine = /^(border|ring|sidebar-border|sidebar-ring)/.test(name);
  const surface = isText ? surfaceFor(name) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(scheme, "grid size-11 shrink-0 place-items-center rounded-lg border bg-background"),
      title: scheme === "light" ? "浅色" : "深色",
      children: isText ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "grid size-8 place-items-center rounded-md font-semibold text-[0.9375rem]",
          style: { color: token, ...surface ? { background: surface } : {} },
          children: "Aa"
        }
      ) : isLine ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-6 rounded-md", style: { boxShadow: `inset 0 0 0 1.5px ${token}` } }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-6 rounded-md", style: { background: token, boxShadow: "inset 0 0 0 1px oklch(0.5 0 0 / 0.12)" } })
    }
  );
}
function ColorTokens() {
  const { values, probes } = useResolvedColors(colorNames);
  const assigned = /* @__PURE__ */ new Set();
  const groups = COLOR_GROUPS.map((group) => {
    const items = colorNames.filter((name) => !assigned.has(name) && group.test(name));
    for (const name of items) assigned.add(name);
    return { ...group, items };
  });
  const rest = colorNames.filter((name) => !assigned.has(name));
  if (rest.length) groups.push({ title: "其他", id: "color-other", test: () => true, items: rest });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    probes,
    groups.filter((group) => group.items.length).map((group) => /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(H3, { id: group.id, children: group.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden grid-cols-[6.25rem_minmax(0,1fr)_7.5rem_7.5rem] gap-4 border-b bg-surface-subtle/60 px-4 py-2 text-muted-foreground text-xs sm:grid dark:bg-surface/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "浅色 / 深色" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "令牌" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "浅色" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "深色" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y", children: group.items.map((name) => {
          const light = values?.light[name];
          const dark = values?.dark[name];
          const utilities = utilityFor(name);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "li",
            {
              className: "grid grid-cols-[6.25rem_minmax(0,1fr)] items-center gap-x-4 gap-y-1 px-4 py-3 sm:grid-cols-[6.25rem_minmax(0,1fr)_7.5rem_7.5rem]",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row-span-2 flex gap-1.5 sm:row-span-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Swatch, { name, scheme: "light" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Swatch, { name, scheme: "dark" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col gap-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("code", { className: "truncate font-mono text-[0.8125rem] text-foreground-strong", children: [
                    "--qy-",
                    name
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-muted-foreground text-xs", children: utilities.length ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    "Tailwind：",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: utilities.join(" / ") })
                  ] }) : "仅以变量使用" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-start-2 flex gap-3 font-mono text-[0.75rem] text-foreground/80 numeric sm:contents", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", title: light?.raw, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground-subtle sm:hidden", children: "浅 " }),
                    formatColor(light)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", title: dark?.raw, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground-subtle sm:hidden", children: "深 " }),
                    formatColor(dark)
                  ] })
                ] })
              ]
            },
            name
          );
        }) })
      ] })
    ] }, group.id))
  ] });
}
function useRootValues(names) {
  const [values, setValues] = reactExports.useState({});
  reactExports.useLayoutEffect(() => {
    const style = getComputedStyle(document.documentElement);
    setValues(Object.fromEntries(names.map((name) => [name, style.getPropertyValue(`--qy-${name}`).trim()])));
  }, [names]);
  return values;
}
const toPx = (value2) => {
  const rem = value2.match(/^([\d.]+)rem$/);
  if (rem) return `${Number.parseFloat(rem[1]) * 16}px`;
  return value2;
};
function TokenTable({ head, rows }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-4 overflow-x-auto rounded-xl border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[30rem] text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "border-b bg-surface-subtle/60 text-start text-muted-foreground text-xs dark:bg-surface/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: head.map((cell) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-start font-medium", children: cell }, cell)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y", children: rows.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: row.map((cell, j) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 align-middle", children: cell }, j)) }, i)) })
  ] }) });
}
const mono = (text) => /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono text-[0.8125rem] text-foreground-strong", children: text });
const value = (text) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[0.75rem] text-muted-foreground numeric", children: text || "…" });
const TYPE_WEIGHT = { display: 600, title: 600, heading: 600, label: 500 };
function TypeScale() {
  const values = useRootValues(typeTokens);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-4 overflow-hidden rounded-xl border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y", children: textRoles.map((role) => {
    const size = values[`text-${role}-size`];
    const leading = values[`text-${role}-leading`];
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex flex-col gap-2 px-4 py-4 sm:flex-row sm:items-baseline sm:gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-32 shrink-0 flex-col gap-0.5", title: size, children: [
        mono(`text-${role}`),
        value(size ? `${toPx(size)} / ${leading}` : void 0)
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "min-w-0 truncate text-foreground-strong",
          style: { fontSize: `var(--qy-text-${role}-size)`, lineHeight: `var(--qy-text-${role}-leading)`, fontWeight: TYPE_WEIGHT[role] ?? 400 },
          children: "精致耐看 Refined 0123"
        }
      )
    ] }, role);
  }) }) });
}
function Spacing() {
  const values = useRootValues(spaceNames);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    TokenTable,
    {
      head: ["令牌", "值", ""],
      rows: spaceNames.map((name) => [
        mono(`--qy-${name}`),
        value(values[name] ? `${values[name]} · ${toPx(values[name])}` : void 0),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", className: "block h-2.5 rounded-sm bg-foreground/16", style: { width: `var(--qy-${name})`, minWidth: 1 } })
      ])
    }
  );
}
function Radii() {
  const tiles = reactExports.useRef(null);
  const [resolved, setResolved] = reactExports.useState({});
  reactExports.useLayoutEffect(() => {
    const out = {};
    tiles.current?.querySelectorAll("[data-radius]").forEach((el) => {
      out[el.dataset.radius] = getComputedStyle(el).borderTopLeftRadius;
    });
    setResolved(out);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "my-4 grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-4", ref: tiles, children: radiusNames.map((name) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex flex-col gap-2.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "size-16 border border-foreground/16 bg-surface-subtle dark:bg-surface",
        "data-radius": name,
        style: { borderRadius: `var(--qy-${name})` }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
      mono(`--qy-${name}`),
      value(name === "radius-full" ? "9999px" : resolved[name])
    ] })
  ] }, name)) });
}
function Shadows() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "my-4 grid grid-cols-2 gap-4 rounded-xl border bg-surface-subtle/60 p-5 sm:grid-cols-4 dark:bg-background", children: shadowNames.map((name) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 rounded-xl bg-card", style: { boxShadow: `var(--qy-${name})` } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("code", { className: "font-mono text-[0.75rem] text-foreground-strong", children: [
      "--qy-",
      name
    ] })
  ] }, name)) });
}
const CONTROL_SIZE = {
  "control-xs": "xs",
  "control-sm": "sm",
  "control-md": "default",
  "control-lg": "lg",
  "control-xl": "xl"
};
function Controls() {
  const values = useRootValues(controlTokens);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TokenTable,
      {
        head: ["令牌", "桌面", "移动端", "按钮"],
        rows: controlNames.map((name) => {
          const desktop = values[name];
          const px = desktop ? Number.parseFloat(desktop) * 16 : 0;
          const size = CONTROL_SIZE[name];
          return [
            mono(`--qy-${name}`),
            value(desktop ? `${desktop} · ${px}px` : void 0),
            value(desktop ? `${px + 4}px` : void 0),
            size ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "aria-hidden": "true", size, tabIndex: -1, variant: "outline", children: size === "default" ? "默认" : size }) : null
          ];
        })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TokenTable,
      {
        head: ["密度令牌", "默认值"],
        rows: densityNames.map((name) => [mono(`--qy-${name}`), value(values[name] ? `${values[name]} · ${toPx(values[name])}` : void 0)])
      }
    )
  ] });
}
function MotionTokens() {
  const values = useRootValues(motionTokens);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [played, setPlayed] = reactExports.useState(false);
  const track = (style) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-3 w-full min-w-24 rounded-full bg-foreground/6 [container-type:inline-size]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: "absolute top-0 start-0 size-3 rounded-full bg-foreground",
      style: { translate: played ? "calc(100cqw - 0.75rem) 0" : "0 0", transitionProperty: "translate", ...style, ...reduced ? { transitionDuration: "0s" } : {} }
    }
  ) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setPlayed((value2) => !value2), size: "sm", variant: "outline", children: [
        played ? /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { "aria-hidden": "true" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { "aria-hidden": "true" }),
        played ? "回到起点" : "播放"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: reduced ? "系统开启了“减少动态效果”，示例改为即时切换。" : "所有圆点同时出发，到达的先后就是时长的差别。" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(H3, { id: "durations", children: "时长" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TokenTable,
      {
        head: ["令牌", "值", "演示（缓动 ease-out）"],
        rows: durationNames.map((name) => [
          mono(`--qy-${name}`),
          value(values[name]),
          track({ transitionDuration: `var(--qy-${name})`, transitionTimingFunction: "var(--qy-ease-out)" })
        ])
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(H3, { id: "easings", children: "缓动" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TokenTable,
      {
        head: ["令牌", "曲线", "演示（放慢到 600ms）"],
        rows: easeNames.map((name) => [
          mono(`--qy-${name}`),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block max-w-56 truncate", children: value(values[name]) }),
          track({ transitionDuration: "600ms", transitionTimingFunction: `var(--qy-${name})` })
        ])
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(P, { className: "text-[0.875rem] text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "--qy-ease-spring" }),
      " 只用于通知的成功脉冲，其余动效一律不回弹。列表逐项进场的间隔是 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "--qy-stagger" }),
      "（",
      values.stagger || "…",
      "），最多累计 8 项。"
    ] })
  ] });
}
function TokensPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        description: "下面的每个数值都在页面加载时从库的 CSS 中读出，与组件实际使用的完全一致。",
        title: "设计令牌"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(P, { children: [
      "令牌分为原语、语义与组件三层，见 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(A, { href: "/docs/theming#layers", children: "主题" }),
      "。组件只读取语义与组件两层；覆盖它们就能定制整个库。"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(H2, { id: "colors", children: "颜色" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(P, { children: "每个语义颜色都同时给出浅色与深色下的取值。中性色大多是半透明的黑或白，所以放在卡片、侧栏或浮层上都能保持相同的观感；色块按各自主题的背景展示。" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ColorTokens, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(H2, { id: "typography", children: "字号" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(P, { children: [
      "字号与行高成对出现，Tailwind 中写作 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "text-body" }),
      "、",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "text-label" }),
      " 等。字重只用 400、500、600：标题 600，标签与按钮 500。"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TypeScale, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(H2, { id: "spacing", children: "间距" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(P, { children: [
      "以 4px 为基数。组件内部间距直接使用 Tailwind 的 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "--spacing" }),
      "，这里的令牌供布局与自定义组件使用。"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Spacing, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(H2, { id: "radius", children: "圆角" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(P, { children: [
      "全部由 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "--qy-radius" }),
      " 派生。徽章与复选框用 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "sm" }),
      "，菜单项用 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "md" }),
      "，控件与浮层用 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "lg" }),
      "，提示条用 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "xl" }),
      "，卡片与弹窗用 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "2xl" }),
      "。"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Radii, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(H2, { id: "shadows", children: "阴影" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(P, { children: "层次主要来自半透明边框，阴影只起辅助作用。下方按当前主题显示；深色下阴影更重，以便在暗背景上仍可分辨。" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Shadows, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(H2, { id: "controls", children: "控件高度与密度" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(P, { children: [
      "控件高度令牌是桌面值。移动端统一加高 4px，避免 iOS 输入时缩放并方便点按；粗指针下独立控件的点击区扩展到 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: "--qy-touch-target" }),
      "。"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Controls, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(H2, { id: "motion", children: "动效" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(P, { children: [
      "时长短、缓动统一、随时可被打断。使用规则见 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(A, { href: "/docs/motion", children: "动效" }),
      "。"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MotionTokens, {})
  ] });
}
export {
  TokensPage as default
};
