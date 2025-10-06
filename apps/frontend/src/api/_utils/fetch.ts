import axios, { type AxiosRequestConfig } from 'axios';
import { BASE_API_URL } from '@/const/routes';

export const fetchGet = async <R>(
  url: string,
  config?: AxiosRequestConfig
): Promise<R> => {
  const response = await axios.get<R>(BASE_API_URL + url, config);
  return response.data;
};

export const fetchPost = async <T, R>(
  url: string,
  data: T,
  config?: AxiosRequestConfig
): Promise<R> => {
  const response = await axios.post<R>(BASE_API_URL + url, data, config);
  return response.data;
};
