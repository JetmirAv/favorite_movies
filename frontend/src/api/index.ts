import axios from "axios";
import { getToken } from "../helpers";

const api = axios.create({
  baseURL: "http://localhost:3000/",
  responseType: "json",
});

api.interceptors.request.use((config) => {
  if (!config) config = {};
  if (!config.headers) config.headers = {};

  const token = getToken();

  config.headers["Authorization"] = token ? `Bearer ${token}` : ``;

  return config;
});

// api.interceptors.response.use((response) => {
//   switch (response.status) {
//     case 200:
//     case 201:
//       return response;
//     case 500:
//       console.log("Server Error");
//       return Promise.reject(response);
//     default:
//       return Promise.reject(response);
//   }
// });

export default api;
