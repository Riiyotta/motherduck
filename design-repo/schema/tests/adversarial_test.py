#!/usr/bin/env python3
"""Adversarial suite: every mutation must be rejected and every control must pass.

    python3 schema/tests/adversarial_test.py [-v]

Covers R1 (mode), R2/R5 (generated-mode leakage: brand, store marks, ratings, people, URLs, copy, CTAs, proprietary media),
R3 (asset availability pins), R8 (retrieval eligibility), R9 (wrapper gate), R10 (token policy) plus the structural,
schema and budget rules. Controls: the generated examples pass, the reference examples pass, and one PageSpec is
synthesized per template (both modes) and must pass.
"""
import sys
sys.dont_write_bytecode = True
import copy, importlib.util, json, os, sys
from pathlib import Path

HERE = Path(os.path.dirname(os.path.abspath(__file__)))
ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / 'schema')); sys.path.insert(0, str(HERE))
import semantic_validate as sv   # noqa: E402
import synth                     # noqa: E402

def load_mod(name, rel):
    spec = importlib.util.spec_from_file_location(name, str(ROOT / rel)); m = importlib.util.module_from_spec(spec); sys.modules[name] = m; spec.loader.exec_module(m); return m
va = load_mod('verify_all_mod', 'extraction/verify_all.py')
wg = load_mod('wrapper_gate_mod', 'extraction/wrapper_gate.py')

repo = sv.Repo(ROOT)
jl = lambda p: json.load(open(p))
GEN = jl(ROOT / 'schema/examples/generated-product-feature.pagespec.json')
REF = jl(ROOT / 'schema/example.pagespec.json')
HOMEGEN = jl(ROOT / 'schema/examples/generated-home.pagespec.json')
PODGEN = jl(ROOT / 'schema/examples/generated-podcast-index.pagespec.json')
D = va.load()
VERBOSE = '-v' in sys.argv

cases = []   # (group, name, spec_or_callable, expected_rule or None)
def case(group, name, fn, expect=None, base=None):
    cases.append((group, name, fn, expect, base if base is not None else GEN))

def node(spec, section):
    return next(n for n in spec['nodes'] if n['section'] == section)

def mut(group, name, fn, expect=None, base=None):
    def go():
        s = copy.deepcopy(base if base is not None else GEN); fn(s); return s
    cases.append((group, name, go, expect, None))

# ---------------------------------------------------------------------------- R1 mode
mut('R1 mode', 'missing mode', lambda s: s.pop('mode'), 'SCHEMA')
mut('R1 mode', 'mode outside the closed enum', lambda s: s.update(mode='derived'), 'SCHEMA')
mut('R1 mode', 'purpose alias instead of mode', lambda s: (s.pop('mode'), s.update(purpose='generated')), 'SCHEMA')
mut('R1 mode', 'old pageSpecVersion', lambda s: s.update(pageSpecVersion='1.0.0'), 'SCHEMA')

