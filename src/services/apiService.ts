import axios from "axios";

console.log(import.meta.env.VITE_APP_API_URL);
const API_URL = import.meta.env.VITE_APP_API_URL ;


export const fetchData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
};

// export const updateData = async (data: any) => {
//   try {
//     await axios.put(API_URL, data);
//   } catch (error) {
//     console.error("API Update Error:", error);
//     throw error;
//   }
// };
