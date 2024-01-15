import axios from "axios";
import { BASE_URL } from "../constants/url.constants.ts";

const httpModule = axios.create({
  baseURL: BASE_URL,
});

export default httpModule;
