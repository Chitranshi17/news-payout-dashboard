// src/utils/fetchNews.js
import axios from "axios";

const NEWS_API_KEY = "YOUR_NEWSAPI_KEY"; // Replace with your actual API key

export async function fetchNews() {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us`,
      { headers: { "X-Api-Key": NEWS_API_KEY } }
    );
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}
