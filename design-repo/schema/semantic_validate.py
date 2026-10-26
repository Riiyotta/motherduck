#!/usr/bin/env python3
"""Semantic validator for PageSpecs: everything JSON Schema cannot express.

    python3 schema/semantic_validate.py                  # validate every shipped example PageSpec
    python3 schema/semantic_validate.py FILE [FILE...]   # validate given PageSpec files
    python3 schema/semantic_validate.py --self-check     # run the compatibility graph over every real template
    python3 schema/semantic_validate.py --json FILE      # machine-readable findings

Layers: (1) Draft-07 schema, (2) template binding (the declared template's real node list is cross-checked
against nodes[]), (3) per-field budgets, (4) section constraints, (5) compatibility graph rules (severity from
compatibility/graph.json), (6) generation-mode rules GENERATED_MODE_* (R2), (7) asset availability pinned in
code, (8) retrieval-eligibility pins, (9) token policy. Exit status 1 when any error-severity finding exists.
Dependencies: the Python standard library plus `jsonschema` (Draft-07).
"""
import sys
sys.dont_write_bytecode = True
import json, os, re, sys
from pathlib import Path
from collections import namedtuple

ROOT = Path(os.path.dirname(os.path.abspath(__file__))).parent   # derived from __file__, never hard-coded

# --------------------------------------------------------------------------------------------------------------
# Pins. These live in code on purpose: editing a registry file alone must not loosen them (R3, R8, MASTER 3.23).
# --------------------------------------------------------------------------------------------------------------
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
PERSON_ROLES = frozenset(['person-portrait', 'team-photo'])
ALT_MAX_WORDS = 12
RUNTIME_CATEGORY = 'RUNTIME'
SCRUB_PATTERNS = frozenset(['sticky-stack-scrub', 'story-scale-scrub'])

Finding = namedtuple('Finding', 'rule severity path message')

def words(s):
    return [w for w in str(s).split() if re.search(r'[A-Za-z0-9]', w)]

def jload(p):
    with open(p) as f:
        return json.load(f)

class Repo(object):
    def __init__(self, root=ROOT):
        self.root = Path(root)
        r = self.root
        self.schema = jload(r / 'schema' / 'pagespec.schema.json')
        self.contracts = {}
        for p in sorted((r / 'sections').glob('*.json')):
            c = jload(p); self.contracts[c['id']] = c
        self.templates = {t['id']: t for t in jload(r / 'templates' / 'templates.json')['templates']}
        self.routes = jload(r / 'templates' / 'routes.json')['routes']
        self.graph = jload(r / 'compatibility' / 'graph.json')
        self.roles = {x['id']: x for x in jload(r / 'assets' / 'asset-roles.json')['roles']}
        self.catalog = jload(r / 'tokens' / 'llm' / 'token-catalog.json')
        self.policy = jload(r / 'tokens' / 'llm' / 'token-policy.json')
        self.brand = jload(r / 'schema' / 'source-brand.json')
        self._validator = None
        self._ref_shingles = None

    @property
    def validator(self):
        if self._validator is None:
            from jsonschema import Draft7Validator
            self._validator = Draft7Validator(self.schema)
        return self._validator

    def ref_shingles(self):
        """6-word shingles of every reference-mode example shipped in this package."""
        if self._ref_shingles is None:
            n = self.brand['copyShingleWords']; out = set()
            files = [self.root / 'schema' / 'example.pagespec.json'] + sorted((self.root / 'schema' / 'examples').glob('*.json'))
            for f in files:
                if not f.exists(): continue
                spec = jload(f)
                if spec.get('mode') != 'reference': continue
                for _, kind, val in iter_strings(spec, self):
                    if kind != 'text': continue
                    ws = [w.lower().strip('.,;:!?"()') for w in words(val)]
                    for i in range(len(ws) - n + 1):
                        out.add(' '.join(ws[i:i + n]))
            self._ref_shingles = out
        return self._ref_shingles

