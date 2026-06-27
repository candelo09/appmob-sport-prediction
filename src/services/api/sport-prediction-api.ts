import axios from "axios";

export const sportPredictionApi = axios.create({
  baseURL: "https://api-demo.chsystem.online/",
  // baseURL: "http://localhost:3015/",
  timeout: 15000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
