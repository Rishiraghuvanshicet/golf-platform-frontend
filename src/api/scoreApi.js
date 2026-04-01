import API from "./axios";

export const scoreApi = {
  mine: () => API.get("/score/me"),
  add: (body) => API.post("/score", body),
  update: (scoreId, body) => API.put(`/score/${scoreId}`, body),
  remove: (scoreId) => API.delete(`/score/${scoreId}`),
};
