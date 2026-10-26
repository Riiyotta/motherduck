#!/usr/bin/env python3
"""One-stop verification of the design-repo.

    python3 extraction/verify_all.py [--quick] [--json]

Checks (each prints PASS / FAIL / WARN):
  layout, JSON parse, contract schema, allowlist parity (no phantom entries, no orphans), source and evidence citation
  validity (bounds always; tag re-read when the sibling source tree exists), manifest counts recomputed from disk,
  version parity, route admission consistency, asset-role pins and closure, retrieval-eligibility pins, token catalog
  parity, compatibility graph vs validator agreement, wrapper gate (extraction/wrapper_gate.py), example PageSpecs
  (Draft-07 + semantic), hygiene (no absolute machine paths, no junk files, entry points inside the package).
Exit status 1 on any FAIL. The sibling source tree (the cloned site and its specs) is optional: without it citations
degrade to a bounds check against the line counts recorded in measured-values.json and a WARN is printed.
"""
import sys
sys.dont_write_bytecode = True
import glob, importlib.util, json, os, re, sys
from pathlib import Path

ROOT = Path(os.path.dirname(os.path.abspath(__file__))).parent
PROJECT = ROOT.parent                      # sibling source tree, if present
QUICK = '--quick' in sys.argv

# ---- pins (kept in code on purpose; semantic_validate.py carries the same tables and they are compared below)
PINNED_AVAILABILITY = {
    'architecture-diagram': 'reference-only',
    'book-cover': 'reference-only',
    'brand-wordmark': 'blocked-for-generation',
    'chart-figure': 'reference-only',
    'clone-mascot-pip': 'reference-only',
    'company-mascot-art': 'blocked-for-generation',
    'compliance-badge': 'blocked-for-generation',
    'customer-logo': 'blocked-for-generation',
    'editorial-thumbnail': 'reference-only',
    'embedded-app': 'blocked-for-generation',
    'fictional-mascot-placeholder': 'generation-safe',
    'fictional-person-avatar': 'generation-safe',
    'generated-book-cover': 'generation-safe',
    'generated-chart': 'generation-safe',
    'generated-diagram': 'generation-safe',
    'generated-illustration': 'generation-safe',
    'generated-photo-placeholder': 'generation-safe',
    'generated-product-visual': 'generation-safe',
    'generated-video-poster': 'generation-safe',
    'generic-ui-glyph': 'generation-safe',
    'investor-logo': 'blocked-for-generation',
    'original-copy': 'generation-safe',
    'partner-tool-logo': 'blocked-for-generation',
    'person-portrait': 'blocked-for-generation',
    'placeholder-badge': 'generation-safe',
    'placeholder-brand-mark': 'generation-safe',
    'placeholder-embed': 'generation-safe',
    'placeholder-logo-row': 'generation-safe',
    'placeholder-rating': 'generation-safe',
    'placeholder-url': 'generation-safe',
    'product-screenshot': 'reference-only',
    'spot-illustration': 'reference-only',
    'team-photo': 'blocked-for-generation',
    'video-thumbnail': 'reference-only',
}
PINNED_POLICY = {
    'architecture-diagram': 'reference-copy-allowed',
    'book-cover': 'reference-copy-allowed',
    'brand-wordmark': 'must-not-reproduce',
    'chart-figure': 'reference-copy-allowed',
    'clone-mascot-pip': 'reference-copy-allowed',
    'company-mascot-art': 'must-not-reproduce',
    'compliance-badge': 'must-not-fabricate',
    'customer-logo': 'must-not-fabricate',
    'editorial-thumbnail': 'reference-copy-allowed',
    'embedded-app': 'must-not-reuse-live-endpoint',
    'fictional-mascot-placeholder': 'may-generate-new',
    'fictional-person-avatar': 'may-generate-new',
    'generated-book-cover': 'may-generate-new',
    'generated-chart': 'may-generate-new',
    'generated-diagram': 'may-generate-new',
    'generated-illustration': 'may-generate-new',
    'generated-photo-placeholder': 'may-generate-new',
    'generated-product-visual': 'may-generate-new',
    'generated-video-poster': 'may-generate-new',
    'generic-ui-glyph': 'may-generate-new',
    'investor-logo': 'must-not-fabricate',
    'original-copy': 'may-generate-new',
    'partner-tool-logo': 'must-not-fabricate',
    'person-portrait': 'must-not-reproduce',
    'placeholder-badge': 'may-generate-new',
    'placeholder-brand-mark': 'may-generate-new',
    'placeholder-embed': 'may-generate-new',
    'placeholder-logo-row': 'may-generate-new',
    'placeholder-rating': 'may-generate-new',
    'placeholder-url': 'may-generate-new',
    'product-screenshot': 'reference-copy-allowed',
    'spot-illustration': 'reference-copy-allowed',
    'team-photo': 'must-not-reproduce',
    'video-thumbnail': 'reference-copy-allowed',
}
RETRIEVAL_INELIGIBLE = frozenset(['app.try-shell', 'divider.marquee-band', 'divider.ticker-band', 'media.photo-marquee', 'runtime.back-to-top', 'runtime.floating-cta', 'runtime.form-bar', 'runtime.form-success-overlay', 'runtime.gated-video-modal', 'runtime.mega-menu', 'runtime.mobile-menu', 'runtime.mobile-register-bar', 'runtime.mobile-subscribe-button', 'runtime.partner-modal', 'runtime.read-ebook-bar', 'runtime.skip-link', 'runtime.story-art-scrub', 'runtime.toc-fab', 'runtime.view-paper-fab'])
CATEGORY_PREFIX = {'hero': 'HERO', 'feature': 'FEATURES', 'social-proof': 'SOCIAL_PROOF', 'pricing': 'PRICING', 'comparison': 'COMPARISON', 'faq': 'FAQ', 'cta': 'CTA',
                   'conversion': 'CONVERSION', 'editorial': 'EDITORIAL', 'listing': 'LISTING', 'navigation': 'NAVIGATION', 'media': 'MEDIA', 'legal': 'LEGAL',
                   'divider': 'DIVIDER', 'runtime': 'RUNTIME', 'shell': 'SHELL', 'app': 'APP'}
RUNTIME_LOOKING = re.compile(r'modal|dialog|drawer|overlay|cookie|consent|toast|back-to-top|fab\b|floating|skip|cursor|preloader|menu|bar$|-bar\b|scrub', re.I)
RUNTIME_LOOKING_EXEMPT = {'feature.integrations-bar', 'social-proof.logo-bar', 'divider.marquee-band', 'divider.ticker-band', 'media.photo-marquee', 'shell.lp-nav', 'shell.header', 'navigation.legal-toc', 'conversion.subscribe-band', 'navigation.search-filter',
                          'navigation.glossary-bar', 'navigation.chapter-sidebar', 'listing.event-list', 'listing.past-event-list', 'conversion.subscribe-inline-banner', 'navigation.dive-filter', 'lp.jev-calculator',
                          'conversion.event-registration', 'feature.agent-card-carousel', 'cta.speaker-banner'}