# ---------------------------------------------------------------------------- R2/R5 generated-mode leakage
H = lambda s: node(s, 'hero.product-centered')['content']
C = lambda s: node(s, 'cta.band')['content']
mut('R2 brand', 'source brand in a heading', lambda s: H(s).update(h1='Welcome to MotherDuck'), 'GENERATED_MODE_BRAND')
mut('R2 brand', 'brand wordmark spelled Motherduck', lambda s: H(s).update(h1='The Motherduck way'), 'GENERATED_MODE_BRAND')
mut('R2 brand', 'brand in upper case', lambda s: H(s).update(h1='WHY MOTHERDUCK'), 'GENERATED_MODE_BRAND')
mut('R2 brand', 'spaced spelling Mother Duck', lambda s: H(s).update(h1='Mother Duck for teams'), 'GENERATED_MODE_BRAND')
mut('R2 brand', 'handle motherduckdb', lambda s: H(s).update(h1='Follow motherduckdb today'), 'GENERATED_MODE_BRAND')
mut('R2 brand', 'brand in meta.brand', lambda s: s['meta'].update(brand='MotherDuck'), 'GENERATED_MODE_BRAND')
mut('R2 brand', 'brand in meta.title', lambda s: s['meta'].update(title='MotherDuck sample'), 'GENERATED_MODE_BRAND')
mut('R2 brand', 'clone stand-in brand Northwind', lambda s: s['meta'].update(brand='Northwind Data'), 'GENERATED_MODE_BRAND')
mut('R2 brand', 'product name DuckLake', lambda s: H(s).update(h1='Meet DuckLake'), 'GENERATED_MODE_BRAND')
mut('R2 brand', 'product name DuckDB', lambda s: H(s).update(lede='Powered by DuckDB under the hood'), 'GENERATED_MODE_BRAND')
mut('R2 brand', 'product name Hypertenancy', lambda s: H(s).update(h1='Hypertenancy explained'), 'GENERATED_MODE_BRAND')
mut('R2 brand', 'common-word product name Dives', lambda s: H(s).update(h1='Build Dives fast'), 'GENERATED_MODE_BRAND')
mut('R2 brand', 'common-word product name Guides', lambda s: H(s).update(h1='Rules in Guides'), 'GENERATED_MODE_BRAND')
mut('R2 brand', 'instance name PULSE', lambda s: H(s).update(lede='Choose PULSE or JUMBO'), 'GENERATED_MODE_BRAND')
mut('R2 brand', 'real customer name', lambda s: H(s).update(lede='Trusted by Dexibit and Finqore'), 'GENERATED_MODE_BRAND')
mut('R2 brand', 'brand inside a code field', lambda s: s['nodes'].insert(1, {'section': 'media.code-sample', 'variant': 'default', 'surface': 'cream', 'content': {'h2': 'Code', 'lede': 'Sample', 'code': 'select * from motherduck.main.t;'}, 'motion': {'pattern': 'none', 'reducedMotionFallback': 'static'}}), 'GENERATED_MODE_BRAND')
mut('R2 cta', 'source CTA TRY 7 DAYS FREE', lambda s: C(s)['primaryAction'].update(label='TRY 7 DAYS FREE'), 'GENERATED_MODE_CTA')
mut('R2 cta', 'source CTA BOOK A DEMO', lambda s: C(s)['primaryAction'].update(label='Book a demo'), 'GENERATED_MODE_CTA')
mut('R2 cta', 'source CTA START FREE', lambda s: C(s)['primaryAction'].update(label='Start free'), 'GENERATED_MODE_CTA')
mut('R2 cta', 'Get <Brand> form', lambda s: C(s)['primaryAction'].update(label='Get MotherDuck'), 'GENERATED_MODE_CTA')
mut('R2 cta', 'Try <Brand> form', lambda s: C(s)['primaryAction'].update(label='Try Mother Duck'), 'GENERATED_MODE_CTA')
mut('R2 cta', 'Download <Brand> form', lambda s: C(s)['primaryAction'].update(label='Download MotherDuck'), 'GENERATED_MODE_CTA')
mut('R2 cta', 'GET STARTED FOR FREE', lambda s: C(s)['primaryAction'].update(label='GET STARTED FOR FREE'), 'GENERATED_MODE_CTA')
mut('R2 url', 'source domain in a link', lambda s: C(s)['primaryAction'].update(href='https://motherduck.com/product'), 'GENERATED_MODE_URL')
mut('R2 url', 'source subdomain', lambda s: C(s)['primaryAction'].update(href='https://slack.motherduck.com/'), 'GENERATED_MODE_URL')
mut('R2 url', 'engine site link', lambda s: C(s)['primaryAction'].update(href='https://duckdb.org/'), 'GENERATED_MODE_URL')
mut('R2 url', 'social profile link', lambda s: C(s)['primaryAction'].update(href='https://twitter.com/motherduck'), 'GENERATED_MODE_URL')
mut('R2 url', 'video channel link', lambda s: C(s)['primaryAction'].update(href='https://www.youtube.com/@motherduckdb'), 'GENERATED_MODE_URL')
mut('R2 url', 'App Store link', lambda s: C(s)['primaryAction'].update(href='https://apps.apple.com/us/app/example/id1'), 'GENERATED_MODE_URL')
mut('R2 url', 'TestFlight link', lambda s: C(s)['primaryAction'].update(href='https://testflight.apple.com/join/abc'), 'GENERATED_MODE_URL')
mut('R2 url', 'Play Store link', lambda s: C(s)['primaryAction'].update(href='https://play.google.com/store/apps/details?id=x'), 'GENERATED_MODE_URL')
mut('R2 url', 'non-placeholder third-party host', lambda s: C(s)['primaryAction'].update(href='https://shop.acme-store.com/'), 'GENERATED_MODE_URL')
mut('R2 url', 'source email', lambda s: C(s)['primaryAction'].update(href='mailto:info@motherduck.com'), 'GENERATED_MODE_URL')
mut('R2 url', 'real email domain', lambda s: C(s)['primaryAction'].update(href='mailto:team@gmail.com'), 'GENERATED_MODE_URL')
mut('R2 url', 'source-specific internal path', lambda s: C(s)['primaryAction'].update(href='/product/ducklake'), 'GENERATED_MODE_URL')
mut('R2 url', 'source-specific route', lambda s: s.update(route='/product/dives'), 'GENERATED_MODE_URL')
mut('R2 url', 'bare URL in text', lambda s: H(s).update(lede='Read more at https://www.acme-docs.com/start'), 'GENERATED_MODE_URL')
mut('R2 url', 'source domain in text', lambda s: H(s).update(lede='See motherduck.com for details'), 'GENERATED_MODE_URL')
mut('R2 url', 'form endpoint URL', lambda s: C(s)['primaryAction'].update(href='https://forms.hubspot.com/submit/123'), 'GENERATED_MODE_URL')
mut('R2 copy', 'source tagline label', lambda s: H(s).update(h1='TRUSTED BY BUILDERS'), 'GENERATED_MODE_COPY')
mut('R2 copy', 'source label CHOOSE YOUR STACK', lambda s: H(s).update(lede='Please choose your stack today'), 'GENERATED_MODE_COPY')
mut('R2 copy', 'source label JOIN THE FLOCK', lambda s: H(s).update(lede='Come and join the flock now'), 'GENERATED_MODE_COPY')
mut('R2 copy', '6-word run from reference-mode copy', lambda s: H(s).update(lede='Load files, run quick queries, and share each result'), 'GENERATED_MODE_COPY')
mut('R2 copy', 'reference accordion copy reused', lambda s: H(s).update(lede='Every person, every report and every job gets its own engine'), 'GENERATED_MODE_COPY')
mut('R2 rating', 'star rating out of five', lambda s: H(s).update(lede='Rated 4.9/5 by customers'), 'GENERATED_MODE_RATING')
mut('R2 rating', 'star glyphs', lambda s: H(s).update(lede='★★★★★ from users'), 'GENERATED_MODE_RATING')
mut('R2 rating', 'x stars', lambda s: H(s).update(lede='4.8 stars on a review site'), 'GENERATED_MODE_RATING')
mut('R2 rating', 'out of 5 wording', lambda s: H(s).update(lede='4 out of 5 teams agree'), 'GENERATED_MODE_RATING')
mut('R2 person', 'real author name in text', lambda s: H(s).update(lede='Written by Alex Monahan'), 'GENERATED_MODE_PERSON')
mut('R2 person', 'real author name (second)', lambda s: H(s).update(lede='Hosted by Jordan Tigani'), 'GENERATED_MODE_PERSON')
ABOUT = synth.synth_spec(repo, 'about', 'generated', brand='Lumen Harbor', seed=2)
GATED = jl(ROOT / 'schema/examples/generated-gated-lp.pagespec.json')
mut('R2 person', 'person portrait role', lambda s: node(s, 'lp.authors')['content']['authors'][0].update(portrait={'role': 'person-portrait', 'alt': 'Portrait'}), 'GENERATED_MODE_PERSON', base=GATED)
mut('R2 person', 'team photo role', lambda s: node(s, 'media.team-photo')['content'].update(photo={'role': 'team-photo', 'alt': 'Team'}), 'GENERATED_MODE_PERSON', base=ABOUT)
mut('R2 person', 'link to a real author profile', lambda s: C(s)['primaryAction'].update(href='/authors/alex-monahan'), 'GENERATED_MODE_PERSON')
mut('R2 asset', 'customer logo role', lambda s: node(s, 'social-proof.quote-spotlight')['content'].update(logo={'role': 'customer-logo', 'alt': 'Logo', 'ref': 'placeholder:x'}), 'GENERATED_MODE_ASSET')
mut('R2 asset', 'investor logo role', lambda s: node(s, 'social-proof.investors')['content'].update(logos=[{'logo': {'role': 'investor-logo', 'alt': 'Logo'}}] * 6), 'GENERATED_MODE_ASSET', base=ABOUT)
mut('R2 asset', 'brand wordmark role in the header', lambda s: node(s, 'shell.header')['content'].update(logo={'role': 'brand-wordmark', 'alt': 'Wordmark'}), 'GENERATED_MODE_ASSET', base=HOMEGEN)
mut('R2 asset', 'third-party tool mark role', lambda s: node(s, 'feature.integrations-arc')['content'].update(tiles=[{'logo': {'role': 'partner-tool-logo', 'alt': 'Mark'}, 'tooltip': 'Tool'}] * 11), 'GENERATED_MODE_ASSET', base=HOMEGEN)
mut('R2 asset', 'compliance badge role', lambda s: node(s, 'shell.footer')['content'].update(badges=[{'img': {'role': 'compliance-badge', 'alt': 'Badge'}}] * 2), 'GENERATED_MODE_ASSET', base=HOMEGEN)
mut('R2 asset', 'reference-only role product-screenshot', lambda s: node(s, 'media.media-frame')['content'].update(media={'role': 'product-screenshot', 'alt': 'Screenshot', 'ref': 'placeholder:x'}), 'GENERATED_MODE_ASSET')
mut('R2 asset', 'reference-only role architecture-diagram', lambda s: node(s, 'media.media-frame')['content'].update(media={'role': 'architecture-diagram', 'alt': 'Diagram'}), 'GENERATED_MODE_ASSET')
mut('R2 asset', 'embedded app role', lambda s: node(s, 'media.live-embed')['content'].update(embed={'role': 'embedded-app', 'alt': 'Embed'}), 'GENERATED_MODE_ASSET')
mut('R2 asset', 'real file path as asset ref', lambda s: node(s, 'media.media-frame')['content'].update(media={'role': 'generated-diagram', 'alt': 'Diagram', 'ref': 'assets/photos/12.jpg'}), 'GENERATED_MODE_ASSET')
mut('R2 asset', 'clone mascot in generated mode', lambda s: node(s, 'faq.accordion')['content'].update(illustration={'role': 'clone-mascot-pip', 'alt': 'Mascot'}), 'GENERATED_MODE_ASSET')
mut('R2 asset', 'source mascot art role', lambda s: node(s, 'faq.accordion')['content'].update(illustration={'role': 'company-mascot-art', 'alt': 'Mascot'}), 'GENERATED_MODE_ASSET')
mut('R3 assets', 'unknown asset role invented', lambda s: node(s, 'media.media-frame')['content'].update(media={'role': 'free-for-all-image', 'alt': 'x'}), 'SCHEMA')
mut('R3 assets', 'asset as a bare string', lambda s: node(s, 'media.media-frame')['content'].update(media='image.png'), 'SCHEMA')
mut('R3 assets', 'asset missing alt', lambda s: node(s, 'media.media-frame')['content'].update(media={'role': 'generated-diagram'}), 'SCHEMA')

