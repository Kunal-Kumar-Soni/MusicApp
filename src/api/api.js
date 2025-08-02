// src/api/api.js
import axios from "axios";

// Base URL
const BASE_URL = "https://saavn.dev/api";

export async function getData(query) {
  try {
    const response = await axios.get(`${BASE_URL}/search/songs`, {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching songs:", error);
    return { data: [] };
  }
}

export async function getSongsByArtist(query, page = 1) {
  try {
    const response = await axios.get(`https://saavn.dev/api/search/songs`, {
      params: { query, page },
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching songs", error);
    return { data: [] };
  }
}

export async function getSongById(songId) {
  try {
    const response = await axios.get(`https://saavn.dev/api/songs/${songId}`);
    return response.data;
  } catch (error) {
    console.log("Error fetching song by ID", error);
    return { data: [] };
  }
}
