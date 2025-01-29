import axios from "axios";

// Register a teacher
export const registerTeacher = async (
  firstName,
  lastName,
  email,
  password,
  username,
  phoneNumber,
  countryCode,
) => {
  try {
    const response = await axios.post("/api/teacher/auth/register", {
      firstName,
      lastName,
      email,
      password,
      username,
      phoneNumber,
      countryCode,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("An error occurred");
  }
};

// Send OTP for student or teacher
export const forgetPassword = async (email) => {
  try {
    const response = await axios.post("/api/student/auth/forget-password", {
      email,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("An error occurred");
  }
};

// OTP Verification API for teachers
export const verifyTeacherOtp = async (email, otp) => {
  try {
    const response = await axios.post("/api/teacher/auth/reg-otp-verify", {
      email,
      otp,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("An error occurred");
  }
};


// Get Teacher Profile API
export const getTeacherProfile = async () => {
  try {
    const response = await axios.get("/api/teacher/auth/get");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("An error occurred");
  }
};

// Update Teacher Password API
export const editTeacherPassword = async (currentpassword, newpassword) => {
  try {
    const response = await axios.put("/api/teacher/auth/updatePassword", {
      currentpassword,
      newpassword,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("An error occurred");
  }
};

// Update Teacher Profile API
export const updateTeacherProfile = async (profileData) => {
  try {
    const response = await axios.put("/api/teacher/auth/update", profileData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("An error occurred");
  }
};

// Delete Teacher Account API
export const deleteTeacherAccount = async () => {
  try {
    const response = await axios.delete("/api/teacher/auth/delete");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("An error occurred");
  }
};