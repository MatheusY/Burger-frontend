import axios from "axios";

export const AxiosInterceptor = ({ children }: { children: any }) => {
  axios.defaults.baseURL = "http://localhost:8080";
  axios.interceptors.request.use(
    (request) => {
      return request;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );
  return children;
};
