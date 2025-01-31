import axiosInstance from "./axiosConfig";
import { AxiosError } from "axios";

export class Amenities {
  constructor() {}
  async getAmenitiesList() {
    try {
      const response = await axiosInstance.get("amenities");
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
  }
}

export default new Amenities();
