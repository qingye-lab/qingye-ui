// Finds accessible names that cannot tell two controls apart, from a Playwright
// `locator.ariaSnapshot()` text. Pure functions, no browser. See docs/browser-audit.md.
//
//   R2  within one scope, two operable elements share role and name
//       (links that share a name AND the same /url are one object reached twice — WCAG 2.4.4 —
//       so they are not reported; a link without a known /url never takes that exemption)
//   R3  two landmarks of the same role share a name (including both unnamed)
//
// An operable element with an EMPTY name is not this check's business: axe's
// button-name, link-name, label … rules (scripts/axe-audit.mjs) already fail it.

export const OPERABLE = new Set([
  "button", "link", "checkbox", "radio", "switch", "combobox", "textbox", "searchbox",
  "spinbutton", "slider", "tab", "menuitem", "menuitemcheckbox", "menuitemradio",
]);
// Containers that give a name its neighbourhood. listitem, row and cell are deliberately absent:
// a "delete" repeated per row must carry its object in the name, so that repeat is reported.
export const SCOPES = new Set([
  "region", "form", "navigation", "main", "complementary", "banner", "contentinfo", "search",
  "dialog", "alertdialog", "group", "radiogroup", "toolbar", "tablist", "menu", "menubar",
]);
export const LANDMARKS = new Set([
  "navigation", "complementary", "form", "search", "region", "main", "banner", "contentinfo",
]);

/** One snapshot line key: `role "name" [attr] [attr]`; returns the node and the text after the key. */
function parseKey(key) {
  const role = /^[^\s":]+/.exec(key)?.[0];
  if (!role) return null;
  let i = role.length;
  let name = "";
  if (key[i] === " " && key[i + 1] === '"') {
    let j = i + 2;
    while (j < key.length && key[j] !== '"') j += key[j] === "\\" ? 2 : 1;
    const literal = key.slice(i + 1, j + 1);
    try { name = JSON.parse(literal); } catch { name = literal.slice(1, -1); }
    i = j + 1;
  }
  return { role, name, rest: key.slice(i) };
}

/** Unquote a YAML single-quoted key at the start of `body`; returns [inner, remainder]. */
function singleQuoted(body) {
  let out = "";
  let i = 1;
  while (i < body.length) {
    if (body[i] === "'") {
      if (body[i + 1] === "'") { out += "'"; i += 2; continue; }
      return [out, body.slice(i + 1)];
    }
    out += body[i++];
  }
  return [out, ""];
}

/** Parse ariaSnapshot text into `{ role, name, children }`. Text and `/url`-style property lines are dropped. */
export function parseAriaSnapshot(text) {
  const root = { role: "root", name: "", children: [] };
  const stack = [{ indent: -1, node: root }];
  for (const raw of String(text).split("\n")) {
    const m = /^(\s*)- (.*)$/.exec(raw);
    if (!m) continue;
    const indent = m[1].length;
    let key = m[2];
    let after = "";
    if (key.startsWith("'")) {
      const [inner, remainder] = singleQuoted(key);
      key = inner;
      after = remainder;
    }
    const parsed = parseKey(key);
    if (!parsed) continue;
    if (!after) after = parsed.rest;
    while (stack.length > 1 && stack[stack.length - 1].indent >= indent) stack.pop();
    if (parsed.role === "/url") {
      const value = parsed.rest.replace(/^:\s*/, "");
      let url = value;
      if (value.startsWith('"')) { try { url = JSON.parse(value); } catch { url = value.slice(1, -1); } }
      else if (value.startsWith("'")) url = singleQuoted(value)[0];
      stack[stack.length - 1].node.url = url;
      continue;
    }
    if (parsed.role === "text" || parsed.role.startsWith("/")) continue;
    const node = { role: parsed.role, name: parsed.name, children: [] };
    stack[stack.length - 1].node.children.push(node);
    stack.push({ indent, node });
  }
  return root;
}

const label = (node) => node.name ? `${node.role} "${node.name}"` : node.role;

/** @returns {{ rule: "R2" | "R3", role: string, name: string, scope: string, count: number }[]} */
export function findNameIssues(tree) {
  const issues = [];
  const landmarks = new Map();
  const walk = (node, scope) => {
    for (const child of node.children) {
      const name = child.name.trim();
      if (OPERABLE.has(child.role) && name) {
        const key = `${child.role}\0${name}`;
        const entry = scope.seen.get(key) ?? { count: 0, urls: new Set() };
        entry.count += 1;
        entry.urls.add(child.url);
        scope.seen.set(key, entry);
      }
      if (LANDMARKS.has(child.role)) {
        const key = `${child.role}\0${name}`;
        landmarks.set(key, (landmarks.get(key) ?? 0) + 1);
      }
      const next = SCOPES.has(child.role) && name
        ? { path: scope.root ? label(child) : `${scope.path} > ${label(child)}`, seen: new Map() }
        : scope;
      if (next !== scope) scopes.push(next);
      walk(child, next);
    }
  };
  const top = { path: "(root)", root: true, seen: new Map() };
  const scopes = [top];
  walk(tree, top);
  for (const scope of scopes) {
    for (const [key, { count, urls }] of scope.seen) {
      if (count < 2) continue;
      const [role, name] = key.split("\0");
      if (role === "link" && urls.size === 1 && !urls.has(undefined)) continue;
      issues.push({ rule: "R2", role, name, scope: scope.path, count });
    }
  }
  for (const [key, count] of landmarks) {
    if (count < 2) continue;
    const [role, name] = key.split("\0");
    issues.push({ rule: "R3", role, name, scope: "(root)", count });
  }
  return issues;
}

/**
 * Separates findings that sit inside a specimen: a region whose author marked it `data-specimen`
 * because it lays one control out side by side in several looks or states, so equal names are intended.
 * `flags[i]` lists, for issues[i], whether each control with that role and name under the root is inside
 * such a region. Only R2 can be a specimen, and only when every match is inside one; when nothing was
 * located (empty list) the finding stays a finding. Specimens are still reported, in their own list.
 */
export function splitSpecimens(issues, flags) {
  const kept = [];
  const specimens = [];
  issues.forEach((issue, i) => {
    const inside = flags[i] ?? [];
    (issue.rule === "R2" && inside.length > 0 && inside.every(Boolean) ? specimens : kept).push(issue);
  });
  return { issues: kept, specimens };
}
