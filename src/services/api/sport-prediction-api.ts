import axios from "axios";

export const sportPredictionApi = axios.create({
  baseURL: "https://api.chsystem.online/",
  timeout: 15000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
