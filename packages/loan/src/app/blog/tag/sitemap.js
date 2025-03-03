import { FRONT_URL } from "@/helpers";
import { getTags } from "@/ssr-functions";

export async function generateSitemaps() {
  return [{ id: 1 }];
}

export default async function sitemap() {
  const tags = await getTags();

  if (!tags || !Array.isArray(tags.data) || !tags.data.item) {
    return [];
  }

  const { item } = tags.data;

  return item.map((tag) => ({
    url: `${FRONT_URL}blog/${tag.slug}`,
    lastModified: tag.updated_at,
  }));
}