import { createElement } from 'react'
import { Link } from 'react-router-dom'
import { EXCLUDED_PREFIXES } from '../routes.js'

// Site-wide link rule for the homepage and footer: every same-site path from the original becomes a
// react-router link (even if its template is not built yet, so it lands on the not-found stub until it is).
// External URLs, mailto:, auth (auth./app.motherduck.com), /docs (EXCLUDED_PREFIXES) and static files
// (e.g. /rss.xml) return null -> render a non-link element with identical styling.
export function sitePath(href) {
  if (!href) return null
  const path = href.replace(/^https?:\/\/(www\.)?motherduck\.com(?=\/|$)/, '') || '/'
  if (!path.startsWith('/') || path.startsWith('//')) return null
  if (EXCLUDED_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`))) return null
  const [pathAndQuery, hash] = path.split('#')
  const [pathname, query] = pathAndQuery.split('?')
  if (/\.[a-z0-9]+$/i.test(pathname)) return null
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  return `${clean}${query ? `?${query}` : ''}${hash ? `#${hash}` : ''}`
}

// <SiteLink href> -> <Link to> for same-site paths, otherwise `as` (default span) with the same props.
export function SiteLink({ href, as = 'span', children, ...rest }) {
  const to = sitePath(href)
  if (to) return createElement(Link, { to, ...rest }, children)
  return createElement(as, rest, children)
}

// For LiftCard-style APIs that take an element type + props: { el, props } for a given href.
export function linkTarget(href, fallback = 'div') {
  const to = sitePath(href)
  return to ? { el: Link, props: { to } } : { el: fallback, props: {} }
}
