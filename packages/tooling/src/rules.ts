import type { Layer } from './types.js';

export type RuleId =
  | 'token/undefined'
  | 'visual/hardcoded'
  | 'visual/dynamic'
  | 'theme/axes'
  | 'theme/dynamic'
  | 'imports/private'
  | 'imports/unresolved'
  | 'imports/invalid-export'
  | 'imports/missing-peer';

export interface RuleDefinition {
  rule: RuleId;
  ruleVersion: 1;
  anchor: string;
  repairGuide: string;
  layer: Layer;
  defaultDecision: string;
}

const guide = (anchor: string) => `@qingye/tooling/diagnostics.md#${anchor}`;

function defineRule(rule: RuleId, layer: Layer, defaultDecision: string): RuleDefinition {
  const anchor = rule.replace('/', '-');
  return { rule, ruleVersion: 1, anchor, repairGuide: guide(anchor), layer, defaultDecision };
}

export const DIAGNOSTIC_RULES: Record<RuleId, RuleDefinition> = {
  'token/undefined': defineRule('token/undefined', 'P', 'Use an installed registered token or explicit project token definition'),
  'visual/hardcoded': defineRule('visual/hardcoded', 'P', 'Move repeated visual decisions into the configured project theme/recipe'),
  'visual/dynamic': defineRule('visual/dynamic', 'P', 'Review runtime visual expression; static scan cannot determine its value'),
  'theme/axes': defineRule('theme/axes', 'P', 'Use data-brand for brand and reserve data-theme for light/dark'),
  'theme/dynamic': defineRule('theme/dynamic', 'P', 'Verify dynamic theme axis at runtime'),
  'imports/private': defineRule('imports/private', 'A', 'Import through an installed package public export'),
  'imports/unresolved': defineRule('imports/unresolved', 'A', 'Resolve the actual dependency/alias; unresolved modules are not validated'),
  'imports/invalid-export': defineRule('imports/invalid-export', 'A', 'Use the actual installed module exports'),
  'imports/missing-peer': defineRule('imports/missing-peer', 'A', 'Install the optional peer required by this actually used component, or choose a component without it'),
};
