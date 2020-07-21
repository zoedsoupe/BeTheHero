import axios from "axios";

const api = axios.create({
  baseURL: "https://us-central1-bethehero-mat.cloudfunctions.net/api/",
});

export default api;
