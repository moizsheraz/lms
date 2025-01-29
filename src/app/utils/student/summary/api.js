import axios from "axios";

// Function to like or unlike an exam
export const likeExam = async (examId) => {
  try {
    const response = await axios.post("/api/student/exam/like", {
      examId,
    });
    return response.data;
  } catch (error) {
    console.error("Error liking/unliking exam:", error);
    throw error;
  }
};

// Function to check if the student has liked an exam
export const checkExamLikeStatus = async (examId) => {
  try {
    const response = await axios.post("/api/student/exam/checkLikeStatus", {
      examId,
    });
    return response.data;
  } catch (error) {
    console.error("Error checking like status for exam:", error);
    throw error;
  }
};

// Function to like or unlike a summary
export const likeSummary = async (summaryId) => {
  try {
    const response = await axios.post("/api/student/summary/like", {
      summaryId,
    });
    return response.data;
  } catch (error) {
    console.error("Error liking/unliking summary:", error);
    throw error;
  }
};

// Function to check if the student has liked a summary
export const checkLikeStatus = async (summaryId) => {
  try {
    const response = await axios.post("/api/student/summary/checkLikeStatus", {
      summaryId,
    });
    return response.data;
  } catch (error) {
    console.error("Error checking like status:", error);
    throw error;
  }
};

export const fetchCourseSummary = async (courseId) => {
  try {
    const response = await axios.get(`/api/student/summary/getCount/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching course summary:", error);
    throw error;
  }
};