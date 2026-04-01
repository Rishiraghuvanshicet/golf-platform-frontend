import API from "./axios";

export const userApi = {
  me: () => API.get("/user/me"),
  updateMe: (data) => API.put("/user/me", data),
};
