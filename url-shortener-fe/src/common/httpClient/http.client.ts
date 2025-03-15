import axios, { AxiosInstance } from 'axios';
import { Config } from '../config/config';

export const HttpClient = (): AxiosInstance => {
  const http = axios.create({
    baseURL: Config.get('VITE_SERVER_API_URL'),
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  return http;
};
