import axios from 'axios';

export const sportPredictionApi = axios.create({
  baseURL: 'http://192.168.1.6:3000/',
//   params: {
//     language: 'es-MX',
//     api_key: process.env.EXPO_PUBLIC_MOVIE_DB_KEY,
//   },
});