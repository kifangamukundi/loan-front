import { FRONT_URL } from "@/helpers";

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/'],
    },
    sitemap: [
      `${FRONT_URL}sitemap.xml`,
      `${FRONT_URL}blog/sitemap/1.xml`,
      `${FRONT_URL}blog/category/sitemap/1.xml`,
      `${FRONT_URL}blog/tag/sitemap/1.xml`,
      // `${FRONT_URL}pages/sitemap/1.xml`,
    ],
  };
}