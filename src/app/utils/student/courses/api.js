import axios from "axios";

// Fetch Student Courses API
export const fetchStudentCourses = async () => {
  try {
    const response = await axios.get("/api/student/mycourses");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("An error occurred");
  }
};

// Fetch Course by ID API
export const fetchCourseById = async (courseId) => {
  try {
    const response = await axios.get(`/api/courses/getCourse/${courseId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("An error occurred");
  }
};

// Fetch Exam with Questions by ID API
export const fetchExamWithQuestions = async (examId) => {
  try {
    const response = await axios.post("/api/exam/get", { examId });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("An error occurred");
  }
};

// Fetch Exam Marks by ID API
export const fetchExamMarks = async (examId) => {
  try {
    const response = await axios.post("/api/exam/get-marks", { examId });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("An error occurred");
  }
};

// Add Review API
export const addReview = async ({ courseId, rating, review }) => {
  try {
    const response = await axios.post("/api/courses/review/create", {
      courseId,
      rating,
      reviewText: review, // Renaming review to match the expected reviewText key
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("An error occurred");
  }
};

// Fetch Course by ID API
export const fetchCourseStatsById = async (courseId) => {
  try {
    const response = await axios.get(
      `/api/student/getCourseDetail/${courseId}`
    ); // Ensure the path matches your API
    return response.data; // Return the response data
  } catch (error) {
    throw error.response ? error.response.data : new Error("An error occurred");
  }
};

// Fetch Wrong Questions API
export const fetchWrongQuestions = async (courseId) => {
  try {
    const response = await axios.get(`/api/student/wrongquestions/${courseId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("An error occurred");
  }
};

// Reattempt Wrong Questions API
export const reattemptWrongQuestions = async (reattempts) => {
  try {
    const response = await axios.post("/api/exam/attempt/wrong-questions", {
      reattempts,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("An error occurred");
  }
};

// Fetch Courses by Keyword API
export const fetchCoursesByKeyword = async (keyword) => {
  try {
    const response = await axios.post("/api/courses/search", { keyword });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("An error occurred");
  }
};

export const fetchCoursesByTopic = async (topicName) => {
  try {
    const response = await axios.post("/api/courses/getcoursebytopic", {
      topic: topicName,
    });
    return response.data.courses;
  } catch (error) {
    console.error("Failed to fetch courses by topic:", error);
    return [];
  }
};

export const fetchRandomCourses = async () => {
  try {
    const response = await axios.get("/api/courses/randomcourses");
    return response.data.courses;
  } catch (error) {
    console.error("Failed to fetch random courses:", error);
    return [];
  }
};

export const fetchCourseGrades = async (courseId) => {
  try {
    const response = await axios.post(`/api/courses/grade/${courseId}`);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("An error occurred while fetching course grades");
  }
};

// Fetch Student Metrics API
export const fetchStudentMetrics = async (courseId) => {
  try {
    if (!courseId) throw new Error("Course ID is required");

    const response = await axios.get(`/api/student/getCourseStats/${courseId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("An error occurred");
  }
};