FRAMEWORK_WORDS = re.compile(r'className|useState|useEffect|useRef|useLayoutEffect|\bJSX\b|[Tt]ailwind|\bclass="|\bbg-\[|\btext-\[|\bpx-\[|v-if|ngIf|dangerouslySetInnerHTML')
ABS_PATH = re.compile('/' + 'Us' + r'ers/[A-Za-z0-9._-]+/|/ho' + r'me/[A-Za-z0-9._-]+/|C:' + r'\\' + 'Us' + r'ers' + r'\\|/pri' + r'vate/(?:tmp|var)/|/var/fol' + 'ders/')
JUNK = {'.DS_Store', 'Thumbs.db', 'desktop.ini', '__MACOSX', '__pycache__'}

results = []   # (status, check, message)
def rec(status, check, msg): results.append((status, check, msg))
def ok(check, msg): rec('PASS', check, msg)
def fail(check, msg): rec('FAIL', check, msg)
def warn(check, msg): rec('WARN', check, msg)

def jload(p):
    with open(p) as f:
        return json.load(f)

def load_module(name, path):
    spec = importlib.util.spec_from_file_location(name, str(path))
    m = importlib.util.module_from_spec(spec); sys.modules[name] = m; spec.loader.exec_module(m)
    return m

def walk_json(o, path=''):
    if isinstance(o, dict):
        for k, v in o.items(): yield from walk_json(v, path + '/' + str(k))
    elif isinstance(o, list):
        for i, v in enumerate(o): yield from walk_json(v, '%s[%d]' % (path, i))
    else:
        yield path, o

def parse_lines(s):
    m = re.match(r'^(\d+)(?:-(\d+))?$', str(s))
    return (int(m.group(1)), int(m.group(2) or m.group(1))) if m else None

# ------------------------------------------------------------------ layout
REQUIRED = ['README.md', 'CHANGELOG.md', 'registry.manifest.json', 'tokens/00-foundation/color.json', 'tokens/00-foundation/typography.json', 'tokens/00-foundation/radius.json',
            'tokens/00-foundation/spacing.json', 'tokens/00-foundation/breakpoint.json', 'tokens/00-foundation/elevation.json', 'tokens/00-foundation/icon-size.json', 'tokens/00-foundation/motion.json',
            'tokens/00-foundation/motion-patterns.json', 'tokens/10-semantic/color.json', 'tokens/20-component', 'tokens/30-layout/layout.json', 'tokens/themes/light.json', 'tokens/themes/dark.json',
            'tokens/llm/component-allowlist.json', 'tokens/llm/token-catalog.json', 'tokens/llm/token-policy.json', 'primitives', 'components', 'sections', 'templates/templates.json', 'templates/routes.json',
            'compatibility/graph.json', 'assets/asset-roles.json', 'schema/pagespec.schema.json', 'schema/section-contract.schema.json', 'schema/example.pagespec.json', 'schema/examples',
            'schema/semantic_validate.py', 'schema/source-brand.json', 'schema/tests/adversarial_test.py', 'extraction/measured-values.json', 'extraction/verify_all.py', 'extraction/wrapper_gate.py',
            'extraction/measure_sections.mjs', 'extraction/prove_drift.py']
def check_layout():
    miss = [r for r in REQUIRED if not (ROOT / r).exists()]
    (fail if miss else ok)('layout', 'missing: %s' % miss if miss else '%d required paths present' % len(REQUIRED))

def check_json_parse():
    bad = []
    for p in ROOT.rglob('*.json'):
        try: jload(p)
        except Exception as e: bad.append('%s: %s' % (p.relative_to(ROOT), e))
    (fail if bad else ok)('json-parse', '; '.join(bad[:3]) if bad else 'every .json file parses')

# ------------------------------------------------------------------ data loading
def load():
    D = {}
    D['man'] = jload(ROOT / 'registry.manifest.json')
    D['sections'] = {p.stem: jload(p) for p in sorted((ROOT / 'sections').glob('*.json'))}
    D['prims'] = {p.stem: jload(p) for p in sorted((ROOT / 'primitives').glob('*.json'))}
    D['comps'] = {p.stem: jload(p) for p in sorted((ROOT / 'components').glob('*.json'))}
    D['allow'] = jload(ROOT / 'tokens/llm/component-allowlist.json')
    D['tpl'] = jload(ROOT / 'templates/templates.json')
    D['routes'] = jload(ROOT / 'templates/routes.json')
    D['roles'] = jload(ROOT / 'assets/asset-roles.json')
    D['graph'] = jload(ROOT / 'compatibility/graph.json')
    D['mv'] = jload(ROOT / 'extraction/measured-values.json')
    D['schema'] = jload(ROOT / 'schema/pagespec.schema.json')
    D['csch'] = jload(ROOT / 'schema/section-contract.schema.json')
    D['cat'] = jload(ROOT / 'tokens/llm/token-catalog.json')
    D['pol'] = jload(ROOT / 'tokens/llm/token-policy.json')
    D['mot'] = jload(ROOT / 'tokens/00-foundation/motion-patterns.json')
    return D

# ------------------------------------------------------------------ contract schema + structure
def check_contracts(D):
    from jsonschema import Draft7Validator
    v = Draft7Validator(D['csch']); bad = []
    for sid, c in D['sections'].items():
        for e in v.iter_errors(c): bad.append('%s: %s' % (sid, e.message[:100]))
        if c['id'] != sid: bad.append('%s: id differs from file name' % sid)
        if c['semantic']['id'] != c['id']: bad.append('%s: semantic.id must equal the contract id' % sid)
        if c['source']['id'] == c['id']: bad.append('%s: source.id must not equal the contract id' % sid)
        pre = sid.split('.')[0]
        if pre in CATEGORY_PREFIX and c['semantic']['category'] != CATEGORY_PREFIX[pre]: bad.append('%s: category %s contradicts its id prefix (expected %s)' % (sid, c['semantic']['category'], CATEGORY_PREFIX[pre]))
        if c['semantic']['category'] == 'HERO' and not sid.startswith('hero.'): bad.append('%s: HERO category outside hero.*' % sid)
        for k in ('media', 'listing'):
            pass
        for p, val in walk_json({k: x for k, x in c.items() if k not in ('source', 'sourceAlternates', 'evidence')}):
            if isinstance(val, str) and FRAMEWORK_WORDS.search(val): bad.append('%s: framework vocabulary at %s' % (sid, p))
        if c['evidence']['level'] not in ('measured', 'partially-measured', 'inferred'): bad.append('%s: bad evidence level' % sid)
        for vr in c['variants']:
            if not re.match(r'^[a-z0-9]+(-[a-z0-9]+)*$', vr): bad.append('%s: variant %r' % (sid, vr))
        if c['motion']['default'] not in c['motion']['allowedPatterns']: bad.append('%s: motion default not in allowedPatterns' % sid)
        if not c['retrievalEligible'] and c['semantic']['category'] in ('HERO', 'FEATURES', 'CONVERSION', 'CTA', 'FAQ', 'SOCIAL_PROOF', 'PRICING', 'COMPARISON', 'EDITORIAL'):
            bad.append('%s: a %s section is marked ineligible' % (sid, c['semantic']['category']))
    # runtime-looking ids must be pinned ineligible
    for sid, c in D['sections'].items():
        if RUNTIME_LOOKING.search(sid + ' ' + c['title']) and sid not in RETRIEVAL_INELIGIBLE and sid not in RUNTIME_LOOKING_EXEMPT:
            bad.append('%s: looks like runtime UI but is not in the RETRIEVAL_INELIGIBLE pin' % sid)
    (fail if bad else ok)('contracts', '; '.join(bad[:6]) + (' ...(%d)' % len(bad) if len(bad) > 6 else '') if bad else '%d section contracts valid (schema, ids, source/semantic split, category prefixes, no framework vocabulary)' % len(D['sections']))

