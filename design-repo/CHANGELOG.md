# Changelog

## [1.0.0] - 2026-10-26

First release (design-review-pending). Built from scratch against the clone at its current state, in one pass that includes every baseline requirement (R1-R14) rather than adding them in later revisions.

* Tokens: foundation (612), semantic (63), component (78), layout (23), light and dark themes, motion patterns (38), and the LLM layer (component allowlist 1.0.0, token catalog, token policy). Every value is read from tailwind.config.js and tokens/*.js or quoted from the specs; nothing is invented.
* 14 primitives, 31 components, 231 section contracts, each with `source` {id, file, tag, lines} and `semantic` {id, category}, `retrievalEligible`, `generatedAssetRoles`, per-field `maxWords`, motion with `reducedMotionFallback` and a structured `responsive` record.
* 59 templates with structured node objects; 100 route patterns and 9 redirects mapped exactly once; all 1583 sitemap URLs resolve to a pattern.
* Compatibility graph (10 rules, severities, named exceptions) checked against every real template when written; the validator implements the same rule ids.
* PageSpec schema (Draft-07, closed) with required `mode` (reference | generated); pageSpecVersion 2.0.0 (the first published shape includes `mode`). Semantic validator with template-vs-nodes cross-reference keyed on (section, variant), generated-mode rules GENERATED_MODE_BRAND / _CTA / _COPY / _URL / _ASSET / _PERSON / _RATING, asset availability and policy pinned in code, retrieval-eligibility pins, token policy rules.
* Asset-role registry (34 roles) derived from IMAGE_BRIEFS.md and ASSET_MANIFEST.md with three-way availability, generation-safe substitutes and licensing guidance.
* Measured section heights at 1440px for every template, the wrapper-height gate with thresholds pinned in code, and a live-versus-clone height comparison for eight routes (not a pixel-parity measurement).
* 2 reference and 9 generated example PageSpecs (one generated example per template family: home, marketing, content-index, article, legal, form-lp, events, podcast).
* verify_all.py, wrapper_gate.py, prove_drift.py (scratch-copy proof for each drift check) and an adversarial suite with controls.
* Recorded, not fixed: the `/lp/agents-run-your-analytics-full` clone gap, residual height deltas, the stand-in brand text and stranger-photo stand-ins in the clone (measured-values.json `knownGaps`, `cloneObservations`).
