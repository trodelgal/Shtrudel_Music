import axios from "axios";

const network = axios.create({});

const getToken = () => {
  return localStorage.getItem("token");
};

network.interceptors.request.use((config) => {
  // Do something before request is sent
  config.headers["Authorization"] = "bearer " + getToken();
  return config;
});

network.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error.response.status === 401) {
      window.location = "/";
    }
    return error;
  }
);

export default network;