# ------------------------------------------------------------------ primitives and components
def known_token_ids():
    ids = set()
    for p in glob.glob(str(ROOT / 'tokens/*/*.json')):
        d = jload(p)
        if isinstance(d.get('tokens'), dict): ids |= set(d['tokens'])
    return ids
def check_prims_comps(D):
    bad = []; toks = known_token_ids(); refs = set(D['prims']) | set(D['comps'])
    for kind, group in (('primitive', D['prims']), ('component', D['comps'])):
        for k, c in group.items():
            for req in ('id', 'kind', 'version', 'title', 'purpose', 'source', 'props', 'tokens', 'evidence'):
                if req not in c: bad.append('%s %s lacks %s' % (kind, k, req))
            if c.get('id') != k or c.get('kind') != kind: bad.append('%s %s: id/kind mismatch' % (kind, k))
            if c.get('source', {}).get('id') == k: bad.append('%s %s: source.id must differ from the id' % (kind, k))
            for t in c.get('tokens', []):
                if t not in toks and t not in refs: bad.append('%s %s references unknown token or contract %s' % (kind, k, t))
            for u in c.get('uses', []):
                if u not in refs: bad.append('%s %s uses unknown contract %s' % (kind, k, u))
            for p, val in walk_json({kk: x for kk, x in c.items() if kk not in ('source', 'sourceAlternates', 'evidence')}):
                if isinstance(val, str) and FRAMEWORK_WORDS.search(val): bad.append('%s %s: framework vocabulary at %s' % (kind, k, p))
    (fail if bad else ok)('primitives-components', '; '.join(bad[:5]) if bad else '%d primitives and %d components: required keys, ids, token and contract references resolve, no framework vocabulary' % (len(D['prims']), len(D['comps'])))

# ------------------------------------------------------------------ allowlist parity
def check_allowlist(D, allow=None, sections=None, prims=None, comps=None):
    allow = allow or D['allow']; sections = sections if sections is not None else D['sections']
    prims = prims if prims is not None else D['prims']; comps = comps if comps is not None else D['comps']
    ids = {}
    for e in allow['entries']: ids.setdefault(e['id'], []).append(e)
    bad = []
    for i, es in ids.items():
        if len(es) > 1: bad.append('duplicate allowlist id %s' % i)
    have = {('section', k) for k in sections} | {('primitive', k) for k in prims} | {('component', k) for k in comps}
    listed = {(e['kind'], e['id']) for e in allow['entries']}
    for k in sorted(listed - have): bad.append('phantom allowlist entry %s %s (no contract file)' % k)
    for k in sorted(have - listed): bad.append('orphan contract %s %s (no allowlist entry)' % k)
    for e in allow['entries']:
        if not (ROOT / e['file']).exists(): bad.append('allowlist file missing: %s' % e['file'])
        if e['kind'] == 'section' and e['id'] in sections:
            c = sections[e['id']]
            if e.get('retrievalEligible') != c['retrievalEligible']: bad.append('%s: allowlist retrievalEligible differs from the contract' % e['id'])
            if sorted(e['contentFields']) != sorted(c['content']['fields']): bad.append('%s: allowlist contentFields differ from the contract' % e['id'])
            if e['variants'] != c['variants']: bad.append('%s: allowlist variants differ from the contract' % e['id'])
    node_props = sorted(D['schema']['properties']['nodes']['items']['properties'])
    if sorted(allow['nodeSettableProperties']) != node_props: bad.append('nodeSettableProperties %s differs from the schema node properties %s' % (sorted(allow['nodeSettableProperties']), node_props))
    if sorted(allow['pageSettableProperties']) != sorted(D['schema']['properties']): bad.append('pageSettableProperties differ from the schema')
    return bad
def check_allowlist_report(D):
    bad = check_allowlist(D)
    (fail if bad else ok)('allowlist-parity', '; '.join(bad[:5]) if bad else '%d allowlist entries match %d sections + %d primitives + %d components; node and page properties match the schema' % (len(D['allow']['entries']), len(D['sections']), len(D['prims']), len(D['comps'])))

# ------------------------------------------------------------------ citations
def source_available():
    return (PROJECT / 'CLONE_SPEC.md').exists() and (PROJECT / 'src').exists()

class Cites(object):
    def __init__(self, D):
        self.D = D; self.have = source_available(); self.lengths = D['mv'].get('sourceFileLengths', {}); self.cache = {}; self.checked = 0; self.reread = 0; self.bad = []; self.skipped = 0
    def lines(self, f):
        if f not in self.cache:
            p = PROJECT / f
            self.cache[f] = p.read_text(errors='replace').split('\n') if p.exists() else None
            if self.cache[f] and self.cache[f][-1] == '': self.cache[f].pop()
        return self.cache[f]
    def check(self, where, f, lines, tag=None, quote=None, ci=False):
        rng = parse_lines(lines)
        if rng is None or '*' in f:
            self.skipped += 1; return
        a, b = rng; self.checked += 1
        if a < 1 or b < a: self.bad.append('%s: bad range %s' % (where, lines)); return
        if f in self.lengths and b > self.lengths[f]: self.bad.append('%s: %s:%s exceeds the recorded length %d' % (where, f, lines, self.lengths[f])); return
        if f not in self.lengths: self.bad.append('%s: %s has no recorded length' % (where, f)); return
        if self.have:
            L = self.lines(f)
            if L is None: self.bad.append('%s: cited file %s not found in the source tree' % (where, f)); return
            if b > len(L): self.bad.append('%s: %s:%s exceeds the real length %d' % (where, f, lines, len(L))); return
            txt = '\n'.join(L[a - 1:b]); self.reread += 1
            if tag and tag not in txt: self.bad.append('%s: tag %r not found at %s:%s' % (where, tag, f, lines))
            norm = (lambda x: re.sub(r'\s+', '', x).lower()) if ci else (lambda x: re.sub(r'\s+', '', x))
            if quote and norm(quote) not in norm(txt): self.bad.append('%s: quote %r not found at %s:%s' % (where, quote[:40], f, lines))

