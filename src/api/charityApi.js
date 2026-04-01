import API from "./axios";

export const charityApi = {
  list: (params) => API.get("/charity", { params }),
  getById: (id) => API.get(`/charity/${id}`),
  create: (data) => API.post("/charity", data),
  update: (id, data) => API.put(`/charity/${id}`, data),
  remove: (id) => API.delete(`/charity/${id}`),
  feature: (id) => API.put(`/charity/${id}/feature`),
};
