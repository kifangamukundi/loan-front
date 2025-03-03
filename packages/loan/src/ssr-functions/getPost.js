import { BASE_URL } from "@/helpers";

async function getPost(slug) {
  try {
    const response = await fetch(`${BASE_URL}/posts/by/single/${slug}`, {
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

export default getPost;
