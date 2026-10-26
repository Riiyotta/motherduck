#!/usr/bin/env python3
"""Proves that every drift check actually fails on bad input (MASTER-GUIDE 3.4, 3.16, 3.23).

    python3 extraction/prove_drift.py [-v]

For each case a scratch copy of this package is created in the OS temp directory, one defect is injected, and
extraction/verify_all.py is run inside the copy. The case passes only when verify_all exits non-zero AND reports the expected check as FAIL.
A clean scratch copy must pass first, and the real package is run last and must still pass. Cases that need the sibling source tree
(an in-range but wrong citation) copy the sibling evidence files via symlinks when they exist and are reported SKIPPED otherwise.
"""
import sys
sys.dont_write_bytecode = True
import json, os, re, shutil, subprocess, sys, tempfile
from pathlib import Path

ROOT = Path(os.path.dirname(os.path.abspath(__file__))).parent
PROJECT = ROOT.parent
VERBOSE = '-v' in sys.argv
SRC_AVAILABLE = (PROJECT / 'CLONE_SPEC.md').exists() and (PROJECT / 'src').exists()
SIBLINGS = ['CLONE_SPEC.md', 'PAGES_SPEC_MARKETING.md', 'PAGES_SPEC_COMPANY.md', 'PAGES_SPEC_CONTENT.md', 'PAGES_SPEC_EXTRA.md', 'IMAGE_BRIEFS.md', 'ASSET_MANIFEST.md', 'MISSING_ROUTES.txt', 'src', 'tailwind.config.js', 'tokens']

def jl(p): return json.load(open(p))
def jd(p, o):
    with open(p, 'w') as f: json.dump(o, f, indent=2); f.write('\n')

def make_copy(base, with_source=False):
    proj = Path(tempfile.mkdtemp(prefix='drift-', dir=base))
    dst = proj / 'design-repo'
    shutil.copytree(ROOT, dst, ignore=shutil.ignore_patterns('__pycache__', '.DS_Store', '__MACOSX'))
    if with_source:
        for s in SIBLINGS:
            if (PROJECT / s).exists(): os.symlink(PROJECT / s, proj / s)
    return dst

def run_verify(dst, quick=True):
    args = [sys.executable, str(dst / 'extraction/verify_all.py')] + (['--quick'] if quick else [])
    env = dict(os.environ, PYTHONDONTWRITEBYTECODE='1')
    p = subprocess.run(args, capture_output=True, text=True, env=env, cwd=str(dst))
    return p.returncode, p.stdout

def edit_json(dst, rel, fn):
    p = dst / rel; o = jl(p); fn(o); jd(p, o)

def edit_text(dst, rel, fn):
    p = dst / rel; t = p.read_text(); n = fn(t); assert n != t, 'mutation did not change %s' % rel; p.write_text(n)

CASES = []
def case(name, expect_check, fn, needs_source=False, quick=True):
    CASES.append((name, expect_check, fn, needs_source, quick))

