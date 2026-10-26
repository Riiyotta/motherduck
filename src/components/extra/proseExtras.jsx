// PAGES_SPEC_EXTRA §8 ArticleProse additions, shared by every extra chunk:
//   { type: 'admon', kind: 'note'|'tip'|'info'|'warning'|'danger', title, mono, children: [blocks] }
//   { type: 'footnotes', items: [{ id, inl }] }   (in-text refs: inline node { t: 'fn', n, id })
//   <ArticleProse tone="dark" />  (X10 podcast episode)
// ArticleProse dispatches these block types here; styles live in styles/extra-prose.css.
import '../../styles/extra-prose.css'

const ADMON_LABEL = { note: 'NOTE', tip: 'TIP', info: 'INFO', warning: 'WARNING', danger: 'DANGER' }

function AdmonIcon({ kind }) {
  const P = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }
  if (kind === 'warning' || kind === 'danger') {
    return <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 2 20h20L12 3z" {...P} /><path d="M12 10v4M12 17v.5" {...P} /></svg>
  }
  if (kind === 'tip') {
    return <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z" {...P} /></svg>
  }
  return <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" {...P} /><path d="M12 11v6M12 7.5v.5" {...P} /></svg>
}

export function Admonition({ b, renderBlock }) {
  const kind = ADMON_LABEL[b.kind] ? b.kind : 'note'
  const label = ADMON_LABEL[kind]
  return (
    <div className={`xp-admon xp-admon--${kind}`} data-mono={b.mono || undefined}>
      <div className="xp-admon-head">
        <AdmonIcon kind={kind} />
        <span>{b.title ? `${label}: ${b.title}` : label}</span>
      </div>
      <div className="xp-admon-body">{b.children.map((c, i) => renderBlock(c, i))}</div>
    </div>
  )
}

export function FootnoteRef({ n }) {
  return <sup className="xp-fnref"><a href={`#fn${n.id ?? n.n}`} id={`fnref${n.id ?? n.n}`}>{n.n}</a></sup>
}

export function Footnotes({ b, renderInline }) {
  return (
    <div className="xp-footnotes">
      <ol>
        {b.items.map((it, i) => (
          <li key={i} id={`fn${it.id ?? i + 1}`}>
            <span className="xp-fn-num">{i + 1}.</span>
            <span>{renderInline(it.inl)}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
