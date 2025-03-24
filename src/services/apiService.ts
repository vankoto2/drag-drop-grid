import axios from "axios";

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

export const updateData = async (data: any) => {
  try {
    await axios.put(API_URL, data);
  } catch (error) {
    console.error("API Update Error:", error);
    throw error;
  }
};
