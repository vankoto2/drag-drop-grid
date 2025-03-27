import axios from "axios";

// const API_URL = import.meta.env.VITE_APP_API_URL ;
const API_URL = "http://localhost:3001/data";

export const fetchData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
};