# --------------------------------------------------------------------------------------------------------------
# Walking content with the contract's field types
# --------------------------------------------------------------------------------------------------------------
def walk_fields(fields, value, path):
    """Yield (path, ftype, fdef, value) for every leaf of `value` described by contract `fields`."""
    if not isinstance(value, dict): return
    for k, v in value.items():
        fd = fields.get(k)
        p = path + '.' + k
        if fd is None: continue
        t = fd['type']
        if t == 'list' and isinstance(v, list):
            yield (p, 'list', fd, v)
            for i, it in enumerate(v):
                for x in walk_fields(fd['item'], it, '%s[%d]' % (p, i)): yield x
        elif t == 'link' and isinstance(v, dict):
            yield (p + '.label', 'linklabel', fd, v.get('label'))
            if 'href' in v: yield (p + '.href', 'href', fd, v.get('href'))
        elif t == 'asset' and isinstance(v, dict):
            yield (p, 'asset', fd, v)
        else:
            yield (p, t, fd, v)

def iter_strings(spec, repo):
    """Yield (path, kind, value). kind: text | href | code | ref | meta."""
    for k, v in (spec.get('meta') or {}).items():
        if isinstance(v, str): yield ('meta.' + k, 'meta', v)
    yield ('route', 'href', spec.get('route'))
    for i, node in enumerate(spec.get('nodes', [])):
        c = repo.contracts.get(node.get('section'))
        base = 'nodes[%d].content' % i
        if not c: continue
        for p, t, fd, v in walk_fields(c['content']['fields'], node.get('content', {}), base):
            if t in ('text', 'linklabel') and isinstance(v, str): yield (p, 'text', v)
            elif t == 'href' and isinstance(v, str): yield (p, 'href', v)
            elif t == 'code' and isinstance(v, str): yield (p, 'code', v)
            elif t == 'asset':
                if isinstance(v.get('alt'), str): yield (p + '.alt', 'text', v['alt'])
                if isinstance(v.get('ref'), str): yield (p + '.ref', 'ref', v['ref'])

# --------------------------------------------------------------------------------------------------------------
# Template binding
# --------------------------------------------------------------------------------------------------------------
def route_matches(pattern, route):
    return re.match('^' + re.sub(r':[A-Za-z]+', '[^/]+', pattern) + '/?$', route) is not None

def match_nodes(tpl, seq):
    """Cross-check the declared template's real node list against the page's nodes.
    Returns a list of (rule, message). Keys are (section, variant) so one section may legitimately appear twice."""
    out = []
    nodes = tpl['nodes']
    groups = {n['group'] for n in nodes if n.get('group')}
    unordered = [set(g) for g in tpl.get('unorderedGroups', [])]
    # reorder runs that belong to an unordered group into template order
    order = {}
    for i, n in enumerate(nodes):
        order.setdefault(n['section'], i)
    seq = list(seq)
    for g in unordered:
        idx = [i for i, s in enumerate(seq) if s[0] in g]
        if idx and idx[-1] - idx[0] + 1 != len(idx):
            out.append(('TEMPLATE_NODES', 'nodes of the unordered group %s must be contiguous' % sorted(g)[:3]))
        run = sorted([seq[i] for i in idx], key=lambda s: order.get(s[0], 0))
        for j, i in enumerate(idx): seq[i] = run[j]
    pos = 0
    group_hits = {}
    for n in nodes:
        sec, var = n['section'], n.get('variant')
        count = 0
        while pos < len(seq) and seq[pos][0] == sec and (var is None or seq[pos][1] == var):
            count += 1; pos += 1
            if not n.get('repeatable') and count >= 1: break
        if n.get('group'):
            group_hits[n['group']] = group_hits.get(n['group'], 0) + count
            continue
        if count == 0 and n.get('required'):
            out.append(('TEMPLATE_NODES', 'template %s requires section %s%s' % (tpl['id'], sec, ' (variant %s)' % var if var else '')))
        if count > 1 and not n.get('repeatable'):
            out.append(('TEMPLATE_NODES', 'section %s is not repeatable in template %s' % (sec, tpl['id'])))
    for g in groups:
        if group_hits.get(g, 0) != 1:
            out.append(('TEMPLATE_NODES', 'template %s needs exactly one section of group %s (found %d)' % (tpl['id'], g, group_hits.get(g, 0))))
    if pos < len(seq):
        out.append(('TEMPLATE_NODES', 'section %s%s at position %d is not allowed here by template %s' % (seq[pos][0], '/' + str(seq[pos][1]) if seq[pos][1] else '', pos, tpl['id'])))
    return out