# ---- allowlist parity / orphans
case('phantom allowlist entry (no contract file)', 'allowlist-parity', lambda d: edit_json(d, 'tokens/llm/component-allowlist.json', lambda o: o['entries'].append({'id': 'hero.phantom', 'kind': 'section', 'file': 'sections/hero.phantom.json', 'retrievalEligible': True, 'settable': [], 'contentFields': [], 'variants': []})))
case('orphan contract (no allowlist entry)', 'allowlist-parity', lambda d: shutil.copy(d / 'sections/hero.title-band.json', d / 'sections/hero.orphan.json'))
case('allowlist drops a real entry', 'allowlist-parity', lambda d: edit_json(d, 'tokens/llm/component-allowlist.json', lambda o: o.update(entries=[e for e in o['entries'] if e['id'] != 'hero.home'])))
case('allowlist node properties drift from the schema', 'allowlist-parity', lambda d: edit_json(d, 'tokens/llm/component-allowlist.json', lambda o: o['nodeSettableProperties'].append('inventedProp')))
# ---- citations
def oor(o): o['source']['lines'] = '99990-99999'
case('out-of-range source citation', 'citations', lambda d: edit_json(d, 'sections/hero.home.json', oor))
def oor_spec(o): o['evidence']['specRefs'][0]['lines'] = '90000-90010'
case('out-of-range spec citation', 'citations', lambda d: edit_json(d, 'sections/hero.home.json', oor_spec))
def oor_mv(o): o['citations'][0]['lines'] = '99999'
case('out-of-range ledger citation', 'citations', lambda d: edit_json(d, 'extraction/measured-values.json', oor_mv))
def wrong_lines(o): o['source']['lines'] = '1-3'
case('in-range but wrong citation (tag not at the cited lines)', 'citations', lambda d: edit_json(d, 'sections/social-proof.customer-case-grid.json', wrong_lines), needs_source=True)
def wrong_quote(o): o['citations'][1]['lines'] = '3'
case('in-range but wrong quote citation', 'citations', lambda d: edit_json(d, 'extraction/measured-values.json', wrong_quote), needs_source=True)
# ---- counts / versions
case('wrong manifest count (sections)', 'manifest-counts', lambda d: edit_json(d, 'registry.manifest.json', lambda o: o['counts'].update(sections=o['counts']['sections'] + 1)))
case('wrong manifest count (templates)', 'manifest-counts', lambda d: edit_json(d, 'registry.manifest.json', lambda o: o['counts'].update(templates=o['counts']['templates'] - 1)))
case('wrong manifest count (token total)', 'manifest-counts', lambda d: edit_json(d, 'registry.manifest.json', lambda o: o['counts']['tokens'].update(total=1)))
case('allowlistVersion drift', 'versions', lambda d: edit_json(d, 'tokens/llm/component-allowlist.json', lambda o: o.update(allowlistVersion='9.9.9')))
case('pageSpecVersion drift in an example', 'versions', lambda d: edit_json(d, 'schema/examples/generated-home.pagespec.json', lambda o: o.update(pageSpecVersion='1.0.0')), quick=False)
case('entry point escapes the package', 'entry-points', lambda d: edit_json(d, 'registry.manifest.json', lambda o: o['entryPoints']['documentation'].append('../CLONE_SPEC.md')))
# ---- asset registry / pins
case('registry loosens customer-logo availability', 'asset-roles', lambda d: edit_json(d, 'assets/asset-roles.json', lambda o: [r.update(availability='generation-safe') for r in o['roles'] if r['id'] == 'customer-logo']))
case('registry loosens a generation policy', 'asset-roles', lambda d: edit_json(d, 'assets/asset-roles.json', lambda o: [r.update(generationPolicy='may-generate-new') for r in o['roles'] if r['id'] == 'company-mascot-art']))
def drop_pin(t): return re.sub(r"    'customer-logo': '[a-z-]+',\n", '', t, count=1)
case('pin removed from verify_all.py', 'pin-parity', lambda d: edit_text(d, 'extraction/verify_all.py', drop_pin))
case('pin removed from semantic_validate.py', 'pin-parity', lambda d: edit_text(d, 'schema/semantic_validate.py', drop_pin))
def drop_pin_both(d): edit_text(d, 'extraction/verify_all.py', drop_pin); edit_text(d, 'schema/semantic_validate.py', drop_pin)
case('pin removed from both scripts', 'asset-roles', drop_pin_both)
def loosen_pin_both(d):
    for rel in ('extraction/verify_all.py', 'schema/semantic_validate.py'):
        edit_text(d, rel, lambda t: t.replace("'investor-logo': 'blocked-for-generation'", "'investor-logo': 'reference-only'", 1))