def iter_citations(D):
    """Yield (where, file, lines, tag, quote) for every citation in the package."""
    for kind, group in (('section', D['sections']), ('primitive', D['prims']), ('component', D['comps'])):
        for k, c in group.items():
            s = c['source']; yield ('%s %s source' % (kind, k), s['file'], s['lines'], s['tag'], None)
            for a in c.get('sourceAlternates', []): yield ('%s %s alternate' % (kind, k), a['file'], a['lines'], a['tag'], None)
            for r in c['evidence']['specRefs']: yield ('%s %s spec' % (kind, k), r['doc'], r['lines'], None, None)
    for t in D['tpl']['templates']:
        s = t['source']; yield ('template %s source' % t['id'], s['file'], s['lines'], s['tag'], None)
        for r in t['evidence']['specRefs']: yield ('template %s spec' % t['id'], r['doc'], r['lines'], None, None)
    for p in D['mot']['patterns']:
        for e in p['evidence']: yield ('motion %s' % p['id'], e['file'], e['lines'], None, None)
    for r in D['roles']['roles']:
        for e in r['evidence']:
            if e['file'] in ('IMAGE_BRIEFS.md', 'ASSET_MANIFEST.md') or e['file'].startswith('src/'): yield ('role %s' % r['id'], e['file'], e['lines'], None, None)
    for c in D['mv']['citations']: yield ('citation %s' % c['id'], c['file'], c['lines'], None, c['quote'])
    for r in D['mv']['copyBudgets']['roles']: yield ('copyBudget %s' % r['role'], r['file'], r['lines'], None, r['quote'])
    for r in D['mv']['copyBudgets']['homepageMeasured']: yield ('homeBudget %s.%s' % (r['contract'], r['field']), r['file'], r['lines'], None, r['quote'])
    for g in D['mv']['knownGaps']:
        e = g.get('evidence')
        if e: yield ('knownGap %s' % g['id'], e['file'], e['lines'], None, None)
    for toks in (jload(p).get('tokens') for p in glob.glob(str(ROOT / 'tokens/*/*.json')) if 'motion-patterns' not in p):
        if not isinstance(toks, dict): continue
        for tid, t in toks.items():
            for key in ('source', 'evidence'):
                e = t.get(key) if isinstance(t, dict) else None
                if isinstance(e, dict) and e.get('lines'):
                    f = e.get('file') or e.get('doc')
                    if f: yield ('token %s' % tid, f, e['lines'], None, None)
                if isinstance(e, dict) and e.get('doc') and not e.get('lines') is None: pass

def check_citations(D):
    C = Cites(D)
    for where, f, lines, tag, quote in iter_citations(D): C.check(where, f, lines, tag, quote)
    # source-brand evidence
    brand = jload(ROOT / 'schema/source-brand.json')
    def literals(o):
        if isinstance(o, dict):
            if 'text' in o and 'evidence' in o: yield o
            for v in o.values(): yield from literals(v)
        elif isinstance(o, list):
            for v in o: yield from literals(v)
    for lit in literals(brand):
        e = lit['evidence']
        if 'file' in e: C.check('source-brand %r' % lit['text'], e['file'], e['lines'], None, lit.get('slug') or lit['text'], ci=True)
    if C.bad: fail('citations', '%d invalid: %s' % (len(C.bad), '; '.join(C.bad[:5])))
    else: ok('citations', '%d citations valid (bounds against recorded line counts%s)' % (C.checked, '; %d re-read against the source tree (tags and quotes found)' % C.reread if C.have else ''))
    if not C.have: warn('citations', 'no sibling source tree next to the package: tag and quote re-read skipped (expected for a standalone copy)')
    elif C.have:
        drift = [f for f, n in C.lengths.items() if C.lines(f) is not None and len(C.lines(f)) != n]
        if drift: warn('source-drift', 'source files changed since the snapshot (recorded length differs): %s' % drift[:5])
    return C

# ------------------------------------------------------------------ counts and versions
def recompute_counts(D):
    tok = lambda p: len(jload(ROOT / p)['tokens'])
    found = {}
    for n in ('color', 'typography', 'radius', 'spacing', 'breakpoint', 'elevation', 'icon-size', 'motion'): found[n] = tok('tokens/00-foundation/%s.json' % n)
    sem = tok('tokens/10-semantic/color.json') + tok('tokens/10-semantic/type.json')
    comp = sum(len(jload(p)['tokens']) for p in glob.glob(str(ROOT / 'tokens/20-component/*.json')))
    lay = tok('tokens/30-layout/layout.json')
    secs = D['sections']
    routes = D['routes']['routes']
    av = {}
    for r in D['roles']['roles']: av[r['availability']] = av.get(r['availability'], 0) + 1
    ex = [jload(p) for p in [ROOT / 'schema/example.pagespec.json'] + sorted((ROOT / 'schema/examples').glob('*.json'))]
    return {
        'tokens': {'foundation': sum(found.values()), 'foundationByFile': found, 'semantic': sem, 'component': comp, 'layout': lay, 'total': sum(found.values()) + sem + comp + lay},
        'themes': len(list((ROOT / 'tokens/themes').glob('*.json'))),
        'primitives': len(D['prims']), 'components': len(D['comps']), 'sections': len(secs),
        'sectionsRetrievalEligible': sum(1 for c in secs.values() if c['retrievalEligible']), 'sectionsRetrievalIneligible': sum(1 for c in secs.values() if not c['retrievalEligible']),
        'templates': len(D['tpl']['templates']), 'routePatterns': sum(1 for r in routes if r['kind'] == 'page'), 'redirects': sum(1 for r in routes if r['kind'] == 'redirect'),
        'routeMappings': len(routes), 'assetRoles': len(D['roles']['roles']), 'assetRolesByAvailability': av,
        'motionPatterns': len(D['mot']['patterns']), 'graphRules': len(D['graph']['rules']), 'sitemapUrlsResolved': D['routes']['sitemapSnapshot']['resolvedToAPattern'],
        'examples': {'reference': sum(1 for e in ex if e['mode'] == 'reference'), 'generated': sum(1 for e in ex if e['mode'] == 'generated')},
        'allowlistEntries': len(D['allow']['entries']),
        'tokenCatalogCategories': len(D['cat']['categories']),
    }

def deep_diff(a, b, path=''):
    out = []
    if isinstance(a, dict) and isinstance(b, dict):
        for k in sorted(set(a) | set(b)):
            if k not in a or k not in b: out.append('%s/%s' % (path, k))
            else: out += deep_diff(a[k], b[k], path + '/' + k)
    elif a != b: out.append('%s (%r != %r)' % (path, a, b))
    return out

def check_counts(D, man=None):
    man = man or D['man']
    diff = deep_diff(man['counts'], recompute_counts(D))
    (fail if diff else ok)('manifest-counts', 'manifest counts differ from disk: %s' % diff[:4] if diff else 'manifest counts recomputed from disk and equal')

