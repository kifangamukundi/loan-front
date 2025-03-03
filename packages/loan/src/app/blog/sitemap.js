import { FRONT_URL } from "@/helpers";
import { getPosts } from "@/ssr-functions";

export async function generateSitemaps() {
  return [{ id: 1 }];
}

export default async function sitemap() {
  const posts = await getPosts();

  if (!posts || !Array.isArray(posts.data) || !posts.data.item) {
    return [];
  }

  const { item } = posts.data;

  return item.map((post) => ({
    url: `${FRONT_URL}blog/${post.slug}`,
    lastModified: post.updated_at,
  }));
}