# ---------------------------------------------------------------------------- structure / schema
mut('structure', 'unknown template', lambda s: s.update(template='landing-x'), 'SCHEMA')
mut('structure', 'unknown section id', lambda s: s['nodes'].__setitem__(2, dict(s['nodes'][2], section='hero.invented')), 'SCHEMA')
mut('structure', 'invented node property', lambda s: s['nodes'][2].update(inventedProp=True), 'SCHEMA')
mut('structure', 'invented content field', lambda s: s['nodes'][2]['content'].update(extra='x'), 'SCHEMA')
mut('structure', 'missing required content field', lambda s: H(s).pop('h1'), 'SCHEMA')
mut('structure', 'invented top-level token override field', lambda s: s.update(tokenOverrides={'color': '#fff'}), 'SCHEMA')
mut('structure', 'variant outside the contract', lambda s: s['nodes'][1].update(variant='fancy'), 'SCHEMA')
mut('structure', 'list longer than maxItems', lambda s: node(s, 'faq.accordion')['content'].update(items=node(s, 'faq.accordion')['content']['items'] * 9), 'SCHEMA')
mut('structure', 'removed required section (cta.band)', lambda s: s['nodes'].remove(node(s, 'cta.band')), 'TEMPLATE_NODES')
mut('structure', 'removed required section (sticky stack)', lambda s: s['nodes'].remove(node(s, 'feature.sticky-stack')), 'TEMPLATE_NODES')
mut('structure', 'removed header shell', lambda s: s['nodes'].remove(node(s, 'shell.header')), 'TEMPLATE_NODES')
mut('structure', 'duplicate one-per-page section', lambda s: s['nodes'].insert(2, copy.deepcopy(s['nodes'][1])), 'TEMPLATE_NODES')
def synth_node(section, mode='generated'):
    import random
    c = repo.contracts[section]
    return {'section': section, 'variant': c['variants'][0], 'surface': c['allowedSurfaces'][0], 'content': synth.obj(c['content']['fields'], mode, random.Random(5), section, repo, synth.GEN_WORDS),
            'motion': {'pattern': c['motion']['default'], 'reducedMotionFallback': c['motion']['reducedMotionFallback']}}