def check_versions(D):
    bad = []; m = D['man']
    if m['allowlistVersion'] != D['allow']['allowlistVersion']: bad.append('allowlistVersion %s != allowlist file %s' % (m['allowlistVersion'], D['allow']['allowlistVersion']))
    if m['pageSpecVersion'] != D['schema']['properties']['pageSpecVersion']['const']: bad.append('pageSpecVersion differs from the schema const')
    for p in [ROOT / 'schema/example.pagespec.json'] + sorted((ROOT / 'schema/examples').glob('*.json')):
        if jload(p).get('pageSpecVersion') != m['pageSpecVersion']: bad.append('%s pageSpecVersion differs' % p.name)
    chlog = (ROOT / 'CHANGELOG.md').read_text(); readme = (ROOT / 'README.md').read_text()
    if ('## [%s]' % m['repositoryVersion']) not in chlog: bad.append('CHANGELOG has no entry for repositoryVersion %s' % m['repositoryVersion'])
    if m['repositoryVersion'] not in readme: bad.append('README does not state repositoryVersion %s' % m['repositoryVersion'])
    if 'versionFieldNote' not in m or 'allowlistVersion' not in m['versionFieldNote']: bad.append('versionFieldNote missing or incomplete')
    if m.get('status') != 'design-review-pending' or m.get('productionApproved') is not False: bad.append('status must be design-review-pending with productionApproved false')
    if 'sourceStack' not in m: bad.append('sourceStack note missing')
    if sorted(m.get('modes', {}).get('supported', [])) != ['generated', 'reference']: bad.append('manifest modes.supported must list reference and generated')
    (fail if bad else ok)('versions', '; '.join(bad) if bad else 'allowlistVersion %s machine-checked; pageSpecVersion %s matches schema and examples; repositoryVersion %s in README and CHANGELOG' % (m['allowlistVersion'], m['pageSpecVersion'], m['repositoryVersion']))

def check_entrypoints(D):
    ep = D['man']['entryPoints']; vals = list(ep.values()) if isinstance(ep, dict) else ep
    flat = []
    for v in vals: flat += v if isinstance(v, list) else [v]
    bad = [e for e in flat if not isinstance(e, str) or e.startswith('..') or e.startswith('/') or not (ROOT / e).exists()]
    (fail if bad else ok)('entry-points', 'entryPoints outside the package or missing: %s' % bad[:4] if bad else '%d entryPoints, all inside the package and present' % len(flat))

# ------------------------------------------------------------------ routes
def pattern_rx(p): return re.compile('^' + re.sub(r':[A-Za-z]+', '[^/]+', p) + '/?$')
def resolve(path, patterns):
    m = [p for p in patterns if pattern_rx(p).match(path)]
    stat = [p for p in m if ':' not in p]
    return (stat or sorted(m, key=lambda p: p.count(':')))[:1]

def check_routes(D, routes=None, templates=None, man=None):
    routes = routes or D['routes']['routes']; tpls = templates or D['tpl']['templates']; man = man or D['man']
    bad = []; seen = {}
    for r in routes: seen[r['pattern']] = seen.get(r['pattern'], 0) + 1
    for p, n in seen.items():
        if n > 1: bad.append('route %s mapped %d times' % (p, n))
    tmap = {t['id']: t for t in tpls}
    declared = {}
    for t in tpls:
        for r in t['routes']: declared[r] = declared.get(r, 0) + 1
    for p, n in declared.items():
        if n > 1: bad.append('route %s is declared by %d templates' % (p, n))
    pages = {r['pattern']: r for r in routes if r['kind'] == 'page'}
    for p, t in ((p, t['id']) for t in tpls for p in t['routes']):
        r = pages.get(p)
        if not r: bad.append('route %s of template %s missing from routes.json' % (p, t))
        elif r['template'] != t: bad.append('route %s maps to %s but template %s declares it' % (p, r['template'], t))
    for p, r in pages.items():
        if p not in declared: bad.append('route %s maps to template %s which does not declare it' % (p, r['template']))
        # admission derived from the bound template
        t = tmap.get(r['template'])
        if t is not None:
            elig = any(D['sections'][n['section']]['retrievalEligible'] for n in t['nodes'])
            if r['retrievalEligible'] != elig: bad.append('route %s retrievalEligible=%s but its template implies %s' % (p, r['retrievalEligible'], elig))
    ineligible = sorted(p for p, r in pages.items() if not r['retrievalEligible'])
    if man.get('routeAdmission', {}).get('ineligibleRoutes') != ineligible: bad.append('manifest routeAdmission.ineligibleRoutes %s != derived %s' % (man.get('routeAdmission', {}).get('ineligibleRoutes'), ineligible))
    # sibling checks
    note = ''
    if source_available():
        txt = (PROJECT / 'src/routes.js').read_text()
        src_pats = set(re.findall(r"'(/[^']*)'", txt.split('export const ROUTES')[1].split('export const EXCLUDED_PREFIXES')[0])) | {'/'}
        src_pats |= {'/duckdb-book-summary-chapter%d' % i for i in range(1, 12)}
        src_pats = {p for p in src_pats if not p.startswith('/duckdb-book-summary-chapter${')}
        mine = set(pages) | {r['pattern'] for r in routes if r['kind'] == 'redirect'}
        if mine != src_pats: bad.append('route patterns differ from src/routes.js: only-here %s only-source %s' % (sorted(mine - src_pats)[:3], sorted(src_pats - mine)[:3]))
        mr = PROJECT / 'MISSING_ROUTES.txt'
        if mr.exists():
            paths = [x.strip() for x in mr.read_text().split('\n') if x.strip()]
            unres = [x for x in paths if not resolve(x, list(mine))]
            if unres: bad.append('%d MISSING_ROUTES.txt paths do not resolve to a pattern, e.g. %s' % (len(unres), unres[:3]))
            note = '; %d MISSING_ROUTES.txt paths and src/routes.js re-checked' % len(paths)
    (fail if bad else ok)('routes', '; '.join(bad[:5]) if bad else '%d route patterns + %d redirects mapped exactly once; admission derived from templates and equal to the manifest%s' % (len(pages), sum(1 for r in routes if r['kind'] == 'redirect'), note))