case('pin loosened in both scripts and still blocked in the registry', 'asset-roles', loosen_pin_both)
case('generatedAssetRoles lists a blocked role', 'asset-roles', lambda d: edit_json(d, 'sections/hero.home.json', lambda o: o['generatedAssetRoles'].append('customer-logo')))
case('section media field names an unknown role', 'asset-roles', lambda d: edit_json(d, 'sections/hero.home.json', lambda o: o['content']['fields']['media'].update(roles=['made-up-role'])))
# ---- retrieval eligibility
case('contract flips runtime UI to eligible', 'retrieval-eligibility', lambda d: edit_json(d, 'sections/runtime.back-to-top.json', lambda o: o.update(retrievalEligible=True)))
case('contract marks a content section ineligible', 'retrieval-eligibility', lambda d: edit_json(d, 'sections/hero.home.json', lambda o: o.update(retrievalEligible=False, retrievalReason='x' * 40)))
case('allowlist flips runtime UI to eligible', 'allowlist-parity', lambda d: edit_json(d, 'tokens/llm/component-allowlist.json', lambda o: [e.update(retrievalEligible=True) for e in o['entries'] if e['id'] == 'runtime.back-to-top']))
def flip_both(d):
    edit_json(d, 'sections/runtime.back-to-top.json', lambda o: o.update(retrievalEligible=True))
    edit_json(d, 'tokens/llm/component-allowlist.json', lambda o: [e.update(retrievalEligible=True) for e in o['entries'] if e['id'] == 'runtime.back-to-top'])
case('contract and allowlist flipped together', 'retrieval-eligibility', flip_both)
case('ineligible reason shortened', 'retrieval-eligibility', lambda d: edit_json(d, 'sections/runtime.back-to-top.json', lambda o: o.update(retrievalReason='too short')))
# ---- templates / routes
case('route mapped twice', 'routes', lambda d: edit_json(d, 'templates/routes.json', lambda o: o['routes'].append(dict(o['routes'][0]))))
case('route admission drift', 'routes', lambda d: edit_json(d, 'templates/routes.json', lambda o: [r.update(retrievalEligible=False) for r in o['routes'] if r['pattern'] == '/pricing' or r['pattern'] == '/product/pricing']))
case('route removed from its template', 'routes', lambda d: edit_json(d, 'templates/templates.json', lambda o: [t.update(routes=t['routes'][:-1]) for t in o['templates'] if t['id'] == 'legal-toc']))
case('template drops a node a real member composition needs', 'templates', lambda d: edit_json(d, 'templates/templates.json', lambda o: [t.update(nodes=[n for n in t['nodes'] if n['section'] != 'feature.sticky-stack']) for t in o['templates'] if t['id'] == 'product-feature']))
case('template node dropped (usedInTemplates goes stale)', 'templates', lambda d: edit_json(d, 'templates/templates.json', lambda o: [t.update(nodes=[n for n in t['nodes'] if n['section'] != 'cta.band']) for t in o['templates'] if t['id'] == 'product-ducklake']))
# ---- tokens / graph
case('token removed from the files but not the catalog', 'tokens', lambda d: edit_json(d, 'tokens/00-foundation/spacing.json', lambda o: o['tokens'].pop('spacing.24')))
case('catalog lists a token the files lack', 'tokens', lambda d: edit_json(d, 'tokens/llm/token-catalog.json', lambda o: o['categories']['spacing'].append('spacing.17')))
case('policy category that is not a catalog key', 'tokens', lambda d: edit_json(d, 'tokens/llm/token-policy.json', lambda o: o['rawValueRestrictions'].update(typography={'rule': 'x'})))
case('semantic token points at a missing foundation colour', 'tokens', lambda d: edit_json(d, 'tokens/10-semantic/color.json', lambda o: o['tokens']['text.primary'].update(ref='color.nope')))
case('graph rule removed (validator still implements it)', 'compatibility-graph', lambda d: edit_json(d, 'compatibility/graph.json', lambda o: o.update(rules=[r for r in o['rules'] if r['id'] != 'ONE_HERO'])))
case('graph exception removed (a real template now violates the rule)', 'compatibility-graph', lambda d: edit_json(d, 'compatibility/graph.json', lambda o: [r.update(exceptions=[]) for r in o['rules'] if r['id'] == 'NO_ADJACENT_SAME_CATEGORY']))
case('template loses its header shell', 'compatibility-graph', lambda d: edit_json(d, 'templates/templates.json', lambda o: [t.update(nodes=[n for n in t['nodes'] if n['section'] != 'shell.header']) for t in o['templates'] if t['id'] == 'about']))
# ---- wrapper gate
case('missing measurement for a template', 'wrapper-gate', lambda d: edit_json(d, 'extraction/measured-values.json', lambda o: o['sectionHeights']['templates'].pop('home')))
case('measured at the wrong viewport', 'wrapper-gate', lambda d: edit_json(d, 'extraction/measured-values.json', lambda o: o['sectionHeights']['templates']['home'].update(viewport=1280)))
case('HERO taller than 3000px', 'wrapper-gate', lambda d: edit_json(d, 'extraction/measured-values.json', lambda o: o['sectionHeights']['templates']['gated-lp']['bands'][0].update(heightPx=3100)))
def big_share(o):
    t = o['sectionHeights']['templates']['gated-lp']; t['bands'][1]['heightPx'] = round(t['documentHeight'] * 0.7)
