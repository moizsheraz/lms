import axios from "axios";

// Fetch all topics
export const fetchTopics = async () => {
  try {
    const response = await axios.post("/api/admin/topic/getAll");
    return response.data.topics;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Failed to fetch topics");
  }
};

// Fetch subtopics by topic ID
export const fetchSubtopics = async (topicId) => {
  try {
    const response = await axios.post(`/api/admin/topic/${topicId}/subtopic`);
    return response.data.subTopics;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Failed to fetch subtopics");
  }
};

// Fetch sub-subtopics by topic ID and subtopic ID
export const fetchSubSubtopics = async (topicId, subtopicId) => {
  try {
    const response = await axios.post(
      `/api/admin/topic/${topicId}/subtopic/${subtopicId}/subsubtopic`
    );
    return response.data.subSubtopics; // Adjust this based on your actual response structure
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Failed to fetch sub-subtopics");
  }
};

// Fetch all subtopics and sub-subtopics
export const fetchAllSubtopicsAndSubSubtopics = async () => {
  try {
    const response = await axios.post(
      "/api/admin/topic/getAllSubTopics"
    );
    return {
      subTopics: response.data.subTopics,
      subSubtopics: response.data.subSubtopics,
    };
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Failed to fetch subtopics and sub-subtopics");
  }
};
