import axios from "axios";

export const fetchCourses = async () => {
  try {
    const response = await axios.get("/api/courses/get");
    return response.data.courses;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const deleteCourse = async (courseId) => {
  try {
    const response = await axios.delete(`/api/courses/delete/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
};

// Add createCourse function for creating a new course
export const createCourse = async (courseData) => {
  try {
    const response = await axios.post("/api/courses/create", courseData);
    return response.data;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};

// Add updateCourse function for editing an existing course
export const updateCourse = async (courseId, courseData) => {
  try {
    const response = await axios.put(`/api/courses/edit/${courseId}`, courseData);
    return response.data;
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
};


// Add editCourse function for editing an existing course
export const editCourse = async (courseId, updatedData) => {
  try {
    const response = await axios.put(
      `/api/courses/edit/${courseId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error editing course:", error);
    throw error;
  }
};

// Add updateCourseStatus function for updating the course status
export const updateCourseStatus = async (courseId, isActive) => {
  try {
    const response = await axios.post("/api/courses/status", {
      courseId,
      isActive,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating course status:", error);
    throw error;
  }
};

export const editSummary = async (summaryId, updatedSummary) => {
  try {
    const response = await fetch(`/api/admin/summaries/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        summaryId,
        ...updatedSummary,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update summary");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating summary:", error);
    throw error;
  }
};

export const deleteSummary = async (summaryId) => {
  try {
    const response = await fetch(`/api/admin/summaries/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ summaryId }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete summary");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting summary:", error);
    throw error;
  }
};

export const deleteExam = async (examId) => {
  try {
    const response = await axios.post("/api/admin/exam/delete", { examId });
    return response.data.message; // Return the message from the response
  } catch (error) {
    console.error("Error deleting exam:", error);
    throw new Error("Failed to delete the exam");
  }
};

export const fetchCourseProgress = async (courseId) => {
  try {
    const response = await axios.get(`/api/courses/getProgress/${courseId}`);
    return response.data.progress; // Return the progress from the response
  } catch (error) {
    console.error("Error fetching course progress:", error);
    throw new Error("Failed to fetch course progress");
  }
};

// Add createSummary function for creating a new summary
export const createSummary = async (summaries) => {
  try {
    const response = await axios.post("/api/summary/create", summaries, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error creating summaries:", error);
    throw error; // Propagate the error to the caller
  }
};


const createExam = async (examsData) => {
  try {
    const response = await axios.post('/api/exam/create', { exams: examsData });
    return response.data; // this contains the response from your API
  } catch (error) {
    console.error('Error creating exam:', error);
    throw new Error('Failed to create exam');
  }
};

export default createExam;
