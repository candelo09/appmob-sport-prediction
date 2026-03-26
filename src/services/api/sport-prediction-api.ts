import axios from "axios";

export const sportPredictionApi = axios.create({
  baseURL: "http://api_bet.chsystem.online/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  //   params: {
  //     language: 'es-MX',
  //     api_key: process.env.EXPO_PUBLIC_MOVIE_DB_KEY,
  //   },
});
