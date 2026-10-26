import { Link } from 'react-router-dom'

// Router link for in-scope routes; same-styled non-link text for external / docs / auth destinations.
export default function NavLink({ to, className, children, ...rest }) {
  if (to) {
    return (
      <Link to={to} className={className} {...rest}>
        {children}
      </Link>
    )
  }
  return (
    <span className={`${className} cursor-default`} {...rest}>
      {children}
    </span>
  )
}
