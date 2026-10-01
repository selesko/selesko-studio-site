import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = path.resolve(import.meta.dirname, '..');
const out = path.join(root, 'public');
assert(path.dirname(out) === root && path.basename(out) === 'public', 'Unsafe output directory');
assert(!fs.existsSync(out) || !fs.lstatSync(out).isSymbolicLink(), 'Output must not be a symlink');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out);
const sections = ['architecture', 'sketchbook', 'built-work', 'design', 'about', 'services', 'process', 'contact', 'projects', 'field-notes'];
fs.copyFileSync(path.join(root, 'index.html'), path.join(out, 'index.html'));
for (const section of sections) fs.cpSync(path.join(root, section), path.join(out, section), { recursive: true });
for (const section of ['images', 'assets']) fs.cpSync(path.join(root, section), path.join(out, section), { recursive: true });

const esc = s => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const style = home.match(/<style>([\s\S]*?)<\/style>/)[0];
const nav = home.match(/<nav>[\s\S]*?<\/nav>/)[0];
for (const file of fs.readdirSync(path.join(root, 'content/field-notes'))) {
  if (!file.endsWith('.json')) continue;
  const note = JSON.parse(fs.readFileSync(path.join(root, 'content/field-notes', file), 'utf8'));
  if (note.status !== 'published') continue;
  assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(note.slug), 'Invalid slug');
  assert(note.source?.startsWith('Notion: '), 'Missing editorial source label');
  assert(note.title && Array.isArray(note.blocks) && note.blocks.length, 'Incomplete note');
  assert(/^\/images\/[a-zA-Z0-9/._-]+$/.test(note.cover) && !note.cover.includes('..'), 'Use a local cover');
  const body = note.blocks.map(b => {
    assert(['paragraph','heading'].includes(b.type), 'Unsupported block type');
    return b.type === 'heading' ? `<h2>${esc(b.text)}</h2>` : `<p>${esc(b.text)}</p>`;
  }).join('\n');
  const dir = path.join(out, 'field-notes', note.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(note.title)} — Selesko Studio</title><meta name="description" content="${esc(note.description)}">
<meta property="og:title" content="${esc(note.title)}"><meta property="og:description" content="${esc(note.description)}">
<link rel="icon" type="image/svg+xml" href="/assets/selesko-icon.svg">
${style}<link rel="stylesheet" href="/assets/recovery.css"></head><body>${nav}
<main class="content" style="padding-top:48px"><span class="fn-label">Field Notes</span><h1>${esc(note.title)}</h1>
<img class="fn-cover" src="${esc(note.cover)}" alt="${esc(note.coverAlt)}"><article class="fn-content">${body}</article>
<hr><a href="/field-notes/">← All Field Notes</a></main></body></html>`);
  // Keep both discovery surfaces synchronized when a new approved note is added.
  const href = `/field-notes/${note.slug}/`;
  for (const [target, marker, cardClass] of [['index.html','id="journal"','gallery-card'], ['field-notes/index.html','class="fn-grid"','fn-card']]) {
    const dest = path.join(out, target); let text = fs.readFileSync(dest, 'utf8');
    if (text.includes(`href="${href}"`)) continue;
    const start = text.indexOf(marker); assert(start >= 0, `Missing listing marker: ${target}`);
    const insert = target === 'index.html' ? text.indexOf('>', text.indexOf('class="gallery-grid"', start)) + 1 : text.indexOf('>', start) + 1;
    const card = `<a class="${cardClass}" href="${href}"><img src="${esc(note.cover)}" alt="${esc(note.coverAlt)}" loading="lazy"><span class="${cardClass === 'gallery-card' ? 'gallery-caption' : 'fn-card-title'}">${esc(note.title)}</span></a>`;
    text = text.slice(0, insert) + card + text.slice(insert); fs.writeFileSync(dest, text);
  }
}

let pages = 0;
function validate(dir) {
  for (const ent of fs.readdirSync(dir, {withFileTypes:true})) {
    const file = path.join(dir, ent.name);
    if (ent.isDirectory()) { validate(file); continue; }
    assert(/\.(html|css|png|jpe?g|webp|avif|svg|ico)$/i.test(ent.name), `Unexpected public file: ${file}`);
    if (!ent.name.endsWith('.html')) continue;
    pages++; const text = fs.readFileSync(file,'utf8');
    assert(!/X-Amz-|assets\.super\.so|images\.spr\.so/i.test(text), `Temporary or legacy image URL: ${file}`);
    for (const [, url] of text.matchAll(/(?:src|href)="(\/[^"#?]*)(?:[#?][^"]*)?"/g)) {
      const target = path.join(out, decodeURIComponent(url));
      assert(fs.existsSync(target), `Missing target ${url} in ${file}`);
      if (url.endsWith('/')) assert(fs.existsSync(path.join(target,'index.html')), `Missing page ${url}`);
    }
  }
}
validate(out);
console.log(`Built and validated ${pages} pages. Only public website files are included.`);
