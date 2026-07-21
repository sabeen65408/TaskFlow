import API from "../api/axios";

export const getNotifications = async () => {
  const res = await API.get("/notifications");
  return res.data;
};