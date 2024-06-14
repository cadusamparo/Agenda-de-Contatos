import axios from "axios";

export const baseURL = "http://localhost:8800/";

export const api = axios.create({ baseURL });
