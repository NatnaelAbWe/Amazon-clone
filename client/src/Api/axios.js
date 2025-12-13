import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

export { axiosInstance };
export const productUrl = "https://fakestoreapi.com";
