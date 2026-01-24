import axios from 'axios';

const http = axios.create({
  baseURL: 'https://hck-091.admiral-emir.web.id'
});

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;