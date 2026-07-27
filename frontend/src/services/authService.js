import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/auth`;

// ===============================
// Login
// ===============================

export const loginUser = async (userData) => {
  const response = await axios.post(
    `${API}/login`,
    userData
  );

  return response.data;
};

// ===============================
// Register
// ===============================

export const registerUser = async (userData) => {
  const response = await axios.post(
    `${API}/register`,
    userData
  );

  return response.data;
};

// ===============================
// Forgot Password
// ===============================

export const forgotPassword = async (email) => {
  const response = await axios.post(
    `${API}/forgot-password`,
    { email }
  );

  return response.data;
};

// ===============================
// Reset Password
// ===============================

export const resetPassword = async (
  token,
  password
) => {
  const response = await axios.post(
    `${API}/reset-password/${token}`,
    { password }
  );

  return response.data;
};