// Template components for the extra page group (PAGES_SPEC_EXTRA.md), keyed by ROUTES key in src/routes.js.
// Chunks A/B/C each append only their own imports and entries.

// chunk A: lazy pages so the glossary / dive / author / learn datasets stay out of the main bundle.
import { lazy as lazyA, createElement as hA, Suspense as SuspenseA } from 'react'
const pageA = (load) => { const C = lazyA(load); return function ExtraPageA() { return hA(SuspenseA, { fallback: null }, hA(C)) } }

// chunk B: lazy pages so the events / webinar / podcast datasets (data/media.js) stay out of the main bundle.
import { lazy as lazyB, createElement as hB, Suspense as SuspenseB } from 'react'
const pageB = (load) => { const C = lazyB(load); return function ExtraPageB() { return hB(SuspenseB, { fallback: null }, hB(C)) } }

// chunk C: lazy pages so the marketing / legal shape data (data/marketing.js) stays out of the main bundle.
import { lazy as lazyC, createElement as hC, Suspense as SuspenseC } from 'react'
const pageC = (load) => { const C = lazyC(load); return function ExtraPageC() { return hC(SuspenseC, { fallback: null }, hC(C)) } }

export default {
  // chunk A
  glossaryIndex: pageA(() => import('./GlossaryIndex.jsx')),
  glossaryTerm: pageA(() => import('./GlossaryTerm.jsx')),
  diveDetail: pageA(() => import('./DiveDetail.jsx')),
  author: pageA(() => import('./Author.jsx')),
  learnArticle: pageA(() => import('./LearnArticle.jsx')),
  researchPaper: pageA(() => import('./ResearchPaper.jsx')),
  bookChapter: pageA(() => import('./BookChapter.jsx')),
  // chunk B
  eventDetail: pageB(() => import('./EventDetail.jsx')),
  eventsPast: pageB(() => import('./EventsPast.jsx')),
  webinar: pageB(() => import('./Webinar.jsx')),
  podcastIndex: pageB(() => import('./PodcastIndex.jsx')),
  podcastEpisode: pageB(() => import('./PodcastEpisode.jsx')),
  try: pageB(() => import('./Try.jsx')),
  redirect: pageB(() => import('./Redirect.jsx')),
  // chunk C
  persona2: pageC(() => import('./PersonaLanding.jsx')),
  euRegion: pageC(() => import('./EuRegion.jsx')),
  azure: pageC(() => import('./Azure.jsx')),
  vsIndex: pageC(() => import('./VsIndex.jsx')),
  contactSupport: pageC(() => import('./ContactSupport.jsx')),
  genericPage: pageC(() => import('./GenericPage.jsx')),
  legalToc: pageC(() => import('./LegalToc.jsx')),
  splitFormLP: pageC(() => import('./SplitFormLP.jsx')),
  lpExtra: pageC(() => import('./LpExtra.jsx')),
}
