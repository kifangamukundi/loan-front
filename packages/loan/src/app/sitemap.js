import { FRONT_URL } from "@/helpers";

export default function sitemap() {
  return [
    // Home Page
    {
      url: `${FRONT_URL}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    // Main Call To Action Page and about pages
    {
      url: `${FRONT_URL}join`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${FRONT_URL}about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // The blog Section
    {
      url: `${FRONT_URL}blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    // Other Pages
    {
      url: `${FRONT_URL}login`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.3,
    },
    {
      url: `${FRONT_URL}register`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.3,
    },
    {
      url: `${FRONT_URL}forgot-password`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.3,
    },
  ]
}