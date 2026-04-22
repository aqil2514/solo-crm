import { serverUrl } from "@/constants/urls";
import axios from "axios";

export const api = axios.create({
  baseURL: serverUrl,
  withCredentials: true,
});
