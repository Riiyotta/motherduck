#!/usr/bin/env python3
"""Whole-page-wrapper quality gate (R9).

Heights are measured (headless browser, 1440px, one sample route per template) by extraction/measure_sections.mjs and
recorded in extraction/measured-values.json under `sectionHeights`. This module checks them; it never measures.

    python3 extraction/wrapper_gate.py [--json]

Rules (thresholds are pinned in code below, not only in JSON):
  * HERO band taller than 1800px: warning; taller than 3000px: error unless whitelisted.
  * One in-flow section holding more than 50% of its page: warning; more than 60%: error unless whitelisted.
    Pages with fewer than 3 in-flow (non-shell, non-runtime) bands are skipped. Fixed, sticky and absolute elements take no
    page height. A band that holds several sections, or one repeatable section instanced many times, is a composed band
    (the contracts already decompose it) and is reported, not judged as a single wrapper.
  * A template without a measurement is an error; a measurement at a viewport other than 1440 is an error.
  * Whitelist entries need reviewedBy, a justification of at least 30 characters and a maxHeightPx above the measured
    height. Stale or over-cap entries fail. A whitelisted hit still warns. A reviewer that is an agent must say so
    ("agent attestation, not a human sign-off").
"""
import sys
sys.dont_write_bytecode = True
import json, os, sys
from pathlib import Path

ROOT = Path(os.path.dirname(os.path.abspath(__file__))).parent
VIEWPORT = 1440
HERO_WARN_PX, HERO_ERROR_PX = 1800, 3000
SHARE_WARN, SHARE_ERROR = 0.50, 0.60
MIN_INFLOW_BANDS = 3
OUT_OF_FLOW = ('fixed', 'sticky', 'absolute')
AGENT_PHRASE = 'agent attestation, not a human sign-off'

def jload(p):
    with open(p) as f:
        return json.load(f)

