import axios from "axios";

const API = axios.create({
    baseURL: "http://192.168.197.125:3000"
});

export  default API;