# --------------------------------------------------------------------------------------------------------------
# Compatibility graph rules. Each takes (seq, ctx) where seq = [{'section','variant','motion'}] and returns messages.
# Severity, parameters and named exceptions come from compatibility/graph.json.
# --------------------------------------------------------------------------------------------------------------
def _cat(ctx, s): return ctx['repo'].contracts[s]['semantic']['category']
def _exc(rule, ctx, **kw):
    for e in rule.get('exceptions', []):
        if e.get('template') in (None, ctx['template']) and all(e.get(k) == v for k, v in kw.items()): return True
    return False

def r_header_first(seq, ctx, rule):
    if _exc(rule, ctx): return []
    if not seq or seq[0]['section'] not in rule['params']['headerSections']:
        return ['first node must be one of %s' % rule['params']['headerSections']]
    return []
def r_footer_last(seq, ctx, rule):
    if _exc(rule, ctx): return []
    if not seq or seq[-1]['section'] not in rule['params']['footerSections']:
        return ['last node must be one of %s' % rule['params']['footerSections']]
    return []
def r_one_hero(seq, ctx, rule):
    n = [s for s in seq if _cat(ctx, s['section']) == 'HERO']
    return ['page has %d HERO sections (%s); a page has one page-opening composition' % (len(n), [s['section'] for s in n])] if len(n) > 1 else []
def r_hero_first(seq, ctx, rule):
    ns = [s for s in seq if _cat(ctx, s['section']) != 'SHELL']
    heroes = [i for i, s in enumerate(ns) if _cat(ctx, s['section']) == 'HERO']
    if heroes and heroes[0] != 0 and not _exc(rule, ctx):
        return ['HERO %s is not the first non-shell node' % ns[heroes[0]]['section']]
    return []
def r_no_adjacent(seq, ctx, rule):
    cats = set(rule['params']['categories']); out = []
    ns = [s for s in seq if _cat(ctx, s['section']) != 'SHELL']
    for a, b in zip(ns, ns[1:]):
        ca = _cat(ctx, a['section'])
        if ca == _cat(ctx, b['section']) and ca in cats and not _exc(rule, ctx, sections=[a['section'], b['section']]):
            out.append('%s directly follows %s (both %s)' % (b['section'], a['section'], ca))
    return out
def r_no_consecutive_scrub(seq, ctx, rule):
    out = []
    def scrub(s):
        m = (s.get('motion') or {}).get('pattern') or ctx['repo'].contracts[s['section']]['motion']['default']
        return m in SCRUB_PATTERNS
    for a, b in zip(seq, seq[1:]):
        if scrub(a) and scrub(b): out.append('%s and %s both scrub on scroll and are adjacent' % (a['section'], b['section']))
    return out
def r_no_dup_variant(seq, ctx, rule):
    seen = {}; out = []
    tpl = ctx.get('tpl')
    for s in seq:
        k = (s['section'], s.get('variant'))
        seen[k] = seen.get(k, 0) + 1
    for (sec, var), n in seen.items():
        rep = tpl and any(x['section'] == sec and x.get('repeatable') for x in tpl['nodes'])
        if n > 1 and not rep: out.append('(%s, %s) appears %d times and is not repeatable' % (sec, var, n))
    return out
def r_runtime_not_node(seq, ctx, rule):
    return ['%s is runtime UI and cannot be a page node' % s['section'] for s in seq if _cat(ctx, s['section']) == RUNTIME_CATEGORY]
def r_motion_budget(seq, ctx, rule):
    inf = set(rule['params']['infinitePatterns']); n = 0
    for s in seq:
        m = (s.get('motion') or {}).get('pattern') or ctx['repo'].contracts[s['section']]['motion']['default']
        if m in inf: n += 1
    return ['%d sections run continuous motion (budget %d)' % (n, rule['params']['maxInfiniteSections'])] if n > rule['params']['maxInfiniteSections'] else []
