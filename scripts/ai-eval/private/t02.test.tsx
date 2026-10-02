import * as React from 'react';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { render } from '@testing-library/react';
import { test, expect } from 'vitest';
import { Fields } from '__VIEW__';
const require = createRequire('__UI_PACKAGE__');
const postcss = createRequire('__TOOLING_PACKAGE__')('postcss');
const css = readFileSync('__CSS__', 'utf8');
const ast = postcss.parse(css);
function valueFor(brand: string | null, dark: boolean, compact: boolean, attribute: boolean) {
  const html = document.documentElement; html.className = attribute ? '' : dark ? 'dark' : 'light';
  if (brand) html.setAttribute('data-brand', brand); else html.removeAttribute('data-brand');
  if (attribute) html.setAttribute('data-theme', dark ? 'dark' : 'light'); else html.removeAttribute('data-theme');
  html.setAttribute('data-density', compact ? 'compact' : 'comfortable');
  const values: Record<string, string> = { '--qy-field-group-gap': 'var(--qy-space-5)', '--qy-space-5': '20px', '--qy-space-3': '12px', '--qy-field-gap': '8px', '--qy-control-md': '36px', '--qy-touch-target': '44px' };
  ast.walkRules((rule: any) => { if (html.matches(rule.selector)) rule.walkDecls((decl: any) => { values[decl.prop] = decl.value; }); });
  function resolve(value: string, depth = 0): string { if (depth > 8) throw new Error('Cyclic variable'); return value.replace(/var\((--[\w-]+)\)/g, (_: string, name: string) => resolve(values[name] ?? '', depth + 1)); }
  return { gap: resolve(values['--qy-field-group-gap']!), values };
}
test('[boundary] only the relationship token is declared at the project owner', () => {
  const declarations: any[] = []; ast.walkDecls((decl: any) => declarations.push(decl)); expect(declarations.length).toBeGreaterThan(0);
  for (const declaration of declarations) { expect(declaration.prop).toBe('--qy-field-group-gap'); expect(declaration.important).toBeFalsy(); }
  // Context-free relationship overrides avoid theme-axis or per-page geometry coupling.
  // Layer wrapping is a valid theme-owner implementation. Conditional rules
  // are outside this finite probe's coverage and receive no browser claim.
});
test('[scope] Sentinel light/dark and both density/marker modes use 12px', () => {
  for (const dark of [false, true]) for (const compact of [false, true]) for (const attribute of [false, true]) expect(valueFor('sentinel', dark, compact, attribute).gap).toBe('12px');
});
test('[scope] default and unrelated brand preserve relationship and control roles', () => {
  for (const brand of [null, 'other']) for (const dark of [false, true]) for (const compact of [false, true]) {
    const result = valueFor(brand, dark, compact, false); expect(result.gap).toBe('20px');
    expect(result.values['--qy-control-md']).toBe('36px'); expect(result.values['--qy-touch-target']).toBe('44px'); expect(result.values['--qy-field-gap']).toBe('8px');
  }
});
test('[api] two existing FieldGroups consume the public role without scattered page edits', () => {
  const { container } = render(<Fields />); const groups = container.querySelectorAll('[data-slot="field-group"]'); expect(groups).toHaveLength(2);
  for (const group of groups) expect(group.classList.contains('gap-(--qy-field-group-gap)')).toBe(true);
  expect(container.querySelectorAll('[data-slot="field"]')).toHaveLength(4);
});
