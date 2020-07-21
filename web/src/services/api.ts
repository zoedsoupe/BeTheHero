import axios from "axios";

const api = axios.create({
  baseURL: "https://us-central1-meus-projetos-441b6.cloudfunctions.net/api/",
});

export default api;
