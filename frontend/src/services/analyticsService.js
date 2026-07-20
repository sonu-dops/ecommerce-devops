import API from "./api";

export const getDashboardStats = async () => {
  const res = await API.get("/analytics/dashboard");
  return res.data.stats;
};