def r_contract_constraints(seq, ctx, rule):
    out = []
    secs = [s['section'] for s in seq]
    ns = [s['section'] for s in seq if not s['section'].startswith('shell.')]
    for i, s in enumerate(seq):
        c = ctx['repo'].contracts[s['section']]['constraints']; sec = s['section']; cnt = secs.count(sec)
        if c.get('onePerPage') and cnt > 1: out.append('%s: onePerPage but appears %d times' % (sec, cnt))
        if c.get('maxPerPage') and cnt > c['maxPerPage']: out.append('%s: at most %d per page, found %d' % (sec, c['maxPerPage'], cnt))
        if c.get('mustBeFirst') and i != 0: out.append('%s must be the first node' % sec)
        if c.get('mustBeLast') and i != len(seq) - 1: out.append('%s must be the last node' % sec)
        if c.get('mustFollowNav'):
            prev = seq[i - 1]['section'] if i else None
            if prev is None or not prev.startswith('shell.'): out.append('%s must directly follow the navigation shell' % sec)
        if c.get('mustPrecedeFooter'):
            rest = [x['section'] for x in seq[i + 1:]]
            if rest and not (len(rest) == 1 and rest[0].startswith('shell.')): out.append('%s must be the last content node before the footer' % sec)
    for sec in set(secs):
        c = ctx['repo'].contracts[sec]['constraints']
        if c.get('minPerPage') and secs.count(sec) < c['minPerPage']: out.append('%s: at least %d required' % (sec, c['minPerPage']))
    return out

RULES = {
    'HEADER_FIRST': r_header_first, 'FOOTER_LAST': r_footer_last, 'ONE_HERO': r_one_hero, 'HERO_FIRST_AFTER_NAV': r_hero_first,
    'NO_ADJACENT_SAME_CATEGORY': r_no_adjacent, 'NO_CONSECUTIVE_SCROLL_STAGES': r_no_consecutive_scrub,
    'NO_DUPLICATE_SECTION_VARIANT': r_no_dup_variant, 'RUNTIME_NOT_A_NODE': r_runtime_not_node, 'MOTION_BUDGET': r_motion_budget,
    'CONTRACT_CONSTRAINTS': r_contract_constraints,
}

def graph_findings(seq, repo, template_id):
    out = []
    ctx = {'repo': repo, 'template': template_id, 'tpl': repo.templates.get(template_id)}
    for rule in repo.graph['rules']:
        fn = RULES.get(rule['id'])
        if fn is None:
            out.append(Finding('GRAPH_RULE_UNIMPLEMENTED', 'error', 'graph', 'rule %s has no implementation in semantic_validate.py' % rule['id'])); continue
        for m in fn(seq, ctx, rule):
            out.append(Finding(rule['id'], rule['severity'], 'nodes', m))
    return out

# --------------------------------------------------------------------------------------------------------------
# Generated mode (R2) and token policy
# --------------------------------------------------------------------------------------------------------------
HEX_RE = re.compile(r'#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})\b')
FUNC_COLOR_RE = re.compile(r'\b(?:rgb|rgba|hsl|hsla)\s*\(', re.I)
SPACING_RE = re.compile(r'(?<![\w.])\d+(?:\.\d+)?\s?(?:px|rem|em|vh|vw)\b', re.I)
FONT_RE = re.compile(r'font-family|font-size|\bfont\s*:|\bAeonik\b', re.I)
URL_RE = re.compile(r'(?i)\b(?:https?://|www\.)[^\s"\'<>)]+')
DOMAIN_RE = re.compile(r'(?i)\b[a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:com|org|net|io|ai|dev|app|co|xyz)\b')
MAIL_RE = re.compile(r'(?i)[\w.+-]+@([\w-]+(?:\.[\w-]+)+)')

def host_ok(host, brand):
    host = host.lower().strip('.')
    perm = brand['permittedPlaceholderHosts']
    return host.rsplit('.', 1)[-1] in perm['tlds'] or host in perm['domains'] or any(host.endswith('.' + d) for d in perm['domains'])

