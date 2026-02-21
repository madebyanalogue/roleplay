const sanityFetch = async (query, params = {}) => {
  if (process.server) {
    const config = useRuntimeConfig()
    const projectId = config.public.sanity?.projectId || 'uuzbe0e0'
    const dataset = config.public.sanity?.dataset || 'production'
    const baseUrl = `https://${projectId}.apicdn.sanity.io/v2021-10-21/data/query/${dataset}`
    const result = await $fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, params }),
    })
    return result?.result ?? null
  }
  const result = await $fetch('/api/sanity/query', {
    method: 'POST',
    body: { query, params },
  })
  return result?.result ?? null
}

export const useKnowledgeLanding = () => {
  const query = `*[_type == "knowledgeLanding"][0] {
    title,
    intro,
    footerNote
  }`

  return useAsyncData('knowledge-landing', () => sanityFetch(query), { server: true })
}

export const useKnowledgeArticles = () => {
  const query = `*[_type == "knowledgeArticle"] | order(title asc) {
    _id,
    title,
    "slug": slug.current
  }`

  return useAsyncData('knowledge-articles', () => sanityFetch(query), { server: true })
}

export const useKnowledgeArticle = (slugRef) => {
  const query = `*[_type == "knowledgeArticle" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    summary,
    metaDescription,
    sections[] {
      question,
      directAnswer,
      body
    },
    scaleSection { body },
    relatedLinks[]-> {
      _id,
      title,
      "slug": slug.current
    }
  }`

  return useAsyncData(
    () => `knowledge-article-${toValue(slugRef)}`,
    () => sanityFetch(query, { slug: toValue(slugRef) }),
    { watch: [slugRef], server: true }
  )
}
