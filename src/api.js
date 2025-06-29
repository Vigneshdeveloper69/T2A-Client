import axios from "axios";

export const API_BASE = "https://t2a-server.onrender.com";

export const audioToText = (formData) => {
  return axios.post(`${API_BASE}/api/audio-to-text`, formData);
};
