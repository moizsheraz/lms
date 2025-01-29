// teacher/api.js
import axios from "axios";

export const fetchAllTeachers = async () => {
  try {
    const response = await axios.get("/api/admin/getAllTeachers");
    return response.data.teachers;
  } catch (error) {
    console.error("Error fetching teachers:", error);
    return [];
  }
};

export const approveTeacher = async (teacherId, isApproved) => {
  try {
    const response = await axios.patch(`/api/admin/approve/${teacherId}`, {
      isApproved,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating teacher status:", error);
    throw error;
  }
};

// Function to fetch student details by ID along with courses
export const fetchTeacherDetailsWithCourses = async (teacherId) => {
  try {
    const response = await axios.get(`/api/admin/getTeacher/${teacherId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching teacher details:", error);
    return { error: error.message };
  }
};
