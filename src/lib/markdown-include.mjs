// Markdown plugin (for Astro's Sätteri Markdown processor): replace a line like
//
//   <!-- include: https://raw.githubusercontent.com/<owner>/<repo>/HEAD/README.md -->
//
// with the contents of that URL, fetched when the site is built, and rendered as part of the
// page's Markdown.
//
// - A GitHub page URL (github.com/<owner>/<repo>/blob/...) works too; the raw file is fetched.
// - Relative image and link URLs in the included file are made absolute, so README images still
//   load. For raw.githubusercontent.com files, links point to the file's page on github.com.
// - If the fetch fails, a short "couldn't load" note with a link is shown and the build goes on.
// - The include must be on its own line, with a blank line before and after it.
//
// Optional settings pick out part of the file, matching headings by their text (case and a
// trailing ":" are ignored; the start of the heading is enough):
//
//   <!-- include: URL until="Getting started" -->   everything before that heading
//   <!-- include: URL from="Installation" -->       that heading and everything after it
//   <!-- include: URL section="Installation" -->    that heading, up to the next heading of the
//                                                   same or a higher level
//   (from/section and until can be combined)
//
// Add heading="false" to leave out the selection's own heading: the from/section heading, or
// with only until, the first heading of the file (e.g. a README's title).
//
//   <!-- include: URL section="Installation" heading="false" -->

const INCLUDE = /^<!--\s*include:\s*(\S+)((?:\s+[a-z]+="[^"]*")*)\s*-->$/i;

function parseOptions(text) {
  const options = {};
  for (const [, key, value] of text.matchAll(/([a-z]+)="([^"]*)"/gi)) options[key.toLowerCase()] = value;
  return options;
}

/** Headings in a Markdown text (ATX "#" headings outside fenced code): line index, level, text. */
function headings(lines) {
  const found = [];
  let fence = null;
  lines.forEach((line, index) => {
    const f = line.match(/^\s{0,3}(`{3,}|~{3,})/);
    if (f) {
      if (!fence) fence = f[1][0];
      else if (f[1][0] === fence) fence = null;
      return;
    }
    if (fence) return;
    const h = line.match(/^\s{0,3}(#{1,6})\s+(.*?)\s*#*\s*$/);
    if (h) found.push({ index, level: h[1].length, text: h[2] });
  });
  return found;
}

const normalise = (text) =>
  text
    .replace(/[*_`]/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/:\s*$/, '')
    .trim()
    .toLowerCase();

/** Cut the Markdown down to the part selected by from / section / until. */
function select(markdown, options) {
  const lines = markdown.split('\n');
  const heads = headings(lines);
  const find = (name, after = -1) => {
    const wanted = normalise(name);
    const h = heads.find((h) => h.index > after && normalise(h.text).startsWith(wanted));
    if (!h) throw new Error(`no heading starting with "${name}"`);
    return h;
  };
  let start = 0;
  let end = lines.length;
  const startHeading = options.section ?? options.from;
  if (startHeading) {
    const h = find(startHeading);
    start = h.index;
    if (options.section) {
      const next = heads.find((n) => n.index > h.index && n.level <= h.level);
      if (next) end = next.index;
    }
  }
  if (options.until) end = Math.min(end, find(options.until, start).index);
  let selected = lines.slice(start, end);
  if (/^(false|no|off|0)$/i.test(options.heading ?? '')) {
    const first = heads.find((h) => h.index >= start && h.index < end);
    if (first) selected = selected.filter((_, i) => i !== first.index - start);
  }
  return selected.join('\n').trim();
}

/** Turn a raw.githubusercontent.com URL into the matching github.com page URL. */
function githubPage(url) {
  const m = url.match(/^https:\/\/raw\.githubusercontent\.com\/([^/]+)\/([^/]+)\/([^/]+)\/(.*)$/);
  return m ? `https://github.com/${m[1]}/${m[2]}/blob/${m[3]}/${m[4]}` : url;
}

function isRelative(url) {
  return Boolean(url) && !/^([a-z][a-z0-9+.-]*:|\/\/|#|\/)/i.test(url);
}

/** Make relative URLs in Markdown text absolute: images → raw file, links → GitHub page. */
function absolutize(markdown, base) {
  // Images: resolve relative paths, and turn github.com ".../blob/..." pages into raw files.
  const image = (url) =>
    isRelative(url)
      ? new URL(url, base).href
      : url.replace(/^https:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\//, 'https://raw.githubusercontent.com/$1/$2/');
  const link = (url) => (isRelative(url) ? githubPage(new URL(url, base).href) : url);
  return (
    markdown
      // ![alt](url "title") — images, including images inside links
      .replace(/(!\[[^\]]*\]\()(\s*<?)([^)\s>]+)/g, (_, pre, sp, url) => pre + sp + image(url))
      // [text](url "title") — links (not preceded by "!")
      .replace(/((?:^|[^!])\[[^\]]*\]\()(\s*<?)([^)\s>]+)/g, (_, pre, sp, url) => pre + sp + link(url))
      // [id]: url — reference definitions
      .replace(/^(\s{0,3}\[[^\]]+\]:\s*<?)(\S+?)(>?)(\s|$)/gm, (_, pre, url, close, end) => pre + link(url) + close + end)
      // <img src="..."> and <a href="..."> written as HTML
      .replace(/(<img\b[^>]*?\ssrc=)(["'])([^"']+)\2/gi, (_, pre, q, url) => pre + q + image(url) + q)
      .replace(/(<a\b[^>]*?\shref=)(["'])([^"']+)\2/gi, (_, pre, q, url) => pre + q + link(url) + q)
  );
}

/** Accept GitHub page URLs (github.com/<owner>/<repo>/blob/<ref>/<path>) by fetching the raw file. */
function rawUrl(url) {
  return url.replace(/^https:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\//, 'https://raw.githubusercontent.com/$1/$2/');
}

async function fetchMarkdown(pageOrRawUrl, options) {
  const url = rawUrl(pageOrRawUrl);
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return absolutize(select(await res.text(), options), url);
  } catch (err) {
    console.warn(`[markdown-include] could not include ${url}: ${err?.message ?? err}`);
    return `*Could not load the included content from <${githubPage(url)}>.*`;
  }
}

export const markdownInclude = {
  name: 'markdown-include',
  async html(node) {
    const match = node.value.trim().match(INCLUDE);
    if (!match) return;
    return { raw: await fetchMarkdown(match[1], parseOptions(match[2] ?? '')), mdxExpressions: false };
  },
};
