// Registry of original SVG artwork referenced by imageMap.js `art` / `artPool` keys.
import { Illustration, Mascot, Wordmark, BookCover, UiWindow, Glyph } from '../art.jsx'
import * as home from './home.jsx'
import { HouseScene, HouseSpot } from './scenes.jsx'
import * as ui from './ui.jsx'
import * as th from './thumbs.jsx'

export const ART_REGISTRY = {
  // generic fallbacks
  illustration: Illustration, mascot: Mascot, wordmark: Wordmark, cover: BookCover, window: UiWindow, glyph: Glyph,
  // homepage
  productIcon: home.ProductIcon, productShot: home.ProductShot, pipPointing: home.PipPointing, pipWaving: home.PipWaving,
  seal: home.Seal, monogram: home.Monogram, brand: home.Brand, storageGlyph: home.StorageGlyph,
  presenterThumb: home.PresenterThumb, editorialThumb: home.EditorialThumb, newsletterThumb: home.NewsletterThumb,
  // house-style scenes (props.variant = scene name in scenes.jsx)
  house: HouseScene, spot: HouseSpot,
  // UI mocks, diagrams, charts
  dashboard: ui.Dashboard, liveMap: ui.LiveMap, sqlNotebook: ui.SqlNotebook, adminTable: ui.AdminTable,
  hyperPanel: ui.HyperPanel, routing: ui.RoutingDiagram, arch: ui.ArchDiagram, tier: ui.TierDiagram,
  system: ui.SystemDiagram, format: ui.FormatDiagram, benchmark: ui.BenchmarkChart, guidesChart: ui.GuidesChart,
  articleChart: ui.ArticleChart, embed: ui.EmbedFrame, communityBanner: ui.CommunityBanner, guidePreview: ui.GuidePreview,
  // thumbnails, covers, brand
  editorialPost: th.EditorialPost, newsletterPost: th.NewsletterPost, newsletterFeatured: th.NewsletterFeatured,
  eventPost: th.EventPost, photoPost: th.PhotoPost, quackPost: th.QuackPost, creatorThumb: th.CreatorThumb,
  webinarThumb: th.WebinarThumb, featuredVideo: th.FeaturedVideo, careersCollage: th.CareersCollage,
  bookCover: th.Cover, coverOnClouds: th.CoverOnClouds, brandMark: th.BrandMark, ownWordmark: th.OwnWordmark,
  promoFrame: th.PromoFrame, divesPoster: th.DivesPoster, featureImage: th.FeatureImage,
}
