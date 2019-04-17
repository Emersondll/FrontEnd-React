import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api/" //   /produto (post)
});

export default api;