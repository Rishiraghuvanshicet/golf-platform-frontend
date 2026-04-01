import API from "./axios";

export const subscriptionApi = {
  me: () => API.get("/subscription/me"),
  create: (plan) => API.post("/subscription", { plan }),
  cancel: () => API.post("/subscription/cancel"),
};