# ------------------------------------------------------------------ assets
def check_assets(D, roles=None):
    roles = roles or D['roles']; rl = {r['id']: r for r in roles['roles']}
    bad = []
    for rid, r in rl.items():
        if r['availability'] not in roles['availabilityEnum']: bad.append('%s: availability %s outside the closed enum' % (rid, r['availability']))
        if r['generationPolicy'] not in roles['generationPolicyEnum']: bad.append('%s: generationPolicy %s outside the closed enum' % (rid, r['generationPolicy']))
        if PINNED_AVAILABILITY.get(rid) != r['availability']: bad.append('%s: availability %s differs from the pin %s' % (rid, r['availability'], PINNED_AVAILABILITY.get(rid)))
        if PINNED_POLICY.get(rid) != r['generationPolicy']: bad.append('%s: generationPolicy %s differs from the pin %s' % (rid, r['generationPolicy'], PINNED_POLICY.get(rid)))
        if r['availability'] != 'generation-safe':
            if not r['generationSafeSubstitutes']: bad.append('%s: %s role without generationSafeSubstitutes' % (rid, r['availability']))
            for s in r['generationSafeSubstitutes']:
                if s not in rl or rl[s]['availability'] != 'generation-safe': bad.append('%s: substitute %s is not a generation-safe role' % (rid, s))
            if len(r['aiGenerationGuidance']) < 30 or len(r['licensingGuidance']) < 20: bad.append('%s: guidance too thin' % rid)
        elif r['availability'] == 'generation-safe' and r['generationPolicy'] not in ('may-generate-new',): bad.append('%s: generation-safe role with policy %s' % (rid, r['generationPolicy']))
    for rid in PINNED_AVAILABILITY:
        if rid not in rl: bad.append('pinned role %s is missing from the registry' % rid)
    for rid in rl:
        if rid not in PINNED_AVAILABILITY or rid not in PINNED_POLICY: bad.append('%s: registry role has no pin in code' % rid)
    heavy = {'customer-logo': 'blocked-for-generation', 'investor-logo': 'blocked-for-generation', 'partner-tool-logo': 'blocked-for-generation', 'brand-wordmark': 'blocked-for-generation',
             'company-mascot-art': 'blocked-for-generation', 'person-portrait': 'blocked-for-generation', 'team-photo': 'blocked-for-generation', 'compliance-badge': 'blocked-for-generation'}
    for rid, av in heavy.items():
        if rl.get(rid, {}).get('availability') != av: bad.append('%s must be %s' % (rid, av))
        if PINNED_AVAILABILITY.get(rid) != av: bad.append('%s pin must be %s' % (rid, av))
        if rl.get(rid, {}).get('generationPolicy') in ('must-reuse-exact',): bad.append('%s: a real brand asset is never must-reuse-exact' % rid)
    for need in ('placeholder-brand-mark', 'fictional-person-avatar', 'placeholder-rating', 'placeholder-url', 'original-copy', 'generated-product-visual'):
        if need not in rl or rl[need]['availability'] != 'generation-safe': bad.append('missing generation-safe role %s' % need)
    # sections wired to the registry
    def assets(fields):
        for f in fields.values():
            if f['type'] == 'asset': yield f
            elif f['type'] == 'list': yield from assets(f['item'])
    for sid, c in D['sections'].items():
        gen = set(); used = set()
        for f in assets(c['content']['fields']):
            for r in f['roles']:
                used.add(r)
                if r not in rl: bad.append('%s: unknown asset role %s' % (sid, r)); continue
                if rl[r]['availability'] == 'generation-safe': gen.add(r)
                gen |= set(rl[r]['generationSafeSubstitutes'])
        if sorted(gen) != c['generatedAssetRoles']: bad.append('%s: generatedAssetRoles %s differs from the roles of its media fields %s' % (sid, c['generatedAssetRoles'], sorted(gen)))
        for r in c['generatedAssetRoles']:
            if r in rl and rl[r]['availability'] != 'generation-safe': bad.append('%s: generatedAssetRoles lists non-safe role %s' % (sid, r))
    # schema enum closure: every asset role enum in the schema is a registry role
    blob = json.dumps(D['schema'])
    for m in re.finditer(r'"role": \{"enum": \[([^\]]*)\]', blob):
        for r in re.findall(r'"([^"]+)"', m.group(1)):
            if r not in rl: bad.append('schema asset role enum contains unknown role %s' % r)
    for rid, r in rl.items():
        users = sorted(sid for sid, c in D['sections'].items() if any(rid in f['roles'] for f in assets(c['content']['fields'])))
        if users != r['usedBySections']: bad.append('%s: usedBySections is stale' % rid)
    (fail if bad else ok)('asset-roles', '; '.join(bad[:6]) if bad else '%d roles: closed enums, pinned availability and policy (customer/investor/tool logos, wordmark, mascot art, people photos, embeds are blocked), substitutes are generation-safe, section wiring and schema enums agree' % len(rl))

def check_pin_parity(sv):
    bad = []
    if sv.PINNED_AVAILABILITY != PINNED_AVAILABILITY: bad.append('PINNED_AVAILABILITY differs between verify_all.py and semantic_validate.py')
    if sv.PINNED_POLICY != PINNED_POLICY: bad.append('PINNED_POLICY differs between verify_all.py and semantic_validate.py')
    if set(sv.RETRIEVAL_INELIGIBLE) != set(RETRIEVAL_INELIGIBLE): bad.append('RETRIEVAL_INELIGIBLE differs between verify_all.py and semantic_validate.py')
    return bad

def check_retrieval(D):
    bad = []
    for sid, c in D['sections'].items():
        if (sid in RETRIEVAL_INELIGIBLE) == c['retrievalEligible']: bad.append('%s: retrievalEligible=%s disagrees with the pin' % (sid, c['retrievalEligible']))
        if not c['retrievalEligible'] and len(c.get('retrievalReason', '')) < 30: bad.append('%s: reason shorter than 30 characters' % sid)
        if c['semantic']['category'] == 'RUNTIME' and c['retrievalEligible']: bad.append('%s: RUNTIME section marked eligible' % sid)
    for t in D['tpl']['templates']:
        for r in t['runtimeUi']:
            c = D['sections'].get(r)
            if not c or c['semantic']['category'] != 'RUNTIME' or c['retrievalEligible']: bad.append('template %s runtimeUi %s is not an ineligible runtime section' % (t['id'], r))
        for n in t['nodes']:
            if D['sections'][n['section']]['semantic']['category'] == 'RUNTIME': bad.append('template %s uses runtime section %s as a node' % (t['id'], n['section']))
    for sid in RETRIEVAL_INELIGIBLE:
        if sid not in D['sections']: bad.append('pinned ineligible id %s has no contract' % sid)
    (fail if bad else ok)('retrieval-eligibility', '; '.join(bad[:5]) if bad else '%d ineligible sections (%d runtime UI) pinned in verify_all.py and semantic_validate.py, each with a reason of 30+ characters; runtime UI never a node' % (len(RETRIEVAL_INELIGIBLE), sum(1 for c in D['sections'].values() if c['semantic']['category'] == 'RUNTIME')))

# ------------------------------------------------------------------ templates
def check_templates(D):
    bad = []
    for t in D['tpl']['templates']:
        secs = {n['section'] for n in t['nodes']}
        for n in t['nodes']:
            if n['section'] not in D['sections']: bad.append('%s: unknown section %s' % (t['id'], n['section']))
            if not isinstance(n.get('required'), bool) or not isinstance(n.get('repeatable'), bool): bad.append('%s: node %s must be a structured object with required/repeatable' % (t['id'], n['section']))
        if not any(re.match('^' + re.sub(r':[A-Za-z]+', '[^/]+', r) + '/?$', t['sampleRoute']) for r in t['routes']): bad.append('%s: sampleRoute %s is not served by the template' % (t['id'], t['sampleRoute']))
        for r in t['routes']:
            if r not in t['evidence']['routeEvidence']: bad.append('%s: no evidence level for route %s' % (t['id'], r))
        for sid in secs:
            if t['id'] not in D['sections'][sid]['usedInTemplates']: bad.append('%s: section %s usedInTemplates is stale' % (t['id'], sid))
        for g in t.get('unorderedGroups', []):
            for s in g:
                if s not in secs: bad.append('%s: unordered group member %s is not a node' % (t['id'], s))
    sv = sys.modules.get('semantic_validate')
    for t in D['tpl']['templates']:
        for route, comp in t.get('memberCompositions', {}).items():
            if not any(route == r or pattern_rx(r).match(route) for r in t['routes']): bad.append('%s: composition route %s is not served by the template' % (t['id'], route))
            if sv is not None:
                seq = [(('shell.header' if t['chrome']['mode'] == 'site' else None), None)] if t['chrome']['mode'] == 'site' else []
                seq += [(s, None) for s in comp] + ([('shell.footer', None)] if t['chrome']['mode'] == 'site' else [])
                for rule, msg in sv.match_nodes(t, seq): bad.append('%s composition %s: %s' % (t['id'], route, msg))
    for sid, c in D['sections'].items():
        users = sorted(t['id'] for t in D['tpl']['templates'] if sid in {n['section'] for n in t['nodes']} | set(t['runtimeUi']))
        if users != c['usedInTemplates']: bad.append('%s: usedInTemplates %s != %s' % (sid, c['usedInTemplates'], users))
        if not users: bad.append('%s: section is used by no template' % sid)
    (fail if bad else ok)('templates', '; '.join(bad[:5]) if bad else '%d templates: structured nodes, sample routes served, %d real member compositions replayed against their template, usedInTemplates recomputed for %d sections' % (len(D['tpl']['templates']), sum(len(t.get('memberCompositions', {})) for t in D['tpl']['templates']), len(D['sections'])))

