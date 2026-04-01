import API from "./axios";

export const winnerApi = {
  mine: () => API.get("/winner/my"),
  uploadProof: (body) => API.post("/winner/upload-proof", body),
  approve: (id, body) => API.put(`/winner/approve/${id}`, body),
};