mut('structure', 'second hero from the opener group', lambda s: s['nodes'].insert(2, synth_node('hero.split-product')), 'TEMPLATE_NODES')
mut('structure', 'two heroes from different groups (ONE_HERO)', lambda s: s['nodes'].insert(2, synth_node('hero.lp-cover')), 'ONE_HERO')
mut('structure', 'section repeated that is not repeatable', lambda s: s['nodes'].insert(3, synth_node('faq.accordion')), 'TEMPLATE_NODES')
mut('structure', 'reordered shell (hero before header)', lambda s: s['nodes'].insert(0, s['nodes'].pop(1)), 'TEMPLATE_NODES')
mut('structure', 'footer moved before cta', lambda s: s['nodes'].insert(len(s['nodes']) - 2, s['nodes'].pop()), 'TEMPLATE_NODES')
mut('structure', 'nodes of another template', lambda s: s.update(template='pricing'), 'TEMPLATE_NODES')
mut('structure', 'template/nodes mismatch (home nodes under blog-index)', lambda s: s.update(template='blog-index'), 'TEMPLATE_NODES', base=HOMEGEN)
mut('structure', 'variant fixed by the template', lambda s: s['nodes'][3].update(variant='platform'), 'TEMPLATE_NODES', base=HOMEGEN)
mut('structure', 'section not allowed by the template', lambda s: s['nodes'].insert(5, dict(copy.deepcopy(s['nodes'][4]), section='feature.dark-features', variant='default', surface='ink', content={'h2': 'x', 'items': [{'title': 'a', 'body': 'b', 'icon': {'role': 'generic-ui-glyph', 'alt': 'x'}}] * 3}, motion={'pattern': 'feature-rise', 'reducedMotionFallback': 'static'})), 'TEMPLATE_NODES')
mut('structure', 'runtime UI as a node', lambda s: s['nodes'].insert(3, {'section': 'runtime.back-to-top', 'variant': 'default', 'content': {}, 'motion': {'pattern': 'none', 'reducedMotionFallback': 'static'}}), 'SCHEMA')
mut('structure', 'reference route not served by the template', lambda s: s.update(route='/pricing-page'), 'TEMPLATE_ROUTE', base=REF)
mut('structure', 'reference route of another template', lambda s: s.update(route='/product/pricing'), 'TEMPLATE_ROUTE', base=REF)
mut('budget', 'maxWords overflow on a heading', lambda s: H(s).update(h1=' '.join(['word'] * 40)), 'MAXWORDS')
mut('budget', 'maxWords overflow on a link label', lambda s: C(s)['primaryAction'].update(label='one two three four five six seven eight'), 'MAXWORDS')
mut('budget', 'maxWords overflow on a list item', lambda s: node(s, 'faq.accordion')['content']['items'][0].update(answer=' '.join(['word'] * 130)), 'MAXWORDS')
mut('budget', 'alt text too long', lambda s: node(s, 'media.media-frame')['content']['media'].update(alt=' '.join(['word'] * 20)), 'MAXWORDS')
mut('budget', 'code longer than maxLines', lambda s: s['nodes'].insert(1, {'section': 'media.code-sample', 'variant': 'default', 'surface': 'cream', 'content': {'h2': 'Code', 'lede': 'Sample', 'code': '\n'.join('select %d;' % i for i in range(30))}, 'motion': {'pattern': 'none', 'reducedMotionFallback': 'static'}}), 'MAXLINES')
mut('motion', 'missing motion object', lambda s: s['nodes'][2].pop('motion'), 'SCHEMA')
mut('motion', 'missing reducedMotionFallback', lambda s: s['nodes'][2]['motion'].pop('reducedMotionFallback'), 'SCHEMA')
mut('motion', 'invented motion field', lambda s: s['nodes'][2]['motion'].update(inventedAnimation='spin'), 'SCHEMA')
mut('motion', 'invented motion pattern', lambda s: s['nodes'][2]['motion'].update(pattern='confetti'), 'SCHEMA')
mut('motion', 'real pattern not allowed for the section', lambda s: s['nodes'][2]['motion'].update(pattern='wire-flow'), 'SCHEMA')
mut('motion', 'reduced-motion fallback outside the enum', lambda s: s['nodes'][2]['motion'].update(reducedMotionFallback='ignore'), 'SCHEMA')