def brand_regexes(brand):
    P = brand['sourceBrand']['patterns']
    lit_ci = [x['text'] for x in P['productNames']['literals']]
    cs = [x['text'] for x in P['commonWordProductNames']['literals']]
    return {
        'brand': re.compile(P['brandNames']['regex']),
        'stand': re.compile('|'.join(re.escape(x['text']) for x in P['cloneStandInBrand']['literals']), re.I),
        'product': re.compile('|'.join(r'\b' + re.escape(x) + r'\b' for x in lit_ci), re.I) if lit_ci else None,
        'common': re.compile(r'\b(?:' + '|'.join(re.escape(x) for x in cs) + r')\b'),
        'customer': re.compile('|'.join(r'\b' + re.escape(x['text']).replace(r'\ ', r'[\s-]?') + r'\b' for x in P['customerNames']['literals']), re.I),
        'cta': re.compile('|'.join(re.escape(x['text']) for x in P['callsToAction']['literals']), re.I),
        'ctabrand': re.compile(P['callsToAction']['brandBearingRegex']),
        'tag': re.compile('|'.join(re.escape(x['text']) for x in P['taglineAndLabelPhrases']['literals']), re.I),
        'domain': re.compile('|'.join(re.escape(x['text']) for x in P['domains']['literals'] + P['socialAndStoreLinks']['literals']), re.I),
        'store': re.compile(P['appStoreMarks']['hostRegex']),
        'rating': re.compile(brand['ratingRegex']),
    }

def generated_findings(spec, repo):
    out = []
    brand = repo.brand
    rx = brand_regexes(brand)
    static = set(brand['sourceStaticRoutes'])
    for path, kind, val in iter_strings(spec, repo):
        if not isinstance(val, str) or not val: continue
        low = val.lower()
        if kind == 'href':
            if path == 'route':
                if val in static and val != '/':
                    out.append(Finding('GENERATED_MODE_URL', 'error', path, 'route %s is a source-specific path' % val))
                continue
            if val.startswith('#'): continue
            if val.startswith('mailto:'):
                m = MAIL_RE.search(val)
                if not m or not host_ok(m.group(1), brand): out.append(Finding('GENERATED_MODE_URL', 'error', path, 'mailto target is not a reserved placeholder domain: %s' % val))
                continue
            if val.startswith('/'):
                if val.rstrip('/') in static and val != '/':
                    out.append(Finding('GENERATED_MODE_URL', 'error', path, 'link %s points at a source-specific path' % val))
                if rx['domain'].search(val) or rx['brand'].search(val):
                    out.append(Finding('GENERATED_MODE_URL', 'error', path, 'link contains a source domain or brand: %s' % val))
                continue
            m = re.match(r'(?i)^https?://([^/:?#]+)', val)
            if not m:
                out.append(Finding('GENERATED_MODE_URL', 'error', path, 'link is neither an anchor, a relative path nor a reserved placeholder URL: %s' % val)); continue
            if not host_ok(m.group(1), brand) or rx['domain'].search(val) or rx['store'].search(val) or rx['brand'].search(val):
                out.append(Finding('GENERATED_MODE_URL', 'error', path, 'URL host %s is not a reserved placeholder host (.example, .invalid, .test, example.com/org/net)' % m.group(1)))
            continue
        # text-like strings
        if kind in ('text', 'meta', 'code', 'ref'):
            if rx['brand'].search(val) or rx['stand'].search(val) or rx['customer'].search(val) or (rx['product'] and rx['product'].search(val)) or rx['common'].search(val):
                out.append(Finding('GENERATED_MODE_BRAND', 'error', path, 'source brand, product, customer or stand-in brand name in %r' % val[:60]))
            if rx['cta'].search(val) or rx['ctabrand'].search(val):
                out.append(Finding('GENERATED_MODE_CTA', 'error', path, 'source call-to-action string in %r' % val[:60]))
            if rx['tag'].search(val):
                out.append(Finding('GENERATED_MODE_COPY', 'error', path, 'source tagline or label phrase in %r' % val[:60]))
            for m in URL_RE.finditer(val):
                hm = re.match(r'(?i)^(?:https?://)?(?:www\.)?([^/:?#]+)', m.group(0))
                if not hm or not host_ok(hm.group(1), brand): out.append(Finding('GENERATED_MODE_URL', 'error', path, 'URL in text is not a reserved placeholder host: %s' % m.group(0)))
            for m in DOMAIN_RE.finditer(val):
                if not host_ok(m.group(0), brand) and rx['domain'].search(m.group(0)):
                    out.append(Finding('GENERATED_MODE_URL', 'error', path, 'source domain in text: %s' % m.group(0)))
            for m in MAIL_RE.finditer(val):
                if not host_ok(m.group(1), brand): out.append(Finding('GENERATED_MODE_URL', 'error', path, 'email domain is not a reserved placeholder host: %s' % m.group(0)))
            if kind != 'code' and rx['rating'].search(val) and brand['ratingAllowMarker'] not in low:
                out.append(Finding('GENERATED_MODE_RATING', 'error', path, 'rating-like text without the sample marker: %r' % val[:60]))
            if kind == 'text':
                norm = ' ' + re.sub(r'[^a-z0-9 ]+', ' ', low) + ' '
                for slug in brand['personEvidence']['authorSlugs']:
                    nm = ' ' + slug.replace('-', ' ') + ' '
                    if len(nm) > 8 and nm in norm:
                        out.append(Finding('GENERATED_MODE_PERSON', 'error', path, 'text names a real person from the source (%s)' % slug)); break
    # source copy reuse: shingles shared with the shipped reference examples
    n = brand['copyShingleWords']; ref = repo.ref_shingles()
    for path, kind, val in iter_strings(spec, repo):
        if kind != 'text': continue
        ws = [w.lower().strip('.,;:!?"()') for w in words(val)]
        for i in range(len(ws) - n + 1):
            if ' '.join(ws[i:i + n]) in ref:
                out.append(Finding('GENERATED_MODE_COPY', 'error', path, 'reproduces a %d-word run of reference-mode copy' % n)); break
    # assets
    for i, node in enumerate(spec.get('nodes', [])):
        c = repo.contracts.get(node.get('section'))
        if not c: continue
        for p, t, fd, v in walk_fields(c['content']['fields'], node.get('content', {}), 'nodes[%d].content' % i):
            if t != 'asset': continue
            role = v.get('role')
            if role in PERSON_ROLES:
                out.append(Finding('GENERATED_MODE_PERSON', 'error', p, 'role %s depicts real people and cannot be used in generated mode' % role))
            elif PINNED_AVAILABILITY.get(role) != 'generation-safe':
                out.append(Finding('GENERATED_MODE_ASSET', 'error', p, 'asset role %s is %s; generated pages may only use generation-safe roles' % (role, PINNED_AVAILABILITY.get(role, 'unknown'))))
            if v.get('ref') and not str(v['ref']).startswith('placeholder:'):
                out.append(Finding('GENERATED_MODE_ASSET', 'error', p, 'asset ref must be a placeholder: reference in generated mode'))
        for p, t, fd, v in walk_fields(c['content']['fields'], node.get('content', {}), 'nodes[%d].content' % i):
            if t == 'href' and isinstance(v, str) and '/authors/' in v:
                out.append(Finding('GENERATED_MODE_PERSON', 'error', p, 'link to a real author profile'))
    return out

