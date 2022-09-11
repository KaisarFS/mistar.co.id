import axios from "axios";
// import store from "@/store";
// import route from "@/router";
import { getToken } from "@/utils/storage";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api of base_url
  timeout: 15000
});

// request interceptor
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers["Authorization"] = "Bearer " + getToken();
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const e = error;
    if (e && e.response) {
      return Promise.reject(error);
    } else {
      alert("Please check your connection");
    }
  }
);

export default service;
