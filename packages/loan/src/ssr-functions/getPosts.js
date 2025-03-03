import { BASE_URL } from "@/helpers";

async function getPosts() {
  try {
    const response = await fetch(`${BASE_URL}/posts/by/slugs`, {
      method: "GET",
    });
    
    if (!response.ok) return null;
    
    return response.json();
    
  } catch (error) {
    return null;
  }
}

export default getPosts;