import API from "./axios";

export const drawApi = {
  list: () => API.get("/draw"),
  run: (body) => API.post("/draw/run", body || {}),
  publish: (id) => API.post(`/draw/${id}/publish`),
  poolPreview: () => API.get("/draw/pool-preview"),
};
