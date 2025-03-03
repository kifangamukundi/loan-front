import { BASE_URL } from "@/helpers";

async function getCategories() {
  try {
    const response = await fetch(`${BASE_URL}/categories/by/slugs`, {
      method: "GET",
    });
    
    if (!response.ok) return null;
    
    return response.json();
    
  } catch (error) {
    return null;
  }
}

export default getCategories;