# ---------------------------------------------------------------------------- R8 retrieval eligibility
mut('R8 retrieval', 'node flips retrievalEligible to true', lambda s: s['nodes'][2].update(retrievalEligible=True), 'SCHEMA')
mut('R8 retrieval', 'node carries retrievalReason', lambda s: s['nodes'][2].update(retrievalReason='x' * 40), 'SCHEMA')

# ---------------------------------------------------------------------------- R10 tokens
mut('R10 tokens', 'unknown surface token', lambda s: s['nodes'][2].update(surface='neon'), 'SCHEMA')
mut('R10 tokens', 'raw hex surface', lambda s: s['nodes'][2].update(surface='#FF9538'), 'SCHEMA')
mut('R10 tokens', 'surface not allowed for the section', lambda s: s['nodes'][2].update(surface='ink'), 'SCHEMA')
mut('R10 tokens', 'raw hex colour in text', lambda s: H(s).update(lede='Use #FF9538 for the accent'), 'TOKEN_RAW_COLOR')
mut('R10 tokens', 'raw short hex colour in text', lambda s: H(s).update(lede='Paint it #f93 please'), 'TOKEN_RAW_COLOR')
mut('R10 tokens', 'rgb() colour in text', lambda s: H(s).update(lede='Colour rgb(255, 149, 56) here'), 'TOKEN_RAW_COLOR')
mut('R10 tokens', 'hsl() colour in text', lambda s: H(s).update(lede='Colour hsl(30, 100%, 61%) here'), 'TOKEN_RAW_COLOR')
mut('R10 tokens', 'arbitrary spacing in text', lambda s: H(s).update(lede='Add 17px of space'), 'TOKEN_RAW_SPACING')
mut('R10 tokens', 'arbitrary rem spacing', lambda s: H(s).update(lede='Margin 3.5rem around'), 'TOKEN_RAW_SPACING')
mut('R10 tokens', 'font-family declaration', lambda s: H(s).update(lede='font-family: Comic Sans MS'), 'TOKEN_RAW_FONT')
mut('R10 tokens', 'licensed typeface', lambda s: H(s).update(lede='Set in Aeonik Fono please'), 'TOKEN_RAW_FONT')
mut('R10 tokens', 'unknown theme', lambda s: s.update(theme='sepia'), 'SCHEMA')
mut('R10 tokens', 'dark theme on a non-podcast template', lambda s: s.update(theme='dark'), 'TOKEN_THEME_BINDING')
mut('R10 tokens', 'dark theme with a light surface', lambda s: node(s, 'listing.latest-episode').update(surface='sky'), 'SCHEMA', base=PODGEN)
mut('R10 tokens', 'dark podcast page with light theme', lambda s: s.update(theme='light'), 'TOKEN_THEME_COMBINATION', base=PODGEN)
mut('R10 tokens', 'dark header variant on a light page', lambda s: node(s, 'shell.header').update(variant='dark'), 'TOKEN_THEME_COMBINATION')

# ---------------------------------------------------------------------------- run
def rules_of(spec):
    return sv.validate(spec, repo)

fails = []; n_mut = 0
print('== mutations (each must be rejected with the expected rule) ==')
groups = {}
for group, name, fn, expect, base in cases:
    spec = fn() if callable(fn) else fn
    fs = rules_of(spec); errs = [f for f in fs if f.severity == 'error']
    n_mut += 1
    rej = bool(errs); hit = expect is None or any(f.rule == expect for f in errs)
    groups.setdefault(group, [0, 0]); groups[group][0] += 1
    if rej and hit: groups[group][1] += 1
    else: fails.append('%s / %s: %s' % (group, name, 'accepted' if not rej else 'rejected but not by %s (got %s)' % (expect, sorted({f.rule for f in errs}))))
    if VERBOSE: print('  %-14s %-52s -> %s' % (group, name, 'REJECTED ' + ','.join(sorted({f.rule for f in errs})) if rej else 'ACCEPTED'))

