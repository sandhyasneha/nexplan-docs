import { docsContent, docsContentExtra } from '@/lib/docs-content'

export default function sitemap() {
  const baseUrl = 'https://docs.nexplan.io'
  const allDocs = [...docsContent, ...docsContentExtra]

  const docPages = allDocs.map(doc => ({
    url: `${baseUrl}/docs/${doc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    ...docPages,
  ]
}
