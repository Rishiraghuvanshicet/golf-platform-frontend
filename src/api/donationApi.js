import API from "./axios";

export const donationApi = {
  create: (body) => API.post("/donation", body),
  mine: () => API.get("/donation/my"),
};
