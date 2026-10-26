#!/usr/bin/env python3
"""Synthesizes a minimal valid PageSpec for any template from the template's own node list and the section contracts.

Used by the adversarial suite (one auto-synthesized control per template) and by extraction/prove_drift.py. The vocabulary below is
original: it contains no source heading, product name or marketing phrase.
"""
import sys
sys.dont_write_bytecode = True
import copy, os, random, sys
from pathlib import Path

HERE = Path(os.path.dirname(os.path.abspath(__file__)))
ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / 'schema'))
import semantic_validate as sv   # noqa: E402

GEN_WORDS = ('lantern ledger harbor orchard signal cedar ember pilot atlas ribbon summit meadow current beacon trellis quartz harvest compass willow anchor '
             'pebble thistle marlin copper juniper bramble canvas fathom gable hollow indigo kestrel lattice mosaic nimbus oriole prairie quiver russet saffron tundra '
             'umber vessel wicker yarrow zephyr alpine breeze cobalt dune ferry glacier horizon inlet jetty kelp lagoon mesa').split()
REF_WORDS = ('bridge circuit dashboard engine factory gateway index journal kernel launch module network output pipeline query router schema table unit vector '
             'widget archive bucket column driver export filter grain handle input jump keyed layer metric notice object packet queue record stream trace upload').split()
GLUE = ['and', 'for', 'with', 'in', 'on', 'across', 'from']

def text(n, rng, vocab, cap=7):
    n = max(1, min(n, cap)); out = []
    for i in range(n):
        out.append(rng.choice(GLUE) if (i % 4 == 2 and i) else rng.choice(vocab))
    out[0] = out[0].capitalize()
    return ' '.join(out)

def asset(fd, mode, rng, ctx, repo):
    roles = repo.roles
    if mode == 'generated':
        pick = None
        for r in fd['roles']:
            for s in roles[r]['generationSafeSubstitutes']: pick = pick or s
            if roles[r]['availability'] == 'generation-safe': pick = pick or r
        pick = pick or 'generated-illustration'
        return {'role': pick, 'alt': text(3, rng, GEN_WORDS), 'ref': 'placeholder:%s-%d' % (pick, rng.randint(1, 99))}
    return {'role': fd['roles'][0], 'alt': text(3, rng, REF_WORDS)}

def link(fd, mode, rng, vocab):
    n = fd.get('labelMaxWords', 3)
    href = ('https://studio.example/' + rng.choice(vocab)) if mode == 'generated' else '#' + rng.choice(vocab)
    return {'label': text(min(n, 3), rng, vocab, 3), 'href': href}

def value(fd, mode, rng, ctx, repo, vocab, cap=7):
    t = fd['type']
    if t == 'text': return text(fd['maxWords'], rng, vocab, cap)
    if t == 'link': return link(fd, mode, rng, vocab)
    if t == 'asset': return asset(fd, mode, rng, ctx, repo)
    if t == 'enum': return fd['values'][0]
    if t == 'code': return '\n'.join('select %d as value_%d;' % (i, i) for i in range(1, min(fd['maxLines'], 3) + 1))
    if t == 'number': return fd['min']
    if t == 'boolean': return False
    if t == 'list':
        n = max(fd['minItems'], min(fd['maxItems'], 2 if fd['minItems'] < 2 else fd['minItems']))
        return [obj(fd['item'], mode, rng, ctx, repo, vocab, cap) for _ in range(n)]
    raise ValueError(t)

def obj(fields, mode, rng, ctx, repo, vocab, cap=7):
    return {k: value(fd, mode, rng, ctx, repo, vocab, cap) for k, fd in fields.items() if fd.get('required', True)}

def synth_spec(repo, template_id, mode='generated', brand='Lumen Harbor', seed=0, overrides=None, include_optional=True, theme=None, route=None):
    tpl = repo.templates[template_id]
    rng = random.Random('%s-%s-%s' % (template_id, mode, seed))
    vocab = GEN_WORDS if mode == 'generated' else REF_WORDS
    nodes = []; seen_groups = set()
    for tn in tpl['nodes']:
        if tn.get('group'):
            if tn['group'] in seen_groups: continue
            seen_groups.add(tn['group'])
        if not tn['required'] and not include_optional and not tn.get('group'): continue
        c = repo.contracts[tn['section']]
        variant = tn.get('variant') or c['variants'][0]
        content = obj(c['content']['fields'], mode, rng, tn['section'], repo, vocab)
        if overrides and tn['section'] in overrides:
            for k, v in overrides[tn['section']].items():
                if isinstance(v, dict) and k in content and isinstance(content[k], dict): content[k].update(v)
                else: content[k] = v
        node = {'section': tn['section'], 'variant': variant, 'surface': c['allowedSurfaces'][0], 'content': content,
                'motion': {'pattern': c['motion']['default'], 'reducedMotionFallback': c['motion']['reducedMotionFallback']}}
        nodes.append(node)
        reps = 0
    if theme is None: theme = 'dark' if template_id in repo.policy['themeBindings'].get('dark', []) else 'light'
    if route is None:
        if mode == 'reference': route = tpl['sampleRoute']
        else: route = '/' if tpl['sampleRoute'] == '/' else '/example/' + template_id
    spec = {'pageSpecVersion': repo_version(repo), 'mode': mode, 'template': template_id, 'route': route, 'theme': theme,
            'meta': {'title': text(4, rng, vocab, 4), 'brand': brand if mode == 'generated' else 'Reference brand', 'description': text(8, rng, vocab, 8)},
            'nodes': nodes}
    if theme == 'dark':
        for n in nodes:
            if n['section'] == 'shell.header': n['variant'] = 'dark'
    return spec

def repo_version(repo):
    return repo.schema['properties']['pageSpecVersion']['const']

if __name__ == '__main__':
    repo = sv.Repo(ROOT)
    bad = 0
    for tid in repo.templates:
        for mode in ('generated', 'reference'):
            fs = [f for f in sv.validate(synth_spec(repo, tid, mode), repo) if f.severity == 'error']
            if fs:
                bad += 1; print(tid, mode, [(f.rule, f.message[:70]) for f in fs[:2]])
    print('synth controls failing:', bad)