def token_findings(spec, repo):
    out = []
    pol, cat = repo.policy, repo.catalog
    theme = spec.get('theme')
    if theme not in cat['categories']['theme']:
        out.append(Finding('TOKEN_UNKNOWN', 'error', 'theme', 'unknown theme %r' % theme))
    allowed_templates = pol['themeBindings'].get(theme)
    if allowed_templates and allowed_templates != 'all' and spec.get('template') not in allowed_templates:
        out.append(Finding('TOKEN_THEME_BINDING', 'error', 'theme', 'theme %s is bound to templates %s' % (theme, allowed_templates)))
    surf_ok = pol['themeSurfaces'].get(theme)
    for i, node in enumerate(spec.get('nodes', [])):
        c = repo.contracts.get(node.get('section'))
        s = node.get('surface')
        if s is not None:
            if s not in cat['categories']['surface']:
                out.append(Finding('TOKEN_UNKNOWN', 'error', 'nodes[%d].surface' % i, 'unknown surface token %r' % s))
            elif c and s not in c['allowedSurfaces']:
                out.append(Finding('TOKEN_SURFACE_NOT_ALLOWED', 'error', 'nodes[%d].surface' % i, 'surface %s is not allowed for %s' % (s, node.get('section'))))
            if surf_ok and s not in surf_ok:
                out.append(Finding('TOKEN_THEME_COMBINATION', 'error', 'nodes[%d].surface' % i, 'surface %s cannot be combined with theme %s' % (s, theme)))
        if node.get('section') == 'shell.header':
            if (node.get('variant') == 'dark') != (theme == 'dark'):
                out.append(Finding('TOKEN_THEME_COMBINATION', 'error', 'nodes[%d].variant' % i, 'shell.header variant dark and theme dark must be used together'))
    for path, kind, val in iter_strings(spec, repo):
        if kind not in ('text', 'meta') or not isinstance(val, str): continue
        if HEX_RE.search(val) or FUNC_COLOR_RE.search(val):
            out.append(Finding('TOKEN_RAW_COLOR', 'error', path, 'raw colour value; use a token from tokens/llm/token-catalog.json (%r)' % val[:50]))
        if SPACING_RE.search(val):
            out.append(Finding('TOKEN_RAW_SPACING', 'error', path, 'arbitrary spacing or size value; spacing comes from the section contract (%r)' % val[:50]))
        if FONT_RE.search(val):
            out.append(Finding('TOKEN_RAW_FONT', 'error', path, 'font declaration or unsupported typeface; fonts come from the token catalog (%r)' % val[:50]))
    return out

