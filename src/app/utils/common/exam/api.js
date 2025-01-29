import axios from "axios";

// Edit Exam
export const editExam = async (examData) => {
  try {
    const response = await axios.post("/api/exam/edit", examData);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Failed to update the exam");
  }
};
