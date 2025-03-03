import { BASE_URL } from "@/helpers";

async function getTag(slug) {
  try {
    const response = await fetch(`${BASE_URL}/tags/by/single/${slug}`, {
      method: "GET",
      next: { revalidate: 60 }
    });

    if (!response.ok) return null;

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export default getTag;