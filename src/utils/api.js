import axios from "axios";

const API_KEY =
  "454087647775b190c574339cb2994716b17ef2f83ad11838d0ef0dac2d102e66";

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
