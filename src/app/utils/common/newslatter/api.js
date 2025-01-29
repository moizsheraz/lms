import axios from "axios";

// Subscribe to the newsletter
export const subscribeNewsletter = async (email) => {
  try {
    const response = await axios.post("/api/newslatter/subscribe", { email });
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Failed to subscribe to newsletter");
  }
};

// Fetch all subscribed users
export const fetchSubscribers = async () => {
  try {
    const response = await axios.post("/api/newslatter/getusers");
    return response.data.subscribers;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Failed to fetch subscribers");
  }
};


