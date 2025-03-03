import { BASE_URL } from "@/helpers";

async function getTags() {
  try {
    const response = await fetch(`${BASE_URL}/tags/by/slugs`, {
      method: "GET",
    });
    
    if (!response.ok) return null;
    
    return response.json();
    
  } catch (error) {
    return null;
  }
}

export default getTags;