def pin_findings(repo):
    """Registry/contract/allowlist values must agree with the pins in this file."""
    out = []
    for rid, role in repo.roles.items():
        if rid in PINNED_AVAILABILITY and role['availability'] != PINNED_AVAILABILITY[rid]:
            out.append(Finding('PINNED_AVAILABILITY', 'error', 'assets/asset-roles.json:' + rid, 'availability %s differs from the pinned %s' % (role['availability'], PINNED_AVAILABILITY[rid])))
        if rid in PINNED_POLICY and role['generationPolicy'] != PINNED_POLICY[rid]:
            out.append(Finding('PINNED_POLICY', 'error', 'assets/asset-roles.json:' + rid, 'generationPolicy %s differs from the pinned %s' % (role['generationPolicy'], PINNED_POLICY[rid])))
        if rid not in PINNED_AVAILABILITY:
            out.append(Finding('PINNED_AVAILABILITY', 'error', 'assets/asset-roles.json:' + rid, 'role has no pin'))
    for sid, c in repo.contracts.items():
        elig = c['retrievalEligible']
        if (sid in RETRIEVAL_INELIGIBLE) == elig:
            out.append(Finding('RETRIEVAL_PIN', 'error', 'sections/%s.json' % sid, 'retrievalEligible=%s disagrees with the pin in code' % elig))
        if not elig and len(c.get('retrievalReason', '')) < 30:
            out.append(Finding('RETRIEVAL_REASON', 'error', 'sections/%s.json' % sid, 'ineligible sections need a reason of at least 30 characters'))
    return out

# --------------------------------------------------------------------------------------------------------------
# Main entry points
# --------------------------------------------------------------------------------------------------------------
def schema_findings(spec, repo):
    out = []
    for e in sorted(repo.validator.iter_errors(spec), key=lambda e: list(e.absolute_path)):
        # the allOf/if/then wrappers add noise; surface the deepest message
        p = '.'.join(str(x) for x in e.absolute_path) or '(root)'
        out.append(Finding('SCHEMA', 'error', p, e.message[:200]))
    return out

def budget_findings(spec, repo):
    out = []
    for i, node in enumerate(spec.get('nodes', [])):
        c = repo.contracts.get(node.get('section'))
        if not c: continue
        for p, t, fd, v in walk_fields(c['content']['fields'], node.get('content', {}), 'nodes[%d].content' % i):
            if t == 'text' and isinstance(v, str) and len(words(v)) > fd['maxWords']:
                out.append(Finding('MAXWORDS', 'error', p, '%d words exceeds the budget of %d' % (len(words(v)), fd['maxWords'])))
            elif t == 'linklabel' and isinstance(v, str) and len(words(v)) > fd['labelMaxWords']:
                out.append(Finding('MAXWORDS', 'error', p, 'link label has %d words, budget %d' % (len(words(v)), fd['labelMaxWords'])))
            elif t == 'code' and isinstance(v, str) and len(v.strip('\n').split('\n')) > fd['maxLines']:
                out.append(Finding('MAXLINES', 'error', p, 'code has more than %d lines' % fd['maxLines']))
            if t == 'asset' and isinstance(v.get('alt'), str) and len(words(v['alt'])) > ALT_MAX_WORDS:
                out.append(Finding('MAXWORDS', 'error', p + '.alt', 'alt text exceeds %d words' % ALT_MAX_WORDS))
            if t == 'asset' and v.get('role') not in PINNED_AVAILABILITY:
                out.append(Finding('ASSET_ROLE', 'error', p, 'unknown asset role %r' % v.get('role')))
        m = node.get('motion') or {}
        if c and m.get('pattern') and m['pattern'] not in c['motion']['allowedPatterns']:
            out.append(Finding('MOTION_PATTERN', 'error', 'nodes[%d].motion.pattern' % i, 'pattern %s is not allowed for %s' % (m['pattern'], node['section'])))
    return out

