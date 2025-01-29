import axios from "axios";

// Fetch student profile API
export const fetchStudentProfile = async () => {
  try {
    const response = await axios.get("/api/student/auth/get");
    return response.data.profile;
  } catch (error) {
    throw error.response ? error.response.data : new Error("An error occurred");
  }
};

// Student Registration API
export const registerStudent = async (
  firstName,
  lastName,
  email,
  password,
  username,
  phoneNumber,
  countryCode // new countryCode field
) => {
  try {
    const response = await axios.post("/api/student/auth/register", {
      firstName,
      lastName,
      email,
      password,
      username,
      phoneNumber,
      countryCode, // sending the countryCode field in the request body
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("An error occurred");
  }
};

// OTP Verification API for students
export const verifyStudentOtp = async (email, otp) => {
  try {
    const response = await axios.post("/api/student/auth/reg-otp-verify", {
      email,
      otp,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("An error occurred");
  }
};

// Delete student account API
export const deleteStudentAccount = async () => {
  try {
    const response = await axios.delete("/api/student/auth/delete");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("An error occurred");
  }
};

// Update Password API
export const updatePassword = async (email, userType, newPassword) => {
  try {
    const response = await axios.post("/api/common/update-password", {
      email,
      userType,
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("An error occurred");
  }
};

// Update Password API
export const editPassword = async (currentpassword, newpassword) => {
  try {
    const response = await axios.put("/api/student/auth/updatePassword", {
      currentpassword,
      newpassword,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("An error occurred");
  }
};

export const updateProfile = async (profileData) => {
  try {
    const response = await axios.put("/api/student/auth/update", profileData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("An error occurred");
  }
};