# ------------------------------------------------------------------ tokens
def catalog_from_files():
    ld = lambda p: jload(ROOT / p)['tokens']
    typ = ld('tokens/00-foundation/typography.json'); mot = ld('tokens/00-foundation/motion.json'); sem = ld('tokens/10-semantic/color.json')
    pick = lambda d, t: sorted(k for k, v in d.items() if v['type'] == t)
    surfaces = sorted(k.split('.', 1)[1] for k in sem if k.startswith('surface.') and k.split('.', 1)[1] in ('cream', 'sky', 'yellow', 'sun', 'ink', 'white', 'sand', 'teal', 'coral-red', 'garden', 'aqua', 'peach', 'sky-tint', 'mint', 'pink'))
    return {
        'color': sorted(sem), 'surface': surfaces, 'theme': sorted(p.stem for p in (ROOT / 'tokens/themes').glob('*.json')),
        'fontFamily': pick(typ, 'fontFamily'), 'fontSize': pick(typ, 'fontSize'), 'fontWeight': pick(typ, 'fontWeight'), 'letterSpacing': pick(typ, 'letterSpacing'),
        'spacing': sorted(ld('tokens/00-foundation/spacing.json')), 'radius': sorted(ld('tokens/00-foundation/radius.json')), 'elevation': sorted(ld('tokens/00-foundation/elevation.json')),
        'duration': sorted(k for k in mot if k.startswith('duration.')), 'easing': sorted(k for k in mot if k.startswith('easing.')),
        'breakpoint': sorted(ld('tokens/00-foundation/breakpoint.json')), 'iconSize': sorted(ld('tokens/00-foundation/icon-size.json')),
        'motionPattern': sorted(p['id'] for p in jload(ROOT / 'tokens/00-foundation/motion-patterns.json')['patterns']),
    }

def check_tokens(D, catalog=None, policy=None):
    cat = catalog or D['cat']; pol = policy or D['pol']; bad = []
    exp = catalog_from_files()
    for k in sorted(set(exp) | set(cat['categories'])):
        if exp.get(k) != cat['categories'].get(k):
            a = set(exp.get(k) or []); b = set(cat['categories'].get(k) or [])
            bad.append('catalog category %s drifted from the token files (only in files: %s; only in catalog: %s)' % (k, sorted(a - b)[:2], sorted(b - a)[:2]))
    for k in pol['rawValueRestrictions']:
        if k not in cat['categories']: bad.append('policy category %s is not a catalog key' % k)
    for k in ('themeBindings', 'themeSurfaces', 'overrides', 'enforcement'):
        if k not in pol: bad.append('policy lacks %s' % k)
    if pol.get('overrides', {}).get('pageSpecTokenOverrideField') is not None: bad.append('policy claims a PageSpec token-override field, but the schema has none')
    if 'tokenOverride' in json.dumps(D['schema']['properties']): bad.append('schema contains a token-override field')
    for t in pol['themeBindings'].get('dark', []):
        if t not in {x['id'] for x in D['tpl']['templates']}: bad.append('themeBindings names unknown template %s' % t)
    for r in pol['enforcement']:
        pass
    # theme files resolve every semantic colour
    sem = jload(ROOT / 'tokens/10-semantic/color.json')['tokens']
    for th in ('light', 'dark'):
        toks = jload(ROOT / ('tokens/themes/%s.json' % th))['tokens']
        if sorted(toks) != sorted(sem): bad.append('theme %s does not resolve exactly the semantic tokens' % th)
    # every semantic ref exists in the foundation
    fcol = jload(ROOT / 'tokens/00-foundation/color.json')['tokens']; ftyp = jload(ROOT / 'tokens/00-foundation/typography.json')['tokens']
    for k, v in sem.items():
        if v.get('ref') and v['ref'] not in fcol: bad.append('semantic %s -> unknown foundation colour %s' % (k, v['ref']))
    for k, v in jload(ROOT / 'tokens/10-semantic/type.json')['tokens'].items():
        if v['ref'] not in ftyp: bad.append('semantic %s -> unknown type role %s' % (k, v['ref']))
    # section surfaces and motion patterns exist in the catalog
    pats = set(exp['motionPattern'])
    for sid, c in D['sections'].items():
        for s in c['allowedSurfaces']:
            if s not in cat['categories']['surface']: bad.append('%s: surface %s not in catalog' % (sid, s))
        for m in c['motion']['allowedPatterns']:
            if m not in pats: bad.append('%s: unknown motion pattern %s' % (sid, m))
    return bad
def check_tokens_report(D):
    bad = check_tokens(D)
    cat = D['cat']['categories']
    (fail if bad else ok)('tokens', '; '.join(bad[:5]) if bad else 'token catalog recomputed from the token files and equal (%d categories); policy categories are catalog keys; themes resolve every semantic token; no PageSpec token-override field exists (recorded in token-policy.json)' % len(cat))

# ------------------------------------------------------------------ graph vs validator
def check_graph(D, sv):
    bad = []
    ids = [r['id'] for r in D['graph']['rules']]
    if sorted(ids) != sorted(sv.RULES): bad.append('graph rule ids %s differ from the validator RULES %s' % (sorted(set(ids) ^ set(sv.RULES)), ''))
    for r in D['graph']['rules']:
        if r['severity'] not in ('error', 'warn'): bad.append('%s: severity %r' % (r['id'], r['severity']))
        for e in r['exceptions']:
            if 'reason' not in e or len(e['reason']) < 20: bad.append('%s: named exception without a reason' % r['id'])
            if e.get('template') and e['template'] not in {t['id'] for t in D['tpl']['templates']}: bad.append('%s: exception names unknown template %s' % (r['id'], e['template']))
    repo = sv.Repo(ROOT)
    res = sv.self_check(repo)
    for tid, fs in res.items():
        for f in fs:
            bad.append('template %s violates %s: %s' % (tid, f.rule, f.message))
    mb = [r for r in D['graph']['rules'] if r['id'] == 'MOTION_BUDGET'][0]['params']
    inf = sorted(k['id'] for k in D['mot']['patterns'] if 'infinite' in str(k['iterations']))
    if sorted(mb['infinitePatterns']) != inf: bad.append('MOTION_BUDGET infinitePatterns differ from motion-patterns.json')
    ho = [r for r in D['graph']['rules'] if r['id'] == 'HERO_FIRST_AFTER_NAV'][0]['params']['heroOptionalTemplates']
    exp = sorted(t['id'] for t in D['tpl']['templates'] if not any(D['sections'][n['section']]['semantic']['category'] == 'HERO' for n in t['nodes']))
    if sorted(ho) != exp: bad.append('HERO_FIRST_AFTER_NAV heroOptionalTemplates differs from templates.json: %s' % sorted(set(ho) ^ set(exp)))
    (fail if bad else ok)('compatibility-graph', '; '.join(bad[:5]) if bad else '%d graph rules match the validator implementations; every one of %d real templates satisfies every rule (named exceptions only)' % (len(ids), len(res)))

