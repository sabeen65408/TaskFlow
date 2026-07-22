import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/settings`;

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// =========================
// Get Profile
// =========================
export const getProfile = async () => {
  const res = await axios.get(`${API}/profile`, authHeader());
  return res.data;
};

// =========================
// Update Profile
// =========================
export const updateProfile = async (data) => {
  const res = await axios.put(
    `${API}/profile`,
    data,
    authHeader()
  );
  return res.data;
};

// =========================
// Change Password
// =========================
export const changePassword = async (data) => {
  const res = await axios.put(
    `${API}/password`,
    data,
    authHeader()
  );
  return res.data;
};

// =========================
// Update Preferences
// =========================
export const updatePreferences = async (data) => {
  const res = await axios.put(
    `${API}/preferences`,
    data,
    authHeader()
  );
  return res.data;
};