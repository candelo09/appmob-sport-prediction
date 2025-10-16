import axios from 'axios';

export const sportPredictionApi = axios.create({
  baseURL: 'http://192.168.12.197:3000/',
//   params: {
//     language: 'es-MX',
//     api_key: process.env.EXPO_PUBLIC_MOVIE_DB_KEY,
//   },
});