# ---------------------------------------------------------------------------- in-memory registry / contract / allowlist / catalog mutations
def run_mem(group, name, fn_check):
    global n_mut
    n_mut += 1; groups.setdefault(group, [0, 0]); groups[group][0] += 1
    ok = fn_check()
    if ok: groups[group][1] += 1
    else: fails.append('%s / %s: accepted' % (group, name))
    if VERBOSE: print('  %-14s %-52s -> %s' % (group, name, 'REJECTED' if ok else 'ACCEPTED'))

def mem_repo():
    r = sv.Repo(ROOT); return r

def m_loosen_registry():
    r = mem_repo(); r.roles['customer-logo']['availability'] = 'generation-safe'
    return any(f.rule == 'PINNED_AVAILABILITY' for f in sv.pin_findings(r))
def m_loosen_policy():
    r = mem_repo(); r.roles['company-mascot-art']['generationPolicy'] = 'may-generate-new'
    return any(f.rule == 'PINNED_POLICY' for f in sv.pin_findings(r))
def m_unpinned_role():
    r = mem_repo(); r.roles['brand-new-role'] = {'id': 'brand-new-role', 'availability': 'generation-safe', 'generationPolicy': 'may-generate-new'}
    return any(f.rule == 'PINNED_AVAILABILITY' for f in sv.pin_findings(r))
def m_verify_registry_loosen():
    roles = copy.deepcopy(D['roles']); [r for r in roles['roles'] if r['id'] == 'person-portrait'][0]['availability'] = 'reference-only'
    return _check_assets_fails(roles)
def _check_assets_fails(roles):
    before = len(va.results); va.check_assets(D, roles); new = va.results[before:]; del va.results[before:]
    return any(s == 'FAIL' for s, _, _ in new)
def m_verify_blocked_to_generated():
    roles = copy.deepcopy(D['roles']); [r for r in roles['roles'] if r['id'] == 'investor-logo'][0]['generationPolicy'] = 'must-reuse-exact'
    return _check_assets_fails(roles)
def m_contract_flip_runtime():
    r = mem_repo(); r.contracts['runtime.back-to-top']['retrievalEligible'] = True
    return any(f.rule == 'RETRIEVAL_PIN' for f in sv.pin_findings(r))
def m_contract_flip_content():
    r = mem_repo(); r.contracts['hero.home']['retrievalEligible'] = False; r.contracts['hero.home']['retrievalReason'] = 'x' * 40
    return any(f.rule == 'RETRIEVAL_PIN' for f in sv.pin_findings(r))
def m_contract_reason_short():
    r = mem_repo(); r.contracts['runtime.back-to-top']['retrievalReason'] = 'too short'
    return any(f.rule == 'RETRIEVAL_REASON' for f in sv.pin_findings(r))
def m_allowlist_flip():
    a = copy.deepcopy(D['allow']); [e for e in a['entries'] if e['id'] == 'runtime.back-to-top'][0]['retrievalEligible'] = True
    return bool(va.check_allowlist(D, a))
def m_both_flip():
    a = copy.deepcopy(D['allow']); [e for e in a['entries'] if e['id'] == 'runtime.back-to-top'][0]['retrievalEligible'] = True
    secs = copy.deepcopy(D['sections']); secs['runtime.back-to-top']['retrievalEligible'] = True
    d2 = dict(D); d2['sections'] = secs
    before = len(va.results); va.check_retrieval(d2); new = va.results[before:]; del va.results[before:]
    return any(s == 'FAIL' for s, _, _ in new)
def m_phantom_allowlist():
    a = copy.deepcopy(D['allow']); a['entries'].append({'id': 'hero.phantom', 'kind': 'section', 'file': 'sections/hero.phantom.json', 'retrievalEligible': True, 'settable': [], 'contentFields': [], 'variants': []})
    return any('phantom' in b for b in va.check_allowlist(D, a))
def m_runtime_looking_unpinned():
    secs = copy.deepcopy(D['sections']); c = copy.deepcopy(secs['runtime.gated-video-modal']); c['id'] = 'runtime.cookie-banner'; c['title'] = 'Cookie banner'; c['retrievalEligible'] = True
    secs['runtime.cookie-banner'] = c; d2 = dict(D); d2['sections'] = secs
    before = len(va.results); va.check_retrieval(d2); new = va.results[before:]; del va.results[before:]
    return any(s == 'FAIL' for s, _, _ in new)
def m_catalog_unknown():
    cat = copy.deepcopy(D['cat']); cat['categories']['spacing'].append('spacing.17'); return bool(va.check_tokens(D, cat, D['pol']))
def m_catalog_missing():
    cat = copy.deepcopy(D['cat']); cat['categories']['color'].remove('text.primary'); return bool(va.check_tokens(D, cat, D['pol']))
def m_policy_bad_category():
    pol = copy.deepcopy(D['pol']); pol['rawValueRestrictions']['typography'] = {'rule': 'x'}; return bool(va.check_tokens(D, D['cat'], pol))
def m_policy_claims_override():
    pol = copy.deepcopy(D['pol']); pol['overrides']['pageSpecTokenOverrideField'] = 'tokenOverrides'; return bool(va.check_tokens(D, D['cat'], pol))
