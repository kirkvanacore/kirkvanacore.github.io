// @ts-nocheck: a small Node script, outside the site build.
// Lists events that need a check before they're trusted: entries with a
// `verify` note (shown on the site) and entries with `publish: false` (hidden).
// Run with: npm run content
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';

const events = parse(readFileSync(new URL('../content/events.yaml', import.meta.url), 'utf8')) ?? [];
const hidden = events.filter((e) => e.publish === false);
const verify = events.filter((e) => e.publish !== false && e.verify);

const line = (e) => `  ${e.date}  ${e.event}\n             ${e.title}\n             → ${e.verify ?? '(no note)'}`;

console.log(`\nShown on the site, but marked "verify" (${verify.length}):\n`);
console.log(verify.map(line).join('\n\n') || '  none');
console.log(`\nHidden with publish: false (${hidden.length}):\n`);
console.log(hidden.map(line).join('\n\n') || '  none');
const badLinks = events.flatMap((e) =>
    Object.entries(e.links ?? {})
        .filter(([, url]) => !/^(https?:|mailto:)/.test(String(url)))
        .map(([key, url]) => `  ${e.date}  ${e.title}\n             ${key}: ${url}`),
);
console.log(`\nLinks that aren't web addresses, so the site skips them (${badLinks.length}):\n`);
console.log(badLinks.join('\n\n') || '  none');
console.log('\nWhen a detail is confirmed, delete its verify line. To show a hidden entry, delete publish: false.\n');
