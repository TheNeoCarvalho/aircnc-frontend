import axios from "axios";

const api = axios.create({
  baseURL: 'https://aircnc-backend-yxkwifzlti.now.sh',
});

export default api;
