import axios from "axios";

// Delete a topic
export const deleteTopic = async (id) => {
  try {
    const response = await axios.delete("/api/admin/topic/delete", {
      data: { id },
    });
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Failed to delete topic");
  }
};

// Create a topic
export const createTopic = async (topicData) => {
  try {
    const response = await axios.post("/api/admin/topic/create", topicData);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Failed to create topic");
  }
};

// Update a topic
export const updateTopic = async (topicData) => {
  try {
    const response = await axios.put("/api/admin/topic/edit", topicData);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Failed to update topic");
  }
};

// Create a subtopic
export const createSubtopic = async (topicId, subtopicData) => {
  try {
    const response = await axios.post(`/api/admin/topic/${topicId}/subtopic/create`, subtopicData);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Failed to create subtopic");
  }
};

// Edit a subtopic
export const editSubtopic = async (topicId, subtopicData) => {
  try {
    const response = await axios.put(
      `/api/admin/topic/${topicId}/subtopic/edit`,
      subtopicData // Make sure this includes subtopicId
    );
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Failed to edit subtopic");
  }
};

// Delete a subtopic
export const deleteSubtopic = async (topicId, subtopicId) => {
  try {
    const response = await axios.delete(`/api/admin/topic/${topicId}/subtopic/delete`, {
      data: { subtopicId }, // Pass the subtopicId in the request body
    });
    return response.data; // Return the response data
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Failed to delete subtopic");
  }
};

// Create a sub-subtopic
export const createSubSubtopic = async (topicId, subTopicId, subSubtopicData) => {
 console.log('subTopicId',subTopicId)
  try {
    const response = await axios.post(
      `/api/admin/topic/${topicId}/subtopic/${subTopicId}/subsubtopic/create`,
      subSubtopicData
    );
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Failed to create sub-subtopic");
  }
};


// Delete a sub-subtopic
export const deleteSubSubtopic = async (topicId, subTopicId, subSubtopicId) => {
  try {
    const response = await axios.delete(`/api/admin/topic/${topicId}/subtopic/${subTopicId}/subsubtopic/delete`, {
      data: { subSubtopicId }, // Pass the subSubtopicId in the request body
    });
    return response.data; // Return the response data
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Failed to delete sub-subtopic");
  }
};

// Edit a sub-subtopic
export const editSubSubtopic = async (topicId, subTopicId, subSubtopicId, subSubtopicData) => {
  try {
    const response = await axios.put(
      `/api/admin/topic/${topicId}/subtopic/${subTopicId}/subsubtopic/edit`,
      { subSubtopicId, ...subSubtopicData } // Include subSubtopicId in the request body
    );
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Failed to edit sub-subtopic");
  }
};
