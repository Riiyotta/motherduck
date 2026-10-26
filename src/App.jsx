import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import PageStub from './pages/PageStub.jsx'
import { ROUTES } from './routes.js'
import company from './pages/company/index.js'
import marketing from './pages/marketing/index.js'
import content from './pages/content/index.js'
import extra from './pages/extra/index.js'

// Template components registered by each page group; keys match ROUTES.
// Any key missing here falls back to PageStub.
const TEMPLATES = { ...company, ...marketing, ...content, ...extra }

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

// Routes that render their own top nav and footer instead of the site header / footer (the original
// /dive-gallery app has its own compact footer, 455 tall @1440 vs the site footer's 1021).
const OWN_NAV_PREFIXES = ['/dive-gallery']
// Exact paths with no site chrome at all: /try is a separate app on the original (own top bar, no footer).
// Exact match (trailing slash allowed) so /try-anything keeps the site header and footer.
const BARE_PATHS = ['/try']

export default function App() {
  const { pathname } = useLocation()
  const bare = BARE_PATHS.includes(pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname)
  const ownNav = bare || OWN_NAV_PREFIXES.some((p) => pathname.startsWith(p))
  return (
    <div style={{ paddingTop: ownNav ? 0 : 'var(--header-total)' }}>
      {/* Live: first focusable element; visually hidden until focused, then a white 20/12-padded box pinned to the
          page's top-left (z 100), mono 16/24 underlined, 2px #2BA5FF outline offset 2. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-0 focus:top-0 focus:z-[100] focus:block focus:bg-white focus:px-[20px] focus:py-[12px] focus:font-mono focus:text-[16px] focus:font-normal focus:leading-[24px] focus:text-ink focus:underline focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[#2BA5FF]"
      >
        Skip to main content
      </a>
      <ScrollToTop />
      {!ownNav && <Header />}
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          {Object.entries(ROUTES).flatMap(([template, paths]) => {
            const Page = TEMPLATES[template]
            return paths.map((path) => (
              <Route
                key={path}
                path={path}
                element={Page ? <Page /> : <PageStub template={template} />}
              />
            ))
          })}
          <Route path="*" element={<PageStub template="not-found" />} />
        </Routes>
      </main>
      {!ownNav && <Footer />}
    </div>
  )
}
