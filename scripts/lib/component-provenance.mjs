import { posix } from 'node:path';
import { ts, parseTS, exists } from './ui-facts.mjs';

// Follow only pure, relative re-export facades. A wrapper with executable code
// is not automatically attributed to the module it happens to import.
export function componentProvenance(path, entries, seen = new Set()) {
  const direct = entries.find((entry) => `packages/ui/${entry.file}` === path);
  if (direct) return { entry: direct, implementation: path, chain: [] };
  if (seen.has(path)) return null;
  const visited = new Set([...seen, path]);
  const source = parseTS(path);
  const targets = new Set();
  for (const statement of source.statements) {
    if (ts.isExpressionStatement(statement) && ts.isStringLiteral(statement.expression)) continue;
    if (ts.isInterfaceDeclaration(statement) || ts.isTypeAliasDeclaration(statement)) continue;
    if (ts.isImportDeclaration(statement) && statement.importClause?.isTypeOnly) continue;
    if (!ts.isExportDeclaration(statement)) return null;
    if (statement.isTypeOnly) continue;
    if (statement.exportClause && ts.isNamedExports(statement.exportClause) && statement.exportClause.elements.every((entry) => entry.isTypeOnly)) continue;
    if (!statement.moduleSpecifier || !ts.isStringLiteral(statement.moduleSpecifier) || !statement.moduleSpecifier.text.startsWith('.')) return null;
    const base = posix.normalize(posix.join(posix.dirname(path), statement.moduleSpecifier.text));
    if (!base.startsWith('packages/ui/src/components/')) return null;
    const target = [base, `${base}.tsx`, `${base}.ts`].find((candidate) => /\.tsx?$/.test(candidate) && exists(candidate));
    if (!target) return null;
    targets.add(target);
  }
  if (targets.size !== 1) return null;
  const target = [...targets][0];
  const owner = componentProvenance(target, entries, visited);
  return owner ? { ...owner, chain: [target, ...owner.chain] } : null;
}
