import { FRONT_URL } from "@/helpers";
import { getCategories } from "@/ssr-functions";

export async function generateSitemaps() {
  return [{ id: 1 }];
}

export default async function sitemap() {
  const categories = await getCategories();

  if (!categories || !Array.isArray(categories.data) || !categories.data.item) {
    return [];
  }

  const { item } = categories.data;

  return item.map((category) => ({
    url: `${FRONT_URL}blog/${category.slug}`,
    lastModified: category.updated_at,
  }));
}