def validate(spec, repo, schema=True):
    """Return a list of Finding for one PageSpec."""
    out = []
    if schema:
        out += schema_findings(spec, repo)
        if out:                       # structurally invalid: the semantic layers assume a schema-valid instance
            return out
    nodes = spec.get('nodes') if isinstance(spec.get('nodes'), list) else []
    if not all(isinstance(n, dict) and n.get('section') in repo.contracts for n in nodes):
        return out
    tpl = repo.templates.get(spec.get('template'))
    if tpl is None:
        return out + [Finding('TEMPLATE_UNKNOWN', 'error', 'template', 'unknown template %r' % spec.get('template'))]
    seq = [(n['section'], n.get('variant')) for n in nodes]
    for rule, msg in match_nodes(tpl, seq):
        out.append(Finding(rule, 'error', 'nodes', msg))
    if spec.get('mode') == 'reference':
        if not any(route_matches(r, spec.get('route', '')) for r in tpl['routes']):
            out.append(Finding('TEMPLATE_ROUTE', 'error', 'route', 'route %s is not served by template %s' % (spec.get('route'), tpl['id'])))
    for i, n in enumerate(nodes):
        c = repo.contracts[n['section']]
        if c['semantic']['category'] == RUNTIME_CATEGORY:
            out.append(Finding('RETRIEVAL_INELIGIBLE_NODE', 'error', 'nodes[%d]' % i, '%s is runtime UI and cannot be composed' % n['section']))
        m = n.get('motion') or {}
        if 'reducedMotionFallback' not in m:
            out.append(Finding('MOTION_FALLBACK', 'error', 'nodes[%d].motion' % i, 'reducedMotionFallback is required'))
    out += budget_findings(spec, repo)
    seq2 = [{'section': n['section'], 'variant': n.get('variant'), 'motion': n.get('motion')} for n in nodes]
    out += graph_findings(seq2, repo, spec.get('template'))
    out += token_findings(spec, repo)
    if spec.get('mode') == 'generated':
        out += generated_findings(spec, repo)
    return out

def self_check(repo):
    """Run the compatibility graph over every real template (all optional nodes present, first group alternative)."""
    out = {}
    for tid, t in repo.templates.items():
        seq = []; seen_groups = set()
        for n in t['nodes']:
            if n.get('group'):
                if n['group'] in seen_groups: continue
                seen_groups.add(n['group'])
            seq.append({'section': n['section'], 'variant': n.get('variant'), 'motion': None})
        out[tid] = graph_findings(seq, repo, tid)
    return out

def main(argv):
    as_json = '--json' in argv
    args = [a for a in argv if not a.startswith('--')]
    repo = Repo()
    findings = {}
    if '--self-check' in argv:
        for tid, fs in self_check(repo).items(): findings['template:' + tid] = fs
        findings['pins'] = pin_findings(repo)
    else:
        files = [Path(a) for a in args]
        if not files:
            files = [ROOT / 'schema' / 'example.pagespec.json'] + sorted((ROOT / 'schema' / 'examples').glob('*.json'))
        for f in files:
            findings[str(f.name)] = validate(jload(f), repo)
        findings['pins'] = pin_findings(repo)
    n_err = 0
    if as_json:
        print(json.dumps({k: [f._asdict() for f in v] for k, v in findings.items()}, indent=1))
    for k, fs in findings.items():
        errs = [f for f in fs if f.severity == 'error']; warns = [f for f in fs if f.severity != 'error']
        n_err += len(errs)
        if not as_json:
            print('%-52s %s' % (k, 'OK' if not errs else '%d error(s)' % len(errs)) + ('  (%d warning(s))' % len(warns) if warns else ''))
            for f in errs + warns:
                print('    [%s] %s %s: %s' % (f.severity, f.rule, f.path, f.message))
    return 1 if n_err else 0

if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
