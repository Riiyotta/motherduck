// Re-measure top-level page bands at 1440px, one sample route per template.
//
//   NODE_PATH=$(npm root -g) MD_BASE_URL=http://localhost:5190 node extraction/measure_sections.mjs [--out file.json]
//
// Environment (no machine path is stored in this repository):
//   MD_BASE_URL         required. Origin of a running copy of the cloned site.
//   MD_BROWSER_PATH     optional. Chromium executable; otherwise the Playwright default browser is used.
//   MD_TEMPLATES_JSON   optional. Template file to read; default ../templates/templates.json next to this script.
//   MD_ONLY             optional. Comma-separated template ids to measure.
// "playwright" must be resolvable (global install + NODE_PATH, or a local install).
import { createRequire } from 'node:module'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')
const here = path.dirname(fileURLToPath(import.meta.url))
const base = process.env.MD_BASE_URL
if (!base) { console.error('MD_BASE_URL is required (origin of the running clone)'); process.exit(2) }
const templatesPath = process.env.MD_TEMPLATES_JSON || path.join(here, '..', 'templates', 'templates.json')
const only = process.env.MD_ONLY ? process.env.MD_ONLY.split(',') : null
const outIdx = process.argv.indexOf('--out')
const outFile = outIdx > 0 ? process.argv[outIdx + 1] : null
const VIEWPORT = { width: 1440, height: 900 }

const tpl = JSON.parse(fs.readFileSync(templatesPath, 'utf8')).templates
const launch = { headless: true }
if (process.env.MD_BROWSER_PATH) launch.executablePath = process.env.MD_BROWSER_PATH
const browser = await chromium.launch(launch)

function inPage() {
  const SECTIONY = new Set(['SECTION', 'ARTICLE', 'HEADER', 'ASIDE', 'NAV', 'FOOTER'])
  const main = document.querySelector('#main-content') || document.querySelector('main') || document.body
  const info = (el, idx) => {
    const r = el.getBoundingClientRect(); const cs = getComputedStyle(el)
    return { index: idx, tag: el.tagName.toLowerCase(), id: el.id || null, position: cs.position,
      top: Math.round((r.top + window.scrollY) * 10) / 10, height: Math.round(r.height * 10) / 10,
      innerSections: el.querySelectorAll('section').length }
  }
  let list = Array.from(main.children).filter((c) => !['SCRIPT', 'STYLE', 'LINK', 'TEMPLATE'].includes(c.tagName))
  // descend through a lone page wrapper
  let guard = 0
  while (list.length === 1 && list[0].children.length && guard++ < 4 && !SECTIONY.has(list[0].tagName)) {
    list = Array.from(list[0].children).filter((c) => !['SCRIPT', 'STYLE', 'LINK', 'TEMPLATE'].includes(c.tagName))
  }
  // expand a plain wrapper that only groups section-like children
  const out = []
  for (const c of list) {
    const kids = Array.from(c.children)
    const secKids = kids.filter((k) => SECTIONY.has(k.tagName))
    const rest = kids.filter((k) => !SECTIONY.has(k.tagName))
    // an anchor wrapper is a plain DIV around exactly one section (in-page anchor targets)
    const anchorWrap = (k) => k.tagName === 'DIV' && k.children.length === 1 && SECTIONY.has(k.children[0].tagName)
    // a plain wrapper whose only non-section children are decorative (aria-hidden) is expanded into its sections;
    // so is a wrapper of three or more sections / anchor wrappers
    if (c.tagName === 'DIV' && secKids.length >= 2 && rest.every((k) => k.getAttribute('aria-hidden') === 'true')) out.push(...secKids)
    else if (c.tagName === 'DIV' && kids.length >= 3 && kids.every((k) => SECTIONY.has(k.tagName) || anchorWrap(k))) out.push(...kids)
    else out.push(c)
  }
  const bands = out.map((el, i) => info(el, i))
  const header = document.querySelector('#root header') || document.querySelector('header')
  const footer = document.querySelector('#root footer') || document.querySelector('footer')
  return {
    documentHeight: document.documentElement.scrollHeight,
    header: header ? info(header, -1) : null,
    footer: footer ? info(footer, -1) : null,
    mainTop: main.getBoundingClientRect().top + window.scrollY,
    bands,
  }
}

const results = {}
async function once(route) {
  const ctx = await browser.newContext({ viewport: VIEWPORT })
  const page = await ctx.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(String(e).slice(0, 120)))
  try {
    const resp = await page.goto(base + route, { waitUntil: 'networkidle', timeout: 45000 })
    const status = resp ? resp.status() : null
    await page.waitForTimeout(1200)
    // scroll through once so lazy / in-view content is mounted, then return to the top
    const h = await page.evaluate(() => document.documentElement.scrollHeight)
    for (let y = 0; y < h; y += 600) { await page.evaluate((yy) => window.scrollTo(0, yy), y); await page.waitForTimeout(40) }
    await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(600)
    const overlay = await page.evaluate(() => Boolean(document.querySelector('vite-error-overlay')))
    const m = await page.evaluate(inPage)
    return { status, m, errors, overlay }
  } finally { await ctx.close() }
}
for (const t of tpl) {
  if (only && !only.includes(t.id)) continue
  const route = t.sampleRoute
  let res = null
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const r = await once(route)
      if (r.errors.length || r.overlay) { console.error(`${t.id}: attempt ${attempt} had page errors (${r.errors[0] || 'error overlay'}), retrying`); res = { error: 'page error: ' + (r.errors[0] || 'error overlay') }; continue }
      res = { route, viewport: VIEWPORT.width, status: r.status, ...r.m }
      console.error(`${t.id.padEnd(22)} ${route.padEnd(58)} doc ${String(r.m.documentHeight).padStart(6)}  bands ${r.m.bands.length}`)
      break
    } catch (e) { res = { route, viewport: VIEWPORT.width, error: String(e).slice(0, 200) }; console.error(`${t.id} attempt ${attempt} failed: ${String(e).slice(0, 100)}`) }
  }
  results[t.id] = res.error ? { route, viewport: VIEWPORT.width, ...res } : res
}
await browser.close()
const json = JSON.stringify({ viewport: VIEWPORT.width, templates: results }, null, 1)
if (outFile) fs.writeFileSync(outFile, json); else console.log(json)