case('one section holds 70% of its page', 'wrapper-gate', lambda d: edit_json(d, 'extraction/measured-values.json', big_share))
case('band mapped to a section the template lacks', 'wrapper-gate', lambda d: edit_json(d, 'extraction/measured-values.json', lambda o: o['sectionHeights']['templates']['home']['bands'][0].update(sections=['hero.home', 'feature.dark-features'])))
case('homepage copy budget drifts from the measured word count', 'measured-values', lambda d: edit_json(d, 'sections/hero.home.json', lambda o: o['content']['fields']['h1'].update(maxWords=2)))
# ---- examples
def break_example(o): o['nodes'][1]['content']['h2'] = 'Welcome to MotherDuck'
case('generated example leaks the source brand', 'examples', lambda d: edit_json(d, 'schema/examples/generated-home.pagespec.json', break_example), quick=False)
case('generated example lacks a family', 'examples', lambda d: (d / 'schema/examples/generated-podcast-index.pagespec.json').unlink(), quick=False)
# ---- hygiene
case('absolute machine path injected', 'absolute-paths', lambda d: edit_text(d, 'README.md', lambda t: t + '\nSee /' + 'Us' + 'ers/someone/project for details.\n'))
case('junk file shipped', 'junk-files', lambda d: (d / 'sections' / '.DS_Store').write_text('x'))
case('__pycache__ shipped', 'junk-files', lambda d: (d / 'schema' / '__pycache__').mkdir() or (d / 'schema' / '__pycache__' / 'x.pyc').write_text('x'))

def main():
    base = tempfile.mkdtemp(prefix='prove-drift-')
    rows = []; ok_all = True
    try:
        clean = make_copy(base)
        code, out = run_verify(clean, quick=False)
        status = 'PASS' if code == 0 else 'FAIL'
        print('clean scratch copy passes verify_all: %s' % status)
        if code != 0:
            print(out); ok_all = False
        for name, check, fn, needs_source, quick in CASES:
            if needs_source and not SRC_AVAILABLE:
                rows.append((name, check, 'SKIPPED (needs the sibling source tree)')); continue
            d = make_copy(base, with_source=needs_source)
            try:
                fn(d)
            except Exception as e:
                rows.append((name, check, 'MUTATION ERROR %s' % e)); ok_all = False; continue
            code, out = run_verify(d, quick=quick)
            fails = re.findall(r'^FAIL\s+(\S+)', out, re.M)
            caught = code != 0 and check in fails
            rows.append((name, check, 'CAUGHT (%s)' % ', '.join(sorted(set(fails))[:3]) if caught else 'NOT CAUGHT: exit %d, FAIL checks %s' % (code, sorted(set(fails)))))
            if not caught: ok_all = False
            if VERBOSE and not caught: print(out[-1500:])
            shutil.rmtree(d.parent, ignore_errors=True)
        # control: the real package still passes (read-only run)
        code, out = run_verify(ROOT, quick=False)
        real = code == 0
        if not real: print(out[-2000:])
    finally:
        shutil.rmtree(base, ignore_errors=True)
    w = max(len(r[0]) for r in rows)
    for name, check, res in rows: print('  %-*s  expects %-22s %s' % (w, name, check, res))
    n_caught = sum(1 for r in rows if r[2].startswith('CAUGHT')); n_skip = sum(1 for r in rows if r[2].startswith('SKIPPED'))
    print('\ndrift cases: %d, caught: %d, skipped: %d, missed: %d' % (len(rows), n_caught, n_skip, len(rows) - n_caught - n_skip))
    print('real package still passes verify_all: %s' % ('YES' if real else 'NO'))
    return 0 if ok_all and real else 1

if __name__ == '__main__':
    sys.exit(main())
