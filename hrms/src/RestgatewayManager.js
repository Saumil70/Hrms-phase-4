import axios from "axios";
const BASE_URL = "https://localhost:7144/api";
const RestgatewayService = {
  get: async (endpoint) => {
    try {
      const response = await axios.get(`${BASE_URL}/${endpoint}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  post: async (endpoint, data) => {
    try {
      const response = await axios.post(`${BASE_URL}/${endpoint}`, data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  put: async (endpoint, data) => {
    try {
      const response = await axios.put(`${BASE_URL}/${endpoint}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
export default RestgatewayService;
