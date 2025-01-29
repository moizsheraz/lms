import axios from "axios";

// Function to fetch earnings for a specific year
export const fetchEarnings = async (year) => {
  try {
    const response = await axios.get(`/api/admin/earnings/${year}`);

    // Return the response if successful
    return response.data;
  } catch (error) {
    console.error("Error fetching earnings:", error);

    // Handle error (you can customize this to return something meaningful)
    return { message: "Failed to fetch earnings" };
  }
};
