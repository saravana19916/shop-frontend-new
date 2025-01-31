import axiosInstance from "./axiosConfig";
import { AxiosError } from "axios";

const MyTicketsAPI = {
  getMyTickets: async () => {
    try {
      const response = await axiosInstance.get("my-tickets");
      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      return {
        status: axiosError.response?.status || 500,
        data: axiosError.response?.data || "An error occurred",
      };
    }
  },
};

export default MyTicketsAPI;