# ------------------------------------------------------------------ wrapper gate + measured values
def check_gate(D):
    wg = load_module('wrapper_gate', ROOT / 'extraction/wrapper_gate.py')
    F, rep = wg.run(ROOT)
    errs = [f for f in F if f[0] == 'error']; warns = [f for f in F if f[0] == 'warn']
    (fail if errs else ok)('wrapper-gate', '; '.join('%s: %s' % (f[1], f[2]) for f in errs[:4]) if errs else
                           'extraction/wrapper_gate.py: %d templates checked, %d skipped, %d composed band(s) reported, %d warning(s), 0 errors' % (rep['checked'], len(rep['skipped']), len(rep['composedBands']), len(warns)))
    for f in warns: warn('wrapper-gate', '%s: %s' % (f[1], f[2]))
    mv = D['mv']; bad = []
    for r in mv['copyBudgets']['homepageMeasured']:
        c = D['sections'].get(r['contract'])
        fld = c['content']['fields'].get(r['field']) if c else None
        if fld is None and c and r['field'] == 'sub': fld = c['content']['fields'].get('sub')
        if not fld or not (r['words'] <= fld.get('maxWords', 0) <= max(r['words'] * 1.25, r['words'] + 6)): bad.append('%s.%s maxWords %s is outside the measured %s words (up to +25%%/+6 for the clone reference copy)' % (r['contract'], r['field'], fld and fld.get('maxWords'), r['words']))
    for tid in {t['id'] for t in D['tpl']['templates']}:
        if tid not in mv['sectionHeights']['templates']: bad.append('no sectionHeights for %s' % tid)
    (fail if bad else ok)('measured-values', '; '.join(bad[:4]) if bad else 'sectionHeights cover every template at 1440px; homepage copy budgets cover the measured word counts')

def check_source_lengths(D):
    L = D['mv'].get('sourceFileLengths', {}); cited = {f for _, f, _, _, _ in iter_citations(D) if '*' not in f}
    miss = sorted(f for f in cited if f not in L)
    (fail if miss else ok)('source-lengths', 'cited files without a recorded length: %s' % miss[:4] if miss else '%d cited source files have a recorded line count' % len(L))

# ------------------------------------------------------------------ examples
def check_examples(D, sv):
    repo = sv.Repo(ROOT); bad = []; files = [ROOT / 'schema/example.pagespec.json'] + sorted((ROOT / 'schema/examples').glob('*.json'))
    fam_gen = set(); n_ref = n_gen = 0
    for f in files:
        spec = jload(f)
        fs = [x for x in sv.validate(spec, repo) if x.severity == 'error']
        if fs: bad.append('%s: %s' % (f.name, '; '.join('%s %s' % (x.rule, x.message[:60]) for x in fs[:2])))
        if spec['mode'] == 'generated':
            n_gen += 1; fam_gen.add(repo.templates[spec['template']]['family'])
            if '.example' not in json.dumps(spec): bad.append('%s: generated example has no .example URL' % f.name)
        else: n_ref += 1
    need = {'home', 'marketing', 'content-index', 'article', 'legal', 'form-lp', 'events', 'podcast'}
    if need - fam_gen: bad.append('no generated example for template families %s' % sorted(need - fam_gen))
    if n_ref < 1: bad.append('no reference example')
    (fail if bad else ok)('examples', '; '.join(bad[:4]) if bad else '%d example PageSpecs (%d reference, %d generated) pass Draft-07 + semantic validation; generated examples cover families %s' % (len(files), n_ref, n_gen, sorted(fam_gen)))
    return repo

# ------------------------------------------------------------------ hygiene
def check_hygiene():
    junk = [str(p.relative_to(ROOT)) for p in ROOT.rglob('*') if p.name in JUNK or any(part in JUNK for part in p.parts)]
    ab = []
    for p in ROOT.rglob('*'):
        if p.is_file() and p.suffix in ('.json', '.md', '.py', '.mjs', '.txt', '.js'):
            t = p.read_text(errors='ignore')
            if ABS_PATH.search(t) and p.name != 'verify_all.py': ab.append(str(p.relative_to(ROOT)))
    (fail if junk else ok)('junk-files', 'junk: %s' % junk[:4] if junk else 'no __MACOSX, .DS_Store, __pycache__ or Thumbs.db')
    (fail if ab else ok)('absolute-paths', 'absolute machine paths in %s' % ab[:4] if ab else 'no absolute machine paths (macOS, Linux or Windows home or temp directory prefixes) in any text file')

# ------------------------------------------------------------------ main
def main():
    check_layout(); check_json_parse()
    if any(r[0] == 'FAIL' and r[1] == 'layout' for r in results): return finish()
    D = load()
    sv = load_module('semantic_validate', ROOT / 'schema/semantic_validate.py')
    check_contracts(D); check_prims_comps(D); check_allowlist_report(D); check_templates(D)
    pb = check_pin_parity(sv)
    (fail if pb else ok)('pin-parity', '; '.join(pb) if pb else 'verify_all.py and semantic_validate.py carry identical availability, policy and retrieval pins')
    check_assets(D); check_retrieval(D)
    check_citations(D); check_source_lengths(D)
    check_counts(D); check_versions(D); check_entrypoints(D); check_routes(D)
    check_tokens_report(D); check_graph(D, sv); check_gate(D)
    pf = sv.pin_findings(sv.Repo(ROOT))
    (fail if pf else ok)('validator-pins', '; '.join(f.message for f in pf[:3]) if pf else 'semantic_validate.py pins agree with the registry and the contracts')
    if not QUICK: check_examples(D, sv)
    check_hygiene()
    return finish()

def finish():
    as_json = '--json' in sys.argv
    if as_json: print(json.dumps(results, indent=1))
    else:
        for s, c, m in results: print('%-4s  %-22s %s' % (s, c, m))
    nf = sum(1 for r in results if r[0] == 'FAIL'); nw = sum(1 for r in results if r[0] == 'WARN')
    if not as_json: print('\nverify_all: %d pass, %d warn, %d fail' % (sum(1 for r in results if r[0] == 'PASS'), nw, nf))
    return 1 if nf else 0

if __name__ == '__main__':
    sys.exit(main())
