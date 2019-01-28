import axios from "axios";

const API_KEY =
  "c9f0b8f9e7a3a2ef58bb1dd7b6ec8c236dcc1cf8ad9f4424f5a635a9b0d9d3b8";

const api = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: `Client-ID ${API_KEY}`
  }
});

const responseTypeInterceptor = ({data}) => {
  if (data.results) {
    return data.results;
  }
  return data;
};

api.interceptors.response.use(responseTypeInterceptor);

export default api;