def m_validator_graph_unimplemented():
    r = mem_repo(); r.graph = copy.deepcopy(r.graph); r.graph['rules'].append({'id': 'MADE_UP_RULE', 'severity': 'error', 'description': 'x', 'params': {}, 'exceptions': []})
    return any(f.rule == 'GRAPH_RULE_UNIMPLEMENTED' for f in sv.graph_findings([{'section': 'shell.header', 'variant': None, 'motion': None}], r, 'home'))
run_mem('R3 pins', 'registry loosens customer-logo to generation-safe', m_loosen_registry)
run_mem('R3 pins', 'registry loosens a generation policy', m_loosen_policy)
run_mem('R3 pins', 'registry role without a pin', m_unpinned_role)
run_mem('R3 pins', 'verify_all: person-portrait loosened', m_verify_registry_loosen)
run_mem('R3 pins', 'verify_all: investor-logo set to must-reuse-exact', m_verify_blocked_to_generated)
run_mem('R8 retrieval', 'contract flips runtime UI to eligible', m_contract_flip_runtime)
run_mem('R8 retrieval', 'contract marks a content section ineligible', m_contract_flip_content)
run_mem('R8 retrieval', 'ineligible without a 30+ char reason', m_contract_reason_short)
run_mem('R8 retrieval', 'allowlist flips runtime UI to eligible', m_allowlist_flip)
run_mem('R8 retrieval', 'contract and allowlist flipped together', m_both_flip)
run_mem('R8 retrieval', 'runtime-looking section left eligible and unpinned', m_runtime_looking_unpinned)
run_mem('allowlist', 'phantom allowlist entry', m_phantom_allowlist)
run_mem('R10 tokens', 'catalog lists a token the files lack', m_catalog_unknown)
run_mem('R10 tokens', 'catalog drops a real token', m_catalog_missing)
run_mem('R10 tokens', 'policy category that is not a catalog key', m_policy_bad_category)
run_mem('R10 tokens', 'policy claims a PageSpec override field', m_policy_claims_override)
run_mem('graph', 'graph rule without an implementation', m_validator_graph_unimplemented)

# ---------------------------------------------------------------------------- R9 wrapper gate
MV = D['mv']
def gate(mod, expect_code=None, expect_sev='error'):
    mv = copy.deepcopy(MV); mod(mv)
    F, rep = wg.run(ROOT, measured=mv)
    return F
def band(mv, tid, idx): return mv['sectionHeights']['templates'][tid]['bands'][idx]
def g_expect(group, name, mod, code, sev='error'):
    global n_mut
    n_mut += 1; groups.setdefault(group, [0, 0]); groups[group][0] += 1
    F = gate(mod); hit = any(f[1] == code and f[0] == sev for f in F)
    if hit: groups[group][1] += 1
    else: fails.append('%s / %s: expected %s %s, got %s' % (group, name, sev, code, sorted({(f[0], f[1]) for f in F})))
    if VERBOSE: print('  %-14s %-52s -> %s' % (group, name, 'REJECTED ' + code if hit else 'MISSED'))
def set_h(tid, idx, h, share_doc=False):
    def m(mv):
        b = band(mv, tid, idx); b['heightPx'] = h
        if share_doc: pass
    return m
g_expect('R9 gate', 'HERO 1900px warns', set_h('gated-lp', 0, 1900), 'HERO_TALL', 'warn')
g_expect('R9 gate', 'HERO 3100px is an error', set_h('gated-lp', 0, 3100), 'HERO_TOO_TALL')
g_expect('R9 gate', 'HERO 3100px on a second template', set_h('blog-index', 0, 3100), 'HERO_TOO_TALL')
def share(mv, tid='gated-lp', idx=1, frac=0.7):
    t = mv['sectionHeights']['templates'][tid]; t['bands'][idx]['heightPx'] = round(t['documentHeight'] * frac)
g_expect('R9 gate', 'single section holds 70% of its page', lambda mv: share(mv), 'SECTION_SHARE')
g_expect('R9 gate', 'single section holds 55% (warning)', lambda mv: share(mv, frac=0.55), 'SECTION_SHARE_HIGH', 'warn')
g_expect('R9 gate', 'majority share on another template', lambda mv: share(mv, 'author', 1, 0.7), 'SECTION_SHARE')
def drop_tpl(mv): del mv['sectionHeights']['templates']['home']
g_expect('R9 gate', 'missing measurement for a template', drop_tpl, 'MISSING_MEASUREMENT')
def wrong_vp(mv): mv['sectionHeights']['templates']['home']['viewport'] = 1280
g_expect('R9 gate', 'template measured at the wrong viewport', wrong_vp, 'WRONG_VIEWPORT')
def wrong_vp_top(mv): mv['sectionHeights']['viewport'] = 1280
g_expect('R9 gate', 'whole table at the wrong viewport', wrong_vp_top, 'WRONG_VIEWPORT')
def wl(mv, **kw):
    share(mv); b = band(mv, 'gated-lp', 1)
    e = {'template': 'gated-lp', 'band': 1, 'kind': 'share', 'maxHeightPx': b['heightPx'] + 500, 'justification': 'A justification that is comfortably longer than thirty characters.', 'reviewedBy': 'agent attestation, not a human sign-off'}
    e.update(kw); mv['wrapperGate']['whitelist'] = [e]
