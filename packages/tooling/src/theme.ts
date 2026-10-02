import { existsSync, unlinkSync } from 'node:fs';
import postcss from 'postcss';
import { loadProject, tokenRegistry, inside, json, read, hash, writeAtomic } from './project.js';
import { ToolError, type Theme, type Project } from './types.js';

const axes = ['common','light','dark','compact'] as const;
const HEADER = '/* Qingye UI generated theme. READ ONLY; edit ui.theme.json. */';
export function validateTheme(project: Project, candidate: unknown) {
  const theme = candidate as Theme, registry = new Set(tokenRegistry(project).map(t => t.name)), errors: string[] = [];
  if (!theme || typeof theme !== 'object' || Array.isArray(theme)) return { status: 'FAIL' as const, errors: ['Theme must be an object'] };
  if (Object.keys(theme).some(k => !['schemaVersion','brand',...axes].includes(k))) errors.push('Unknown theme field');
  if (theme.schemaVersion !== 1) errors.push('schemaVersion must be 1');
  if (typeof theme.brand !== 'string' || !/^[a-z][a-z0-9-]{0,63}$/.test(theme.brand) || ['light','dark'].includes(theme.brand)) errors.push('brand must be a distinct CSS-safe project identity');
  for (const axis of axes) {
    const values = theme[axis];
    if (!values || typeof values !== 'object' || Array.isArray(values)) { errors.push(`${axis} must be a token object`); continue; }
    for (const [token,value] of Object.entries(values)) {
      if (!registry.has(token)) errors.push(`Unregistered token: ${token}`);
      if (typeof value !== 'string' || !value.trim() || /[{};\0]|!important|\b(?:url|expression)\s*\(/i.test(value)) { errors.push(`Unsafe or empty token value: ${token}`); continue; }
      try {
        const ast = postcss.parse(`html{${token}:${value}}`);
        let count = 0; ast.walkDecls(d => { count++; if (d.prop !== token) errors.push(`Invalid value for ${token}`); });
        if (count !== 1) errors.push(`Invalid declaration: ${token}`);
        for (const ref of value.match(/--qy-[a-zA-Z0-9-]+/g) ?? []) if (!registry.has(ref)) errors.push(`Unregistered reference ${ref} in ${token}`);
      } catch { errors.push(`Cannot parse value for ${token}`); }
    }
  }
  return { status: errors.length ? 'FAIL' as const : 'PASS' as const, errors, limitation: 'Syntactic registered-token validation; cascade, contrast and visual acceptance require the explicit browser checks.' };
}
export function themeCss(theme: Theme, mode: 'class' | 'data-theme') {
  const brand = `html[data-brand="${theme.brand}"]`;
  const selectors = { common: brand, light: `${brand}${mode === 'class' ? '.light' : '[data-theme="light"]'}`, dark: `${brand}${mode === 'class' ? '.dark' : '[data-theme="dark"]'}`, compact: `${brand}[data-density="compact"]` };
  return `${HEADER}\n${axes.filter(axis => Object.keys(theme[axis]).length).map(axis => `${selectors[axis]} {\n${Object.entries(theme[axis]).sort(([a],[b]) => a.localeCompare(b)).map(([k,v]) => `  ${k}: ${v};`).join('\n')}\n}`).join('\n\n')}\n`;
}
export function getTheme(projectPath: string) {
  const project = loadProject(projectPath), source = inside(project.root, project.config.theme.source), generated = inside(project.root, project.config.theme.generated);
  const theme = existsSync(source) ? json(source) as Theme : null;
  const css = existsSync(generated) ? read(generated) : null;
  const validation = theme ? validateTheme(project,theme) : { status: 'NOT_RUN', errors: ['No theme source'] };
  return { status: validation.status, validation, theme, css, fingerprint: existsSync(source) ? hash(read(source)) : null, generatedFingerprint: css === null ? null : hash(css), configFingerprint: project.configFingerprint, generatedMatches: Boolean(theme && validation.status === 'PASS' && css === themeCss(theme,project.config.theme.mode)), registry: tokenRegistry(project), legacy: inspectLegacy(project), limitation: 'Only generated CSS is managed. Existing handwritten CSS remains read only.' };
}
export function inspectLegacy(project: Project) {
  const registry = new Set(tokenRegistry(project).map(t => t.name));
  return (project.config.theme.legacyCss ?? []).map(name => {
    const ast = postcss.parse(read(inside(project.root,name)), { from: name });
    const recognized: any[] = [], unmanaged: any[] = [];
    ast.walkDecls(decl => {
      const parent = decl.parent;
      const selector = parent?.type === 'rule' ? (parent as postcss.Rule).selector : '';
      const supported = /^html\[data-brand="([a-z][a-z0-9-]*)"\](?:\.(light|dark)|\[data-theme="(light|dark)"\]|\[data-density="compact"\])?$/.exec(selector);
      const nested = parent?.parent?.type !== 'root';
      const result = { token: decl.prop, value: decl.value, selector, line: decl.source?.start?.line ?? 1, evidence: decl.toString() };
      if (supported && !nested && registry.has(decl.prop)) recognized.push({ ...result, brand: supported[1], axis: supported[2] ?? supported[3] ?? (selector.includes('data-density') ? 'compact' : 'common') });
      else unmanaged.push({ ...result, reason: 'Not an exact managed selector/token; preserve by hand' });
    });
    ast.walkAtRules(rule => { unmanaged.push({ evidence: rule.toString(), line: rule.source?.start?.line ?? 1, reason: 'At-rule requires manual migration' }); });
    const candidates: Record<string,Theme> = {};
    for (const entry of recognized) { const t = candidates[entry.brand] ?? { schemaVersion: 1, brand: entry.brand, common: {}, light: {}, dark: {}, compact: {} }; (t as any)[entry.axis][entry.token] = entry.value; candidates[entry.brand] = t; }
    return { path: name, status: unmanaged.length ? 'UNVERIFIED' : 'PASS', recognized, unmanaged, migrationCandidates: Object.values(candidates), migration: 'One-way candidates only. Original CSS is untouched; review unmanaged rules and remove adopted duplicate variables manually.' };
  });
}
export function updateTheme(projectPath: string, theme: Theme, options: { apply?: boolean; fingerprint: string | null; generatedFingerprint: string | null; configFingerprint: string }) {
  const project = loadProject(projectPath), current = getTheme(projectPath), validation = validateTheme(project,theme);
  if (validation.status !== 'PASS') throw new ToolError(validation.errors.join('; '), 'INVALID_THEME');
  const css = themeCss(theme,project.config.theme.mode), before = current.theme;
  const diff = axes.flatMap(axis => [...new Set([...Object.keys(before?.[axis] ?? {}),...Object.keys(theme[axis])])].sort().filter(k => before?.[axis]?.[k] !== theme[axis][k]).map(token => ({ axis, token, before: before?.[axis]?.[token] ?? null, after: theme[axis][token] ?? null })));
  if (before?.brand !== theme.brand) diff.unshift({ axis: 'common', token: 'brand', before: before?.brand ?? null, after: theme.brand });
  const conflict = options.fingerprint !== current.fingerprint || options.generatedFingerprint !== current.generatedFingerprint || options.configFingerprint !== current.configFingerprint;
  if (conflict) throw new ToolError('Theme/config/generated source changed; reload and review a new diff', 'SOURCE_CONFLICT');
  if (current.css !== null && !current.css.startsWith(HEADER)) throw new ToolError('Configured generated target contains handwritten/third-party CSS; choose a separate empty generated target', 'GENERATED_CONFLICT');
  if (options.apply) {
    const sourceName = project.config.theme.source, cssName = project.config.theme.generated;
    const sourceBefore = before ? read(inside(project.root,sourceName)) : null;
    const sourceText = `${JSON.stringify(theme,null,2)}\n`;
    if (current.fingerprint !== hash(sourceText)) writeAtomic(project.root, sourceName, sourceText, current.fingerprint);
    try { if (current.css !== css) writeAtomic(project.root, cssName, css, current.generatedFingerprint); }
    catch (error) {
      // Roll back our source only when it is still our own write; never overwrite another editor.
      const sourcePath = inside(project.root,sourceName);
      if (existsSync(sourcePath) && hash(read(sourcePath)) === hash(sourceText)) {
        if (sourceBefore !== null) writeAtomic(project.root,sourceName,sourceBefore,hash(sourceText));
        else unlinkSync(sourcePath);
      }
      throw error;
    }
  }
  return { status: 'PASS', applied: Boolean(options.apply), diff, css, theme, fingerprint: options.apply ? hash(`${JSON.stringify(theme,null,2)}\n`) : current.fingerprint, limitation: 'Each file is atomically replaced with optimistic concurrency. Cross-file consistency is checked on every read; browser effects remain unverified.' };
}
