import API from "./axios";

export const adminApi = {
  summary: () => API.get("/admin/summary"),
  users: () => API.get("/admin/users"),
  updateUser: (id, body) => API.put(`/admin/users/${id}`, body),
  winners: () => API.get("/admin/winners"),
  subscriptions: () => API.get("/admin/subscriptions"),
  updateSubscription: (id, body) => API.put(`/admin/subscriptions/${id}`, body),
};
