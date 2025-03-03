import { BASE_URL } from "@/helpers";

async function searchPostsByCategory({ slug, filters = {}, sortOrder = '', page = 1, limit = 9, search = '' }) {
  try {
    const queryParams = new URLSearchParams({
      filters: JSON.stringify(filters),
      sortOrder,
      page: page.toString(),
      limit: limit.toString(),
      search,
    });

    const response = await fetch(`${BASE_URL}/posts/public/category/${slug}?${queryParams.toString()}`, {
      method: "GET",
      revalidate: 10,
    });

    if (!response.ok) return null;
    
    return response.json();
    
  } catch (error) {
    console.error("Error fetching posts:", error);
    return null;
  }
}

export default searchPostsByCategory;
