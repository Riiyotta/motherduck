// §6 ArticleProse: renders the block AST from articleGen.js with the measured prose styles (content.css .ct-prose).
// Code blocks: github-dark-dimmed tokens on #22272E, no copy button, no language label, no line numbers.
// iframes (YouTube / interactive embeds) render as static placeholder frames.
import { Fragment } from 'react'
import { Placeholder } from '../ui'
import { SmartLink, Icon, PlayFrame } from './bits.jsx'
import { Admonition, Footnotes, FootnoteRef } from '../extra/proseExtras.jsx'

/* Minimal highlighter producing highlight.js class names (hl-*). */
const SQL_KW = /\b(SELECT|FROM|WHERE|GROUP|BY|ORDER|AS|AND|OR|WITH|OVER|PARTITION|DESC|ASC|CREATE|TABLE|INSERT|INTO|ATTACH|INTERVAL|DAY|LIMIT|JOIN|ON|import|for|in|def|return)\b/g
const BUILTIN = /\b(count|sum|avg|round|print|row_number|read_csv|current_date|fetchall|connect|sql)\b(?=\()/g
function tokenize(line, lang) {
  if (lang === 'diff') {
    if (line.startsWith('+')) return [{ c: 'addition', t: line }]
    if (line.startsWith('-')) return [{ c: 'deletion', t: line }]
  }
  if (lang === 'bash' && line.startsWith('$')) return [{ c: 'prompt', t: '$' }, ...tokenize(line.slice(1), 'sql')]
  const rules = [
    ['comment', /(--.*$|#.*$)/g],
    ['string', /('[^']*'|"[^"]*")/g],
    ['number', /\b\d+(\.\d+)?\b/g],
    ['built_in', BUILTIN],
    ['keyword', SQL_KW],
    ['operator', /(>=|<=|=|\*|>|<)/g],
  ]
  const marks = []
  for (const [c, re] of rules) {
    re.lastIndex = 0
    let m
    while ((m = re.exec(line))) {
      const s = m.index
      const e = s + m[0].length
      if (!marks.some((x) => s < x.e && e > x.s)) marks.push({ s, e, c })
      if (m[0].length === 0) re.lastIndex++
    }
  }
  marks.sort((a, b) => a.s - b.s)
  const out = []
  let at = 0
  for (const mk of marks) {
    if (mk.s > at) out.push({ t: line.slice(at, mk.s) })
    out.push({ c: mk.c, t: line.slice(mk.s, mk.e) })
    at = mk.e
  }
  if (at < line.length) out.push({ t: line.slice(at) })
  return out
}

function Code({ code, lang }) {
  const lines = code.split('\n')
  return (
    <pre>
      <code>
        {lines.map((ln, i) => (
          <Fragment key={i}>
            {tokenize(ln, lang).map((tk, j) => (tk.c ? <span key={j} className={`hl-${tk.c}`}>{tk.t}</span> : <Fragment key={j}>{tk.t}</Fragment>))}
            {i < lines.length - 1 ? '\n' : null}
          </Fragment>
        ))}
      </code>
    </pre>
  )
}

function Inline({ inl }) {
  return inl.map((n, i) => {
    if (typeof n === 'string') return <Fragment key={i}>{n}</Fragment>
    if (n.t === 'strong') return <strong key={i}>{n.c}</strong>
    if (n.t === 'em') return <em key={i}>{n.c}</em>
    if (n.t === 'code') return <code key={i}>{n.c}</code>
    if (n.t === 'a') return <SmartLink key={i} href={n.href} className="ct-a">{n.c}</SmartLink>
    if (n.t === 'fn') return <FootnoteRef key={i} n={n} />
    return null
  })
}

function Heading({ b }) {
  const Tag = b.type
  return (
    <Tag id={b.id}>
      {b.text}
      {/* heading anchor: in-page hash link (24px link icon) */}
      <a className="ct-anchor" href={`#${b.id}`} aria-label="Link to this section"><Icon.link /></a>
    </Tag>
  )
}

function List({ b }) {
  const Tag = b.type
  return (
    <Tag>
      {b.items.map((it, i) => (
        <li key={i}>
          <Inline inl={it.inl} />
          {it.sub && <List b={it.sub} />}
        </li>
      ))}
    </Tag>
  )
}

function Block({ b }) {
  switch (b.type) {
    case 'p': return <p><Inline inl={b.inl} /></p>
    case 'h1': case 'h2': case 'h3': case 'h4': case 'h5': case 'h6': return <Heading b={b} />
    case 'ul': case 'ol': return <List b={b} />
    // optional b.cite: attribution as a second <p> in the same blockquote ("— Name [mm:ss]"; EXTRA §8, same italic 500 #000)
    case 'quote': return <blockquote><p><Inline inl={b.inl} /></p>{b.cite && <p><Inline inl={b.cite} /></p>}</blockquote>
    case 'code': return <Code code={b.code} lang={b.lang} />
    case 'callout': return <div className="ct-callout">{b.children.map((c, i) => <Block key={i} b={c} />)}</div>
    case 'table': return (
      <div className="ct-tablewrap">
        <table>
          <thead><tr>{b.head.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
          <tbody>{b.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
        </table>
      </div>
    )
    case 'img': return (
      <div className="ct-imgwrap">
        <Placeholder label="Article image" rounded="" bordered={false} className="ct-img"
          style={b.w ? { width: b.w, height: b.h } : b.ratio ? { width: '100%', aspectRatio: `1 / ${b.ratio}` } : { width: '100%', height: b.h }} />
      </div>
    )
    case 'iframe': return b.kind === 'youtube'
      ? <PlayFrame className="ct-frame aspect-video w-full" />
      : <Placeholder label="Embedded content" rounded="" bordered={false} className="ct-frame" style={{ width: '100%', height: 600 }} />
    case 'hr': return <hr />
    case 'admon': return <Admonition b={b} renderBlock={(c, i) => <Block key={i} b={c} />} />
    case 'footnotes': return <Footnotes b={b} renderInline={(inl) => <Inline inl={inl} />} />
    default: return null
  }
}

export default function ArticleProse({ blocks, video = false, tone, className = '' }) {
  return (
    <div className={`ct-prose ${className}`} data-video={video || undefined} data-tone={tone}>
      {blocks.map((b, i) => <Block key={i} b={b} />)}
    </div>
  )
}
