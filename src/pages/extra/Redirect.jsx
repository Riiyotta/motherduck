// §1a redirects: the original answers these paths with HTTP 3xx; the clone replaces the history entry.
import { Navigate, useLocation } from 'react-router-dom'
import { REDIRECTS, REDIRECT_PREFIXES } from '../../routes.js'

export default function Redirect() {
  const { pathname, search, hash } = useLocation()
  const path = pathname.replace(/\/+$/, '')
  const prefix = Object.keys(REDIRECT_PREFIXES).find((p) => path === p || path.startsWith(`${p}/`))
  const to = REDIRECTS[path] || (prefix ? REDIRECT_PREFIXES[prefix] + path.slice(prefix.length) : '/')
  return <Navigate replace to={`${to}${search}${hash}`} />
}
