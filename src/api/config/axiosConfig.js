import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080",
});

api.interceptors.request.use(config => {    // api 에서 요청을 받을 때 마다 baseURL 의 설정을 가져옴
    const token = localStorage.getItem("AccessToken");
    if (!!token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => Promise.reject(error));

export const setAccessToken = (token) => {
    if (!!token) {
        localStorage.setItem("AccessToken", token);
    } else {
        localStorage.removeItem("AccessToken");
    }
};

export const setRefreshToken = (token) => {
    if (!!token) {
        localStorage.setItem("RefreshToken", token);
    } else {
        localStorage.removeItem("RefreshToken");
    }
};