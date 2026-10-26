// X6 /authors/:slug: hero -> "N BLOG POSTS AND VIDEOS" grid (newest first, no paging) -> links -> subscribe band.
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { AuthorHero, AuthorGrid, AuthorSubscribe } from '../../components/extra/author.jsx'
import { getAuthor } from '../../components/extra/data/content.js'
import { videos } from '../../components/content/data.js'

export default function Author() {
  const { slug } = useParams()
  const a = useMemo(() => getAuthor(slug, videos()), [slug])
  return (
    <>
      <AuthorHero a={a} />
      <AuthorGrid a={a} />
      <AuthorSubscribe />
    </>
  )
}
