import { matchPath } from 'react-router-dom'
import { ROUTES } from '../../routes.js'

const PATTERNS = Object.values(ROUTES).flat()

// Returns { to } for internal paths that exist in src/routes.js, otherwise {} (render as non-link).
export function routeProps(path) {
  if (!path || !path.startsWith('/')) return {}
  const [pathname, hash] = path.split('#')
  const clean = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname
  if (clean === '/' || PATTERNS.some((p) => matchPath(p, clean))) {
    return { to: hash ? `${clean}#${hash}` : clean }
  }
  return {}
}
