// utils/students/api.js
import axios from "axios";

export const fetchAllStudents = async () => {
  try {
    const response = await axios.get("/api/admin/getAllStudents");
    return response.data.students;
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  }
};

// Function to fetch student details by ID along with courses
export const fetchStudentDetailsWithCourses = async (studentId) => {
  try {
    const response = await axios.get(`/api/admin/getStudent/${studentId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching student details:", error);
    return { error: error.message };
  }
};
