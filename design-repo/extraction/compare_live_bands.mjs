// Optional: compare top-level band heights of the running clone against the live original at 1440px.
// This is a height comparison only. It is NOT a pixel-parity harness (none exists for this project).
//
//   NODE_PATH=$(npm root -g) MD_BASE_URL=http://localhost:5190 MD_LIVE_BASE_URL=<origin of the live site> \
//     node extraction/compare_live_bands.mjs [--out file.json] [route ...]
//
// Environment: MD_BASE_URL (clone origin, required), MD_LIVE_BASE_URL (live origin, required), MD_BROWSER_PATH (optional Chromium path).
import { createRequire } from 'node:module'
import fs from 'node:fs'
const require = createRequire(import.meta.url)
const { chromium } = require('playwright')
const clone = process.env.MD_BASE_URL, live = process.env.MD_LIVE_BASE_URL
if (!clone || !live) { console.error('MD_BASE_URL and MD_LIVE_BASE_URL are required'); process.exit(2) }
const argv = process.argv.slice(2)
const oi = argv.indexOf('--out'); const out = oi >= 0 ? argv[oi + 1] : null
const routes = argv.filter((a, i) => a.startsWith('/') && i !== oi + 1)
const list = routes.length ? routes : ['/', '/product/pricing', '/about-us', '/vs/snowflake-alternative', '/careers', '/contact-us/product-expert', '/privacy-policy', '/blog']
const launch = { headless: true }; if (process.env.MD_BROWSER_PATH) launch.executablePath = process.env.MD_BROWSER_PATH
const browser = await chromium.launch(launch)

function inPage() {
  const SECTIONY = new Set(['SECTION', 'ARTICLE', 'HEADER', 'ASIDE', 'NAV', 'FOOTER'])
  const main = document.querySelector('#main-content') || document.querySelector('main') || document.body
  let list = Array.from(main.children).filter((c) => !['SCRIPT', 'STYLE', 'LINK', 'TEMPLATE', 'NOSCRIPT'].includes(c.tagName))
  let g = 0
  while (list.length === 1 && list[0].children.length && g++ < 4 && !SECTIONY.has(list[0].tagName)) list = Array.from(list[0].children).filter((c) => !['SCRIPT', 'STYLE', 'LINK', 'TEMPLATE', 'NOSCRIPT'].includes(c.tagName))
  const o = []
  for (const c of list) {
    const kids = Array.from(c.children); const sec = kids.filter((k) => SECTIONY.has(k.tagName)); const rest = kids.filter((k) => !SECTIONY.has(k.tagName))
    if (c.tagName === 'DIV' && sec.length >= 2 && rest.every((k) => k.getAttribute('aria-hidden') === 'true')) o.push(...sec); else o.push(c)
  }
  const foot = document.querySelector('footer')
  return { documentHeight: document.documentElement.scrollHeight, bands: o.map((el) => Math.round(el.getBoundingClientRect().height * 10) / 10).filter((h) => h > 0), footer: foot ? Math.round(foot.getBoundingClientRect().height * 10) / 10 : null }
}
async function measure(base, route) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } }); const page = await ctx.newPage()
  try {
    await page.goto(base + route, { waitUntil: 'networkidle', timeout: 60000 }); await page.waitForTimeout(1500)
    const h = await page.evaluate(() => document.documentElement.scrollHeight)
    for (let y = 0; y < h; y += 600) { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(50) }
    await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(500)
    return await page.evaluate(inPage)
  } catch (e) { return { error: String(e).slice(0, 160) } } finally { await ctx.close() }
}
const res = {}
for (const r of list) {
  const a = await measure(live, r), b = await measure(clone, r)
  const row = { live: a, clone: b }
  if (a.bands && b.bands && a.bands.length === b.bands.length) row.bandDeltaPx = b.bands.map((h, i) => Math.round((h - a.bands[i]) * 10) / 10)
  if (a.documentHeight && b.documentHeight) row.documentDeltaPx = b.documentHeight - a.documentHeight
  res[r] = row
  console.error(r.padEnd(34), 'live', a.documentHeight, 'clone', b.documentHeight, 'bands', a.bands && a.bands.length, b.bands && b.bands.length)
}
await browser.close()
const json = JSON.stringify({ viewport: 1440, routes: res }, null, 1)
if (out) fs.writeFileSync(out, json); else console.log(json)