def run(root=ROOT, measured=None):
    """Return (findings, report). findings = list of (severity, code, message)."""
    root = Path(root)
    mv = measured if measured is not None else jload(root / 'extraction' / 'measured-values.json')
    templates = {t['id']: t for t in jload(root / 'templates' / 'templates.json')['templates']}
    contracts = {}
    for p in (root / 'sections').glob('*.json'):
        c = jload(p); contracts[c['id']] = c
    sh = mv.get('sectionHeights') or {}
    wl = (mv.get('wrapperGate') or {}).get('whitelist', [])
    F = []; report = {'composedBands': [], 'checked': 0, 'skipped': [], 'hits': []}
    if sh.get('viewport') != VIEWPORT:
        F.append(('error', 'WRONG_VIEWPORT', 'sectionHeights.viewport is %r, expected %d' % (sh.get('viewport'), VIEWPORT)))
    used = set()
    for tid, t in templates.items():
        m = (sh.get('templates') or {}).get(tid)
        if not m:
            F.append(('error', 'MISSING_MEASUREMENT', 'template %s has no sectionHeights entry' % tid)); continue
        if m.get('viewport') != VIEWPORT:
            F.append(('error', 'WRONG_VIEWPORT', 'template %s measured at %r' % (tid, m.get('viewport')))); continue
        bands = m.get('bands', [])
        node_ids = {n['section'] for n in t['nodes']} | set(t.get('runtimeUi', []))
        for b in bands:
            for s in b['sections']:
                if s not in node_ids: F.append(('error', 'BAND_MAPPING', '%s band %d maps to %s which is not a node of the template' % (tid, b['index'], s)))
        mapped = {s for b in bands for s in b['sections']}
        for n in t['nodes']:
            if n['required'] and not n.get('group') and not n['section'].startswith('shell.') and n['section'] not in mapped:
                F.append(('error', 'BAND_MAPPING', '%s: required section %s is not mapped to any measured band' % (tid, n['section'])))
        page = m['documentHeight']
        inflow = []
        for b in bands:
            secs = [s for s in b['sections'] if contracts[s]['semantic']['category'] not in ('SHELL', 'RUNTIME')]
            if b['flow'] in OUT_OF_FLOW or not secs or b['heightPx'] <= 0: continue
            inflow.append((b, secs))
        # HERO check applies to every band that contains a HERO section
        for b, secs in inflow:
            if any(contracts[s]['semantic']['category'] == 'HERO' for s in secs):
                h = b['heightPx']
                if h > HERO_WARN_PX:
                    hit = ('hero', tid, b['index'], h)
                    ent = _find(wl, tid, b['index'], 'hero'); report['hits'].append(hit)
                    if h > HERO_ERROR_PX and not ent:
                        F.append(('error', 'HERO_TOO_TALL', '%s band %d HERO is %.0fpx (> %d) and not whitelisted' % (tid, b['index'], h, HERO_ERROR_PX)))
                    else:
                        F.append(('warn', 'HERO_TALL', '%s band %d HERO is %.0fpx (> %d)%s' % (tid, b['index'], h, HERO_WARN_PX, ' (whitelisted)' if ent else '')))
                    if ent: used.add(id(ent))
        if len(inflow) < MIN_INFLOW_BANDS:
            report['skipped'].append(tid); continue
        report['checked'] += 1
        for b, secs in inflow:
            # a band is one section only when it maps to one section that is not instanced many times inside it
            single = len(secs) == 1 and not (_repeatable(t, secs[0]) and b.get('innerSections', 0) >= 2)
            share = b['heightPx'] / page
            if not single:
                if share > SHARE_WARN: report['composedBands'].append({'template': tid, 'band': b['index'], 'sections': secs, 'share': round(share, 3)})
                continue
            if share > SHARE_WARN:
                ent = _find(wl, tid, b['index'], 'share'); report['hits'].append(('share', tid, b['index'], b['heightPx']))
                if share > SHARE_ERROR and not ent:
                    F.append(('error', 'SECTION_SHARE', '%s band %d (%s) holds %.0f%% of the page (> %d%%) and is not whitelisted' % (tid, b['index'], secs[0], share * 100, SHARE_ERROR * 100)))
                else:
                    F.append(('warn', 'SECTION_SHARE_HIGH', '%s band %d (%s) holds %.0f%% of the page%s' % (tid, b['index'], secs[0], share * 100, ' (whitelisted)' if ent else '')))
                if ent: used.add(id(ent))
    # whitelist hygiene
    for e in wl:
        t = e.get('template'); b = e.get('band')
        m = ((sh.get('templates') or {}).get(t) or {})
        band = next((x for x in m.get('bands', []) if x['index'] == b), None)
        if band is None:
            F.append(('error', 'WHITELIST_STALE', 'whitelist entry %s/%s matches no measured band' % (t, b))); continue
        if len(e.get('justification', '')) < 30: F.append(('error', 'WHITELIST_JUSTIFICATION', 'whitelist entry %s/%s needs a justification of at least 30 characters' % (t, b)))
        rb = e.get('reviewedBy', '')
        if not rb: F.append(('error', 'WHITELIST_REVIEWER', 'whitelist entry %s/%s has no reviewedBy' % (t, b)))
        elif 'agent' in rb.lower() and AGENT_PHRASE not in rb.lower(): F.append(('error', 'WHITELIST_REVIEWER', 'whitelist entry %s/%s: an agent reviewer must say "%s"' % (t, b, AGENT_PHRASE)))
        if not isinstance(e.get('maxHeightPx'), (int, float)) or e['maxHeightPx'] <= band['heightPx']:
            F.append(('error', 'WHITELIST_CAP', 'whitelist entry %s/%s: maxHeightPx %r must exceed the measured %.0f' % (t, b, e.get('maxHeightPx'), band['heightPx'])))
        if id(e) not in used:
            F.append(('error', 'WHITELIST_STALE', 'whitelist entry %s/%s no longer matches a threshold breach' % (t, b)))
    return F, report

def _repeatable(t, sec):
    return any(n['section'] == sec and n.get('repeatable') for n in t['nodes'])

def _find(wl, tid, band, kind):
    for e in wl:
        if e.get('template') == tid and e.get('band') == band and e.get('kind') == kind: return e
    return None

def main(argv):
    F, rep = run()
    if '--json' in argv:
        print(json.dumps({'findings': F, 'report': rep}, indent=1, default=str))
    else:
        for sev, code, msg in F: print('[%s] %s: %s' % (sev, code, msg))
        print('wrapper gate: %d templates checked, %d skipped (<%d in-flow bands), %d composed band(s) >%d%% reported, %d error(s), %d warning(s)'
              % (rep['checked'], len(rep['skipped']), MIN_INFLOW_BANDS, len(rep['composedBands']), SHARE_WARN * 100, sum(1 for f in F if f[0] == 'error'), sum(1 for f in F if f[0] == 'warn')))
    return 1 if any(f[0] == 'error' for f in F) else 0

if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
