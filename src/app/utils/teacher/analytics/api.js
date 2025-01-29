import axios from "axios";

// Fetch analytics data for a specific teacher
export const fetchTeacherAnalytics = async (teacherId) => {
  try {
    const response = await axios.get(`/api/teacher/analytics/${teacherId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching teacher analytics:", error);
    throw error.response
      ? error.response.data
      : new Error("Failed to fetch teacher analytics");
  }
};
