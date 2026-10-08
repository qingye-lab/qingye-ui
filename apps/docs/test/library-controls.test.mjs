import assert from "node:assert/strict";
import test from "node:test";
import { inspectDocsControls, inspectLibraryControls } from "../scripts/check-library-controls.mjs";

test("native control JSX is checked while strings and layout remain content", () => {
  const result = inspectLibraryControls('const example = `<button>code only</button>`; export const View = () => <main><form><button>Save</button><input /><select><option>One</option></select><textarea /><label>Name</label></form></main>;');
  assert.equal(result.violations.length, 6);
  assert.ok(result.violations.every((violation) => violation.line === 1));
  assert.equal(inspectLibraryControls('export const View = () => <main><a href="/docs">Docs</a><table><tbody><tr><td>Data</td></tr></tbody></table></main>;').violations.length, 0);
});

test("library render roots include aliases, namespaces and callbacks", () => {
  const result = inspectLibraryControls(`
    import { Item as Row } from "@qingye_lab/ui/components/item";
    import * as UI from "@qingye_lab/ui";
    export const View = () => <>
      <Row render={<button type="button" />} />
      <UI.Badge render={(props) => <button {...props} />} />
      <Row render={(props) => { return <button {...props} />; }} />
    </>;
  `);
  assert.deepEqual(result.violations, []);
  assert.equal(result.renderPrimitives, 3);
});

test("render attributes do not exempt unrelated or nested controls", () => {
  const result = inspectLibraryControls(`
    import { Item } from "@qingye_lab/ui/components/item";
    import { Other } from "./other";
    export const View = () => <>
      <Other render={<button />} />
      <Item render={<div><button /></div>} />
      <Item render={<button><input /></button>} />
    </>;
  `);
  assert.equal(result.violations.length, 3);
  assert.equal(result.renderPrimitives, 1);
});

test("disclosure controls use Collapsible while code strings remain examples", () => {
  const result = inspectLibraryControls('const code = `<details><summary>Example</summary></details>`; export const View = () => <details><summary>Source</summary><p>Content</p></details>;');
  assert.equal(result.violations.length, 2);
});

test("Button navigation is distinct from commands and native styled links", () => {
  const result = inspectLibraryControls(`
    import { Button as Action, buttonVariants } from "@qingye_lab/ui/components/button";
    import { Link as RouteLink } from "react-router-dom";
    export const View = () => <>
      <Action render={<a href="/docs" />} nativeButton={false}>Docs</Action>
      <Action render={<RouteLink to="/docs" />} nativeButton={false}>Docs</Action>
      <Action render={<span />} nativeButton={false}>Command</Action>
      <a href="/docs" className={buttonVariants()}>Docs</a>
      <RouteLink to="/docs" className={buttonVariants()}>Docs</RouteLink>
    </>;
  `);
  assert.equal(result.violations.length, 2);
  assert.ok(result.violations.every((violation) => violation.message.startsWith("Navigation")));
});

test("syntax errors cannot be reported as passing controls", () => {
  assert.ok(inspectLibraryControls("export const View = () => <button").violations.length);
});

test("rendered Markdown inside Prose may hold native task checkboxes and details; the same tags outside Prose may not", () => {
  const result = inspectLibraryControls(`
    import { Prose } from "@qingye_lab/ui/components/prose";
    const View = () => <><Prose><ul><li><input type="checkbox" checked readOnly />完成</li></ul><details><summary>更多</summary>内容</details></Prose><input /><details /></>;
  `);
  assert.equal(result.violations.length, 2);
});

test("the website uses library controls", () => {
  const result = inspectDocsControls();
  assert.deepEqual(result.violations, []);
  assert.ok(result.files > 0);
});

test("native select options are structural children of the actual public NativeSelect, not independent controls", () => {
  const result = inspectLibraryControls(`
    import { NativeSelect as Choice } from "@qingye_lab/ui/components/native-select";
    import * as UI from "@qingye_lab/ui";
    import { NativeSelect as Unrelated } from "./other";
    const View = () => <><Choice><optgroup label="A"><option value="0">Zero</option></optgroup></Choice><UI.NativeSelect><option>One</option></UI.NativeSelect><Choice render={<select><option>Two</option></select>} /><Unrelated><option>Invalid</option></Unrelated><option>Detached</option></>;
  `);
  assert.equal(result.violations.length, 2);
  assert.ok(result.violations.every(violation => violation.message.includes("native option inside NativeSelect")));
  assert.equal(result.renderPrimitives, 1);
});