g_expect('R9 gate', 'whitelist without justification', lambda mv: wl(mv, justification='ok'), 'WHITELIST_JUSTIFICATION')
g_expect('R9 gate', 'whitelist without reviewer', lambda mv: wl(mv, reviewedBy=''), 'WHITELIST_REVIEWER')
g_expect('R9 gate', 'agent reviewer not disclosed as an agent', lambda mv: wl(mv, reviewedBy='agent'), 'WHITELIST_REVIEWER')
g_expect('R9 gate', 'whitelist cap below the measured height', lambda mv: wl(mv, maxHeightPx=10), 'WHITELIST_CAP')
def wl_stale(mv):
    mv['wrapperGate']['whitelist'] = [{'template': 'gated-lp', 'band': 1, 'kind': 'share', 'maxHeightPx': 9999, 'justification': 'A justification that is comfortably longer than thirty characters.', 'reviewedBy': 'agent attestation, not a human sign-off'}]
g_expect('R9 gate', 'stale whitelist entry (no breach)', wl_stale, 'WHITELIST_STALE')
def wl_missing_band(mv):
    mv['wrapperGate']['whitelist'] = [{'template': 'gated-lp', 'band': 99, 'kind': 'share', 'maxHeightPx': 9999, 'justification': 'A justification that is comfortably longer than thirty characters.', 'reviewedBy': 'agent attestation, not a human sign-off'}]
g_expect('R9 gate', 'whitelist entry for a band that does not exist', wl_missing_band, 'WHITELIST_STALE')
def band_map(mv): band(mv, 'home', 0)['sections'] = ['hero.home', 'feature.dark-features']
g_expect('R9 gate', 'band mapped to a section the template lacks', band_map, 'BAND_MAPPING')
def band_unmapped(mv): band(mv, 'about', 1)['sections'] = []
g_expect('R9 gate', 'required section missing from every band', band_unmapped, 'BAND_MAPPING')

# ---------------------------------------------------------------------------- controls
ctl_total = 0; ctl_fail = []
def control(name, spec, expect_warn=False):
    global ctl_total
    ctl_total += 1
    errs = [f for f in sv.validate(spec, repo) if f.severity == 'error']
    if errs: ctl_fail.append('%s: %s' % (name, [(f.rule, f.message[:60]) for f in errs[:3]]))
for p in sorted((ROOT / 'schema/examples').glob('*.json')):
    control('example %s' % p.name, jl(p))
control('example.pagespec.json', REF)
# positive controls for the leakage rules: look-alikes that must NOT be rejected
def okmut(name, fn, base=None):
    s = copy.deepcopy(base or GEN); fn(s); control(name, s)
okmut('placeholder .example URL accepted', lambda s: C(s)['primaryAction'].update(href='https://studio.example/start'))
okmut('example.org URL accepted', lambda s: C(s)['primaryAction'].update(href='https://www.example.org/start'))
okmut('anchor link accepted', lambda s: C(s)['primaryAction'].update(href='#plans'))
okmut('placeholder mailto accepted', lambda s: C(s)['primaryAction'].update(href='mailto:hello@studio.example'))
okmut('rating with the sample marker accepted', lambda s: H(s).update(lede='4.8 / 5 (sample rating)'))
okmut('generic word guides in lower case accepted', lambda s: H(s).update(lede='Short guides for calm planning'))
okmut('generic slug path accepted', lambda s: C(s)['primaryAction'].update(href='/blog/a-new-post'))
okmut('home route slash accepted', lambda s: s.update(route='/'))
for tid in sorted(repo.templates):
    for mode in ('generated', 'reference'):
        control('synthesized %s %s' % (tid, mode), synth.synth_spec(repo, tid, mode))
# the real repo must also be clean for the pins, the graph and the gate
ctl_total += 1
if sv.pin_findings(repo): ctl_fail.append('pin_findings on the real repo: %s' % [f.message for f in sv.pin_findings(repo)[:2]])
ctl_total += 1
bad_graph = [(t, f.rule) for t, fs in sv.self_check(repo).items() for f in fs]
if bad_graph: ctl_fail.append('graph self-check on the real templates: %s' % bad_graph[:3])
ctl_total += 1
F, rep = wg.run(ROOT)
if any(f[0] == 'error' for f in F): ctl_fail.append('wrapper gate on the real measured values: %s' % [f for f in F if f[0] == 'error'][:2])

print()
for g in sorted(groups): print('  %-14s %3d / %3d mutations rejected' % (g, groups[g][1], groups[g][0]))
print('\nmutations: %d total, %d rejected, %d not rejected' % (n_mut, n_mut - len(fails), len(fails)))
for f in fails: print('  NOT REJECTED:', f)
print('controls: %d total, %d failed (generated example, reference examples, positive look-alikes, %d synthesized template specs, pins, graph, gate)' % (ctl_total, len(ctl_fail), 2 * len(repo.templates)))
for f in ctl_fail: print('  CONTROL FAILED:', f)
sys.exit(1 if fails or ctl_fail else 0)
